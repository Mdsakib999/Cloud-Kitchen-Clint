import { AllFoodBanner } from "../../Components/AllFoodItemPageComponents/AllFoodBanner";
import { AllFoodCard } from "../../Components/AllFoodItemPageComponents/AllFoodCard";

export const AllFoodItem = () => {
  return (
    <div className="pt-36 md:pt-48">
      <AllFoodBanner />
      <AllFoodCard />
    </div>
  );
};
