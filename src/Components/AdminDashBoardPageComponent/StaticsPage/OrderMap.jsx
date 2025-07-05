import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { useGetOrdersQuery } from "../../../redux/orderSlice";
import { groupOrdersByPeriod } from "../../../utils/orderChartUtils";

Chart.register(...registerables);

export const OrderMap = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch orders from your store/api
  const { data: orders = [] } = useGetOrdersQuery();

  // Get dynamic grouped data based on selected period
  const { labels, ordersData, revenueData } = groupOrdersByPeriod(
    orders,
    selectedPeriod
  );

  // Prepare chart data from dynamic helper output
  const getCurrentData = () => ({
    labels,
    datasets: [
      {
        label: "Total Orders",
        data: ordersData,
        backgroundColor: "#EF4444",
        borderRadius: 4,
        maxBarThickness: 40,
      },
      {
        label: "Total Revenue ($)",
        data: revenueData,
        backgroundColor: "#EAB308",
        borderRadius: 4,
        maxBarThickness: 40,
      },
    ],
  });

  // Chart options dynamically adjust based on max value in data
  const getChartOptions = () => {
    const maxValue = Math.max(...ordersData, ...revenueData);
    const yAxisMax = Math.ceil((maxValue * 1.2) / 100) * 100 || 100;

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
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
          grid: { display: false },
          border: { display: false },
          ticks: { color: "#9CA3AF", font: { size: 12 } },
        },
        y: {
          beginAtZero: true,
          max: yAxisMax,
          grid: { color: "#F3F4F6" },
          border: { display: false },
          ticks: {
            color: "#9CA3AF",
            font: { size: 12 },
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
    if (!chartRef.current) return;

    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: getCurrentData(),
      options: getChartOptions(),
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, [selectedPeriod, orders]); // Re-render chart on period or orders change

  const periods = ["Daily", "Weekly", "Monthly", "Yearly"];

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    setIsDropdownOpen(false);
  };

  // Compute stats dynamically for current data
  const totalOrders = ordersData.reduce((a, b) => a + b, 0);
  const totalRevenue = revenueData.reduce((a, b) => a + b, 0);
  const avgOrders = ordersData.length
    ? Math.round(totalOrders / ordersData.length)
    : 0;
  const avgRevenue = revenueData.length
    ? Math.round(totalRevenue / revenueData.length)
    : 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Order Map</h2>
          <p className="text-sm text-gray-500 mt-1">
            {selectedPeriod} overview • {totalOrders} orders • ${totalRevenue}{" "}
            revenue
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
              (Avg: {avgOrders})
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600">Total Revenue ($)</span>
            <span className="text-sm font-medium text-gray-800">
              (Avg: ${avgRevenue})
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
