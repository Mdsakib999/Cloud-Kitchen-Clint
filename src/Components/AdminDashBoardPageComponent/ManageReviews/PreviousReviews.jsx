import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import { oldReviews } from "../../../FakeDB/mockReviewData";

export const PreviousReviews = () => {
  const [sortBy, setSortBy] = useState("Latest");

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4">
          <Star className="w-4 h-4 text-gray-300 absolute" />
          <div className="overflow-hidden w-1/2 absolute">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const getTagColor = (tag) => {
    switch (tag) {
      case "Good Service":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "Good Places":
        return "bg-green-100 text-green-600 border-green-200";
      case "Excellent":
        return "bg-red-100 text-red-600 border-red-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Others Review
          </h2>
          <p className="text-gray-500">See all reviews</p>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
            {sortBy}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {oldReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 pb-6 last:border-b-0"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />

              <div className="flex-1">
                {/* Header with name, tags, and rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {review.name}
                      </h3>
                      <p className="text-sm text-gray-500">Manchester</p>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2">
                      {review.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(
                            tag
                          )}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex flex-col items-end">
                    <div className="text-lg font-bold text-gray-900 mb-1">
                      {review.rating}
                    </div>
                    <div className="flex gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 leading-relaxed">{review.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
