import { useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";

import seedance2 from "@/assets/seedance2-thumb.webp.asset.json";
import ranaSanga from "@/assets/rana-sanga-thumb.webp.asset.json";
import pinkPhool from "@/assets/pink-phool-poster.jpg.asset.json";
import coffee from "@/assets/coffee-poster.jpg.asset.json";

const SERIF = '"Fraunces", "Times New Roman", serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';

const DWELL_MS = 3800;

const FRAMES = [
  {
    src: seedance2.url,
    alt: "Still from Oryx & Crake, an AI short film",
    title: "Oryx & Crake",
    meta: "AI Short Film · 2026",
  },
  {
    src: ranaSanga.url,
    alt: "Still from Rana Sanga, a historical animation",
    title: "Rana Sanga",
    meta: "Historical Animation",
  },
  {
    src: pinkPhool.url,
    alt: "Still from the Pink Phool Collection fashion film",
    title: "Pink Phool",
    meta: "Fashion · UGC",
  },
  {
    src: coffee.url,
    alt: "Still from a coffee brand commercial",
    title: "Coffee",
    meta: "Brand Film",
  },
];

/** Sprocket-hole rail: a column of short dashes down the film edge. */
const RAIL: CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, rgba(255,255,255,0.22) 0 7px, transparent 7px 18px)",
  backgroundSize: "7px 18px",
  backgroundRepeat: "repeat-y",
  backgroundPosition: "center",
};

/** The four frames as a pickable index. Pass no onPick for a static list. */
function ReelIndex({
  active,
  onPick,
}: {
  active?: number;
  onPick?: (i: number) => void;
}) {
  return (
    <ul className="mt-6 border-t border-white/[0.1] pt-3">
      {FRAMES.map((f, i) => {
        const on = active === i;
        const row = (
          <span
            className="flex w-full items-baseline justify-between gap-4 py-2 pl-3 text-left"
            style={{
              borderLeft: `2px solid ${on ? "var(--gold)" : "transparent"}`,
            }}
          >
            <span className="flex items-baseline gap-3">
              <span
                className="text-[10px] tracking-[0.2em]"
                style={{
                  fontFamily: MONO,
                  color: on ? "var(--foreground)" : "var(--muted-foreground)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="text-[15px]"
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: on ? "var(--foreground)" : "var(--muted-foreground)",
                }}
              >
                {f.title}
              </span>
            </span>
            <span
              className="shrink-0 text-[9px] uppercase tracking-[0.22em]"
              style={{
                fontFamily: MONO,
                color: "var(--muted-foreground)",
                opacity: on ? 0.75 : 0.5,
              }}
            >
              {f.meta}
            </span>
          </span>
        );

        return (
          <li key={f.title}>
            {onPick ? (
              <button
                type="button"
                onClick={() => onPick(i)}
                aria-current={on ? "true" : undefined}
                className="block w-full"
              >
                {row}
              </button>
            ) : (
              row
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function ReelStrip() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;
    const t = window.setInterval(
      () => setIndex((v) => (v + 1) % FRAMES.length),
      DWELL_MS
    );
    return () => window.clearInterval(t);
  }, [reduced, paused]);

  /* Reduced motion: every frame visible at once, nothing moving. */
  if (reduced) {
    return (
      <div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/[0.08] bg-white/[0.08]">
          {FRAMES.map((f) => (
            <div key={f.title} className="bg-card">
              <img
                src={f.src}
                alt={f.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover [filter:grayscale(0.35)_contrast(1.05)]"
              />
            </div>
          ))}
        </div>
        <ReelIndex />
      </div>
    );
  }

  const active = FRAMES[index];

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-sm border border-white/[0.08] bg-card"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <div className="relative aspect-[16/9] w-full">
          {/* Crossfading frames with a slow drift on the live one */}
          {FRAMES.map((f, i) => {
            const on = i === index;
            return (
              <motion.div
                key={f.title}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: on ? 1 : 0 }}
                transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden={!on}
              >
                <motion.img
                  src={f.src}
                  alt={f.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover [filter:grayscale(0.35)_contrast(1.05)]"
                  initial={false}
                  animate={on ? { scale: [1.0, 1.075] } : { scale: 1.0 }}
                  transition={{
                    duration: (DWELL_MS + 1200) / 1000,
                    ease: "linear",
                  }}
                />
              </motion.div>
            );
          })}

          {/* Film edges */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[14px] border-r border-white/[0.06] bg-background/55"
            style={RAIL}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-[14px] border-l border-white/[0.06] bg-background/55"
            style={RAIL}
          />

          {/* Legability wash + corner mark */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-background/25"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-[22px] top-[14px] h-3 w-3 border-l border-t border-white/25"
          />

          {/* Head label */}
          <p
            className="pointer-events-none absolute left-[26px] top-[18px] rounded-[2px] border border-white/[0.08] bg-background/75 px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-foreground/75 backdrop-blur-[2px]"
            style={{ fontFamily: MONO }}
          >
            Reel
          </p>

          {/* Caption for the live frame — sits on the wash, never on the art's own titles */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 px-[26px] pb-[22px]">
            <div className="flex items-end justify-between gap-4">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.28em] text-foreground/55"
                  style={{ fontFamily: MONO }}
                >
                  {active.meta}
                </p>
                <p
                  className="mt-1.5 text-[26px] leading-none text-foreground"
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  {active.title}
                </p>
              </motion.div>

              <p
                className="shrink-0 pb-1 text-[10px] uppercase tracking-[0.24em] text-foreground/60"
                style={{ fontFamily: MONO }}
              >
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(FRAMES.length).padStart(2, "0")}
              </p>
            </div>

            {/* Dwell progress — the strip's own clock */}
            <div className="mt-4 h-px w-full bg-white/[0.12]">
              <motion.div
                key={index}
                className="h-full bg-foreground/55"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: DWELL_MS / 1000, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </div>

      <ReelIndex active={index} onPick={setIndex} />
    </div>
  );
}
