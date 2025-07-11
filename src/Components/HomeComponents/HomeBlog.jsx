import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { FaCalendar } from "react-icons/fa";
import { useGetAllBlogsQuery } from "../../redux/apiSlice";
import DOMPurify from "dompurify";
import { formatDate } from "../../utils/formatDate";
import { UIStates } from "../SharedComponent/UIStates";
import { SectionHeader } from "../SharedComponent/SectionHeader";
import { Newspaper } from "lucide-react";
export const HomeBlog = () => {
  const { data: blogs = [], isLoading, isError, error } = useGetAllBlogsQuery();

  if (isLoading) return <UIStates isLoading />;
  if (isError) return <UIStates isError error={error} />;
  if (!blogs.length) return <UIStates isEmpty emptyMessage="No blogs found." />;

  return (
    <div className="my-20 max-w-7xl mx-auto">
      <SectionHeader
        icon={Newspaper}
        subtitle="Latest Insights"
        title="Featured Blogs"
        description="Stay updated with the latest stories"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-3">
        {blogs.slice(0, 4).map((post) => (
          <div
            key={post._id}
            className="bg-bg-secondary rounded-md text-white flex flex-col h-[480px]"
          >
            <figure className="h-64 w-full p-">
              <img
                src={post.image || "/fallback.jpg"}
                alt={post.title}
                className="w-full h-full object-cover rounded-t-md"
              />
            </figure>

            <Link
              to={`/blog-details/${post._id}`}
              className="flex-1 flex flex-col"
            >
              <article className="p-3 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2 text-white/70 text-sm">
                    <p className="flex gap-2 items-center">
                      <FaCalendar className="text-primary w-4 h-4" />{" "}
                      {formatDate(post.createdAt)}
                    </p>
                    <p className="bg-primary px-2 pb-1 rounded-full text-white">
                      {post.category}
                    </p>
                  </div>

                  <h1 className="text-lg font-semibold capitalize line-clamp-2">
                    {post.title}
                  </h1>

                  <p className="text-sm mt-2 line-clamp-3 text-secondary">
                    {DOMPurify.sanitize(post.content)
                      .replace(/<[^>]+>/g, "")
                      .slice(0, 100)}
                    ...
                  </p>
                </div>

                <div className="text-sm hover:text-primary font-normal flex ">
                  Read More
                  <ChevronRight className="ml-1" />
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
