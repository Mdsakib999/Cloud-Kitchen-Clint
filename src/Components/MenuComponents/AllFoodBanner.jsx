import { Soup } from "lucide-react";
import { SectionHeader } from "../SharedComponent/SectionHeader";

export const AllFoodBanner = () => {
  return (
    <SectionHeader
      icon={Soup}
      subtitle="Our Delicious Menu"
      title="Discover Every Bite"
      description="From comforting classics to bold new flavors, our menu is crafted to delight every food lover. Browse our full selection and find your next favorite meal today."
    />
  );
};
