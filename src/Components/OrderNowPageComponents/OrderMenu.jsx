import { useState } from "react";
import {
  useGetAllProductsQuery,
  useGetMenuCategoriesQuery,
} from "../../redux/apiSlice";
import { Link } from "react-router-dom";
export const OrderMenu = () => {
  const { data: products = [] } = useGetAllProductsQuery();
  const { data: categoriesData = [] } = useGetMenuCategoriesQuery();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Build counts per category
  const categoryCount = products.reduce((acc, p) => {
    const name = p.category?.name ?? "Uncategorized";
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  // Static placeholder URLs for the big category circles
  const staticCategoryImages = {
    // Unsplash Images (high quality, free to use)
    Burger:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop",
    Pizza:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=400&fit=crophttps://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
    Coffee:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=400&fit=crop",
    Sandwiches:
      "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=500&h=400&fit=crop",
    Pasta:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
    Salads:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop",
    Desserts:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&h=400&fit=crop",
    Chicken:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=400&fit=crop",
    Appetizers:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAycQcpOdNLqQ8Cw1zyDFkuS6CfSnbPT4PoQ&s",
    Uncategorized:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=400&fit=crop",
  };

  // Build our tabs list
  const categories = [
    { name: "All", image: null },
    ...categoriesData.map((cat) => ({
      name: cat.name,
      // if your API doesn’t provide a thumbnail, fall back to our static map
      image:
        cat.image?.[0]?.url ||
        staticCategoryImages[cat.name] ||
        staticCategoryImages.Uncategorized,
    })),
  ];

  // Filtered list of products by tab & search
  const filtered = products.filter((p) => {
    const inCat =
      activeCategory === "All" || p.category?.name === activeCategory;
    const matches = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return inCat && matches;
  });

  // When “All,” group by category for sections
  const grouped =
    activeCategory === "All"
      ? products.reduce((acc, item) => {
          const key = item.category?.name || "Uncategorized";
          if (!acc[key]) acc[key] = [];
          if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            acc[key].push(item);
          }
          return acc;
        }, {})
      : { [activeCategory]: filtered };

  return (
    <div className="min-h-screen bg-bg-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`
                flex items-center px-4 py-2 rounded-full font-medium transition-all cursor-pointer
                ${
                  activeCategory === cat.name
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
                }
              `}
            >
              {cat.name !== "All" && cat.image && (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
              )}
              <span>
                {cat.name}
                {cat.name !== "All" && ` (${categoryCount[cat.name] || 0})`}
              </span>
            </button>
          ))}
        </nav>

        {/* Sections */}
        {Object.entries(grouped).map(([catName, items], idx) => {
          if (!items || items.length === 0) return null;
          const bigImage =
            categories.find((c) => c.name === catName)?.image ||
            staticCategoryImages.Uncategorized;
          const reverse = idx % 2 === 1;

          return (
            <section
              key={catName}
              className={`flex flex-col lg:flex-row items-center mb-16 ${
                reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Big circle image */}
              <div className="lg:w-1/2 flex justify-center py-8">
                <div className="relative w-64 h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <img
                    src={bigImage}
                    alt={catName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-4 border-primary rounded-full transform -rotate-3"></div>
                  <div className="absolute inset-0 border-4 border-bg-cart rounded-full transform rotate-6"></div>
                </div>
              </div>

              {/* Items list */}
              <div className="lg:w-1/2 bg-bg-secondary p-6 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-primary mb-6">
                  {catName}
                </h2>
                <div className="space-y-6">
                  {items.map((item) => {
                    const [half, full] = item.sizes || [];
                    return (
                      <div
                        key={item._id}
                        className="flex items-center justify-between border-b border-gray-500 py-4 px-4 hover:bg-bg-primary hover:rounded-2xl transition-all "
                      >
                        <div className="flex items-center justify-center">
                          <div className="w-15 h-15 rounded-full overflow-hidden border-2 border-gray-200">
                            <img
                              src={item.images[0]?.url || bigImage}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <Link
                              to={`/food-details/${item._id}`}
                              state={{ item }}
                            >
                              <h3 className="text-lg font-semibold text-gray-300 hover:text-primary">
                                {item.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-500">
                              {item.ingredients?.join(" / ")}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            ${half?.price?.toFixed(2) ?? "0.00"}
                          </div>
                          <div className="text-lg font-bold text-primary">
                            ${full?.price?.toFixed(2) ?? "0.00"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
