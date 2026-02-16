import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
// --- IMAGE IMPORTS (Keep your existing imports) ---
import leftTopImg from '../assets/images/commercial.webp';
import leftBottomImg from '../assets/images/industrial.webp';
import centerImg from '../assets/images/heroImage.webp';
import rightTopImg from '../assets/images/industrial.webp';
import rightBottomImg from '../assets/images/industrial.webp';

const Gallery = () => {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef();
  const { t } = useTranslation();

  const images = {
    leftTop: leftTopImg,
    leftBottom: leftBottomImg,
    center: centerImg,
    rightTop: rightTopImg,
    rightBottom: rightBottomImg,
  };

  // Flatten images into an array for the carousel loop
  const carouselImages = [
    images.center, // Put the hero image first on mobile
    images.leftTop,
    images.leftBottom,
    images.rightTop,
    images.rightBottom,
  ];

  useEffect(() => {
    // Calculate total scrollable width for the carousel
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section id="gallery" className="  md:py-10  overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* --- TITLE --- */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
          transition={{ duration: 0.8 }}
          
          className="text-center mb-5 md:mb-10"
        >
          <h2 className="text-4xl md:text-5xl  font-bold text-slate-900 tracking-tight">
            {t("gallery.title")}
          </h2>
          <p className="text-slate-600 mt-2 text-lg">
            {t("gallery.subtitle")}
          </p>
        </motion.div>

        {/* ==============================================
            DESKTOP VIEW (Mosaic Grid) - Hidden on Mobile
           ============================================== */}
        <motion.div
          className="hidden lg:grid grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {/* Left Column */}
          <div className="flex flex-col gap-5">
            <GalleryCard src={images.leftTop} />
            <GalleryCard src={images.leftBottom} />
          </div>

          {/* Center */}
          <div className="flex items-stretch">
            <GalleryCard src={images.center} tall />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
            <GalleryCard src={images.rightTop} />
            <GalleryCard src={images.rightBottom} />
          </div>
        </motion.div>

        {/* ==============================================
            MOBILE VIEW (Carousel) - Hidden on Desktop
           ============================================== */}
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
            {carouselImages.map((img, index) => (
              <motion.div 
                key={index}
                className="min-w-[85vw] sm:min-w-[60vw] h-[400px] relative rounded-2xl overflow-hidden shadow-lg"
              >
                <img 
                  src={img} 
                  alt="Gallery Item" 
                  className="w-full h-full object-cover pointer-events-none" // pointer-events-none prevents image drag conflict
                />
                {/* Simple Overlay for Mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Mobile "Swipe" Hint */}
          <div className="mt-6 flex justify-center gap-2">
             <span className="text-sm text-slate-400 font-medium animate-pulse">
               &larr; Swipe to explore &rarr;
             </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Gallery;

/* ---------------------------
   REUSABLE GALLERY CARD (Desktop)
----------------------------*/
const GalleryCard = ({ src, tall }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0)",
          transition: { duration: 0.8, ease: "easeOut" },
        },
      }}
      className={`relative group overflow-hidden rounded-2xl shadow-xl 
      cursor-pointer bg-black/5 ${tall ? "h-64 md:h-[530px]" : "h-64"}`}
    >
      {/* IMAGE */}
      <motion.img
        src={src}
        alt="Gallery"
        className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", damping: 15, stiffness: 120 }}
      />

      {/* Glass Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Corners Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none">
        <div className="absolute top-6 left-6 w-10 h-10 border-t-4 border-l-4 border-white/70 rounded-tr-xl"></div>
        <div className="absolute top-6 right-6 w-10 h-10 border-t-4 border-r-4 border-white/70 rounded-tl-xl"></div>
        <div className="absolute bottom-6 left-6 w-10 h-10 border-b-4 border-l-4 border-white/70 rounded-br-xl"></div>
        <div className="absolute bottom-6 right-6 w-10 h-10 border-b-4 border-r-4 border-white/70 rounded-bl-xl"></div>
      </div>

      {/* Floating Animation */}
      <motion.div
        className="absolute inset-0"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
    </motion.div>
  );
};