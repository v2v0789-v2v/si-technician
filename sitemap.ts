@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-royal: #2e62ff;
  --color-royal-soft: #6b93ff;
  --color-royal-deep: #123dc9;
  --color-ink: #04060c;
  --color-ink-soft: #090d18;
  --color-mist: #f5f7fc;
  --font-sans: var(--font-poppins), ui-sans-serif, system-ui, -apple-system,
    "Segoe UI", sans-serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-mist font-sans text-slate-900 antialiased;
    text-rendering: optimizeLegibility;
  }
  .dark body {
    @apply bg-ink text-slate-200;
  }
  ::selection {
    background: var(--color-royal);
    color: #fff;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(46, 98, 255, 0.35);
    border-radius: 8px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(46, 98, 255, 0.6);
    background-clip: content-box;
  }
  :focus-visible {
    outline: 2px solid var(--color-royal);
    outline-offset: 3px;
    border-radius: 6px;
  }
}

/* ---------- Glassmorphism primitives ---------- */
.glass {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(13, 22, 48, 0.08);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
}
.dark .glass {
  background: rgba(255, 255, 255, 0.045);
  border-color: rgba(255, 255, 255, 0.09);
}

.glass-deep {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(13, 22, 48, 0.1);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
}
.dark .glass-deep {
  background: rgba(9, 13, 24, 0.82);
  border-color: rgba(255, 255, 255, 0.1);
}

/* ---------- Decorative helpers ---------- */
.text-gradient {
  @apply bg-gradient-to-r from-[#2e62ff] via-[#7ba0ff] to-[#2e62ff] bg-clip-text text-transparent;
}

.glow-royal {
  box-shadow:
    0 0 0 1px rgba(46, 98, 255, 0.35),
    0 12px 44px -12px rgba(46, 98, 255, 0.65);
}

.bg-grid {
  background-image:
    linear-gradient(rgba(122, 148, 255, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(122, 148, 255, 0.07) 1px, transparent 1px);
  background-size: 46px 46px;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.shimmer {
  background: linear-gradient(
    110deg,
    rgba(120, 140, 190, 0.08) 30%,
    rgba(120, 140, 190, 0.22) 50%,
    rgba(120, 140, 190, 0.08) 70%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s linear infinite;
}

/* ---------- Keyframe animations ---------- */
@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}
@keyframes marquee-reverse {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes float-y {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
}
@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.55;
  }
  100% {
    transform: scale(1.85);
    opacity: 0;
  }
}
@keyframes scan-line {
  0%,
  100% {
    top: 8%;
  }
  50% {
    top: 86%;
  }
}
@keyframes blink-soft {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
}
@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.06);
  }
}

.animate-marquee {
  animation: marquee 42s linear infinite;
}
.animate-marquee-reverse {
  animation: marquee-reverse 48s linear infinite;
}
.animate-float {
  animation: float-y 6s ease-in-out infinite;
}
.animate-float-delayed {
  animation: float-y 7.5s ease-in-out 1.4s infinite;
}
.animate-pulse-ring {
  animation: pulse-ring 1.9s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.animate-scan {
  animation: scan-line 4.5s ease-in-out infinite;
}
.animate-blink {
  animation: blink-soft 1.3s ease-in-out infinite;
}
.animate-pulse-slow {
  animation: pulse-slow 7s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
