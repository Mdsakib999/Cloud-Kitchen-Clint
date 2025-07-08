const FilterControls = ({
  statusFilter,
  paymentFilter,
  setStatusFilter,
  setPaymentFilter,
  handleClearFilters,
  variant = "light",
}) => {
  // Define style sets for light and green variants
  const styles = {
    light: {
      container: "grid grid-cols-1 md:grid-cols-3 gap-4 w-full",
      label: "block text-sm font-medium text-gray-700 mb-2",
      select:
        "w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm text-gray-700",
      button:
        "px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 rounded-lg text-sm transition-colors shadow-sm",
    },
    green: {
      container:
        "rounded-2xl shadow-md p-6 mb-6 bg-bg-tertiary grid grid-cols-1 md:grid-cols-3 gap-6 w-full",
      label: "block text-sm font-semibold text-primary mb-2",
      select:
        "w-full px-3 py-2 rounded-lg bg-bg-cart text-white border border-bg-cart focus:border-primary focus:outline-none",
      button:
        "px-4 py-2 text-sm text-white bg-bg-cart rounded-lg hover:bg-tertiary transition-colors",
    },
  };

  const currentStyle = styles[variant] || styles.light;

  return (
    <div className={currentStyle.container}>
      {/* Order Status Filter */}
      <div>
        <label className={currentStyle.label}>Order Status</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={currentStyle.select}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="delivering">Delivering</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Payment Status Filter */}
      <div>
        <label className={currentStyle.label}>Payment Status</label>
        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className={currentStyle.select}
        >
          <option value="all">All Payments</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      <div className="flex items-end justify-end">
        <button
          onClick={handleClearFilters}
          className={`${currentStyle.button} bg-red-400 hover:bg-red-800 text-white`}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterControls;
