"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

interface PolaroidProps {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
  delay?: number;
  direction?: "left" | "right";
  priority?: boolean;
}

export default function Polaroid({
  src,
  alt,
  caption,
  rotate = 0,
  delay = 0,
  direction = "left",
  priority = false,
}: PolaroidProps) {
  return (
    <ScrollReveal direction={direction} delay={delay}>
      <div
        className="bg-white p-3 pb-4 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-default"
        style={{
          transform: `rotate(${rotate}deg)`,
          borderRadius: "2px",
        }}
      >
        <div className="relative w-64 h-64 md:w-72 md:h-72 overflow-hidden bg-slate-100">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 256px, 288px"
            priority={priority}
          />
        </div>
        {caption && (
          <p className="mt-3 text-center text-xs font-handwriting text-slate-400 tracking-wide">
            {caption}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
