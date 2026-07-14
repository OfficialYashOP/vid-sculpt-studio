import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import portrait from "@/assets/yash-portrait.png.asset.json";

const SERIF = '"Fraunces", "Times New Roman", serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-white/[0.06] bg-background"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          {/* LEFT — photo + name plate */}
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative">
              {/* Photo frame — editorial: black-and-white, warm hairline, subtle grain via mix-blend */}
              <div className="relative overflow-hidden rounded-sm border border-white/[0.08] bg-card">
                <motion.img
                  src={portrait.url}
                  alt="Yash Pandey"
                  initial={{ scale: 1.04, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="aspect-[4/5] w-full object-cover [filter:grayscale(0.35)_contrast(1.05)] transition-[filter] duration-700 hover:[filter:grayscale(0)_contrast(1)] motion-reduce:transition-none"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"
                />
              </div>

              {/* Name plate — sits half over the photo edge */}
              <div className="mt-6 flex items-baseline justify-between border-t border-white/[0.12] pt-4">
                <div>
                  <p
                    className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground"
                    style={{ fontFamily: MONO }}
                  >
                    Yash Pandey
                  </p>
                  <p
                    className="mt-1 text-lg text-foreground"
                    style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}
                  >
                    AI Video Creator & Editor
                  </p>
                </div>
                <p
                  className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground/70"
                  style={{ fontFamily: MONO }}
                >
                  IN / 2018 —
                </p>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — bio */}
          <div>
            <Reveal>
              <p
                className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground"
                style={{ fontFamily: MONO }}
              >
                Chapter 01 · The Practice
              </p>
            </Reveal>

            <Reveal delay={1}>
              <h2
                className="mt-6 max-w-[18ch] text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.0] tracking-[-0.02em] text-foreground"
                style={{ fontFamily: SERIF, fontWeight: 400 }}
              >
                A storyteller,{" "}
                <span
                  style={{ fontStyle: "italic", fontWeight: 300 }}
                  className="text-foreground/80"
                >
                  rewired
                </span>{" "}
                for the AI era.
              </h2>
            </Reveal>

            {/* Bio prose with an inline stat pulled from the copy */}
            <Reveal delay={2}>
              <div className="mt-10 space-y-5 text-[17px] leading-[1.7] text-muted-foreground">
                <p>
                  I've spent the last{" "}
                  <span
                    className="text-foreground"
                    style={{ fontFamily: SERIF, fontWeight: 500 }}
                  >
                    seven years
                  </span>{" "}
                  cutting film — the last two of them rebuilding that craft around
                  generative video. My work sits between the old editorial
                  discipline (pacing, rhythm, restraint) and the new pipelines
                  (image-to-video, motion control, model-hopping mid-shot).
                </p>
                <p>
                  I ship cinematic ads, UGC that doesn't look like UGC, and — most
                  recently — a{" "}
                  <span
                    className="text-foreground"
                    style={{ fontFamily: SERIF, fontWeight: 500 }}
                  >
                    twelve-minute AI short film
                  </span>{" "}
                  built end-to-end across eight generative tools.
                </p>
              </div>
            </Reveal>

            {/* Stat strip — asymmetric, hierarchy on the flagship number */}
            <Reveal delay={3}>
              <div className="mt-14 grid grid-cols-2 items-end gap-x-10 gap-y-10 border-t border-white/[0.08] pt-10 sm:grid-cols-4">
                {/* Flagship stat */}
                <div className="col-span-2 sm:col-span-2">
                  <p
                    className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground"
                    style={{ fontFamily: MONO }}
                  >
                    Longest form to date
                  </p>
                  <p
                    className="mt-3 text-[clamp(3.5rem,7vw,5.5rem)] leading-none tracking-[-0.03em] text-foreground"
                    style={{ fontFamily: SERIF, fontWeight: 400 }}
                  >
                    12{" "}
                    <span
                      className="text-[0.35em] align-top text-muted-foreground"
                      style={{ fontFamily: MONO, letterSpacing: "0.2em" }}
                    >
                      MIN
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    "Oryx & Crake" — an AI short film, 2026.
                  </p>
                </div>

                {/* Supporting stats — smaller, plain */}
                <div>
                  <p
                    className="text-2xl text-foreground"
                    style={{ fontFamily: SERIF, fontWeight: 400 }}
                  >
                    7+
                  </p>
                  <p
                    className="mt-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
                    style={{ fontFamily: MONO }}
                  >
                    Years in post
                  </p>
                </div>

                <div>
                  <p
                    className="text-2xl text-foreground"
                    style={{ fontFamily: SERIF, fontWeight: 400 }}
                  >
                    8+
                  </p>
                  <p
                    className="mt-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
                    style={{ fontFamily: MONO }}
                  >
                    Generative tools, in rotation
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
