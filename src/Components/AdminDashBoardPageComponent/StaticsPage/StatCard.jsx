import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({ title, value, icon, bgColor, trend, trendLabel }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-4">
        <div
          className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center`}
        >
          <img src={icon} alt={title} className="w-10 h-10 object-contain" />
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-gray-900">{value}</p>
          <p className="text-gray-600 text-sm whitespace-nowrap">{title}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end text-sm font-medium">
        {trend >= 0 ? (
          <span className="text-green-500 flex items-center">
            <TrendingUp size={16} />
            <span className="ml-1">
              {Math.abs(trend)}% {trendLabel && `(${trendLabel})`}
            </span>
          </span>
        ) : (
          <span className="text-red-500 flex items-center">
            <TrendingDown size={16} />
            <span className="ml-1">
              {Math.abs(trend)}% {trendLabel && `(${trendLabel})`}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
