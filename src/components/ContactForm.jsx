import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const fadeInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, type: "spring", stiffness: 200 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
};

const ContactForm = () => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});
  
  // NEW: State to control the Success Popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  // --- VALIDATION LOGIC ---
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    const phonePattern = /^[0-9]{10,15}$/;
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (digits only)";
      isValid = false;
    }

    if (!formData.description.trim() || formData.description.length < 10) {
      newErrors.description = "Message must be at least 10 characters";
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

    // ENV variables
    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(
        (result) => {
          // Success Logic
          setFormData({ name: "", email: "", phone: "", description: "" });
          setErrors({});
          setIsSending(false);
          setShowSuccessPopup(true); // <--- TRIGGER THE POPUP HERE
          
          // Auto-close popup after 5 seconds (optional)
          setTimeout(() => setShowSuccessPopup(false), 5000);
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send message. Please try again."); // Keep alert for errors only
          setIsSending(false);
        }
      );
  };

  // Helper for Input Styles
  const getInputClass = (errorKey) => `
    w-full p-4 rounded-xl bg-white text-gray-800 placeholder-gray-500
    focus:outline-none focus:ring-2 transition-all duration-300 shadow-sm text-base
    ${errorKey 
      ? "border-2 border-red-500 focus:border-red-500 focus:ring-red-200" 
      : "focus:border-sky-400 focus:ring-sky-200" 
    }
  `;

  return (
    <>
      {/* MAIN FORM SECTION */}
      <motion.div
        variants={fadeInLeft}
        initial="hidden"
        whileInView="visible"
        className="w-full lg:w-1/2 p-6 md:p-10 bg-[#37C2CF] shadow-xl relative"
      >
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="sr-only">Your Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className={getInputClass(errors.name)} />
            {errors.name && <p className="text-red-600 text-xs mt-1 font-bold bg-white/80 inline-block px-2 rounded">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className={getInputClass(errors.email)} />
            {errors.email && <p className="text-red-600 text-xs mt-1 font-bold bg-white/80 inline-block px-2 rounded">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className={getInputClass(errors.phone)} />
            {errors.phone && <p className="text-red-600 text-xs mt-1 font-bold bg-white/80 inline-block px-2 rounded">{errors.phone}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="sr-only">Service Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Service Description" rows="5" className={getInputClass(errors.description)}></textarea>
            {errors.description && <p className="text-red-600 text-xs mt-1 font-bold bg-white/80 inline-block px-2 rounded">{errors.description}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSending}
            className={`w-full p-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md
              ${isSending 
                ? "bg-gray-600 cursor-not-allowed text-gray-200" 
                : "bg-black text-white hover:bg-gray-800 cursor-pointer hover:scale-[1.02]"}`}
          >
            {isSending ? "Sending..." : "Submit Request"}
          </button>
        </form>
      </motion.div>

      {/* --- SUCCESS POPUP MODAL --- */}
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
              {/* Decorative Top Bar */}
              <div className="absolute top-0 left-0 w-full h-2 bg-[#37C2CF]"></div>

              {/* Success Icon (SVG) */}
              <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#37C2CF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out. We have received your inquiry and will get back to you shortly.
              </p>

              <button
                onClick={() => setShowSuccessPopup(false)}
                className="w-full bg-[#37C2CF] text-white font-bold py-3 px-4 rounded-xl hover:bg-teal-600 transition-colors shadow-lg"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactForm;