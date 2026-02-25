"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-[14px] min-h-[40px] rounded-[12px]",
  md: "px-6 py-3 text-[15px] min-h-[46px] rounded-[14px]",
  lg: "px-8 py-3.5 text-[16px] min-h-[52px] rounded-[16px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  children,
  className = "",
  disabled,
  style,
  ...props
}: ButtonProps) {
  const variantStyle = (() => {
    switch (variant) {
      case "primary":
        return {
          background: "var(--accent-blue)",
          color: "#FFFFFF",
        };
      case "secondary":
        return {
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
        };
      case "danger":
        return {
          background: "var(--accent-red)",
          color: "#FFFFFF",
        };
      case "ghost":
        return {
          background: "transparent",
          color: "var(--text-secondary)",
        };
      case "outline":
        return {
          background: "transparent",
          color: "var(--accent-blue)",
          border: "1.5px solid var(--accent-blue)",
        };
    }
  })();

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold tracking-[-0.01em]
        transition-all duration-150
        disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
        active:scale-[0.97] active:opacity-90
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={disabled}
      style={{ ...variantStyle, ...style }}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
