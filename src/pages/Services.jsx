import React from "react";
import { useTranslation } from "react-i18next";
import ServicesSection from "../components/ServicesSection";

const Services = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Dark header area behind the floating navbar */}
      <div className="bg-gradient-to-b from-[#0a1628] via-[#0f1d32] to-[#0f172a] pt-20 pb-5 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          {t("services.pageTitle")}
        </h1>
        <p className="mt-3 text-white/50 text-sm md:text-base max-w-xl mx-auto">
          {t("services.pageSubtitle")}
        </p>
      </div>
      <ServicesSection />
    </>
  );
};

export default Services;
