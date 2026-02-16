import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Warehouse,
  Waves,
  Paintbrush,
  Wrench,
  Expand,
  ArrowRight,
} from "lucide-react";

const serviceKeys = [
  { key: "house", icon: Home },
  { key: "warehouse", icon: Warehouse },
  { key: "pool", icon: Waves },
  { key: "decoration", icon: Paintbrush },
  { key: "maintenance", icon: Wrench },
  { key: "extensions", icon: Expand },
];

const Services = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f8fafb] min-h-screen">
      {/* ─── Header ─── */}
      <div className="bg-[#0a1628] pt-28 pb-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-white tracking-tight"
        >
          {t("services.pageTitle")}
        </motion.h1>

        {/* Accent line under title */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-[#37C2CF] origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-white/40 text-sm md:text-base max-w-xl mx-auto"
        >
          {t("services.pageSubtitle")}
        </motion.p>
      </div>

      {/* ─── Service Cards ─── */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {serviceKeys.map((service, i) => {
            const Icon = service.icon;
            const num = String(i + 1).padStart(2, "0");

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group bg-white rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-xl hover:shadow-[#37C2CF]/8 transition-all duration-300 border border-gray-100 hover:border-[#37C2CF]/20 cursor-pointer relative overflow-hidden"
              >
                {/* Left accent bar — appears on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#37C2CF] rounded-l-2xl scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                {/* Watermark number */}
                <span className="absolute -top-2 -right-2 text-[7rem] font-black text-gray-100/60 leading-none select-none pointer-events-none group-hover:text-[#37C2CF]/8 transition-colors duration-500">
                  {num}
                </span>

                <div className="relative z-10">
                  {/* Icon + Title row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#37C2CF]/10 flex items-center justify-center group-hover:bg-[#37C2CF] transition-all duration-300 group-hover:rotate-6">
                      <Icon
                        size={22}
                        className="text-[#37C2CF] group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#37C2CF]/60">
                        {t(`services.${service.key}.chapter`)}
                      </p>
                      <h3 className="text-lg font-bold text-[#0f172a]">
                        {t(`services.${service.key}.title`)}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {t(`services.${service.key}.desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ─── Bottom CTA ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-5 md:px-10 py-20 text-center"
      >
        <div className="bg-[#0a1628] rounded-3xl p-10 md:p-16 relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#37C2CF]/5 blur-[100px] pointer-events-none" />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold text-white relative z-10"
          >
            {t("services.finale.line1")}
            <br />
            <span className="text-[#37C2CF]">
              {t("services.finale.line2")} {t("services.finale.line3")}
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="relative z-10 inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-[#37C2CF] text-white font-semibold rounded-full shadow-lg shadow-[#37C2CF]/25 hover:shadow-xl hover:shadow-[#37C2CF]/40 hover:bg-[#2eb3bf] transition-all duration-300 hover:scale-105 group"
            >
              {t("services.finale.cta")}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Services;
