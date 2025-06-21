import { DailySellStat } from "./DailySellStat";
import { GrowthStatPie } from "./GrowthStatPie";
import { MonthlySellStat } from "./MonthlySellStat";
import { OrderMap } from "./OrderMap";
import { RevenueChart } from "./RevenueChart";
import { TrendingItems } from "./TrendingItems";

export const DashStatics = () => {
  return (
    <div className="w-full bg-white">
      <MonthlySellStat />
      <DailySellStat />

      <div className="flex gap-4 my-5">
        <div className="w-1/2">
          <RevenueChart />
        </div>
        <div className="w-1/2">
          <OrderMap />
        </div>
      </div>
      <div className="flex gap-4 my-5">
        <div className="w-1/2">
          <TrendingItems />
        </div>
        <div className="w-1/2">
          <GrowthStatPie />
        </div>
      </div>
    </div>
  );
};
