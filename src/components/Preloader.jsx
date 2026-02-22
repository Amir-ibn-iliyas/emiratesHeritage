import { useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";

/* ─── Constants (mirror Hero.jsx) ─── */
const FRAME_COUNT = 80;
const FRAME_PATH = "/emirates-hero/ezgif-frame-";
const padFrame = (n) => String(n).padStart(3, "0");
const getFrameSrc = (i) => `${FRAME_PATH}${padFrame(i + 1)}.jpg`;

const MIN_DISPLAY_MS = 3500;
const STRIP_COUNT = 5;

/* ─── Easing helper ─── */
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* ═══════════════════════════════════════════════════
   PRELOADER — Award-Winning Typographic Loading
   ═══════════════════════════════════════════════════ */
const Preloader = ({ onComplete }) => {
  const { t } = useTranslation();

  /* ── Refs ── */
  const counterRef = useRef(null);
  const percentRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const taglineRef = useRef(null);
  const progressFillRef = useRef(null);
  const progressTrackRef = useRef(null);
  const stripRefs = useRef([]);
  const contentRef = useRef(null);

  /* ── Internal state (no re-renders needed) ── */
  const s = useRef({
    realProgress: 0,
    displayValue: 0,
    currentPhase: 0,
    exiting: false,
    startTime: Date.now(),
    framesLoaded: 0,
    fontsLoaded: false,
  }).current;

  /* ── Phase text transition ── */
  const transitionToPhase = useCallback((phase) => {
    if (s.currentPhase === phase) return;
    const prev = s.currentPhase;
    s.currentPhase = phase;
    const refs = [text1Ref, text2Ref, text3Ref];

    if (prev > 0 && refs[prev - 1]?.current) {
      gsap.to(refs[prev - 1].current, {
        y: "-110%",
        duration: 0.45,
        ease: "power2.in",
      });
    }
    if (refs[phase - 1]?.current) {
      gsap.to(refs[phase - 1].current, {
        y: "0%",
        duration: 0.55,
        ease: "power3.out",
        delay: prev > 0 ? 0.15 : 0,
      });
    }
  }, [s]);

  /* ── Exit sequence ── */
  const playExit = useCallback(() => {
    if (s.exiting) return;
    s.exiting = true;

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete();
      },
    });

    // 1 — Tagline reveal
    tl.to(taglineRef.current, {
      y: "0%",
      duration: 0.5,
      ease: "power3.out",
    });

    // 2 — Progress line glow
    tl.to(progressFillRef.current, {
      boxShadow: "0 0 12px 2px rgba(55,194,207,0.5)",
      duration: 0.3,
    }, "<");

    // 3 — Breathe
    tl.to({}, { duration: 0.6 });

    // 4 — Content exits up
    tl.to(contentRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.45,
      ease: "power3.in",
    });

    // 5 — Progress line fade
    tl.to(progressTrackRef.current, {
      opacity: 0,
      duration: 0.25,
    }, "<");

    // 6 — Strip curtain reveal
    tl.addLabel("strips");
    stripRefs.current.filter(Boolean).forEach((strip, i) => {
      const dir = i % 2 === 0 ? "100%" : "-100%";
      tl.to(strip, {
        x: dir,
        duration: 0.7,
        ease: "power4.inOut",
      }, `strips+=${i * 0.07}`);
    });
  }, [onComplete, s]);

  /* ── Load all assets ── */
  useEffect(() => {
    const recalc = () => {
      const fontPart = s.fontsLoaded ? 15 : 0;
      const framePart = (s.framesLoaded / FRAME_COUNT) * 85;
      s.realProgress = Math.min(Math.round(fontPart + framePart), 100);
    };

    // Fonts
    document.fonts.ready.then(() => {
      s.fontsLoaded = true;
      recalc();
    });

    // Hero frames
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const done = () => { s.framesLoaded++; recalc(); };
      img.onload = done;
      img.onerror = done;
      img.src = getFrameSrc(i);
    }
  }, [s]);

  /* ── Animation loop ── */
  useEffect(() => {
    const counterEl = counterRef.current;
    if (!counterEl) return;

    const initTimer = setTimeout(() => transitionToPhase(1), 400);
    let rafId;

    const loop = () => {
      if (s.exiting) return;

      // Time-gated progress (prevents instant jump on cached assets)
      const elapsed = Date.now() - s.startTime;
      const timeFrac = Math.min(elapsed / MIN_DISPLAY_MS, 1);
      const timeGate = easeInOutCubic(timeFrac) * 100;
      const target = Math.min(s.realProgress, timeGate);

      // Smooth interpolation
      s.displayValue += (target - s.displayValue) * 0.09;
      const val = Math.round(s.displayValue);

      // Update DOM directly (no React re-render)
      counterEl.textContent = val;
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${s.displayValue}%`;
      }

      // Phase transitions
      if (val >= 75 && s.currentPhase < 3) transitionToPhase(3);
      else if (val >= 35 && s.currentPhase < 2) transitionToPhase(2);

      // Exit check: real progress done + display caught up + min time passed
      if (s.realProgress >= 100 && val >= 99 && elapsed >= MIN_DISPLAY_MS) {
        counterEl.textContent = "100";
        s.displayValue = 100;
        if (progressFillRef.current) progressFillRef.current.style.width = "100%";
        playExit();
        return;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(initTimer);
    };
  }, [transitionToPhase, playExit, s]);

  /* ── Lock scroll ── */
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  /* ─── Render ─── */
  return (
    <div className="fixed inset-0 z-200">
      {/* ── Background strips (form solid bg, animate apart on exit) ── */}
      {Array.from({ length: STRIP_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => (stripRefs.current[i] = el)}
          className="absolute left-0 right-0 bg-[#0a1628]"
          style={{
            top: `${i * (100 / STRIP_COUNT)}dvh`,
            height: `calc(${100 / STRIP_COUNT}dvh + 2px)`,
            willChange: "transform",
          }}
        />
      ))}

      {/* ── Content layer ── */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center px-6"
        style={{ height: "100dvh" }}
      >
        {/* Counter */}
        <div className="flex items-baseline select-none">
          <span
            ref={counterRef}
            className="text-white font-light leading-none"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(72px, 14vw, 150px)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            0
          </span>
          <span
            ref={percentRef}
            className="text-white/25 font-light ml-1"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(20px, 3.5vw, 40px)",
            }}
          >
            %
          </span>
        </div>

        {/* Text phrases */}
        <div
          className="relative w-full"
          style={{
            marginTop: "clamp(12px, 2vw, 24px)",
            height: "clamp(52px, 7vw, 70px)",
          }}
        >
          {/* Phase 1: "Your Dream." */}
          <div className="overflow-hidden absolute inset-x-0 top-0" style={{ height: "28px" }}>
            <span
              ref={text1Ref}
              className="block text-white/40 text-center font-light"
              style={{
                transform: "translateY(110%)",
                fontSize: "clamp(13px, 1.4vw, 17px)",
                letterSpacing: "0.2em",
              }}
            >
              {t("preloader.phase1")}
            </span>
          </div>

          {/* Phase 2: "We Build." */}
          <div className="overflow-hidden absolute inset-x-0 top-0" style={{ height: "18px" }}>
            <span
              ref={text2Ref}
              className="block text-white/40 text-center font-light"
              style={{
                transform: "translateY(110%)",
                fontSize: "clamp(13px, 1.4vw, 17px)",
                letterSpacing: "0.2em",
              }}
            >
              {t("preloader.phase2")}
            </span>
          </div>

          {/* Phase 3: "Emirates Heritage" */}
          <div className="overflow-hidden absolute inset-x-0 top-0" style={{ height: "28px" }}>
            <span
              ref={text3Ref}
              className="block text-white/50 text-center font-medium"
              style={{
                transform: "translateY(130%)",
                fontSize: "clamp(13px, 1.4vw, 17px)",
                letterSpacing: "0.2em",
              }}
            >
              {t("preloader.phase3")}
            </span>
          </div>

          {/* Tagline */}
          <div
            className="overflow-hidden absolute inset-x-0"
            style={{ top: "clamp(30px, 4vw, 40px)", height: "24px" }}
          >
            <span
              ref={taglineRef}
              className="block text-white/25 text-center font-light"
              style={{
                transform: "translateY(160%)",
                fontSize: "clamp(10px, 1.1vw, 13px)",
                letterSpacing: "0.12em",
              }}
            >
              {t("preloader.tagline")}
            </span>
          </div>
        </div>
      </div>

      {/* ── Progress line ── */}
      <div
        ref={progressTrackRef}
        className="absolute z-10"
        style={{
          bottom: "clamp(60px, 15dvh, 140px)",
          left: "clamp(24px, 5vw, 80px)",
          right: "clamp(24px, 5vw, 80px)",
        }}
      >
        <div className="h-px bg-white/[0.07] w-full relative overflow-hidden">
          <div
            ref={progressFillRef}
            className="absolute top-0 left-0 h-full bg-[#37C2CF]/80"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
