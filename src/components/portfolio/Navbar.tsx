import { useEffect, useState } from "react";
import PillNav from "@/components/PillNav";

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

  useEffect(() => {
    const ids = items.map((i) => i.href.slice(1));
    const onScroll = () => {
      let current = "#home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = `#${id}`;
      }
      setActiveHref(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <PillNav
      logoText="YASH."
      items={items}
      activeHref={activeHref}
      baseColor="#e6b352"
      pillColor="#16130f"
      pillTextColor="#e6b352"
      hoveredPillTextColor="#16130f"
    />
  );
}
