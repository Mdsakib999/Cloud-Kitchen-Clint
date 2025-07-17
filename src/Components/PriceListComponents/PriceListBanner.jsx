import { ChefHat } from "lucide-react";
import { SectionHeader } from "../SharedComponent/SectionHeader";

export const PriceListBanner = () => {
  return (
    <SectionHeader
      icon={ChefHat}
      subtitle="Price List"
      title="Delicious Meals at the Right Price"
      description="Explore our curated menu with clear and affordable pricing. From quick bites to hearty meals — discover what satisfies your cravings without breaking the bank."
    />
  );
};
