import React, { useState } from "react";
import { motion } from "framer-motion";
// Import your local image
import contactIllustration from "../assets/images/contact.png";
import ContactForm from "./ContactForm";

const ContactSection = () => {
 

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section id="contact" className="pt-10 pb-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title provided by page-level header */}

        <div className="  flex flex-col h-full  md:flex-row gap-3 lg:gap-12  md:px-20 lg:px-0 items-center">
          {/* --- Left Column: Contact Form --- */}
         <ContactForm/>

          {/* --- Right Column: Illustration & Quick Contact Buttons --- */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            className="w-full h-full hidden lg:w-1/2 lg:flex flex-col items-center p-4 md:p-5"
          >
            {/* Illustration */}
            
              <img
                src={contactIllustration}
                alt="Get in Touch Illustration"
                className="w-full   object-contain"
              />
           
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
