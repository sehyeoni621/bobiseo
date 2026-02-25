"use client";

import { HTMLAttributes } from "react";

type CardVariant = "default" | "elevated" | "filled";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "sm" | "md" | "lg" | "none";
  hoverable?: boolean;
}

const paddingStyles = {
  none: "",
  sm: "p-6",
  md: "p-7",
  lg: "p-8",
};

export default function Card({
  variant = "default",
  padding = "md",
  hoverable = false,
  children,
  className = "",
  ...props
}: CardProps) {
  const variantClass = (() => {
    switch (variant) {
      case "elevated":
        return "toss-card-elevated";
      case "filled":
        return "toss-section";
      default:
        return "toss-card";
    }
  })();

  return (
    <div
      className={`
        ${variantClass}
        ${paddingStyles[padding]}
        ${hoverable ? "transition-all duration-150 active:scale-[0.98] active:opacity-90 cursor-pointer" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
