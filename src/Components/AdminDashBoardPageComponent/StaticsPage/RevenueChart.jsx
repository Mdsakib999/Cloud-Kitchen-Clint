import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

export const RevenueChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [tooltipData, setTooltipData] = useState(null);

  // Sample data for different periods
  const allData = {
    Daily: {
      labels: ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM", "12 AM"],
      data: [200, 350, 450, 672.556, 800, 650, 400],
      dates: [
        "Today 6 AM",
        "Today 9 AM",
        "Today 12 PM",
        "Today 3 PM",
        "Today 6 PM",
        "Today 9 PM",
        "Today 12 AM",
      ],
    },
    Weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [500, 700, 450, 672.556, 850, 600, 750],
      dates: [
        "This Week Mon",
        "This Week Tue",
        "This Week Wed",
        "This Week Thu",
        "This Week Fri",
        "This Week Sat",
        "This Week Sun",
      ],
    },
    Monthly: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      data: [200, 500, 700, 450, 1400, 672.556, 1100, 1000, 850],
      dates: [
        "1 Jan 2024",
        "1 Feb 2024",
        "1 Mar 2024",
        "1 Apr 2024",
        "1 May 2024",
        "1 Jun 2024",
        "1 Jul 2024",
        "1 Aug 2024",
        "1 Sep 2024",
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
          label: "Revenue",
          data: data.data,
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.1,
          pointBackgroundColor: "#3B82F6",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false, // Disable default tooltip
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: true,
          color: "#E5E7EB",
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
          callback: function (value) {
            if (value >= 1000) {
              return value / 1000 + "k";
            }
            return value;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    onHover: (event, activeElements) => {
      if (activeElements.length > 0) {
        const dataIndex = activeElements[0].index;
        const data = allData[selectedPeriod];
        const canvas = chartRef.current;
        const rect = canvas.getBoundingClientRect();

        setTooltipData({
          value: data.data[dataIndex],
          date: data.dates[dataIndex],
          x: activeElements[0].element.x,
          y: activeElements[0].element.y,
          show: true,
        });
      } else {
        setTooltipData((prev) => (prev ? { ...prev, show: false } : null));
      }
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: getCurrentData(),
        options: chartOptions,
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectedPeriod]);

  const periods = ["Daily", "Weekly", "Monthly"];

  // Format currency value
  const formatCurrency = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(3)}k`;
    }
    return `$${value}`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Revenue</h2>
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet, consectetur
          </p>
        </div>

        {/* Period Toggle Buttons */}
        <div className="flex items-center bg-gray-50 rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                selectedPeriod === period
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-80">
        <canvas ref={chartRef} className="w-full h-full"></canvas>

        {/* Custom Tooltip */}
        {tooltipData && tooltipData.show && (
          <div
            className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 pointer-events-none"
            style={{
              left: `${tooltipData.x + 10}px`,
              top: `${tooltipData.y - 60}px`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="text-sm font-bold text-gray-900">
              {formatCurrency(tooltipData.value)}
            </div>
            <div className="text-xs text-gray-500">{tooltipData.date}</div>
            {/* Tooltip arrow */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-gray-200 rotate-45"></div>
          </div>
        )}

        {/* Data point highlight */}
        {tooltipData && tooltipData.show && (
          <div
            className="absolute w-3 h-3 bg-blue-500 border-2 border-white rounded-full pointer-events-none z-20"
            style={{
              left: `${tooltipData.x - 6}px`,
              top: `${tooltipData.y - 6}px`,
            }}
          />
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
        <div>
          Period:{" "}
          <span className="font-medium text-gray-700">{selectedPeriod}</span>
        </div>
        <div>
          Peak:{" "}
          <span className="font-medium text-gray-700">
            {formatCurrency(Math.max(...allData[selectedPeriod].data))}
          </span>
        </div>
        <div>
          Average:{" "}
          <span className="font-medium text-gray-700">
            {formatCurrency(
              Math.round(
                allData[selectedPeriod].data.reduce(
                  (sum, val) => sum + val,
                  0
                ) / allData[selectedPeriod].data.length
              )
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
