import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiCarrot } from "react-icons/pi";
import { IoEarthOutline } from "react-icons/io5";
import { CiApple, CiClock1 } from "react-icons/ci";

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
    <section className="bg-primary text-white py-16 px-6">
      <div className="max-w-6xl mx-auto md:flex md:space-x-12">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <p className="text-sm text-[#e5b567] uppercase mb-2">
            Experience the Best
          </p>
          <h2 className="text-4xl font-semibold mb-4">Why People Love Us</h2>
          <p className=" text-gray-200 mb-6 leading-relaxed">
            From fresh ingredients to fast delivery, we’re all about quality,
            convenience, and taste. Our customers keep coming back for the
            flavors they love and the service they trust.
          </p>
          <ul className="space-y-3 text-lg">
            <li className="flex items-center">
              <PiCarrot className="text-2xl mr-3" /> Vegetarian Delights
            </li>
            <li className="flex items-center">
              <IoEarthOutline className="text-2xl mr-3" /> International Flavors
            </li>
            <li className="flex items-center">
              <CiApple className="text-2xl mr-3" /> Healthy Eats
            </li>
            <li className="flex items-center">
              <CiClock1 className="text-2xl mr-3" /> Quick & Easy Supper
            </li>
          </ul>
          <Link
            to="/menu"
            className="inline-block mt-8 bg-[#e5b567] text-[#0f2f2f] px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
          >
            View Entire Menu
          </Link>
        </div>

        {/* Right Column: Slider showing only visibleFeatures */}
        <div className="md:w-1/2 overflow-hidden">
          <div className="flex transition-transform duration-500">
            {visibleFeatures.map((feat) => (
              <div key={feat.title} className="w-1/3 px-2">
                <div className="relative h-90 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={feat.img}
                    alt={feat.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">
                      {feat.title}
                    </span>
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
                    idx === activeIndex
                      ? "bg-[#e5b567] border-2 "
                      : "bg-gray-500"
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
