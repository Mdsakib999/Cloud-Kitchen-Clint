import { useState } from "react";
import { StarRating } from "../../utils/StarRating";
import { useCreateReviewMutation } from "../../redux/apiSlice";
import toast from "react-hot-toast";

export const ReviewForm = ({ productId, user, orderId }) => {
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        user: user._id,
        product: productId,
        order: orderId,
        rating,
        title,
        comment,
      }).unwrap();

      toast.success("Review submitted!");
      setTitle("");
      setComment("");
      setRating(5);
    } catch (err) {
      toast.error("Failed to submit review.");
      console.error(err);
    }
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

      {/* Title (optional) */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title (optional)"
        className="w-full p-3 rounded-lg bg-bg-input text-white border border-gray-600 mb-4"
      />

      {/* Comment Textarea */}
      <textarea
        rows="4"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your thoughts about this dish..."
        className="w-full p-3 rounded-lg bg-bg-input text-white border border-gray-600 mb-4"
        required
      />

      {/* Submit */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition font-semibold"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};
