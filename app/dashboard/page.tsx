"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import StatusBadge from "@/components/ui/StatusBadge";
import { useClaimStore } from "@/store/useClaimStore";
import { totalUnclaimedAmount } from "@/data/mock-riders";

export default function DashboardPage() {
  const router = useRouter();
  const claimableItems = useClaimStore((s) => s.claimableItems);
  const loadMockData = useClaimStore((s) => s.loadMockData);

  useEffect(() => {
    if (claimableItems.length === 0) loadMockData();
  }, [claimableItems.length, loadMockData]);

  const lossonAmount = claimableItems.filter((i) => i.status === "claimable").reduce((sum, i) => sum + i.amount, 0);
  const fixedAmount = totalUnclaimedAmount - lossonAmount;

  return (
    <MobileFrame showNav>
      <Header title="숨은 보험금" />
      <div style={{ background: "var(--bg-secondary)" }}>
        {/* Total amount section */}
        <div className="px-5 py-7 animate-scale-in" style={{ background: "var(--bg-primary)" }}>
          <p className="text-[14px] mb-4" style={{ color: "var(--text-muted)" }}>총 예상 미청구 보험금</p>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-[32px] font-extrabold tracking-[-0.02em]" style={{ color: "var(--text-primary)" }}>
              {totalUnclaimedAmount.toLocaleString("ko-KR")}
            </span>
            <span className="text-[16px] font-bold" style={{ color: "var(--text-secondary)" }}>원</span>
          </div>
          <div className="flex gap-4">
            <Badge variant="blue">실손 {lossonAmount.toLocaleString("ko-KR")}원</Badge>
            <Badge variant="purple">정액 {fixedAmount.toLocaleString("ko-KR")}원</Badge>
          </div>
        </div>

        {/* Section separator */}
        <div className="h-2" style={{ background: "var(--bg-secondary)" }} />

        {/* Claimable items list */}
        <div className="px-5 py-6 animate-slide-up" style={{ background: "var(--bg-primary)" }}>
          <p className="text-[16px] font-bold mb-6" style={{ color: "var(--text-primary)" }}>청구 가능 항목</p>
          <div>
            {claimableItems.map((item, idx) => (
              <div key={item.id}>
                <button
                  onClick={() => router.push(`/claim/${item.id}`)}
                  className="w-full flex items-center justify-between py-5 text-left active:scale-[0.97] active:opacity-90 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <p className="text-[15px] font-bold" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="text-[13px] mt-1" style={{ color: "var(--text-muted)" }}>{item.insurer}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <p className="text-[16px] font-bold" style={{ color: "var(--accent-blue)" }}>
                      {item.amount.toLocaleString("ko-KR")}원
                    </p>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </button>
                {idx < claimableItems.length - 1 && (
                  <div className="h-px" style={{ background: "var(--border)" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}
