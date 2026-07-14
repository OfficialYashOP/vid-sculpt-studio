import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
const Aurora = lazy(() => import("@/components/Aurora"));

type CardItem = {
  index: string;
  discipline: string;
  title: string;
  description: string;
  meta: string;
  accent: string; // hex
  accentSoft: string;
  to?: string;
  available: boolean;
};

const cards: CardItem[] = [
  {
    index: "I",
    discipline: "Moving Image",
    title: "AI Video Creator",
    description:
      "Cinematic AI-generated ads, short films and UGC. A live, working portfolio of released work.",
    meta: "Portfolio — live",
    accent: "#e6b352", // warm amber
    accentSoft: "rgba(230, 179, 82, 0.14)",
    to: "/AI",
    available: true,
  },
  {
    index: "II",
    discipline: "Systems & Interfaces",
    title: "Software Developer",
    description:
      "Web apps, tools and interfaces built with modern stacks. Case studies in the works.",
    meta: "In progress",
    accent: "#7dd3fc", // cool sky
    accentSoft: "rgba(125, 211, 252, 0.10)",
    available: false,
  },
  {
    index: "III",
    discipline: "Defense & Research",
    title: "Cyber Security",
    description:
      "Security research, hardening and defensive tooling. Case studies in the works.",
    meta: "In progress",
    accent: "#a1a1aa", // neutral graphite
    accentSoft: "rgba(161, 161, 170, 0.10)",
    available: false,
  },
];

const SERIF = '"Fraunces", "Times New Roman", serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';

export function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {mounted && (
            <div className="absolute inset-0 opacity-70">
              <Suspense fallback={null}>
                <Aurora colorStops={["#0f172a", "#1a1a1f", "#0f172a"]} blend={0.25} amplitude={1.4} speed={0.4} />
              </Suspense>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-28 pb-16 sm:px-10">
          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-muted-foreground"
            style={{ fontFamily: MONO }}
          >
            <span className="h-px w-8 bg-foreground/40" />
            Yash Pandey · Portfolio
          </motion.div>

          {/* Editorial title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-4xl text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.98] tracking-[-0.02em] text-foreground"
            style={{ fontFamily: SERIF, fontWeight: 400 }}
          >
            Three worlds,
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 300 }} className="text-foreground/80">
              one creator.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground"
          >
            A working portfolio for the work that's shipped — and a placeholder for what's still in the studio.
          </motion.p>

          {/* Cards — editorial grid */}
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/[0.06] sm:mt-20 md:grid-cols-3">
            {cards.map((card, i) => {
              const CardShell = (
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative flex h-full min-h-[380px] flex-col overflow-hidden bg-card p-8 transition-colors duration-500 sm:p-10 ${
                    card.available
                      ? "hover:bg-card/95"
                      : "bg-card/60"
                  }`}
                >
                  {/* Available card gets a subtle material treatment */}
                  {card.available && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 motion-reduce:transition-none"
                      style={{
                        background: `radial-gradient(600px 300px at 20% 0%, ${card.accentSoft}, transparent 70%)`,
                      }}
                    />
                  )}

                  {/* Top row: roman numeral + discipline tag */}
                  <div className="relative flex items-baseline justify-between">
                    <span
                      className="text-xs tracking-[0.28em] text-muted-foreground"
                      style={{ fontFamily: MONO }}
                    >
                      {card.index.padStart(3, "\u2007")}
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-[0.28em]"
                      style={{ fontFamily: MONO, color: card.available ? card.accent : "rgb(115 115 115)" }}
                    >
                      {card.discipline}
                    </span>
                  </div>

                  {/* Headline — serif */}
                  <div className="relative mt-16 flex-1">
                    <h2
                      className="text-[clamp(1.75rem,3vw,2.35rem)] leading-[1.05] tracking-[-0.01em]"
                      style={{
                        fontFamily: SERIF,
                        fontWeight: 400,
                        color: card.available ? "var(--foreground)" : "rgb(212 212 216 / 0.75)",
                      }}
                    >
                      {card.title}
                    </h2>
                    <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>
                  </div>

                  {/* Footer — meta + CTA */}
                  <div className="relative mt-10 flex items-end justify-between">
                    <span
                      className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
                      style={{ fontFamily: MONO }}
                    >
                      <span
                        className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full align-middle"
                        style={{
                          background: card.available ? card.accent : "rgb(82 82 91)",
                          boxShadow: card.available ? `0 0 12px ${card.accent}` : "none",
                        }}
                      />
                      {card.meta}
                    </span>

                    {card.available ? (
                      <span
                        className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] transition-transform duration-500 group-hover:translate-x-1 motion-reduce:transform-none"
                        style={{ fontFamily: MONO, color: card.accent }}
                      >
                        Enter
                        <svg width="28" height="10" viewBox="0 0 28 10" fill="none" className="overflow-visible">
                          <line
                            x1="0"
                            y1="5"
                            x2="26"
                            y2="5"
                            stroke={card.accent}
                            strokeWidth="1"
                            className="transition-all duration-500 [stroke-dasharray:24] [stroke-dashoffset:8] group-hover:[stroke-dashoffset:0] motion-reduce:transition-none"
                          />
                          <path d="M22 1 L27 5 L22 9" stroke={card.accent} strokeWidth="1" fill="none" />
                        </svg>
                      </span>
                    ) : (
                      <span
                        className="text-xs uppercase tracking-[0.28em] text-muted-foreground/60"
                        style={{ fontFamily: MONO }}
                      >
                        Soon
                      </span>
                    )}
                  </div>
                </motion.article>
              );

              if (card.to) {
                return (
                  <Link key={card.title} to={card.to} className="block h-full">
                    {CardShell}
                  </Link>
                );
              }
              return (
                <div
                  key={card.title}
                  aria-disabled
                  className="block h-full cursor-not-allowed"
                >
                  {CardShell}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
