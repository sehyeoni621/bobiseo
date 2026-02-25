"use client";

type BadgeVariant = "blue" | "green" | "red" | "yellow" | "purple" | "gray";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const variantMap: Record<BadgeVariant, { color: string; bgMix: string }> = {
  blue: { color: "var(--accent-blue-light)", bgMix: "var(--accent-blue)" },
  green: { color: "var(--accent-green)", bgMix: "var(--accent-green)" },
  red: { color: "var(--accent-red)", bgMix: "var(--accent-red)" },
  yellow: { color: "var(--accent-yellow)", bgMix: "var(--accent-yellow)" },
  purple: { color: "var(--accent-purple)", bgMix: "var(--accent-purple)" },
  gray: { color: "var(--text-muted)", bgMix: "var(--text-muted)" },
};

export default function Badge({
  variant = "blue",
  children,
  className = "",
  icon,
}: BadgeProps) {
  const v = variantMap[variant];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-3 py-1 text-[13px] font-semibold
        rounded-full
        ${className}
      `}
      style={{
        color: v.color,
        background: `color-mix(in srgb, ${v.bgMix} 8%, transparent)`,
      }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
