import BlurText from "@/components/BlurText";
import SpotlightCard from "@/components/SpotlightCard";
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
            <SpotlightCard
              spotlightColor="rgba(230, 179, 82, 0.18)"
              className="group glass h-full !rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40"
            >
              <div className="mb-6 inline-flex rounded-xl bg-gold/12 p-3 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
