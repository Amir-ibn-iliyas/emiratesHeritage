import { useState } from "react";
import heroImage from "../assets/images/heroImage2.webp";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
     <section
        id="home"
        className="relative h-[30vh] md:h-[40vh] lg:h-[90vh] overflow-hidden bg-gray-900" 
      >
        
        <img
          src={heroImage}
          fetchPriority="high"
          alt="Heritage Background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out 
            ${isLoaded ? "opacity-100" : "opacity-0"}`} 
          onLoad={() => setIsLoaded(true)} 
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/30 to-gray-900/70"></div>

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
        <div className="relative h-full flex items-center justify-end pl-44 sm:px-10 lg:px-20">
          <div className="w-full sm:w-4/5 md:w-1/2  text-white flex flex-col justify-center space-y-4 md:space-y-6 animate-fadeSlideUp">
            <h1 className="text-lg sm:text-4xl  lg:text-6xl font-bold leading-snug md:leading-tight">
              Professional Quality.
              <br />
              Effortless Service.
            </h1>

            <button
              className="relative w-28 sm:w-40 md:w-48 text-xs sm:text-sm md:text-xl cursor-pointer px-3 md:px-5 py-2 md:py-3 bg-[#37C2CF] text-white font-semibold rounded-lg 
            overflow-hidden group transition duration-300"
            >
              <a
                href="#service"
                className="relative z-10"
                onClick={(e) => {
                  e.preventDefault(); // 1. Stops the browser from jumping instantly
                  const element = document.getElementById("service");
                  if (element) {
                    // 2. Smoothly scrolls to the element
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Our Services
              </a>

              {/* Sweep animation */}
              <div className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition duration-500 ease-out"></div>

              {/* Glow hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-[#37C2CF] blur-2xl"></div>
            </button>
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
