import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Home, Factory } from "lucide-react";

const categories = {
  Commercial: {
    img: "src/assets/images/commercial.png",
    title: "Commercial",
    desc1:
      "We excel in commercial construction projects, meticulously planning and executing to ensure optimal value and delivery.",
    desc2:
      "Our specialized teams uphold rigorous safety standards and strict regulatory compliance in every build, prioritizing client satisfaction above all. With a proven track record of successful commercial developments, our commitment is to transform your vision into a durable, functional, and profitable reality.",
  },
  Residential: {
    img: "src/assets/images/resisdential.png",
    title: "Residential",
    desc1:
      "We craft unique residential homes, meticulously designing and building the spaces where life's most cherished memories begin and endure.",
    desc2:
      "Our dedicated builders take immense pride in detailed craftsmanship and personalized service, ensuring every corner and fixture meets your exact specifications. Partner with us to turn your architectural vision into a secure, beautiful, and lasting place to call home, built with integrity and trust.",
  },
  Industrial: {
    img: "src/assets/images/industrial.png",
    title: "Industrial",
    desc1:
      "We specialize in large-scale industrial infrastructure, designing and constructing facilities that maximize operational output and long-term durability.",
    desc2:
      "Our engineering expertise guarantees the highest standards of structural integrity and safety across complex manufacturing and logistics centers.With a focus on timely, budget-conscious project delivery, we ensure your critical industrial assets are built for dependable, uninterrupted high performance.",
  },
};
const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("Commercial");

  const current = categories[activeTab];

  return (
    <>
      {/* Focus On Expertise */}

      <section id="about" className="w-screen md:w-full md:px-3 lg:px-10 py-5">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ amount: 0.3 }}
          className="flex flex-col items-center text-center"
        >
          <h1 className="text-xl md:text-4xl lg:text-5xl font-bold">
            Focus on Expertise and Full Scope
          </h1>
          <p className="text-[10px] px-4 md:px-0 md:text-[16px] mt-3 md:w-3/4 lg:w-1/2">
            We provide complete construction, enhancement, and maintenance
            services for residential (Houses, Villas, Pools) and commercial
            (Warehouses, Restaurants) properties.
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
              className={`flex cursor-pointer items-center gap-2 border px-2 md:px-4 py-2 rounded-md text-sm md:text-base transition 
        ${
          activeTab === item.label
            ? "bg-black text-white shadow-md"
            : "bg-white text-black hover:bg-gray-200"
        }`}
            >
              {item.icon}
              {item.label}
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
            key={current.img}
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full  md:w-1/2 cursor-pointer"
          >
            <motion.img
              src={current.img}
              alt={current.title}
              whileHover={{
                scale: 1.02,
                rotate: 1.2,
                translateY: 0.2,
                boxShadow: "0px 15px 40px rgba(0,0,0,0.35)",
              }}
              transition={{
                stiffness: 200,
                damping: 10,
                duration: 0.5, // Added duration as a fallback
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
            className="w-full md:w-1/2 lg:w-2/3  flex flex-col gap-2 mt-4 justify-center md:mt-0"
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-xl md:text-3xl font-bold md:mb-3"
            >
              {current.title}
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-sm lg:w-2/3 md:text-base"
            >
              {current.desc1}
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-sm lg:w-2/3 md:text-base"
            >
              {current.desc2}
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#37C2CF] hover:bg-[#32b4c0] cursor-pointer text-black px-6 py-2 w-fit mt-4 rounded-md"
            >
              Read More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* future section */}
      <section
        className="relative w-screen mb-4  md:w-full bg-cover bg-center py-5 lg:py-10"
        style={{ backgroundImage: "url('/src/assets/images/provide.png')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/10 bg-opacity-50"></div>

        {/* Content Wrapper */}
        <div className="relative max-w-7xl  mx-auto px-4 lg:px-10">
          <div className="   rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row gap-2 md:gap-5">
            {/* LEFT IMAGE */}
            <div className="w-full md:w-1/2">
              <motion.img
                // --- NEW: Entry Animation ---
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.3 }}
                // --- EXISTING: Hover Animation ---
                whileHover={{
                  scale: 1.05,
                  rotate: 1.2,
                  translateY: -2,
                  boxShadow: "0px 15px 40px rgba(0,0,0,0.35)",
                }}
                // --- Transition Settings (Controls speed of both) ---
                transition={{
                  stiffness: 200,
                  damping: 10,
                  duration: 0.5, // Added duration as a fallback
                }}
                src="/src/assets/images/provideleft.jpg"
                className="w-full cursor-pointer md:w-[400px] rounded-lg h-64 md:h-full object-cover"
                alt="construction"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="w-full  rounded-md md:w-2/3 bg-black/40 text-white p-2 lg:p-10 flex flex-col gap-4">
              <h2 className="text-2xl md:text-4xl font-bold text-[#37C2CF]">
                We Provide Your Future
              </h2>

              <p className="leading-relaxed text-sm md:text-base">
                We don’t just plan for tomorrow; we build it. Our expert
                guidance and strategic solutions are designed to transform your
                aspirations into reality, ensuring a clear, confident path
                forward. Navigating complexity is our expertise, securing your
                future is our promise.
              </p>

              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                <li>
                  Sustainable growth and success. Clear Roadmaps: Tailored
                  strategies for rapid, lasting growth.
                </li>
                <li>
                  Future Ready: Innovative solutions that anticipate change.
                </li>
                <li>
                  True Partnership: Dedicated support until your vision is
                  achieved.
                </li>
                <li>
                  Aliquam id ante suscipit. Drive Action: Tools and confidence
                  to master every challenge.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
