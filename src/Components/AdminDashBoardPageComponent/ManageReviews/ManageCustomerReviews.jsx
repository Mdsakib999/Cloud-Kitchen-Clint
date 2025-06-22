import { ChevronLeft, ChevronRight, Calendar, Check, X } from "lucide-react";

import { reviews } from "../../../FakeDB/mockReviewData";
import { useState } from "react";

export const ManageCustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const nextSlide = () => {
    if (currentIndex < reviews.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleReviews = reviews.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        <span className="text-yellow-400 text-lg">★</span>
        <span className="ml-1 text-sm font-medium text-gray-700">{rating}</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews</h1>
          <p className="text-gray-600">Manage customer reviews and ratings</p>
        </div>

        {/* Filter Period */}
        <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm border">
          <Calendar className="w-4 h-4 text-blue-500 mr-2" />
          <div>
            <div className="text-sm font-medium text-gray-900">
              Filter Period
            </div>
            <div className="text-xs text-gray-500">
              15 May 2025 - 30 May 2025
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
        </div>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {visibleReviews.map((review) => (
          <div key={review.id} className="rounded-lg overflow-hidden p-4">
            {/* Top Row: Image + Name & Category */}
            <div className="flex items-center gap-6 mb-4">
              {/* Dish Image with Shadow */}
              <div className="h-24 w-24 rounded-full overflow-hidden shadow-lg shadow-yellow-300">
                <img
                  src={review.image}
                  alt={review.dish}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {review.dish}
                </h3>
                <p className="text-blue-500 text-sm">{review.category}</p>
                {review.status === "accepted" && (
                  <div className="inline-block mt-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    Accepted
                  </div>
                )}
              </div>
            </div>

            {/* Review Text */}
            <p className="text-gray-700 text-sm leading-relaxed mb-4 bg-white ">
              "{review.reviewer.review}"
            </p>

            {/* Reviewer Info */}
            <div className="flex items-start justify-between bg-blue-50 p-3 rounded-lg mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={review.reviewer.avatar}
                  alt={review.reviewer.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col ">
                  <span className="font-medium text-gray-900">
                    {review.reviewer.name}
                  </span>
                  <span className="text-xs text-gray-500 mb-1">
                    {review.reviewer.role}
                  </span>
                </div>
              </div>
              <div>{renderStars(review.rating)}</div>
            </div>

            {/* Action Buttons */}
            {review.status === "pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(review.id)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <Check className="w-4 h-4" />
                  Accept
                </button>
                <button
                  onClick={() => handleRemove(review.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                  Remove
                </button>
              </div>
            )}

            {review.status === "accepted" && (
              <div className="text-center py-2 text-green-600 font-medium">
                ✓ Review Accepted
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Navigation */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full ${
            currentIndex === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          } transition-colors duration-200`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {Array.from({ length: Math.ceil(reviews.length / itemsPerPage) }).map(
            (_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  Math.floor(currentIndex / itemsPerPage) === index
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
            )
          )}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentIndex >= reviews.length - itemsPerPage}
          className={`p-2 rounded-full ${
            currentIndex >= reviews.length - itemsPerPage
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          } transition-colors duration-200`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
