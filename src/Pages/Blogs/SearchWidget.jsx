import { useState } from "react";
import { Search } from "lucide-react";
export const SearchWidget = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-bg-secondary rounded-lg shadow-lg p-6 mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search here ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-12 py-3 border border-gray-300 text-white placeholder:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
