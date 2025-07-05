import { TbChefHat, TbSoup, TbPizza, TbBurger } from "react-icons/tb";

export const Loader = ({ comp_Name }) => {
  // Pick a random food icon for fun
  const icons = [TbChefHat, TbSoup, TbPizza, TbBurger];
  const Icon = icons[Math.floor(Math.random() * icons.length)];

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-950">
      <div className="flex flex-col items-center gap-4">
        <span className="animate-bounce">
          <Icon className="h-16 w-16 text-emerald-400 drop-shadow-lg" />
        </span>
        <span className="text-emerald-300 text-lg font-semibold font-serif">
          Loading {comp_Name}...
        </span>
      </div>
    </div>
  );
};
