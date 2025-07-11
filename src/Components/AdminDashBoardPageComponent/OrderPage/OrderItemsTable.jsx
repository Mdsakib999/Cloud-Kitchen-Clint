export const OrderItemsTable = ({ items, discountPrice }) => {
  // Calculate totals
  const itemTotals = items.map((item) => {
    const addonsTotal =
      item.addons?.reduce((sum, a) => sum + a.price * a.qty, 0) || 0;
    const baseTotal = (item.price || 0) * item.qty;
    return {
      baseTotal,
      addonsTotal,
      total: baseTotal + addonsTotal,
    };
  });
  const grandBaseTotal = itemTotals.reduce((sum, t) => sum + t.baseTotal, 0);
  const grandAddonsTotal = itemTotals.reduce(
    (sum, t) => sum + t.addonsTotal,
    0
  );
  const grandTotal = grandBaseTotal + grandAddonsTotal;
  const discountedTotal = Math.max(grandTotal - (discountPrice || 0), 0);
  const needsShipping = discountedTotal < 1599;
  const shippingFee = needsShipping ? 100 : 0;
  const finalTotal = discountedTotal + shippingFee;

  return (
    <div className="max-w-5xl mx-auto rounded-2xl shadow-lg overflow-hidden bg-white border border-gray-200">
      {/* Table Header */}
      <div className="bg-bg-secondary text-white px-4 py-3 md:px-6 md:py-4">
        <div className="grid grid-cols-4 gap-2 md:gap-4 font-medium text-xs md:text-base">
          <div className="text-center">Items</div>
          <div className="text-center">Qty</div>
          <div className="text-center">Price</div>
          <div className="text-center">Total Price</div>
        </div>
      </div>

      {/* Items */}
      <div className="p-2 md:p-6 space-y-2 md:space-y-4 divide-y divide-gray-100">
        {items &&
          items.map((item, idx) => {
            const addonsTotal =
              item.addons?.reduce((sum, a) => sum + a.price * a.qty, 0) || 0;
            const baseTotal = (item.price || 0) * item.qty;
            return (
              <div
                key={idx}
                className="grid grid-cols-4 gap-2 md:gap-4 items-center py-2"
              >
                <div className="flex-1 w-full">
                  <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wide whitespace-nowrap">
                    {item.category}
                  </div>
                  <div className="font-semibold text-gray-800 whitespace-nowrap truncate">
                    {item.name}
                  </div>
                  {item.addons?.length > 0 && (
                    <div className="mt-1 text-[10px] md:text-xs text-gray-500">
                      <span className="font-semibold text-gray-600">
                        Addons:
                      </span>
                      <ul className="ml-2 list-disc list-inside">
                        {item.addons.map((addon, i) => (
                          <li key={i} className="flex justify-between">
                            <span>{addon.name}</span>
                            <span>
                              Tk {addon.qty} x {addon.price} ={" "}
                              <b>Tk {(addon.qty * addon.price).toFixed(2)}</b>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="text-center font-medium text-xs md:text-base">
                  {item.qty}
                </div>

                <div className="text-center font-medium text-xs md:text-base">
                  <div>
                    Base:{" "}
                    <span className="font-semibold">
                      Tk {item.price?.toFixed(2)}
                    </span>
                  </div>
                  {addonsTotal > 0 && (
                    <div>
                      Addons:{" "}
                      <span className="font-semibold">
                        Tk {addonsTotal.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-center font-semibold text-xs md:text-base">
                  <div className="">
                    Tk {(baseTotal + addonsTotal).toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* Totals Section */}
      <div className="font-serif px-4 py-3 md:px-6 md:py-4 bg-emerald-950 text-white border-t border-gray-200">
        <div className="grid grid-cols-1 gap-2 text-sm md:text-base">
          <div className="flex justify-between">
            <span className="font-medium">Base Total:</span>
            <span className="font-semibold font-inter">
              Tk {grandBaseTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Addons Total:</span>
            <span className="font-semibold font-inter">
              Tk {grandAddonsTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Gross Total:</span>
            <span className="font-semibold font-inter">
              Tk {grandTotal.toFixed(2)}
            </span>
          </div>
          {discountPrice > 0 && (
            <div className="flex justify-between text-primary">
              <span className="font-medium">Discount:</span>
              <span className="font-semibold font-inter">
                -Tk {discountPrice.toFixed(2)}
              </span>
            </div>
          )}
          {needsShipping && (
            <div className="flex justify-between text-yellow-600">
              <span className="font-medium">Shipping:</span>
              <span className="font-semibold font-inter">
                Tk {shippingFee.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
            <span className="font-bold text-lg">Final Total:</span>
            <span className="font-bold text-lg font-inter">
              Tk {finalTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
