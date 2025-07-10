import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  IoCartOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import CartSlider from "./CartSlider";
import { useSelector } from "react-redux";
import { useAuth } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import GlobalSearch from "../HomeComponents/GlobalSearch";
import { Mail } from "lucide-react";

const Navbar = ({ offsetTop = 56 }) => {
  const cartItems = useSelector((state) => state.cart);
  const totalQty = cartItems.ids.length;
  const location = useLocation();

  const [isTransparent, setIsTransparent] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, logout } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(false);
  const photoUrl = user?.profilePicture || localStorage.getItem("photo");
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isDashboard = location.pathname.includes("dashboard");

  useEffect(() => {
    const handleScroll = () => setIsTransparent(window.scrollY < 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowUserDropdown(false);
  }, [location.pathname]);

  // Handle click outside for both dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close user dropdown if clicked outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }

      // Close mobile menu if clicked outside
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setShowCart(false);
    setShowUserDropdown(false);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const openCart = () => {
    setShowCart(true);
    closeMobileMenu();
    setShowUserDropdown(false);
  };

  const closeCart = () => setShowCart(false);

  const toggleUserDropdown = () => {
    setShowUserDropdown((prev) => !prev);
    setIsMobileMenuOpen(false);
  };

  const closeUserDropdown = () => setShowUserDropdown(false);

  const handleLogout = async () => {
    await logout();
    toast.success(
      <h1 className="text-center font-serif">Logged out successfully</h1>
    );
    setShowUserDropdown(false);
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/priceList", label: "Price List" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/blogs", label: "Blogs" },
  ];

  return (
    <>
      <nav
        className={`w-full mx-auto fixed z-50 transition-colors duration-300 px-4 md:px-6 py-4 font-inter ${
          isDashboard
            ? "bg-bg-primary text-white shadow-lg"
            : isTransparent
            ? "bg-transparent text-white"
            : "bg-bg-primary text-white shadow-lg"
        }`}
        style={{ top: offsetTop }}
        ref={mobileMenuRef}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="text-2xl md:text-4xl font-bold">
            <Link to="/" onClick={closeMobileMenu}>
              BiteBytes
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex flex-1 justify-center space-x-6 text-lg xl:text-xl">
            {menuItems.map(({ to, label }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `group relative inline-block transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-white"
                    }`
                  }
                >
                  {label}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full"></span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <GlobalSearch />
            <button onClick={openCart} className="relative cursor-pointer">
              <IoCartOutline
                size={28}
                className="hover:text-primary transition-colors"
              />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </button>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center hover:text-primary transition-colors cursor-pointer"
                >
                  <IoPersonCircleOutline className="text-3xl" />
                </button>

                {/* Desktop User Dropdown */}
                {showUserDropdown && (
                  <div className="w-full md:w-72 absolute right-0 mt-2 bg-bg-primary border border-white/20 rounded-lg shadow-lg overflow-hidden font-serif">
                    <div className="flex justify-between items-center p-3 border-b border-white/20">
                      <span className="text-sm font-medium">Profile</span>
                      <button
                        onClick={closeUserDropdown}
                        className="text-xl hover:text-primary transition-colors cursor-pointer"
                      >
                        <IoCloseOutline />
                      </button>
                    </div>
                    <div className="px-5 pt-5 pb-8">
                      <div className="flex flex-col items-center gap-2">
                        {user && (
                          <>
                            {photoUrl || imageLoaded ? (
                              <img
                                src={photoUrl}
                                alt="profile"
                                loading="lazy"
                                onLoad={() => setImageLoaded(true)}
                                onError={() => setImageLoaded(false)}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                            ) : (
                              <IoPersonCircleOutline
                                size={40}
                                className="text-primary"
                              />
                            )}
                            <p className="font-medium text-white text-lg">
                              {user.name}
                            </p>
                          </>
                        )}
                      </div>
                      <div className="flex items-center justify-center gap-2 ml-1 mb-5">
                        <p className="font-medium text-white font-inter">
                          {user.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleLogout}
                          className="flex-1 px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors cursor-pointer text-center text-sm"
                        >
                          Logout
                        </button>
                        <Link
                          to={
                            user?.role === "admin"
                              ? "/admin/dashboard"
                              : "/dashboard"
                          }
                          className="flex-1 px-5 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors cursor-pointer text-center text-sm"
                        >
                          Dashboard
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="w-32 bg-primary text-white lg:text-lg hover:bg-white hover:text-bg-primary rounded-full transition cursor-pointer px-2 py-1 md:px-4 md:py-2 font-serif text-center"
              >
                Log in
              </Link>
            )}
          </div>

          {/* Mobile/Tablet Right Side */}
          <div className="flex lg:hidden items-center gap-3">
            <GlobalSearch />
            <button onClick={openCart} className="relative cursor-pointer">
              <IoCartOutline
                size={28}
                className="hover:text-primary transition-colors"
              />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="text-2xl focus:outline-none cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-bg-primary/95 backdrop-blur-sm shadow-lg z-70">
            <div className="px-4 py-6 space-y-4">
              <ul className="space-y-4 text-lg">
                {menuItems.map(({ to, label }) => (
                  <li key={label}>
                    <NavLink
                      to={to}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `group relative inline-block px-2 py-1 transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-white"
                        }`
                      }
                    >
                      {label}
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-white/20 space-y-3">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {photoUrl || imageLoaded ? (
                        <img
                          src={photoUrl}
                          alt="profile"
                          loading="lazy"
                          onError={() => setImageLoaded(false)}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <IoPersonCircleOutline
                          size={40}
                          className="text-primary"
                        />
                      )}
                      <p className="font-medium text-white text-lg">
                        {user.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 ml-1 mb-5">
                      <Mail size={32} className="text-primary" />
                      <p className="font-medium text-white text-lg font-inter">
                        {user.email}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={
                          user?.role === "admin"
                            ? "/admin/dashboard"
                            : "/dashboard"
                        }
                        className="flex-1 px-5 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors cursor-pointer text-center text-sm"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex-1 px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors cursor-pointer text-center text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link
                      to="/signin"
                      className="px-4 py-2 bg-primary text-bg-secondary rounded-full hover:bg-accent/80 transition text-center cursor-pointer"
                    >
                      Log in
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop */}
      {showCart && (
        <div className="fixed inset-0 bg-black/20 z-50" onClick={closeCart} />
      )}

      {/* Slider */}
      <CartSlider isOpen={showCart} onClose={closeCart} />
    </>
  );
};

export default Navbar;
