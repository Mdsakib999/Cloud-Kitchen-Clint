const FilterControls = ({
  statusFilter,
  paymentFilter,
  setStatusFilter,
  setPaymentFilter,
  handleClearFilters,
}) => {
  return (
    <div className="rounded-2xl shadow-md p-6 mb-6 bg-bg-tertiary">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-bg-secondary rounded-xl p-6">
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Order Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-bg-input text-white border border-bg-cart focus:border-primary focus:outline-none"
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

        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Payment Status
          </label>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-bg-input text-white border border-bg-cart focus:border-primary focus:outline-none"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <div className="flex items-end justify-end">
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm text-white bg-bg-cart rounded-lg hover:bg-tertiary transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
