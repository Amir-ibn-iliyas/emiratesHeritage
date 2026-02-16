import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  // Toggle language
  const toggleLanguage = () => {
    const newLang = isArabic ? "en" : "ar";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.lang = newLang;
  };

  // Set html lang on mount
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setScrolled(currentScrollY > 60);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/", hash: "about" },
    { name: t("nav.gallery"), path: "/", hash: "gallery" },
    { name: t("nav.services"), path: "/services" },
  ];

  const handleNavClick = (item) => {
    setIsOpen(false);
    if (item.hash && location.pathname === "/") {
      const element = document.getElementById(item.hash);
      if (element) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const offsetPosition = elementRect - bodyRect - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  const isActive = (item) => {
    if (item.hash) return false;
    return location.pathname === item.path;
  };

  const menuVariants = {
    closed: {
      x: "100%",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
    open: {
      x: 0,
      transition: {
        type: "spring", stiffness: 80, damping: 20,
        staggerChildren: 0.08, delayChildren: 0.15,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, x: 30 },
    open: { opacity: 1, x: 0, transition: { duration: 0.35 } },
  };

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={`transition-all duration-500 ease-out ${
            scrolled
              ? "px-4 md:px-8 lg:px-16 pt-1"
              : "px-0 pt-0"
          }`}
        >
          <nav
            className={`mx-auto transition-all duration-500 ease-out ${
              scrolled
                ? "max-w-5xl rounded-full bg-black/25 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]  "
                : "max-w-full bg-transparent"
            }`}
          >
            <div
              className={`flex items-center justify-between transition-all duration-500 ${
                scrolled
                  ? "px-4 md:px-7 py-2.5 md:py-3"
                  : "px-5 md:px-10 lg:px-20 py-4 md:py-5"
              }`}
            >
              {/* ── Logo ── */}
              <Link to="/" className="flex items-center gap-3 group">
                <img
                  src={Logo}
                  alt="Emirates Heritage"
                  className={`object-contain transition-all duration-500 ${
                    scrolled ? "w-7 h-7 md:w-8 md:h-8" : "w-8 h-8 md:w-10 md:h-10"
                  }`}
                />
                <span
                  className={`font-semibold tracking-wide transition-all duration-500 ${
                    scrolled
                      ? "text-white text-sm md:text-base"
                      : "text-white text-lg drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                  }`}
                >
                  Emirates Heritage
                </span>
              </Link>

              {/* ── Right side: Desktop Links + Lang Toggle + Mobile Menu ── */}
              <div className="flex items-center gap-1">
                {/* Desktop Links (hidden on mobile) */}
                <div className="hidden md:flex items-center gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.hash ? `/#${item.hash}` : item.path}
                      onClick={() => handleNavClick(item)}
                      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        scrolled
                          ? isActive(item)
                            ? "text-[#37C2CF] font-semibold"
                            : "text-white hover:text-white"
                          : isActive(item)
                          ? "text-white font-semibold"
                          : "text-white hover:text-white"
                      }`}
                    >
                      {item.name}

                      {/* Active dot indicator */}
                      {isActive(item) && (
                        <motion.span
                          layoutId="navDot"
                          className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                            scrolled ? "bg-[#37C2CF]" : "bg-white"
                          }`}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  ))}

                  {/* CTA Button */}
                  <div className="ml-3">
                    <Link
                      to="/contact"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                        scrolled
                          ? "bg-[#37C2CF] text-white shadow-lg shadow-[#37C2CF]/25 hover:shadow-xl hover:shadow-[#37C2CF]/35 hover:bg-[#2eb3bf]"
                          : "bg-white/15 text-white backdrop-blur-sm border border-white/20 hover:bg-white/25"
                      }`}
                    >
                      {t("nav.getQuote")}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Language Toggle (always visible) */}
                <button
                  onClick={toggleLanguage}
                  className="px-5 py-1 ml-2 rounded-full text-lg font-semibold text-white border border-white/15 hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  {isArabic ? "ENG" : "عربي"}
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    scrolled
                      ? "text-white hover:bg-white/10"
                      : "text-white hover:bg-white/10"
                  }`}
                  aria-label="Toggle menu"
                >
                  <HiMenuAlt3 size={22} />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ===== MOBILE DRAWER ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 right-0 w-[80%] sm:w-[55%] h-screen z-70 
                bg-[#fafafa] shadow-[-20px_0_60px_rgba(0,0,0,0.15)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <div className="flex items-center gap-3">
                  <img src={Logo} alt="Logo" className="w-8 h-8 object-contain" />
                  <span className="text-gray-800 font-semibold text-base">
                    Emirates Heritage
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-all"
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="w-full h-px bg-gray-100 mb-2"></div>



              {/* Links */}
              <div className="flex flex-col px-4 space-y-1 mt-2">
                {navItems.map((item) => (
                  <motion.div key={item.name} variants={linkVariants}>
                    <Link
                      to={item.hash ? `/#${item.hash}` : item.path}
                      onClick={() => handleNavClick(item)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                        isActive(item)
                          ? "bg-[#37C2CF]/10 text-[#37C2CF]"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {item.name}
                      {isActive(item) && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#37C2CF]"></span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="px-6 mt-6">
                <motion.div variants={linkVariants}>
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-[#37C2CF] text-white px-6 py-3.5 rounded-xl font-semibold text-[15px]
                      shadow-lg shadow-[#37C2CF]/20 hover:shadow-xl hover:shadow-[#37C2CF]/30
                      hover:bg-[#2eb3bf] transition-all duration-300"
                  >
                    {t("nav.getQuote")}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </motion.div>
              </div>

              {/* Bottom contact */}
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
                <div className="h-px bg-gray-100 mb-5"></div>
                <div className="space-y-3">
                  <a href="tel:+971503195090" className="flex items-center gap-3 text-gray-400 hover:text-gray-700 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <span className="text-sm">+971 50 319 5090</span>
                  </a>
                  <a href="mailto:EmiratesHeritage@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-gray-700 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <span className="text-sm">EmiratesHeritage@gmail.com</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
