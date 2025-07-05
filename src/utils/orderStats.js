
export const getDateOnly = (dateStr) => {
    const date = new Date(dateStr);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const isFromDate = (order, targetDate) => {
    const created = order.createdAt || order.created_at || order.date;
    return getDateOnly(created).getTime() === getDateOnly(targetDate).getTime();
};

export const calculateTrend = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
};

export const getStatus = (order) => {
    const status = (order.order_status || order.status || "").toLowerCase();
    if (["delivered", "completed"].includes(status)) return "delivered";
    if (["cancelled", "canceled"].includes(status)) return "cancelled";
    return status;
};

export const getRevenue = (order) =>
    parseFloat(order.total) ||
    parseFloat(order.amount) ||
    parseFloat(order.totalPrice) ||
    0;

export const filterOrdersByDateRange = (orders, from, to) =>
    orders.filter((order) => {
        const created = new Date(order.createdAt || order.created_at || order.date);
        return created >= from && created < to;
    });
