import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// import { foodItems } from "../../FakeDB/FoodItem";
import { FiSearch } from "react-icons/fi";
import { useGetAllProductsQuery } from "../../redux/apiSlice";

const GlobalSearch = () => {
  const { data: foodItems = [] } = useGetAllProductsQuery();
  console.log(foodItems);
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
    console.log(filtered);
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 opacity-100 pointer-events-auto w-full"
          onClick={() => {
            setIsFocused(false);
            setSuggestions([]);
            setSearchText("");
          }}
        />
      )}

      <div
        className={`${
          isFocused
            ? "fixed top-[22%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[85vw] max-w-md lg:max-w-lg scale-100 opacity-100"
            : "relative w-full scale-95 opacity-80"
        } font-serif transition-all duration-300 ease-in-out`}
      >
        <div className="relative flex items-center justify-end w-fit md:w-full">
          <FiSearch className="absolute left-16 md:left-4 text-primary text-xl pointer-events-none" />

          {/* Search input: hidden on mobile, shown on md+ */}
          <input
            type="search"
            placeholder="Search your favorite food..."
            className={`
     w-3/4 md:w-full pr-5 pl-10 py-2.5 md:py-3 rounded-2xl
      bg-white/20 border border-primary/30 text-white placeholder:text-gray-300
      shadow-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/60
      focus:bg-white/20 transition-all duration-200
      ${isFocused ? "ring-2 ring-primary/60 scale-105" : ""}
    `}
            value={searchText}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
          />
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
