import { useGetOrdersQuery } from "../../../redux/orderSlice";
import {
  getStatus,
  getRevenue,
  filterOrdersByDateRange,
} from "../../../utils/orderStats";

import { generateStatsData } from "../../../utils/generateStatsData";
import StatCard from "./StatCard";

export const AllTimeSellStat = () => {
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetOrdersQuery(undefined, {
    pollingInterval: 10000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 86400000);

  const last30 = filterOrdersByDateRange(orders, thirtyDaysAgo, now);
  const prev30 = filterOrdersByDateRange(orders, sixtyDaysAgo, thirtyDaysAgo);

  const getStats = (orderList) => {
    const delivered = orderList.filter(
      (o) => getStatus(o) === "delivered"
    ).length;
    const cancelled = orderList.filter(
      (o) => getStatus(o) === "cancelled"
    ).length;
    const revenue = orderList
      .filter((o) => getStatus(o) === "delivered")
      .reduce((sum, o) => sum + getRevenue(o), 0);

    return {
      count: orderList.length,
      delivered,
      cancelled,
      revenue,
    };
  };

  const allStats = getStats(orders);
  const recentStats = getStats(last30);
  const previousStats = getStats(prev30);

  const statsData = generateStatsData({
    current: allStats,
    previous: previousStats,
    isLoading,
    contextLabel: "Total",
  });

  if (isError) {
    return (
      <div className="p-4 bg-red-100 rounded-md text-sm">
        <p className="text-red-600 font-medium">Error: {error?.message}</p>
        <button
          onClick={refetch}
          className="mt-2 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4">
        All Time Sell Statistics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map(({ id, title, value, icon, bgColor, trend }) => (
          <StatCard
            key={id}
            title={title}
            value={value}
            icon={icon}
            bgColor={bgColor}
            trend={trend}
            trendLabel="30 days"
          />
        ))}
      </div>
    </section>
  );
};
