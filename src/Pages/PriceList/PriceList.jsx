import { ChefSpecial } from "../../Components/PriceListComponents/ChefSpecial";
import { OrderMenu } from "../../Components/PriceListComponents/OrderMenu";
import { PriceListBanner } from "../../Components/PriceListComponents/PriceListBanner";

export const PriceList = () => {
  return (
    <div className="pt-36 md:pt-48">
      <PriceListBanner />
      <OrderMenu />
      <ChefSpecial />
    </div>
  );
};
