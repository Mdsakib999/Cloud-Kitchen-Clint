import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  totalItems,
  startIndex,
  itemsPerPage,
}) => {
  const getPageNumbers = () => {
    const delta = 2;
    const pages = [];
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-4">
      <div className="text-sm text-gray-400">
        Showing {startIndex + 1} to{" "}
        {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} items
      </div>

      <div className="flex items-center space-x-2 bg-bg-secondary rounded-lg p-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
