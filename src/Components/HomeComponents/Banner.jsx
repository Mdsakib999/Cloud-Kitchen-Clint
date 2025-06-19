import React from "react";
import FoodBanner from "../../assets/foodBanner.jpg";

const Banner = () => {
  return (
    <div className="relative w-full">
      <div
        className="relative w-full  h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${FoodBanner})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <p className="text-md text-white">Savor Every Bite</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-4xl text-white">
            Satisfy Your Cravings With Our Signature Flavors
          </h1>
          <p className="mb-6 text-lg md:text-2xl max-w-4xl text-white">
            Fresh, hot, and delivered fast. Experience chef-crafted meals from
            our cloud kitchen, made just for you. Order now and enjoy
            restaurant-quality food at home.
          </p>
          <button className="px-6 py-3 bg-primary hover:bg-primary/90 hover:shadow-2xl rounded-full text-bg-primary font-medium transition">
            Order Now
          </button>
        </div>

        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 px-4 sm:px-6 py-4 max-w-7xl w-full mx-auto flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Hours */}
          <div className="flex items-start space-x-3 text-center lg:text-left">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-gray-200 text-sm sm:text-base">
                Operating Hours
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Mon-Fri: 11:00 AM - 10:00 PM
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                Sat-Sun: 10:00 AM - 11:00 PM
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start space-x-3 text-center lg:text-left">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-gray-200 text-sm sm:text-base">
                Our Location
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm max-w-xs lg:max-w-none">
                123 Food Street, Downtown District, Cityville, State 12345
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
