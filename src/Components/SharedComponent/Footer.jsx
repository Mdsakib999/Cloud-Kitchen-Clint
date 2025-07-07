import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-bg-footer text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Brand & About */}
        <div className="col-span-1">
          <h2 className="text-2xl md:text-4xl font-bold pb-3 font-inknut">
            BiteBytes
          </h2>
          <p className="text-sm leading-relaxed mb-4 font-inter">
            Fresh flavors delivered fast. Experience gourmet meals from our
            cloud kitchen to your home.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 font-inknut">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm font-inter">
            {[
              { to: "/", label: "Home" },
              { to: "/menu", label: "Menu" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/blogs", label: "Blogs" },
            ].map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `group relative inline-block transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-white"
                    }`
                  }
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full"></span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 font-inknut">
            Legal
          </h3>
          <ul className="space-y-2 text-sm font-inter">
            {[
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms of Service" },
              { to: "/refund", label: "Refund Policy" },
              { to: "/faq", label: "FAQ" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="hover:text-white group relative inline-block transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4 font-inknut">
            Contact Us
          </h3>
          <p className="text-sm mb-2 font-inter">
            South Khulshi, Namdabad Properties Ltd.
          </p>
          <p className="text-sm mb-2">+880 1885 877 771</p>
          <p className="text-sm mb-4">support@bytebites.com.bd</p>
          <div className="flex space-x-3 py-2">
            {[
              { Icon: FaFacebookF, to: "#" },
              { Icon: FaInstagram, to: "#" },
              { Icon: FaTwitter, to: "#" },
            ].map(({ Icon, to }, idx) => (
              <Link
                key={idx}
                to={to}
                className="border-primary rounded-full p-2 border-2 transition flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-primary active:scale-95 hover:bg-primary hover:text-white"
                style={{ minWidth: "40px", minHeight: "40px" }}
                tabIndex={0}
              >
                <Icon className="w-5 h-5 text-primary transition group-hover:text-white" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-500 pt-6 text-center text-white font-inter">
        © 2025 Byte Bites. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
