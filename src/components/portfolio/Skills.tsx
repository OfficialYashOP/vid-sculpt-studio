import { Reveal } from "./Reveal";
import BlurText from "@/components/BlurText";
import StarBorder from "@/components/StarBorder";

type Item = { name: string; url?: string };

const groups: { title: string; items: Item[] }[] = [
  {
    title: "AI Video Models",
    items: [
      { name: "Kling 3.0" },
      { name: "Seedance 2" },
      { name: "Veo 3.1" },
      { name: "Wan 2.7" },
      { name: "Omni Flash" },
      { name: "LTX Video" },
      { name: "Kling Motion Control" },
      { name: "Grok Imagine" },
      { name: "Runway Gen-4" },
      { name: "Luma Ray 3" },
      { name: "Pika 2.2" },
      { name: "Hailuo / MiniMax" },
    ],
  },
  {
    title: "AI Image Models",
    items: [
      { name: "Seedream 5 Pro" },
      { name: "Nano Banana Pro" },
      { name: "GPT Image 2" },
      { name: "Midjourney v7" },
      { name: "Flux 1.1 Ultra" },
      { name: "Grok Imagine" },
      { name: "Ideogram 3.0" },
      { name: "Recraft V3" },
    ],
  },
  {
    title: "AI Platforms & Tools",
    items: [
      { name: "Higgsfield AI", url: "https://higgsfield.ai/" },
      { name: "OpenArt", url: "https://openart.ai/" },
      { name: "Dreamina (CapCut)", url: "https://dreamina.capcut.com/" },
      { name: "Adobe Firefly", url: "https://firefly.adobe.com/" },
      { name: "Hedra", url: "https://www.hedra.com/" },
      { name: "Runway ML", url: "https://runwayml.com/" },
      { name: "Pika", url: "https://pika.art/" },
      { name: "Kling AI", url: "https://klingai.com/" },
      { name: "Google Flow / Veo", url: "https://labs.google/fx/tools/flow" },
      { name: "Krea AI", url: "https://www.krea.ai/" },
      { name: "Freepik AI", url: "https://www.freepik.com/ai" },
    ],
  },
  {
    title: "Research Models",
    items: [
      { name: "Claude Fable" },
      { name: "Claude Opus" },
      { name: "GPT-5.5" },
      { name: "Gemini 3 Pro" },
      { name: "Grok 4" },
    ],
  },
  {
    title: "Editing & Design",
    items: [
      { name: "Adobe Premiere Pro" },
      { name: "Wondershare Filmora" },
      { name: "Canva", url: "https://www.canva.com/" },
      { name: "Photoshop" },
      { name: "Sound Design" },
      { name: "Thumbnail Design" },
    ],
  },
  {
    title: "Strategy",
    items: [
      { name: "Audience Retention" },
      { name: "Trend Analysis" },
      { name: "Content Strategy" },
      { name: "Creative Direction" },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-10 bg-gold" /> Skills & Tools
          </p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="max-w-2xl font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
            <BlurText text="The stack behind the craft" animateBy="words" className="flex-wrap" />
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i}>
              <StarBorder color="rgba(230, 179, 82, 0.7)" speed="9s" thickness={1.5} className="h-full">
                <div className="h-full rounded-[18px] bg-card/70 p-6 backdrop-blur-sm">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-gold/80">
                    {g.title}
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {g.items.map((item) =>
                      item.url ? (
                        <a
                          key={item.name}
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:border-gold hover:text-gold"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <span
                          key={item.name}
                          className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:border-gold hover:text-gold"
                        >
                          {item.name}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </StarBorder>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
