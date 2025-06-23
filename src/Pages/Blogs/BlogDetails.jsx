import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../../FakeDB/mockBlogData";

export const BlogDetail = () => {
  const { id } = useParams();
  const matchedBlog = blogPosts.find((item) => item.id === parseInt(id));
  const [currentBlog, setCurrentBlog] = useState(matchedBlog || null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setCurrentBlog(matchedBlog);
    setIsLiked(false);
    setIsBookmarked(false);
  }, [id]);

  if (!currentBlog) {
    return (
      <div className="text-center text-white py-36">
        <h1 className="text-3xl font-bold">Post Not Found</h1>
        <Link
          to="/news"
          className="mt-6 inline-block text-primary hover:underline"
        >
          Back to All News
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(
    (post) =>
      post.category === currentBlog.category && post.id !== currentBlog.id
  );

  const handleBlogChange = (blog) => {
    setCurrentBlog(blog);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg-primary text-white relative pt-36">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary via-transparent to-bg-tertiary opacity-60"></div>

      {/* Back Button */}
      <div className="relative z-10 p-6 w-64 lg:ml-40">
        <Link
          to="/blogs"
          className="group flex items-center gap-3 bg-bg-input border border-white/10 px-6 py-3 rounded-full hover:bg-white/10 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
          <span className="text-white font-medium">Back to All Blogs</span>
        </Link>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        {/* Hero */}
        <div className="relative mb-12 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">
          <div className="relative h-96 overflow-hidden">
            <img
              src={currentBlog.image}
              alt={currentBlog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <div className="absolute top-6 left-6">
              <span className="bg-primary px-4 py-2 rounded-full text-sm font-bold">
                {currentBlog.category}
              </span>
            </div>

            <div className="absolute top-6 right-6 flex gap-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-3 rounded-full border border-white/20 ${
                  isBookmarked
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center gap-6 text-sm text-gray-300 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{currentBlog.date}</span>
              </div>
              {/* Read Time */}
              {currentBlog.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-tertiary" />
                  <span>{currentBlog.readTime}</span>
                </div>
              )}
              {/* Author */}
              {currentBlog.author && (
                <div className="flex items-center gap-2">
                  <span>By</span>
                  <span className="text-primary font-medium">
                    {currentBlog.author}
                  </span>
                </div>
              )}
            </div>

            <h1 className="text-2xl md:text-5xl font-black mb-6">
              {currentBlog.title}
            </h1>

            {/* Tags */}
            <div className="flex  gap-3 whitespace-nowrap flex-wrap mb-6">
              {currentBlog.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm text-gray-300 border border-white/10"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
            <div className="prose prose-invert prose-lg max-w-none text-gray-300 my-5">
              {(currentBlog.fullContent || currentBlog.content)
                .split("\n\n")
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>

            {/* Like/Comment */}
            <div className="flex items-center gap-6 pb-6 border-b border-white/10">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 ${
                  isLiked ? "text-red-400" : "text-gray-300 hover:text-red-400"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                <span>{(currentBlog.likes || 0) + (isLiked ? 1 : 0)}</span>
              </button>
              <div className="flex items-center gap-2 text-gray-300">
                <MessageCircle className="w-5 h-5" />
                <span>{currentBlog.comments || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-white/5 rounded-3xl border border-white/10 p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              Related Stories <ChevronRight className="w-5 h-5" />
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handleBlogChange(post)}
                  className="cursor-pointer group bg-white/5 hover:bg-white/10 transition rounded-2xl border border-white/10 overflow-hidden"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 left-3 bg-primary px-3 py-1 text-xs rounded-full text-white font-bold">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-semibold text-base group-hover:text-primary">
                      {post.title}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
