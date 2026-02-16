import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();

  return (
    <>
     <section
        id="home"
        className="relative h-[50vh] lg:h-[100vh] overflow-hidden bg-gray-900" 
      >
        
        <img
          src="/heroImage2.webp"
          fetchPriority="high"
          alt="Heritage Background"
          className={`absolute inset-0 w-full h-full object-cover object-left transition-opacity duration-1000 ease-out 
            ${isLoaded ? "opacity-100" : "opacity-0"}`} 
          onLoad={() => setIsLoaded(true)} 
        />

        {/* Gradient Overlay — centered for mobile, right-biased for desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 md:bg-gradient-to-l md:from-black/80 md:via-black/30 md:to-gray-900/70"></div>

        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></span>
          ))}
        </div>

        {/* Content */}
        <div className="relative h-full flex items-end pb-5 px-6 sm:pb-20 sm:px-10 lg:px-20 md:justify-end">
          <div className="w-full sm:w-4/5 md:w-1/2 text-white flex flex-col justify-center space-y-5 md:space-y-6 animate-fadeSlideUp">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
              {t("hero.title1")}
              <br />
              {t("hero.title2")}
            </h1>

            {/* Two CTA Buttons */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Our Services Button */}
              <Link
                to="/services"
                className="relative text-center text-sm md:text-lg cursor-pointer px-6 md:px-7 py-3 md:py-3.5 bg-[#37C2CF] text-white font-semibold rounded-xl 
                overflow-hidden group transition duration-300"
              >
                <span className="relative z-10">{t("hero.cta1")}</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition duration-500 ease-out"></div>
              </Link>

              {/* Contact Us CTA Button */}
              <Link
                to="/contact"
                className="relative text-center text-sm md:text-lg cursor-pointer px-6 md:px-7 py-3 md:py-3.5 bg-white/10 text-white font-semibold rounded-xl 
                overflow-hidden group transition duration-300 border border-white/25 hover:bg-white/20 backdrop-blur-sm"
              >
                <span className="relative z-10">{t("hero.cta2")}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Custom Animations */}
        <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(25px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlideUp {
          animation: fadeSlideUp 1.4s ease-out forwards;
        }

        @keyframes float {
          0% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-20px); opacity: 0.8; }
          100% { transform: translateY(0px); opacity: 0.4; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
      </section>
    </>
  );
};

export default Hero;
