"use client";

import { useRouter } from "next/navigation";

interface QuickAction {
  label: string;
  path: string;
  color: string;
  icon: React.ReactNode;
}

const actions: QuickAction[] = [
  {
    label: "증권업로드",
    path: "/upload",
    color: "var(--accent-blue)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    label: "서류스캔",
    path: "/doc-scan",
    color: "var(--accent-red)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-red)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    label: "시뮬레이션",
    path: "/simulation",
    color: "var(--accent-purple)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 10l3 3 4-5 3 2" />
      </svg>
    ),
  },
  {
    label: "자동청구",
    path: "/claim",
    color: "var(--accent-green)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export default function QuickActions() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action, i) => (
        <button
          key={action.path}
          onClick={() => router.push(action.path)}
          className={`flex flex-col items-center gap-2.5 py-5 rounded-[16px] transition-all duration-150 active:scale-[0.96] active:opacity-80 animate-slide-up stagger-${i + 1}`}
          style={{ background: "var(--bg-secondary)" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: `color-mix(in srgb, ${action.color} 12%, transparent)` }}
          >
            {action.icon}
          </div>
          <p className="text-[12px] font-semibold" style={{ color: "var(--text-secondary)" }}>
            {action.label}
          </p>
        </button>
      ))}
    </div>
  );
}
