import { ChefSpecial } from "../../Components/OrderNowPageComponents/ChefSpecial";
import { OrderMenu } from "../../Components/OrderNowPageComponents/OrderMenu";
import { OrderNowBanner } from "../../Components/OrderNowPageComponents/OrderNowBanner";
import { OrderOnline } from "../../Components/OrderNowPageComponents/OrderOnline";


export const OrderNow = () => {
  return (
    <div>
      <OrderNowBanner />
      <OrderOnline />
      <OrderMenu />
      <ChefSpecial />
    </div>
  );
};
