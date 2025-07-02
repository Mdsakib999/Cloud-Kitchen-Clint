import { ChefSpecial } from "../../Components/OrderNowPageComponents/ChefSpecial";
import { OrderMenu } from "../../Components/OrderNowPageComponents/OrderMenu";
import { PriceListBanner } from "../../Components/OrderNowPageComponents/OrderNowBanner";

export const PriceList = () => {
  return (
    <div className="pt-36 md:pt-48">
      <PriceListBanner />
      <OrderMenu />
      <ChefSpecial />
    </div>
  );
};
