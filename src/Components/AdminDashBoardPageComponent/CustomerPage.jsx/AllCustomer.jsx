import { useState, useEffect } from "react";
import {
  Eye,
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { formatDate } from "../../../utils/formatDate";
import axiosInstance from "../../../Utils/axios";
import { useAuth } from "../../../providers/AuthProvider";
import { MdRemoveModerator } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import showToast from "../../../utils/ShowToast";
import { Loader } from "../../SharedComponent/Loader";

export const AllCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/user/all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const sortedUsers = res.data.sort((a, b) => {
        if (a.role === "admin" && b.role !== "admin") return -1;
        if (a.role !== "admin" && b.role === "admin") return 1;
        return 0;
      });
      setCustomers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      (customer.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (customer.email?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (customer._id?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (customer.phone || "").includes(searchTerm)
  );

  // Sort customers
  const sortedCustomers = !sortField
    ? filteredCustomers
    : [...filteredCustomers].sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });

  // Pagination
  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = sortedCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
  const makeAdmin = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be promoted to admin!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, make admin",
    });

    if (confirm.isConfirmed) {
      try {
        const result = await axiosInstance.put(
          `/user/make-admin/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire("Success", "User promoted to admin", "success");
        fetchUsers();
      } catch (error) {
        Swal.fire("Error", "Failed to promote user", "error");
      }
    }
  };

  const removeAdmin = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This Admin will turn into a user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Make User",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosInstance.put(
          `/user/remove-admin/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire("Success", "Admin role removed", "success");
        fetchUsers();
      } catch (error) {
        Swal.fire("Error", "Failed to remove admin role", "error");
      }
    }
  };

  const deleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      try {
        const result = await axiosInstance.delete(`/user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (result?.data?.success) {
          showToast({
            title: "Account deleted successfully!",
            icon: "success",
          });
        }
        fetchUsers();
      } catch (error) {
        Swal.fire("Error", "Failed to delete user", error);
      }
    }
  };

  if (isLoading) {
    return <Loader comp_Name={"customers"} />;
  }

  if (!isLoading && customers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-950">
        <span className="text-emerald-100 text-lg font-semibold font-serif">
          No user found
        </span>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen text-white">
      <h2 className="text-2xl text-black font-bold my-6 font-inknut">
        All Customers
      </h2>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-lg bg-emerald-950 rounded-lg">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-100"
            size={20}
          />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="border border-emerald-600 focus:outline-none w-full pl-10 pr-4 py-2.5 bg-white/10 rounded-lg text-emerald-50 placeholder-white focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-2xl border border-emerald-200 bg-emerald-950">
        <table className="min-w-full text-left rounded-2xl">
          <thead className="bg-emerald-900 text-emerald-100 text-sm uppercase tracking-wider font-serif">
            <tr>
              <th
                className="px-4 py-3 cursor-pointer hover:bg-emerald-100 select-none transition-colors"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center justify-between">
                  CID
                  {getSortIcon("id")}
                </div>
              </th>
              <th
                className="px-4 py-3 cursor-pointer hover:bg-emerald-200/60 select-none transition-colors"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center justify-between">
                  Name
                  {getSortIcon("name")}
                </div>
              </th>
              <th
                className="px-4 py-3 cursor-pointer hover:bg-emerald-200/60 select-none transition-colors"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center justify-between">
                  Email
                  {getSortIcon("email")}
                </div>
              </th>
              <th className="px-4 py-3 font-serif">Number</th>
              <th className="px-4 py-3 font-serif">Role</th>
              <th className="px-4 py-3 font-serif rounded-tr-2xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((customer) => {
                const isCurrentUser = customer.email === user?.email;
                const buttonBaseClasses =
                  "disabled:opacity-50 cursor-pointer transition-colors";
                return (
                  <tr
                    key={customer._id}
                    className={`border-t font-serif transition-colors ${
                      isCurrentUser
                        ? "bg-emerald-50 text-emerald-900 font-bold"
                        : "hover:bg-white hover:text-emerald-900"
                    }`}
                  >
                    <td className="px-4 py-3 font-inter">
                      #CID{customer._id.slice(-5)}
                    </td>
                    <td className="px-4 py-3">{customer.name}</td>
                    <td className="px-4 py-3 break-all">{customer.email}</td>
                    <td className="px-4 py-3 font-inter">
                      {customer.phone || "Not Provided"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full font-serif ${
                          customer.role === "admin"
                            ? "bg-emerald-200 text-emerald-900 border border-emerald-400"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {customer.role === "admin" ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="py-3 flex flex-col md:flex-row items-center gap-3">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="flex items-center justify-center gap-2 px-2 py-2 bg-emerald-500/80 text-white font-medium rounded-xl hover:bg-emerald-600 active:bg-emerald-700 focus:ring-2 focus:ring-emerald-300 font-serif cursor-pointer"
                      >
                        <Eye size={18} />
                      </button>
                      {customer.role === "admin" ? (
                        <button
                          title="Demote to User"
                          className={`flex items-center justify-center gap-2 px-3 py-2 bg-emerald-100 border border-emerald-300 text-emerald-700 font-medium rounded-xl hover:bg-emerald-200 active:bg-emerald-300 focus:ring-2 focus:ring-emerald-300 font-serif ${buttonBaseClasses}`}
                          onClick={() => removeAdmin(customer._id)}
                          disabled={isCurrentUser}
                        >
                          <MdRemoveModerator size={18} />
                        </button>
                      ) : (
                        <button
                          title="Promote to Admin"
                          className={`flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-300 text-emerald-700 font-medium rounded-xl hover:bg-emerald-200 active:bg-emerald-300 focus:ring-2 focus:ring-emerald-300 font-serif ${buttonBaseClasses}`}
                          onClick={() => makeAdmin(customer._id)}
                          disabled={isCurrentUser}
                        >
                          <FaUserShield size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteUser(customer._id)}
                        disabled={isCurrentUser}
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 border border-red-300 text-red-700 font-medium rounded-xl hover:bg-red-100 active:bg-red-200 focus:ring-2 focus:ring-red-300 font-serif cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-6 text-center text-emerald-200 font-serif text-xl"
                >
                  No Customer Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 ">
          <div className="text-sm text-gray-400">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, sortedCustomers.length)} of{" "}
            {sortedCustomers.length} customers
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

      {/* Enhanced Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl transform transition-all duration-300 ease-out scale-100 max-h-[100vh] flex items-center justify-center">
            {/* Decorative border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#e6a344] via-[#00b074] to-[#e6a344] p-[2px] pointer-events-none"></div>

            {/* Modal content */}
            <div
              className="relative p-4 md:p-8 rounded-3xl w-full bg-bg-primary overflow-y-auto max-h-[90vh] min-h-[60vh] sm:min-h-0 sm:max-h-[90vh]"
              style={{ scrollbarGutter: "stable" }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCustomer(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 bg-secondary/30 text-primary z-10"
              >
                <span className="text-xl font-bold">×</span>
              </button>

              {/* Header section */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-xl bg-primary">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl font-bold text-primary font-playfair-display">
                      Customer Profile
                    </h3>
                    <p className="text-sm text-secondary">
                      Complete customer information
                    </p>
                  </div>
                </div>
                <div className="w-20 h-1 rounded-full bg-primary"></div>
              </div>

              {/* Customer info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl border bg-bg-input border-primary">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-xs uppercase tracking-wider font-medium font-roboto text-secondary">
                        Customer ID
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-primary font-inter">
                      #CID{selectedCustomer._id.slice(-5)}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border bg-bg-input border-primary">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-3 h-3 rounded-full bg-[#00b074]"></div>
                      <span className="text-xs uppercase tracking-wider font-medium text-secondary font-roboto">
                        Full Name
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-white font-inter">
                      {selectedCustomer.name}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border bg-bg-input border-primary">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-xs uppercase tracking-wider font-medium font-roboto text-secondary">
                        Email Address
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-white break-all font-serif">
                      {selectedCustomer.email}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border bg-bg-input border-primary">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-3 h-3 rounded-full bg-[#00b074]"></div>
                      <span className="text-xs uppercase tracking-wider font-medium font-roboto text-secondary">
                        Phone Number
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-white font-inter">
                      {selectedCustomer.phone || "No phone number added."}
                    </p>
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl border bg-bg-input border-primary">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-3 h-3 rounded-full bg-secondary"></div>
                      <span className="text-xs uppercase tracking-wider font-medium font-roboto text-secondary">
                        Address
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-white font-sans">
                      {selectedCustomer.address || "No address added."}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border bg-bg-input border-primary">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-3 h-3 rounded-full bg-[#00b074]"></div>
                      <span className="text-xs uppercase tracking-wider font-medium font-roboto text-secondary">
                        Join Date
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-white font-inter">
                      {formatDate(selectedCustomer.createdAt)}
                    </p>
                  </div>

                  {/* Total spent - featured card */}
                  <div className="p-6 rounded-2xl border-2 relative overflow-hidden bg-bg-cart border-[#00b074]">
                    <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 rounded-full opacity-20 bg-[#00b074]"></div>
                    <div className="relative">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-4 h-4 rounded-full bg-[#00b074]"></div>
                        <span className="text-xs uppercase tracking-wider font-bold font-roboto text-[#00b074]">
                          Total Spent
                        </span>
                      </div>
                      <p className="text-3xl font-bold font-playfair-display text-[#00b074]">
                        ৳{selectedCustomer.totalSpent?.toLocaleString() || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
