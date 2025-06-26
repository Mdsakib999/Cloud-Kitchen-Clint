import { useState } from "react";
import {
  Plus,
  Minus,
  Home,
  Utensils,
  Clock,
  MapPin,
  CreditCard,
  Phone,
  Truck,
  Shield,
  ChevronDown,
} from "lucide-react";
import Lottie from "lottie-react";
import foodAnimation from "../assets/food.json"; // path to your file
import { Link } from "react-router-dom";

const Faq = () => {
  // Initialize an array of booleans, one for each FAQ item, all set to false initially
  const [openStates, setOpenStates] = useState(
    new Array(10).fill(false) // Adjust size based on faqData length
  );

  const toggleItem = (index) => {
    setOpenStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  const faqData = [
    {
      icon: <Utensils className="w-5 h-5 text-emerald-600" />,
      question: "What is ByteBites and how does it work?",
      answer:
        "ByteBites is a cloud kitchen that specializes in delivering freshly prepared meals directly to your doorstep. We operate from our professional kitchen facility and partner with delivery services to bring restaurant-quality food to you without the traditional dine-in experience.",
    },
    {
      icon: <Clock className="w-5 h-5 text-emerald-600" />,
      question: "What are your operating hours?",
      answer:
        "We're open 7 days a week from 10:00 AM to 11:00 PM. Orders placed after 10:30 PM will be processed the next day. We recommend placing orders at least 45 minutes before closing time to ensure timely delivery.",
    },
    {
      icon: <MapPin className="w-5 h-5 text-emerald-600" />,
      question: "Which areas do you deliver to?",
      answer:
        "Currently, we deliver within a 15km radius of our kitchen location. You can check if we deliver to your area by entering your address during checkout. We're constantly expanding our delivery zones based on demand.",
    },
    {
      icon: <Truck className="w-5 h-5 text-emerald-600" />,
      question: "How long does delivery take?",
      answer:
        "Standard delivery takes 30-45 minutes depending on your location and order complexity. During peak hours (12-2 PM and 7-9 PM), delivery may take up to 60 minutes. You'll receive real-time tracking updates once your order is dispatched.",
    },
    {
      icon: <CreditCard className="w-5 h-5 text-emerald-600" />,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, digital wallets (PayPal, Apple Pay, Google Pay), bank transfers, and cash on delivery. All online transactions are processed securely through our encrypted payment gateway.",
    },
    {
      icon: <Shield className="w-5 h-5 text-emerald-600" />,
      question: "How do you ensure food safety and quality?",
      answer:
        "Food safety is our top priority. Our kitchen follows strict HACCP guidelines, all staff are trained in food safety protocols, and we maintain temperature-controlled storage and delivery. Each meal is prepared fresh and packaged in food-grade, eco-friendly containers.",
    },
  ];

  return (
    <div className="font-serif min-h-screen relative w-full mx-auto overflow-hidden py-40 bg-emerald-950 text-emerald-950">
      <div className="relative">
        <div className="absolute inset-0 bg-emerald-50"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Home className="w-4 h-4" />
            <Link to="/">
              <span className="text-sm cursor-pointer hover:text-emerald-600">
                Home
              </span>
            </Link>
            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            <span className="text-sm font-medium">FAQ</span>
          </div>

          <div className="flex items-center justify-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-center max-w-2xl">
                Find answers to common questions about ByteBites cloud kitchen
                services
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">
              Everything you need to know about ByteBites
            </h2>
            <p className="text-lg text-emerald-300">
              Can't find the answer you're looking for? Contact our customer
              support team.
            </p>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2 h-full mb-8 md:mb-0 flex items-center justify-center">
              <Lottie animationData={foodAnimation} loop={true} />;
            </div>
            <div className="w-full md:w-1/2 mb-8 md:mb-0 flex items-center justify-center">
              <div className="w-full max-w-2xl space-y-4">
                {faqData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-emerald-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className={`cursor-pointer w-full px-6 py-5 text-left flex items-center justify-between ${
                        openStates[index]
                          ? "bg-emerald-100"
                          : "bg-emerald-50 hover:bg-emerald-100"
                      } transition-colors duration-200`}
                    >
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <span className="font-semibold text-emerald-900">
                          {item.question}
                        </span>
                      </div>
                      {openStates[index] ? (
                        <Minus className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {openStates[index] && (
                      <div className="px-6 pb-5">
                        <div className="pl-8 pr-8">
                          <p className="text-gray-700 leading-relaxed pt-4">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 bg-emerald-50 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <Phone className="w-12 h-12 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to help you with any additional
              questions.
            </p>
            <Link to="/contact">
              <button className="cursor-pointer bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200">
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
