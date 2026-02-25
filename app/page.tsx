"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";

export default function SplashPage() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem("bobiseo_onboarded");
    const isLoggedIn = localStorage.getItem("bobiseo_logged_in");

    const timer = setTimeout(() => setFadeOut(true), 1500);

    const navTimer = setTimeout(() => {
      if (isLoggedIn) {
        router.push("/home");
      } else if (hasOnboarded) {
        router.push("/login");
      } else {
        router.push("/onboarding");
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(navTimer);
    };
  }, [router]);

  return (
    <MobileFrame>
      <div
        className={`
          flex flex-col items-center justify-center min-h-screen
          transition-opacity duration-500
          ${fadeOut ? "opacity-0" : "opacity-100"}
        `}
        style={{
          background: "radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--accent-blue) 15%, var(--bg-primary)), var(--bg-primary) 70%)",
        }}
      >
        {/* Logo */}
        <div className="relative mb-6 animate-pulse-glow rounded-full p-6">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--gradient-cta-from), var(--gradient-cta-to))",
              boxShadow: "var(--shadow-accent)",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
              <path d="M16 3.13a4 4 0 010 7.75" />
              <path d="M21 21v-2a4 4 0 00-3-3.87" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-[-0.02em] mb-2" style={{ color: "var(--text-primary)" }}>
          보비서
        </h1>
        <p className="text-sm font-medium tracking-widest uppercase mb-8" style={{ color: "var(--accent-blue-light)" }}>
          Bo-Biseo
        </p>
        <p className="text-sm text-center px-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          AI 기반 약관 분석 & 자동 보험금 청구
        </p>

        <div className="mt-12 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: "var(--accent-blue)",
                animation: `fadeIn 0.6s ease-in-out ${i * 0.2}s infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>
    </MobileFrame>
  );
}
