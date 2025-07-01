const OrderSummary = ({ order }) => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
    <div className="space-y-5">
      {order.items?.map((item, idx) => (
        <div
          key={idx}
          className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600">Qty: {item.qty}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">
                ৳{item.price * item.qty}
              </p>
              <p className="text-sm text-gray-600">৳{item.price} each</p>
            </div>
          </div>

          {item.addons?.length > 0 && (
            <div className="pl-4 border-l-4 border-orange-400">
              <p className="text-sm font-medium text-orange-600">Addons:</p>
              {item.addons.map((addon, aIdx) => (
                <div
                  key={aIdx}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>
                    {addon.name} x{addon.qty}
                  </span>
                  <span>৳{addon.price * addon.qty}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>

    <div className="pt-4 mt-4 border-t border-gray-200 space-y-2 text-sm text-gray-700">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>৳{order.totalPrice + (order.discountPrice || 0)}</span>
      </div>
      <div className="flex justify-between">
        <span>Discount:</span>
        <span>৳{order.discountPrice || 0}</span>
      </div>
      <div className="flex justify-between text-lg font-bold text-green-700">
        <span>Total:</span>
        <span>৳{order.totalPrice}</span>
      </div>
    </div>
  </div>
);

export default OrderSummary;
