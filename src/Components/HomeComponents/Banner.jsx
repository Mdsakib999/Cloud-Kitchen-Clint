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
import { Link } from "react-router-dom";

const slides = [
  {
    preTitle: "Savor Every Bite",
    title: "Satisfy Your Cravings With Our Signature Flavors",
    description:
      "Fresh, hot, and delivered fast. Experience chef-crafted meals from our cloud kitchen, made just for you. Order now and enjoy restaurant-quality food at home.",
    image: FoodBanner1,
  },
  {
    preTitle: "Taste the Difference",
    title: "Crafted With Passion, Delivered With Care",
    description:
      "From farm-fresh ingredients to your doorstep — enjoy food made with love, cooked by professionals, and packed for flavor. Your perfect meal is just a click away.",
    image: FoodBanner2,
  },
  {
    preTitle: "Flavors That Travel",
    title: "Enjoy Gourmet Meals Anytime, Anywhere",
    description:
      "Say goodbye to average takeout. Dive into a culinary journey with our cloud kitchen – quality meals without the wait or compromise.",
    image: FoodBanner3,
  },
  {
    preTitle: "Fast. Fresh. Fabulous.",
    title: "Delicious Meals Designed for Busy Lives",
    description:
      "No time to cook? We've got you. Discover expertly made dishes ready when you are. Fast delivery, zero hassle, all the flavor.",
    image: FoodBanner4,
  },
];

const Banner = () => {
  return (
    <div className="min-h-screen relative w-full">
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
              <Slide direction="up" triggerOnce className="">
                <div className="mt-10 space-y-5">
                  <p className="text-2xl text-primary font-inter">
                    {slide.preTitle}
                  </p>
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-4xl text-white font-inknut">
                    {slide.title}
                  </h1>
                  <p className="hidden md:block mb-6 text-lg md:text-xl max-w-4xl text-white font-inter">
                    {slide.description}
                  </p>
                  <Link to="/menu">
                    <button className="cursor-pointer px-6 py-3 bg-primary hover:bg-white text-white hover:shadow-2xl duration-300 rounded-full hover:text-black font-medium transition">
                      Order Now
                    </button>
                  </Link>
                </div>
              </Slide>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Extra Info Section */}
      <div className="absolute -bottom-1 lg:bottom-6 left-1/2 transform -translate-x-1/2 px-4 lg:px-6 py-4 w-full max-w-7xl mx-auto flex justify-between md:items-center space-y-6 lg:space-y-0 lg:space-x-8 z-20 my-5 text-center">
        {/* Hours */}
        <div className="flex items-start gap-x-1 lg:gap-x-2 text-left">
          <FaRegClock size={24} className="text-primary" />
          <div>
            <h3 className="font-semibold text-gray-200 text-sm lg:text-lg font-serif">
              Operating Hours
            </h3>
            <p className="text-white text-xs lg:text-sm font-inter">
              Mon-Fri: 11:00 AM - 10:00 PM
            </p>
            <p className="text-white text-xs lg:text-sm font-inter">
              Sat-Sun: 10:00 AM - 11:00 PM
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex gap-x-1 lg:gap-x-2 text-left">
          <IoLocationOutline size={24} className="text-primary" />
          <div>
            <h3 className="font-semibold text-gray-200 text-sm lg:text-lg font-serif">
              Our Location
            </h3>
            <p className="text-white text-xs md:text-sm font-inter">
              <span className="block">South Khulsi</span>
              <span className="block">Nasirabad Properties LTD,</span>
              <span className="block">Chottogram, Bangladesh</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
