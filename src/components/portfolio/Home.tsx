import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Film, Code2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import Aurora from "@/components/Aurora";
import BlurText from "@/components/BlurText";
import SpotlightCard from "@/components/SpotlightCard";
import StarBorder from "@/components/StarBorder";

type CardItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  to?: string;
  external?: string;
  comingSoon?: boolean;
  cta: string;
};

const cards: CardItem[] = [
  {
    title: "AI Video Creator",
    description:
      "Cinematic AI-generated ads, short films & UGC. Explore my full AI video portfolio.",
    icon: <Film className="h-7 w-7" />,
    to: "/AI",
    cta: "View Portfolio",
  },
  {
    title: "Software Developer",
    description:
      "Web apps, tools and interfaces built with modern stacks. Portfolio in the works.",
    icon: <Code2 className="h-7 w-7" />,
    comingSoon: true,
    cta: "Coming Soon",
  },
  {
    title: "Cyber Security",
    description:
      "Security research, hardening and defensive tooling. Portfolio in the works.",
    icon: <ShieldCheck className="h-7 w-7" />,
    comingSoon: true,
    cta: "Coming Soon",
  },
];

export function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="grain relative isolate flex min-h-svh flex-col items-center overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {mounted && (
            <div className="absolute inset-0 opacity-100">
              <Aurora colorStops={["#7cff67", "#B497CF", "#5227FF"]} blend={0.35} amplitude={2.2} speed={0.7} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/10 to-background/0" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-32 pb-20 sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-gold"
          >
            <span className="h-px w-10 bg-gold" /> Yash Pandey <span className="h-px w-10 bg-gold" />
          </motion.p>

          <h1 className="mx-auto max-w-4xl text-center font-display text-6xl leading-[0.9] tracking-tight sm:text-8xl">
            <BlurText
              text="Full Portfolio"
              animateBy="words"
              direction="top"
              delay={120}
              className="flex-wrap justify-center"
            />
            <BlurText
              text="Coming Soon"
              animateBy="words"
              direction="top"
              delay={120}
              className="flex-wrap justify-center text-gradient-gold"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 max-w-xl text-center text-lg leading-relaxed text-muted-foreground"
          >
            Three worlds, one creator. Dive into what's ready now and stay tuned for more.
          </motion.p>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {cards.map((card, i) => {
              const inner = (
                <StarBorder
                  color="rgba(230, 179, 82, 0.9)"
                  speed="6s"
                  thickness={2}
                  className="h-full"
                >
                  <SpotlightCard
                    className="group flex h-full min-h-[340px] flex-col justify-between bg-gradient-to-br from-card via-card to-background/60 p-7 !ring-1 !ring-inset !ring-white/5 backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1 sm:p-8"
                    spotlightColor="rgba(230, 179, 82, 0.22)"
                  >
                    <div>
                      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/25 to-gold/5 text-gold ring-1 ring-inset ring-gold/20 transition-transform duration-500 group-hover:scale-110">
                        {card.icon}
                      </div>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <h2 className="font-display text-3xl tracking-tight">{card.title}</h2>
                        {card.comingSoon && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-gold/20 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold/80">
                            <Clock className="h-3 w-3" /> Soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                    </div>
                    <div
                      className={`mt-8 inline-flex items-center gap-2 border-t border-white/5 pt-5 text-sm font-semibold ${
                        card.comingSoon ? "text-muted-foreground" : "text-gold"
                      }`}
                    >
                      {card.cta}
                      {!card.comingSoon && (
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                    </div>
                  </SpotlightCard>
                </StarBorder>
              );

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  {card.to ? (
                    <Link to={card.to} className="block h-full">
                      {inner}
                    </Link>
                  ) : (
                    <div className="h-full cursor-not-allowed opacity-90">{inner}</div>
                  )}
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
