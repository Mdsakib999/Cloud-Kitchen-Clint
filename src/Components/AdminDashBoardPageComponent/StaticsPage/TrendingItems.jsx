import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useGetTrendingProductsQuery } from "../../../redux/apiSlice";

export const TrendingItems = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");

  const {
    data = [],
    isLoading,
    error,
  } = useGetTrendingProductsQuery(selectedPeriod.toLowerCase(), {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading)
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-2xl">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2 text-gray-600">
            Loading trending products...
          </span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-2xl">
        <div className="text-center text-red-500 py-8">
          <p>Error loading trending products</p>
          <p className="text-sm text-gray-500 mt-1">
            {error?.message || "Please try again later"}
          </p>
        </div>
      </div>
    );

  const periods = ["Daily", "Weekly", "Monthly"];
  const currentItems = data;

  const TrendIcon = ({ trend, percentage }) => {
    if (trend === "up") {
      return (
        <div className="flex items-center text-green-600">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-label="Trending up"
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
            aria-label="Trending down"
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

  const TrendingItem = ({ item, rank }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      {/* Left side - Rank, Image, Details */}
      <div className="flex items-center space-x-3 flex-1">
        {/* Rank */}
        <div className="text-lg font-bold text-gray-800 w-6 text-center">
          #{rank}
        </div>

        {/* Food Image */}
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
          {item.image && item.image.startsWith("http") ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : (
            <span>{item.image || "🍽️"}</span>
          )}
          <span
            style={{ display: "none" }}
            className="flex items-center justify-center w-full h-full"
          >
            🍽️
          </span>
        </div>

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1 truncate">
            {item.name}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-gray-800">
              ${item.totalRevenue ? item.totalRevenue.toFixed(2) : "0.00"}
            </span>
            <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-0.5 rounded">
              {typeof item.category === "string"
                ? item.category
                : item.category?.name || "Unknown"}
            </span>
          </div>
        </div>
      </div>

      {/* Right side - Trend and Sales */}
      <div className="flex items-center space-x-3">
        {/* Trend Indicator */}
        <div className="flex flex-col items-center min-w-0">
          <TrendIcon
            trend={item.trend || "up"}
            percentage={item.percentage || 0}
          />
        </div>

        {/* Sales */}
        <div className="text-right min-w-0">
          <div className="text-base font-bold text-gray-900">
            {item.sales || 0}
          </div>
          <div className="text-xs text-gray-500">Sales</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="text-orange-500 text-xl">🔥</div>
          <h2 className="text-xl font-bold text-gray-900">
            Top 6 Trending Items
          </h2>
        </div>

        {/* Period Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            aria-label="Select time period"
            aria-expanded={isDropdownOpen}
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
        {currentItems.length === 0 && !isLoading && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">📊</div>
            <p>
              No trending products found for {selectedPeriod.toLowerCase()}{" "}
              period.
            </p>
            <p className="text-sm mt-1">Try a different time period.</p>
          </div>
        )}
        {currentItems.map((item, idx) => (
          <TrendingItem
            key={item.id || item._id || idx}
            item={item}
            rank={item.rank || idx + 1}
          />
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
