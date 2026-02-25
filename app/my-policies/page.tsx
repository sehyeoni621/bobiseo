"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/ui/Button";
import { usePolicyStore } from "@/store/usePolicyStore";
import { Policy } from "@/types/insurance";

const insurerColors: Record<string, string> = {
  "신한라이프": "var(--accent-blue)",
  "현대해상": "var(--accent-green)",
  "한화생명": "var(--accent-purple)",
};

export default function MyPoliciesPage() {
  const router = useRouter();
  const policies = usePolicyStore((s) => s.policies);
  const loadMockData = usePolicyStore((s) => s.loadMockData);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (policies.length === 0) loadMockData();
  }, [policies.length, loadMockData]);

  const totalRiders = policies.reduce((sum, p) => sum + p.riders.length, 0);
  const matchedRiders = policies.reduce(
    (sum, p) => sum + p.riders.filter((r) => r.matched).length,
    0,
  );

  return (
    <MobileFrame showNav>
      <Header title="보험증권 관리" />

      <div className="animate-slide-in" style={{ background: "var(--bg-secondary)" }}>
        {/* Summary */}
        <div className="px-5 pt-5 pb-5" style={{ background: "var(--bg-primary)" }}>
          <div className="grid grid-cols-3 gap-3">
            <StatBox label="등록 증권" value={`${policies.length}건`} color="var(--accent-blue)" />
            <StatBox label="총 특약" value={`${totalRiders}개`} color="var(--accent-purple)" />
            <StatBox label="매칭 특약" value={`${matchedRiders}개`} color="var(--accent-green)" />
          </div>
        </div>

        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* Policy cards */}
        <div className="px-5 py-5" style={{ background: "var(--bg-primary)" }}>
          <h3 className="text-[14px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            내 보험 목록
          </h3>
          <div className="space-y-4">
            {policies.map((policy) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                isExpanded={expandedId === policy.id}
                onToggle={() =>
                  setExpandedId(expandedId === policy.id ? null : policy.id)
                }
              />
            ))}
          </div>
        </div>

        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* Add button */}
        <div className="px-5 py-5" style={{ background: "var(--bg-primary)" }}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => router.push("/upload")}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            }
          >
            새 보험증권 등록
          </Button>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
}

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-[14px] p-4 text-center" style={{ background: "var(--bg-secondary)" }}>
      <p className="text-[15px] font-extrabold" style={{ color }}>{value}</p>
      <p className="text-[12px] mt-1" style={{ color: "var(--text-muted)" }}>{label}</p>
    </div>
  );
}

function PolicyCard({
  policy,
  isExpanded,
  onToggle,
}: {
  policy: Policy;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const color = insurerColors[policy.insurer] || "var(--accent-blue)";
  const matchedCount = policy.riders.filter((r) => r.matched).length;

  return (
    <div
      className="rounded-[18px] overflow-hidden transition-all"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Card header */}
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center gap-4 text-left active:opacity-80 transition-all"
      >
        <div
          className="w-10 h-10 rounded-[14px] flex items-center justify-center flex-shrink-0"
          style={{ background: `color-mix(in srgb, ${color} 15%, transparent)` }}
        >
          <span className="text-[13px] font-extrabold" style={{ color }}>
            {policy.insurer.slice(0, 2)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold truncate" style={{ color: "var(--text-primary)" }}>
            {policy.productName}
          </p>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--text-muted)" }}>
            {policy.insurer} · {policy.contractDate}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="text-[12px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: `color-mix(in srgb, ${color} 12%, transparent)`, color }}
          >
            {matchedCount}/{policy.riders.length}
          </span>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="var(--text-muted)" strokeWidth="2"
            className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Expanded riders */}
      {isExpanded && (
        <div className="px-5 pb-5 animate-slide-up">
          <div className="h-px mb-4" style={{ background: "var(--border)" }} />

          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <div className="rounded-[12px] p-3" style={{ background: "var(--bg-primary)" }}>
              <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>주계약</p>
              <p className="text-[13px] font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>
                {policy.mainCoverage}
              </p>
            </div>
            <div className="rounded-[12px] p-3" style={{ background: "var(--bg-primary)" }}>
              <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>가입일</p>
              <p className="text-[13px] font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>
                {policy.contractDate}
              </p>
            </div>
          </div>

          <p className="text-[13px] font-bold mb-3" style={{ color: "var(--text-secondary)" }}>
            특약 목록
          </p>
          <div className="space-y-2">
            {policy.riders.map((rider) => (
              <div
                key={rider.id}
                className="flex items-center justify-between rounded-[12px] p-3"
                style={{ background: "var(--bg-primary)" }}
              >
                <div className="flex items-center gap-3">
                  {rider.matched ? (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: "color-mix(in srgb, var(--accent-green) 15%, transparent)" }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  ) : (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: "var(--bg-secondary)" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--text-muted)" }} />
                    </div>
                  )}
                  <span
                    className="text-[13px]"
                    style={{
                      color: rider.matched ? "var(--text-primary)" : "var(--text-muted)",
                      fontWeight: rider.matched ? 600 : 400,
                    }}
                  >
                    {rider.name}
                  </span>
                </div>
                <span className="text-[12px] font-mono" style={{ color: "var(--text-muted)" }}>
                  {rider.coverageAmount.toLocaleString("ko-KR")}원
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
