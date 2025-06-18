import { Outlet } from "react-router-dom";
import Navbar from "./Components/SharedComponent/Navbar";
import Footer from "./Components/SharedComponent/Footer";
import InfoBar from "./Components/SharedComponent/InfoBar";
import { ScrollToTop } from "./utils/ScrollToTop";

function App() {
  return (
    <div className="bg-bg-primary min-h-screen">
      <ScrollToTop />
      {/* Nav bar */}
      <InfoBar />
      <Navbar />

      {/* Children component */}
      <div className="min-h-[calc(100vh-196px)] ">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
