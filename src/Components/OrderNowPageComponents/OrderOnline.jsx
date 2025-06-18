import { IoCompassOutline } from "react-icons/io5";
import { RiRadioButtonLine } from "react-icons/ri";
export const OrderOnline = () => {
  return (
    <div className=" my-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4 font-inknut text-primary">
        {" "}
        Order Online
      </h1>
      <div className="flex gap-4 items-center text-green-500 mb-3">
        <RiRadioButtonLine className="w-8 h-8" />
        <p className="text-xl">Currently open for online ordering</p>
      </div>
      <div className="flex gap-4 items-center">
        <IoCompassOutline className="text-primary w-8 h-8" />
        <p className="text-white text-xl">Live Tracking Available</p>
      </div>
    </div>
  );
};
