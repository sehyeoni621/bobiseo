"use client";

type ClaimStatus = "claimable" | "docs_needed" | "in_progress" | "completed" | "analyzing";

interface StatusBadgeProps {
  status: ClaimStatus;
  className?: string;
}

const statusConfig: Record<ClaimStatus, { label: string; color: string }> = {
  claimable: { label: "청구가능", color: "var(--accent-green)" },
  docs_needed: { label: "서류필요", color: "var(--accent-yellow)" },
  in_progress: { label: "진행중", color: "var(--accent-blue)" },
  completed: { label: "완료", color: "var(--accent-green)" },
  analyzing: { label: "분석중", color: "var(--accent-purple)" },
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`
        inline-flex items-center gap-2
        px-3.5 py-1.5 text-[13px] font-semibold
        rounded-full
        ${className}
      `}
      style={{
        color: config.color,
        background: `color-mix(in srgb, ${config.color} 8%, transparent)`,
      }}
    >
      <span className="w-2 h-2 rounded-full" style={{ background: config.color }} />
      {config.label}
    </span>
  );
}
