import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const InfoBar = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const location = useLocation();
  const isDashboard = location.pathname.includes("dashboard");

  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY < 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full fixed top-0 left-0 z-50 ${
        isDashboard
          ? "bg-bg-primary text-white shadow-lg"
          : isTransparent
          ? "bg-transparent text-white"
          : "bg-bg-primary text-white shadow-lg"
      }`}
    >
      <div className=" mx-auto flex justify-between items-center px-6 py-4 h-14 border-b border-b-gray-400">
        <div className="text-sm">
          <span>📞 Need help? Call us: </span>
          <Link to="tel:1234567890" className="underline">
            123-456-7890
          </Link>
        </div>

        <div className="flex space-x-4 text-sm">
          <Link to="/order-track" className="hover:underline">
            Track Order
          </Link>
          <Link to="/faq" className="hover:underline">
            FAQ
          </Link>
          {/* <Link to="/contact" className="hover:underline">
            Contact Us
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
