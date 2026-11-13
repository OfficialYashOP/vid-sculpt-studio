import { Reveal } from "./Reveal";
import { ReelStrip } from "./ReelStrip";
import cv from "@/assets/Yash-CV.pdf.asset.json";

const SERIF = '"Fraunces", "Times New Roman", serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-white/[0.06] bg-background"
    >
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 sm:px-10 sm:pt-32 sm:pb-20">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          {/* LEFT — reel + name plate */}
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative">
              {/* Reel strip — frames from the work itself, not a headshot */}
              <ReelStrip />

              {/* Name plate */}
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

              {/* Where to go from here */}
              <div className="mt-8 border-t border-white/[0.1] pt-1">
                <a
                  href="#work"
                  className="group flex items-baseline justify-between gap-4 border-b border-white/[0.06] py-3"
                >
                  <span
                    className="text-[15px] text-foreground/85 transition-colors duration-300 group-hover:text-foreground"
                    style={{ fontFamily: SERIF, fontStyle: "italic" }}
                  >
                    Selected work
                  </span>
                  <span
                    className="shrink-0 text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
                    style={{ fontFamily: MONO }}
                  >
                    View ↗
                  </span>
                </a>
                <a
                  href="#contact"
                  className="group flex items-baseline justify-between gap-4 border-b border-white/[0.06] py-3"
                >
                  <span
                    className="text-[15px] text-foreground/85 transition-colors duration-300 group-hover:text-foreground"
                    style={{ fontFamily: SERIF, fontStyle: "italic" }}
                  >
                    Get in touch
                  </span>
                  <span
                    className="shrink-0 text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
                    style={{ fontFamily: MONO }}
                  >
                    Say hello ↗
                  </span>
                </a>
                <a
                  href={cv.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-3"
                >
                  <span
                    className="text-[15px] text-foreground/85 transition-colors duration-300 group-hover:text-foreground"
                    style={{ fontFamily: SERIF, fontStyle: "italic" }}
                  >
                    Curriculum vitae
                  </span>
                  <span
                    className="shrink-0 text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
                    style={{ fontFamily: MONO }}
                  >
                    PDF ↗
                  </span>
                </a>
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

            {/* Stat strip — one flagship number, two supporting. Aligned baselines, vertical rules. */}
            <Reveal delay={3}>
              <div className="mt-14 grid grid-cols-2 items-end gap-y-10 border-t border-white/[0.1] pt-10 sm:grid-cols-[1.8fr_1fr_1fr]">
                {/* Flagship stat */}
                <div className="col-span-2 sm:col-span-1 sm:pr-10">
                  <p
                    className="text-[10px] uppercase tracking-[0.32em] text-foreground/60"
                    style={{ fontFamily: MONO }}
                  >
                    Longest form to date
                  </p>
                  <p
                    className="mt-3 text-[clamp(3.5rem,7vw,5.5rem)] leading-none tracking-[-0.03em] text-foreground"
                    style={{ fontFamily: SERIF, fontWeight: 400 }}
                  >
                    12
                    <span
                      className="ml-2 align-top text-[0.28em] text-foreground/60"
                      style={{ fontFamily: MONO, letterSpacing: "0.24em" }}
                    >
                      MIN
                    </span>
                  </p>
                  <p className="mt-3 text-[13px] leading-snug text-muted-foreground">
                    <span className="text-foreground/85" style={{ fontFamily: SERIF, fontStyle: "italic" }}>
                      Oryx &amp; Crake
                    </span>{" "}
                    — an AI short film, 2026.
                  </p>
                </div>

                {/* Supporting stat — with vertical rule on sm+ */}
                <div className="sm:border-l sm:border-white/[0.1] sm:px-8">
                  <p
                    className="text-[clamp(2.5rem,4vw,3.5rem)] leading-none tracking-[-0.02em] text-foreground"
                    style={{ fontFamily: SERIF, fontWeight: 400 }}
                  >
                    7
                    <span className="text-foreground/50">+</span>
                  </p>
                  <p
                    className="mt-3 text-[10px] uppercase tracking-[0.28em] text-foreground/60"
                    style={{ fontFamily: MONO }}
                  >
                    Years
                    <br />
                    in post
                  </p>
                </div>

                <div className="sm:border-l sm:border-white/[0.1] sm:px-8">
                  <p
                    className="text-[clamp(2.5rem,4vw,3.5rem)] leading-none tracking-[-0.02em] text-foreground"
                    style={{ fontFamily: SERIF, fontWeight: 400 }}
                  >
                    8
                    <span className="text-foreground/50">+</span>
                  </p>
                  <p
                    className="mt-3 text-[10px] uppercase tracking-[0.28em] text-foreground/60"
                    style={{ fontFamily: MONO }}
                  >
                    Generative tools,
                    <br />
                    in rotation
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
