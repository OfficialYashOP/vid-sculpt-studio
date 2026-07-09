import BlurText from "@/components/BlurText";
import GradientText from "@/components/GradientText";
import SpotlightCard from "@/components/SpotlightCard";
import BorderGlow from "@/components/BorderGlow";
import {
  Clapperboard,
  Megaphone,
  Wand2,
  ImageIcon,
  AudioLines,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "./Reveal";

const services = [
  {
    icon: Clapperboard,
    title: "AI Short Films & Cinematic Content",
    desc: "Full narrative pieces generated and edited for pacing, tone, and emotional impact.",
  },
  {
    icon: Megaphone,
    title: "UGC & Marketing Ad Videos",
    desc: "Authentic, feed-native ads and creator-style content built to convert.",
  },
  {
    icon: Wand2,
    title: "Image-to-Video Generation",
    desc: "Turning stills and concepts into motion with the latest image-to-video models.",
  },
  {
    icon: ImageIcon,
    title: "Thumbnail & Visual Design",
    desc: "Scroll-stopping thumbnails and key art crafted for click-through.",
  },
  {
    icon: AudioLines,
    title: "Sound Design",
    desc: "Score, SFX, and mix work that gives every cut its cinematic weight.",
  },
  {
    icon: TrendingUp,
    title: "Content Strategy & Growth",
    desc: "Retention-first strategy, trend analysis, and creative direction.",
  },
];

export function Services() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
      <Reveal>
        <p className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-gold">
          <span className="h-px w-10 bg-gold" /> What I Do
        </p>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="max-w-2xl font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
          <BlurText text="Services built for the new creative pipeline" animateBy="words" className="flex-wrap" />
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i} className="h-full">
            <BorderGlow
              borderRadius={22}
              glowRadius={28}
              glowColor="40 90 62"
              backgroundColor="#17171b"
              colors={["#e6b352", "#f4b8d0", "#8fd0ff"]}
              className="h-full"
            >
            <SpotlightCard
              spotlightColor="rgba(230, 179, 82, 0.22)"
              className="group relative h-full overflow-hidden !rounded-[22px] border border-white/5 bg-gradient-to-br from-card/95 via-card/70 to-card/40 p-7 shadow-card backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-card-hover"
            >
              {/* glow accent */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {/* top gradient hairline */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* index badge */}
              <span className="absolute right-6 top-6 font-display text-4xl font-bold leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-gold/15">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative mb-6 inline-flex rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 p-3.5 text-gold ring-1 ring-inset ring-gold/20 transition-all duration-500 group-hover:from-gold group-hover:to-gold group-hover:text-primary-foreground group-hover:shadow-[0_8px_24px_-8px_rgba(230,179,82,0.6)]">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="relative text-lg font-bold tracking-tight transition-colors duration-500 group-hover:text-gold">
                <BlurText text={s.title} animateBy="words" className="flex-wrap" />
              </h3>
              <p className="relative mt-2.5 text-sm leading-relaxed text-muted-foreground/90">{s.desc}</p>

              {/* bottom accent line */}
              <div className="relative mt-6 h-px w-10 bg-gold/30 transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />
            </SpotlightCard>
            </BorderGlow>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
