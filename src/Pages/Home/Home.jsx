import React from "react";
import Banner from "../../Components/HomeComponents/Banner";
import WhyUs from "../../Components/HomeComponents/WhyUs";
import HomeStats from "../../Components/HomeComponents/HomeStats";
import HomeMenu from "../../Components/HomeComponents/HomeMenu";
import HomeChefs from "../../Components/HomeComponents/HomeChefs";
import ClientTestimonials from "../../Components/HomeComponents/ClientTestimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <HomeStats />
      <WhyUs />
      <HomeMenu />
      <HomeChefs />
      <ClientTestimonials />
    </div>
  );
};

export default Home;
