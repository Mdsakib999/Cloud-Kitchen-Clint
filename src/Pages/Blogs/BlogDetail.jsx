import { useState } from "react";
import {
  User,
  Eye,
  MessageCircle,
  Tag,
  Heart,
  Share2,
  Bookmark,
} from "lucide-react";
export const BlogDetail = ({ blog, onBack }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="bg-bg-secondary rounded-lg shadow-lg overflow-hidden mb-8">
      {/* Date Badge */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white px-3 py-2 rounded-lg text-center">
          <div className="text-xl font-bold">24</div>
          <div className="text-xs">Aug</div>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-white mb-4">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4 text-orange-500" />
            <span>by {blog.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4 text-orange-500" />
            <span>{blog.category}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-orange-500" />
            <span>{blog.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4 text-orange-500" />
            <span>{blog.comments} Comments</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {blog.title}
        </h1>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-white mb-6">
          {blog.fullContent?.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed">
              {paragraph.startsWith('"') ? (
                <blockquote className="border-l-4 border-orange-500 pl-4 italic text-white my-4">
                  {paragraph}
                </blockquote>
              ) : (
                paragraph
              )}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-black rounded-full text-sm hover:bg-orange-100 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isLiked
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-black hover:bg-red-100 hover:text-red-600"
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              <span>{blog.likes + (isLiked ? 1 : 0)}</span>
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-gray-100 text-black hover:bg-yellow-100 hover:text-yellow-600"
              }`}
            >
              <Bookmark
                className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
              />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-black rounded-lg hover:bg-orange-100 hover:text-orange-600 transition-colors">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
