import React from "react";
import Hero from "../components/Hero";
import Services from "../components/ServicesSection";
import Gallery from "../components/Gallery";
import Contact from "../components/ContactSection";
import AboutUs from "../components/AboutUs";

const Home = () => {
  return (
    <>
      <div  className="pt-18">
      <Hero />
      <AboutUs/>
      <Services />
      <Gallery />
      <Contact />
    </div>
    </>
  );
};

export default Home;
