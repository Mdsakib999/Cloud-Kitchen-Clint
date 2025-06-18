import { useState } from "react";
import { foodItems } from "../../FakeDB/FoodItem";
import { ShoppingCart, Info } from "lucide-react";
import { Link } from "react-router-dom";

export const AllFoodCard = () => {
  const [sortBy, setSortBy] = useState("price");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const sortedItems = [...foodItems].sort((a, b) => {
    if (sortBy === "price") {
      return a.price - b.price;
    }
    return a.name.localeCompare(b.name);
  });

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedItems.slice(startIndex, startIndex + itemsPerPage);

  const addToCart = (item) => {
    console.log("Added to cart:", item);
  };

  const showDetails = (item) => {
    console.log("Show details for:", item);
    // You can open a modal here if needed
  };

  return (
    <div className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-primary text-lg font-medium mb-2">
            Your meal, your way
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Choose your <span className="text-primary">Food</span>
          </h1>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <p className="text-gray-300 text-sm">
            Showing {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, sortedItems.length)} of{" "}
            {sortedItems.length} results
          </p>
          <div className="flex items-center gap-2">
            <label className="text-gray-300 text-sm">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-700 text-white px-3 py-1 rounded border border-slate-600 focus:border-orange-400 focus:outline-none"
            >
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* No items fallback */}
        {currentItems.length === 0 && (
          <p className="text-center text-gray-400">No food items available.</p>
        )}

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 mb-12">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-bg-secondary rounded-2xl overflow-hidden transition-all duration-300 border border-slate-700 hover:border-orange-400"
            >
              <div className="relative">
                <img
                  src={item.images?.[0] || ""}
                  alt={item.name}
                  className="w-full h-64 object-fit"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-white font-semibold text-lg mb-2 text-center">
                  {item.name}
                </h3>
                <p className="text-primary font-bold text-center mb-4">
                  ${item.price.toFixed(2)}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to cart
                  </button>

                  <Link to={`/food-details/${item.id}`} state={{ item }}>
                    {" "}
                    <button
                      onClick={() => showDetails(item)}
                      className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                    >
                      <Info className="w-5 h-5" />
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentPage === index + 1
                    ? "bg-orange-400 scale-125"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
