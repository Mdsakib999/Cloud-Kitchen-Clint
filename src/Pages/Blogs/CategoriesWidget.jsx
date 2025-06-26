import { ChevronRight } from "lucide-react";
export const CategoriesWidget = ({ categories }) => {
  return (
    <div className="bg-bg-secondary rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-white mb-4">Categories</h3>
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li key={index}>
            <a
              href="#"
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="text-white group-hover:text-orange-600">
                <ChevronRight className="w-4 h-4 inline mr-2" />
                {category.name}
              </span>
              <span className="text-gray-500 text-sm">({category.count})</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
