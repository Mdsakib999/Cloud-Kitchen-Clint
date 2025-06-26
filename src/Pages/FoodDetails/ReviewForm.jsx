import { useState } from "react";
import { Star } from "lucide-react";

export const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(null);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!rating || !text.trim()) {
      return alert("Please provide both rating and review text.");
    }
    setRating(0);
    setText("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h3 className="text-xl text-white font-semibold mb-3">Leave a Review</h3>

      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => setRating(num)}
            onMouseEnter={() => setHoveredStar(num)}
            onMouseLeave={() => setHoveredStar(null)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                (hoveredStar || rating) >= num
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-white"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts about this dish..."
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 mb-4"
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
      >
        Submit Review
      </button>
    </div>
  );
};
