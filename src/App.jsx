import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Components/SharedComponent/Navbar";
import Footer from "./Components/SharedComponent/Footer";
import InfoBar from "./Components/SharedComponent/InfoBar";
import { ScrollToTop } from "./utils/ScrollToTop";

function App() {
  const [isTransparent, setIsTransparent] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY < 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <div className="bg-bg-primary min-h-screen">
      <ScrollToTop />
      {isTransparent && <InfoBar />}
      <Navbar offsetTop={isTransparent ? 56 : 0} />
      <div className="min-h-[calc(100vh-196px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
