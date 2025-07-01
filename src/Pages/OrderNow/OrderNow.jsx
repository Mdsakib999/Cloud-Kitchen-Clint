import { ChefSpecial } from "../../Components/OrderNowPageComponents/ChefSpecial";
import { OrderMenu } from "../../Components/OrderNowPageComponents/OrderMenu";
import { OrderNowBanner } from "../../Components/OrderNowPageComponents/OrderNowBanner";

export const OrderNow = () => {
  return (
    <div>
      <OrderNowBanner />
      <OrderMenu />
      <ChefSpecial />
    </div>
  );
};
