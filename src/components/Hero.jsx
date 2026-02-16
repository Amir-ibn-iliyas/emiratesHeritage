import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── Animated Counter Hook ── */
const useCounter = (target, duration = 2, delay = 1.2) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: target,
        duration,
        delay,
        snap: { innerText: 1 },
        ease: "power2.out",
      }
    );
  }, [target, duration, delay]);
  return ref;
};

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const imgRef = useRef(null);

  const counter1 = useCounter(15, 1.8, 1.4);
  const counter2 = useCounter(100, 2, 1.5);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Parallax ── */
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* ── Cinematic Entrance Timeline ── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
          ".hero-accent-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".hero-title-line",
          { y: "110%", rotateX: -10 },
          { y: "0%", rotateX: 0, duration: 0.8, stagger: 0.15 },
          "-=0.2"
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ".hero-btn",
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          ".hero-divider",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.4 },
          "-=0.2"
        )
        .fromTo(
          ".hero-stat",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
          "-=0.2"
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.1"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative h-[65vh] md:h-screen overflow-hidden bg-[#0a1628]"
    >

      {/* ── Background Image ── */}
      <img
        ref={imgRef}
        src="/heroImage2.webp"
        fetchPriority="high"
        alt="Heritage Background"
        className={`absolute inset-0 w-full h-[120%] -top-[10%] object-cover object-left transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />

      {/* ── Gradient Overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 md:bg-gradient-to-l md:from-black/90 md:via-black/45 md:to-transparent" />

      {/* ── Vignette ── */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.4)]" />

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex items-end pb-5 px-6 sm:pb-10 sm:px-10 lg:px-20 md:items-end md:justify-end">
        <div className="w-full sm:w-4/5 md:w-1/2 text-white flex flex-col space-y-5 md:space-y-6">
          {/* Accent line */}
          <div className="hero-accent-line h-[3px] w-14 bg-[#37C2CF] rounded-full origin-left" />

          {/* Title with mask reveal */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-[1.15]">
            <span className="block overflow-hidden">
              <span className="hero-title-line block">{t("hero.title1")}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-title-line block text-[#37C2CF]">
                {t("hero.title2")}
              </span>
            </span>
          </h1>

          

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              to="/services"
              className="hero-btn relative text-center text-sm md:text-base cursor-pointer px-6 md:px-7 py-3 md:py-3.5 bg-[#37C2CF] text-white font-semibold rounded-xl 
              overflow-hidden group transition-all duration-300 shadow-lg shadow-[#37C2CF]/20 hover:shadow-xl hover:shadow-[#37C2CF]/35 hover:scale-[1.03]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("hero.cta1")}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition duration-500 ease-out" />
            </Link>

            <Link
              to="/contact"
              className="hero-btn relative text-center text-sm md:text-base cursor-pointer px-6 md:px-7 py-3 md:py-3.5 text-white font-semibold rounded-xl 
              transition-all duration-300 border border-white/15 hover:bg-white/10 backdrop-blur-sm hover:border-white/30"
            >
              {t("hero.cta2")}
            </Link>
          </div>

          {/* ── Divider ── */}
          <div className="hero-divider h-px w-full max-w-sm bg-white/10 origin-left" />

          {/* ── Trust Stats ── */}
          <div className="flex items-center gap-5 md:gap-7">
            <div className="hero-stat flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-white">
                <span ref={counter1}>0</span>
                <span className="text-[#37C2CF]">+</span>
              </span>
              <span className="text-[10px] md:text-xs text-white/35 font-medium uppercase tracking-widest">
                {t("hero.stat1")}
              </span>
            </div>

            <div className="hero-stat w-px h-8 bg-white/10" />

            <div className="hero-stat flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-white">
                <span ref={counter2}>0</span>
                <span className="text-[#37C2CF]">+</span>
              </span>
              <span className="text-[10px] md:text-xs text-white/35 font-medium uppercase tracking-widest">
                {t("hero.stat2")}
              </span>
            </div>

            <div className="hero-stat w-px h-8 bg-white/10" />

            <div className="hero-stat flex items-center gap-1.5">
              <MapPin size={14} className="text-[#37C2CF]" />
              <span className="text-[10px] md:text-xs text-white/35 font-medium">
                {t("hero.stat3")}
              </span>
            </div>
          </div>
        </div>
      </div>

     

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.2; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-scrollDot {
          animation: scrollDot 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
