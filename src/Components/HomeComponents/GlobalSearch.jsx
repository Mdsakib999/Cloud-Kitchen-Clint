import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Utensils } from "lucide-react";
import { useGetAllProductsQuery } from "../../redux/apiSlice";

const GlobalSearch = () => {
  const { data: foodItems = [] } = useGetAllProductsQuery();
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsFocused(false);
    setSuggestions([]);
    setSearchText("");
  }, [location.pathname]);

  const handleChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

    if (text.length === 0) {
      setSuggestions([]);
      return;
    }

    const filtered = foodItems.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSelect = (id, food) => {
    navigate(`/food-details/${id}`, {
      state: { item: food },
    });
    setSearchText("");
    setSuggestions([]);
    setIsFocused(false);
  };

  return (
    <>
      {isFocused && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-500 ease-in-out opacity-100 pointer-events-auto"
          onClick={() => {
            setIsFocused(false);
            setSuggestions([]);
            setSearchText("");
          }}
        />
      )}

      <div
        className={`font-serif transition-all duration-500 ease-in-out w-full ${
          isFocused
            ? "fixed top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md lg:max-w-lg px-3 md:px-0"
            : "relative max-w-xs mx-auto"
        }`}
      >
        {isFocused && (
          <div className="flex items-center justify-center gap-2 mb-3 animate-fade-in">
            <Utensils className="text-primary w-6 h-6" />
            <span className="text-xl md:text-2xl font-semibold text-primary font-inknut">
              BiteBytes
            </span>
          </div>
        )}

        <div className="relative flex items-center justify-center w-full">
          <FiSearch className="absolute left-3 text-primary text-xl pointer-events-none z-10" />
          <input
            type="search"
            placeholder="Search Here..."
            className={`
    w-full pl-10 pr-5 py-3 rounded-2xl bg-white/20 border border-primary/30
    text-white placeholder:text-gray-300 shadow-lg backdrop-blur-md
    focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all duration-300
    text-base sm:text-sm [appearance:textfield]
    [&::-webkit-search-cancel-button]:appearance-none
    [&::-webkit-search-cancel-button]:h-4
    [&::-webkit-search-cancel-button]:w-4
    [&::-webkit-search-cancel-button]:bg-red-500
    [&::-webkit-search-cancel-button]:rounded-full
    [&::-webkit-search-cancel-button]:cursor-pointer
    [&::-webkit-search-cancel-button]:[mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E")]
    ${isFocused ? "ring-2 ring-primary/60" : ""}
    ${isFocused ? "block" : "hidden md:block"}
  `}
            value={searchText}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
          />
          {!isFocused && (
            <button
              className="cursor-pointer md:hidden p-2.5 rounded-full bg-white/20 border border-primary/30 text-primary"
              onClick={() => setIsFocused(true)}
            >
              <FiSearch className="w-5 h-5" />
            </button>
          )}
        </div>

        {isFocused && suggestions.length > 0 && (
          <ul className="scrollbar-hide absolute left-0 right-0 mt-3 w-full bg-white/90 backdrop-blur-lg border border-primary/20 rounded-2xl shadow-2xl z-50 overflow-y-auto max-h-[500px] transition-all duration-200 animate-fade-in">
            {suggestions.map((item) => {
              const idx = item.title
                .toLowerCase()
                .indexOf(searchText.toLowerCase());
              const before = item.title.slice(0, idx);
              const match = item.title.slice(idx, idx + searchText.length);
              const after = item.title.slice(idx + searchText.length);
              return (
                <li
                  key={item._id}
                  onMouseDown={() => handleSelect(item._id, item)}
                  className="flex items-center justify-between gap-3 px-4 py-2 md:px-5 md:py-3 hover:bg-primary/10 cursor-pointer transition-all duration-150 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.images[0].url}
                      alt={item.title}
                      className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-primary/30 shadow-sm group-hover:scale-105 transition-transform duration-150"
                    />
                    <span className="text-base text-gray-800 font-medium truncate">
                      {idx !== -1 ? (
                        <>
                          {before}
                          <span className="bg-primary/20 text-primary rounded px-1 font-semibold">
                            {match}
                          </span>
                          {after}
                        </>
                      ) : (
                        item.title
                      )}
                    </span>
                  </div>
                  <span className="text-primary font-semibold text-base whitespace-nowrap ml-2 md:ml-4">
                    <span className="font-sans">{item.sizes[0].price}</span>{" "}
                    <span className="hidden lg:inline">Taka</span>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default GlobalSearch;
