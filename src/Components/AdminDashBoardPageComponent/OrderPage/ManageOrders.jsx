import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../../../redux/orderSlice";
import { GetStatusColor } from "../../SharedComponent/GetStatusColor";
import FilterControls from "../../UserDashBoardPageComponents/FilterControls";
import showToast from "../../../utils/ShowToast";
import { Loader } from "../../SharedComponent/Loader";
import Pagination from "../../SharedComponent/Pagination";

export const ManageOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetOrdersQuery({
    pollingInterval: 10000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [updateOrder] = useUpdateOrderMutation();

  useEffect(() => {
    if (isError) {
      showToast({
        title: error?.data?.message || "Failed to load orders",
        icon: "error",
      });
    }
  }, [isError, error]);

  const filteredOrders = useMemo(() => {
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

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      sorted = sorted.filter((order) => {
        const nameMatch = order.name?.toLowerCase().includes(lowerSearch);
        const oidMatch = `oid${order._id.slice(-4)}`.includes(lowerSearch);
        return nameMatch || oidMatch;
      });
    }

    return sorted;
  }, [orders, statusFilter, paymentFilter, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleClearFilters = () => {
    setStatusFilter("all");
    setPaymentFilter("all");
    setSearchTerm("");
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrder({
        id: orderId,
        orderData: { order_status: newStatus },
      }).unwrap();

      showToast({
        title: "Order status updated successfully!",
        icon: "success",
      });
    } catch (error) {
      console.error("Status update error:", error);
      showToast({
        title: error?.data?.message || "Failed to update order status",
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return <Loader comp_Name={"orders"} />;
  }

  return (
    <div className="p-6 min-h-screen text-white font-inter mt-20 md:mt-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-2xl font-bold text-black mb-2 md:mb-5">
          All Orders
        </h2>
      </div>

      {/* Search, Filters, result count & refresh */}
      <div className="mb-6 bg-white rounded-xl p-6 shadow space-y-6">
        {/* Top Row: Search + Filters + Refresh */}
        <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between gap-6">
          {/* Search Input */}
          <div className="w-full lg:w-1/3">
            <label
              htmlFor="search"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Search
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                id="search"
                type="text"
                placeholder="Search by name or OID..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="w-full lg:w-2/3">
            <FilterControls
              statusFilter={statusFilter}
              paymentFilter={paymentFilter}
              setStatusFilter={setStatusFilter}
              setPaymentFilter={setPaymentFilter}
              handleClearFilters={handleClearFilters}
              variant="light"
            />
          </div>

          {/* Refresh Button */}
          <div className="w-full lg:w-auto flex justify-start lg:justify-end md:mt-7">
            <button
              onClick={handleRefresh}
              disabled={isFetching}
              className="w-[140px] flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <RefreshCw
                size={18}
                className={isFetching ? "animate-spin" : ""}
              />
              <span className="truncate">
                {isFetching ? "Refreshing..." : "Refresh"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg">
        {paginatedOrders.length === 0 ? (
          <div className="text-center text-gray-400 py-12 text-lg">
            No orders found matching your filters.
          </div>
        ) : (
          <table className="min-w-full bg-white text-black text-left rounded-md">
            <thead className="bg-bg-secondary text-sm uppercase text-white tracking-wider">
              <tr>
                <th className="px-4 py-3">OID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-black hover:bg-gray-300 hover:text-black transition-colors"
                >
                  <td className="px-2 py-1 text-sm">
                    OID{order._id.slice(-4)}
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap text-sm">
                    {order.name}
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap text-sm">
                    {order.phone?.startsWith("+88")
                      ? order.phone.slice(3)
                      : order.phone}
                  </td>

                  <td className="px-2 py-1  text-sm">{order.address}</td>
                  <td className="px-2 py-1 font-inter text-sm">
                    ৳ {order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-2 py-1">
                    <select
                      value={order.order_status || order.status || "pending"}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded-lg text-xs transition-colors cursor-pointer ${GetStatusColor(
                        order.order_status || order.status
                      )}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready</option>
                      <option value="delivering">Delivering</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="ml-5 py-1 items-center flex">
                    <Link
                      to={`/admin/dashboard/orders/order-details/${order._id}`}
                    >
                      <button className="cursor-pointer bg-primary/80 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredOrders.length}
          startIndex={startIndex}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};
