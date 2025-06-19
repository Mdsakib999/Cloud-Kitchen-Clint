import {
  FaUser,
  FaUsers,
  FaTimes,
  FaHistory,
  FaUtensils,
  FaClipboardList,
  FaStar,
  FaPlusCircle,
  FaThList,
  FaFolderPlus,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export const DashBoardLeftNav = ({ closeSidebar }) => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  const adminRoutes = [
    {
      label: "Statistics",
      icon: <MdDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      label: "Customers",
      icon: <FaUsers size={20} />,
      path: "/admin/customers",
    },
    {
      label: "Order List",
      icon: <FaClipboardList size={20} />,
      path: "/admin/orders",
    },
    {
      label: "Customer Reviews",
      icon: <FaStar size={20} />,
      path: "/admin/reviews",
    },
    {
      label: "Add Food",
      icon: <FaPlusCircle size={20} />,
      path: "/admin/add-foodd",
    },
    {
      label: "Manage Food",
      icon: <FaUtensils size={20} />,
      path: "/admin/manage-food",
    },
    {
      label: "Add Category",
      icon: <FaFolderPlus size={20} />,
      path: "/admin/add-category",
    },
    {
      label: "Profile",
      icon: <FaUser size={20} />,
      path: "/admin/profile",
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

  const routesToRender = isAdmin === true ? adminRoutes : customerRoutes;

  return (
    <aside
      className={`h-full w-full p-4 relative md:w-64 lg:w-72 ${
        isAdmin ? "bg-white" : "bg-bg-secondary"
      }`}
    >
      {/* Close button for mobile */}
      <button
        onClick={closeSidebar}
        className="absolute top-20 md:top-16 right-4 sm:hidden text-white hover:text-red-300"
      >
        <FaTimes size={22} />
      </button>

      <div className="flex flex-col gap-6 mt-16 lg:mt-10 justify-center items-center">
        <h2
          className={`text-2xl font-bold text-center ${
            isAdmin ? "text-black" : "text-white"
          }`}
        >
          {isAdmin ? "Admin" : "User"} Dashboard
        </h2>

        <nav className="flex flex-col gap-4 mt-4">
          {routesToRender.map(({ label, icon, path }) => {
            const isActive = pathname === path;

            return (
              <Link to={path} onClick={closeSidebar} key={label}>
                <button
                  className={`cursor-pointer flex items-center gap-3 px-3 py-2 w-full font-medium ${
                    isActive
                      ? "bg-tertiary  text-white shadow"
                      : "bg-white  text-black"
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
