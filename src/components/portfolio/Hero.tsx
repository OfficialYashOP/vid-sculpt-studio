import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import { useEffect, useState } from "react";
import Aurora from "@/components/Aurora";
import BlurText from "@/components/BlurText";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="home" className="grain relative isolate flex min-h-svh items-center overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {mounted && (
          <div className="absolute inset-0 opacity-100">
            <Aurora colorStops={["#7cff67", "#B497CF", "#5227FF"]} blend={0.35} amplitude={2.2} speed={0.7} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/10 to-background/0" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-gold"
        >
          <span className="h-px w-10 bg-gold" /> Yash Pandey
        </motion.p>

        <h1 className="max-w-4xl font-display text-6xl leading-[0.9] tracking-tight sm:text-8xl lg:text-[8.5rem]">
          <BlurText
            text="I Turn Ideas Into"
            animateBy="words"
            direction="top"
            delay={120}
            className="block"
          />
          <BlurText
            text="Cinematic AI Videos"
            animateBy="words"
            direction="top"
            delay={120}
            className="text-gradient-gold"
          />
        </h1>

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
          <StarBorder
            as="a"
            href="#work"
            color="rgba(230, 179, 82, 0.95)"
            speed="4s"
            thickness={2}
            className="group !w-auto rounded-full"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 group-hover:glow-gold">
              <Play className="h-4 w-4" /> View My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </StarBorder>
          <StarBorder
            as="a"
            href="#contact"
            color="rgba(230, 179, 82, 0.6)"
            speed="6s"
            thickness={1}
            className="!w-auto rounded-full"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-background/60 px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:text-gold">
              Let's Talk
            </span>
          </StarBorder>
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
