import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Users, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { PreviousReviews } from "./PreviousReviews";
import { ReviewForm } from "./ReviewForm";
import { addToCart } from "../../redux/cartSlice";
import { useGetOrdersByUserQuery } from "../../redux/orderSlice";

import { useAuth } from "../../providers/AuthProvider";
import RelatedProduct from "./RelatedProduct";

export const FoodDetails = () => {
  const { state } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = user?._id;
  const food = state?.item;

  const { data: orders = [], isLoading } = useGetOrdersByUserQuery(userId, {
    skip: !userId,
  });
  // foodId
  // const orderId = orders.map((id) => id._id);

  const [hasPurchased, setHasPurchased] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [activeTab, setActiveTab] = useState("Details");

  useEffect(() => {
    if (!food?._id || !orders.length) return;
    const ord = orders.find((o) => o.items.some((i) => i.food === food._id));
    if (ord) {
      setHasPurchased(true);
      setOrderId(ord._id);
    } else {
      setHasPurchased(false);
      setOrderId(null);
    }
  }, [orders, food]);

  // quantity state for add to cart
  const [qty, setQty] = useState(1);

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
  useEffect(() => {
    if (!orders || !food?._id) return;

    const purchased = orders.some((order) =>
      order.items.some((item) => item.food === food._id)
    );
    setHasPurchased(purchased);
  }, [orders, food]);

  if (!food) return null;

  const totalPrice =
    (selectedSize?.price || 0) +
    selectedAddons.reduce((sum, a) => sum + a.price, 0) * 1;

  const handleBack = () => navigate(-1);
  const toggleAddon = (addon) => {
    setSelectedAddons((prev) =>
      prev.find((a) => a.label === addon.label)
        ? prev.filter((a) => a.label !== addon.label)
        : [...prev, addon]
    );
  };

  const handleQtyChange = (delta) => {
    setQty((prev) => Math.max(1, prev + delta));
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
        quantity: qty,
        size: selectedSize.label,
        addons: selectedAddons,
      })
    );
    toast.success("Added to cart");
  };

  return (
    <div className="pt-30">
      <div className="sticky top-0  z-10">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-primary text-xl"
          >
            <ArrowLeft className="w-8 h-8" /> Back
          </button>
        </div>
      </div>
      <div className="">
        <div className="max-w-6xl  w-full mx-auto px-4 py-8">
          <div className="grid grid-cols-1  lg:grid-cols-2 gap-8">
            {/* Images */}
            <div>
              <img
                src={mainImage}
                alt={food.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
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
                <p className="text-gray-300">{food.description}</p>
              </div>
              {/* Ingredients */}
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  Ingredients
                </h3>
                <div className="ingredients-list">
                  <ul className=" list-inside text-gray-300">
                    {food.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Size selection */}
              <div>
                <h3 className="text-lg font-semibold text-primary">Size</h3>
                <div className="flex gap-2 mt-2">
                  {food.sizes.map((size) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-3 rounded-full ${
                        selectedSize?.label === size.label
                          ? "bg-primary text-white"
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
                        className={
                          `flex items-center gap-2 px-4 py-2 rounded-full border transition ` +
                          (isSelected
                            ? "bg-primary text-bg-primary border-primary"
                            : "bg-transparent text-primary border-primary hover:bg-primary hover:text-white")
                        }
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
                <div className="text-4xl font-bold text-primary pb-2">
                  ${totalPrice.toFixed(2)}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQtyChange(-1)}
                    className="px-4 py-1 border border-gray-300 text-white rounded bg-primary  hover:bg-primary/90"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-white">{qty}</span>
                  <button
                    onClick={() => handleQtyChange(+1)}
                    className="px-4 py-1 border border-gray-300 text-white rounded bg-primary  hover:bg-primary/90"
                  >
                    +
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="ml-4 px-8 py-3 bg-primary text-white rounded-full hover:bg-primary-dark"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Review field */}
      <div className="mt-8">
        <div className="flex justify-center border-b border-gray-200 text-2xl">
          {["Details", "Reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 -mb-px font-medium ${
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="pt-6 px-6 max-w-7xl mx-auto">
          {activeTab === "Details" ? (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Description
                </h3>
                <p className="text-gray-200">{food.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Ingredients
                </h3>
                <ul className="list-inside text-gray-200">
                  {food.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              {hasPurchased ? (
                <ReviewForm
                  productId={food._id}
                  user={user}
                  orderId={orderId}
                />
              ) : (
                <p className="text-gray-400 text-sm mb-4">
                  You must purchase this item to leave a review.
                </p>
              )}
              <PreviousReviews foodTitle={food.title} productId={food._id} />
            </>
          )}
        </div>
      </div>
      <RelatedProduct category={food.category?.name} currentId={food._id} />
    </div>
  );
};
