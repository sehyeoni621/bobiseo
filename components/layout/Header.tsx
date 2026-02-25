"use client";

import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
}

export default function Header({
  title,
  showBack = true,
  rightAction,
  className = "",
}: HeaderProps) {
  const router = useRouter();

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-8 h-[72px] ${className}`}
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="flex items-center gap-4">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-150 active:scale-90 active:bg-[var(--bg-secondary)]"
            aria-label="Back"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        <h1
          className="text-[22px] font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h1>
      </div>
      {rightAction && <div>{rightAction}</div>}
    </header>
  );
}
