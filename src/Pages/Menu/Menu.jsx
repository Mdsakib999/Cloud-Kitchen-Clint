import { AllFoodBanner } from "../../Components/MenuComponents/AllFoodBanner";
import { AllFoodCard } from "../../Components/MenuComponents/AllFoodCard";

export const Menu = () => {
  return (
    <div className="pt-36 md:pt-48">
      <AllFoodBanner />
      <AllFoodCard />
    </div>
  );
};
