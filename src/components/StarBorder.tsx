import type { ElementType, ComponentPropsWithoutRef, CSSProperties } from "react";
import "./StarBorder.css";

type StarBorderProps<T extends ElementType> = {
  as?: T;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children?: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "color" | "children">;

function StarBorder<T extends ElementType = "div">({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 2,
  children,
  ...rest
}: StarBorderProps<T>) {
  const Component = (as || "div") as ElementType;

  return (
    <Component
      className={`star-border-container ${className}`}
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
