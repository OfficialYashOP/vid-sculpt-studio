import { GraduationCap } from "lucide-react";
import { Reveal } from "./Reveal";

const timeline = [
  {
    role: "AI Video Creator & Editor",
    org: "Freelance / Independent",
    period: "2018 – Present",
    points: [
      "Produced long-form and short-form video content using advanced editing and AI tools.",
      "Delivered AI-generated short films, ads, UGC content, and AI influencer builds for clients.",
      "Designed thumbnails and visuals, optimized content strategy for engagement and performance.",
    ],
  },
];

const education = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    school: "Lovely Professional University, Punjab",
    period: "2022 – Present",
  },
  {
    degree: "12th, Science",
    school: "Green Field Sr Sec School, Jaipur",
    period: "80%",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
      <Reveal>
        <p className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-gold">
          <span className="h-px w-10 bg-gold" /> Experience
        </p>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="max-w-2xl font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
          The journey so far
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative border-l border-border pl-8">
          {timeline.map((t, i) => (
            <Reveal key={i} delay={i}>
              <div className="relative">
                <span className="absolute -left-[2.6rem] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold ring-4 ring-background" />
                <p className="text-sm font-medium text-gold">{t.period}</p>
                <h3 className="mt-1 text-2xl font-bold">{t.role}</h3>
                <p className="text-muted-foreground">{t.org}</p>
                <ul className="mt-4 space-y-2.5">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div>
          <Reveal>
            <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              <GraduationCap className="h-4 w-4 text-gold" /> Education
            </h3>
          </Reveal>
          <div className="space-y-4">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i + 1}>
                <div className="glass rounded-2xl p-5">
                  <p className="font-semibold">{e.degree}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{e.school}</p>
                  <p className="mt-1 text-xs font-medium text-gold">{e.period}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
