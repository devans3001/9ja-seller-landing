import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AliExpressGlowButton() {
  return (
    <div className="relative inline-block">
      {/* Animated Glow Ring */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 300 100"
        fill="none"
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.circle
            key={i}
            r="3"
            fill={i % 2 === 0 ? "#ff4d00" : "#ff9900"}
            initial={{
              offsetDistance: `${(i / 40) * 100}%`,
              opacity: 0.2,
              scale: 0.8,
            }}
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0.3, 1, 0.3],
              scale: [0.6, 1.4, 0.6],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.15,
            }}
            style={{
              offsetPath:
                "path('M20 20 H280 Q290 20 290 30 V70 Q290 80 280 80 H20 Q10 80 10 70 V30 Q10 20 20 20 Z')",
            }}
          />
        ))}
      </svg>

      {/* The Button */}
      <button
        className="
          relative z-10 px-10 py-4 
          rounded-2xl text-white font-semibold text-lg 
          bg-[#1A1A1A] border border-[#333]
          flex items-center gap-3
          hover:scale-[1.03]
          transition-transform duration-300
        "
      >
        Start selling now
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
