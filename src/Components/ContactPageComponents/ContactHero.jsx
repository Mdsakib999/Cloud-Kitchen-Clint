import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import Ramen from "/assets/Food/ramen.png";
import Chiken from "/assets/Food/Chicken-Fry.jpg";

export const ContactHero = () => {
  return (
    <div className="text-white font-inter px-6 py-16 md:px-12 lg:px-20 my-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <p className="text-primary uppercase tracking-widest text-sm mb-2">
            Meet. Celebrate. Gather
          </p>

          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 font-inknut">
            Join Us For A Culinary Adventure!
          </h2>

          <p className="text-secondary mb-10 max-w-lg">
            Tempus leo eu accumsan et diam urna tempor. Pulvinar vivamus
            fringilla lacus nec metus bibendum egestas. Iaculis massa nisi
            malesuada lacinia integer nunc posuere semper vel class aptent
            taciti sociosqu.
          </p>

          {/* Info Grid */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 mt-10 pt-10">
            {/* Divider with empty center (non-intersecting plus) */}
            <div className="hidden sm:block absolute inset-0 pointer-events-none z-0">
              {/* Vertical Line - top half */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[45%] w-px bg-secondary"></div>
              {/* Vertical Line - bottom half */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 h-[45%] w-px bg-secondary"></div>

              {/* Horizontal Line - left half */}
              <div className="absolute top-3/5 left-0 w-[45%] h-px bg-secondary"></div>
              {/* Horizontal Line - right half */}
              <div className="absolute top-3/5 right-0 w-[45%] h-px bg-secondary"></div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="bg-primary p-3 rounded-full">
                <FaMapMarkerAlt className="text-white text-lg" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1">Address</h4>
                <p className="text-secondary">
                  South Khulshi, Chittagong, Bangladesh
                </p>
              </div>
            </div>

            {/* Contact Number */}
            <div className="flex items-start gap-4">
              <div className="bg-primary p-3 rounded-full">
                <FaPhoneAlt className="text-white text-lg" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1">Contact Number</h4>
                <p className="text-secondary">+880 123456789</p>
                <p className="text-secondary">+880 123456124</p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex items-start gap-4">
              <div className="bg-primary p-3 rounded-full">
                <FaClock className="text-white text-lg" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1">Opening Hour</h4>
                <p className="text-secondary">Mon-Fri: 10:00 AM - 9:30 PM</p>
                <p className="text-secondary">Sat-Sun: 10:00 AM - 11:00 PM</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="bg-primary p-3 rounded-full">
                <FaEnvelope className="text-white text-lg" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1">Email</h4>
                <p className="text-secondary">cloudkitchen@gmail.com</p>
                <p className="text-secondary">contact@portal.com</p>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="mt-16 flex flex-col md:flex-row items-center gap-4">
            <p className=" text-white text-xl font-inknut">We Are Social :</p>
            <div className="flex gap-4 text-xl items-center">
              <div className=" border-primary rounded-full p-2 border-2">
                <a href="#" className="text-primary">
                  <FaFacebookF />
                </a>
              </div>
              <div className=" border-primary rounded-full p-2 border-2">
                <a href="#" className="text-primary">
                  <FaTwitter />
                </a>
              </div>
              <div className=" border-primary rounded-full p-2 border-2">
                <a href="#" className="text-primary">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image Stack */}
        <div className="relative w-fit mx-auto">
          {/* Main Ramen Image */}
          <div className="w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[28rem] rounded-xl overflow-hidden shadow-lg">
            <img
              src={Ramen}
              alt="Noodles Dish"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlapping Chicken Image */}
          <div className="absolute bottom-[-6rem] right-[-4rem] md:bottom-[-8rem] md:right-[-6rem] lg:bottom-[-10rem] lg:right-[-7rem] w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 rounded-xl overflow-hidden shadow-md">
            <img
              src={Chiken}
              alt="Fried Chicken"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="hidden lg:block absolute top-1/2 right-[-20rem] transform -translate-y-1/2 -translate-x-1/2 rotate-[-90deg] whitespace-nowrap">
            <h1 className="text-5xl font-semibold text-white font-inknut">
              Contact Us
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
