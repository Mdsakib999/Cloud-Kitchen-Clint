export const UIStates = ({
  isLoading,
  isError,
  error,
  isEmpty,
  loadingComponent,
  errorMessage,
  emptyMessage,
  className = "max-w-4xl mx-auto p-6",
}) => {
  if (isLoading) {
    return (
      loadingComponent || (
        <div className={`${className} animate-pulse space-y-6`}>
          <div className="h-64 bg-gray-700 rounded-md mb-4"></div>
          <div className="h-8 bg-gray-700 rounded w-3/4"></div>
          <div className="h-6 bg-gray-600 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          </div>
          <div className="flex space-x-4 mt-6">
            <div className="h-10 w-20 bg-gray-700 rounded"></div>
            <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
            <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      )
    );
  }

  if (isError) {
    return (
      <div
        className={`${className} text-center bg-red-900 rounded-lg shadow-lg`}
      >
        <p className="text-red-400 text-lg font-semibold mb-2">
          Oops! Something went wrong.
        </p>
        <p className="text-red-300">
          {errorMessage ||
            error?.data?.message ||
            error?.message ||
            "Unable to load data."}
        </p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div
        className={`${className} text-center bg-gray-900 rounded-lg shadow-lg`}
      >
        <p className="text-white text-lg font-semibold">
          {emptyMessage || "No data found."}
        </p>
        <p className="text-gray-400">
          The requested resource does not exist or has been removed.
        </p>
      </div>
    );
  }

  return null; // no state to show, render nothing
};
