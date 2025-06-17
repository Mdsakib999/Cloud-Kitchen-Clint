import React from "react";
import img1 from "../../assets/foodBanner.jpg";
import img2 from "../../assets/foodBanner.jpg";
import img3 from "../../assets/foodBanner.jpg";

const HomeStats = () => {
  return (
    <section className="bg-bg-secondary py-16 px-6 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="flex items-center justify-center md:justify-start space-x-6">
          {/* Overlapping images */}
          <div className="flex -space-x-6 z-10">
            <figure className="w-58 h-74 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={img1}
                alt="Delicious dish 1"
                className="w-full h-full object-cover"
              />
            </figure>
            <figure className="w-58 h-74 rounded-2xl overflow-hidden shadow-2xl transform translate-y-16">
              <img
                src={img2}
                alt="Delicious dish 2"
                className="w-full h-full object-cover"
              />
            </figure>
          </div>

          {/* Vertical title */}
          <div className="transform -translate-y-10 -translate-x-20 z-30">
            <span
              className="text-6xl font-bold whitespace-nowrap "
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
        <div className="space-y-6">
          <p className="text-sm text-primary uppercase">
            Bringing Flavor to Life
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            Creating Memorable <br /> Meals for <br /> Every Occasion
          </h2>
          <p className="text-gray-300 leading-relaxed">
            At our cloud kitchen, every dish is crafted with passion and
            precision to turn ordinary moments into unforgettable dining
            experiences. Whether it’s a quick lunch, a family dinner, or a
            special celebration, we’re here to serve flavors that linger long
            after the meal is over.
          </p>

          {/* Stats row */}
          <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 text-gray-200">
            <div>
              <div className="font-bold text-white text-xl">100+</div>
              <p>Five-Star Dining</p>
            </div>
            <div>
              <div className="font-bold text-white text-xl">250k</div>
              <p>Happy Clients</p>
            </div>
            <div>
              <div className="font-bold text-white text-xl">100+</div>
              <p>Elite Chef</p>
            </div>
          </div>

          {/* Button */}
          <button className="mt-4 inline-block bg-primary text-bg-primary px-6 py-3 rounded-full font-medium hover:opacity-90 transition">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
