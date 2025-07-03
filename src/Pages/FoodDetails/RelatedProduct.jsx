import { Loader } from "../../Components/SharedComponent/Loader";
import { useGetAllProductsQuery } from "../../redux/apiSlice";
import { Link } from "react-router-dom";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";

export default function RelatedProduct({ category, currentId }) {
  const { data: products = [], isLoading, error } = useGetAllProductsQuery();

  if (isLoading) return <Loader comp_Name="related products" />;
  if (error)
    return (
      <div className="text-red-500 py-8">Failed to load related products.</div>
    );

  const related = products.filter(
    (item) => item._id !== currentId && item.category?.name === category
  );
  const shuffled = related.sort(() => 0.5 - Math.random()).slice(0, 4);

  if (related.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No related products found in this category.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-primary">Related Products</h2>
        <div className="h-0.5 bg-gradient-to-r from-primary to-transparent flex-1 ml-6"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shuffled.map((item) => {
          const basePrice = item.sizes?.[0]?.price ?? 0;
          const discountPrice = item.sizes?.[0]?.discountPrice;

          const priceText = (
            <div className="flex items-center justify-end gap-2 mt-2">
              {discountPrice ? (
                <>
                  <span className="text-primary font-bold text-lg flex items-center gap-1">
                    <TbCurrencyTaka className="w-6 h-6" />
                    {discountPrice.toFixed(2)}
                    <span className="line-through text-gray-400 text-sm flex items-center ml-2">
                      (<TbCurrencyTaka className="w-4 h-4" />
                      {basePrice.toFixed(2)})
                    </span>
                  </span>
                </>
              ) : (
                <span className="text-primary font-bold text-lg flex items-center">
                  <TbCurrencyTaka className="w-6 h-6" />
                  {basePrice.toFixed(2)}
                </span>
              )}
            </div>
          );

          return (
            <div
              key={item._id}
              className="group bg-bg-tertiary rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700/50"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={item.images?.[0]?.url || "/default.jpg"}
                  alt={item.title}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Discount Badge */}
                {discountPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    {Math.round(
                      ((basePrice - discountPrice) / basePrice) * 100
                    )}
                    % OFF
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  {/* Rating */}
                  {item.rating > 0 && (
                    <div className="flex items-center gap-1 text-sm">
                      <Star size={14} className="text-primary fill-current" />
                      <span className="font-medium">
                        {item.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                  {/* Cook Time */}
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-primary" />
                    <span>{item.cookTime}m</span>
                  </div>
                  {/* Serving */}
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-primary" />
                    <span>{item.servings}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white leading-tight">
                  <Link
                    to={`/food-details/${item._id}`}
                    state={{ item }}
                    className="hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                </h3>

                {/* ingredients */}
                <div className="text-sm text-gray-400">
                  {item.ingredients?.join(", ")}
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between pt-2">
                  <div>{priceText}</div>

                  <Link
                    to={`/food-details/${item._id}`}
                    state={{ item }}
                    className="bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition"
                    title="Quick View"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
