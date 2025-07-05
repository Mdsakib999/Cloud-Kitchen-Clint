import {
  User,
  Eye,
  MessageCircle,
  Tag,
  Heart,
  Share2,
  Bookmark,
} from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import DOMPurify from "dompurify";
export const BlogDetail = ({ blog }) => {
  return (
    <div className="bg-bg-secondary rounded-lg shadow-lg overflow-hidden mb-8">
      {/* Date Badge */}
      <div className="relative mb-4">
        <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white px-3 py-2 rounded-lg text-center">
          <div className="text-xl font-bold">
            {new Date(blog.createdAt).getDate()}
          </div>
          <div className="text-xs">
            {new Date(blog.createdAt).toLocaleString("en-US", {
              month: "short",
            })}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 overflow-hidden rounded-md">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-fit"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-white mb-4">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4 text-orange-500" />
            <span>by {blog.author || "Admin"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4 text-orange-500" />
            <span>{blog.category}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-orange-500" />
            <span>{blog.views || 200}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4 text-orange-500" />
            <span>{blog.comments || 0} Comments</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-orange-500 font-semibold">
              {formatDate(blog.createdAt)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {blog.title}
        </h1>

        {/* Sanitized Content */}
        <div
          className="prose prose-lg max-w-none text-gray-300 mb-6 blog-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.content),
          }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 text-black rounded-full text-sm hover:bg-orange-100 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors bg-gray-200 text-black hover:bg-red-100 hover:text-red-600">
              <Heart className="w-5 h-5" />
              <span>{blog.likes}</span>
            </button>

            <button className="p-2 rounded-lg transition-colors bg-gray-200 text-black hover:bg-yellow-100 hover:text-yellow-600">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-orange-100 hover:text-orange-600 transition-colors">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
