import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Clock,
  Star,
  Sparkles,
  Flame,
  Coffee,
  Crown,
} from "lucide-react";

const Promotional_Offer = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Function to fetch offers from backend
  const fetchOffers = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/offers");
      const data = await response.json();
      setOffers(data.filter((offer) => offer.isActive));
    } catch (error) {
      console.error("Error fetching offers:", error);
      // Fallback data to show component structure
      setOffers([
        {
          id: 1,
          title: "Traditional Thali",
          subtitle: "CHEF SPECIAL",
          buttonText: "ORDER NOW",
          bgColor: "from-orange-400 via-red-500 to-pink-600",
          foodImage: "/api/placeholder/300/200",
          icon: Crown,
          discount: "25% OFF",
        },
        {
          id: 2,
          title: "Yummy",
          subtitle: "Delicious",
          mainText: "Biryani",
          subText: "Deal",
          bgColor: "from-purple-600 via-indigo-700 to-blue-800",
          foodImage: "/api/placeholder/300/250",
          icon: Flame,
          discount: "40% OFF",
        },
        {
          id: 3,
          title: "Combo & Meal",
          subtitle: "Get Up To 50% Off",
          buttonText: "ORDER NOW",
          bgColor: "from-rose-500 via-red-600 to-pink-700",
          foodImage: "/api/placeholder/250/180",
          icon: ShoppingCart,
          discount: "50% OFF",
        },
        {
          id: 4,
          title: "Tea Time",
          subtitle: "* FOR LIMITED TIME ONLY *",
          mainText: "35% Offer",
          buttonText: "SHOP NOW",
          bgColor: "from-emerald-500 via-teal-600 to-cyan-700",
          foodImage: null,
          icon: Coffee,
          discount: "35% OFF",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        <div className="container mx-auto px-4">
          <div className="animate-pulse grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto h-96">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-gray-300 to-gray-400 rounded-3xl shadow-2xl"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto lg:h-[600px]">
            {/* Card 1 - Traditional Thali (Top Left) */}
            <div
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${
                offers[0]?.bgColor || "from-orange-400 via-red-500 to-pink-600"
              } col-span-1 lg:col-span-1 row-span-1 lg:row-span-2 p-8 flex flex-col justify-between min-h-80 lg:min-h-full shadow-2xl border border-white/10 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:shadow-orange-500/25 cursor-pointer group`}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Discount badge */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-black text-sm animate-bounce shadow-lg">
                {offers[0]?.discount || "25% OFF"}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="w-6 h-6 text-yellow-300" />
                  <span className="text-yellow-300 font-bold text-sm tracking-wider">
                    PREMIUM
                  </span>
                </div>
                <h3 className="text-white text-3xl lg:text-4xl font-black mb-3 leading-tight drop-shadow-lg">
                  {offers[0]?.title || "Traditional Thali"}
                </h3>
                <p className="text-white/90 text-base lg:text-lg font-semibold mb-8">
                  {offers[0]?.subtitle || "CHEF SPECIAL"}
                </p>
                <button className="bg-white text-gray-800 px-6 lg:px-8 py-3 lg:py-4 rounded-full font-black text-sm hover:bg-yellow-100 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-white/25 group relative overflow-hidden">
                  <span className="relative z-10">
                    {offers[0]?.buttonText || "ORDER NOW"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* Animated food illustration */}
              <div
                className={`absolute bottom-0 right-0 w-40 lg:w-48 h-40 lg:h-48 opacity-60 transition-all duration-500 ${
                  hoveredCard === 1 ? "scale-110 opacity-80" : ""
                }`}
              >
                <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <div className="w-32 lg:w-40 h-32 lg:h-40 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-8 right-8 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-32 left-8 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 left-4 w-1 h-1 bg-pink-400 rounded-full animate-bounce"></div>
            </div>

            {/* Card 2 - Biryani (Top Middle) */}
            <div
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${
                offers[1]?.bgColor ||
                "from-purple-600 via-indigo-700 to-blue-800"
              } col-span-1 row-span-1 p-8 flex flex-col justify-center text-center min-h-56 shadow-2xl border border-white/10 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25 cursor-pointer group`}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Discount badge */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-black text-sm animate-bounce shadow-lg">
                {offers[1]?.discount || "40% OFF"}
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
                </div>
                <h3 className="text-orange-300 text-2xl lg:text-3xl font-black italic mb-2 drop-shadow-lg">
                  {offers[1]?.title || "Yummy"}
                </h3>
                <h4 className="text-red-400 text-3xl lg:text-4xl font-black italic mb-3 drop-shadow-lg">
                  {offers[1]?.subtitle || "Delicious"}
                </h4>
                <h2 className="text-white text-4xl lg:text-5xl font-black mb-2 drop-shadow-xl">
                  {offers[1]?.mainText || "Biryani"}
                </h2>
                <p className="text-yellow-400 text-xl lg:text-2xl font-black italic drop-shadow-lg">
                  {offers[1]?.subText || "Deal"}
                </p>
              </div>

              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_white_2px,_transparent_2px)] bg-[length:30px_30px] animate-pulse"></div>
              </div>

              {/* Floating spice particles */}
              {hoveredCard === 2 && (
                <>
                  <div className="absolute top-8 left-8 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-8 right-8 w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
                  <div className="absolute top-16 right-12 w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
                </>
              )}
            </div>

            {/* Card 3 - Combo Meal (Top Right) */}
            <div
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${
                offers[2]?.bgColor || "from-rose-500 via-red-600 to-pink-700"
              } col-span-1 lg:col-span-2 row-span-1 p-8 flex items-center justify-between min-h-56 shadow-2xl border border-white/10 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:shadow-rose-500/25 cursor-pointer group`}
              onMouseEnter={() => setHoveredCard(3)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Discount badge */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-black text-sm animate-bounce shadow-lg">
                {offers[2]?.discount || "50% OFF"}
              </div>

              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingCart className="w-6 h-6 text-yellow-300" />
                  <span className="text-yellow-300 font-bold text-sm tracking-wider">
                    COMBO SPECIAL
                  </span>
                </div>
                <h3 className="text-white text-3xl lg:text-4xl font-black mb-4 drop-shadow-lg">
                  {offers[2]?.title || "Combo & Meal"}
                </h3>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full inline-block font-black text-sm mb-6 transform -rotate-2 shadow-xl animate-pulse">
                  {offers[2]?.subtitle || "Get Up To 50% Off"}
                </div>
                <br />
                <button className="bg-white text-gray-800 px-8 py-4 rounded-full font-black hover:bg-yellow-100 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-white/25 group relative overflow-hidden">
                  <span className="relative z-10">
                    {offers[2]?.buttonText || "ORDER NOW"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* Animated food illustration */}
              <div
                className={`hidden lg:block w-48 h-40 bg-white/20 rounded-3xl flex-shrink-0 ml-8 backdrop-blur-sm border border-white/20 transition-all duration-500 ${
                  hoveredCard === 3 ? "scale-110" : ""
                }`}
              >
                <div className="w-full h-full bg-gradient-to-br from-orange-400/30 to-pink-500/30 rounded-3xl flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/40 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-8 left-8 w-4 h-0.5 bg-white/50 transform -rotate-45 animate-pulse"></div>
              <div className="absolute top-12 left-12 w-3 h-0.5 bg-white/40 transform -rotate-45"></div>
              <div className="absolute bottom-8 right-32 w-6 h-0.5 bg-white/40 transform rotate-45 animate-pulse"></div>
            </div>

            {/* Card 4 - Tea Time (Bottom Span) */}
            <div
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${
                offers[3]?.bgColor ||
                "from-emerald-500 via-teal-600 to-cyan-700"
              } col-span-1 md:col-span-2 lg:col-span-3 row-span-1 p-8 flex items-center justify-between min-h-56 shadow-2xl border border-white/10 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:shadow-emerald-500/25 cursor-pointer group`}
              onMouseEnter={() => setHoveredCard(4)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Discount badge */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-black text-sm animate-bounce shadow-lg">
                {offers[3]?.discount || "35% OFF"}
              </div>

              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Coffee className="w-6 h-6 text-yellow-300 animate-pulse" />
                  <Clock className="w-5 h-5 text-yellow-300" />
                </div>
                <p className="text-white/90 text-sm font-semibold mb-4 tracking-widest">
                  {offers[3]?.subtitle || "* FOR LIMITED TIME ONLY *"}
                </p>
                <div className="flex items-center gap-6 mb-6">
                  <h2 className="text-white text-5xl lg:text-7xl font-black italic transform -rotate-3 drop-shadow-xl">
                    {offers[3]?.title || "Tea Time"}
                  </h2>
                  <h3 className="text-yellow-300 text-4xl lg:text-6xl font-black drop-shadow-xl">
                    {offers[3]?.mainText || "35% Offer"}
                  </h3>
                </div>
                <button className="bg-white text-emerald-600 px-10 py-4 rounded-full font-black hover:bg-yellow-100 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-white/25 group relative overflow-hidden">
                  <span className="relative z-10">
                    {offers[3]?.buttonText || "SHOP NOW"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* Decorative steam lines */}
              <div className="absolute top-8 right-32 space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-0.5 bg-white/40 animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
              <div className="absolute bottom-8 left-32 space-y-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-0.5 bg-white/30 animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>

              {/* Animated tea cup steam */}
              {hoveredCard === 4 && (
                <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-8 bg-white/20 rounded-full animate-pulse"
                      style={{
                        left: `${i * 4}px`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: "2s",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Pattern Background */}
              <div className="absolute inset-0 opacity-10">
                <div className='w-full h-full bg-[url(&apos;data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="3" fill="white" opacity="0.3"/><circle cx="75" cy="75" r="2" fill="white" opacity="0.2"/><circle cx="50" cy="10" r="1.5" fill="white" opacity="0.4"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>&apos;)] bg-repeat animate-pulse'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotional_Offer;
