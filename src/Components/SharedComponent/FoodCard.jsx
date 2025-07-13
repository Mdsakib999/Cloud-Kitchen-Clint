import React, { useState, useRef } from "react";
import { FiStar } from "react-icons/fi";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const FoodCard = ({ item }) => {
  const [selectedSize, setSelectedSize] = useState(item.sizes[0]);
  const discountPrice = item.sizes?.[0]?.discountPrice;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  return (
    <div className="text-center group font-inter">
      <div
        key={item._id}
        className="bg-bg-secondary rounded-3xl  shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-700 hover:border-primary overflow-hidden group"
      >
        <div className="relative">
          <img
            src={item.images?.[0]?.url || ""}
            alt={item.title}
            className="w-full h-58 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
            <FiStar className="text-sm text-white" />
            <span>{item.rating}</span>
          </span>
        </div>
      </div>
      <Link to={`/food-details/${item._id}`} state={{ item }}>
        <p className="mt-4 font-medium text-lg text-gray-200 group-hover:text-white hover:text-primary">
          {item.title}
        </p>
      </Link>
      {/* Added cook time */}
      {item.cookTime && (
        <div className="text-sm text-gray-400 my-1 flex items-center justify-center gap-1">
          <FaClock className="w-4 h-4" /> {item.cookTime} mins
        </div>
      )}

      {/* Dynamic Price */}
      <div className="mt-2 ">
        {selectedSize.discountPrice > 0 ? (
          <div className="flex justify-center items-center gap-2.5">
            {/* discounted price, highlighted */}
            <span className="font-semibold text-primary text-lg">
              {selectedSize.discountPrice.toFixed(2)} Tk
            </span>
            {/* original price */}
            <span className="text-gray-400 line-through text-sm">
              {selectedSize.price.toFixed(2)} Tk
            </span>
          </div>
        ) : (
          <span className="font-semibold text-primary text-lg">
            {selectedSize.price.toFixed(2)} Tk
          </span>
        )}
      </div>

      <div className="flex justify-center items-center gap-3 ">
        <div
          className="relative inline-block mt-4 text-white"
          ref={dropdownRef}
        >
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="w-full bg-primary py-2 px-4 rounded-full border border-primary flex justify-between items-center min-w-[140px]"
          >
            <span>{selectedSize.label}</span>
            <svg
              className={`w-5 h-5 text-white transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {open && (
            <ul className="absolute z-10 mt-2 w-full bg-primary border border-primary rounded-lg shadow-lg">
              {item.sizes.map((s) => (
                <li
                  key={s.label}
                  onClick={() => {
                    setSelectedSize(s);
                    setOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-bg-cart cursor-pointer text-white hover:text-gray-300 first:rounded-t-lg last:rounded-b-lg"
                >
                  {s.label} (${s.price.toFixed(2)})
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link to={`/food-details/${item._id}`} state={{ item }}>
          <button className="px-5 py-2 border-2 border-primary text-primary rounded-full text-sm hover:bg-primary hover:text-white transition mt-4">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FoodCard;
