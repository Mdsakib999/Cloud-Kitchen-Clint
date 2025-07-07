import { Link } from "react-router-dom";

const InfoBar = ({ isTransparent }) => {
  return (
    <div
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 font-inknut ${
        isTransparent
          ? "bg-transparent text-white"
          : "bg-bg-primary text-white shadow-lg"
      }`}
    >
      <div className="mx-auto flex justify-between items-center px-6 py-4 h-14 border-b border-b-gray-400">
        <div className="text-sm md:text-base">
          <span>
            📞 <span className="hidden md:inline-block">Need help? </span> Call
            Us:{" "}
          </span>
          <Link to="tel:1234567890" className="underline font-inter">
            123-456-7890
          </Link>
        </div>
        <div className="flex space-x-4 text-sm md:text-base">
          <Link to="/faq" className="hover:underline">
            FAQ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
