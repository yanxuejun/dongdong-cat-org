"use client";

import ScrollReveal from "./ScrollReveal";

export default function PawDivider() {
  return (
    <ScrollReveal className="flex justify-center py-8" delay={100}>
      <div className="flex items-center gap-3">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-slate-300" />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-purple-300">
          <path d="M12 10.5c-1.5 0-2.5-1.3-2.5-3S10.5 4.5 12 4.5s2.5 1.3 2.5 3-1 3-2.5 3zM6.5 13c-1.4 0-2.5-1.1-2.5-2.5S5.1 8 6.5 8 9 9.1 9 10.5 7.9 13 6.5 13zm11 0c-1.4 0-2.5-1.1-2.5-2.5S16.1 8 17.5 8 20 9.1 20 10.5 18.9 13 17.5 13zM4 17.5c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3zm10 0c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z"/>
        </svg>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-slate-300" />
      </div>
    </ScrollReveal>
  );
}
