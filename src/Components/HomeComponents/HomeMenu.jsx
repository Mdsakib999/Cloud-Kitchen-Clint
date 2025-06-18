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
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center lg:text-left mb-8 lg:mb-12">
          <p className="text-xs sm:text-sm text-primary uppercase mb-2 tracking-wide">
            Taste the Best, Enjoy the Rest
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6 lg:mb-8">
            Explore Our Menu
          </h2>
        </div>

        {/* Category Tabs - Responsive */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4 mb-8 lg:mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full border border-accent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent text-sm sm:text-base
                  ${
                    activeCategory === cat
                      ? "bg-accent text-primary shadow-lg transform scale-105"
                      : "text-accent hover:bg-accent hover:text-secondary hover:shadow-md hover:transform hover:scale-102"
                  }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-12 lg:mb-16">
          {filteredItems.map((item) => (
            <div key={item.id} className="text-center group">
              <div className="bg-gray-800 rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl relative group transition-all duration-300 hover:transform hover:scale-105">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 sm:h-56 lg:h-60 xl:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="p-3 lg:p-4 bg-primary rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 lg:h-6 lg:w-6 text-bg-secondary"
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
              <p className="mt-4 lg:mt-6 font-medium text-base sm:text-lg lg:text-xl text-gray-200 group-hover:text-white transition-colors duration-300">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Text and Button */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-primary italic mb-6 lg:mb-8 text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed px-4">
            Delicious Food, Fresh Ingredients, Crafted with Love, Satisfy Your
            Cravings!
          </p>
          <button className="px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4 bg-primary text-bg-primary rounded-full font-medium text-sm sm:text-base lg:text-lg transition-all duration-300 hover:opacity-90 hover:transform hover:scale-105 hover:shadow-xl">
            View Full Menu →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeMenu;
