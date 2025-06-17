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
  const stats = [
    { icon: <ChefHat />, number: "300+", label: "Culinary Expert" },
    { icon: <Star />, number: "270+", label: "Five-Star Dining" },
    { icon: <Utensils />, number: "1K", label: "Food Offerings" },
    { icon: <Users />, number: "25K", label: "Happy Clients" },
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
    <div className="text-white font-inter px-6 py-16 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Content */}
        <div className="w-full md:w-1/2 lg:w-full">
          <p className="text-primary uppercase tracking-widest text-sm mb-2">
            Simple. Classic. Delicious
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-inknut leading-tight mb-4">
            A taste of sophistication in the heart of the city
          </h2>
          <p className="text-secondary mb-10 max-w-4xl text-justify font-inknut">
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
        <div className="relative w-full md:w-fit mx-auto mt-12 md:mt-10 lg:mt-0">
          <div className="flex flex-col items-center gap-6 md:gap-0 md:block">
            {/* Main Image */}
            <div className="w-64 h-80 sm:w-72 sm:h-96 md:w-72 md:h-[24rem] lg:w-80 lg:h-[25rem] rounded-xl overflow-hidden shadow-lg relative z-[1]">
              <img
                src={ChefWork}
                alt="Chef Working"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping Image */}
            <div
              className="w-48 h-64 sm:w-56 sm:h-72 md:w-56 md:h-[17rem] lg:w-80 lg:h-80 rounded-xl overflow-hidden shadow-md relative z-0 
              md:absolute md:bottom-[-12rem] md:right-[-3.5rem] 
              lg:bottom-[-15rem] lg:right-[-5rem]"
            >
              <img
                src={ChefTeam}
                alt="Chef Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Rotated Title */}
          <div className="hidden md:block absolute bottom-20 right-[-15rem] transform -translate-y-1/2 -translate-x-1/2 rotate-[-90deg] whitespace-nowrap z-[2]">
            <h1 className="text-4xl lg:text-5xl font-semibold text-white font-inknut">
              About Us
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full mt-5 md:mt-32 lg:mt-0 lg:w-4/5 lg:ml-5">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 ">
          {stats.map((stat, index) => (
            <div key={index} className="text-start">
              <div className="flex justify-start mb-4 text-primary">
                {React.cloneElement(stat.icon, { className: "w-12 h-12" })}
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-slate-300 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-8 h-8 text-primary">
                {feature.icon}
              </div>
              <div className="text-slate-300 font-medium">{feature.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
