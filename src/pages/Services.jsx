import React from "react";
import ServicesSection from "../components/ServicesSection";

const Services = () => {
  return (
    <>
      {/* Dark header area behind the floating navbar */}
      <div className="bg-gradient-to-b from-[#0a1628] via-[#0f1d32] to-[#0f172a] pt-20 pb-12 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Our Services
        </h1>
        <p className="mt-3 text-white/50 text-sm md:text-base max-w-xl mx-auto">
          Full-scope construction & property solutions — from villas to warehouses.
        </p>
      </div>
      <ServicesSection />
    </>
  );
};

export default Services;
