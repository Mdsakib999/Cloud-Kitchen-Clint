export const groupOrdersByPeriod = (orders = [], period = "Weekly") => {
    const ordersMap = new Map();

    const today = new Date();

    const isSameDay = (d1, d2) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    const getWeekStart = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        const day = d.getDay();
        d.setDate(d.getDate() - day);
        return d.getTime();
    };

    const isSameWeek = (d1, d2) => getWeekStart(d1) === getWeekStart(d2);

    let keys = [];
    if (period === "Daily") {
        keys = Array.from({ length: 24 }, (_, i) => i);
    } else if (period === "Weekly") {
        keys = Array.from({ length: 7 }, (_, i) => i);
    } else if (period === "Monthly") {
        keys = ["Week 1", "Week 2", "Week 3", "Week 4"];
    } else if (period === "Yearly") {
        keys = Array.from({ length: 12 }, (_, i) => i);
    }

    keys.forEach((key) => {
        ordersMap.set(key, { count: 0, revenue: 0 });
    });

    orders.forEach((order) => {
        if (order.order_status !== "delivered" && order.order_status !== "completed")
            return;

        const rawDate = order.createdAt?.$date || order.createdAt || order.date;
        const orderDate = new Date(rawDate);

        if (period === "Daily" && !isSameDay(orderDate, today)) return;
        if (period === "Weekly" && !isSameWeek(orderDate, today)) return;
        if (period === "Monthly") {
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            if (orderDate < startOfMonth || orderDate > endOfMonth) return;
        }
        if (period === "Yearly" && orderDate.getFullYear() !== today.getFullYear()) return;

        let key;

        if (period === "Daily") {
            key = orderDate.getHours();
        } else if (period === "Weekly") {
            key = orderDate.getDay();
        } else if (period === "Monthly") {
            const day = orderDate.getDate();
            if (day <= 7) key = "Week 1";
            else if (day <= 14) key = "Week 2";
            else if (day <= 21) key = "Week 3";
            else key = "Week 4";
        } else if (period === "Yearly") {
            key = orderDate.getMonth();
        }

        const current = ordersMap.get(key) || { count: 0, revenue: 0 };
        ordersMap.set(key, {
            count: current.count + 1,
            revenue: current.revenue + order.totalPrice,
        });
    });

    const labels =
        period === "Daily"
            ? keys.map((hour) => `${hour}:00`)
            : period === "Weekly"
                ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                : period === "Monthly"
                    ? keys
                    : period === "Yearly"
                        ? [
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
                        ]
                        : [];

    const ordersData = labels.map((_, idx) => {
        const key = period === "Weekly" ? idx : keys[idx];
        return ordersMap.get(key)?.count || 0;
    });

    const revenueData = labels.map((_, idx) => {
        const key = period === "Weekly" ? idx : keys[idx];
        return ordersMap.get(key)?.revenue || 0;
    });

    return { labels, ordersData, revenueData };
};
