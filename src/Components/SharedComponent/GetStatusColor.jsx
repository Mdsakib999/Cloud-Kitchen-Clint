export const GetStatusColor = (status) => {
  const normalized = status?.toLowerCase().replace(/\s+/g, "_");

  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-blue-100 text-blue-800",
    confirmed: "bg-cyan-100 text-cyan-800",
    preparing: "bg-orange-100 text-orange-800",
    ready: "bg-teal-100 text-teal-800",
    on_delivery: "bg-purple-100 text-purple-800",
    delivering: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return colors[normalized] || "bg-gray-100 text-gray-800";
};
