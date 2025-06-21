import { RxCross2 } from "react-icons/rx";
export const OrderItemsTable = ({ items }) => {
  return (
    <div className="flex-1 rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-bg-secondary text-white px-6 py-4 ">
        <div className="grid grid-cols-6 gap-4 font-medium">
          <div className="text-center">Image</div>
          <div className="text-center">Items</div>
          <div className="text-center">Qty</div>
          <div className="text-center">Price</div>
          <div className="text-center">Total Price</div>
          <div className="text-center">Action</div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-6 gap-4 items-center py-2 border-b border-gray-100 last:border-b-0"
          >
            <img
              src={item.pic}
              alt={item.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="flex-1 w-full">
              <div className="text-xs text-gray-400 uppercase tracking-wide whitespace-nowrap">
                {item.category}
              </div>
              <div className="font-semibold text-gray-800 whitespace-nowrap">
                {item.name}
              </div>
              <div className="text-yellow-400 text-sm">⭐⭐⭐⭐☆</div>
            </div>

            <div className="text-center font-medium">{item.quantity}x</div>

            <div className="text-center font-medium">
              ${item.price.toFixed(1)}
            </div>

            <div className="text-center font-semibold">
              ${item.total.toFixed(2)}
            </div>

            <div className="text-center">
              <button className="text-red-500 hover:text-red-700 text-xl transition-colors">
                <RxCross2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
