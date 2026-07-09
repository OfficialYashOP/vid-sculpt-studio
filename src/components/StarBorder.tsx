import type { ElementType, ComponentPropsWithoutRef, CSSProperties } from "react";
import { useEffect, useState } from "react";
import "./StarBorder.css";

type StarBorderProps<T extends ElementType> = {
  as?: T;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  /** Force-pause the animated border (also auto-pauses while a video modal is open). */
  paused?: boolean;
  children?: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "color" | "children">;

/** Listens to the global `portfolio:video` event so all borders freeze while a video plays. */
function useVideoPlaying() {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const onVideo = (e: Event) => setPlaying((e as CustomEvent<boolean>).detail);
    window.addEventListener("portfolio:video", onVideo as EventListener);
    return () => window.removeEventListener("portfolio:video", onVideo as EventListener);
  }, []);
  return playing;
}

function StarBorder<T extends ElementType = "div">({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 2,
  paused = false,
  children,
  ...rest
}: StarBorderProps<T>) {
  const Component = (as || "div") as ElementType;
  const videoPlaying = useVideoPlaying();
  const isPaused = paused || videoPlaying;

  return (
    <Component
      className={`star-border-container ${isPaused ? "star-paused" : ""} ${className}`}
      style={{ padding: `${thickness}px`, ...(rest as { style?: CSSProperties }).style }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
      />
      <div
        className="border-gradient-top"
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
      />
      <div className="inner-content">{children}</div>
    </Component>
  );
}

export default StarBorder;
