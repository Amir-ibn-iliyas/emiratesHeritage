import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowRight, X, Eye } from "lucide-react";

/* ── Image imports ── */
import commercialImg from "../assets/images/commercial.webp";
import residentialImg from "../assets/images/resisdential.webp";
import industrialImg from "../assets/images/industrial.webp";
import heroImg from "../assets/images/heroImage.webp";
import featleftImg from "../assets/images/featleft.webp";
import gallimg2 from "../assets/images/gallimg2.webp";
import provideImg from "../assets/images/provide.webp";
import provideleftImg from "../assets/images/provideleft.webp";
import emirategalleryImg from "../assets/images/emirategalleryconst.webp";

gsap.registerPlugin(ScrollTrigger);

/* ── Project Data ── */
const projects = [
  { id: "p1", category: "commercial", image: commercialImg },
  { id: "p2", category: "residential", image: residentialImg },
  { id: "p3", category: "industrial", image: industrialImg },
  { id: "p4", category: "villa", image: heroImg },
  { id: "p5", category: "commercial", image: featleftImg },
  { id: "p6", category: "villa", image: gallimg2 },
  { id: "p7", category: "renovation", image: provideImg },
  { id: "p8", category: "commercial", image: provideleftImg },
  { id: "p9", category: "industrial", image: emirategalleryImg },
  { id: "p10", category: "commercial", image: commercialImg },
  { id: "p11", category: "residential", image: residentialImg },
  { id: "p12", category: "villa", image: gallimg2 },
];

const FILTERS = ["all", "residential", "commercial", "industrial", "villa", "renovation"];
const ITEMS_PER_PAGE = 6;

/* ── Counter Hook ── */
const useCounter = (target, duration = 1.8, delay = 0.6) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, { innerText: 0 }, {
      innerText: target, duration, delay,
      snap: { innerText: 1 }, ease: "power2.out",
    });
  }, [target, duration, delay]);
  return ref;
};

const GalleryPage = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [lightbox, setLightbox] = useState(null);
  const gridRef = useRef(null);
  const headerRef = useRef(null);

  const counter1 = useCounter(15);
  const counter2 = useCounter(100);
  const counter3 = useCounter(3);

  /* ── Filtered projects ── */
  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  /* ── Filter counts ── */
  const getCount = (cat) =>
    cat === "all" ? projects.length : projects.filter((p) => p.category === cat).length;

  /* ── Header GSAP ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".gal-accent", { scaleX: 0 }, { scaleX: 1, duration: 0.5 })
        .fromTo(".gal-title", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
        .fromTo(".gal-sub", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(".gal-stat", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, "-=0.2")
        .fromTo(".gal-filter", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, "-=0.2");
    }, headerRef);
    return () => ctx.revert();
  }, []);

  /* ── Grid GSAP on filter change ── */
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".gal-card");
    gsap.fromTo(cards,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" }
    );
  }, [activeFilter, visibleCount]);

  /* ── Filter handler ── */
  const handleFilter = useCallback((cat) => {
    if (cat === activeFilter) return;
    /* Animate out */
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".gal-card");
      gsap.to(cards, {
        opacity: 0, y: -15, scale: 0.96,
        duration: 0.2, stagger: 0.03, ease: "power2.in",
        onComplete: () => {
          setActiveFilter(cat);
          setVisibleCount(ITEMS_PER_PAGE);
        },
      });
    } else {
      setActiveFilter(cat);
      setVisibleCount(ITEMS_PER_PAGE);
    }
  }, [activeFilter]);

  /* ── Lightbox keyboard ── */
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "unset";
    };
  }, [lightbox]);

  return (
    <div className="bg-[#f8fafb] min-h-screen">
      {/* ─── Header ─── */}
      <div ref={headerRef} className="bg-[#0a1628] pt-20 pb-10 px-6 text-center">
        <div className="gal-accent mx-auto h-[3px] w-12 rounded-full bg-[#37C2CF] origin-center mb-5" />

        <h1 className="gal-title text-3xl md:text-5xl font-bold text-white tracking-tight">
          {t("gallery.pageTitle")}
        </h1>

        <p className="gal-sub mt-4 text-white/35 text-sm md:text-base max-w-xl mx-auto">
          {t("gallery.pageSubtitle")}
        </p>

        {/* ── Stats ── */}
        <div className="flex items-center justify-center gap-6 md:gap-8 mt-7">
          <div className="gal-stat flex flex-col items-center">
            <span className="text-xl md:text-2xl font-bold text-white">
              <span ref={counter1}>0</span><span className="text-[#37C2CF]">+</span>
            </span>
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium">
              {t("gallery.statYears")}
            </span>
          </div>
          <div className="gal-stat w-px h-7 bg-white/10" />
          <div className="gal-stat flex flex-col items-center">
            <span className="text-xl md:text-2xl font-bold text-white">
              <span ref={counter2}>0</span><span className="text-[#37C2CF]">+</span>
            </span>
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium">
              {t("gallery.statProjects")}
            </span>
          </div>
          <div className="gal-stat w-px h-7 bg-white/10" />
          <div className="gal-stat flex flex-col items-center">
            <span className="text-xl md:text-2xl font-bold text-white">
              <span ref={counter3}>0</span>
            </span>
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium">
              {t("gallery.statEmirates")}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Filters ─── */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-8 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {FILTERS.map((cat) => {
            const count = getCount(cat);
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`gal-filter shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? "bg-[#37C2CF] text-white border-[#37C2CF] shadow-md shadow-[#37C2CF]/15"
                    : "bg-white text-slate-600 border-gray-100 hover:border-[#37C2CF]/20 hover:text-[#37C2CF]"
                }`}
              >
                {t(`gallery.filters.${cat}`)}
                <span className={`ml-1.5 text-xs ${isActive ? "text-white/70" : "text-slate-400"}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Project Grid ─── */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-6">
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((project) => (
            <div
              key={project.id + activeFilter}
              className="gal-card group relative rounded-2xl overflow-hidden border border-gray-100 hover:border-[#37C2CF]/20 bg-white shadow-sm hover:shadow-xl hover:shadow-[#37C2CF]/8 transition-all duration-300 cursor-pointer hover:-translate-y-1"
              onClick={() => setLightbox(project)}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={t(`gallery.projects.${project.id}.name`)}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider bg-[#0a1628]/60 text-white backdrop-blur-sm">
                  {t(`gallery.filters.${project.category}`)}
                </span>
              </div>

              {/* Bottom gradient + info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
                <h3 className="text-white font-semibold text-sm md:text-base leading-snug">
                  {t(`gallery.projects.${project.id}.name`)}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={11} className="text-[#37C2CF]" />
                  <span className="text-white/50 text-xs">
                    {t(`gallery.projects.${project.id}.location`)}
                  </span>
                </div>
              </div>

              {/* Hover view icon (desktop) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-11 h-11 rounded-full bg-[#37C2CF]/90 flex items-center justify-center backdrop-blur-sm shadow-lg">
                  <Eye size={18} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
              className="group px-6 py-3 rounded-xl bg-white border border-gray-100 text-slate-700 font-semibold text-sm hover:border-[#37C2CF]/20 hover:text-[#37C2CF] hover:shadow-lg hover:shadow-[#37C2CF]/5 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              {t("gallery.loadMore")}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        )}
      </div>

      {/* ─── CTA Section ─── */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 pb-16">
        <div className="bg-[#0a1628] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-[#37C2CF] rounded-full" />
          <h2 className="text-xl md:text-3xl font-bold text-white mt-2">
            {t("gallery.cta.title")}
          </h2>
          <p className="text-white/35 text-sm md:text-base mt-3 max-w-md mx-auto">
            {t("gallery.cta.subtitle")}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-6 px-7 py-3.5 bg-[#37C2CF] text-white font-semibold rounded-xl shadow-lg shadow-[#37C2CF]/20 hover:shadow-xl hover:shadow-[#37C2CF]/35 hover:bg-[#2eb3bf] transition-all duration-300 group"
          >
            {t("gallery.cta.button")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>

      {/* ─── Lightbox ─── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0f172a] rounded-2xl overflow-hidden shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Image */}
            <div className="aspect-[16/10] w-full">
              <img
                src={lightbox.image}
                alt={t(`gallery.projects.${lightbox.id}.name`)}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-5 md:p-6 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-lg md:text-xl">
                  {t(`gallery.projects.${lightbox.id}.name`)}
                </h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} className="text-[#37C2CF]" />
                    <span className="text-white/40 text-sm">
                      {t(`gallery.projects.${lightbox.id}.location`)}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-[#37C2CF]/15 text-[#37C2CF]">
                    {t(`gallery.filters.${lightbox.category}`)}
                  </span>
                </div>
              </div>
              <Link
                to="/contact"
                onClick={() => setLightbox(null)}
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-[#37C2CF] text-white font-semibold rounded-xl text-sm hover:bg-[#2eb3bf] transition-colors"
              >
                {t("gallery.cta.button")}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ─── Animations ─── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default GalleryPage;
