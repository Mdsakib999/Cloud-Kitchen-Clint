import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DashBoardLeftNav } from "./DasboardLeftNav";
import { ScrollToTop } from "../../utils/ScrollToTop";
import Navbar from "../../Components/SharedComponent/Navbar";
import { StatHeader } from "../../Components/SharedComponent/StatHeader";

export const Dashboard = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar body scroll lock
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  return (
    <>
      <ScrollToTop />
      {/* You can pass scroll transparency state to Navbar */}
      <Navbar offsetTop={0} />

      <div className={`${isAdmin ? "bg-white" : "bg-bg-primary"} pt-8`}>
        <div className="flex min-h-screen relative">
          {/* Mobile Sidebar Toggle */}
          <button
            className={`fixed top-28 left-4 z-50 lg:hidden bg-primary text-white px-4 py-2 rounded text-sm font-medium shadow-lg transition-all duration-300 ${
              sidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            onClick={() => setSidebarOpen(true)}
          >
            Open Sidebar
          </button>

          {/* Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Mobile Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-80 z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <DashBoardLeftNav
              closeSidebar={() => setSidebarOpen(false)}
              isAdmin={isAdmin}
            />
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-72 lg:flex-shrink-0">
            <DashBoardLeftNav isAdmin={isAdmin} />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 lg:ml-0">
            <div className="h-full">
              <div className="p-4 lg:p-6">
                {isAdmin ? (
                  <div className="flex flex-col min-h-full gap-4 mt-4">
                    <StatHeader />
                    <div className="flex-1">
                      <Outlet />
                    </div>
                  </div>
                ) : (
                  <Outlet />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
