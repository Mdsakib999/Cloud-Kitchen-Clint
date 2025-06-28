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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogPosts.slice(0, 4).map((post) => (
          <div
            key={post.id}
            className="bg-bg-secondary rounded-md text-white flex flex-col h-[500px]"
          >
            <figure className="h-64 w-full p-3">
              <img
                src={post.image || "/fallback.jpg"}
                alt={post.title}
                className="w-full h-full object-cover rounded-t-md"
              />
            </figure>

            <Link
              to={`/blog-details/${post.id}`}
              className="flex-1 flex flex-col"
            >
              <article className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="flex gap-2 items-center text-sm">
                      <FaCalendar /> {post.date}
                    </p>
                    <p className="text-sm bg-amber-400/50 px-2 py-1 rounded-full">
                      {post.category}
                    </p>
                  </div>
                  <h1 className="text-lg font-semibold capitalize line-clamp-2">
                    {post.title}
                  </h1>
                  <p className="text-sm mt-2 line-clamp-3">
                    {post.content.slice(0, 75)}
                  </p>
                </div>

                <div className="text-sm hover:text-primary font-normal flex items-center mt-4">
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
