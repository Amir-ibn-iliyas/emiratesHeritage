import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import { Outlet } from "react-router-dom"; // <-- important

const MainLayout = () => {
  return (
    <div>
      <Navbar />
        <Chatbot/>
      <main>
        <Outlet /> {/* child routes will render here */}
      </main>
      <Footer />
      
    </div>
  );
};

export default MainLayout;
