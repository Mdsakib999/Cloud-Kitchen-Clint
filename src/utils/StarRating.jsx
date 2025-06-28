import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export const StarRating = ({
  rating,
  setRating,
  hoverRating,
  setHoverRating,
  size = 8,
}) => {
  const handleHover = (index, isHalf) => {
    const value = isHalf ? index - 0.5 : index;
    setHoverRating(value);
  };

  const handleClick = (value) => {
    setRating(value);
  };

  const displayRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const isFull = i <= Math.floor(displayRating);
        const isHalf = i - displayRating === 0.5;

        return (
          <div key={i} className="relative inline-block">
            <button
              type="button"
              className="relative text-yellow-400 hover:scale-110 transition-transform"
              onMouseLeave={() => setHoverRating(null)}
            >
              {/* Left half (0.5 star) */}
              <div
                className="absolute inset-0 w-1/2 overflow-hidden cursor-pointer"
                onMouseEnter={() => handleHover(i, true)}
                onClick={() => handleClick(i - 0.5)}
              />
              {/* Right half (1 full star) */}
              <div
                className="absolute inset-0 left-1/2 w-1/2 overflow-hidden cursor-pointer"
                onMouseEnter={() => handleHover(i, false)}
                onClick={() => handleClick(i)}
              />

              {/* Star display */}
              {isFull ? (
                <FaStar className={`w-${size} h-${size}`} />
              ) : isHalf ? (
                <FaStarHalfAlt className={`w-${size} h-${size}`} />
              ) : (
                <FaRegStar className={`w-${size} h-${size} text-gray-400`} />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};
