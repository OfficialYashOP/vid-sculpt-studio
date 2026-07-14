import { Reveal } from "./Reveal";

type Category = "Video" | "Design" | "Audio" | "Strategy";

type Service = {
  category: Category;
  title: string;
  desc: string;
  span: 2 | 3 | 4 | 6;
  featured?: boolean;
};

// Grid math on md (6 cols):
// Row 1: UGC (4, featured) + AI Short Films (2)          = 6
// Row 2: Image-to-Video (2) + Thumbnail (2) + Sound (2)  = 6
// Row 3: Content Strategy (6, full-width closer)         = 6
const services: Service[] = [
  {
    category: "Video",
    title: "UGC & Marketing Ad Videos",
    desc: "Authentic, feed-native ads and creator-style content built to convert. Currently the flagship service — most of my recent work sits here.",
    span: 4,
    featured: true,
  },
  {
    category: "Video",
    title: "AI Short Films & Cinematic Content",
    desc: "Full narrative pieces generated and edited for pacing, tone, and emotional impact.",
    span: 2,
  },
  {
    category: "Video",
    title: "Image-to-Video Generation",
    desc: "Turning stills and concepts into motion with the latest image-to-video models.",
    span: 2,
  },
  {
    category: "Design",
    title: "Thumbnail & Visual Design",
    desc: "Scroll-stopping thumbnails and key art crafted for click-through.",
    span: 2,
  },
  {
    category: "Audio",
    title: "Sound Design",
    desc: "Score, SFX, and mix work that gives every cut its cinematic weight.",
    span: 2,
  },
  {
    category: "Strategy",
    title: "Content Strategy & Growth",
    desc: "Retention-first strategy, trend analysis, and creative direction — the layer above the tools that decides what gets made and why.",
    span: 6,
  },
];

const SERIF = '"Fraunces", "Times New Roman", serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';

function CategoryTag({
  category,
  featured,
}: {
  category: Category;
  featured?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] ${
        featured ? "text-gold" : "text-foreground/65"
      }`}
      style={{ fontFamily: MONO }}
    >
      <span
        aria-hidden
        className={`h-1 w-1 rounded-full ${
          featured ? "bg-gold shadow-[0_0_10px_var(--gold)]" : "bg-foreground/50"
        }`}
      />
      {category}
    </span>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative border-t border-white/[0.06] bg-background"
    >
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:px-10 sm:pt-24 sm:pb-32">
        {/* Header — no kicker; single supporting mono line under the headline for rhythm */}
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <Reveal>
            <h2
              className="max-w-3xl text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-foreground"
              style={{ fontFamily: SERIF, fontWeight: 400 }}
            >
              Services built for
              <br />
              <span
                style={{ fontStyle: "italic", fontWeight: 300 }}
                className="text-foreground/70"
              >
                the new creative pipeline.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p
              className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
              style={{ fontFamily: MONO }}
            >
              Six offerings · one pipeline
            </p>
          </Reveal>
        </div>

        {/* Editorial grid — hairline separators, no card boxes */}
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-white/[0.06] md:grid-cols-6 md:auto-rows-fr">
          {services.map((s) => {
            const spanClass =
              s.span === 6
                ? "md:col-span-6"
                : s.span === 4
                  ? "md:col-span-4"
                  : s.span === 3
                    ? "md:col-span-3"
                    : "md:col-span-2";

            return (
              <Reveal key={s.title} className={`h-full ${spanClass}`}>
                <article
                  className={`group relative flex h-full flex-col justify-between overflow-hidden p-8 ring-1 ring-inset ring-transparent transition-[background-color,box-shadow] duration-500 hover:ring-white/[0.09] motion-reduce:transition-none sm:p-10 ${
                    s.featured
                      ? "bg-[#111114] md:p-12"
                      : "bg-background hover:bg-card/60"
                  }`}
                >
                  {/* Flagship: subtle grain + a hairline gold left edge (the one moment of richness) */}
                  {s.featured && (
                    <>
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-6 left-0 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                        }}
                      />
                    </>
                  )}

                  {/* Top row: category + flagship marker */}
                  <div className="relative flex items-baseline justify-between">
                    <CategoryTag category={s.category} featured={s.featured} />
                    {s.featured && (
                      <span
                        className="text-[10px] uppercase tracking-[0.32em] text-gold/85"
                        style={{ fontFamily: MONO }}
                      >
                        Flagship
                      </span>
                    )}
                  </div>

                  {/* Content — locked type scale per size class */}
                  <div className="relative mt-14 sm:mt-16">
                    <h3
                      className={`tracking-[-0.01em] text-foreground ${
                        s.featured
                          ? "text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.05]"
                          : s.span === 6
                            ? "text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.05]"
                            : "text-[clamp(1.5rem,2.2vw,1.85rem)] leading-[1.1]"
                      }`}
                      style={{ fontFamily: SERIF, fontWeight: 400 }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className={`mt-4 text-[14px] leading-[1.65] text-muted-foreground ${
                        s.featured
                          ? "max-w-[52ch]"
                          : s.span === 6
                            ? "max-w-[60ch]"
                            : "max-w-[34ch]"
                      }`}
                    >
                      {s.desc}
                    </p>
                  </div>

                  {/* Bottom rail — subtle hover line, one deliberate motion */}
                  <div className="pointer-events-none relative mt-14">
                    <span
                      className={`block h-px origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:group-hover:scale-x-0 ${
                        s.featured ? "bg-gold" : "bg-foreground/50"
                      }`}
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
