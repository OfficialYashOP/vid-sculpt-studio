import { Reveal } from "./Reveal";
import portrait from "@/assets/portrait.jpg";

const stats = [
  { value: "7+", label: "Years Experience" },
  { value: "12 min", label: "AI Short Film" },
  { value: "8+", label: "AI Tools Mastered" },
  { value: "Multiple", label: "Client Projects Delivered" },
];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 rounded-[2rem] bg-gold/20 blur-2xl" />
          <img
            src={portrait}
            alt="Portrait of Yash Pandey"
            loading="lazy"
            width={800}
            height={1008}
            className="relative w-full rounded-[1.75rem] border border-gold/30 object-cover"
          />
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-10 bg-gold" /> About
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="max-w-xl font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
              A storyteller wired for the AI era
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              I'm an AI-driven video creator and editor with 7+ years of experience, specializing in
              AI video tools, image-to-video models, and storytelling for both marketing and
              cinematic content. I blend traditional editing craft with the latest generative
              pipelines to produce work that feels intentional, emotional, and premium.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i + 1}>
                <div className="glass h-full rounded-2xl p-5">
                  <p className="font-display text-3xl text-gold sm:text-4xl">{s.value}</p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
