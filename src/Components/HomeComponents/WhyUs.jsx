import { useState } from "react";
import { Link } from "react-router-dom";
import { PiCarrot } from "react-icons/pi";
import { IoEarthOutline } from "react-icons/io5";
import { CiApple, CiClock1 } from "react-icons/ci";
import { MdArrowOutward } from "react-icons/md";

const features = [
  {
    title: "Seasonal Item",
    img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1310&auto=format&fit=crop",
  },
  {
    title: "Special Item",
    img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1310&auto=format&fit=crop",
  },
  {
    title: "Drink’s Item",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1310&auto=format&fit=crop",
  },
  {
    title: "Chef’s Special",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1310&auto=format&fit=crop",
  },
  {
    title: "Seasonal Soup",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1310&auto=format&fit=crop",
  },
];

const WhyUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = features.length - visibleCount;

  // get current slice of features
  const visibleFeatures = features.slice(
    activeIndex,
    activeIndex + visibleCount
  );

  return (
    <section className="min-h-[70vh] bg-bg-primary text-white py-28 px-6">
      <div className="max-w-6xl mx-auto lg:flex md:space-x-12">
        <div className="w-full lg:w-1/2 mb-12 md:mb-0">
          <p className="text-sm  text-primary uppercase mb-2 tracking-[.3em]">
            Experience the Best
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-inknut leading-tight bg-gradient-to-r from-white via-amber-100 to-primary bg-clip-text text-transparent my-5">
            Why People Love Us?
          </h1>
          <p className=" text-gray-300 font-inter mb-6 leading-relaxed">
            From fresh ingredients to fast delivery, we’re all about quality,
            convenience, and taste. Our customers keep coming back for the
            flavors they love and the service they trust.
          </p>
          <ul className="space-y-3 text-lg font-inter">
            <li className="flex items-center text-gray-200">
              <PiCarrot className="text-2xl mr-3 text-primary" /> Vegetarian
              Delights
            </li>
            <li className="flex items-center text-gray-200">
              <IoEarthOutline className="text-2xl mr-3 text-primary" />{" "}
              International Flavors
            </li>
            <li className="flex items-center text-gray-200">
              <CiApple className="text-2xl mr-3 text-primary" /> Healthy Eats
            </li>
            <li className="flex items-center text-gray-200">
              <CiClock1 className="text-2xl mr-3 text-primary" /> Quick & Easy
              Supper
            </li>
          </ul>

          <Link
            to="/menu"
            className="inline-block mt-8 bg-primary text-white px-6 py-3 rounded-full font-medium 
             transition-all duration-300 
             hover:bg-white hover:text-[#0f2f2f] hover:opacity-90 hover:scale-"
          >
            View Entire Menu
          </Link>
        </div>

        <div className="w-full lg:w-1/2 overflow-hidden mt-5">
          <div className="flex transition-transform duration-500 flex-wrap sm:flex-nowrap w-full">
            {visibleFeatures.map((feat) => (
              <div
                key={feat.title}
                className="w-full sm:w-1/3 px-1 sm:px-2 mb-4 sm:mb-0"
              >
                <div className="relative h-48 xs:h-56 sm:h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg group flex flex-col justify-end">
                  <img
                    src={feat.img}
                    alt={feat.title}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                  {/* Overlay for hover effect */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300 flex items-center justify-center">
                    {/* Show title and arrow only on hover */}
                    <Link
                      to={"/menu"}
                      className="opacity-0 group-hover:opacity-100 flex flex-col items-center transition duration-300"
                      tabIndex={-1}
                    >
                      <span className="mb-2 text-white text-lg font-semibold drop-shadow-lg font-inknut">
                        {feat.title}
                      </span>
                      <span className="flex items-center mt-20 justify-center w-12 h-12 rounded-full bg-primary text-white group-hover:bg-white transition duration-300">
                        <MdArrowOutward className="text-white group-hover:text-primary text-2xl transition duration-300" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {features.length > visibleCount && (
            <div className="flex justify-center space-x-2 mt-4">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    idx === activeIndex ? "bg-primary border-2 " : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
