"use client";

interface ProgressBarProps {
  value: number;
  color?: "blue" | "green" | "red" | "yellow" | "purple";
  height?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const colorMap: Record<string, string> = {
  blue: "var(--accent-blue)",
  green: "var(--accent-green)",
  red: "var(--accent-red)",
  yellow: "var(--accent-yellow)",
  purple: "var(--accent-purple)",
};

const heightStyles = {
  sm: "h-2",
  md: "h-3.5",
  lg: "h-5",
};

export default function ProgressBar({
  value,
  color = "blue",
  height = "md",
  showLabel = false,
  className = "",
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-[14px]" style={{ color: "var(--text-secondary)" }}>진행률</span>
          <span className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>{clampedValue}%</span>
        </div>
      )}
      <div
        className={`w-full rounded-full overflow-hidden ${heightStyles[height]}`}
        style={{ background: "var(--border)" }}
      >
        <div
          className={`${heightStyles[height]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%`, background: colorMap[color] }}
        />
      </div>
    </div>
  );
}
