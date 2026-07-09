import { useState, type FormEvent } from "react";
import BlurText from "@/components/BlurText";
import StarBorder from "@/components/StarBorder";
import { Mail, Linkedin, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Reveal } from "./Reveal";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(1, "Please enter a message").max(1000),
});

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "officialyashop007@gmail.com",
    href: "mailto:officialyashop007@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/yashpandeyofficial007",
    href: "https://linkedin.com/in/yashpandeyofficial007",
  },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    toast.success("Thanks! Your message is ready — I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <p className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-gold">
          <span className="h-px w-10 bg-gold" /> Contact
        </p>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="max-w-3xl font-display text-6xl leading-[0.92] tracking-tight sm:text-7xl">
          <BlurText text="Let's create something" animateBy="words" className="flex-wrap" />
          <BlurText text="cinematic together" animateBy="words" className="flex-wrap text-gradient-gold" />
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          {contacts.map((c, i) => (
            <Reveal key={c.label} delay={i}>
              <StarBorder color="rgba(230, 179, 82, 0.7)" speed="7s" thickness={1.5}>
                <a
                  href={c.href}
                  target={c.label === "LinkedIn" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-[18px] bg-card/70 p-5 transition-colors duration-300 hover:bg-card"
                >
                  <span className="inline-flex shrink-0 rounded-xl bg-gold/12 p-3 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-primary-foreground">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {c.label}
                    </p>
                    <p className="break-words font-medium">{c.value}</p>
                  </div>
                </a>
              </StarBorder>
            </Reveal>

          ))}
        </div>

        <Reveal delay={1}>
          <form onSubmit={onSubmit} className="glass space-y-4 rounded-2xl p-6 sm:p-8">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                placeholder="Your name"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                placeholder="you@email.com"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={1000}
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
              />
            </div>
            <StarBorder color="rgba(230, 179, 82, 0.95)" speed="4s" thickness={2} className="rounded-full">
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:glow-gold"
              >
                Send Message
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </StarBorder>

          </form>
        </Reveal>
      </div>
    </section>
  );
}
