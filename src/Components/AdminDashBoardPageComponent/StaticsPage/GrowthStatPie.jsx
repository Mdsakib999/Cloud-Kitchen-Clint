import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import { useGetOrdersQuery } from "../../../redux/orderSlice";
import axiosInstance from "../../../Utils/axios";

Chart.register(...registerables);

export const GrowthStatPie = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [showValues, setShowValues] = useState(true);
  const [showChart, setShowChart] = useState(true);

  const { data: orders = [], isLoading: isLoadingOrders } = useGetOrdersQuery({
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/user/all-users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.users)
          ? res.data.users
          : [];
        setCustomers(data);
      } catch (err) {
        console.error("Failed to fetch customers", err);
        setCustomers([]);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const deliveredOrders = orders.filter(
    (order) => order.order_status === "delivered"
  );
  const totalOrders = deliveredOrders.length;
  const totalRevenue = deliveredOrders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0
  );
  const totalCustomers = customers.length;

  // Refs for each chart
  const totalOrderRef = useRef(null);
  const customerGrowthRef = useRef(null);
  const totalRevenueRef = useRef(null);
  const totalOrderChart = useRef(null);
  const customerGrowthChart = useRef(null);
  const totalRevenueChart = useRef(null);

  const getChartOptions = () => ({
    responsive: true,
    maintainAspectRatio: true,
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    elements: {
      arc: { borderWidth: 0 },
    },
    animation: { animateRotate: true, duration: 1000 },
  });

  const createChartData = (value, color, bgColor) => ({
    datasets: [
      {
        data: [value, 1],
        backgroundColor: [color, bgColor],
        borderWidth: 0,
      },
    ],
  });

  useEffect(() => {
    if (!showChart) {
      [totalOrderChart, customerGrowthChart, totalRevenueChart].forEach(
        (chartRef) => {
          if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
          }
        }
      );
      return;
    }

    if (totalOrderRef.current) {
      if (totalOrderChart.current) totalOrderChart.current.destroy();
      totalOrderChart.current = new Chart(totalOrderRef.current, {
        type: "doughnut",
        data: createChartData(totalOrders, "#DC2626", "#FEE2E2"),
        options: getChartOptions(),
      });
    }

    if (customerGrowthRef.current) {
      if (customerGrowthChart.current) customerGrowthChart.current.destroy();
      customerGrowthChart.current = new Chart(customerGrowthRef.current, {
        type: "doughnut",
        data: createChartData(totalCustomers, "#059669", "#D1FAE5"),
        options: getChartOptions(),
      });
    }

    if (totalRevenueRef.current) {
      if (totalRevenueChart.current) totalRevenueChart.current.destroy();
      totalRevenueChart.current = new Chart(totalRevenueRef.current, {
        type: "doughnut",
        data: createChartData(totalRevenue, "#2563EB", "#DBEAFE"),
        options: getChartOptions(),
      });
    }

    return () => {
      if (totalOrderChart.current) totalOrderChart.current.destroy();
      if (customerGrowthChart.current) customerGrowthChart.current.destroy();
      if (totalRevenueChart.current) totalRevenueChart.current.destroy();
    };
  }, [showChart, totalOrders, totalCustomers, totalRevenue]);

  const PieChartItem = ({ title, value, color, chartRef }) => (
    <div className="flex flex-col items-center">
      {showChart ? (
        <div className="relative w-24 h-24 mb-4">
          <canvas ref={chartRef} className="w-full h-full" />
          {showValues && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-800">
                {title === "Total Revenue" ? `৳${value}` : value}
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
            <span className="text-sm font-semibold text-white">
              {title === "Total Revenue" ? `৳${value}` : value}
            </span>
          )}
        </div>
      )}
      <h3 className="text-sm font-medium text-gray-700 text-center">{title}</h3>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Growth Chart</h2>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showChart}
                onChange={(e) => setShowChart(e.target.checked)}
                className="sr-only"
              />
              <span className="text-sm text-gray-600">Chart</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showValues}
                onChange={(e) => setShowValues(e.target.checked)}
                className="sr-only"
              />
              <span className="text-sm text-gray-600">Show Value</span>
            </label>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <PieChartItem
          title="Total Orders"
          value={totalOrders}
          color="#DC2626"
          chartRef={totalOrderRef}
        />
        <PieChartItem
          title="Total Customers"
          value={totalCustomers}
          color="#059669"
          chartRef={customerGrowthRef}
        />
        <PieChartItem
          title="Total Revenue"
          value={totalRevenue}
          color="#2563EB"
          chartRef={totalRevenueRef}
        />
      </div>
    </div>
  );
};
