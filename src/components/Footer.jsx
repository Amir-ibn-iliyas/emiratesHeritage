import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Phone,
  Mail,
  MapPin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative bg-[#37C2CF] text-slate-900 pt-20 pb-10 font-sans glow-border"
    >
      {/* Floating sparks */}
      <SparkParticles />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main content */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-0">
          {/* LEFT AREA */}
          <div className="lg:w-5/12">
            <motion.p
              initial={fadeHidden}
              whileInView={fadeShow}
              transition={{ duration: 0.3 }}
              className="text-slate-800 leading-relaxed text-base mb-8 font-medium max-w-md"
            >
              Denouncing pleasure and praising pain was born and I will give you
              a complete account of the system, and expound the actual.
            </motion.p>

            {/* SOCIAL ICONS */}
            <motion.div
              className="flex gap-4"
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
            >
              <SocialIcon
                icon={<Instagram size={20} />}
                link="https://www.instagram.com/emirates0heritage/?e=c3471909-161f-4ddf-8cd1-eadb4af1790c&g=5"
              />
              <SocialIcon
                icon={<Facebook size={20} />}
                link="https://www.instagram.com/emirates0heritage/?e=c3471909-161f-4ddf-8cd1-eadb4af1790c&g=5"
              />
              <SocialIcon
                icon={<Twitter size={20} />}
                link="https://www.instagram.com/emirates0heritage/?e=c3471909-161f-4ddf-8cd1-eadb4af1790c&g=5"
              />
              <SocialIcon
                icon={<MapPin size={20} />}
                link="https://www.instagram.com/emirates0heritage/?e=c3471909-161f-4ddf-8cd1-eadb4af1790c&g=5"
              />
            </motion.div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-slate-800/30 mx-8 opacity-70"></div>

          {/* RIGHT LINKS */}
          <motion.div
            className="lg:w-5/12 flex gap-12 sm:gap-24"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.div variants={fadeUp}>
              <h3 className="font-bold text-lg text-black mb-2">Explore</h3>
              <FooterLink text="About Us" to="/#about" />
              <FooterLink text="Gallery" to="/#gallery" />
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="font-bold text-lg text-black mb-2">Quick Links</h3>
              <FooterLink text="Services" to="/services" />
              <FooterLink text="Contact Us" to="/contact" />
              <FooterLink text="Get a Quote" to="/contact" />
            </motion.div>
          </motion.div>
        </div>

        {/* Line Separator with line-draw animation */}
        <motion.div
          className="h-px w-full bg-slate-800/20 my-12"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1 }}
        />

        {/* CONTACT INFO */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 px-0 md:px-4"
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <ContactItem
            icon={<Mail size={20} />}
            label="Mail Us"
            value="EmiratesHeritage@gmail.com"
          />
          <ContactItem
            icon={<Phone size={20} />}
            label="Call Us"
            value="+971 50 319 5090"
          />
          <ContactItem
            icon={<MapPin size={20} />}
            label="Location"
            value="Abu Dhabi"
          />
        </motion.div>

        {/* COPYRIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mt-16 text-sm font-semibold text-slate-800"
        >
           Emirates Heritage © {year}. All Rights Reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
};

/* ---------- PARTICLES COMPONENT ---------- */
const SparkParticles = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="spark"
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
    </>
  );
};

/* ---------- ANIMATION VARIANTS ---------- */
const fadeHidden = { opacity: 0, y: 20, filter: "blur(6px)" };
const fadeShow = { opacity: 1, y: 0, filter: "blur(0)" };

const fadeUp = {
  hidden: fadeHidden,
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/* ---------- SOCIAL ICON ---------- */
const SocialIcon = ({ icon, link }) => (
  <motion.a
    href={link} // 1. The Link
    target="_blank"
    rel="noopener noreferrer"
    variants={fadeUp}
    whileHover={{
      scale: 1.1,
      rotate: 5,
      boxShadow: "0 0 15px rgba(255,255,255,0.7)",
    }}
    animate={{ y: [0, -4, 0] }}
    transition={{ duration: 0.2, ease: "easeInOut" }}
    className="w-10 h-10 bg-black text-[#37C2CF] cursor-pointer rounded-full flex items-center justify-center"
  >
    {icon}
  </motion.a>
);

/* ---------- FOOTER LINK + LINE DRAW ---------- */
const FooterLink = ({ text, to }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ x: 4 }}
    transition={{ duration: 0.2 }}
  >
    <Link
      to={to}
      className="relative flex flex-col text-slate-800 font-medium hover:text-black"
    >
      {text}
    </Link>
  </motion.div>
);

/* ---------- CONTACT ITEM ---------- */
const ContactItem = ({ icon, label, value }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ scale: 1.02 }}
    className="flex items-center gap-4 cursor-pointer"
  >
    <motion.div
      whileHover={{ scale: 1.02, rotate: 10 }}
      className="w-12 h-12 bg-black text-[#37C2CF] rounded-full flex items-center justify-center shadow-md"
    >
      {icon}
    </motion.div>

    <div className="flex flex-col">
      <span className="font-bold text-black text-sm">{label}</span>
      <span className="text-slate-800 font-medium text-sm">{value}</span>
    </div>
  </motion.div>
);

export default Footer;
