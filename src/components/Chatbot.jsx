import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const phoneNumber = "971503199090"; 

  // Focus input when opened (Desktop only to completely prevent forced mobile keyboard popups)
  useEffect(() => {
    if (isOpen && inputRef.current && window.innerWidth > 768) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    const finalMessage = message.trim() || "I want some enquiry on your services";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
    setMessage(""); // Reset after sending
  };

  return (
    <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50 flex flex-col items-end">
      
      {/* ─── Chat Window ─── */}
      <div 
        className={`mb-4 w-[calc(100vw-2rem)] sm:w-[340px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-[#0a1628] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#37C2CF] flex items-center justify-center p-1.5 shadow-md">
              <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Emirates Heritage</h3>
              <p className="text-[#37C2CF] text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#37C2CF] animate-pulse"></span>
                Typically replies instantly
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Body */}
        <div className="bg-[#f8fafb] p-5 h-[160px] flex flex-col justify-end">
          <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm inline-block max-w-[85%] border border-gray-50 self-start">
            <p className="text-sm text-slate-700 leading-snug">
              Hi there! 👋<br/><br/>How can we help you with your next construction or design project?
            </p>
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            /* CRITICAL FIX: text-[16px] prevents iOS Safari from auto-zooming the screen when touched! */
            className="flex-1 bg-gray-50 text-[16px] md:text-sm rounded-full px-4 py-2 outline-none shrink min-w-0 focus:ring-2 focus:ring-[#37C2CF]/20 border border-transparent focus:border-[#37C2CF]/30 transition-all text-slate-700"
          />
          <button 
            type="submit"
            className="w-10 h-10 rounded-full bg-[#37C2CF] text-white flex items-center justify-center hover:bg-[#2eb3bf] transition-colors shrink-0 shadow-md shadow-[#37C2CF]/20"
          >
            <Send size={16} className="-ml-0.5" />
          </button>
        </form>
      </div>

      {/* ─── Floating Toggle Button ─── */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer relative flex items-center justify-center w-12 md:w-14 h-12 md:h-14 rounded-full shadow-2xl transition-all duration-300 focus:outline-none focus:scale-95 group ${
          isOpen ? "bg-white text-slate-800 border.border-gray-100 hover:bg-gray-50" : "bg-[#37C2CF] text-white hover:bg-[#37C2CF]"
        }`}
        aria-label="Toggle WhatsApp Chat"
      >
        {/* Pulse effect when closed */}
        {!isOpen && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#37C2CF] opacity-75 animate-ping"></span>
        )}
        
        {/* Icon Toggle */}
        <div className="relative z-10 transition-transform duration-300">
          {isOpen ? (
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <MessageSquare size={26} className="group-hover:-rotate-12 transition-transform duration-300" />
          )}
        </div>
      </button>

      {/* Tooltip (Only shows on Desktop when closed) */}
      {!isOpen && (
        <span className="absolute top-1/2 -translate-y-1/2 right-16 bg-white text-slate-800 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-[10px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none hidden md:block">
          Need help? Chat with us
          <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-white rotate-45"></div>
        </span>
      )}

    </div>
  );
};

export default Chatbot;