import { SectionHeader } from "../SharedComponent/SectionHeader";
import Chef1 from "/assets/Chef/chef1.jpg";
import Chef2 from "/assets/Chef/chef2.jpg";
import Chef3 from "/assets/Chef/chef3.jpg";
import Chef4 from "/assets/Chef/chef4.jpg";
import Chef5 from "/assets/Chef/chef5.jpg";
import { Users } from "lucide-react";
export const EatSocially = () => {
  return (
    <div className="bg-bg-secondary py-16 px-4">
      {/* Header Text */}
      <SectionHeader
        icon={Users}
        subtitle="Follow Us @"
        title="FlavourVerse"
        description="Eat Socially"
      />

      {/* Image Collage */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 flex-wrap md:flex-nowrap px-2 md:px-0 md:py-10">
        <div className="relative z-10 md:-mr-6">
          <img
            src={Chef1}
            alt="Chef 1"
            className="w-36 md:w-52 lg:w-60 rounded-xl shadow-md"
          />
        </div>
        <div className="relative z-20 md:-mr-6 md:top-15">
          <img
            src={Chef2}
            alt="Chef 2"
            className="w-36 md:w-52 lg:min-w-68 rounded-xl shadow-md"
          />
        </div>
        <div className="relative z-30">
          <img
            src={Chef3}
            alt="Chef 3"
            className="w-40 md:w-56 lg:w-60 rounded-xl shadow-lg"
          />
        </div>
        <div className="relative z-20 md:-ml-6 md:top-15">
          <img
            src={Chef4}
            alt="Chef 4"
            className="w-36 md:w-52 lg:w-60 rounded-xl shadow-md"
          />
        </div>
        <div className="relative z-10 md:-ml-6 md:-top-5">
          <img
            src={Chef5}
            alt="Chef 5"
            className="w-36 md:w-52 lg:w-60 rounded-xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
};
