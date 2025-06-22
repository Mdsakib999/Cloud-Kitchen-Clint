import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DashBoardLeftNav } from "./DasboardLeftNav";
import { ScrollToTop } from "../../utils/ScrollToTop";
import Navbar from "../../Components/SharedComponent/Navbar";
import InfoBar from "../../Components/SharedComponent/InfoBar";
import { StatHeader } from "../../Components/SharedComponent/StatHeader";

export const Dashboard = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    if (sidebarOpen) {
      window.scrollTo({ top: 100, behavior: "smooth" });
    }
  }, [sidebarOpen]);
  return (
    <>
      <ScrollToTop />
      <InfoBar />
      <Navbar />
      <div className={`${isAdmin ? "bg-white" : "bg-bg-primary"}`}>
        {/* Main Dashboard Container */}
        <div className="flex min-h-screen">
          {/* Mobile Sidebar Toggle Button */}
          <button
            className={`
            fixed top-32 md:top-36 left-4 md:left-10 z-40 lg:hidden
            bg-primary text-white px-4 py-2 rounded
            text-sm font-medium shadow-lg
            transition-opacity duration-300
            ${sidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
            onClick={() => setSidebarOpen(true)}
          >
            Open Sidebar
          </button>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className="fixed top-0 left-0 w-full h-full lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Mobile Sidebar */}
          <div
            className={`
            fixed top-0 left-0 h-full w-full md:w-80 shadow-lg z-40 lg:hidden
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          >
            <div className="pt-16 h-full overflow-y-auto">
              <DashBoardLeftNav closeSidebar={() => setSidebarOpen(false)} />
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-72 lg:flex-shrink-0 ">
            <div className="sticky top-24 h-screen bg-white shadow-md">
              <DashBoardLeftNav />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="h-full overflow-y-auto lg:mt-30 md:mt-40">
              <div className="p-4 lg:p-6">
                {isAdmin ? (
                  <div className="flex flex-col min-h-screen gap-2">
                    <>
                      <StatHeader />
                    </>
                    <>
                      <Outlet />
                    </>
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
