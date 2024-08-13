import React from "react";
import Banner from "../../components/Banner";
import Categories from "./Categories";
import SpecialCoffee from "./SpecialCoffee";
import OurServices from "./OurServices";
import Testimonials from "./Testimonials";
//beside nav and footer, all the children will be inside thiss
const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <SpecialCoffee />
      <Testimonials />
      <OurServices />
    </div>
  );
};
export default Home;
