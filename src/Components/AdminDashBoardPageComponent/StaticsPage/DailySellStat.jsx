import TotalOrder from "/assets/Icon/TotalOrder.png";
import TotalDeliver from "/assets/Icon/TotalDeliver.png";
import TotalCancel from "/assets/Icon/TotalCancel.png";
import TotalRevenue from "/assets/Icon/TotalRevenue.png";
import { TrendingUp, TrendingDown } from "lucide-react";

export const DailySellStat = () => {
  const statsData = [
    {
      id: 1,
      title: "Today's Orders",
      value: "12",
      icon: TotalOrder,
      bgColor: "bg-green-100",
      trend: "up",
      percentage: "20% vs yesterday",
      trendColor: "text-green-500",
    },
    {
      id: 2,
      title: "Today's Delivered",
      value: "8",
      icon: TotalDeliver,
      bgColor: "bg-blue-100",
      trend: "up",
      percentage: "33% vs yesterday",
      trendColor: "text-green-500",
    },
    {
      id: 3,
      title: "Today's Cancelled",
      value: "2",
      icon: TotalCancel,
      bgColor: "bg-red-100",
      trend: "down",
      percentage: "50% vs yesterday",
      trendColor: "text-red-500",
    },
    {
      id: 4,
      title: "Today's Revenue",
      value: "$234",
      icon: TotalRevenue,
      bgColor: "bg-purple-100",
      trend: "up",
      percentage: "15% vs yesterday",
      trendColor: "text-green-500",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-secondary mb-3">
        Today's Statistics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            {/* Icon and Value Section */}
            <div className="flex items-start gap-4 justify-between mb-4">
              <div
                className={`w-16 h-16 ${stat.bgColor} rounded-full p-2 flex items-center justify-center`}
              >
                <img
                  src={stat.icon}
                  alt={stat.title}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="text-left">
                <div className="flex flex-col">
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {stat.value}
                  </div>
                  {/* Title */}
                  <div className="text-gray-600 font-medium mb-3">
                    {stat.title}
                  </div>
                  {/* Trend Section */}
                  <div className="flex items-center space-x-2">
                    <div
                      className={`flex items-center space-x-1 ${stat.trendColor}`}
                    >
                      {stat.trend === "up" ? (
                        <TrendingUp size={16} />
                      ) : (
                        <TrendingDown size={16} />
                      )}
                      <span className="text-sm font-medium">
                        {stat.percentage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
