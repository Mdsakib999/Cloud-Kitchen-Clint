export const getRevenueChartData = (orders = [], period = "Monthly") => {
    const revenueMap = new Map();

    const formatCurrency = (amount) => parseFloat(amount || 0);

    const today = new Date();

    const getWeekStart = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        const day = d.getDay();
        d.setDate(d.getDate() - day);
        return d.getTime();
    };

    const isSameWeek = (d1, d2) => getWeekStart(d1) === getWeekStart(d2);

    const isSameDay = (d1, d2) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    orders.forEach((order) => {
        if (order.order_status !== "delivered" && order.order_status !== "completed")
            return;

        const rawDate = order.createdAt?.$date || order.createdAt || order.date;
        const orderDate = new Date(rawDate);

        // Filter orders only in the current period
        if (period === "Daily" && !isSameDay(orderDate, today)) return;
        if (period === "Weekly" && !isSameWeek(orderDate, today)) return;
        if (
            period === "Monthly" &&
            (orderDate.getFullYear() !== today.getFullYear() ||
                orderDate.getMonth() !== today.getMonth())
        )
            return;

        let key;
        if (period === "Daily") {
            key = orderDate.getHours(); // 0-23
        } else if (period === "Weekly") {
            key = orderDate.getDay(); // 0-6
        } else if (period === "Monthly") {
            key = `${orderDate.getFullYear()}-${orderDate.getMonth()}`; // e.g. "2025-6"
        }

        const currentRevenue = revenueMap.get(key) || 0;
        revenueMap.set(key, currentRevenue + formatCurrency(order.totalPrice));
    });

    // ...rest of your sorting and formatting logic here...

    let sortedKeys = [];
    if (period === "Daily") {
        sortedKeys = Array.from({ length: 24 }, (_, i) => i);
    } else if (period === "Weekly") {
        sortedKeys = Array.from({ length: 7 }, (_, i) => i);
    } else if (period === "Monthly") {
        sortedKeys = Array.from(revenueMap.keys()).sort((a, b) => {
            const [yearA, monthA] = a.split("-").map(Number);
            const [yearB, monthB] = b.split("-").map(Number);
            return yearA !== yearB ? yearA - yearB : monthA - monthB;
        });
    }

    const rawData = sortedKeys.map((key) => revenueMap.get(key) || 0);

    const labels = sortedKeys.map((key) => {
        if (period === "Daily") return `${key}:00`;
        if (period === "Weekly")
            return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][key];
        if (period === "Monthly") {
            const [year, month] = key.split("-");
            return new Date(year, month).toLocaleString("default", {
                month: "short",
                year: "numeric",
            });
        }
        return key.toString();
    });

    const tooltipDates = labels.map((label) => `${period} ${label}`);

    return {
        chartData: {
            labels,
            datasets: [
                {
                    label: "Revenue",
                    data: rawData,
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
        },
        tooltipDates,
        rawData,
    };
};
