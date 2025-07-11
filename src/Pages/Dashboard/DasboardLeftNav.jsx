import {
  FaUser,
  FaUsers,
  FaTimes,
  FaHistory,
  FaUtensils,
  FaClipboardList,
  FaPlusCircle,
  FaFolderPlus,
} from "react-icons/fa";
import { BadgeDollarSign } from "lucide-react";
import { IoTicketSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { Link, matchPath, useLocation } from "react-router-dom";
import { SiGoogletagmanager } from "react-icons/si";
import { LuNotebookPen } from "react-icons/lu";

export const DashBoardLeftNav = ({ closeSidebar, isAdmin }) => {
  const { pathname } = useLocation();

  const adminRoutes = [
    {
      label: "Profile",
      icon: <FaUser size={20} />,
      path: "/admin/dashboard/profile",
    },
    {
      label: "Statistics",
      icon: <MdDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      label: "Customers",
      icon: <FaUsers size={20} />,
      path: "/admin/dashboard/customers",
    },
    {
      label: "Order History",
      icon: <FaClipboardList size={20} />,
      path: "/admin/dashboard/orders",
    },
    {
      label: "Add Food",
      icon: <FaPlusCircle size={20} />,
      path: "/admin/dashboard/add-food",
    },
    {
      label: "Manage Food",
      icon: <FaUtensils size={20} />,
      path: "/admin/dashboard/manage-food",
    },
    {
      label: "Add Category",
      icon: <FaFolderPlus size={20} />,
      path: "/admin/dashboard/add-category",
    },
    {
      label: "Add Offer",
      icon: <BadgeDollarSign size={20} />,
      path: "/admin/dashboard/add-offer",
    },
    {
      label: "Add Coupon",
      icon: <IoTicketSharp size={20} />,
      path: "/admin/dashboard/add-coupon",
    },
    {
      label: "Manage Coupon",
      icon: <SiGoogletagmanager size={20} />,
      path: "/admin/dashboard/manage-coupon",
    },
    {
      label: "Create-Blogs",
      icon: <LuNotebookPen />,
      path: "/admin/dashboard/create-blogs",
    },
    {
      label: "Manage-Blogs",
      icon: <LuNotebookPen />,
      path: "/admin/dashboard/manage-blogs",
    },
  ];

  const customerRoutes = [
    { label: "Profile", icon: <FaUser size={20} />, path: "/dashboard" },
    {
      label: "Order History",
      icon: <FaHistory size={20} />,
      path: "/dashboard/order",
    },
  ];

  const routesToRender = isAdmin ? adminRoutes : customerRoutes;

  return (
    <aside
      className={`
    flex flex-col font-serif
    ${isAdmin ? "bg-white border-r border-gray-200" : "bg-bg-secondary"}
    lg:fixed min-h-screen md:min-h-0 top-16 lg:w-72
    h-[calc(100vh-4rem)]
  `}
    >
      {/* Header Section - Fixed */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 pt-6 pb-2 relative">
        {/* Close button for mobile */}
        <button
          onClick={closeSidebar}
          className={`
            absolute top-4 right-4 lg:hidden z-10
            ${
              isAdmin
                ? "text-black hover:text-red-500"
                : "text-white hover:text-red-300"
            }
            transition-colors duration-200
          `}
        >
          <FaTimes size={22} />
        </button>

        <h2
          className={`
            text-xl font-bold text-center mt-2 lg:mt-0
            ${isAdmin ? "text-black" : "text-white"}
          `}
        >
          {isAdmin ? "Admin" : "User"} Dashboard
        </h2>
      </div>

      {/* Navigation Menu - Scrollable */}
      <nav className="flex-1 min-h-0 overflow-y-auto p-4 custom-scrollbar">
        <div className="flex flex-col gap-2">
          {routesToRender.map(({ label, icon, path }) => {
            const isExactMatch = pathname === path;

            const isNestedMatch = matchPath({ path, end: false }, pathname);

            // Avoid matching "" for all routes
            const isActive =
              path === "/admin/dashboard" ? isExactMatch : isNestedMatch;

            return (
              <Link
                to={path}
                onClick={closeSidebar}
                key={label}
                className="block"
              >
                <button
                  className={`cursor-pointer flex items-center gap-3 px-3 py-2 w-full font-medium ${
                    isActive
                      ? "text-primary text-xl font-bold"
                      : isAdmin
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};
