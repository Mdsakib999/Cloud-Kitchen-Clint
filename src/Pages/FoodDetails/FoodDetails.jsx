import { useLocation } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  Heart,
  ShoppingCart,
} from "lucide-react";

export const FoodDetails = () => {
  const { state } = useLocation();
  const food = state?.item;

  const [isFavorite, setIsFavorite] = useState(false);
  const [mainImage, setMainImage] = useState(food.images?.[0]);
  const handleBack = () => {
    window.history.back();
  };

  const handleAddToCart = () => {
    console.log("Adding to cart:", food);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!food) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Food item not found
          </h2>
          <button
            onClick={handleBack}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-primary transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-30">
      {/* Header */}
      <div className=" sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-primary text-xl hover:text-white transition-colors"
          >
            <ArrowLeft className="w-8 h-8" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={
                  mainImage ||
                  "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop"
                }
                alt={food.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <button
                onClick={toggleFavorite}
                className={`absolute top-4 right-4 p-2 rounded-full ${
                  isFavorite ? "bg-red-500 text-white" : "bg-primary text-white"
                } shadow-lg hover:scale-110 transition-transform`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {food.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${food.name} ${index + 1}`}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                    img === mainImage
                      ? "border-orange-500 scale-105"
                      : "border-transparent hover:opacity-80"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-3xl font-bold text-primary mb-2">
              {food.name}
            </h1>

            {/* Rating and Meta Info */}
            <div className="flex items-center gap-6 text-sm text-white">
              {food.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="font-medium">{food.rating}</span>
                  {food.reviews && <span>({food.reviews} reviews)</span>}
                </div>
              )}
              {food.cookTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{food.cookTime}</span>
                </div>
              )}
              {food.servings && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{food.servings} servings</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Description
              </h3>
              <p className="text-white leading-relaxed">
                {food.description || food.fullDescription}
              </p>
            </div>

            {/* Ingredients */}
            {food.ingredients && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Ingredients
                </h3>
                <ul>
                  {food.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-white"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nutrition Facts */}
            {food.nutritionFacts && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Nutrition Facts
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(food.nutritionFacts).map(([key, value]) => (
                    <div key={key} className="text-start">
                      <p className="text-sm text-white capitalize">{key}</p>
                      <p className="font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price and Actions */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-primary">
                  ${food.price}
                </div>
                {food.originalPrice && (
                  <div className="text-lg text-white line-through">
                    ${food.originalPrice}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 px-6 rounded-lg transition-all duration-200 transform"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
