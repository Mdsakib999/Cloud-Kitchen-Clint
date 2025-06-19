import { useState } from "react";
import {
  Search,
  Bell,
  MessageSquare,
  Calendar,
  Settings,
  User,
} from "lucide-react";
export const StatHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-4 pr-12 py-2.5 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <Search size={20} />
        </button>
      </div>

      {/* Action Icons */}
      <div className="flex items-center space-x-4 ml-6">
        {/* Bell Icon with Badge */}
        <div className="relative">
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Bell size={20} />
          </button>
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </div>

        {/* Message Icon with Badge */}
        <div className="relative">
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <MessageSquare size={20} />
          </button>
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            5
          </span>
        </div>

        {/* Calendar Icon with Badge */}
        <div className="relative">
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Calendar size={20} />
          </button>
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            2
          </span>
        </div>

        {/* Settings Icon with Badge */}
        <div className="relative">
          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Settings size={20} />
          </button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            1
          </span>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 ml-4">
          <span className="text-gray-700 font-medium">Hello, Admin</span>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
