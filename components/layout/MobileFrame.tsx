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
      className="min-h-screen flex justify-center"
      style={{ background: "var(--bg-tertiary)" }}
    >
      <div
        className={`
          w-full max-w-[520px] min-h-screen relative
          ${showNav ? "pb-32" : ""}
          ${className}
        `}
        style={{ background: "var(--bg-secondary)" }}
      >
        {children}
      </div>
    </div>
  );
}
