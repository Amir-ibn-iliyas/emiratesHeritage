import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Home, Factory } from "lucide-react";
import { useTranslation } from "react-i18next";
import commercialImg from "../assets/images/commercial.webp";
import residentialImg from "../assets/images/resisdential.webp";
import industrialImg from "../assets/images/industrial.webp";
import provideLeftImg from "../assets/images/featleft.webp";
import provideBgImg from "../assets/images/provide.webp";

const categoryImages = {
  Commercial: commercialImg,
  Residential: residentialImg,
  Industrial: industrialImg,
};

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("Residential");
  const { t } = useTranslation();

  // Translation keys mapped to tab keys
  const tabKey = activeTab.toLowerCase(); // "residential", "commercial", "industrial"

  return (
    <div className="relative z-10 bg-white rounded-t-2xl md:rounded-t-[2rem] shadow-[0_-20px_60px_rgba(0,0,0,0.3)] -mt-[100vh]">
      <section id="about" className="w-screen md:w-full md:px-3 lg:px-10 py-8 pt-10 md:pt-14">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ amount: 0.3 }}
          className="flex flex-col items-center text-center"
        >
          <h1 className="text-xl md:text-4xl text-slate-800 lg:text-5xl font-bold">
            {t("about.title")}
          </h1>
          <p className="text-[10px] text-slate-600 px-4 md:px-0 md:text-[16px] mt-3 md:w-3/4 lg:w-1/2">
            {t("about.subtitle")}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="flex justify-center gap-1 md:gap-6 mt-6"
        >
          {[
            { label: "Commercial", icon: <Building2 size={16} /> },
            { label: "Residential", icon: <Home size={16} /> },
            { label: "Industrial", icon: <Factory size={16} /> },
          ].map((item) => (
            <motion.button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex cursor-pointer text-slate-700 items-center gap-2 border px-2 md:px-4 py-2 rounded-md text-sm md:text-base transition 
        ${
          activeTab === item.label
            ? "bg-black text-white shadow-md"
            : "bg-white text-black hover:bg-gray-200"
        }`}
            >
              {item.icon}
              {t(`about.tabs.${item.label.toLowerCase()}`)}
            </motion.button>
          ))}
        </motion.div>

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ amount: 0.3 }}
          className="mt-5 w-full md:gap-10 lg:gap-20   md:flex md:justify-between rounded-lg shadow-md p-4  lg:p-10 lg:px-40"
        >
          {/* Image */}
          <motion.div
            key={categoryImages[activeTab]}
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full  md:w-1/2 cursor-pointer"
          >
            <motion.img
              src={categoryImages[activeTab]}
              alt={t(`about.${tabKey}.title`)}
              whileHover={{
                scale: 1.02,
                rotate: 1.2,
                translateY: 0.2,
                boxShadow: "0px 15px 40px rgba(0,0,0,0.35)",
              }}
              transition={{
                stiffness: 200,
                damping: 10,
                duration: 0.5,
              }}
              className="h-56  w-full  md:w-[400px] md:h-[360px] object-cover rounded-md"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
            className="w-full md:w-1/2 lg:w-2/3 text-slate-700 flex flex-col gap-2 mt-4 justify-center md:mt-0"
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-xl md:text-3xl font-bold md:mb-3"
            >
              {t(`about.${tabKey}.title`)}
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-sm lg:w-2/3 md:text-base"
            >
              {t(`about.${tabKey}.desc1`)}
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-sm lg:w-2/3 md:text-base"
            >
              {t(`about.${tabKey}.desc2`)}
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Provide Your Future section */}
      <section
        className="relative w-screen mb-4  md:w-full bg-cover bg-center py-5 lg:py-10"
        style={{ backgroundImage: `url(${provideBgImg})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/10 bg-opacity-50"></div>

        {/* Content Wrapper */}
        <div className="relative max-w-7xl  mx-auto px-4 lg:px-10">
          <div className="   rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row gap-2 md:gap-5">
            {/* LEFT IMAGE */}
            <div className="w-full md:w-1/2">
              <motion.img
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.3 }}
                whileHover={{
                  scale: 1.05,
                  rotate: 1.2,
                  translateY: -2,
                  boxShadow: "0px 15px 40px rgba(0,0,0,0.35)",
                }}
                transition={{
                  stiffness: 200,
                  damping: 10,
                  duration: 0.5,
                }}
                src={provideLeftImg}
                className="w-full cursor-pointer md:w-[400px] rounded-lg h-64 md:h-full object-cover"
                alt="construction"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="w-full rounded-md md:w-2/3 bg-black/45 text-white/90 p-4 lg:p-10 flex flex-col gap-4">
              <h2 className="text-2xl md:text-4xl font-bold text-[#37C2CF]">
                {t("provide.title")}
              </h2>

              <p className="leading-relaxed text-sm md:text-base">
                {t("provide.desc")}
              </p>

              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                <li>{t("provide.point1")}</li>
                <li>{t("provide.point2")}</li>
                <li>{t("provide.point3")}</li>
                <li>{t("provide.point4")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
