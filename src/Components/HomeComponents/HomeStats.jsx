import img1 from "/assets/Food/ramen.png";
import img2 from "/assets/Food/Chicken-Fry.jpg";
import img3 from "/assets/Food/ChickenKebabbgremove.png";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const HomeStats = () => {
  const { ref, inView } = useInView({ triggerOnce: false });

  return (
    <section className="bg-bg-secondary py-12 sm:py-16 lg:py-20 px-4 sm:px-6 text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-28 lg:gap-12 items-center">
        {/* Left: Images and vertical text */}
        <div className="relative w-fit mx-auto md:bottom-8 lg:bottom-20 right-10 md:right-0">
          <div className="w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[28rem] rounded-xl overflow-hidden shadow-lg">
            <img
              src={img1}
              alt="Noodles Dish"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute bottom-[-6rem] right-[-4rem] md:bottom-[-8rem] md:right-[-6rem] lg:bottom-[-10rem] lg:right-[-7rem] w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 rounded-xl overflow-hidden shadow-md">
            <img
              src={img2}
              alt="Fried Chicken"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="hidden lg:block absolute top-1/2 right-[-20rem] transform -translate-y-1/2 -translate-x-1/2 rotate-[-90deg] whitespace-nowrap">
            <h1 className="text-5xl font-semibold text-white font-inknut">
              Taste Bliss
            </h1>
          </div>
        </div>

        {/* Right: Text and stats */}
        <div className="space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left">
          <p className="text-xs sm:text-sm text-primary uppercase tracking-wide">
            Bringing Flavor to Life
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight font-inknut">
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
          <div
            ref={ref}
            className="grid grid-cols-3 sm:flex sm:flex-row sm:justify-center lg:justify-start sm:space-x-6 lg:space-x-8 gap-4 sm:gap-0 text-gray-200 pt-4"
          >
            <div className="text-center sm:text-left">
              <div className="font-bold text-white text-lg sm:text-xl lg:text-2xl">
                <CountUp end={inView ? 100 : 0} duration={2} />+
              </div>
              <p className="text-xs sm:text-sm lg:text-base">
                Five-Star Dining
              </p>
            </div>
            <div className="text-center sm:text-left">
              <div className="font-bold text-white text-lg sm:text-xl lg:text-2xl">
                <CountUp end={inView ? 25 : 0} duration={2.5} separator="," />
                K+
              </div>
              <p className="text-xs sm:text-sm lg:text-base">Happy Clients</p>
            </div>
            <div className="text-center sm:text-left">
              <div className="font-bold text-white text-lg sm:text-xl lg:text-2xl">
                <CountUp end={inView ? 100 : 0} duration={2} />+
              </div>
              <p className="text-xs sm:text-sm lg:text-base">Elite Chef</p>
            </div>
          </div>

          {/* Button */}
          <div className="pt-4">
            <button className="inline-block bg-primary text-white hover:bg-white hover:text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium text-sm sm:text-base hover:opacity-90 hover:transform hover:scale-105 transition-all duration-300">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
