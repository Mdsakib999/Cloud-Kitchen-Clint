import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoCartOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY < 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
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
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden md:flex space-x-4 items-center gap-3">
          <IoCartOutline className="text-2xl cursor-pointer hover:text-primary transition-colors" />
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

        {/* Mobile Right Side (Cart + Hamburger) */}
        <div className="flex md:hidden items-center space-x-3">
          <IoCartOutline className="text-2xl cursor-pointer hover:text-primary transition-colors" />
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
            {/* Mobile Navigation Links */}
            <ul className="space-y-4 text-lg">
              <li>
                <Link
                  to="/"
                  className="block hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="block hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/order"
                  className="block hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  Price List
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Mobile Auth Buttons */}
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
  );
};

export default Navbar;
