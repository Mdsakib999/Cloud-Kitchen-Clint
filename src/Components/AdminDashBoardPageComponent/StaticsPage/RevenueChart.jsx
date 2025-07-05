import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { getRevenueChartData } from "../../../utils/generateChartData";
import { useGetOrdersQuery } from "../../../redux/orderSlice";

Chart.register(...registerables);

export const RevenueChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");
  const [tooltipData, setTooltipData] = useState(null);

  const { data: orders = [] } = useGetOrdersQuery(undefined, {
    pollingInterval: 10000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { chartData, tooltipDates, rawData } = getRevenueChartData(
    orders,
    selectedPeriod
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: true, color: "#E5E7EB" },
        ticks: { color: "#9CA3AF", font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#F3F4F6" },
        border: { display: false },
        ticks: {
          color: "#9CA3AF",
          font: { size: 12 },
          callback: (value) => (value >= 1000 ? value / 1000 + "k" : value),
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    onHover: (event, activeElements) => {
      if (activeElements.length > 0) {
        const index = activeElements[0].index;
        const canvas = chartRef.current;

        setTooltipData({
          value: rawData[index],
          date: tooltipDates[index],
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
    if (!orders.length || !chartRef.current) return;

    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(chartRef.current, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });

    return () => chartInstance.current?.destroy();
  }, [selectedPeriod, orders]);

  const formatCurrency = (value) =>
    value >= 1000 ? `$${(value / 1000).toFixed(2)}k` : `$${value}`;

  const periods = ["Daily", "Weekly", "Monthly"];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Revenue</h2>
          <p className="text-sm text-gray-400">Tracking your revenue trends</p>
        </div>

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

      {/* Chart */}
      <div className="relative h-80">
        <canvas ref={chartRef} className="w-full h-full"></canvas>

        {tooltipData?.show && (
          <>
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
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-gray-200 rotate-45"></div>
            </div>

            <div
              className="absolute w-3 h-3 bg-blue-500 border-2 border-white rounded-full pointer-events-none z-20"
              style={{
                left: `${tooltipData.x - 6}px`,
                top: `${tooltipData.y - 6}px`,
              }}
            />
          </>
        )}
      </div>

      {/* Stats Footer */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
        <div>
          Period:{" "}
          <span className="font-medium text-gray-700">{selectedPeriod}</span>
        </div>
        <div>
          Peak:{" "}
          <span className="font-medium text-gray-700">
            {formatCurrency(Math.max(...rawData))}
          </span>
        </div>
        <div>
          Average:{" "}
          <span className="font-medium text-gray-700">
            {formatCurrency(
              Math.round(
                rawData.reduce((sum, val) => sum + val, 0) / rawData.length
              )
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
