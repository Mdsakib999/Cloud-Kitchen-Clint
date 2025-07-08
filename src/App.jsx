import { useEffect, useState, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Components/SharedComponent/Navbar";
import Footer from "./Components/SharedComponent/Footer";
import InfoBar from "./Components/SharedComponent/InfoBar";
import { ScrollToTop } from "./utils/ScrollToTop";

function App() {
  const [showInfoBar, setShowInfoBar] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 80);
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowInfoBar(false);
      } else if (currentScrollY < lastScrollY.current) {
        setShowInfoBar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <div className="bg-bg-primary min-h-screen">
      <InfoBar isTransparent={isAtTop} isVisible={showInfoBar} />
      <Navbar offsetTop={showInfoBar ? 56 : 0} />
      <div className="min-h-[calc(100vh-196px)]">
        <ScrollToTop />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
