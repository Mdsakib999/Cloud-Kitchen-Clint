import Banner from "../../Components/HomeComponents/Banner";
import WhyUs from "../../Components/HomeComponents/WhyUs";
import HomeStats from "../../Components/HomeComponents/HomeStats";
import HomeMenu from "../../Components/HomeComponents/HomeMenu";
import HomeChefs from "../../Components/HomeComponents/HomeChefs";
import ClientTestimonials from "../../Components/HomeComponents/ClientTestimonials";
import { HomeBlog } from "../../Components/HomeComponents/HomeBlog";
import PromotionalOffer from "../../Components/HomeComponents/PromotionalOffer";

const Home = () => {
  return (
    <div>
      <Banner />
      <HomeMenu />
      <PromotionalOffer />
      <WhyUs />
      <HomeStats />
      <HomeBlog />
      {/* <HomeChefs /> */}
      <ClientTestimonials />
    </div>
  );
};

export default Home;
