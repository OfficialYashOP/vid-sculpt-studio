import { Mail, Linkedin } from "lucide-react";

const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-3xl tracking-wide">
            YASH PANDEY<span className="text-gold">.</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">AI Video Generalist</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-3">
          <a
            href="https://linkedin.com/in/yashpandeyofficial007"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-gold hover:text-gold"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="mailto:pandey97828@gmail.com"
            aria-label="Email"
            className="inline-flex rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-gold hover:text-gold"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Yash Pandey. All rights reserved.
      </div>
    </footer>
  );
}
