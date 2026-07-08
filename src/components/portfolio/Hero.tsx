import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section id="home" className="grain relative flex min-h-svh items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          aria-hidden
          width={1920}
          height={1280}
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,transparent,var(--background)_75%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pt-28 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-gold"
        >
          <span className="h-px w-10 bg-gold" /> Yash Pandey
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-display text-6xl leading-[0.9] tracking-tight sm:text-8xl lg:text-[8.5rem]"
        >
          I Turn Ideas Into <span className="text-gradient-gold">Cinematic AI Videos</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          AI Video Generalist with 7+ years creating video content — now building ads, short films
          & UGC with the cutting edge of AI video tools.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:glow-gold"
          >
            <Play className="h-4 w-4" /> View My Work
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-gold hover:text-gold"
          >
            Let's Talk
          </a>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-2 text-muted-foreground"
        aria-label="Scroll down"
      >
        <span className="text-[11px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </a>
    </section>
  );
}
