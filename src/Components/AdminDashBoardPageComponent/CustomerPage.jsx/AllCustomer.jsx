import { useState, useMemo } from "react";
import {
  Eye,
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { customers } from "../../../FakeDB/mockCustomer";
import { formatDate } from "../../../utils/formatDate";

export const AllCustomer = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter customers based on search term
  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.number.includes(searchTerm)
    );
  }, [searchTerm]);

  // Sort customers
  const sortedCustomers = useMemo(() => {
    if (!sortField) return filteredCustomers;

    return [...filteredCustomers].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredCustomers, sortField, sortDirection]);

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

  return (
    <div className="p-6 min-h-screen text-white">
      <h2 className="text-2xl text-black font-bold mb-6">All Customers</h2>

      {/* Search Bar */}
      <div className="mb-6 bg-bg-secondary rounded-lg p-4">
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full bg-bg-secondary text-left rounded-md">
          <thead className="bg-white/10 text-sm uppercase tracking-wider">
            <tr>
              <th
                className="px-4 py-3 cursor-pointer hover:bg-white/5 select-none"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center justify-between">
                  CID
                  {getSortIcon("id")}
                </div>
              </th>
              <th
                className="px-4 py-3 cursor-pointer hover:bg-white/5 select-none"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center justify-between">
                  Name
                  {getSortIcon("name")}
                </div>
              </th>
              <th
                className="px-4 py-3 cursor-pointer hover:bg-white/5 select-none"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center justify-between">
                  Email
                  {getSortIcon("email")}
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center justify-between">Number</div>
              </th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t border-white/10 hover:bg-white/5 transition-colors"
              >
                <td className="px-4 py-3">{customer.id}</td>
                <td className="px-4 py-3">{customer.name}</td>
                <td className="px-4 py-3">{customer.email}</td>
                <td className="px-4 py-3">{customer.number}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelectedCustomer(customer)}
                    className="hover:text-yellow-400 transition-colors"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
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
          <div className="relative w-full max-w-4xl transform transition-all duration-300 ease-out scale-100">
            {/* Decorative border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#e6a344] via-[#00b074] to-[#e6a344] p-[2px]">
              <div className="h-full w-full rounded-3xl bg-bg-primary"></div>
            </div>

            {/* Modal content */}
            <div className="relative p-8 rounded-3xl">
              {/* Close button */}
              <button
                onClick={() => setSelectedCustomer(null)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 bg-secondary/30 text-primary"
              >
                <span className="text-xl font-bold">×</span>
              </button>

              {/* Header section */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl bg-primary">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-primary font-playfair-display">
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
                      {selectedCustomer.id}
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
                      {selectedCustomer.number}
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
                      {selectedCustomer.address}
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
                      {formatDate(selectedCustomer.joinDate)}
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
                        ৳{selectedCustomer.totalSpent.toLocaleString()}
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
