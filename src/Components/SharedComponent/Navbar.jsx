import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY < 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 mt-14 w-full z-50 transition-colors duration-300 px-6 py-4 ${
        isTransparent
          ? "bg-transparent text-white"
          : "bg-bg-primary text-white shadow-lg"
      }`}
    >
      <div className="flex items-center w-full">
        <div className="text-4xl font-bold">
          <Link to="/">Foodie</Link>
        </div>

        <ul className="flex-1 flex justify-center space-x-6 text-xl">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:underline">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:underline">
              Order Now
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

        <div className="flex space-x-4  items-center gap-3">
          <IoCartOutline className="text-2xl" />
          <Link to="/" className="hover:underline">
            Log in
          </Link>
          <Link
            to="/"
            className="px-4 py-2 bg-primary text-bg-secondary rounded-full hover:bg-accent/80 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
