export const BlogCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl shadow-sm bg-bg-primary p-4 animate-pulse-red space-y-4"
        >
          {/* Image skeleton */}
          <div className="w-full h-48 bg-bg-tertiary rounded-xl" />

          {/* Title */}
          <div className="h-5 bg-bg-tertiary rounded w-3/4" />

          {/* Category */}
          <div className="h-4 bg-bg-tertiary rounded w-1/3" />

          {/* Content lines */}
          <div className="space-y-2">
            <div className="h-3 bg-bg-tertiary rounded w-full" />
            <div className="h-3 bg-bg-tertiary rounded w-5/6" />
            <div className="h-3 bg-bg-tertiary rounded w-2/3" />
          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-2">
            <div className="h-6 w-16 bg-bg-tertiary rounded-full" />
            <div className="h-6 w-12 bg-bg-tertiary rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
