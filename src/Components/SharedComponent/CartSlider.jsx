import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoClose, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { updateQuantity, removeFromCart } from "../../redux/cartSlice";
import { useAuth } from "../../providers/AuthProvider";
import toast from "react-hot-toast";

const CartSlider = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const { user } = useAuth();
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDecrease = (id, currentQty) => {
    currentQty > 1
      ? dispatch(updateQuantity({ id, quantity: currentQty - 1 }))
      : setDeleteTarget(id);
  };

  const handleIncrease = (id, currentQty) =>
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    setDeleteTarget(null);
  };

  const handleCheckoutClick = (e) => {
    if (user?.role === "admin") {
      e.preventDefault();
      toast(
        <h1 className="text-center font-serif text-red-600">
          Create customer account to order food
        </h1>
      );
      return;
    }
    onClose();
  };

  // compute total once
  const totalAmount = cartItems.ids
    .reduce((sum, id) => {
      const item = cartItems.entities[id];
      const addonTotal = item.addons?.reduce((a, x) => a + x.price, 0) || 0;
      return sum + (item.price + addonTotal) * item.quantity;
    }, 0)
    .toFixed(2);

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-bg-primary text-gray-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          flex flex-col  ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex justify-between items-center px-4 py-8 border-b border-gray-500 pt-16">
          <h2 className="text-2xl font-medium uppercase">Your Cart</h2>
          <button onClick={onClose}>
            <IoClose className="cursor-pointer text-2xl" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.ids.length === 0 ? (
            <p className="font-serif">Your cart is empty !</p>
          ) : (
            cartItems.ids.map((id) => {
              const item = cartItems.entities[id];
              const addonTotal =
                item.addons?.reduce((a, x) => a + x.price, 0) || 0;
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
                    <h3 className="font-medium">{item.name}</h3>
                    {item.addons?.length > 0 && (
                      <ul className="mt-1 text-sm text-gray-400">
                        {item.addons.map((ad, i) => (
                          <li key={i} className="flex justify-between">
                            + {ad.label} ({ad.price.toFixed(2)} Tk)
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex items-center mt-1">
                      <button
                        onClick={() => handleDecrease(item._id, item.quantity)}
                        className="px-2 py-1 bg-bg-secondary rounded text-sm"
                      >
                        –
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item._id, item.quantity)}
                        className="px-2 py-1 bg-bg-secondary rounded text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-300">
                      {totalPrice.toFixed(2)} Tk
                    </p>
                    <button
                      onClick={() => setDeleteTarget(item._id)}
                      className="mt-1 text-red-500"
                    >
                      <IoTrashOutline className="text-xl" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sticky Footer */}
        <div className="flex-shrink-0 border-t border-gray-500 bg-bg-primary">
          <div className="flex justify-between items-center px-4 py-3 text-lg font-semibold text-white">
            <span>Total:</span>
            <span>{totalAmount} Tk</span>
          </div>
          <div className="px-4 pb-4">
            {cartItems.ids.length === 0 ? (
              <span className="block w-full text-center bg-[#ddb275] text-white py-2 rounded cursor-not-allowed border border-gray-400">
                Checkout
              </span>
            ) : (
              <Link
                to="/checkout"
                onClick={handleCheckoutClick}
                className="block w-full text-center bg-primary hover:bg-white hover:text-black duration-500 border border-primary text-white py-2 rounded"
              >
                Checkout
              </Link>
            )}
          </div>
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
