import { blogPosts } from "../../FakeDB/mockBlogData";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export const HomeBlog = () => {
  return (
    <div className="my-20">
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
            className="w-[90%] h-[480px] group mx-auto bg-bg-secondary dark:border-0 border overflow-hidden rounded-md dark:text-white text-black"
          >
            <figure className="w-full h-80 group-hover:h-72 transition-all duration-300 dark:bg-[#0a121a] bg-[#f0f5fa] p-2 rounded-md relative overflow-hidden">
              <div
                style={{
                  background:
                    "linear-gradient(123.9deg, #0B65ED 1.52%, rgba(0, 0, 0, 0) 68.91%)",
                }}
                className="absolute top-0 left-0 w-full h-full group-hover:opacity-100 opacity-0 transition-all duration-300 "
              ></div>
              <img
                src={post.image || "/fallback.jpg"}
                alt={post.title}
                className="absolute bottom-10 group-hover:-bottom-5 right-8 h-64 w-[80%] group-hover:border-4 border-4 group-hover:border-[#76aaf82d] rounded-lg object-cover transition-all duration-300"
              />
            </figure>
            <Link to={`/blog-details/${post.id}`}>
              <article className="p-4 space-y-2">
                <div className="flex justify-between">
                  <div className="h-8 w-20 bg-bg-primary rounded-md"></div>
                  <div className="h-8 w-20 bg-bg-primary rounded-md"></div>
                </div>

                <h1 className="text-lg font-semibold capitalize">
                  {post.title}
                </h1>
                <div className="text-base dark:text-white text-blue-600 font-normal group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 pt-2 flex gap-1 transition-all duration-300">
                  View More
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
