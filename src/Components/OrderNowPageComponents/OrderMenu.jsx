import React, { useState } from "react";
import { Search } from "lucide-react";
import { MENU } from "../../FakeDB/menu";
import { Link } from "react-router-dom";
export const OrderMenu = () => {
  const categoryMap = MENU.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
  const categories = ["All", ...Object.keys(categoryMap)];

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items
  const filtered = MENU.filter((item) => {
    const inCat = activeCategory === "All" || item.category === activeCategory;
    const matches = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return inCat && matches;
  });

  return (
    <div className="min-h-screen bg-bg-secondary p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-700 bg-bg-primary rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Category Tabs */}
        <nav className="flex flex-wrap justify-center gap-4 pt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-bg-primary text-gray-300 hover:bg-gray-700"
              }`}
            >
              {cat} {cat !== "All" && `(${categoryMap[cat]})`}
            </button>
          ))}
        </nav>

        <div className="bg-bg-primary rounded-lg shadow divide-y divide-gray-700">
          {[...new Set(filtered.map((item) => item.category))].map(
            (category) => (
              <section key={category} className="py-6 px-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {category}
                </h2>
                <ul className="space-y-4">
                  {filtered
                    .filter((item) =>
                      activeCategory === "All"
                        ? item.category === category
                        : item.category === activeCategory
                    )
                    .map((item) => (
                      <li key={item.id} className="flex gap-4 items-center">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">
                            {item.title}
                          </h3>
                          <p className="text-gray-400 mt-1 leading-snug">
                            {item.ingredients.join(", ")}
                          </p>
                        </div>
                        <div className="text-right space-y-2">
                          <span className="text-lg font-medium text-primary block">
                            ${item.sizes[0].price.toFixed(2)}
                          </span>
                          <Link
                            to={`/food-details/${item.id}`}
                            state={{ item }}
                          >
                            <button className="text-sm font-semibold text-primary hover:underline">
                              View Details
                            </button>
                          </Link>
                        </div>
                      </li>
                    ))}
                </ul>
              </section>
            )
          )}
        </div>
      </div>
    </div>
  );
};
