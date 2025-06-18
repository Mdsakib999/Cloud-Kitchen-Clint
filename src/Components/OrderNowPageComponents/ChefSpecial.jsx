import { Star, Clock, Award } from "lucide-react";
import { chefSpecials } from "../../FakeDB/chefSpecial";
export const ChefSpecial = () => {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-4">
          <Award className="w-8 h-8 text-primary" />
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Culinary Excellence
          </span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-amber-100 to-primary bg-clip-text text-transparent mb-6">
          Chef's Signature Collection
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Handcrafted masterpieces from our executive chef, featuring premium
          ingredients and innovative techniques that define fine dining
          excellence.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-8 rounded-full"></div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
        {chefSpecials.map((item) => (
          <div
            key={item.id}
            className="bg-bg-secondary rounded-xl overflow-hidden shadow-xl hover:shadow-amber-500/20 transition-all duration-500 w-full max-w-sm mx-auto"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-60 object-cover"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-pink-500 text-white text-[0.65rem] font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
                {item.badge}
              </div>

              {/* Rating */}
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/70 backdrop-blur px-2 py-1 rounded-full">
                <Star className="w-4 h-4 text-primary fill-yellow-400" />
                <span className="text-white text-xs">{item.rating}</span>
              </div>

              {/* Prep Time */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/70 backdrop-blur px-2 py-1 rounded-full">
                <Clock className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300 text-xs">{item.prepTime}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {item.name}
                </h3>
                <span className="text-xl font-bold text-primary">
                  {item.price}
                </span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 h-16">
                {item.desc}
              </p>

              {/* Button */}
              <button className="w-full mt-4 bg-gradient-to-r from-amber-600 to-orange-500 hover:brightness-110 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg active:scale-95">
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
