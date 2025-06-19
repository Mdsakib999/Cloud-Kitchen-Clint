import { useState } from "react";
import { Plus, Search } from "lucide-react";
import {
  categories as mealTabs,
  sidebarCategories,
  menuData as menuItems,
} from "../../FakeDB/menuData";

export const OrderMenu = () => {
  const [activeTab, setActiveTab] = useState("Breakfast");
  const [activeCategory, setActiveCategory] = useState("Starters");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen font-sans">
      {/* Tabs */}
      <div className="flex gap-8 mb-4 border-b border-gray-700 pb-2  max-w-7xl mx-auto">
        {mealTabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-8 py-3 rounded-md transition-all font-semibold ${
              activeTab === tab.label
                ? "bg-bg-secondary  text-white text-xl"
                : "bg-gradient-to-r from-[#4a4a4a] to-[#2a2a2a] text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-1/3 pr-6 border-r border-gray-700 space-y-2">
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
          <div className="flex justify-between items-center py-4 my-8">
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

          {/* Food Items */}
          <div className="space-y-6">
            {menuItems
              .filter(
                (item) =>
                  item.category.toLowerCase() ===
                    activeCategory.toLowerCase() &&
                  item.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-gray-700 pb-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover border border-gray-600"
                    />
                    <div className="">
                      {/* Title and Price */}
                      <h3 className="text-base font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="text-xl font-medium text-orange-400">
                        ${item.price}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-gray-400 leading-snug max-w-md">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <button className="bg-orange-400 hover:bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                    <Plus size={16} />
                  </button>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
};
