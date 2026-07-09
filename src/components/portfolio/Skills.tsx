import { Reveal } from "./Reveal";
import BlurText from "@/components/BlurText";

const groups = [
  {
    title: "Video Editing",
    items: ["Adobe Premiere Pro", "Wondershare Filmora", "Sound Design"],
  },
  {
    title: "AI Video Tools",
    items: ["Runway ML", "Pika", "Kling AI", "Google Veo", "Seedance", "Image-to-Video Models"],
  },
  {
    title: "AI Image Tools",
    items: ["Midjourney", "GPT Image 2", "Nano Banana Pro"],
  },
  {
    title: "Design",
    items: ["Photoshop", "Thumbnail Design", "Visual Composition"],
  },
  {
    title: "Strategy",
    items: ["Audience Retention", "Trend Analysis", "Content Strategy", "Creative Direction"],
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

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {g.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:border-gold hover:text-gold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
