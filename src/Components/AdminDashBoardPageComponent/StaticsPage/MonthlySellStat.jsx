import TotalOrder from "/assets/Icon/TotalOrder.png";
import TotalDeliver from "/assets/Icon/TotalDeliver.png";
import TotalCancel from "/assets/Icon/TotalCancel.png";
import TotalRevenue from "/assets/Icon/TotalRevenue.png";
import { TrendingUp, TrendingDown } from "lucide-react";

export const MonthlySellStat = () => {
  const statsData = [
    {
      id: 1,
      title: "Total Orders",
      value: "75",
      icon: TotalOrder,
      bgColor: "bg-green-100",
      trend: "up",
      percentage: "1% (30 days)",
      trendColor: "text-green-500",
    },
    {
      id: 2,
      title: "Total Delivered",
      value: "357",
      icon: TotalDeliver,
      bgColor: "bg-blue-100",
      trend: "up",
      percentage: "1% (30 days)",
      trendColor: "text-green-500",
    },
    {
      id: 3,
      title: "Total Cancelled",
      value: "65",
      icon: TotalCancel,
      bgColor: "bg-green-100",
      trend: "down",
      percentage: "2% (30 days)",
      trendColor: "text-red-500",
    },
    {
      id: 4,
      title: "Total Revenue",
      value: "$1280",
      icon: TotalRevenue,
      bgColor: "bg-green-100",
      trend: "down",
      percentage: "1% (30 days)",
      trendColor: "text-red-500",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-primary mb-3">
        Monthly Statistics
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
                className={`w-20 h-20 ${stat.bgColor} rounded-full p-2 flex items-center justify-center`}
              >
                <img
                  src={stat.icon}
                  alt={stat.title}
                  className="w-14 h-14 object-contain"
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
