import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useGetOrdersByUserQuery } from "../../redux/orderSlice";
import { Loader } from "../SharedComponent/Loader";
import FilterControls from "./FilterControls";
import OrderList from "./OrderList";
import OrderDetailsModal from "./OrderDetailsModal";
import showToast from "../../utils/ShowToast";

export const OrderHistory = () => {
  const { user } = useAuth();
  const userId = user?._id;

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetOrdersByUserQuery(userId, {
    skip: !userId,
    pollingInterval: 30000,
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

  if (isLoading && !orders.length) return <Loader />;

  return (
    <div className="min-h-screen py-8 px-4 mt-16 md:mt-5">
      <div className="max-w-7xl mx-auto">
        <div className="py-5">
          <h1 className="text-3xl font-bold text-gray-200 mb-2">
            Order History
          </h1>
          <p className="text-emerald-100 mt-3">
            Track and manage your food orders
          </p>
        </div>

        <FilterControls
          statusFilter={statusFilter}
          paymentFilter={paymentFilter}
          setStatusFilter={setStatusFilter}
          setPaymentFilter={setPaymentFilter}
          handleClearFilters={handleClearFilters}
        />

        <OrderList
          orders={filteredOrders}
          originalCount={orders.length}
          isFetching={isFetching}
          onRefresh={refetch}
          onViewOrder={handleViewOrder}
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
