import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import ChefWork from "/assets/Chef/ChefWork.jpg";
import ChefTeam from "/assets/Chef/ChefTeam.jpg";
import {
  ChefHat,
  Star,
  Utensils,
  Users,
  Building2,
  Pizza,
  Leaf,
  ShoppingCart,
  Medal,
  Clock,
  Package,
  Headphones,
} from "lucide-react";
import React from "react";

export const AboutHero = () => {
  const { ref, inView } = useInView({ triggerOnce: false });

  const stats = [
    { icon: <ChefHat />, number: 300, suffix: "+", label: "Culinary Expert" },
    { icon: <Star />, number: 270, suffix: "+", label: "Five-Star Dining" },
    { icon: <Utensils />, number: 1000, suffix: "+", label: "Food Offerings" },
    { icon: <Users />, number: 25, suffix: "K+", label: "Happy Clients" },
  ];

  const features = [
    { icon: <Building2 />, title: "Professionals & Skilled Chefs" },
    { icon: <Pizza />, title: "Italian Cuisine" },
    { icon: <Leaf />, title: "Fresh Ingredients" },
    { icon: <ShoppingCart />, title: "Online Delivery Shop" },
    { icon: <Medal />, title: "Quality Maintain" },
    { icon: <Clock />, title: "Made Fresh Daily" },
    { icon: <Package />, title: "Best Pizza Deals & Offers" },
    { icon: <Headphones />, title: "24/7 Service" },
  ];

  return (
    <div className="text-white font-inter px-6  py-16 mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center">
        {/* Left Content */}
        <div className="order-2 lg:order-1 w-full mx-auto pt-24 lg:pt-0">
          <p className="text-primary uppercase tracking-widest text-sm mb-2">
            Simple. Classic. Delicious
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-inknut leading-tight mb-4">
            A taste of sophistication in the heart of the city
          </h2>
          <p className="text-secondary mb-10 max-w-2xl text-justify">
            Est curabitur ridiculus nibh mattis vitae. Lacinia iaculis aenean
            lobortis mattis taciti neque ultricies habitant nisl. Montes finibus
            viverra per Interdum ultricies sociosqu mattis sed diam placerat.
            Adipiscing purus nullam; dapibus urna nascetur semper cras cubilia
            eu.Nibh nec sodales nullam viverra id. Posuere tempor vitae laoreet
            nibh per felis diam bibendum.Orci tincidunt volutpat magnis iaculis
            ut, tristique nisi.Ultrices eu porttitor convallis cubilia habitant
            fermentum pulvinar.
          </p>
        </div>

        {/* Right Image Stack */}
        <div className="order-1 lg:order-2 relative w-fit mx-auto">
          {/* Main ChefWork Image */}
          <div className="w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[24rem] rounded-xl overflow-hidden shadow-lg">
            <img
              src={ChefWork}
              alt="Chef Working"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlapping ChefTeam Image */}
          <div className="absolute bottom-[-4rem] right-[-2rem] md:bottom-[-8rem] md:right-[-6rem] lg:bottom-[-4 rem] lg:right-[-7rem] w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-72 rounded-xl overflow-hidden shadow-md">
            <img
              src={ChefTeam}
              alt="Chef Team"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Rotated Title */}
          <div className="absolute top-1/2 md:right-[-17rem] transform -translate-y-1/2 -translate-x-1/2 rotate-[-90deg] whitespace-nowrap">
            <h1 className="text-5xl font-semibold text-white font-inknut">
              About Us
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full mt-10">
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-8 h-8 text-primary">
                {feature.icon}
              </div>
              <div className="text-slate-300 font-medium">{feature.title}</div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 my-8 max-w-7xl mx-auto mt-24"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-start">
              <div className="flex justify-start mb-4 text-primary">
                {React.cloneElement(stat.icon, { className: "w-12 h-12" })}
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={2}
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <div className="text-slate-300 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
