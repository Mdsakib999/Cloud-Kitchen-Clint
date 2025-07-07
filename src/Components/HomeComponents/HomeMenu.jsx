import React, { useState } from "react";
import FoodCard from "../SharedComponent/FoodCard";
import { useGetAllProductsQuery } from "../../redux/apiSlice";
import { Utensils } from "lucide-react";
import { SectionHeader } from "../SharedComponent/SectionHeader";
import Pagination from "../SharedComponent/Pagination";

const HomeMenu = () => {
  const {
    data: menuItems = [],
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery();

  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = React.useMemo(() => {
    const names = menuItems.map(
      (item) => item.category?.name || "Uncategorized"
    );
    return ["All", ...Array.from(new Set(names))];
  }, [menuItems]);

  const filtered = React.useMemo(() => {
    const filteredItems =
      activeCategory === "All"
        ? menuItems
        : menuItems.filter(
            (item) =>
              (item.category?.name || "Uncategorized") === activeCategory
          );
    return filteredItems;
  }, [menuItems, activeCategory]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  if (isLoading) {
    return <p className="text-center mt-12">Loading menu...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-12 text-red-500">
        Error loading menu: {error?.data?.message || error.error}
      </p>
    );
  }

  return (
    <section className="py-12 px-4 bg-bg-secondary text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          icon={Utensils}
          subtitle="Taste the Best, Enjoy the Rest"
          title="Explore Our Menu"
          description="Dive into our curated selection of delicious meals crafted by top chefs using the freshest ingredients. Something for every craving!"
          className="mb-8"
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full border border-primary transition ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedItems.map((item) => (
            <FoodCard key={item._id} item={item} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalItems={filtered.length}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </section>
  );
};

export default HomeMenu;
