import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const NotFound = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="flex-1 bg-[#0a1628] flex flex-col items-center justify-center pt-24 pb-12 px-6">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#37C2CF] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-white/20 mb-4 select-none">
          {t("notfound.title")}
        </h1>
        
        <h2 className="text-2xl md:text-4xl font-semibold text-white mb-6">
          {t("notfound.subtitle")}
        </h2>
        
        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-10 max-w-md">
          {t("notfound.desc")}
        </p>

        <Link to="/">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={` cursor-pointer flex items-center gap-3 bg-[#37C2CF] hover:bg-[#2eb3bf] text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-lg shadow-[#37C2CF]/20 ${
              isArabic ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <Home size={18} />
            {t("notfound.button")}
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
