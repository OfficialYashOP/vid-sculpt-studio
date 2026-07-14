import { useEffect, useState } from "react";

const items = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeHref, setActiveHref] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const ids = items.map((i) => i.href.slice(1));
    const onScroll = () => {
      let current = "#home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = `#${id}`;
      }
      setActiveHref(current);
      setScrolled(window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onVideo = (e: Event) => setVideoPlaying((e as CustomEvent<boolean>).detail);
    window.addEventListener("portfolio:video", onVideo as EventListener);
    return () => window.removeEventListener("portfolio:video", onVideo as EventListener);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        videoPlaying ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      } ${
        scrolled
          ? "border-b border-white/[0.06] bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <a
          href="#home"
          className="group flex items-baseline gap-1 tracking-tight"
          aria-label="Yash Pandey — Home"
        >
          <span
            style={{ fontFamily: '"Fraunces", serif', fontStyle: "italic" }}
            className="text-2xl font-medium leading-none text-foreground"
          >
            Yash
          </span>
          <span className="text-2xl font-medium leading-none text-gold">.</span>
        </a>

        {/* Desktop nav — underlined text, no pills */}
        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-8">
            {items.map((it) => {
              const active = activeHref === it.href;
              return (
                <li key={it.href}>
                  <a
                    href={it.href}
                    className={`group relative py-2 text-[13px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {it.label}
                    <span
                      className={`pointer-events-none absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-500 ease-out ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-transform duration-300 hover:scale-[1.03] motion-reduce:transform-none"
        >
          Get in touch
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-foreground md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-300 ${
                mobileOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-px w-4 bg-current transition-transform duration-300 ${
                mobileOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        className={`md:hidden overflow-hidden border-b border-white/[0.06] bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ${
          mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-5 py-4">
          {items.map((it) => {
            const active = activeHref === it.href;
            return (
              <li key={it.href}>
                <a
                  href={it.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between border-b border-white/[0.04] py-3 text-sm uppercase tracking-[0.18em] ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span>{it.label}</span>
                  {active && <span className="h-px w-6 bg-gold" />}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gold px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground"
            >
              Get in touch
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
