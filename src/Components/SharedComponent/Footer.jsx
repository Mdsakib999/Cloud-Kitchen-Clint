import React from "react";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-bg-footer text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Brand & About */}
        <div className="col-span-1">
          <h2 className="text-2xl md:text-4xl font-bold pb-3">BiteBytes</h2>
          <p className="text-sm leading-relaxed mb-4">
            Fresh flavors delivered fast. Experience gourmet meals from our
            cloud kitchen to your home.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/menu", label: "Menu" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/blogs", label: "Blogs" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms of Service" },
              { to: "/refund", label: "Refund Policy" },
              { to: "/faq", label: "FAQ" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm mb-2">
            South Khulshi, Namdabad Properties Ltd.
          </p>
          <p className="text-sm mb-2">+880 1885 877 771</p>
          <p className="text-sm mb-4">support@bytebites.com.bd</p>
          <div className="flex space-x-3 py-2">
            {[
              { Icon: FiFacebook, to: "/facebook" },
              { Icon: FiInstagram, to: "/instagram" },
              { Icon: FiTwitter, to: "/twitter" },
              { Icon: FiYoutube, to: "/youtube" },
            ].map(({ Icon, to }, idx) => (
              <Link
                key={idx}
                to={to}
                className="p-2 bg-primary rounded-full hover:bg-primary-dark transition"
              >
                <Icon className="w-5 h-5 text-gray-900" />
              </Link>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-white mb-2">Subscribe</h3>
          <div className="flex rounded-lg overflow-hidden px-2 w-xs">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 text-gray-200  border border-gray-700 focus:outline-none"
            />
            <button className="bg-primary  px-4 py-2 font-semibold hover:bg-primary-dark">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-500 pt-6 text-center text-sm text-gray-500">
        © 2025 Byte Bites. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
