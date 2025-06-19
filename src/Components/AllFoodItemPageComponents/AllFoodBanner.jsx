import bgImage from "/assets/Food/bgimage1.png";

export const AllFoodBanner = () => {
  return (
    <div
      className="w-full bg-black bg-cover bg-center text-white h-full relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black/20 w-full h-full">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[600px] px-6 py-16">
          <div className="text-center md:text-left ml-0 lg:ml-72">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6">
              All <span className="text-primary">Food</span> Items
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
              Explore our wide variety of delicious food items, carefully
              curated to satisfy every taste. From mouth-watering starters to
              indulgent desserts, discover flavors that bring comfort, joy, and
              satisfaction in every bite.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
