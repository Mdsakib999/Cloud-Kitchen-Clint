import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../../redux/cartSlice";

export const FoodDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const food = state?.item;

  const [isFavorite, setIsFavorite] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);

  useEffect(() => {
    if (!food) {
      navigate(-1);
      return;
    }
    // initialize images & selections
    const firstImg = Array.isArray(food.images)
      ? food.images[0]?.url
      : food.images;
    setMainImage(firstImg || "");
    if (Array.isArray(food.sizes) && food.sizes.length) {
      setSelectedSize(food.sizes[0]);
    }
  }, [food, navigate]);

  if (!food) return null;

  const totalPrice =
    (selectedSize?.price || 0) +
    selectedAddons.reduce((sum, a) => sum + a.price, 0);

  const handleBack = () => navigate(-1);
  const toggleFavorite = () => setIsFavorite((f) => !f);
  const toggleAddon = (addon) => {
    setSelectedAddons((prev) =>
      prev.find((a) => a.label === addon.label)
        ? prev.filter((a) => a.label !== addon.label)
        : [...prev, addon]
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    const compositeId = [
      food._id,
      selectedSize.label,
      ...selectedAddons.map((a) => a.label),
    ].join("__");

    dispatch(
      addToCart({
        _id: compositeId,
        baseId: food._id,
        name: food.title,
        image: mainImage,
        price: totalPrice,
        quantity: 1,
        size: selectedSize.label,
        addons: selectedAddons,
      })
    );
    toast.success("Added to cart");
  };

  return (
    <div className="pt-30">
      <div className="sticky top-0 bg-bg-primary z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-primary text-xl"
          >
            <ArrowLeft className="w-8 h-8" /> Back
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <img
              src={mainImage}
              alt={food.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <button
              onClick={toggleFavorite}
              className={`absolute top-4 right-4 p-2 rounded-full ${
                isFavorite ? "bg-red-500" : "bg-primary"
              } text-white shadow-lg`}
            >
              <Heart className="w-5 h-5" />
            </button>
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {food.images.map(({ url }, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`${food.title} thumbnail ${idx + 1}`}
                  onClick={() => setMainImage(url)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    url === mainImage
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary">{food.title}</h1>
            <div className="flex items-center gap-6 text-sm text-gray-300">
              {food.rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  {food.rating} ({food.reviews} reviews)
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {food.cookTime} mins
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" /> {food.servings} servings
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary">
                Ingredients
              </h3>
              <ul className=" list-inside text-gray-300">
                {food.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            {/* Size selection */}
            <div>
              <h3 className="text-lg font-semibold text-primary">Size</h3>
              <div className="flex gap-2 mt-2">
                {food.sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border ${
                      selectedSize?.label === size.label
                        ? "bg-primary text-bg-primary"
                        : "bg-gray-100"
                    }`}
                  >
                    {size.label} (+${size.price.toFixed(2)})
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Add-ons
              </h3>
              <div className="flex flex-wrap gap-3">
                {food.addons.map((addon) => {
                  const isSelected = selectedAddons.some(
                    (a) => a.label === addon.label
                  );
                  return (
                    <button
                      key={addon.label}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      className={`
            flex items-center gap-2 px-4 py-2 rounded-full border transition
            ${
              isSelected
                ? "bg-primary text-bg-primary border-primary"
                : "bg-transparent text-primary border-primary hover:bg-primary hover:text-white"
            }
          `}
                    >
                      {addon.label}
                      <span className="text-sm font-medium">
                        (+${addon.price.toFixed(2)})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price & Cart */}
            <div className="pt-6">
              <div className="text-4xl font-bold text-primary">
                ${totalPrice.toFixed(2)}
              </div>
              <button
                onClick={handleAddToCart}
                className="mt-4 w-full bg-primary text-bg-primary py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
