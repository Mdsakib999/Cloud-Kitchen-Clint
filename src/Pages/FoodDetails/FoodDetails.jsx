import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Users, Star, Heart, Share2 } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useGetProductByIdQuery } from "../../redux/apiSlice";
import { PreviousReviews } from "../../Components/FoodDetailsComponents/PreviousReviews";
import { ReviewForm } from "../../Components/FoodDetailsComponents/ReviewForm";
import { addToCart } from "../../redux/cartSlice";
import { useGetOrdersByUserQuery } from "../../redux/orderSlice";
import {
  FaFacebook,
  FaWhatsapp,
  FaTwitter,
  FaFacebookMessenger,
  FaLink,
} from "react-icons/fa";

import { useAuth } from "../../providers/AuthProvider";
import RelatedProduct from "../../Components/FoodDetailsComponents/RelatedProduct";
import { Loader } from "../../Components/SharedComponent/Loader";
import DOMPurify from "dompurify";

export const FoodDetails = () => {
  const { id: productId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch product
  const {
    data: food,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(productId);

  // Fetch user orders for review logic
  const userId = user?._id;
  const { data: orders = [] } = useGetOrdersByUserQuery(userId, {
    skip: !userId,
  });

  // State for review logic
  const [hasPurchased, setHasPurchased] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (!food?._id || !orders.length) {
      setHasPurchased(false);
      setOrderId(null);
      return;
    }
    const ord = orders.find((o) => o.items.some((i) => i.food === food._id));
    if (ord) {
      setHasPurchased(true);
      setOrderId(ord._id);
    } else {
      setHasPurchased(false);
      setOrderId(null);
    }
  }, [orders, food]);

  // Show toast on error
  useEffect(() => {
    if (isError) {
      toast.error(
        <span className="font-serif">
          Product not found or an error occurred.
        </span>
      );
    }
  }, [isError]);

  // quantity state for add to cart
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [activeTab, setActiveTab] = useState("Details");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const shareMenuRef = useRef(null);

  // Close share menu on outside click
  useEffect(() => {
    if (!showShare) return;
    const handleClick = (e) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target)) {
        setShowShare(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showShare]);

  useEffect(() => {
    if (!food) return;
    // initialize images & selections
    const firstImg = Array.isArray(food.images)
      ? food.images[0]?.url
      : food.images;
    setMainImage(firstImg || "");
    if (Array.isArray(food.sizes) && food.sizes.length) {
      setSelectedSize(food.sizes[0]);
    }
  }, [food]);

  useEffect(() => {
    if (!orders || !food?._id) return;

    const purchased = orders.some((order) =>
      order.items.some((item) => item.food === food._id)
    );
    setHasPurchased(purchased);
  }, [orders, food]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError || !food) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        Product not found.
      </div>
    );
  }

  // Calculate price logic
  const hasDiscount =
    selectedSize?.discountPrice &&
    selectedSize?.discountPrice < selectedSize?.price;

  // Use discounted price if available, else normal price
  const unitPrice = hasDiscount
    ? selectedSize.discountPrice
    : selectedSize?.price || 0;

  const totalPrice =
    (unitPrice + selectedAddons.reduce((sum, a) => sum + a.price, 0)) * qty;

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
    toast.success(<h1 className="text-center font-serif">Added to cart</h1>);
  };

  // Copy link handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(<span className="font-serif">Link copied!</span>);
    setShowShare(false);
  };

  // Share URLs
  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(
    `Check out this food: ${food?.title} on ByteBites!`
  );
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;
  const messengerUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
    shareUrl
  )}&app_id=123456789&redirect_uri=${encodeURIComponent(shareUrl)}`;
  const whatsappUrl = `https://wa.me/?text=${shareText}%20${encodeURIComponent(
    shareUrl
  )}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(
    shareUrl
  )}`;

  return (
    <div className="min-h-screen pt-32 font-inter">
      {/* Header with back button */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative">
              <div className="aspect-square lg:aspect-auto lg:h-[500px] relative overflow-hidden ">
                <img
                  src={mainImage}
                  alt={food.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Floating badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`cursor-pointer p-2 rounded-full backdrop-blur-sm transition-all ${
                      isFavorite
                        ? "bg-red-500 text-white"
                        : "bg-white/80 text-gray-700 hover:bg-white"
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <button
                      className="cursor-pointer p-2 rounded-full bg-white/80 text-gray-700 hover:bg-white backdrop-blur-sm transition-all"
                      onClick={() => setShowShare((prev) => !prev)}
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    {showShare && (
                      <div
                        ref={shareMenuRef}
                        className="absolute right-0 mt-2 w-64 max-w-xs bg-white rounded-xl shadow-lg p-4 flex flex-col gap-3 z-50 animate-fade-in sm:w-56 left-auto"
                      >
                        <a
                          href={facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer flex items-center gap-2 hover:text-blue-600 transition-colors"
                        >
                          <FaFacebook className="w-5 h-5 text-blue-600" />{" "}
                          Facebook
                        </a>
                        <a
                          href={messengerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer flex items-center gap-2 hover:text-blue-500 transition-colors"
                        >
                          <FaFacebookMessenger className="w-5 h-5 text-blue-500" />{" "}
                          Messenger
                        </a>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer flex items-center gap-2 hover:text-green-500 transition-colors"
                        >
                          <FaWhatsapp className="w-5 h-5 text-green-500" />{" "}
                          WhatsApp
                        </a>
                        <a
                          href={twitterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer flex items-center gap-2 hover:text-blue-400 transition-colors"
                        >
                          <FaTwitter className="w-5 h-5 text-blue-400" />{" "}
                          Twitter
                        </a>
                        <button
                          onClick={handleCopyLink}
                          className="cursor-pointer flex items-center gap-2 hover:text-emerald-600 transition-colors w-full text-left"
                        >
                          <FaLink className="w-5 h-5 text-emerald-600" /> Copy
                          Link
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Discount badge */}
                {hasDiscount && (
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {Math.round(
                      ((selectedSize.price - selectedSize.discountPrice) /
                        selectedSize.price) *
                        100
                    )}
                    % OFF
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {food.images.length > 1 && (
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {food.images.map(({ url }, idx) => (
                      <button
                        key={idx}
                        onClick={() => setMainImage(url)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          url === mainImage
                            ? "border-primary ring-2 ring-primary"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={url}
                          alt={`${food.title} thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="px-4 py-1.5 bg-primary text-white rounded-full font-medium">
                    {food.category?.name}
                  </span>
                </div>
                <h1 className="text-sl md:text-3xl font-bold text-white font-inknut">
                  {food.title}
                </h1>

                {/* Rating and stats */}
                <div className="flex items-center gap-6 text-xs md:text-sm text-gray-600">
                  {food.rating > 0 && (
                    <div className="flex items-center gap-1 text-gray-200">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{food.rating}</span>
                      <span>({food.reviews} reviews)</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-gray-200">
                    <Clock className="w-4 h-4" />
                    <span>{food.cookTime} mins</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-200">
                    <Users className="w-4 h-4" />
                    <span>{food.servings} servings</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="text-xs md:text-base text-gray-200">
                <p>{food?.description}</p>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-primary">Size</h3>
                <div className="flex gap-2 mt-2">
                  {food.sizes.map((size) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(size)}
                      className={`text-sm px-6 py-2.5 rounded-full ${
                        selectedSize?.label === size.label
                          ? "bg-primary text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {size.label} (+{size.price.toFixed(2)} Tk)
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
                          `text-sm flex items-center gap-2 px-6 py-2.5 rounded-full border transition ` +
                          (isSelected
                            ? "bg-primary text-bg-primary border-primary"
                            : "bg-transparent text-primary border-primary hover:bg-primary hover:text-white")
                        }
                      >
                        {addon.label}
                        <span className="text-sm font-medium">
                          (+{addon.price.toFixed(2)} Tk)
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-200">
                    Total Price
                  </span>
                  <div className="text-right">
                    <div className="text-base md:text-2xl font-bold text-gray-200">
                      ৳{totalPrice.toFixed(2)}
                    </div>
                    {hasDiscount && (
                      <div className="text-sm text-gray-400 line-through">
                        ৳
                        {(
                          (selectedSize.price +
                            selectedAddons.reduce(
                              (sum, a) => sum + a.price,
                              0
                            )) *
                          qty
                        ).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center gap-x-2">
                    {" "}
                    <button
                      onClick={() => handleQtyChange(-1)}
                      className="cursor-pointer px-4 py-1 text-white rounded bg-primary  hover:bg-primary/90"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-white">{qty}</span>
                    <button
                      onClick={() => handleQtyChange(+1)}
                      className="cursor-pointer px-4 py-1 text-white rounded bg-primary  hover:bg-primary/90"
                    >
                      +
                    </button>
                  </div>{" "}
                  <button
                    onClick={handleAddToCart}
                    className="text-xs md:text-base cursor-pointer p-2 md:px-8 md:py-3 bg-primary hover:bg-amber-500 text-white rounded-full hover:bg-primary-dark"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="text-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {["Details", "Reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === tab
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === "Details" ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    Description
                  </h3>
                  <div className="prose prose-gray max-w-none">
                    <p>{food.description}</p>
                    <div
                      className="prose prose-gray max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(food.longDescription || ""),
                      }}
                    />
                  </div>
                </div>

                {food.ingredients && food.ingredients.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      Ingredients
                    </h3>
                    <div className="flex items-center justify-between flex-wrap">
                      {food.ingredients.map((ingredient, index) => (
                        <div
                          key={index}
                          className="w-60 flex items-center gap-2 p-2 bg-transparent rounded-lg"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-white">{ingredient}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {hasPurchased ? (
                  <ReviewForm
                    productId={food._id}
                    user={user}
                    orderId={orderId}
                  />
                ) : (
                  <div className="bg-emerald-950 text-center rounded-lg p-4">
                    <p className="text-white text-lg">
                      You must purchase this item to leave a review.
                    </p>
                  </div>
                )}
                <PreviousReviews foodTitle={food.title} productId={food._id} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <RelatedProduct category={food.category?.name} currentId={food._id} />
      </div>
    </div>
  );
};
