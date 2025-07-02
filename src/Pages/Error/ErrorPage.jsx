import { useState, useEffect } from "react";
import { Home, ChefHat, UtensilsCrossed, Coffee, Search } from "lucide-react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(0);

  const foodEmojis = ["🍕", "🍔", "🍜", "🍝", "🥘", "🍛", "🌮", "🍣"];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % foodEmojis.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden font-inknut">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 text-6xl opacity-10 animate-bounce"
          style={{ animationDelay: "0s" }}
        >
          🍕
        </div>
        <div
          className="absolute top-40 right-20 text-4xl opacity-10 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          🍔
        </div>
        <div
          className="absolute bottom-32 left-20 text-5xl opacity-10 animate-bounce"
          style={{ animationDelay: "2s" }}
        >
          🍜
        </div>
        <div
          className="absolute bottom-20 right-10 text-3xl opacity-10 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          🌮
        </div>
        <div
          className="absolute top-1/2 left-1/4 text-4xl opacity-10 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        >
          🍝
        </div>
        <div
          className="absolute top-1/3 right-1/3 text-5xl opacity-10 animate-bounce"
          style={{ animationDelay: "2.5s" }}
        >
          🥘
        </div>
      </div>

      <div
        className={`max-w-2xl mx-auto text-center space-y-8 relative z-10 transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Main 404 Section */}
        <div className="space-y-6">
          <div className="relative">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-500 animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="text-6xl animate-spin"
                style={{ animationDuration: "3s" }}
              >
                {foodEmojis[currentEmoji]}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-emerald-600">
              <ChefHat className="w-8 h-8" />
              <UtensilsCrossed className="w-8 h-8" />
              <Coffee className="w-8 h-8" />
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Oops! Recipe Not Found
            </h2>

            <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
              Looks like this dish isn't on our menu! Our chefs might have moved
              it to a different kitchen.
            </p>
          </div>
        </div>

        {/* Kitchen-themed message */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-emerald-100">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-full">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Don't worry, we're still cooking!
          </h3>

          <p className="text-gray-600 mb-6">
            While our chefs prepare something special, here are some fresh
            options for you:
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="cursor-pointer group bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Back to Kitchen</span>
            </Link>
          </div>
        </div>

        {/* Quick navigation */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 transition-all duration-300 cursor-pointer group border border-emerald-100 hover:border-emerald-300 hover:shadow-lg">
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              🍕
            </div>
            <h4 className="font-semibold text-gray-800">Popular Dishes</h4>
            <p className="text-sm text-gray-600">Explore our bestsellers</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 transition-all duration-300 cursor-pointer group border border-emerald-100 hover:border-emerald-300 hover:shadow-lg">
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              📍
            </div>
            <h4 className="font-semibold text-gray-800">Nearby Kitchens</h4>
            <p className="text-sm text-gray-600">Find locations near you</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 transition-all duration-300 cursor-pointer group border border-emerald-100 hover:border-emerald-300 hover:shadow-lg">
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              🎯
            </div>
            <h4 className="font-semibold text-gray-800">Today's Special</h4>
            <p className="text-sm text-gray-600">Chef's recommendations</p>
          </div>
        </div> */}

        {/* Contact info */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Still hungry for help? Our kitchen support is always ready to serve
            you!
          </p>
          <Link
            to="/contact"
            className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-4 hover:underline-offset-2 transition-all"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
