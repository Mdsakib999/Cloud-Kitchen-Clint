import React, { useState } from "react";
const MENU_ITEMS = [
  {
    id: 1,
    title: "Chickpea Pancakes",
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Indian",
  },
  {
    id: 2,
    title: "South Indian Meal",
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Indian",
  },
  {
    id: 3,
    title: "Spiced ButterMilk",
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Indian",
  },
  {
    id: 4,
    title: "Shahi Korma Paratha",
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Indian",
  },
];

const CATEGORIES = ["All", "Indian", "Italian", "French", "Chinese"];

const HomeMenu = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="py-16 px-4 bg-secondary text-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-accent uppercase mb-2">
          Taste the Best, Enjoy the Rest
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Explore Our Menu
        </h2>

        {/* Category Tabs */}
        <div className="flex space-x-4 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border border-accent transition focus:outline-none focus:ring-2 focus:ring-accent 
                  ${
                    activeCategory === cat
                      ? "bg-accent text-secondary"
                      : "text-accent hover:bg-accent hover:text-secondary"
                  }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="text-center">
              <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg relative group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-60 object-cover"
                />
                {/* Hover icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 bg-opacity-40 opacity-0 group-hover:opacity-100 transition">
                  <span className="p-3 bg-accent rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              {/* Title outside card */}
              <p className="mt-4 font-medium text-lg text-gray-200">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Text and Button */}
        <div className="text-center">
          <p className="text-accent italic mb-6 text-2xl">
            Delicious Food, Fresh Ingredients, Crafted with Love, Satisfy Your
            Cravings!
          </p>
          <button className="px-8 py-3 bg-accent text-secondary rounded-full font-medium transition hover:opacity-90">
            View Full Menu →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeMenu;
