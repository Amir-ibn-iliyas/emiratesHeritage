import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */
const FRAME_COUNT = 80;
const FRAME_PATH = "/emirates-hero/ezgif-frame-";
const SCRUB_SMOOTHING = 1.5;

const padFrame = (n) => String(n).padStart(3, "0");
const getFrameSrc = (i) => `${FRAME_PATH}${padFrame(i + 1)}.jpg`;

/* ─────────────────────────────────────────────
   Hero Component — 3-Act Mask-Reveal Storytelling
   ───────────────────────────────────────────── */
const Hero = () => {
  const { t } = useTranslation();

  // ── Core canvas refs ──
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const imagesRef = useRef([]);
  const frameIndexRef = useRef(0);
  const hasDrawnRef = useRef(false);

  // ── Act container refs ──
  const act1Ref = useRef(null);
  const act2Ref = useRef(null);
  const act3Ref = useRef(null);
  const scrollIndicatorRef = useRef(null);

  /* ─────────────────────────────────────────
     drawFrame — COVER fit on ALL devices
     ───────────────────────────────────────── */
  const drawFrame = useCallback((index) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || !img.naturalWidth) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Always cover — fills screen on all devices
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  /* ─────────────────────────────────────────
     setCanvasSize
     ───────────────────────────────────────── */
  const setCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = stickyRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    drawFrame(frameIndexRef.current);
  }, [drawFrame]);

  /* ─────────────────────────────────────────
     useEffect #1 — Preload frames
     ───────────────────────────────────────── */
  useEffect(() => {
    const images = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      if (i === 0) {
        img.onload = () => {
          if (!hasDrawnRef.current && ctxRef.current) {
            drawFrame(0);
            hasDrawnRef.current = true;
          }
        };
      }
      img.src = getFrameSrc(i);
      images.push(img);
    }
    imagesRef.current = images;
    return () => { imagesRef.current = []; };
  }, [drawFrame]);

  /* ─────────────────────────────────────────
     useEffect #2 — GSAP Mask-Reveal Animations

     Timeline (200vh scroll = 0% to 100%):
     ─────────────────────────────────────────
     0-3%   : Act 1 lines reveal (stagger)
     3-8%   : Act 1 fully visible
     8-15%  : Act 1 lines exit (stagger)
     18-23% : Act 2 lines reveal (stagger)
     23-38% : Act 2 fully visible
     38-45% : Act 2 lines exit (stagger)
     50-60% : Act 3 elements reveal (stagger)
     60-100%: Act 3 stays visible (final state)
     ───────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      willReadFrequently: false,
    });
    ctxRef.current = ctx;
    setCanvasSize();

    const firstImg = imagesRef.current[0];
    if (firstImg?.complete && firstImg?.naturalWidth) {
      drawFrame(0);
      hasDrawnRef.current = true;
    }

    const gsapCtx = gsap.context(() => {

      /* ── Frame scrubbing ── */
      const animObj = { frame: 0 };
      gsap.to(animObj, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: SCRUB_SMOOTHING,
        },
        onUpdate: () => {
          const newFrame = Math.round(animObj.frame);
          if (newFrame !== frameIndexRef.current) {
            frameIndexRef.current = newFrame;
            drawFrame(newFrame);
          }
        },
      });

      // Helper: select all .mask-line children inside a container
      const getLines = (ref) => ref.current?.querySelectorAll(".mask-line") || [];

      /* ═══════════════════════════════════════════════
         ACT 1: "Your Dream" — LEFT SIDE
         Time-based entrance + scroll-based exit
         
         Timeline:
         • On load (0.4s delay): lines slide up into view
         • 12-16%: lines slide out upward
         • 16-17%: container fades out
         ═══════════════════════════════════════════════ */

      // Time-based entrance — plays automatically after mount
      const act1Enter = gsap.timeline({ delay: 0.4 });
      act1Enter.set(act1Ref.current, { opacity: 1 });
      act1Enter.fromTo(getLines(act1Ref),
        { y: "110%", rotateX: 8 },
        {
          y: "0%",
          rotateX: 0,
          ease: "power3.out",
          stagger: 0.18,
          duration: 0.9,
        }
      );

      // Lines exit — fromTo ensures clean reversal on scroll-back
      gsap.fromTo(getLines(act1Ref),
        { y: "0%", rotateX: 0 },
        {
          y: "-110%",
          rotateX: -5,
          ease: "power2.in",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "16% top",
            end: "18% top",
            scrub: true,
          },
        }
      );

      // Container fade-out
      gsap.fromTo(act1Ref.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "18% top",
            end: "19% top",
            scrub: true,
          },
        }
      );

      /* ═══════════════════════════════════════════════
         ACT 2: "We Build" — RIGHT SIDE
         All fromTo for clean scroll reversal
         
         Timeline:
         • 17-18%: container fades in
         • 18-24%: lines slide up into view
         • 24-34%: visible (breathing room)
         • 34-38%: lines slide out upward
         • 38-39%: container fades out
         ═══════════════════════════════════════════════ */

      // Container fade-in
      gsap.fromTo(act2Ref.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "17% top",
            end: "18% top",
            scrub: true,
          },
        }
      );

      // Lines reveal (staggered)
      gsap.fromTo(getLines(act2Ref),
        { y: "110%", rotateX: 8 },
        {
          y: "0%",
          rotateX: 0,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "18% top",
            end: "24% top",
            scrub: true,
          },
        }
      );

      // Lines exit — fromTo for proper reversal
      gsap.fromTo(getLines(act2Ref),
        { y: "0%", rotateX: 0 },
        {
          y: "-110%",
          rotateX: -5,
          ease: "power2.in",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "34% top",
            end: "40% top",
            scrub: true,
          },
        }
      );

      // Container fade-out
      gsap.fromTo(act2Ref.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "41% top",
            end: "42% top",
            scrub: true,
          },
        }
      );

      /* ═══════════════════════════════════════════════
         ACT 3: "Emirates Heritage" — CENTER-BOTTOM
         Grand reveal, stays visible as final state
         
         Timeline:
         • 39-40%: container fades in
         • 40-48%: lines slide up (staggered reveal)
         • 48-100%: stays visible (final state)
         ═══════════════════════════════════════════════ */

      // Container fade-in
      gsap.fromTo(act3Ref.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "39% top",
            end: "40% top",
            scrub: true,
          },
        }
      );

      // Lines reveal (staggered)
      gsap.fromTo(getLines(act3Ref),
        { y: "110%", rotateX: 8 },
        {
          y: "0%",
          rotateX: 0,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "40% top",
            end: "48% top",
            scrub: true,
          },
        }
      );

      // Act 3 stays visible — no exit animation (final state)

      /* ── Scroll indicator fade-out ── */
      gsap.fromTo(scrollIndicatorRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: 10,
          ease: "power2.in",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "3% top",
            scrub: true,
          },
        }
      );

    }, sectionRef);

    return () => gsapCtx.revert();
  }, [drawFrame, setCanvasSize]);

  /* ─────────────────────────────────────────
     useEffect #3 — Resize handler
     ───────────────────────────────────────── */
  useEffect(() => {
    const container = stickyRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(setCanvasSize);
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [setCanvasSize]);

  /* ─────────────────────────────────────────
     useEffect #4 — Mouse parallax (desktop only)
     Text layers shift subtly opposite to cursor
     for a 3D depth illusion
     ───────────────────────────────────────── */
  useEffect(() => {
    // Only on devices with a fine pointer (mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const container = stickyRef.current;
    if (!container) return;

    const INTENSITY = { act: 12, indicator: 4 };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;   // -1 to +1
      const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;   // -1 to +1

      // Parallax — shift text opposite to mouse direction
      const targets = [act1Ref.current, act2Ref.current, act3Ref.current].filter(Boolean);
      targets.forEach((el) => {
        gsap.to(el, {
          x: dx * -INTENSITY.act,
          y: dy * -(INTENSITY.act * 0.65),
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      // Scroll indicator — barely moves (grounded feel)
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          x: dx * -INTENSITY.indicator,
          y: dy * -(INTENSITY.indicator * 0.75),
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const onMouseLeave = () => {
      const targets = [act1Ref.current, act2Ref.current, act3Ref.current, scrollIndicatorRef.current].filter(Boolean);
      targets.forEach((el) => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  /* ─────────────────────────────────────────
     Render — Mask Reveal Structure

     Each text line is:
       <div class="overflow-hidden">         ← THE MASK
         <span class="mask-line block">      ← SLIDES UP
           Text content
         </span>
       </div>
     ───────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative z-0 h-[500vh] bg-[#0a1628]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden"
      >
        {/* ── Canvas ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "transform" }}
        />

        {/* ── Gradient Overlay ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

        {/* ── Vignette ── */}
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.5)]" />

        {/* ── Scroll Indicator ── */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5"
        >
          <div className="relative w-px h-9 sm:h-11 bg-white/15 rounded-full overflow-hidden">
            <div
              className="scroll-dot absolute w-[3px] h-[3px] rounded-full left-1/2 -translate-x-1/2"
              style={{
                background: "#37C2CF",
                boxShadow: "0 0 6px 1px rgba(55,194,207,0.6)",
              }}
            />
          </div>
          <span
            className="text-white/20 font-light tracking-[0.2em] uppercase"
            style={{ fontSize: "clamp(8px, 1vw, 10px)" }}
          >
            {t("hero.scroll")}
          </span>
        </div>

        {/* ═══════════════════════════════════════
           ACT 1: "You Dream" — LEFT SIDE
           Line-by-line mask reveal
           ═══════════════════════════════════════ */}
        <div
          ref={act1Ref}
          className="absolute inset-0 z-10 flex items-center px-5 sm:px-10 lg:px-20"
          style={{ opacity: 0 }}
        >
          <div style={{ perspective: "800px" }}>
            {/* Line 1: Accent */}
            <div className="overflow-hidden mb-4 md:mb-6">
              <div
                className="mask-line h-[3px] w-14 bg-[#37C2CF] rounded-full"
                
              />
            </div>

            {/* Line 2: "You" */}
            <div className="overflow-hidden">
              <span
                className="mask-line block text-3xl sm:text-5xl  font-bold text-white "
                
              >
                {t("hero.act1Title") || "Your"}
              </span>
            </div>

            

            {/* Line 4: Subtitle */}
            <div className="overflow-hidden mt-1">
              <span
                className="mask-line block text-sm sm:text-base text-white/50 font-light leading-relaxed max-w-xs sm:max-w-sm"
                
              >
                {t("hero.act1Sub")}
              </span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
           ACT 2: "We Build" — RIGHT SIDE
           Line-by-line mask reveal
           ═══════════════════════════════════════ */}
        <div
          ref={act2Ref}
          className="absolute inset-0 z-10 flex items-center justify-end px-5 sm:px-10 lg:px-20"
          style={{ opacity: 0 }}
        >
          <div className="text-right" style={{ perspective: "800px" }}>
            {/* Line 1: Accent */}
            <div className="overflow-hidden mb-4 md:mb-6 flex justify-end">
              <div
                className="mask-line h-[3px] w-14 bg-[#37C2CF] rounded-full"
                
              />
            </div>

            {/* Line 2: "We" */}
            <div className="overflow-hidden">
              <span
                className="mask-line block text-3xl sm:text-5xl font-black text-white leading-[1.05] tracking-tight"
                  
              >
                {t("hero.act2Title")|| "We"}
              </span>
            </div>

           

            {/* Line 4: Subtitle */}
            <div className="overflow-hidden mt-1">
              <span
                className="mask-line block text-sm sm:text-base  text-white/50 font-light leading-relaxed max-w-xs sm:max-w-sm ml-auto"
                
              >
                {t("hero.act2Sub")}
              </span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
           ACT 3: "Emirates Heritage" — CENTER-BOTTOM
           Grand reveal — final resting state
           ═══════════════════════════════════════ */}
        <div
          ref={act3Ref}
          className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-10 text-center px-5 sm:px-8"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center" style={{ perspective: "800px" }}>
            {/* Line 1: Accent */}
            <div className="overflow-hidden mb-3 md:mb-5">
              <div
                className="mask-line h-[3px] w-14 md:w-20 bg-[#37C2CF] rounded-full"
                
              />
            </div>

            {/* Line 2: "Emirates" */}
            <div className="overflow-hidden">
              <span
                className="mask-line block text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight"
                
              >
                {t("hero.act3Brand") || "Emirates"}
              </span>
            </div>

            

            {/* Line 4: Tagline */}
            <div className="overflow-hidden mt-1">
              <span
                className="mask-line block text-xs sm:text-sm md:text-base lg:text-lg text-white/40 font-light"
                
              >
                {t("hero.act3Tagline")}
              </span>
            </div>

            {/* Line 5: CTA Buttons */}
            <div className="overflow-hidden mt-4 md:mt-6">
              <div
                className="mask-line flex items-center gap-2.5 sm:gap-3 md:gap-4"
                
              >
                <Link
                  to="/services"
                  className="relative text-center text-xs sm:text-sm md:text-base cursor-pointer px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 bg-[#37C2CF] text-white font-semibold rounded-xl 
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
                  className="relative text-center text-xs sm:text-sm md:text-base cursor-pointer px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 text-white font-semibold rounded-xl 
                  transition-all duration-300 border border-white/15 hover:bg-white/10 backdrop-blur-sm hover:border-white/30"
                >
                  {t("hero.cta2")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
