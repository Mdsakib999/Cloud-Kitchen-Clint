import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetAllProductsQuery } from "../../redux/apiSlice";
import FoodCard from "../SharedComponent/FoodCard";

export const AllFoodCard = () => {
  const {
    data: foodItems = [],
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // derive unique categories
  const sidebarCategories = React.useMemo(() => {
    const counts = {};
    foodItems.forEach((fi) => {
      const cat = fi.category?.name || "Uncategorized";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([label, count]) => ({ label, count }));
  }, [foodItems]);

  if (isLoading) return <p className="text-center mt-12">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-12 text-red-500">
        Error: {error?.data?.message || error.error}
      </p>
    );

  // filter items
  const filtered = foodItems.filter(
    (item) =>
      (activeCategory === "All" || item.category?.name === activeCategory) &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-8 pt-36">
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

        {filtered.length === 0 && (
          <p className="text-center text-gray-400">No food items available.</p>
        )}

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-1/3 pr-6 border-r border-gray-700 space-y-2 mt-20">
            {sidebarCategories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`w-full text-left px-8 py-4 mb-5 rounded-bl-4xl rounded-tr-4xl font-mono transition-all ${
                  activeCategory === cat.label
                    ? "bg-primary text-white text-xl"
                    : "bg-bg-secondary text-gray-300 hover:bg-gray-700"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <main className="px-8 w-full">
            {/* Header & Search */}
            {/* <div className="flex justify-between items-center py-4 my-10 ">
              <h2 className="text-2xl font-semibold text-white">
                {activeCategory}
              </h2>
            </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 mb-36">
              {filtered.map((item) => (
                <FoodCard key={item._id} item={item} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
