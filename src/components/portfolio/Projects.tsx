import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import BlurText from "@/components/BlurText";
import BorderGlow from "@/components/BorderGlow";

import { AnimatePresence, motion } from "motion/react";
import { Play, Lock, X, ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";
import seedance2 from "@/assets/seedance2-thumb.jpeg.asset.json";
import haircare from "@/assets/haircare-thumb.png.asset.json";
import ranaSanga from "@/assets/rana-sanga-thumb.webp.asset.json";
import influencer from "@/assets/proj-influencer.jpg.asset.json";
import ugcVideo from "@/assets/ugc-example.mp4.asset.json";
import ugcPoster from "@/assets/ugc-girl-thumbnail.png.asset.json";
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
import ranaSangaVideo from "@/assets/rana-sanga.mp4.asset.json";

/** Tiny, dependency-free "pop" click sound via the Web Audio API. */
let _audioCtx: AudioContext | null = null;
function playPop() {
  try {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return;
    _audioCtx = _audioCtx || new AC();
    const ctx = _audioCtx;
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(720, now + 0.09);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.24);
  } catch {
    /* no-op */
  }
}

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
    image: haircare.url,
    hook: "Stylized 3D-animation-inspired product ads for a hair care brand.",
    tags: ["Seedance 2.0", "Pixar Style", "Product Ad"],
    meta: "2 videos",
    videos: [
      { label: "9:16 TikTok Style Ad", src: haircareVideo1.url, poster: haircarePoster1.url },
      { label: "16:9 Cinematic Ad", src: haircareVideo2.url, poster: haircarePoster2.url },
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
    title: "Rana Sanga — Animated History Film",
    category: "Animation",
    image: ranaSanga.url,
    hook: "An AI-animated historical short retelling the story of Rana Sanga — dramatic, cinematic storytelling brought to life with AI video tools.",
    tags: ["AI Animation", "History", "Cinematic Short"],
    videos: [{ label: "Play film", src: ranaSangaVideo.url, poster: ranaSanga.url }],
  },
  {
    title: "AI Influencer Creation",
    category: "AI Influencers",
    image: influencer.url,
    hook: "Fully AI-generated virtual influencer personas with consistent character design.",
    tags: [
      "Character Consistency",
      "Character Reels",
      "Kling Motion Control",
      "Nano Banana Pro",
      "Seedance 2",
    ],
    meta: "2 clients",
    privacy: true,
  },
];

const filters = ["All", "Short Film", "Product Ads", "UGC", "Animation", "AI Influencers"] as const;

function useNavHideWhilePlaying() {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("portfolio:video", { detail: true }));
    return () => {
      window.dispatchEvent(new CustomEvent("portfolio:video", { detail: false }));
    };
  }, []);
}

function useLockBodyScroll() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
}

function VideoModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useNavHideWhilePlaying();
  useLockBodyScroll();
  const videos = project.videos ?? [];
  const single = videos.length === 1;
  const [selected, setSelected] = useState<number | null>(single ? 0 : null);
  const active = selected !== null ? videos[selected] : null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-background/98 p-4 backdrop-blur-xl"
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
            <BorderGlow
              active
              borderRadius={14}
              glowRadius={34}
              glowColor="40 90 62"
              backgroundColor="#0c0a07"
              colors={["#e6b352", "#f472b6", "#38bdf8"]}
              className="mx-auto w-fit"
            >
              <video
                key={active.src}
                src={active.src}
                poster={active.poster}
                controls
                autoPlay
                playsInline
                preload="auto"
                className="mx-auto max-h-[70vh] w-auto max-w-full rounded-[13px]"
              />
            </BorderGlow>
            {videos.length > 1 && (
              <div className="mx-auto mt-6 flex max-w-full flex-wrap justify-center gap-4">
                {videos.map((v, i) => {
                  const isActive = selected === i;
                  return (
                    <BorderGlow
                      key={v.label}
                      active={isActive}
                      borderRadius={10}
                      glowRadius={16}
                      glowColor="40 90 62"
                      backgroundColor="#0c0a07"
                      colors={["#e6b352", "#f472b6", "#38bdf8"]}
                      className="w-40 shrink-0"
                    >
                      <button
                        type="button"
                        onClick={() => setSelected(i)}
                        className="group/thumb relative block w-full overflow-hidden rounded-[9px] text-left"
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
                    </BorderGlow>
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

    </motion.div>,
    document.body,
  );
}

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function YouTubeModal({ id, onClose }: { id: string; onClose: () => void }) {
  useNavHideWhilePlaying();
  useLockBodyScroll();
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/98 p-4 backdrop-blur-xl"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-foreground hover:border-gold/40"
      >
        <X className="h-5 w-5" />
      </button>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}

function Card({ project }: { project: Project }) {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showYouTube, setShowYouTube] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const hasVideos = !!project.videos?.length;
  const youTubeId = project.link ? getYouTubeId(project.link) : null;
  const cardRef = useRef<HTMLElement>(null);

  const MAX_TAGS = project.featured ? 4 : 2;
  const visibleTags = showAllTags ? project.tags : project.tags.slice(0, MAX_TAGS);
  const hiddenCount = project.tags.length - visibleTags.length;

  useEffect(() => {
    if (!showPrivacy) return;
    const handleOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setShowPrivacy(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && setShowPrivacy(false);
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showPrivacy]);

  return (
    <BorderGlow
      borderRadius={22}
      glowRadius={30}
      glowColor="40 90 62"
      backgroundColor="#17171b"
      colors={["#e6b352", "#f4b8d0", "#8fd0ff"]}
      className={`h-full ${project.featured ? "sm:col-span-2" : ""}`.trim()}
    >
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[22px] bg-card shadow-card transition-shadow duration-500 hover:shadow-card-hover"
    >
      <div className={`relative w-full overflow-hidden ${project.featured ? "aspect-video" : "aspect-[4/3]"}`}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        {/* subtle top-right scrim just to keep the play button legible on bright frames */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-background/40 via-transparent to-transparent" />

        <div className="group/play absolute right-3 top-3 z-30 transition-opacity duration-300 sm:right-4 sm:top-4">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-card/70 text-gold shadow-lg ring-1 ring-gold/40 backdrop-blur-md transition-all duration-300 group-hover/play:bg-gold group-hover/play:text-primary-foreground group-hover/play:shadow-[0_0_22px_rgba(230,179,82,0.6)] group-hover/play:ring-gold group-active/play:scale-90 motion-reduce:transition-none motion-reduce:group-active/play:scale-100 sm:h-12 sm:w-12">
            {/* pulsing halo — only on direct play-button hover, disabled for reduced motion */}
            {!project.privacy && (
              <span className="pointer-events-none absolute inset-0 rounded-full bg-gold/40 opacity-0 transition-opacity duration-300 group-hover/play:opacity-70 group-hover/play:motion-safe:animate-ping" />
            )}
            {project.privacy ? (
              <Lock className="relative h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Play className="relative h-5 w-5 translate-x-0.5 transition-transform duration-300 group-hover/play:scale-110 motion-reduce:transition-none motion-reduce:group-hover/play:scale-100 sm:h-6 sm:w-6" fill="currentColor" />
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
          onClick={() => {
            playPop();
            setShowPrivacy((v) => !v);
          }}
          aria-label={`${project.title} — client privacy notice`}
          className="absolute inset-0 z-10"
        />
      ) : hasVideos ? (
        <button
          type="button"
          onClick={() => {
            playPop();
            setShowVideo(true);
          }}
          aria-label={`Play ${project.title}`}
          className="absolute inset-0 z-10"
        />
      ) : youTubeId ? (
        <button
          type="button"
          onClick={() => {
            playPop();
            setShowYouTube(true);
          }}
          aria-label={`Watch ${project.title}`}
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

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background to-background/70 p-5 sm:p-6">
        <h3
          className={`flex flex-wrap items-baseline gap-x-2 font-display leading-tight tracking-tight ${
            project.featured ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          <span>{project.title}</span>
          {project.meta && (
            <span className="text-sm font-sans font-medium text-muted-foreground">
              · {project.meta}
            </span>
          )}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {visibleTags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-gold/25 bg-background/60 px-2.5 py-1 text-[10.5px] font-medium leading-none tracking-wide text-gold backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowAllTags(true);
              }}
              className="relative z-20 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[10.5px] font-semibold leading-none tracking-wide text-gold transition-colors hover:bg-gold/20"
            >
              +{hiddenCount} more
            </button>
          )}
          {showAllTags && project.tags.length > MAX_TAGS && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowAllTags(false);
              }}
              className="relative z-20 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[10.5px] font-medium leading-none tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              Show less
            </button>
          )}
        </div>

        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out sm:grid-rows-[0fr] sm:group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="mt-2.5 line-clamp-3 max-w-lg text-sm leading-relaxed text-muted-foreground/90 sm:line-clamp-none">
              {project.hook}
            </p>
          </div>
        </div>
      </div>



      <AnimatePresence>
        {hasVideos && showVideo && (
          <VideoModal project={project} onClose={() => setShowVideo(false)} />
        )}
        {youTubeId && showYouTube && (
          <YouTubeModal id={youTubeId} onClose={() => setShowYouTube(false)} />
        )}
      </AnimatePresence>
    </motion.article>
    </BorderGlow>
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
          <BlurText text="Selected AI video projects" animateBy="words" className="flex-wrap" />
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
