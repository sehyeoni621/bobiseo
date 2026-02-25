"use client";

interface MobileFrameProps {
  children: React.ReactNode;
  className?: string;
  showNav?: boolean;
}

export default function MobileFrame({
  children,
  className = "",
  showNav = false,
}: MobileFrameProps) {
  return (
    <div
      className="min-h-screen min-h-[100dvh] flex justify-center"
      style={{ background: "var(--bg-tertiary)" }}
    >
      <div
        className={`
          w-full max-w-[480px] sm:max-w-[520px] min-h-screen min-h-[100dvh] relative
          ${showNav ? "pb-[88px]" : ""}
          ${className}
        `}
        style={{ background: "var(--bg-secondary)" }}
      >
        {children}
      </div>
    </div>
  );
}
