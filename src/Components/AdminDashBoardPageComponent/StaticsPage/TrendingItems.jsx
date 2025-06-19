import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const TrendingItems = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sample trending items data
  const trendingData = {
    Weekly: [
      {
        id: 1,
        rank: 1,
        name: "Tuna Soup Spinach with himalaya salt",
        price: 12.56,
        category: "MAIN COURSE",
        sales: 524,
        trend: "up",
        percentage: 12,
        image: "🍲",
      },
      {
        id: 2,
        rank: 2,
        name: "Tuna Soup Spinach with himalaya salt",
        price: 12.56,
        category: "MAIN COURSE",
        sales: 215,
        trend: "down",
        percentage: 2,
        image: "🍲",
      },
      {
        id: 3,
        rank: 3,
        name: "Tuna Soup Spinach with himalaya salt",
        price: 12.56,
        category: "MAIN COURSE",
        sales: 524,
        trend: "up",
        percentage: 12,
        image: "🍲",
      },
      {
        id: 4,
        rank: 4,
        name: "Tuna Soup Spinach with himalaya salt",
        price: 12.56,
        category: "MAIN COURSE",
        sales: 524,
        trend: "up",
        percentage: 12,
        image: "🍲",
      },
    ],
    Daily: [
      {
        id: 1,
        rank: 1,
        name: "Caesar Salad with Grilled Chicken",
        price: 15.99,
        category: "SALAD",
        sales: 89,
        trend: "up",
        percentage: 8,
        image: "🥗",
      },
      {
        id: 2,
        rank: 2,
        name: "Beef Burger with Sweet Potato Fries",
        price: 18.5,
        category: "MAIN COURSE",
        sales: 67,
        trend: "up",
        percentage: 15,
        image: "🍔",
      },
      {
        id: 3,
        rank: 3,
        name: "Margherita Pizza",
        price: 14.25,
        category: "PIZZA",
        sales: 45,
        trend: "down",
        percentage: 3,
        image: "🍕",
      },
      {
        id: 4,
        rank: 4,
        name: "Chocolate Lava Cake",
        price: 8.99,
        category: "DESSERT",
        sales: 38,
        trend: "up",
        percentage: 22,
        image: "🍰",
      },
    ],
    Monthly: [
      {
        id: 1,
        rank: 1,
        name: "Signature Pasta Carbonara",
        price: 16.75,
        category: "PASTA",
        sales: 1250,
        trend: "up",
        percentage: 18,
        image: "🍝",
      },
      {
        id: 2,
        rank: 2,
        name: "Grilled Salmon with Vegetables",
        price: 24.99,
        category: "SEAFOOD",
        sales: 980,
        trend: "up",
        percentage: 25,
        image: "🐟",
      },
      {
        id: 3,
        rank: 3,
        name: "Chicken Tikka Masala",
        price: 19.5,
        category: "CURRY",
        sales: 875,
        trend: "down",
        percentage: 5,
        image: "🍛",
      },
      {
        id: 4,
        rank: 4,
        name: "Vegetarian Buddha Bowl",
        price: 13.25,
        category: "HEALTHY",
        sales: 650,
        trend: "up",
        percentage: 30,
        image: "🥙",
      },
    ],
  };

  const periods = ["Daily", "Weekly", "Monthly"];
  const currentItems = trendingData[selectedPeriod];

  const TrendIcon = ({ trend, percentage }) => {
    if (trend === "up") {
      return (
        <div className="flex items-center text-green-600">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          <span className="text-sm font-medium">{percentage}%</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-red-500">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          </svg>
          <span className="text-sm font-medium">{percentage}%</span>
        </div>
      );
    }
  };

  const TrendingItem = ({ item }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      {/* Left side - Rank, Image, Details */}
      <div className="flex items-center space-x-4 flex-1">
        {/* Rank */}
        <div className="text-lg font-bold text-gray-800 w-8">#{item.rank}</div>

        {/* Food Image */}
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
          {item.image}
        </div>

        {/* Item Details */}
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">
            {item.name}
          </h3>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-gray-800">
              ${item.price}
            </span>
            <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded">
              {item.category}
            </span>
          </div>
        </div>
      </div>

      {/* Right side - Trend and Sales */}
      <div className="flex items-center space-x-4">
        {/* Trend Indicator */}
        <div className="flex flex-col items-center">
          <TrendIcon trend={item.trend} percentage={item.percentage} />
        </div>

        {/* Sales */}
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">{item.sales}</div>
          <div className="text-xs text-gray-500">Sales({item.percentage}%)</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          {/* Fire Icon */}
          <div className="text-orange-500 text-xl">🔥</div>
          <h2 className="text-xl font-bold text-gray-900">Trending Items</h2>
        </div>

        {/* Period Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            <span className="font-medium">{selectedPeriod}</span>
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    selectedPeriod === period
                      ? "bg-gray-900 text-white font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Trending Items List */}
      <div className="space-y-0">
        {currentItems.map((item) => (
          <TrendingItem key={item.id} item={item} />
        ))}
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};
