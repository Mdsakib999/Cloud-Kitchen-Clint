import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/SharedComponent/Navbar";
import Footer from "./Components/SharedComponent/Footer";
import InfoBar from "./Components/SharedComponent/InfoBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      {/* Nav bar */}
      <InfoBar />
      <Navbar></Navbar>

      {/* Children component */}
      <div className="min-h-[calc(100vh-196px)] ">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}

export default App;
