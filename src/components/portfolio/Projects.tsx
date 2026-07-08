import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, Lock } from "lucide-react";
import { Reveal } from "./Reveal";
import oryxCrake from "@/assets/oryx-crake-thumb.jpeg.asset.json";
import seedance2 from "@/assets/seedance2-thumb.webp.asset.json";
import haircare from "@/assets/proj-haircare.jpg";
import ugc from "@/assets/proj-ugc.jpg";
import coffee from "@/assets/proj-coffee.jpg";
import panda from "@/assets/panda-thumb.png.asset.json";
import candy from "@/assets/proj-candy.jpg";
import influencer from "@/assets/proj-influencer.jpg";
import ugcVideo from "@/assets/ugc-example.mp4.asset.json";
import coffeeVideo from "@/assets/coffee-final-film.mp4.asset.json";

type Category = "Short Film" | "Product Ads" | "UGC" | "Animation" | "AI Influencers";

interface Project {
  title: string;
  category: Category;
  image: string;
  hook: string;
  tags: string[];
  featured?: boolean;
  meta?: string;
  link?: string;
  privacy?: boolean;
  video?: string;
}

const projects: Project[] = [
  {
    title: "Oryx and Crake — AI Short Film",
    category: "Short Film",
    image: oryxCrake.url,
    hook: "A 12-minute cinematic adaptation of Margaret Atwood's Oryx and Crake, brought to life in a 3D Pixar-inspired style — generated entirely with AI and edited for pacing, storytelling, and sound design.",
    tags: ["3D Pixar Style", "12 Minutes", "Literary Adaptation"],
    featured: true,
    link: "https://youtu.be/uRsxW4OFLBE",
  },
  {
    title: "Seedance 2 — AI Short Film",
    category: "Short Film",
    image: seedance2.url,
    hook: "A 12-minute AI-generated short film created with Seedance 2 — a cinematic, studio-grade production made entirely with AI video tools and crafted for storytelling, pacing, and sound.",
    tags: ["Seedance 2", "12 Minutes", "AI Short Film"],
    featured: true,
    link: "https://www.youtube.com/watch?v=g4vHot5uwmg",
  },
  {
    title: "Pixar-Style Hair Care Ads",
    category: "Product Ads",
    image: haircare,
    hook: "Stylized 3D-animation-inspired product ads for a hair care brand.",
    tags: ["Seedance 2.0", "Pixar Style", "Product Ad"],
    meta: "2 videos",
  },
  {
    title: "UGC-Style Reel",
    category: "UGC",
    image: ugc,
    hook: "An authentic, creator-style short-form ad built to feel native to social feeds.",
    tags: ["Seedance 2.0", "UGC", "Social Ad"],
    video: ugcVideo.url,
  },
  {
    title: "Professional Coffee Ad",
    category: "Product Ads",
    image: coffee,
    hook: "A polished, premium-look product commercial for a coffee brand.",
    tags: ["Kling 3.0", "Product Commercial"],
    video: coffeeVideo.url,
  },
  {
    title: "Panda Animation Series",
    category: "Animation",
    image: panda.url,
    hook: "Short animated videos featuring an expressive panda character.",
    tags: ["Veo 3.1", "Character Animation"],
    link: "https://youtu.be/2b8YqZWY1B0",
  },
  {
    title: "Panda Animation — Part 2",
    category: "Animation",
    image: panda.url,
    hook: "A second short in the panda animation series, continuing the expressive character storytelling.",
    tags: ["Veo 3.1", "Character Animation"],
    link: "https://youtu.be/BMA1o_VeWzc",
  },
  {
    title: "Candy Montage Ad",
    category: "Product Ads",
    image: candy,
    hook: "A clean, visually satisfying product montage built for quick social consumption.",
    tags: ["AI Video", "Product Montage"],
  },
  {
    title: "AI Influencer Creation",
    category: "AI Influencers",
    image: influencer,
    hook: "Fully AI-generated virtual influencer personas with consistent character design.",
    tags: ["AI Influencer", "Character Design", "Client Work"],
    meta: "2 clients",
    privacy: true,
  },
];

const filters = ["All", "Short Film", "Product Ads", "UGC", "Animation", "AI Influencers"] as const;

function Card({ project }: { project: Project }) {
  const [showPrivacy, setShowPrivacy] = useState(false);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-border ${
        project.featured ? "sm:col-span-2" : ""
      }`}
    >
      <div className={`relative w-full overflow-hidden ${project.featured ? "aspect-video" : "aspect-[4/3]"}`}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/90 text-primary-foreground shadow-lg">
            {project.privacy ? (
              <Lock className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
            )}
          </span>
        </div>

        {project.privacy && showPrivacy && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/85 p-6 text-center backdrop-blur-sm">
            <div>
              <Lock className="mx-auto mb-3 h-7 w-7 text-gold" />
              <p className="text-sm leading-relaxed text-foreground">
                We can't show these due to client privacy — both models combined
                have over <span className="font-semibold text-gold">150K followers</span>.
              </p>
            </div>
          </div>
        )}
      </div>

      {project.privacy ? (
        <button
          type="button"
          onClick={() => setShowPrivacy((v) => !v)}
          aria-label={`${project.title} — client privacy notice`}
          className="absolute inset-0 z-10"
        />
      ) : (
        project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Watch ${project.title}`}
            className="absolute inset-0 z-10"
          />
        )
      )}

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-gold/30 bg-background/40 px-2.5 py-1 text-[11px] font-medium text-gold backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
        <h3
          className={`font-display tracking-tight ${
            project.featured ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          {project.title}
          {project.meta && (
            <span className="ml-2 align-middle text-sm font-sans font-medium text-muted-foreground">
              · {project.meta}
            </span>
          )}
        </h3>
        <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {project.hook}
        </p>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible = projects.filter((p) => active === "All" || p.category === active);

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
      <Reveal>
        <p className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-gold">
          <span className="h-px w-10 bg-gold" /> Featured Work
        </p>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="max-w-2xl font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
          Selected AI video projects
        </h2>
      </Reveal>

      <Reveal delay={2}>
        <div className="mt-9 flex flex-wrap gap-2.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                active === f
                  ? "bg-gold text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div
        layout
        className="mt-10 grid auto-rows-auto grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <Card key={p.title} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
