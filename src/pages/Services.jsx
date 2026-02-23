import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

  const scrollRef = useRef(null);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  // Custom Cursor State
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animationId;
    
    const play = () => {
      if (!isHovered.current && !isDragging.current && !isMouseDown) {
        el.scrollLeft += 1;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      animationId = requestAnimationFrame(play);
    };
    
    animationId = requestAnimationFrame(play);
    return () => cancelAnimationFrame(animationId);
  }, [isMouseDown]);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    setShowCursor(true);
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    setIsMouseDown(false);
    setShowCursor(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });

    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  return (
    <div className="bg-[#f8fafb] pb-4">
      {/* ─── Custom Floating Drag Cursor ─── */}
      <AnimatePresence>
        {showCursor && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              x: cursorPos.x - 44, 
              y: cursorPos.y - 44, 
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              scale: { duration: 0.2 },
              opacity: { duration: 0.2 },
              x: { type: "tween", ease: "backOut", duration: 0.05 },
              y: { type: "tween", ease: "backOut", duration: 0.05 },
            }}
            className="fixed top-0 left-0 w-[70px] h-[70px] bg-[#0a1628]/95 backdrop-blur-md rounded-full pointer-events-none z-[100] hidden md:flex items-center justify-center shadow-2xl text-white"
          >
            <span className="font-semibold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 opacity-90 relative">
              <span className="text-xl font-light mb-0.5">&lsaquo;</span>
              DRAG
              <span className="text-xl font-light mb-0.5">&rsaquo;</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
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

      {/* ─── Service Carousel (Auto + Manual Swipe) ─── */}
      <div className="relative w-full overflow-hidden pb-4 -mt-8">
        {/* Left/Right fading edges for premium depth */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-linear-to-r from-[#f8fafb] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-linear-to-l from-[#f8fafb] to-transparent z-20 pointer-events-none" />

        {/* The native scrolling track */}
        <div 
          ref={scrollRef}
          className="flex gap-5 md:gap-8 px-5 md:px-8 py-4 overflow-x-auto hide-scrollbar cursor-grab md:cursor-none w-full bg-[#f8fafb]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={() => (isDragging.current = true)}
          onTouchEnd={handleMouseUp}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {/* Duplicated mapped items to create the seamless infinite loop effect */}
          {[...serviceKeys, ...serviceKeys].map((service, i) => {
            const Icon = service.icon;
            const num = String((i % serviceKeys.length) + 1).padStart(2, "0");

            return (
              <div
                key={`${service.key}-${i}`}
                className="w-[300px] md:w-[420px] shrink-0 bg-white rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-xl hover:shadow-[#37C2CF]/8 transition-all duration-300 border border-gray-100 hover:border-[#37C2CF]/20 relative overflow-hidden group/card transform hover:-translate-y-2 select-none"
              >
                {/* Left accent bar — appears on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#37C2CF] rounded-l-2xl scale-y-0 group-hover/card:scale-y-100 transition-transform duration-300 origin-top" />

                {/* Watermark number */}
                <span className="absolute -top-2 -right-2 text-[6rem] md:text-[7rem] font-black text-gray-100/60 leading-none select-none pointer-events-none group-hover/card:text-[#37C2CF]/8 transition-colors duration-500">
                  {num}
                </span>

                <div className="relative z-10 pointer-events-none">
                  {/* Icon + Title row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#37C2CF]/10 flex items-center justify-center group-hover/card:bg-[#37C2CF] transition-all duration-300 group-hover/card:rotate-6 shrink-0">
                      <Icon
                        size={22}
                        className="text-[#37C2CF] group-hover/card:text-white transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#37C2CF]/60">
                        {t(`services.${service.key}.chapter`)}
                      </p>
                      <h3 className="text-base md:text-lg font-bold text-[#0f172a] leading-tight">
                        {t(`services.${service.key}.title`)}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {t(`services.${service.key}.desc`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* Hide scrollbar natively for the swipable row */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Services;
