import { blogPosts } from "../../FakeDB/mockBlogData";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { FaCalendar } from "react-icons/fa";

export const HomeBlog = () => {
  return (
    <div className="my-20 max-w-7xl mx-auto">
      <div className="relative z-10 text-center mb-5 px-6">
        <div className="inline-block">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-4 tracking-tight">
            FEATURED BLOGS
          </h1>
          <div className="h-1 bg-gradient-to-r from-primary to-tertiary rounded-full mx-auto"></div>
        </div>
        <p className="text-secondary mt-4 text-lg">
          Stay updated with the latest stories
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {blogPosts.slice(0, 3).map((post) => (
          <div
            key={post.id}
            className=" bg-bg-secondary rounded-md dark:text-white text-black"
          >
            <figure className="w-full h-80">
              <img
                src={post.image || "/fallback.jpg"}
                alt={post.title}
                className="w-full h-full rounded-lg object-cover transition-all duration-300 hover:transform hover:scale-105"
              />
            </figure>
            <Link to={`/blog-details/${post.id}`}>
              <article className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="flex gap-2 items-center">
                    <FaCalendar /> {post.date}
                  </p>
                  <p className="text-sm bg-amber-400/50 px-2 py-1 rounded-full">
                    {post.category}
                  </p>
                </div>
                <h1 className="text-lg font-semibold capitalize h-15">
                  {post.title}
                </h1>
                <p className="text-sm">{post.content.slice(0, 100)}</p>
                <div className="text-sm hover:text-primary hover:transform hover:scale-105 font-normal flex items-center">
                  Read More
                  <span>
                    <ChevronRight />
                  </span>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
