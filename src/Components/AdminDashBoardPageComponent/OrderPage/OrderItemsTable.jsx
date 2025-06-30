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
      <div className="bg-gradient-to-r from-bg-secondary to-emerald-700 text-white px-4 py-3 md:px-6 md:py-4 border-t border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between gap-2 items-center w-full">
          <div className="flex flex-col md:flex-row gap-1 md:gap-6 text-xs md:text-sm w-full md:w-auto">
            <span className="border-b-2 border-emerald-400 pb-0.5 px-1">
              Base Total:{" "}
              <span className="font-semibold">
                Tk {grandBaseTotal.toFixed(2)}
              </span>
            </span>
            <span className="border-b-2 border-emerald-400 pb-0.5 px-1">
              Addons Total:{" "}
              <span className="font-semibold">
                Tk {grandAddonsTotal.toFixed(2)}
              </span>
            </span>
            <span className="border-b-2 border-emerald-400 pb-0.5 px-1">
              Gross Total:{" "}
              <span className="font-semibold">Tk {grandTotal.toFixed(2)}</span>
            </span>
            {discountPrice > 0 && (
              <span className="border-b-2 border-red-400 pb-0.5 px-1 text-red-200">
                Discount:{" "}
                <span className="font-semibold">
                  -Tk {discountPrice.toFixed(2)}
                </span>
              </span>
            )}
            {needsShipping && (
              <span className="border-b-2 border-yellow-400 pb-0.5 px-1 text-yellow-200">
                Shipping:{" "}
                <span className="font-semibold">
                  Tk {shippingFee.toFixed(2)}
                </span>
              </span>
            )}
          </div>
          <div className="text-lg md:text-2xl font-bold text-right mt-2 md:mt-0 w-full md:w-auto border-t-2 md:border-t-0 border-emerald-400 pt-2 md:pt-0">
            Final Total:{" "}
            <span className="text-emerald-200">Tk {finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
