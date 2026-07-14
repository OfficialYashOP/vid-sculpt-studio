import { Reveal } from "./Reveal";

type Category = "Video" | "Design" | "Audio" | "Strategy";

type Service = {
  category: Category;
  title: string;
  desc: string;
  featured?: boolean;
};

const services: Service[] = [
  {
    category: "Video",
    title: "AI Short Films & Cinematic Content",
    desc: "Full narrative pieces generated and edited for pacing, tone, and emotional impact.",
  },
  {
    category: "Video",
    title: "UGC & Marketing Ad Videos",
    desc: "Authentic, feed-native ads and creator-style content built to convert. Currently the flagship service — most of my recent work sits here.",
    featured: true,
  },
  {
    category: "Video",
    title: "Image-to-Video Generation",
    desc: "Turning stills and concepts into motion with the latest image-to-video models.",
  },
  {
    category: "Design",
    title: "Thumbnail & Visual Design",
    desc: "Scroll-stopping thumbnails and key art crafted for click-through.",
  },
  {
    category: "Audio",
    title: "Sound Design",
    desc: "Score, SFX, and mix work that gives every cut its cinematic weight.",
  },
  {
    category: "Strategy",
    title: "Content Strategy & Growth",
    desc: "Retention-first strategy, trend analysis, and creative direction.",
  },
];

const categoryColor: Record<Category, string> = {
  Video: "text-foreground",
  Design: "text-foreground",
  Audio: "text-foreground",
  Strategy: "text-foreground",
};

const SERIF = '"Fraunces", "Times New Roman", serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';

export function Services() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <Reveal>
        <p
          className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-muted-foreground"
          style={{ fontFamily: MONO }}
        >
          <span className="h-px w-8 bg-foreground/30" />
          What I Do
          <span className="ml-2 text-muted-foreground/50">— 06 services</span>
        </p>
      </Reveal>
      <Reveal delay={1}>
        <h2
          className="mt-8 max-w-3xl text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-foreground"
          style={{ fontFamily: SERIF, fontWeight: 400 }}
        >
          Services built for
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 300 }} className="text-foreground/70">
            the new creative pipeline.
          </span>
        </h2>
      </Reveal>

      {/* Editorial grid — hairline separators, no card boxes */}
      <div className="mt-20 grid grid-cols-1 gap-px bg-white/[0.06] md:grid-cols-6 md:auto-rows-fr">
        {services.map((s) => {
          // Featured card spans 2 cols on desktop
          const span = s.featured ? "md:col-span-4" : "md:col-span-2";
          return (
            <Reveal key={s.title} className={`h-full ${span}`}>
              <article
                className={`group relative flex h-full flex-col justify-between overflow-hidden bg-background p-8 transition-colors duration-500 hover:bg-card sm:p-10 ${
                  s.featured ? "md:p-12" : ""
                }`}
              >
                {/* Category tag — the only "accent" moment, and only for featured */}
                <div className="flex items-baseline justify-between">
                  <span
                    className={`text-[10px] uppercase tracking-[0.32em] ${
                      s.featured ? "text-gold" : "text-muted-foreground"
                    }`}
                    style={{ fontFamily: MONO }}
                  >
                    {s.category}
                  </span>
                  {s.featured && (
                    <span
                      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-gold/90"
                      style={{ fontFamily: MONO }}
                    >
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold shadow-[0_0_12px_var(--gold)] motion-reduce:animate-none" />
                      Flagship
                    </span>
                  )}
                </div>

                <div className="mt-16">
                  <h3
                    className={`tracking-[-0.01em] transition-colors duration-500 ${categoryColor[s.category]} ${
                      s.featured
                        ? "text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.05]"
                        : "text-[clamp(1.5rem,2.2vw,1.85rem)] leading-[1.1]"
                    }`}
                    style={{ fontFamily: SERIF, fontWeight: 400 }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`mt-4 leading-relaxed text-muted-foreground ${
                      s.featured ? "max-w-[52ch] text-base" : "max-w-[38ch] text-sm"
                    }`}
                  >
                    {s.desc}
                  </p>
                </div>

                {/* Bottom rail — subtle hover line that goes edge-to-edge (one deliberate motion) */}
                <div className="pointer-events-none mt-14">
                  <span
                    className={`block h-px origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:group-hover:scale-x-0 ${
                      s.featured ? "bg-gold" : "bg-foreground/60"
                    }`}
                  />
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
