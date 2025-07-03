export const GetStatusColor = (status) => {
  const normalized = status?.toLowerCase().replace(/\s+/g, "_");

  const colors = {
    pending: "bg-amber-200 text-amber-900",
    accepted: "bg-indigo-200 text-indigo-900",
    confirmed: "bg-sky-200 text-sky-900",
    preparing: "bg-orange-200 text-orange-900",
    ready: "bg-lime-200 text-lime-900",
    on_delivery: "bg-pink-200 text-pink-900",
    delivering: "bg-pink-300 text-pink-900",
    delivered: "bg-emerald-200 text-emerald-900",
    completed: "bg-cyan-200 text-cyan-900",
    cancelled: "bg-rose-200 text-rose-900",
  };

  return colors[normalized] || "bg-zinc-200 text-zinc-800";
};
