import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useGetOrdersByUserQuery } from "../../redux/orderSlice";
import { Loader } from "../SharedComponent/Loader";
import FilterControls from "./FilterControls";
import OrderList from "./OrderList";
import OrderDetailsModal from "./OrderDetailsModal";
import showToast from "../../utils/ShowToast";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useGetAllProductsQuery } from "../../redux/apiSlice";

export const OrderHistory = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const userId = user?._id;
  const { data: allFoods } = useGetAllProductsQuery();
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetOrdersByUserQuery(userId, {
    skip: !userId,
    pollingInterval: 20000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  useEffect(() => {
    if (isError) {
      showToast({
        title: error?.data?.message || "Failed to load orders",
        icon: "error",
      });
    }
  }, [isError, error?.data?.message]);

  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    let sorted = [...orders].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    if (statusFilter !== "all") {
      sorted = sorted.filter(
        (o) => (o.status || o.order_status) === statusFilter
      );
    }

    if (paymentFilter !== "all") {
      sorted = sorted.filter(
        (o) =>
          (o.paymentStatus || (o.isPaid ? "paid" : "pending")) === paymentFilter
      );
    }

    return sorted;
  }, [orders, statusFilter, paymentFilter]);

  const handleViewOrder = (id) => {
    setSelectedOrderId(id);
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);
  const handleClearFilters = () => {
    setStatusFilter("all");
    setPaymentFilter("all");
  };
  const handleReorder = (order) => {
    if (!Array.isArray(order?.items)) return;

    order.items.forEach((item) => {
      const foodId = item.food || item._id;
      if (!foodId) return;

      // Find full food info (to get the image)
      const foodDetails = allFoods?.find((f) => f._id === foodId);

      // Normalize addons
      const normalizedAddons = Array.isArray(item.addons)
        ? item.addons.map((addon) => ({
            label:
              addon.qty && addon.qty > 1
                ? `${addon.name} ×${addon.qty}`
                : addon.name || addon.label || "Addon",
            price: addon.price * (addon.qty || 1),
          }))
        : [];

      const compositeId = [
        foodId,
        item.size || "Regular",
        ...normalizedAddons.map((a) => a.label),
      ].join("__");

      const basePrice = item.price || foodDetails?.price || 0;
      const addonsPrice = normalizedAddons.reduce((sum, a) => sum + a.price, 0);
      const totalPrice = basePrice + addonsPrice;

      dispatch(
        addToCart({
          _id: compositeId,
          baseId: foodId,
          name:
            item.name || foodDetails?.title || foodDetails?.name || "Unnamed",
          image: item.image || foodDetails?.images?.[0]?.url || "/fallback.jpg",
          price: totalPrice,
          size: item.size || "Regular",
          quantity: item.qty || 1,
          addons: normalizedAddons,
        })
      );
    });

    showToast({
      title: "Order added to cart",
      icon: "success",
    });
  };

  if (isLoading && !orders.length) return <Loader />;

  return (
    <div className="min-h-screen py-8 px-4 mt-16 lg:mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="py-5">
          <h1 className="text-3xl font-bold text-gray-200 mb-2">
            Order History
          </h1>
          <p className="text-white mt-3">Track and manage your food orders</p>
        </div>

        <FilterControls
          statusFilter={statusFilter}
          paymentFilter={paymentFilter}
          setStatusFilter={setStatusFilter}
          setPaymentFilter={setPaymentFilter}
          handleClearFilters={handleClearFilters}
          variant="green"
        />

        <OrderList
          orders={filteredOrders}
          originalCount={orders.length}
          isFetching={isFetching}
          onRefresh={refetch}
          onViewOrder={handleViewOrder}
          onReorder={handleReorder}
        />

        {showModal && selectedOrderId && (
          <OrderDetailsModal
            orderId={selectedOrderId}
            onClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};
