import { Star } from "lucide-react";
import { useGetReviewsQuery } from "../../redux/apiSlice";

export const PreviousReviews = ({ productId, foodTitle }) => {
  const { data, isLoading, isError } = useGetReviewsQuery({ productId });
  const reviewsArray = Array.isArray(data?.reviews) ? data.reviews : [];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalf) {
      stars.push(
        <div key="half" className="relative w-4 h-4">
          <Star className="w-4 h-4 text-white absolute" />
          <div className="overflow-hidden w-1/2 absolute top-0 left-0">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    while (stars.length < 5) {
      stars.push(
        <Star
          key={`empty-${stars.length}`}
          className="w-4 h-4 text-white opacity-30"
        />
      );
    }

    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 font-inter">
      <h2 className="text-2xl font-bold text-white mb-6">
        Reviews for {foodTitle}
      </h2>

      {isLoading ? (
        <p className="text-gray-300">Loading reviews…</p>
      ) : isError ? (
        <p className="text-red-400">
          Something went wrong. Please try again later.
        </p>
      ) : reviewsArray.length === 0 ? (
        <p className="text-gray-400">No reviews yet for this item.</p>
      ) : (
        <div className="space-y-6">
          {reviewsArray.map((review) => {
            const name = review.user?.name || "Anonymous";
            const avatar =
              review.user?.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;
            const comment = review.comment || "No comment provided";
            const title = review?.title;

            return (
              <article
                key={review._id}
                className="flex gap-4 border-b border-gray-700 pb-6"
              >
                <img
                  src={avatar}
                  alt={`${name}'s avatar`}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />

                <div className="flex-1">
                  <header className="mb-1">
                    <h4 className="text-white font-semibold text-base">
                      {name}
                    </h4>
                    {title && (
                      <p className="text-sm text-primary font-medium">
                        {title}
                      </p>
                    )}
                  </header>

                  {renderStars(review.rating)}

                  <p className="text-white text-sm mt-2 leading-relaxed">
                    {comment}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
