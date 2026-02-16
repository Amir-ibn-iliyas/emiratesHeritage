import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Send } from "lucide-react";

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, type: "spring", stiffness: 200 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

const ContactForm = () => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = t("contact.validation.nameRequired");
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10,15}$/;

    const hasEmail = formData.email.trim().length > 0;
    const hasPhone = formData.phone.trim().length > 0;

    // At least one of email or phone is required
    if (!hasEmail && !hasPhone) {
      newErrors.email = t("contact.validation.emailOrPhone");
      newErrors.phone = t("contact.validation.emailOrPhone");
      isValid = false;
    } else {
      // If email is filled, validate format
      if (hasEmail && !emailPattern.test(formData.email)) {
        newErrors.email = t("contact.validation.emailInvalid");
        isValid = false;
      }
      // If phone is filled, validate format
      if (hasPhone && !phonePattern.test(formData.phone)) {
        newErrors.phone = t("contact.validation.phoneInvalid");
        isValid = false;
      }
    }

    if (!formData.description.trim() || formData.description.length < 10) {
      newErrors.description = t("contact.validation.messageMin");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);

    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(
        () => {
          setFormData({ name: "", email: "", phone: "", description: "" });
          setErrors({});
          setIsSending(false);
          setShowSuccessPopup(true);
          setTimeout(() => setShowSuccessPopup(false), 5000);
        },
        (error) => {
          console.log(error.text);
          alert(t("contact.error"));
          setIsSending(false);
        }
      );
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 md:p-9 relative overflow-hidden">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#37C2CF]" />

        <h3 className="text-xl font-bold text-[#0f172a] mb-1">
          {t("contact.form.heading")}
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          {t("contact.form.subheading")}
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="sr-only">{t("contact.form.name")}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("contact.form.name")}
              dir="auto"
              className={`w-full p-3.5 rounded-xl bg-[#f8fafb] text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 transition-all duration-200 border ${
                errors.name
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-100 focus:border-[#37C2CF] focus:ring-[#37C2CF]/20"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>
            )}
          </div>

          {/* Email & Phone row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="email" className="sr-only">{t("contact.form.email")}</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("contact.form.email")}
                dir="auto"
                className={`w-full p-3.5 rounded-xl bg-[#f8fafb] text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 transition-all duration-200 border ${
                  errors.email
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-100 focus:border-[#37C2CF] focus:ring-[#37C2CF]/20"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="phone" className="sr-only">{t("contact.form.phone")}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("contact.form.phone")}
                dir="ltr"
                className={`w-full p-3.5 rounded-xl bg-[#f8fafb] text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 transition-all duration-200 border ${
                  errors.phone
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-100 focus:border-[#37C2CF] focus:ring-[#37C2CF]/20"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="sr-only">{t("contact.form.description")}</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={t("contact.form.description")}
              rows="5"
              dir="auto"
              className={`w-full p-3.5 rounded-xl bg-[#f8fafb] text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 transition-all duration-200 border resize-none ${
                errors.description
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-100 focus:border-[#37C2CF] focus:ring-[#37C2CF]/20"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSending}
            className={`w-full p-3.5 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2
              ${isSending
                ? "bg-gray-200 cursor-not-allowed text-gray-400"
                : "bg-[#37C2CF] text-white hover:bg-[#2eb3bf] cursor-pointer hover:shadow-lg hover:shadow-[#37C2CF]/25"
              }`}
          >
            {isSending ? t("contact.form.sending") : t("contact.form.submit")}
            {!isSending && <Send size={16} />}
          </button>
        </form>
      </div>

      {/* ─── Success Popup ─── */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#37C2CF]" />

              <div className="mx-auto w-16 h-16 bg-[#37C2CF]/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#37C2CF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">{t("contact.success.title")}</h3>
              <p className="text-gray-500 mb-6 text-sm">{t("contact.success.message")}</p>

              <button
                onClick={() => setShowSuccessPopup(false)}
                className="w-full bg-[#37C2CF] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#2eb3bf] transition-colors"
              >
                {t("contact.success.done")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactForm;