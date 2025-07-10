import React, { useState, useEffect } from "react";
import {
  ChefHat,
  ShoppingCart,
  Code,
  Database,
  Globe,
  ArrowRight,
  Star,
  Eye,
  Users,
  Award,
  Zap,
} from "lucide-react";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const projects = [
    {
      id: 1,
      name: "Bitebytes",
      category: "Cloud Kitchen Ecosystem",
      description:
        "Revolutionary cloud kitchen platform that transforms how food businesses operate in the digital age.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "AI/ML"],
      icon: ChefHat,
      status: "Live",
      metrics: { users: "10K+", orders: "50K+", rating: "4.9" },
      features: [
        "Smart Order Management",
        "Predictive Analytics",
        "Real-time Tracking",
        "AI-Powered Insights",
      ],
      gradient: "from-orange-400 via-red-500 to-pink-500",
      accentColor: "rgb(251, 146, 60)",
    },
    {
      id: 2,
      name: "EcoMart",
      category: "Sustainable Commerce",
      description:
        "Next-generation e-commerce platform connecting conscious consumers with sustainable brands.",
      technologies: ["Next.js", "PostgreSQL", "Stripe", "AWS", "GraphQL"],
      icon: ShoppingCart,
      status: "Live",
      metrics: { users: "25K+", brands: "500+", rating: "4.8" },
      features: [
        "Carbon Footprint Tracking",
        "Sustainable Scoring",
        "Green Logistics",
        "Impact Analytics",
      ],
      gradient: "from-emerald-400 via-teal-500 to-cyan-500",
      accentColor: "rgb(52, 211, 153)",
    },
    {
      id: 3,
      name: "TaskFlow Pro",
      category: "Intelligent Workflow",
      description:
        "AI-powered project management that adapts to your team's unique working patterns.",
      technologies: ["Vue.js", "Firebase", "TypeScript", "TensorFlow", "WebGL"],
      icon: Code,
      status: "In Development",
      metrics: { teams: "200+", projects: "1K+", rating: "4.7" },
      features: [
        "AI Task Prioritization",
        "Smart Resource Allocation",
        "Predictive Timelines",
        "Team Optimization",
      ],
      gradient: "from-blue-400 via-purple-500 to-indigo-500",
      accentColor: "rgb(99, 102, 241)",
    },
    {
      id: 4,
      name: "DataSync Hub",
      category: "Neural Data Platform",
      description:
        "Enterprise-grade data synchronization with neural network-powered analytics and insights.",
      technologies: ["Python", "Django", "Redis", "Docker", "TensorFlow"],
      icon: Database,
      status: "Live",
      metrics: { data: "10TB+", clients: "50+", rating: "4.9" },
      features: [
        "Real-time Neural Sync",
        "Quantum Analytics",
        "Adaptive Learning",
        "Predictive Modeling",
      ],
      gradient: "from-violet-400 via-purple-500 to-fuchsia-500",
      accentColor: "rgb(139, 92, 246)",
    },
  ];

  const ProjectCard = ({ project, index, isActive }) => {
    const IconComponent = project.icon;
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={`relative transition-all duration-700 ease-out transform ${
          isActive
            ? "scale-105 z-20"
            : "scale-95 opacity-70 hover:opacity-90 hover:scale-100"
        }`}
        onMouseEnter={() => {
          setIsHovered(true);
          setActiveProject(index);
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-gradient-to-r ${project.gradient} rounded-full opacity-20 animate-pulse`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Main card */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 overflow-hidden shadow-2xl">
          {/* Gradient header */}
          <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div
                  className={`p-4 rounded-xl bg-gradient-to-r ${project.gradient} text-white mr-4 shadow-lg`}
                >
                  <IconComponent className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {project.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    project.status === "Live" ? "bg-green-400" : "bg-yellow-400"
                  } animate-pulse`}
                />
                <span className="text-sm font-medium text-gray-700">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              {project.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {Object.entries(project.metrics).map(([key, value], idx) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {value}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    {key}
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mb-8">
              <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                Core Features
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center text-sm text-gray-700"
                  >
                    <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-all duration-300 border border-gray-200 hover:border-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              className={`w-full bg-gradient-to-r ${project.gradient} text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center group shadow-lg hover:shadow-xl`}
            >
              Explore Project
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
            transition: "all 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"
          style={{
            right: mousePosition.x / 15,
            bottom: mousePosition.y / 15,
            transition: "all 0.5s ease-out",
          }}
        />
      </div>

      <div className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-20 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center justify-center mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl mr-6">
                <Globe className="w-12 h-12 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold text-white">
                  SM IT SOLUTIONS
                </h1>
                <p className="text-xl text-gray-400 mt-2">
                  Crafting Tomorrow's Digital Experiences
                </p>
              </div>
            </div>

            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              We don't just build applications—we engineer digital ecosystems
              that transform industries and create lasting impact through
              innovative technology solutions.
            </p>

            <div className="flex items-center justify-center space-x-12 text-white">
              <div className="flex items-center">
                <Award className="w-6 h-6 text-yellow-500 mr-3" />
                <div className="text-left">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-gray-300">
                    Projects Delivered
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="w-6 h-6 text-blue-500 mr-3" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">100K+</div>
                  <div className="text-sm text-gray-300">Users Impacted</div>
                </div>
              </div>
              <div className="flex items-center">
                <Eye className="w-6 h-6 text-purple-500 mr-3" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-sm text-gray-300">Uptime Achieved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                // isActive={activeProject === index}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div
            className={`text-center transform transition-all duration-1000 delay-500 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-gray-200/50">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Ready to Build Something Extraordinary?
              </h3>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Let's collaborate to transform your vision into a digital
                reality that exceeds expectations.
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
