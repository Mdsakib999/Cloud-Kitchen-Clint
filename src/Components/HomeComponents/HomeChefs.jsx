import React, { useState } from "react";
import { LuChefHat, LuStar, LuUser, LuAward } from "react-icons/lu";

const HomeChefs = () => {
  const [activeChef, setActiveChef] = useState(0);

  const chefs = [
    {
      id: 1,
      name: "John Smith",
      title: "Chef De Cuisine",
      image:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=600&fit=crop&crop=face",
      specialty: "French Cuisine",
      experience: "15+ years",
      description: "Master of classic French techniques with a modern twist",
      achievements: ["Michelin Star", "James Beard Award", "Top Chef Winner"],
    },
    {
      id: 2,
      name: "Lucas Silva",
      title: "Pastry Chef",
      image:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=600&fit=crop&crop=face",
      specialty: "Artisan Pastries",
      experience: "12+ years",
      description: "Creating delicate pastries that are both art and flavor",
      achievements: [
        "World Pastry Cup",
        "Golden Whisk Award",
        "Dessert Master",
      ],
    },
    {
      id: 3,
      name: "Anna Maria",
      title: "Sous Chef",
      image:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=600&fit=crop&crop=face",
      specialty: "Mediterranean",
      experience: "10+ years",
      description: "Bringing authentic Mediterranean flavors to every dish",
      achievements: [
        "Rising Star Award",
        "Best New Chef",
        "Culinary Excellence",
      ],
    },
    {
      id: 4,
      name: "Diana Marie",
      title: "Grill Chef",
      image:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=600&fit=crop&crop=face",
      specialty: "Grilled Specialties",
      experience: "8+ years",
      description: "Expert in flame-grilled perfection and smoky flavors",
      achievements: ["Grill Master", "BBQ Champion", "Fire & Flavor Award"],
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-white relative overflow-hidden ">
      <div className=" mx-auto px-6 py-16 relative z-10 max-w-6xl">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              Meet the Maestro
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Get to Know Our Culinary Expert
              </h1>
            </div>

            <div className="lg:pt-8">
              <p className="text-xl text-slate-300 leading-relaxed">
                Blending passion with expertise, our head chef creates bold,
                unforgettable flavors you'll keep coming back for
              </p>
            </div>
          </div>
        </div>

        {/* Chefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {chefs.map((chef, index) => (
            <div
              key={chef.id}
              className={`group cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                activeChef === index ? "scale-105" : ""
              }`}
              onClick={() => setActiveChef(index)}
              onMouseEnter={() => setActiveChef(index)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-bg-primary to-bg-secondary border border-slate-700 hover:border-primary transition-all duration-300">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Experience Badge */}
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {chef.experience}
                  </div>
                </div>

                {/* Chef Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                    {chef.name}
                  </h3>
                  <p className="text-primary font-medium mb-3 uppercase tracking-wide text-sm">
                    {chef.title}
                  </p>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                    {chef.description}
                  </p>

                  {/* Specialty */}
                  <div className="flex items-center gap-2 mb-4">
                    <LuStar className="w-4 h-4 text-amber-400" />
                    <span className="text-slate-300 text-sm">
                      {chef.specialty}
                    </span>
                  </div>

                  {/* Social Icons Placeholder */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                      <LuUser className="w-4 h-4" />
                    </div>
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                      <LuAward className="w-4 h-4" />
                    </div>
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                      <LuStar className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeChefs;
