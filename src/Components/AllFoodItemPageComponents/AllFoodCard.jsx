import { useState } from "react";
import { foodItems, sidebarCategories } from "../../FakeDB/FoodItem";
import { ShoppingCart, Info, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";

export const AllFoodCard = () => {
  const [activeCategory, setActiveCategory] = useState("Indian");
  const [searchTerm, setSearchTerm] = useState("");

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

        {/* No items fallback */}
        {foodItems.length === 0 && (
          <p className="text-center text-gray-400">No food items available.</p>
        )}

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-1/3 pr-6 border-r border-gray-700 space-y-2 mt-20">
            {sidebarCategories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`w-full text-left px-8 py-4  mb-5 rounded-bl-4xl rounded-tr-4xl  rounded-md font-mono t transition-all ${
                  activeCategory === cat.label
                    ? "bg-bg-secondary  text-white text-xl"
                    : "bg-gradient-to-r from-[#4a4a4a] to-[#2a2a2a] text-gray-300 hover:bg-gray-700"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <main className="px-8 w-full">
            {/* Header & Search */}
            <div className="flex justify-between items-center py-4 my-16">
              <h2 className="text-2xl font-semibold text-white">
                {activeCategory}
              </h2>
              <div className="flex items-center w-80 bg-[#2b2b2b] rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search within menu"
                  className="bg-transparent text-white placeholder-gray-400 text-sm outline-none w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {foodItems
                .filter(
                  (item) =>
                    item.category.toLowerCase() ===
                      activeCategory.toLowerCase() &&
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-bg-secondary rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-700 hover:border-orange-500 overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={item.images?.[0] || ""}
                        alt={item.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 right-3 bg-primary/40 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        ⭐ {item.rating}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <Link to={`/food-details/${item.id}`} state={{ item }}>
                          <h3 className="text-white text-lg font-semibold hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                      </div>

                      {/* Optional: Mini info line */}
                      <div className="text-sm text-slate-300 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1">
                          <FaClock className="w-4 h-4" />{" "}
                          {item.cookTime || "20 mins"}
                        </span>
                        <span className="text-primary font-semibold text-xl">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Button */}
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
