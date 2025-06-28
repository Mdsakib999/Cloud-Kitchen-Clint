import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoClose, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { updateQuantity, removeFromCart } from "../../redux/cartSlice";
import { Minus, Plus } from "lucide-react";

const CartSlider = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    } else {
      setDeleteTarget(id); // open modal instead
    }
  };

  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    setDeleteTarget(null);
  };

  return (
    <>
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
              const addonTotal =
                item.addons?.reduce((sum, a) => sum + a.price, 0) || 0;
              const totalPrice = (item.price + addonTotal) * item.quantity;

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
                    <h3 className="font-medium ">{item.name}</h3>
                    <span className="text-sm bg-bg-cart py-1 px-2 rounded-2xl mb-2">
                      {item.size}
                    </span>
                    {item.addons?.length > 0 && (
                      <ul className="mt-1 text-sm text-gray-400">
                        {item.addons.map((addon, i) => (
                          <li key={i} className="flex justify-between">
                            <span>+ {addon.label}</span>
                            <span>${addon.price.toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex items-center mt-1">
                      <button
                        onClick={() => handleDecrease(item._id, item.quantity)}
                        className="px-2 py-1 text-sm bg-bg-secondary rounded"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item._id, item.quantity)}
                        className="px-2 py-1 text-sm bg-bg-secondary rounded"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">
                      Price: ${totalPrice.toFixed(2)}
                    </p>
                  </div>

                  <button onClick={() => setDeleteTarget(item._id)}>
                    <IoTrashOutline className="text-xl text-red-500 ml-2" />
                  </button>
                </div>
              );
            })
          )}
          <div className="flex justify-between text-lg font-semibold text-white">
            <span>Total:</span>
            <span>
              $
              {cartItems.ids
                .reduce((total, id) => {
                  const item = cartItems.entities[id];
                  const addonTotal =
                    item.addons?.reduce((sum, a) => sum + a.price, 0) || 0;
                  const itemTotal = (item.price + addonTotal) * item.quantity;
                  return total + itemTotal;
                }, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>

        {/* Footer buttons */}
        {/* Footer with Total & Buttons */}
        <div className="px-4 py-4 border-t border-gray-500 space-y-2">
          {/* Total Price */}

          {/* Buttons */}
          <Link
            to="/checkout"
            onClick={onClose}
            className="block w-full text-center bg-bg-secondary border border-primary text-white py-2 rounded"
          >
            Checkout
          </Link>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Remove item?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove this item from your cart?
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRemove(deleteTarget)}
                className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartSlider;
