import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { DashBoardLeftNav } from "./DasboardLeftNav";
import { ScrollToTop } from "../../utils/ScrollToTop";
import Navbar from "../../Components/SharedComponent/Navbar";
import InfoBar from "../../Components/SharedComponent/InfoBar";

export const Dashboard = () => {
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
      <div className="bg-bg-primary">
        {/* Main Dashboard Container */}
        <div className="flex min-h-screen">
          {/* Mobile Sidebar Toggle Button */}
          <button
            className={`
            fixed top-32 left-4 z-40 lg:hidden
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
              className="fixed top-0 left-0 w-full h-full  lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Mobile Sidebar */}
          <div
            className={`
            fixed top-0 left-0 h-full w-full bg-white shadow-lg z-40 lg:hidden
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          >
            <div className="pt-16 h-full overflow-y-auto">
              <DashBoardLeftNav closeSidebar={() => setSidebarOpen(false)} />
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-72 lg:flex-shrink-0">
            <div className="sticky top-32 h-[calc(100vh-4rem)] bg-white shadow-md overflow-y-auto">
              <DashBoardLeftNav />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="h-full overflow-y-auto mt-20">
              <div className="p-4 lg:p-6">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
