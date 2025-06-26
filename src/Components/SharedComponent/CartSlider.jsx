import { useSelector, useDispatch } from "react-redux";
import { IoClose, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { updateQuantity, removeFromCart } from "../../redux/cartSlice";
import { Minus, Plus } from "lucide-react";

const CartSlider = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-bg-primary text-gray-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-8 border-b border-gray-500 pt-16">
        <h2 className="text-2xl font-medium uppercase">Your Cart</h2>
        <button onClick={onClose}>
          <IoClose className="text-2xl" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100%-160px)]">
        {cartItems.ids.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.ids.map((id) => {
            const item = cartItems.entities[id];
            return (
              <div
                key={id}
                className="flex items-center border-b border-gray-500 pb-4"
              >
                <img
                  src={item.image || ""}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-3"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>

                  <div className="flex items-center">
                    <button
                      onClick={() => handleDecrease(item._id, item.quantity)}
                      className="cursor-pointer p-2 text-sm bg-emerald-50 text-emerald-900 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item._id, item.quantity)}
                      className="cursor-pointer p-2 text-sm bg-emerald-50 text-emerald-900 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-emerald-200 mt-1">
                    Price: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <button onClick={() => handleRemove(item._id)}>
                  <IoTrashOutline className="text-xl text-red-500" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer buttons */}
      <div className="px-4 py-4 border-t border-gray-500">
        <Link
          to="/"
          onClick={onClose}
          className="block w-full text-center bg-primary text-bg-primary py-2 rounded mb-2"
        >
          View Cart
        </Link>
        <Link
          to="/checkout"
          onClick={onClose}
          className="block w-full text-center bg-bg-secondary border border-primary text-white py-2 rounded"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartSlider;
