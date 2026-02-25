"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import BottomNav from "@/components/layout/BottomNav";
import SummaryCard from "@/components/home/SummaryCard";
import QuickActions from "@/components/home/QuickActions";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { useAuthStore } from "@/store/useAuthStore";
import { useClaimStore } from "@/store/useClaimStore";
import { usePolicyStore } from "@/store/usePolicyStore";
import { totalUnclaimedAmount } from "@/data/mock-riders";

export default function HomePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const loadClaimData = useClaimStore((s) => s.loadMockData);
  const claimableItems = useClaimStore((s) => s.claimableItems);
  const loadPolicyData = usePolicyStore((s) => s.loadMockData);
  const policies = usePolicyStore((s) => s.policies);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("bobiseo_logged_in");
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    loadClaimData();
    loadPolicyData();
  }, [router, loadClaimData, loadPolicyData]);

  const userName = user?.name || "사용자";
  const claimableCount = claimableItems.filter((i) => i.status === "claimable").length;
  const inProgressCount = claimableItems.filter((i) => i.status === "in_progress").length;

  return (
    <MobileFrame showNav>
      <div className="animate-fade-in">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-8 pt-16 pb-8"
          style={{ background: "var(--bg-primary)" }}
        >
          <div>
            <p className="text-[32px] font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
              안녕하세요,
              <br />
              {userName}님
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => router.push("/notifications")}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-150 active:scale-90 relative"
              style={{ background: "var(--bg-secondary)" }}
              aria-label="알림"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              {/* Unread badge */}
              <div
                className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full"
                style={{ background: "var(--accent-red)" }}
              />
            </button>
            <button
              onClick={() => router.push("/settings")}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-150 active:scale-90"
              style={{ background: "var(--bg-secondary)" }}
              aria-label="설정"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="px-8 pb-8" style={{ background: "var(--bg-primary)" }}>
          <SummaryCard
            totalAmount={totalUnclaimedAmount}
            analyzedCount={policies.length}
            claimableCount={claimableCount}
            inProgressCount={inProgressCount}
          />
        </div>

        {/* Spacer */}
        <div className="h-5" style={{ background: "var(--bg-secondary)" }} />

        {/* Quick actions section */}
        <div className="px-8 pt-8 pb-8" style={{ background: "var(--bg-primary)" }}>
          <h2 className="text-[20px] font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            빠른 실행
          </h2>
          <QuickActions />
        </div>

        {/* Spacer */}
        <div className="h-5" style={{ background: "var(--bg-secondary)" }} />

        {/* Simulation banner */}
        <div className="px-8 py-8" style={{ background: "var(--bg-primary)" }}>
          <button
            onClick={() => router.push("/simulation")}
            className="w-full rounded-[24px] p-7 flex items-center gap-5 transition-all duration-150 active:scale-[0.98] active:opacity-90"
            style={{ background: "var(--bg-secondary)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "color-mix(in srgb, var(--accent-blue) 10%, transparent)" }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[19px] font-bold" style={{ color: "var(--text-primary)" }}>
                청구 시뮬레이션 체험하기
              </p>
              <p className="text-[16px] mt-2" style={{ color: "var(--text-muted)" }}>
                예시 진료비로 예상 환급액을 확인해보세요
              </p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-disabled)" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Spacer */}
        <div className="h-5" style={{ background: "var(--bg-secondary)" }} />

        {/* Coverage analysis banner */}
        <div className="px-8 py-8" style={{ background: "var(--bg-primary)" }}>
          <button
            onClick={() => router.push("/coverage-analysis")}
            className="w-full rounded-[24px] p-7 flex items-center gap-5 transition-all duration-150 active:scale-[0.98] active:opacity-90"
            style={{ background: "var(--bg-secondary)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "color-mix(in srgb, var(--accent-green) 10%, transparent)" }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.21 15.89A10 10 0 118 2.83" />
                <path d="M22 12A10 10 0 0012 2v10z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[19px] font-bold" style={{ color: "var(--text-primary)" }}>
                내 보장 분석 리포트
              </p>
              <p className="text-[16px] mt-2" style={{ color: "var(--text-muted)" }}>
                영역별 보장 수준과 공백을 확인하세요
              </p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-disabled)" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}
