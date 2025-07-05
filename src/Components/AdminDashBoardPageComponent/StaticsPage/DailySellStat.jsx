import { useGetOrdersQuery } from "../../../redux/orderSlice";
import {
  getDateOnly,
  isFromDate,
  getStatus,
  getRevenue,
} from "../../../utils/orderStats";
import { generateStatsData } from "../../../utils/generateStatsData";

import StatCard from "./StatCard";

export const DailySellStat = () => {
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

  const today = getDateOnly(new Date());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const todayOrders = orders.filter((order) => isFromDate(order, today));
  const yesterdayOrders = orders.filter((order) =>
    isFromDate(order, yesterday)
  );

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

  const todayStats = getStats(todayOrders);
  const yesterdayStats = getStats(yesterdayOrders);

  const statsData = generateStatsData({
    current: todayStats,
    previous: yesterdayStats,
    isLoading,
    contextLabel: "Today",
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
      <h2 className="text-xl sm:text-2xl font-semibold text-secondary mb-4">
        Today's Statistics
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
            trendLabel="vs yesterday"
          />
        ))}
      </div>
    </section>
  );
};
