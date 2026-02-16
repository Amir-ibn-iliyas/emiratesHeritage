import React from "react";
import ContactSection from "../components/ContactSection";

const Contact = () => {
  return (
    <>
      {/* Dark header area behind the floating navbar */}
      <div className="bg-gradient-to-b from-[#0a1628] via-[#0f1d32] to-[#0f172a] pt-20 pb-5 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Contact Us
        </h1>
        <p className="mt-3 text-white/50 text-xs md:text-base max-w-xl mx-auto">
          Ready to start your project? Get in touch with our team.
        </p>
      </div>
      <ContactSection />
    </>
  );
};

export default Contact;
