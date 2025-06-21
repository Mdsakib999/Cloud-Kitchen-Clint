import img1 from "../../assets/foodBanner.jpg";
import img2 from "../../assets/foodBanner.jpg";
import img3 from "../../assets/foodBanner.jpg";

const HomeStats = () => {
  return (
    <section className="bg-bg-secondary py-12 sm:py-16 lg:py-20 px-4 sm:px-6 text-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left: Images and vertical text */}
        <div className="flex items-center justify-center lg:justify-start space-x-4 sm:space-x-6 order-2 lg:order-1">
          {/* Overlapping images */}
          <div className="flex -space-x-4 sm:-space-x-6 z-10">
            <figure className="w-32 h-40 sm:w-44 sm:h-56 md:w-52 md:h-64 lg:w-58 lg:h-74 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
              <img
                src={img1}
                alt="Delicious dish 1"
                className="w-full h-full object-cover"
              />
            </figure>
            <figure className="w-32 h-40 sm:w-44 sm:h-56 md:w-52 md:h-64 lg:w-58 lg:h-74 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl transform translate-y-8 sm:translate-y-12 lg:translate-y-16">
              <img
                src={img2}
                alt="Delicious dish 2"
                className="w-full h-full object-cover"
              />
            </figure>
          </div>

          {/* Vertical title - Hidden on mobile, visible on larger screens */}
          <div className=" block transform -translate-y-6 lg:-translate-y-10 -translate-x-12 lg:-translate-x-20 z-30">
            <span
              className="text-3xl lg:text-4xl xl:text-6xl font-bold whitespace-nowrap"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
              }}
            >
              Taste Bliss
            </span>
          </div>
        </div>

        {/* Right: Text and stats */}
        <div className="space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left">
          <p className="text-xs sm:text-sm text-primary uppercase tracking-wide">
            Bringing Flavor to Life
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
            Creating Memorable <br className="hidden sm:block" />
            Meals for <br className="hidden sm:block" />
            Every Occasion
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
            At our cloud kitchen, every dish is crafted with passion and
            precision to turn ordinary moments into unforgettable dining
            experiences. Whether it's a quick lunch, a family dinner, or a
            special celebration, we're here to serve flavors that linger long
            after the meal is over.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 sm:flex sm:flex-row sm:justify-center lg:justify-start sm:space-x-6 lg:space-x-8 gap-4 sm:gap-0 text-gray-200 pt-4">
            <div className="text-center sm:text-left">
              <div className="font-bold text-white text-lg sm:text-xl lg:text-2xl">
                100+
              </div>
              <p className="text-xs sm:text-sm lg:text-base">
                Five-Star Dining
              </p>
            </div>
            <div className="text-center sm:text-left">
              <div className="font-bold text-white text-lg sm:text-xl lg:text-2xl">
                250k
              </div>
              <p className="text-xs sm:text-sm lg:text-base">Happy Clients</p>
            </div>
            <div className="text-center sm:text-left">
              <div className="font-bold text-white text-lg sm:text-xl lg:text-2xl">
                100+
              </div>
              <p className="text-xs sm:text-sm lg:text-base">Elite Chef</p>
            </div>
          </div>

          {/* Button */}
          <div className="pt-4">
            <button className="inline-block bg-primary text-bg-primary px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium text-sm sm:text-base hover:opacity-90 hover:transform hover:scale-105 transition-all duration-300">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
