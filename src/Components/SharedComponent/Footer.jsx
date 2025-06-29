import React from "react";

import { FiFacebook, FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-bg-footer text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              FOODIE
            </h2>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Serving fresh, flavorful meals straight from our cloud kitchen to
              your doorstep. Quality, taste, and convenience – every single
              time.
            </p>
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">South Khulshi,</p>
              <p className="text-sm text-gray-300">Namdabad properties ltd.</p>
            </div>
            <div className="text-sm">
              <p className="font-semibold">+880 1885 877 771</p>
              <p className="text-gray-300">support@bytebites.com.bd</p>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sitemap
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Gift Cards
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Room Reservations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Hotel Policies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Track Your Order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Let's Keep In Touch */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Let's Keep In Touch</h3>
            <div className="mb-6">
              <p className="text-sm text-gray-300 mb-3">
                Get Recommendations, Tips, Updates and more
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="px-3 py-2 text-sm bg-white text-gray-900 rounded sm:rounded-l sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button className="px-4 py-2 bg-primary text-white rounded sm:rounded-r sm:rounded-l-none hover:bg-orange-400 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-emerald-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <span className="text-sm font-semibold">Social Media:</span>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <FiFacebook size={16} className="text-bg-primary" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <FiInstagram size={16} className="text-bg-primary" />
                </a>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              All Right Reserved © 2025 Byte Bites
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
