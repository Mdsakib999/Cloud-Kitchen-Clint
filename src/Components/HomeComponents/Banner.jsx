import React from "react";
import FoodBanner1 from "../../assets/foodBanner2.jpg";
import FoodBanner2 from "../../assets/foodBanner3.jpg";
import FoodBanner3 from "../../assets/foodBanner4.jpg";
import FoodBanner4 from "../../assets/foodBanner.jpg";
import { Carousel } from "react-responsive-carousel";
import { Slide } from "react-awesome-reveal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaRegClock, FaTimes } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const slides = [
  {
    pretitle: "Savor Every Bite",
    title: "Satisfy Your Cravings With Our Signature Flavors",
    description:
      "Fresh, hot, and delivered fast. Experience chef-crafted meals from our cloud kitchen, made just for you. Order now and enjoy restaurant-quality food at home.",
    image: FoodBanner1,
  },
  {
    pretitle: "Taste the Difference",
    title: "Crafted With Passion, Delivered With Care",
    description:
      "From farm-fresh ingredients to your doorstep — enjoy food made with love, cooked by professionals, and packed for flavor. Your perfect meal is just a click away.",
    image: FoodBanner2,
  },
  {
    pretitle: "Flavors That Travel",
    title: "Enjoy Gourmet Meals Anytime, Anywhere",
    description:
      "Say goodbye to average takeout. Dive into a culinary journey with our cloud kitchen – quality meals without the wait or compromise.",
    image: FoodBanner3,
  },
  {
    pretitle: "Fast. Fresh. Fabulous.",
    title: "Delicious Meals Designed for Busy Lives",
    description:
      "No time to cook? We've got you. Discover expertly made dishes ready when you are. Fast delivery, zero hassle, all the flavor.",
    image: FoodBanner4,
  },
];

const Banner = () => {
  return (
    <div className="relative w-full">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={5000}
        showStatus={false}
        showArrows={false}
        transitionTime={800}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative w-full h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              <Slide direction="up" triggerOnce>
                <p className="text-md text-white">{slide.pretitle}</p>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-4xl text-white">
                  {slide.title}
                </h1>
                <p className="mb-6 text-lg md:text-2xl max-w-4xl text-white">
                  {slide.description}
                </p>
                <button className="px-6 py-3 bg-primary hover:bg-primary/90 hover:shadow-2xl rounded-full text-bg-primary font-medium transition">
                  Order Now
                </button>
              </Slide>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Extra Info Section */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 px-4 sm:px-6 py-4 max-w-7xl w-full mx-auto flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 lg:space-x-8 z-20">
        {/* Hours */}
        <div className="flex items-start space-x-1 lg:space-x-3 text-left">
          <FaRegClock className="text-primary w-6 h-6" />
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
        <div className="flex items-start space-x-1 lg:space-x-3 text-left">
          <IoLocationOutline className="text-primary w-6 h-6" />
          <div>
            <h3 className="font-semibold text-gray-200 text-sm sm:text-base">
              Our Location
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xs lg:max-w-none">
              123 Food Street, Downtown District,
              <p>Cityville, State 12345</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
