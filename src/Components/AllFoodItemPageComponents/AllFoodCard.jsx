import React, { useState, useMemo } from "react";
import {
  useGetAllProductsQuery,
  useGetMenuCategoriesQuery,
} from "../../redux/apiSlice";
import FoodCard from "../SharedComponent/FoodCard";
import { Loader } from "../SharedComponent/Loader";

export const AllFoodCard = () => {
  const {
    data: foodItems = [],
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery();

  const { data: categoriesData = [], isLoading: isCategoriesLoading } =
    useGetMenuCategoriesQuery();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Count products per category
  const categoryCounts = useMemo(() => {
    const counts = {};
    foodItems.forEach((item) => {
      const name = item.category?.name || "Uncategorized";
      counts[name] = (counts[name] || 0) + 1;
    });
    return counts;
  }, [foodItems]);

  // Combined categories with count and image if available
  const sidebarCategories = useMemo(() => {
    if (isCategoriesLoading) return [];

    return [
      { label: "All", count: foodItems.length },
      ...categoriesData
        .map((cat) => ({
          label: cat.name || "Uncategorized",
          count: categoryCounts[cat.name] || 0,
          image: cat.image || null,
        }))
        .filter((cat) => cat.count > 0),
    ];
  }, [categoriesData, foodItems.length, categoryCounts, isCategoriesLoading]);

  if (isLoading || isCategoriesLoading) {
    return <Loader comp_Name="Foods" />;
  }

  if (isError) {
    return (
      <p className="text-center mt-12 text-red-500">
        Error: {error?.data?.message || error.error}
      </p>
    );
  }

  // Filter food items
  const filtered = foodItems.filter(
    (item) =>
      (activeCategory === "All" || item.category?.name === activeCategory) &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-6 mt-10 min-h-screen">
        {/* Filter Controls */}
        <>
          {/* Mobile Design (below lg) */}
          <nav className="flex flex-wrap justify-center gap-4 mb-8 lg:hidden cursor-pointer">
            {sidebarCategories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`
                  flex items-center px-4 py-1 rounded-full font-medium transition-all cursor-pointer
                  ${
                    activeCategory === cat.label
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
                  }
                `}
              >
                <span>
                  {cat.label}
                  {cat.label !== "All" && ` (${cat.count})`}
                </span>
              </button>
            ))}
          </nav>

          {/* Desktop (lg+) Design */}
          <aside className="hidden lg:block w-full lg:w-1/4">
            <div className="flex flex-wrap lg:flex-col gap-3 lg:gap-4 lg:space-y-2 lg:h-full justify-start">
              {sidebarCategories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-bl-3xl rounded-tr-3xl font-mono text-sm sm:text-base whitespace-nowrap transition-all  cursor-pointer ${
                    activeCategory === cat.label
                      ? "bg-primary text-white"
                      : "bg-bg-secondary text-gray-300 hover:bg-gray-700"
                  }`}
                  style={{
                    minWidth: "fit-content",
                  }}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </aside>
        </>

        {/* Main Content */}
        <main className="flex-1">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 mt-6">
              No food items available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-36">
              {filtered.map((item) => (
                <FoodCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
