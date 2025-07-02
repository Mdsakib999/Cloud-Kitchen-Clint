import { useState } from "react";
import { Star, User, Award } from "lucide-react";
import chef1 from "/assets/Chef/Testemonial/Chef1.png";
import chef2 from "/assets/Chef/Testemonial/Chef2.png";
import chef3 from "/assets/Chef/Testemonial/Chef3.png";
import chef4 from "/assets/Chef/Testemonial/Chef4.png";

const HomeChefs = () => {
  const [activeChef, setActiveChef] = useState(0);

  const chefs = [
    {
      id: 1,
      name: "John Smith",
      title: "Chef De Cuisine",
      image: chef1,
      specialty: "French Cuisine",
      experience: "15+ years",
      description: "Master of classic French techniques with a modern twist",
      achievements: ["Michelin Star", "James Beard Award", "Top Chef Winner"],
    },
    {
      id: 2,
      name: "Lucas Silva",
      title: "Pastry Chef",
      image: chef2,
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
      image: chef3,
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
      image: chef4,
      specialty: "Grilled Specialties",
      experience: "8+ years",
      description: "Expert in flame-grilled perfection and smoky flavors",
      achievements: ["Grill Master", "BBQ Champion", "Fire & Flavor Award"],
    },
  ];

  return (
    <div className="mb-28 bg-bg-primary text-white relative overflow-hidden">
      <div className="mx-auto px-6 py-16 relative z-10 max-w-6xl">
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
              <div className="relative overflow-hidden rounded-2xl bg-bg-secondary hover:border-primary transition-all duration-300">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Experience Badge */}
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium z-20">
                    {chef.experience}
                  </div>

                  {/* Social Icons - Overlay on image, shown on hover */}
                  <div className="absolute inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-10 h-10 bg-primary bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:bg-opacity-100 transition-all duration-300 cursor-pointer transform hover:scale-110">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-primary bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:bg-opacity-100 transition-all duration-300 cursor-pointer transform hover:scale-110">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-primary bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:bg-opacity-100 transition-all duration-300 cursor-pointer transform hover:scale-110">
                      <Star className="w-5 h-5 text-white" />
                    </div>
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

                  {/* Specialty */}
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-slate-300 text-sm">
                      {chef.specialty}
                    </span>
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
