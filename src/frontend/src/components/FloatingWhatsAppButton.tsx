import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_URL = "https://wa.me/919128292126?text=Hello%20I%20need%20help";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact support on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 text-white px-3.5 py-2.5 shadow-lg active:scale-95 transition-all duration-200 group"
      style={{ backgroundColor: "var(--color-whatsapp)" }}
      data-ocid="whatsapp.support_button"
    >
      <SiWhatsapp className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="text-xs font-mono font-bold uppercase tracking-widest hidden sm:inline opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[80px] overflow-hidden transition-all duration-300">
        Support
      </span>
    </a>
  );
}
