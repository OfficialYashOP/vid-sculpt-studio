import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, Lock, X, ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";
import oryxCrake from "@/assets/oryx-crake-thumb.jpeg.asset.json";
import seedance2 from "@/assets/seedance2-thumb.webp.asset.json";
import haircare from "@/assets/proj-haircare.jpg";
import coffee from "@/assets/proj-coffee.jpg";

import candy from "@/assets/proj-candy.jpg";
import influencer from "@/assets/proj-influencer.jpg";
import ugcVideo from "@/assets/ugc-example.mp4.asset.json";
import ugcPoster from "@/assets/ugc-poster.jpg.asset.json";
import coffeeVideo from "@/assets/coffee-final-film.mp4.asset.json";
import coffeePoster from "@/assets/coffee-poster.jpg.asset.json";
import haircareVideo1 from "@/assets/haircare-ad-1.mp4.asset.json";
import haircareVideo2 from "@/assets/haircare-ad-2.mp4.asset.json";
import haircarePoster1 from "@/assets/haircare-ad-1-poster.jpg.asset.json";
import haircarePoster2 from "@/assets/haircare-ad-2-poster.jpg.asset.json";
import pandaBabyVideo from "@/assets/panda-baby.mp4.asset.json";
import pandaForestVideo from "@/assets/panda-forest.mp4.asset.json";
import pandaBabyPoster from "@/assets/panda-baby-poster.jpg.asset.json";
import pandaForestPoster from "@/assets/panda-forest-poster.jpg.asset.json";

type Category = "Short Film" | "Product Ads" | "UGC" | "Animation" | "AI Influencers";

interface VideoItem {
  label: string;
  poster: string;
  /** Direct video file URL — plays inline in the popup. */
  src?: string;
  /** External link (e.g. YouTube) — opens in a new tab. */
  link?: string;
}

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
  videos?: VideoItem[];
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
    videos: [
      { label: "Video 1", src: haircareVideo1.url, poster: haircarePoster1.url },
      { label: "Video 2", src: haircareVideo2.url, poster: haircarePoster2.url },
    ],
  },
  {
    title: "UGC-Style Reel",
    category: "UGC",
    image: ugcPoster.url,
    hook: "An authentic, creator-style short-form ad built to feel native to social feeds.",
    tags: ["Seedance 2.0", "UGC", "Social Ad"],
    videos: [{ label: "Play reel", src: ugcVideo.url, poster: ugcPoster.url }],
  },
  {
    title: "Professional Coffee Ad",
    category: "Product Ads",
    image: coffeePoster.url,
    hook: "A polished, premium-look product commercial for a coffee brand.",
    tags: ["Kling 3.0", "Product Commercial"],
    videos: [{ label: "Play ad", src: coffeeVideo.url, poster: coffeePoster.url }],
  },
  {
    title: "Panda Animation Series",
    category: "Animation",
    image: pandaBabyPoster.url,
    hook: "Short animated videos featuring an expressive panda character.",
    tags: ["Veo 3.1", "Character Animation"],
    meta: "2 videos",
    videos: [
      { label: "Baby Panda in the Snow", src: pandaBabyVideo.url, poster: pandaBabyPoster.url },
      { label: "Magical Forest Hide & Seek", src: pandaForestVideo.url, poster: pandaForestPoster.url },
    ],
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

function VideoModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const videos = project.videos ?? [];
  const single = videos.length === 1;
  const [selected, setSelected] = useState<number | null>(single ? 0 : null);
  const active = selected !== null ? videos[selected] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-foreground hover:border-gold/40"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl"
      >
        {active && active.src ? (
          <>
            <video
              key={active.src}
              src={active.src}
              poster={active.poster}
              controls
              autoPlay
              playsInline
              preload="auto"
              className="mx-auto max-h-[70vh] w-auto max-w-full rounded-xl border border-border shadow-2xl"
            />
            {videos.length > 1 && (
              <div className="mx-auto mt-4 flex max-w-full flex-wrap justify-center gap-3">
                {videos.map((v, i) => {
                  const isActive = selected === i;
                  return (
                    <button
                      key={v.label}
                      type="button"
                      onClick={() => setSelected(i)}
                      className={`group/thumb relative w-40 shrink-0 overflow-hidden rounded-lg border text-left transition-colors ${
                        isActive ? "border-gold" : "border-border hover:border-gold/50"
                      }`}
                    >
                      <img src={v.poster} alt={v.label} className="aspect-video w-full object-cover" />
                      {!isActive && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity group-hover/thumb:opacity-100">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/90 text-primary-foreground">
                            <Play className="h-4 w-4 translate-x-0.5" fill="currentColor" />
                          </span>
                        </div>
                      )}
                      <span className="absolute bottom-1.5 left-1.5 rounded-md bg-background/70 px-1.5 py-0.5 text-[11px] font-medium text-foreground">
                        {v.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div>
            <div className="mb-6 text-center">
              <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{project.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">Choose a video to play</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {videos.map((v, i) => {
                const content = (
                  <>
                    <img
                      src={v.poster}
                      alt={v.label}
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-background/25 transition-colors group-hover/thumb:bg-background/40">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/90 text-primary-foreground shadow-lg transition-transform duration-300 group-hover/thumb:scale-110">
                        {v.link ? <ExternalLink className="h-6 w-6" /> : <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />}
                      </span>
                    </div>
                    <span className="absolute bottom-3 left-3 rounded-md bg-background/70 px-2.5 py-1 text-sm font-medium text-foreground">
                      {v.label}
                    </span>
                  </>
                );
                const cls =
                  "group/thumb relative block overflow-hidden rounded-xl border border-border shadow-lg transition-colors hover:border-gold/60";
                return v.link ? (
                  <a key={v.label} href={v.link} target="_blank" rel="noreferrer" className={cls}>
                    {content}
                  </a>
                ) : (
                  <button key={v.label} type="button" onClick={() => setSelected(i)} className={cls}>
                    {content}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </motion.div>
  );
}

function Card({ project }: { project: Project }) {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const hasVideos = !!project.videos?.length;

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
      ) : hasVideos ? (
        <button
          type="button"
          onClick={() => setShowVideo(true)}
          aria-label={`Play ${project.title}`}
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

      <AnimatePresence>
        {hasVideos && showVideo && (
          <VideoModal project={project} onClose={() => setShowVideo(false)} />
        )}
      </AnimatePresence>
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
