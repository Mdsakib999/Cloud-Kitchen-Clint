import { AllTimeSellStat } from "./AllTimeSellStat";
import { DailySellStat } from "./DailySellStat";
import { GrowthStatPie } from "./GrowthStatPie";
import { OrderMap } from "./OrderMap";
import { RevenueChart } from "./RevenueChart";
import { TrendingItems } from "./TrendingItems";

export const DashStatics = () => {
  return (
    <div className="w-full bg-white mt-10">
      <AllTimeSellStat />
      <DailySellStat />

      <div className="flex flex-col md:flex-row gap-4 my-5">
        <div className="w-full md:w-1/2">
          <RevenueChart />
        </div>
        <div className="w-full md:w-1/2">
          <OrderMap />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 my-5">
        <div className="w-full md:w-1/2">
          <TrendingItems />
        </div>
        <div className="w-full md:w-1/2">
          <GrowthStatPie />
        </div>
      </div>
    </div>
  );
};
