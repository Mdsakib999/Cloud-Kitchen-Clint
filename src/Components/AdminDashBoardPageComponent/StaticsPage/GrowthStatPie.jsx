import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { MoreHorizontal } from "lucide-react";

// Register Chart.js components
Chart.register(...registerables);

export const GrowthStatPie = () => {
  const [showValues, setShowValues] = useState(true);
  const [showChart, setShowChart] = useState(true);

  // Refs for each chart
  const totalOrderRef = useRef(null);
  const customerGrowthRef = useRef(null);
  const totalRevenueRef = useRef(null);

  // Chart instances
  const totalOrderChart = useRef(null);
  const customerGrowthChart = useRef(null);
  const totalRevenueChart = useRef(null);

  // Chart data
  const chartData = {
    totalOrder: {
      value: 81,
      color: "#DC2626",
      backgroundColor: "#FEE2E2",
    },
    customerGrowth: {
      value: 22,
      color: "#059669",
      backgroundColor: "#D1FAE5",
    },
    totalRevenue: {
      value: 62,
      color: "#2563EB",
      backgroundColor: "#DBEAFE",
    },
  };

  // Common chart options
  const getChartOptions = (percentage, color, bgColor) => ({
    responsive: true,
    maintainAspectRatio: true,
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    animation: {
      animateRotate: true,
      duration: 1000,
    },
  });

  // Create chart data
  const createChartData = (percentage, color, bgColor) => ({
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, bgColor],
        borderWidth: 0,
      },
    ],
  });

  // Initialize charts
  useEffect(() => {
    if (!showChart) {
      // Destroy all charts if chart view is disabled
      if (totalOrderChart.current) {
        totalOrderChart.current.destroy();
        totalOrderChart.current = null;
      }
      if (customerGrowthChart.current) {
        customerGrowthChart.current.destroy();
        customerGrowthChart.current = null;
      }
      if (totalRevenueChart.current) {
        totalRevenueChart.current.destroy();
        totalRevenueChart.current = null;
      }
      return;
    }

    // Create Total Order Chart
    if (totalOrderRef.current) {
      if (totalOrderChart.current) {
        totalOrderChart.current.destroy();
      }
      totalOrderChart.current = new Chart(totalOrderRef.current, {
        type: "doughnut",
        data: createChartData(
          chartData.totalOrder.value,
          chartData.totalOrder.color,
          chartData.totalOrder.backgroundColor
        ),
        options: getChartOptions(
          chartData.totalOrder.value,
          chartData.totalOrder.color,
          chartData.totalOrder.backgroundColor
        ),
      });
    }

    // Create Customer Growth Chart
    if (customerGrowthRef.current) {
      if (customerGrowthChart.current) {
        customerGrowthChart.current.destroy();
      }
      customerGrowthChart.current = new Chart(customerGrowthRef.current, {
        type: "doughnut",
        data: createChartData(
          chartData.customerGrowth.value,
          chartData.customerGrowth.color,
          chartData.customerGrowth.backgroundColor
        ),
        options: getChartOptions(
          chartData.customerGrowth.value,
          chartData.customerGrowth.color,
          chartData.customerGrowth.backgroundColor
        ),
      });
    }

    // Create Total Revenue Chart
    if (totalRevenueRef.current) {
      if (totalRevenueChart.current) {
        totalRevenueChart.current.destroy();
      }
      totalRevenueChart.current = new Chart(totalRevenueRef.current, {
        type: "doughnut",
        data: createChartData(
          chartData.totalRevenue.value,
          chartData.totalRevenue.color,
          chartData.totalRevenue.backgroundColor
        ),
        options: getChartOptions(
          chartData.totalRevenue.value,
          chartData.totalRevenue.color,
          chartData.totalRevenue.backgroundColor
        ),
      });
    }

    // Cleanup function
    return () => {
      if (totalOrderChart.current) {
        totalOrderChart.current.destroy();
      }
      if (customerGrowthChart.current) {
        customerGrowthChart.current.destroy();
      }
      if (totalRevenueChart.current) {
        totalRevenueChart.current.destroy();
      }
    };
  }, [showChart]);

  const PieChartItem = ({ title, percentage, color, chartRef, showChart }) => (
    <div className="flex flex-col items-center">
      {showChart ? (
        <div className="relative w-24 h-24 mb-4">
          <canvas ref={chartRef} className="w-full h-full"></canvas>
          {showValues && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-800">
                {percentage}%
              </span>
            </div>
          )}
        </div>
      ) : (
        <div
          className="w-24 h-24 rounded-full mb-4 flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          {showValues && (
            <span className="text-lg font-bold text-white">{percentage}%</span>
          )}
        </div>
      )}
      <h3 className="text-sm font-medium text-gray-700 text-center">{title}</h3>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Growth Chart</h2>

        <div className="flex items-center space-x-6">
          {/* Toggle Controls */}
          <div className="flex items-center space-x-4">
            {/* Chart Toggle */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="checkbox"
                  id="chart-toggle"
                  checked={showChart}
                  onChange={(e) => setShowChart(e.target.checked)}
                  className="sr-only"
                />
                <label
                  htmlFor="chart-toggle"
                  className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center transition-colors ${
                    showChart
                      ? "bg-gray-400 border-gray-400"
                      : "bg-white border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {showChart && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </label>
              </div>
              <span className="text-sm text-gray-600">Chart</span>
            </div>

            {/* Show Value Toggle */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="checkbox"
                  id="value-toggle"
                  checked={showValues}
                  onChange={(e) => setShowValues(e.target.checked)}
                  className="sr-only"
                />
                <label
                  htmlFor="value-toggle"
                  className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center transition-colors ${
                    showValues
                      ? "bg-red-500 border-red-500"
                      : "bg-white border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {showValues && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </label>
              </div>
              <span className="text-sm text-gray-600">Show Value</span>
            </div>
          </div>

          {/* More Options */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-3 gap-8">
        <PieChartItem
          title="Total Order"
          percentage={chartData.totalOrder.value}
          color={chartData.totalOrder.color}
          chartRef={totalOrderRef}
          showChart={showChart}
        />

        <PieChartItem
          title="Customer Growth"
          percentage={chartData.customerGrowth.value}
          color={chartData.customerGrowth.color}
          chartRef={customerGrowthRef}
          showChart={showChart}
        />

        <PieChartItem
          title="Total Revenue"
          percentage={chartData.totalRevenue.value}
          color={chartData.totalRevenue.color}
          chartRef={totalRevenueRef}
          showChart={showChart}
        />
      </div>
    </div>
  );
};
