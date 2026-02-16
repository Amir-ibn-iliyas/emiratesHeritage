import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Phone,
      label: t("contact.info.phone"),
      value: "+971 50 319 5090",
      href: "tel:+971503195090",
    },
    {
      icon: Mail,
      label: t("contact.info.email"),
      value: "EmiratesHeritage@gmail.com",
      href: "mailto:EmiratesHeritage@gmail.com",
    },
    {
      icon: MapPin,
      label: t("contact.info.location"),
      value: "Abu Dhabi, UAE",
      href: null,
    },
    {
      icon: Clock,
      label: t("contact.info.hours"),
      value: t("contact.info.hoursValue"),
      href: null,
    },
  ];

  return (
    <div className="bg-[#f8fafb] min-h-screen">
      {/* ─── Header ─── */}
      <div className="bg-[#0a1628] pt-28 pb-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-white tracking-tight"
        >
          {t("contact.pageTitle")}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-[#37C2CF] origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-white/40 text-sm md:text-base max-w-xl mx-auto"
        >
          {t("contact.pageSubtitle")}
        </motion.p>
      </div>

      {/* ─── Content ─── */}
      <div className="max-w-6xl  mx-auto px-5 md:px-10 py-10">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">

          {/* ── Left: Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full lg:w-7/12"
          >
            <ContactForm />
          </motion.div>

          {/* ── Right: Contact Info Cards ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-5/12 space-y-2"
          >
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              const Wrapper = item.href ? "a" : "div";
              const wrapperProps = item.href
                ? { href: item.href, target: item.href.startsWith("mailto") ? undefined : "_blank", rel: "noopener noreferrer" }
                : {};

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                >
                  <Wrapper
                    {...wrapperProps}
                    className={`group flex items-center gap-4 p-5 h-[65px] bg-white rounded-2xl border border-gray-100 hover:border-[#37C2CF]/20 hover:shadow-lg hover:shadow-[#37C2CF]/5 transition-all duration-300 ${
                      item.href ? "cursor-pointer" : ""
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#37C2CF]/10 flex items-center justify-center shrink-0 group-hover:bg-[#37C2CF] transition-colors duration-300">
                      <Icon
                        size={20}
                        className="text-[#37C2CF] group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-[#0f172a] font-semibold text-sm mt-0.5">
                        {item.value}
                      </p>
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })}

            {/* Map embed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="rounded-2xl overflow-hidden border border-gray-100 h-48"
            >
              <iframe
                title="Emirates Heritage Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232715.83849920446!2d54.3470!3d24.4539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e440f723ef2b9%3A0xc3c9a3a02fee5b20!2sAbu%20Dhabi!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "180px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
