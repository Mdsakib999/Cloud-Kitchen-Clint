import { Star } from "lucide-react";
import { reviews } from "../../FakeDB/mockReviewData";

export const PreviousReviews = ({ foodTitle }) => {
  const filteredReviews = reviews.filter((r) => r.dish === foodTitle);

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;

    for (let i = 0; i < full; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (half) {
      stars.push(
        <div key="half" className="relative w-4 h-4">
          <Star className="w-4 h-4 text-white absolute" />
          <div className="overflow-hidden w-1/2 absolute">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    while (stars.length < 5) {
      stars.push(
        <Star key={`empty-${stars.length}`} className="w-4 h-4 text-white" />
      );
    }

    return stars;
  };

  return (
    <div className="py-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">
        Reviews for {foodTitle}
      </h2>

      {filteredReviews.length === 0 ? (
        <p className="text-gray-300">No reviews yet for this item.</p>
      ) : (
        <div className="space-y-6">
          {filteredReviews.map((review) => {
            const name = review.reviewer?.name || review.name;
            const avatar = review.reviewer?.avatar || review.avatar;
            const text = review.reviewer?.review || review.text;

            return (
              <div key={review.id} className="border-b border-gray-700 pb-6">
                <div className="flex items-start gap-4">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{name}</h4>
                    <div className="flex gap-1 mt-1">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-white mt-2">{text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
