import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

const SERIF = '"Fraunces", "Times New Roman", serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';

/** Tiny "pop" click sound via the Web Audio API. */
let _audioCtx: AudioContext | null = null;
function playPop() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
  src?: string;
  link?: string;
}

interface Project {
  title: string;
  category: Category;
  image: string;
  hook: string;
  /** Genre / format — one word, mono caps. */
  format: string;
  /** AI tools / models used — outlined pills. */
  tools: string[];
  /** Optional credit line — appears only on hero card. */
  credit?: string;
  /** Optional runtime / spec. */
  runtime?: string;
  featured?: boolean;
  meta?: string;
  link?: string;
  privacy?: boolean;
  videos?: VideoItem[];
}

const projects: Project[] = [
  {
    title: "Oryx & Crake",
    category: "Short Film",
    image: seedance2.url,
    hook: "A twelve-minute AI-generated short film — a full studio-grade production built end-to-end with generative video. Written, directed, edited and scored for pacing, restraint, and real cinematic weight.",
    format: "AI Short Film",
    tools: ["Seedance 2", "Kling 3.0", "Sound Design"],
    credit: "Written, directed & edited by Yash Pandey",
    runtime: "12 MIN · 2026",
    featured: true,
    link: "https://www.youtube.com/watch?v=g4vHot5uwmg",
  },
  {
    title: "Rana Sanga",
    category: "Animation",
    image: ranaSanga.url,
    hook: "An AI-animated historical short retelling the story of Rana Sanga.",
    format: "Historical Animation",
    tools: ["AI Animation", "Kling 3.0"],
    videos: [{ label: "Play film", src: ranaSangaVideo.url, poster: ranaSanga.url }],
  },
  {
    title: "Hair Care — Pixar Style",
    category: "Product Ads",
    image: haircare.url,
    hook: "Stylized 3D-inspired product ads for a hair care brand.",
    format: "Product Ad",
    tools: ["Seedance 2"],
    meta: "2 videos",
    videos: [
      { label: "9:16 TikTok Style Ad", src: haircareVideo1.url, poster: haircarePoster1.url },
      { label: "16:9 Cinematic Ad", src: haircareVideo2.url, poster: haircarePoster2.url },
    ],
  },
  {
    title: "UGC Reel",
    category: "UGC",
    image: ugcPoster.url,
    hook: "A creator-style short-form ad built to feel native to social feeds.",
    format: "Social Ad",
    tools: ["Seedance 2"],
    videos: [{ label: "Play reel", src: ugcVideo.url, poster: ugcPoster.url }],
  },
  {
    title: "Coffee Commercial",
    category: "Product Ads",
    image: coffeePoster.url,
    hook: "A premium-look product commercial for a coffee brand.",
    format: "Product Ad",
    tools: ["Kling 3.0"],
    videos: [{ label: "Play ad", src: coffeeVideo.url, poster: coffeePoster.url }],
  },
  {
    title: "Panda Series",
    category: "Animation",
    image: pandaBabyPoster.url,
    hook: "Short animated videos featuring an expressive panda character.",
    format: "Character Animation",
    tools: ["Veo 3.1"],
    meta: "2 videos",
    videos: [
      { label: "Baby Panda in the Snow", src: pandaBabyVideo.url, poster: pandaBabyPoster.url },
      { label: "Magical Forest Hide & Seek", src: pandaForestVideo.url, poster: pandaForestPoster.url },
    ],
  },
  {
    title: "AI Influencers",
    category: "AI Influencers",
    image: influencer.url,
    hook: "Fully AI-generated virtual influencer personas with consistent character design across a full content pipeline.",
    format: "Virtual Persona",
    tools: ["Kling Motion Control", "Nano Banana Pro", "Seedance 2"],
    meta: "2 clients · 150K+ combined",
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

      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl">
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
              <h3 className="text-2xl tracking-tight sm:text-3xl" style={{ fontFamily: SERIF, fontWeight: 400 }}>
                {project.title}
              </h3>
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

/* -------------------------------- Cards -------------------------------- */

function ToolTags({ tools, className = "" }: { tools: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tools.map((t, i) => (
        <span
          key={t}
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10.5px] uppercase leading-none tracking-[0.16em] ${
            i === 0
              ? "border border-foreground/30 bg-foreground/[0.06] text-foreground"
              : "border border-white/10 text-muted-foreground"
          }`}
          style={{ fontFamily: MONO }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function FormatTag({ format, index }: { format: string; index: string }) {
  return (
    <div className="flex items-center gap-3 text-[10.5px] uppercase tracking-[0.28em] text-muted-foreground" style={{ fontFamily: MONO }}>
      <span className="text-muted-foreground/60">{index}</span>
      <span className="h-px w-6 bg-white/15" />
      <span>{format}</span>
    </div>
  );
}

function HeroCard({ project, index }: { project: Project; index: string }) {
  const [showVideo, setShowVideo] = useState(false);
  const [showYouTube, setShowYouTube] = useState(false);
  const hasVideos = !!project.videos?.length;
  const youTubeId = project.link ? getYouTubeId(project.link) : null;

  const activate = () => {
    playPop();
    if (hasVideos) setShowVideo(true);
    else if (youTubeId) setShowYouTube(true);
    else if (project.link) window.open(project.link, "_blank", "noreferrer");
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative sm:col-span-2 lg:col-span-3"
    >
      <button
        type="button"
        onClick={activate}
        aria-label={`Play ${project.title}`}
        className="relative block w-full overflow-hidden rounded-sm border border-white/[0.08] bg-card text-left"
      >
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          {/* Runtime tag — top-left, mono */}
          {project.runtime && (
            <span
              className="absolute left-5 top-5 rounded-full border border-white/15 bg-background/40 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-foreground backdrop-blur-md sm:left-8 sm:top-8"
              style={{ fontFamily: MONO }}
            >
              {project.runtime}
            </span>
          )}

          {/* Hero play — bottom-left, integrated with the caption. Only on hover. */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 sm:p-8 md:p-10">
            <div className="max-w-2xl">
              <FormatTag format={project.format} index={index} />
              <h3
                className="mt-3 text-[clamp(2rem,5vw,3.75rem)] leading-[0.98] tracking-[-0.02em] text-foreground"
                style={{ fontFamily: SERIF, fontWeight: 400 }}
              >
                {project.title.split(" & ").length === 2 ? (
                  <>
                    {project.title.split(" & ")[0]}{" "}
                    <span style={{ fontStyle: "italic", fontWeight: 300 }} className="text-foreground/85">
                      & {project.title.split(" & ")[1]}
                    </span>
                  </>
                ) : (
                  project.title
                )}
              </h3>
            </div>

            <span
              className="hidden shrink-0 items-center gap-3 rounded-full border border-white/20 bg-background/50 px-5 py-3 text-[11px] uppercase tracking-[0.28em] text-foreground opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 motion-reduce:transition-none sm:flex"
              style={{ fontFamily: MONO }}
            >
              <span className="flex h-2 w-2 items-center justify-center">
                <Play className="h-2.5 w-2.5 translate-x-[1px] text-gold" fill="currentColor" />
              </span>
              Play film
            </span>
          </div>
        </div>
      </button>

      {/* Caption strip below — real editorial credit */}
      <div className="mt-5 grid gap-6 border-t border-white/[0.08] pt-5 md:grid-cols-[1.5fr_1fr] md:gap-12">
        <p className="max-w-2xl text-[15px] leading-[1.7] text-muted-foreground">
          {project.hook}
        </p>
        <div className="flex flex-col gap-3 text-[11px] uppercase tracking-[0.24em] text-muted-foreground" style={{ fontFamily: MONO }}>
          {project.credit && <span className="text-foreground/80">{project.credit}</span>}
          <ToolTags tools={project.tools} />
        </div>
      </div>

      <AnimatePresence>
        {hasVideos && showVideo && <VideoModal project={project} onClose={() => setShowVideo(false)} />}
        {youTubeId && showYouTube && <YouTubeModal id={youTubeId} onClose={() => setShowYouTube(false)} />}
      </AnimatePresence>
    </motion.article>
  );
}

function StandardCard({ project, index }: { project: Project; index: string }) {
  const [showVideo, setShowVideo] = useState(false);
  const [showYouTube, setShowYouTube] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const hasVideos = !!project.videos?.length;
  const youTubeId = project.link ? getYouTubeId(project.link) : null;
  const isLocked = !!project.privacy;

  const activate = () => {
    if (isLocked) return;
    playPop();
    if (hasVideos) setShowVideo(true);
    else if (youTubeId) setShowYouTube(true);
    else if (project.link) window.open(project.link, "_blank", "noreferrer");
  };

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
    >
      <button
        type="button"
        onClick={activate}
        aria-label={isLocked ? `${project.title} — client-gated` : `Play ${project.title}`}
        className={`relative block w-full overflow-hidden rounded-sm border border-white/[0.08] bg-card text-left ${
          isLocked ? "cursor-default" : ""
        }`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
              isLocked ? "opacity-70 [filter:grayscale(0.6)]" : ""
            }`}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />

          {/* Locked state — deliberate label, not a stray icon */}
          {isLocked && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/30 backdrop-blur-[2px]">
              <Lock className="h-4 w-4 text-foreground/70" />
              <span
                className="rounded-full border border-white/20 bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-foreground/90 backdrop-blur-md"
                style={{ fontFamily: MONO }}
              >
                Client-gated · Under NDA
              </span>
            </div>
          )}

          {/* Play button — only on hover, subtle */}
          {!isLocked && (
            <span
              aria-hidden
              className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-background/50 text-foreground opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 motion-reduce:transition-none"
            >
              <Play className="h-3.5 w-3.5 translate-x-[1px]" fill="currentColor" />
            </span>
          )}
        </div>
      </button>

      {/* Caption */}
      <div className="mt-4 flex flex-col gap-3">
        <FormatTag format={project.format} index={index} />
        <h3
          className="text-[clamp(1.35rem,2vw,1.75rem)] leading-[1.05] tracking-[-0.01em] text-foreground"
          style={{ fontFamily: SERIF, fontWeight: 400 }}
        >
          {project.title}
          {project.meta && (
            <span className="ml-2 text-xs uppercase tracking-[0.24em] text-muted-foreground" style={{ fontFamily: MONO }}>
              · {project.meta}
            </span>
          )}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{project.hook}</p>
        <ToolTags tools={project.tools} className="mt-1" />
      </div>

      <AnimatePresence>
        {hasVideos && showVideo && <VideoModal project={project} onClose={() => setShowVideo(false)} />}
        {youTubeId && showYouTube && <YouTubeModal id={youTubeId} onClose={() => setShowYouTube(false)} />}
      </AnimatePresence>
    </motion.article>
  );
}

/* -------------------------------- Section -------------------------------- */

export function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible = projects.filter((p) => active === "All" || p.category === active);
  const featured = visible.find((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  return (
    <section id="work" className="relative border-t border-white/[0.06] bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
        {/* Header — no kicker dash */}
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <Reveal>
            <h2
              className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em] text-foreground"
              style={{ fontFamily: SERIF, fontWeight: 400 }}
            >
              Selected{" "}
              <span style={{ fontStyle: "italic", fontWeight: 300 }} className="text-foreground/80">
                work.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p
              className="max-w-[28ch] text-xs uppercase tracking-[0.28em] text-muted-foreground"
              style={{ fontFamily: MONO }}
            >
              {projects.length} projects · shipped 2025–2026
            </p>
          </Reveal>
        </div>

        {/* Filters — underlined text tabs, not pills */}
        <Reveal delay={2}>
          <div
            role="tablist"
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-white/[0.08] pb-3"
            style={{ fontFamily: MONO }}
          >
            {filters.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(f)}
                  className={`relative pb-2 text-[11px] uppercase tracking-[0.28em] transition-colors duration-300 motion-reduce:transition-none ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                  }`}
                >
                  {f}
                  {isActive && (
                    <motion.span
                      layoutId="filter-underline"
                      className="absolute -bottom-[13px] left-0 right-0 h-px bg-gold"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {featured && <HeroCard key={featured.title} project={featured} index="00" />}
            {rest.map((p, i) => (
              <StandardCard
                key={p.title}
                project={p}
                index={String(i + 1).padStart(2, "0")}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
