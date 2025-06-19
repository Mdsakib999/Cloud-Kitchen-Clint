import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoCartOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import CartSlider from "./CartSlider";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart);
  const totalQty = cartItems.ids.length;

  const [isTransparent, setIsTransparent] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsTransparent(window.scrollY < 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setShowCart(false);
  };
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const openCart = () => {
    setShowCart(true);
    closeMobileMenu();
  };
  const closeCart = () => setShowCart(false);

  return (
    <>
      <nav
        className={`fixed top-0 mt-14 w-full z-50 transition-colors duration-300 px-4 md:px-6 py-4 ${
          isTransparent
            ? "bg-transparent text-white"
            : "bg-bg-primary text-white shadow-lg"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="text-2xl md:text-4xl font-bold">
            <Link to="/" onClick={closeMobileMenu}>
              Foodie
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex flex-1 justify-center space-x-6 text-lg xl:text-xl">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:underline">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/order" className="hover:underline">
                Price List
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
          </ul>

          {/* Desktop Right Side */}
          <div className="hidden md:flex space-x-4 items-center gap-3">
            <button onClick={openCart} className="relative">
              <IoCartOutline className="text-2xl hover:text-primary transition-colors" />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </button>
            <Link to="/signin" className="hover:underline">
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-primary text-bg-secondary rounded-full hover:bg-accent/80 transition"
            >
              Register
            </Link>
          </div>

          {/* Mobile Right Side */}
          <div className="flex md:hidden items-center space-x-3">
            <button onClick={openCart} className="relative">
              <IoCartOutline className="text-2xl hover:text-primary transition-colors" />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="text-2xl focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-bg-primary/95 backdrop-blur-sm shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <ul className="space-y-4 text-lg">
                {[
                  { to: "/", label: "Home" },
                  { to: "/menu", label: "Menu" },
                  { to: "/order", label: "Price List" },
                  { to: "/about", label: "About" },
                ].map(({ to, label }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="block hover:text-primary transition-colors"
                      onClick={closeMobileMenu}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-white/20 space-y-3">
                <Link
                  to="/signin"
                  className="block text-center py-2 hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block text-center px-4 py-2 bg-primary text-bg-secondary rounded-full hover:bg-accent/80 transition"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
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
