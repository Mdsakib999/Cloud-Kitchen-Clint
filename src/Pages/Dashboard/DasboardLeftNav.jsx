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
import { IoTicketSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export const DashBoardLeftNav = ({ closeSidebar }) => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
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
      label: "Customer Reviews",
      icon: <FaStar size={20} />,
      path: "/admin/dashboard/manage-reviews",
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
      label: "Manage Category",
      icon: <FaFolderPlus size={20} />,
      path: "/admin/dashboard/add-category",
    },
    {
      label: "Add Cupon",
      icon: <IoTicketSharp size={20} />,
      path: "/admin/dashboard/add-cupon",
    },
    {
      label: "Manage Cupon",
      icon: <IoTicketSharp size={20} />,
      path: "/admin/dashboard/manage-cupon",
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
      className={`h-full w-full p-4 relative md:w-80 lg:w-72 ${
        isAdmin ? "bg-white" : "bg-bg-secondary"
      }`}
    >
      {/* Close button for mobile */}
      <button
        onClick={closeSidebar}
        className={`absolute top-20 md:top-24 right-4 lg:hidden ${
          isAdmin ? "text-black" : "text-white"
        } hover:text-red-300`}
      >
        <FaTimes size={22} />
      </button>

      <div className="flex flex-col gap-6 mt-16 lg:mt-14 justify-center items-center">
        <h2
          className={`text-2xl font-bold text-center ${
            isAdmin ? "text-black" : "text-white"
          }`}
        >
          {isAdmin ? "Admin" : "User"} Dashboard
        </h2>

        <nav className="flex flex-col gap-2">
          {routesToRender.map(({ label, icon, path }) => {
            const isActive = pathname === path;

            return (
              <Link to={path} onClick={closeSidebar} key={label}>
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
        </nav>
      </div>
    </aside>
  );
};
