import { useState } from "react";
import { StarRating } from "../../utils/StarRating";

export const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(null);
  const [review, setReview] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!rating || !review.trim()) {
      alert("Please provide both rating and review.");
      return;
    }

    const formData = {
      rating,
      review: review.trim(),
      suggestion: suggestion.trim(),
    };

    onSubmit?.(formData);

    // Reset form
    setRating(0);
    setHoverRating(null);
    setReview("");
    setSuggestion("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h3 className="text-xl text-white font-semibold mb-3">Leave a Review</h3>

      {/* Star Rating */}
      <div className="mb-4">
        <StarRating
          rating={rating}
          setRating={setRating}
          hoverRating={hoverRating}
          setHoverRating={setHoverRating}
        />
        <p className="text-sm text-gray-400 mt-1">
          {rating > 0
            ? `Rating: ${rating} star${rating !== 1 ? "s" : ""}`
            : "Click to rate"}
        </p>
      </div>

      {/* Review Textarea */}
      <textarea
        rows="4"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your thoughts about this dish..."
        className="w-full p-3 rounded-lg bg-bg-input text-white border border-gray-600 mb-4 focus:border-yellow-400 focus:outline-none"
        required
      />

      {/* Tips for Improvement */}
      <label className="block text-white mb-2 font-medium">
        Tips for Improvement{" "}
        <span className="text-sm text-gray-400">(optional)</span>
      </label>
      <input
        type="text"
        value={suggestion}
        onChange={(e) => setSuggestion(e.target.value)}
        placeholder="Any suggestion for improvement?"
        className="w-full p-3 rounded-lg bg-bg-input text-white border border-gray-600 mb-4 focus:border-yellow-400 focus:outline-none"
      />

      {/* Submit */}
      <button
        type="button"
        onClick={handleFormSubmit}
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition font-semibold"
      >
        Submit Review
      </button>
    </div>
  );
};
