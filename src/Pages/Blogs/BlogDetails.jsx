import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../../FakeDB/mockBlogData";
import { BlogDetail } from "./BlogDetail";
import { CategoriesWidget } from "./CategoriesWidget";
import { PromotionalWidget } from "./PromotionalWidget";
import { SearchWidget } from "./SearchWidget";
import { useEffect, useState } from "react";

export const BlogDetails = () => {
  const { id } = useParams();
  const matchedBlog = blogPosts.find((item) => item.id === parseInt(id));
  const [currentBlog, setCurrentBlog] = useState(matchedBlog || null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const categories = [
    { name: "Burger", count: 6 },
    { name: "Chicken", count: 1 },
    { name: "Drinks", count: 1 },
    { name: "Fries", count: 1 },
    { name: "Pizza", count: 1 },
    { name: "Sandwich", count: 1 },
  ];

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
    <div className="min-h-screen py-36">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <BlogDetail blog={currentBlog} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SearchWidget />
            <CategoriesWidget categories={categories} />
            <PromotionalWidget />
          </div>
        </div>
      </div>
    </div>
  );
};
