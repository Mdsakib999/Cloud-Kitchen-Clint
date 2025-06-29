import React, { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useGetMenuCategoriesQuery,
} from "../../redux/apiSlice";

export const OrderMenu = () => {
  const { data: products = [] } = useGetAllProductsQuery();
  const { data: categoriesData = [] } = useGetMenuCategoriesQuery();

  // Local state
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Build counts per category
  const categoryCount = products.reduce((acc, p) => {
    const name = p.category?.name ?? "Uncategorized";
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const categories = [
    { name: "All", image: null },
    ...categoriesData.map((cat) => ({
      name: cat.name,
      image: cat.image?.[0]?.url ?? null,
    })),
  ];

  const currentCategoryImage = categories.find(
    (c) => c.name === activeCategory
  )?.image;

  const filtered = products.filter((p) => {
    const inCat =
      activeCategory === "All" || p.category?.name === activeCategory;
    const matches = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return inCat && matches;
  });

  return (
    <div className="min-h-screen bg-bg-secondary p-6">
      <div className="max-w-7xl mx-auto">
        {/* CATEGORY TABS */}
        <nav className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`
                flex items-center whitespace-nowrap px-6 py-3 rounded-full font-medium transition-all
                ${
                  activeCategory === cat.name
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
                }
              `}
            >
              {cat.name !== "All" && cat.image && (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-6 h-6 rounded-full object-cover mr-2 flex-shrink-0"
                />
              )}
              <span>
                {cat.name}
                {cat.name !== "All" && ` (${categoryCount[cat.name] || 0})`}
              </span>
            </button>
          ))}
        </nav>

        {/* MAIN LAYOUT - Large Category Image + Menu Items */}
        <div className=" overflow-hidden">
          <div className="flex">
            {/* LEFT SIDE - Large Category Image */}
            <div className="w-3/5 relative">
              <div className="sticky top-0 h-screen flex items-center justify-center bg-bg-secondary p-8">
                <div className="relative">
                  {/* Decorative borders */}
                  <div className="absolute inset-0 border-8 border-white rounded-full transform rotate-6"></div>
                  <div className="absolute inset-0 border-4 border-red-300 rounded-full transform -rotate-3"></div>

                  {/* Main image */}
                  <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <img
                      src={
                        currentCategoryImage ||
                        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop&crop=center"
                      }
                      alt={activeCategory}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Menu Items */}
            <div className="w-3/5 p-8 bg-bg-secondary">
              <div className="space-y-6">
                {filtered.map((item, idx) => {
                  const prices = item.sizes || [];
                  const low = prices[0]?.price ?? 0;
                  const high = prices[1]?.price ?? low;

                  return (
                    <div
                      key={item._id}
                      className="flex items-center justify-between py-6  border-b border-gray-200 hover:bg-bg-primary  transition-all"
                    >
                      {/* Item Image */}
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 ">
                        <img
                          src={item.images[0].url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 ml-6 ">
                        <h3 className="text-xl font-bold text-gray-300 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {item.ingredients?.join(" / ")}
                        </p>
                      </div>

                      {/* Dashed Line */}
                      <div className="flex-1 mx-6 border-t-2 border-dashed border-gray-300"></div>

                      {/* Prices */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary mb-1">
                          ${low.toFixed(2)}
                        </div>
                        <div className="text-xl font-bold text-primary">
                          ${high.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
