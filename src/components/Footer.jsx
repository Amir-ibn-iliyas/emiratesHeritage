import React from "react";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";
import Logo from "../assets/images/logo.png";

const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0a1628]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10">

        {/* Brand + Tagline + Social */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Emirates Heritage" className="w-8 h-8 object-contain" />
            <div>
              <span className="text-white font-semibold text-base block">Emirates Heritage</span>
              <span className="text-white/30 text-xs">{t("footer.tagline")}</span>
            </div>
          </div>

          <a
            href="https://www.instagram.com/emirates0heritage/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <Instagram size={16} />
          </a>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/8 my-6"></div>

        {/* Contact + Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-5 text-xs text-white/35">
            <a href="tel:+971503195090" className="flex items-center gap-1.5 hover:text-white/60 transition-colors">
              <Phone size={12} />
              +971 50 319 5090
            </a>
            <a href="mailto:EmiratesHeritage@gmail.com" className="flex items-center gap-1.5 hover:text-white/60 transition-colors">
              <Mail size={12} />
              EmiratesHeritage@gmail.com
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} />
              Abu Dhabi, UAE
            </span>
          </div>

          <p className="text-[11px] text-white/20">
            © {year} Emirates Heritage
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
