import { Link } from "react-router-dom";
import { useGetAllBlogsQuery } from "../../redux/apiSlice";

export const AllBlogs = () => {
  const { data: blogs = [], isLoading, isError, error } = useGetAllBlogsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-40">
        <span className="text-xl font-medium">Loading blogs…</span>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center py-40">
        <span className="text-xl font-medium text-red-500">
          Error: {"message" in error ? error.message : "Failed to load"}
        </span>
      </div>
    );
  }
  const list = Array.isArray(blogs) ? blogs : [];
  return (
    <div className="relative w-full mx-auto overflow-hidden py-40 bg-bg-primary">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary via-bg-tertiary to-bg-secondary opacity-60"></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-16 px-6">
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

      {/* News Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-20">
        {list?.map((blog, index) => (
          <div key={blog._id} className="group relative">
            {/* Card background */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl "></div>

            <div
              className={`relative flex flex-col lg:flex-row items-center md:gap-12 p-4 md:p-8  lg:p-12 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-64 lg:h-80  object-contain transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Category badge */}
                  <div className="absolute top-3 md:top-4 left-0 md:left-4">
                    <span className="bg-primary px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg backdrop-blur-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Decorative blur bubbles */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-tertiary/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 md:space-y-6">
                <div className="flex items-center gap-2 text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    {blog.date}
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-white leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-tertiary group-hover:bg-clip-text transition-all duration-500 my-3">
                  {blog.title}
                </h2>
                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  {blog.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-bg-input px-4 py-2 rounded-full text-sm font-medium text-white shadow-lg border border-white/10 hover:scale-105 transition-transform duration-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <p className="text-secondary text-lg leading-relaxed my-3">
                  {blog.content}
                </p>

                {/* Read more button */}
                <div
                  className={`relative z-10 text-center flex md:${
                    index % 2 === 0 ? "justify-end" : "justify-start"
                  }`}
                >
                  <Link
                    to={`/blog-details/${blog.id}`}
                    className="group inline-flex items-center gap-3 bg-bg-input/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full hover:bg-bg-input/60 transition-all duration-500 shadow-2xl"
                  >
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
                      View More
                    </span>
                    <div className="flex items-center gap-1 group-hover:translate-x-2 transition-transform duration-300">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="w-2 h-2 bg-primary rounded-full opacity-75"></div>
                      <div className="w-2 h-2 bg-primary rounded-full opacity-50"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
