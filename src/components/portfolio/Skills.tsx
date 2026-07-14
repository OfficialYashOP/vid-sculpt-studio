import { motion } from "motion/react";
import { Reveal } from "./Reveal";

type Item = { name: string; url?: string; primary?: boolean };
type Group = {
  title: string;
  index: string;
  note: string;
  items: Item[];
  span: "flagship" | "wide" | "compact";
};

const SERIF = '"Fraunces", "Times New Roman", serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';

const groups: Group[] = [
  {
    title: "AI Video Models",
    index: "01",
    note: "Daily driver — the core of the practice.",
    span: "flagship",
    items: [
      { name: "Kling 3.0", primary: true },
      { name: "Seedance 2", primary: true },
      { name: "Veo 3.1", primary: true },
      { name: "Wan 2.7", primary: true },
      { name: "Runway Gen-4", primary: true },
      { name: "Luma Ray 3" },
      { name: "Kling Motion Control" },
      { name: "Omni Flash" },
      { name: "LTX Video" },
      { name: "Grok Imagine" },
      { name: "Pika 2.2" },
      { name: "Hailuo / MiniMax" },
    ],
  },
  {
    title: "AI Image Models",
    index: "02",
    note: "For frames, references, and stills that seed the shot.",
    span: "wide",
    items: [
      { name: "Seedream 5 Pro", primary: true },
      { name: "Nano Banana Pro", primary: true },
      { name: "Midjourney v7", primary: true },
      { name: "GPT Image 2" },
      { name: "Flux 1.1 Ultra" },
      { name: "Ideogram 3.0" },
      { name: "Recraft V3" },
      { name: "Grok Imagine" },
    ],
  },
  {
    title: "Platforms",
    index: "03",
    note: "Where the models are wired into pipelines.",
    span: "wide",
    items: [
      { name: "Higgsfield AI", url: "https://higgsfield.ai/", primary: true },
      { name: "Runway ML", url: "https://runwayml.com/", primary: true },
      { name: "Google Flow / Veo", url: "https://labs.google/fx/tools/flow", primary: true },
      { name: "Dreamina (CapCut)", url: "https://dreamina.capcut.com/" },
      { name: "Adobe Firefly", url: "https://firefly.adobe.com/" },
      { name: "Hedra", url: "https://www.hedra.com/" },
      { name: "OpenArt", url: "https://openart.ai/" },
      { name: "Pika", url: "https://pika.art/" },
      { name: "Kling AI", url: "https://klingai.com/" },
      { name: "Krea AI", url: "https://www.krea.ai/" },
      { name: "Freepik AI", url: "https://www.freepik.com/ai" },
    ],
  },
  {
    title: "Editing & Design",
    index: "04",
    note: "Post, polish, and packaging.",
    span: "wide",
    items: [
      { name: "Premiere Pro", primary: true },
      { name: "Photoshop", primary: true },
      { name: "Filmora" },
      { name: "Canva", url: "https://www.canva.com/" },
      { name: "Sound Design" },
      { name: "Thumbnail Design" },
    ],
  },
  {
    title: "Research",
    index: "05",
    note: "For scripts, structure, and second opinions.",
    span: "compact",
    items: [
      { name: "Claude Opus", primary: true },
      { name: "GPT-5.5", primary: true },
      { name: "Gemini 3 Pro" },
      { name: "Grok 4" },
      { name: "Claude Fable" },
    ],
  },
  {
    title: "Strategy",
    index: "06",
    note: "The layer above the tools.",
    span: "compact",
    items: [
      { name: "Creative Direction", primary: true },
      { name: "Content Strategy", primary: true },
      { name: "Audience Retention" },
      { name: "Trend Analysis" },
    ],
  },
];

function Chip({ item }: { item: Item }) {
  const base =
    "inline-flex items-center rounded-full px-3.5 py-1.5 text-[13px] transition-all duration-300 motion-reduce:transition-none";
  const primary =
    "border border-foreground/25 bg-foreground/[0.06] font-medium text-foreground hover:border-foreground/50 hover:bg-foreground/[0.10]";
  const secondary =
    "border border-white/[0.08] bg-transparent font-normal text-muted-foreground hover:border-white/20 hover:text-foreground/90";
  const cls = `${base} ${item.primary ? primary : secondary}`;

  if (item.url) {
    return (
      <a href={item.url} target="_blank" rel="noreferrer" className={cls}>
        {item.name}
      </a>
    );
  }
  return <span className={cls}>{item.name}</span>;
}

function GroupBlock({ g, delay = 0 }: { g: Group; delay?: number }) {
  const isFlagship = g.span === "flagship";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: delay * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex h-full flex-col border-t border-white/[0.08] pt-8 ${
        isFlagship ? "sm:pt-10" : ""
      }`}
    >
      {/* Top row: index + title */}
      <div className="flex items-baseline gap-5">
        <span
          className="text-[11px] tracking-[0.28em] text-muted-foreground/70"
          style={{ fontFamily: MONO }}
        >
          {g.index}
        </span>
        <h3
          className={`leading-[1.05] tracking-[-0.01em] text-foreground ${
            isFlagship
              ? "text-[clamp(2rem,3.5vw,2.75rem)]"
              : g.span === "wide"
                ? "text-[clamp(1.5rem,2.2vw,1.9rem)]"
                : "text-[clamp(1.25rem,1.8vw,1.5rem)]"
          }`}
          style={{ fontFamily: SERIF, fontWeight: 400 }}
        >
          {g.title}
        </h3>
      </div>

      <p className="mt-3 max-w-[42ch] pl-[3.25rem] text-sm leading-relaxed text-muted-foreground/80">
        {g.note}
      </p>

      <div
        className={`mt-6 flex flex-wrap gap-2 pl-[3.25rem] ${
          isFlagship ? "sm:mt-8" : ""
        }`}
      >
        {g.items.map((item) => (
          <Chip key={item.name} item={item} />
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const flagship = groups[0];
  const wideRow = groups.slice(1, 4); // 02, 03, 04
  const compactRow = groups.slice(4); // 05, 06

  return (
    <section id="skills" className="relative bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        {/* Header — no kicker dash. Serif headline stands on its own. */}
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <Reveal>
            <h2
              className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em] text-foreground"
              style={{ fontFamily: SERIF, fontWeight: 400 }}
            >
              The stack, in{" "}
              <span style={{ fontStyle: "italic", fontWeight: 300 }} className="text-foreground/80">
                order of use.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p
              className="max-w-[28ch] text-xs uppercase tracking-[0.28em] text-muted-foreground"
              style={{ fontFamily: MONO }}
            >
              Six disciplines · daily tools in weight,
              <br />
              supporting tools in outline.
            </p>
          </Reveal>
        </div>

        {/* Flagship — full width */}
        <div className="mt-16">
          <GroupBlock g={flagship} />
        </div>

        {/* Wide row — 3 up on lg, stacked below */}
        <div className="mt-12 grid gap-x-14 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {wideRow.map((g, i) => (
            <GroupBlock key={g.title} g={g} delay={i + 1} />
          ))}
        </div>

        {/* Compact row — 2 up */}
        <div className="mt-12 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {compactRow.map((g, i) => (
            <GroupBlock key={g.title} g={g} delay={i + 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
