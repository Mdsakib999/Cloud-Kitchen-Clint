import TotalOrder from "/assets/Icon/TotalOrder.png";
import TotalDeliver from "/assets/Icon/TotalDeliver.png";
import TotalCancel from "/assets/Icon/TotalCancel.png";
import TotalRevenue from "/assets/Icon/TotalRevenue.png";
import { calculateTrend } from "./orderStats";

export const generateStatsData = ({
    current,
    previous,
    isLoading = false,
    contextLabel = "Today",
}) => [
        {
            id: 1,
            title: `${contextLabel}'s Orders`,
            value: isLoading ? "..." : current.count.toString(),
            icon: TotalOrder,
            bgColor: "bg-green-100",
            trend: calculateTrend(current.count, previous.count),
        },
        {
            id: 2,
            title: `${contextLabel}'s Delivered`,
            value: isLoading ? "..." : current.delivered.toString(),
            icon: TotalDeliver,
            bgColor: "bg-blue-100",
            trend: calculateTrend(current.delivered, previous.delivered),
        },
        {
            id: 3,
            title: `${contextLabel}'s Cancelled`,
            value: isLoading ? "..." : current.cancelled.toString(),
            icon: TotalCancel,
            bgColor: "bg-red-100",
            trend: calculateTrend(current.cancelled, previous.cancelled),
        },
        {
            id: 4,
            title: `${contextLabel}'s Revenue`,
            value: isLoading ? "..." : `$${current.revenue.toFixed(2)}`,
            icon: TotalRevenue,
            bgColor: "bg-purple-100",
            trend: calculateTrend(current.revenue, previous.revenue),
        },
    ];
