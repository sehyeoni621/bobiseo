"use client";

import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  label: string;
  path: string;
  icon: (active: boolean) => React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "홈",
    path: "/home",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24"
        fill={active ? "var(--accent-blue)" : "none"}
        stroke={active ? "var(--accent-blue)" : "var(--text-muted)"}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" stroke={active ? "var(--bg-primary)" : "var(--text-muted)"} />
      </svg>
    ),
  },
  {
    label: "분석",
    path: "/upload",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24"
        fill="none"
        stroke={active ? "var(--accent-blue)" : "var(--text-muted)"}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    label: "시뮬레이션",
    path: "/simulation",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24"
        fill="none"
        stroke={active ? "var(--accent-blue)" : "var(--text-muted)"}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 10l3 3 4-5 3 2" />
      </svg>
    ),
  },
  {
    label: "청구",
    path: "/dashboard",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24"
        fill="none"
        stroke={active ? "var(--accent-blue)" : "var(--text-muted)"}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    label: "MY",
    path: "/settings",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24"
        fill={active ? "var(--accent-blue)" : "none"}
        stroke={active ? "var(--accent-blue)" : "var(--text-muted)"}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] sm:max-w-[520px] z-50"
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-center justify-around px-2 py-2.5">
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname?.startsWith(item.path + "/");
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className="flex flex-col items-center gap-1 py-1.5 px-3 min-w-[56px] transition-all duration-150"
              aria-label={item.label}
            >
              <div className={`transition-transform duration-150 ${isActive ? "scale-105" : ""}`}>
                {item.icon(isActive)}
              </div>
              <span
                className="text-[11px] font-bold leading-none"
                style={{ color: isActive ? "var(--accent-blue)" : "var(--text-muted)" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
