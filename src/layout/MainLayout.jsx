import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import { Outlet } from "react-router-dom"; // <-- important

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
        <Chatbot/>
      <main className="flex-1 flex flex-col">
        <Outlet /> {/* child routes will render here */}
      </main>
      <Footer />
      
    </div>
  );
};

export default MainLayout;
