import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from "../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. PREVENT BODY SCROLL when Menu is Open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "unset"; // Enable scrolling
    }
  }, [isOpen]);
  // Define items with the specific ID of the section they should scroll to
  const navItems = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Services", id: "service" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact Us", id: "contact" },
  ];

  // Smooth Scroll Function
  const scrollToSection = (id) => {
    setIsOpen(false); // Close mobile menu if open
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust this based on your navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // --- Animations ---

  // Mobile Menu Container
  const menuVariants = {
    closed: {
      x: "100%",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.1  ,
      },
    },
  };

  // Mobile Link Items (Staggered Fade Up)
  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#37C2CF]/50 backdrop-blur-md shadow-lg py-4"
          : "bg-[#37C2CF] py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-0 lg:px-20">
        {/* Logo + Company Name */}
        <div
          className="flex items-center space-x-5 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            src={Logo}
            alt="Emirates Heritage Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-white  text-xl tracking-wide">
            Emirates Heritage
          </span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex md:space-x-3 lg:space-x-8  text-white items-center">
          {navItems.map((item) => (
            <li key={item.name} className="relative group">
              <button
                onClick={() => scrollToSection(item.id)}
                className="text-lg  cursor-pointer hover:text-white transition-colors duration-300"
              >
                {item.name}
              </button>
              {/* Minimal Animated Underline */}
              <span className="absolute -bottom-[1px] left-0 w-0 h-[1px] bg-yellow-200 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("contact")}
            className="ml-4 bg-black md:hidden lg:block cursor-pointer text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-900 hover:shadow-lg transition-all"
          >
            Have Any Questions
          </motion.button>
        </ul>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-white text-3xl cursor-pointer z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer Menu */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 right-0 w-[85%] sm:w-[50%] h-screen bg-[#37C2CF] z-50 flex flex-col shadow-2xl"
            >
              {/* --- NEW: Header with Logo, Name & Close Button --- */}
              <div className="flex items-center justify-between px-6 pt-6 mb-4">
                {/* Logo & Name */}
                <div className="flex items-center gap-3">
                  {/* Ensure /logo.png exists in your public folder */}
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-8 h-8 object-contain bg-white p-1"
                  />
                  <span className="text-white  font-semibold text-lg leading-none">
                    Emirates  Heritage
                  </span>
                </div>

                {/* Close Button (X) */}
                <button
                  onClick={() => setIsOpen(false)} // Replace 'setIsOpen(false)' with your actual close function
                  className="text-white p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  {/* Simple SVG X Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* --- Navigation Items --- */}
              {/* Removed 'bg-red-400' and adjusted margin-top */}
              <div className="flex flex-col h-full px-6 mt-4 space-y-6 relative z-10">
                {navItems.map((item) => (
                  <motion.div key={item.name} variants={linkVariants}>
                    <button
                      onClick={() => {
                        scrollToSection(item.id);
                        setIsOpen(false); // Also close menu when a link is clicked
                      }}
                      className="text-2xl font-medium text-white hover:text-yellow-300 transition-colors duration-300 text-left w-full"
                    >
                      {item.name}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
