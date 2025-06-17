import React, { useState, useEffect } from "react";
import { LuStar, LuQuote, LuArrowRight, LuArrowLeft } from "react-icons/lu";

const ClientTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Maria Elena",
      role: "photographer",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The food was fresh, flavorful, and delivered right on time. Feels like restaurant dining at home",
    },
    {
      id: 2,
      name: "Tanvir Hasan",
      role: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Tried the butter chicken - absolutely amazing. The spices were just perfect!",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Outstanding service and incredible flavors. Every dish tells a story of culinary excellence.",
    },
    {
      id: 4,
      name: "David Chen",
      role: "Food Blogger",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      text: "As a food critic, I'm impressed by the attention to detail and authentic taste profiles.",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <LuStar
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-amber-400 fill-amber-400" : "text-gray-500"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-secondary text-white relative overflow-hidden">
      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <LuQuote className="w-8 h-8 text-accent" />
            <span className="text-accent font-medium tracking-wider uppercase text-sm">
              Client Testimonials
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
            What Clients Are Saying
          </h1>
        </div>

        {/* Testimonials Container */}
        <div className="max-w-6xl mx-auto relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-primary hover:bg-teal-600/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-teal-500/30"
          >
            <LuArrowLeft className="w-6 h-6 text-teal-300" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-teal-600/30 hover:bg-teal-600/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-teal-500/30"
          >
            <LuArrowRight className="w-6 h-6 text-teal-300" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {testimonials
              .slice(currentTestimonial, currentTestimonial + 2)
              .concat(
                testimonials.slice(
                  0,
                  Math.max(0, currentTestimonial + 2 - testimonials.length)
                )
              )
              .map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${currentTestimonial}`}
                  className={`group relative transform transition-all duration-700 ${
                    index === 0 ? "scale-105 md:scale-100" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  <div className="bg-primary backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/20 relative overflow-hidden">
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-6 opacity-20">
                      <LuQuote className="w-16 h-16 text-teal-400" />
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-20 h-20 rounded-full object-cover border-3 border-teal-500/30 group-hover:border-teal-500/60 transition-all duration-300"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/20 to-amber-400/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-teal-300 transition-colors duration-300">
                          {testimonial.name}
                        </h3>
                        <p className="text-teal-300 font-medium capitalize text-sm tracking-wide">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-slate-300 text-lg leading-relaxed mb-6 relative z-10">
                      "{testimonial.text}"
                    </p>

                    {/* Rating */}
                    <div className="flex gap-1">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-accent w-8"
                    : "bg-slate-600 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentTestimonial + 1) / testimonials.length) * 100
                  }%`,
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-slate-400 mt-2">
              <span>
                {currentTestimonial + 1} of {testimonials.length}
              </span>
              <span>{isAutoPlaying ? "Auto-playing" : "Paused"}</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-teal-500 to-amber-500 hover:from-teal-600 hover:to-amber-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25">
            Share Your Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientTestimonials;
