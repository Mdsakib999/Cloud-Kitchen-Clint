export const Loader = ({ comp_Name }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-950">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="animate-spin h-12 w-12 text-emerald-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
        <span className="text-emerald-300 text-lg font-semibold font-serif">
          Loading {comp_Name}...
        </span>
      </div>
    </div>
  );
};
