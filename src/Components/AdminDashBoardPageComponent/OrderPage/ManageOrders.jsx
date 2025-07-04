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
    <div className="p-6 min-h-screen text-white font-inter mt-20 md:mt-16">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-2xl font-bold text-black mb-2 md:mb-5">
          All Orders
        </h2>
      </div>

      {/* Search, Filters, result count & refresh */}
      <div className="mb-6 bg-bg-secondary rounded-lg p-4 md:p-6 space-y-6">
        {/* Top Row: Search + Filters */}
        <div className="flex flex-col lg:items-center lg:justify-between gap-6">
          {/* Search Input */}
          <div className="w-1/2 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name or OID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="w-full">
            <FilterControls
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              paymentFilter={paymentFilter}
              setPaymentFilter={setPaymentFilter}
              handleClearFilters={handleClearFilters}
            />
          </div>
        </div>

        {/* Bottom Row: Result Count + Refresh */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-gray-200 text-lg font-medium">
            Showing{" "}
            <span className="text-primary font-bold">
              {filteredOrders.length}
            </span>{" "}
            orders
          </p>

          <button
            onClick={handleRefresh}
            disabled={isFetching}
            className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={18} className={isFetching ? "animate-spin" : ""} />
            {isFetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg">
        {paginatedOrders.length === 0 ? (
          <div className="text-center text-gray-400 py-12 text-lg">
            No orders found matching your filters.
          </div>
        ) : (
          <table className="min-w-full bg-bg-secondary text-left rounded-md">
            <thead className="bg-white/10 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">OID</th>
                <th className="px-4 py-3">Name</th>
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
                  className="border-t border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3">OID{order._id.slice(-4)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{order.name}</td>
                  <td className="px-4 py-3">{order.address}</td>
                  <td className="px-4 py-3 font-inter">
                    ৳ {order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.order_status || order.status || "pending"}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${GetStatusColor(
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
                  <td className="px-4 py-3">
                    <Link to={`/admin/dashboard/order-details/${order._id}`}>
                      <button className="cursor-pointer shadow shadow-emerald-300 transition-colors inline-flex items-center gap-2 bg-bg-primary text-white py-2 px-5 rounded-full whitespace-nowrap">
                        View Details
                        <Eye size={18} />
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
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-400">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
          </div>

          <div className="flex items-center space-x-2 bg-bg-secondary rounded-lg p-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
