import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { ChevronDown, MoreHorizontal } from "lucide-react";

// Register Chart.js components
Chart.register(...registerables);

export const OrderMap = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sample data for different periods
  const allData = {
    Daily: {
      labels: ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM", "12 AM"],
      orders: [20, 35, 45, 60, 80, 65, 40],
      revenue: [15, 30, 40, 55, 75, 60, 35],
    },
    Weekly: {
      labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
      orders: [60, 80, 40, 70, 60, 25, 60],
      revenue: [50, 80, 30, 70, 45, 20, 55],
    },
    Monthly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      orders: [280, 320, 240, 300],
      revenue: [250, 290, 210, 270],
    },
    Yearly: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      orders: [
        1200, 1500, 1800, 1400, 1600, 1900, 1700, 2000, 1800, 2100, 1900,
      ],
      revenue: [
        1100, 1350, 1650, 1300, 1500, 1800, 1600, 1900, 1700, 2000, 1800,
      ],
    },
  };

  // Get current data based on selected period
  const getCurrentData = () => {
    const data = allData[selectedPeriod];
    return {
      labels: data.labels,
      datasets: [
        {
          label: "Total Orders",
          data: data.orders,
          backgroundColor: "#EF4444", // Red color
          borderRadius: 4,
          maxBarThickness: 40,
        },
        {
          label: "Total Revenue ($)",
          data: data.revenue,
          backgroundColor: "#EAB308", // Yellow color
          borderRadius: 4,
          maxBarThickness: 40,
        },
      ],
    };
  };

  // Dynamic chart options based on period
  const getChartOptions = () => {
    const data = allData[selectedPeriod];
    const maxValue = Math.max(...data.orders, ...data.revenue);
    const yAxisMax = Math.ceil((maxValue * 1.2) / 100) * 100; // Round up to nearest 100

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // Hide default legend
        },
        tooltip: {
          backgroundColor: "#1F2937",
          titleColor: "#F9FAFB",
          bodyColor: "#F9FAFB",
          borderColor: "#374151",
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: function (context) {
              const label = context.dataset.label || "";
              const value = context.parsed.y;
              if (label === "Total Revenue ($)") {
                return `${label}: $${value}`;
              }
              return `${label}: ${value}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          ticks: {
            color: "#9CA3AF",
            font: {
              size: 12,
            },
          },
        },
        y: {
          beginAtZero: true,
          max: yAxisMax,
          grid: {
            color: "#F3F4F6",
          },
          border: {
            display: false,
          },
          ticks: {
            color: "#9CA3AF",
            font: {
              size: 12,
            },
            stepSize: Math.ceil(yAxisMax / 5),
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    };
  };

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart with updated data
      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: getCurrentData(),
        options: getChartOptions(),
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectedPeriod]); // Re-run when selectedPeriod changes

  const periods = ["Daily", "Weekly", "Monthly", "Yearly"];

  // Handle period change with animation
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    setIsDropdownOpen(false);

    // Optional: Add a loading state or animation here
    console.log(`Switched to ${period} view`);
  };

  // Get summary stats for current period
  const getCurrentStats = () => {
    const data = allData[selectedPeriod];
    const totalOrders = data.orders.reduce((sum, val) => sum + val, 0);
    const totalRevenue = data.revenue.reduce((sum, val) => sum + val, 0);
    const avgOrders = Math.round(totalOrders / data.orders.length);
    const avgRevenue = Math.round(totalRevenue / data.revenue.length);

    return { totalOrders, totalRevenue, avgOrders, avgRevenue };
  };

  const stats = getCurrentStats();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Order Map</h2>
          <p className="text-sm text-gray-500 mt-1">
            {selectedPeriod} overview • {stats.totalOrders} orders • $
            {stats.totalRevenue} revenue
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Period Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <span className="text-gray-700 font-medium">
                {selectedPeriod}
              </span>
              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => handlePeriodChange(period)}
                    className={`w-full text-left px-4 py-2 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      selectedPeriod === period
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* More Options */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Custom Legend with Stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Total Orders</span>
            <span className="text-sm font-medium text-gray-800">
              (Avg: {stats.avgOrders})
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600">Total Revenue ($)</span>
            <span className="text-sm font-medium text-gray-800">
              (Avg: ${stats.avgRevenue})
            </span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-80">
        <canvas ref={chartRef}></canvas>
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
