import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Tilt from "react-parallax-tilt";
import {
  Home,
  Warehouse,
  Waves,
  Paintbrush,
  Wrench,
  Expand,
} from "lucide-react";

const serviceKeys = [
  { key: "house", icon: <Home size={32} /> },
  { key: "warehouse", icon: <Warehouse size={32} /> },
  { key: "pool", icon: <Waves size={32} /> },
  { key: "decoration", icon: <Paintbrush size={32} /> },
  { key: "maintenance", icon: <Wrench size={32} /> },
  { key: "extensions", icon: <Expand size={32} /> },
];

const fadeUpBlur = {
  hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const ServicesSection = () => {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef();
  const { t } = useTranslation();

  // Build translated services array
  const services = serviceKeys.map((s) => ({
    title: t(`services.${s.key}.title`),
    desc: t(`services.${s.key}.desc`),
    icon: s.icon,
  }));

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      );
    }
  }, []);

  return (
    <section
      id="service"
      className="py-10  px-4 md:px-10 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Parallax Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      ></motion.div>

      {/* Heading — only shown when not on dedicated services page */}
      <motion.div
        initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1 }}
        className="text-center max-w-3xl mx-auto mb-8 relative"
      >
      </motion.div>

      {/*  DESKTOP VIEW (Grid + Tilt) - Hidden on Mobile*/}
      <div className="hidden lg:grid grid-cols-3 gap-8 relative">
        {services.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpBlur}
          >
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.2}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              className="rounded-xl h-full"
            >
              <ServiceCardContent item={item} index={index} />
            </Tilt>
          </motion.div>
        ))}
      </div>

      {/*MOBILE VIEW (Carousel) - Hidden on Desktop */}
      <motion.div
        ref={carouselRef}
        className="lg:hidden cursor-grab active:cursor-grabbing overflow-hidden"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex gap-4"
        >
          {services.map((item, index) => (
            <motion.div
              key={index}
              className="min-w-[85vw]  sm:min-w-[50vw] h-full" // Card Width for mobile
            >
              {/* Note: No Tilt on mobile for better scrolling performance */}
              <ServiceCardContent item={item} index={index} isMobile={true} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Swipe Hint */}
        <div className="mt-6 flex justify-center gap-2">
          <span className="text-sm text-slate-400 font-medium animate-pulse">
            &larr; Swipe to see more &rarr;
          </span>
        </div>
      </motion.div>
    </section>
  );
};

// --- Extracted Card Content for cleaner code ---
const ServiceCardContent = ({ item, index, isMobile }) => (
  <motion.div
    whileHover={
      !isMobile
        ? {
            scale: 1.03,
            y: -3,
            transition: { duration: 0.3 },
          }
        : {}
    }
    className={`bg-[#37C2CF] text-white p-6 md:py-10 rounded-2xl shadow-md 
              flex flex-col hover:shadow-2xl cursor-pointer hover:shadow-[#4dc3c857]
              transition-all h-full ${
                isMobile ? "min-h-[220px] justify-center" : "h-[220px]"
              }`}
  >
    <div className="icon flex gap-3  items-center ">
      {/* Icon Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: -50, x: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className=" text-black"
      >
        {item.icon}
      </motion.div>

      <h2 className="text-lg text-black md:text-xl font-bold leading-tight">
        {item.title}
      </h2>
    </div>
    <p className="text-sm md:text-base md:mt-8 lg:mt-4 mt-2 opacity-90 leading-relaxed font-medium">
      {item.desc}
    </p>
  </motion.div>
);

export default ServicesSection;
