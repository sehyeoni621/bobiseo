"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { usePolicyStore } from "@/store/usePolicyStore";
import {
  coverageAreas,
  coverageGaps,
  monthlyPremiums,
  totalMonthlyPremium,
  overallScore,
  type CoverageArea,
} from "@/data/mock-coverage-analysis";

function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

function ScoreGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 54;
  const filled = circumference * (score / 100);
  const empty = circumference - filled;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="54" fill="none" stroke="var(--bg-secondary)" strokeWidth="10" />
        <circle
          cx="70" cy="70" r="54" fill="none"
          stroke={score >= 70 ? "var(--accent-blue)" : score >= 50 ? "var(--accent-yellow)" : "var(--accent-red)"}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${empty}`}
          strokeDashoffset={circumference * 0.25}
          transform="rotate(-90 70 70)"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-[28px] font-extrabold" style={{ color: "var(--text-primary)" }}>{score}</span>
        <span className="text-[14px] block -mt-1" style={{ color: "var(--text-muted)" }}>/ 100</span>
      </div>
    </div>
  );
}

function AreaDetail({ area, isOpen, onToggle }: { area: CoverageArea; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-[16px] overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 text-left active:opacity-80 transition-all"
      >
        {/* Score bar */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>
              {area.label}
            </span>
            <span
              className="text-[13px] font-bold"
              style={{ color: area.score < 50 ? "var(--accent-red)" : area.color }}
            >
              {area.score}점
            </span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--bg-primary)" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${area.score}%`,
                background: area.score < 50 ? "var(--accent-red)" : area.color,
              }}
            />
          </div>
        </div>

        {/* Chevron */}
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"
          className={`transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-90" : ""}`}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Expanded detail */}
      {isOpen && (
        <div className="px-4 pb-4 animate-slide-up">
          <div className="h-px mb-3" style={{ background: "var(--border)" }} />
          <p className="text-[12px] font-bold mb-2" style={{ color: "var(--text-muted)" }}>
            관련 특약 ({area.riders.length}건)
          </p>
          <div className="space-y-2">
            {area.riders.map((rider) => (
              <div
                key={rider.name + rider.insurer}
                className="flex items-center justify-between rounded-[12px] p-3"
                style={{ background: "var(--bg-primary)" }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
                    {rider.name}
                  </p>
                  <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                    {rider.insurer} · 만기 {rider.expiryDate.slice(0, 7)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold" style={{ color: "var(--accent-blue)" }}>
                    {formatKRW(rider.amount)}
                  </span>
                  {rider.status === "expiring" && (
                    <Badge variant="yellow">만기임박</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CoverageAnalysisPage() {
  const router = useRouter();
  const policies = usePolicyStore((s) => s.policies);
  const loadMockData = usePolicyStore((s) => s.loadMockData);
  const [expandedArea, setExpandedArea] = useState<string | null>(null);

  useEffect(() => {
    if (policies.length === 0) loadMockData();
  }, [policies.length, loadMockData]);

  const totalRiders = policies.reduce((sum, p) => sum + p.riders.length, 0);
  const matchedRiders = policies.reduce(
    (sum, p) => sum + p.riders.filter((r) => r.matched).length,
    0,
  );

  const severityConfig = {
    critical: { label: "위험", variant: "red" as const, bg: "color-mix(in srgb, var(--accent-red) 6%, var(--bg-secondary))" },
    warning: { label: "주의", variant: "yellow" as const, bg: "color-mix(in srgb, var(--accent-yellow) 6%, var(--bg-secondary))" },
    info: { label: "참고", variant: "blue" as const, bg: "color-mix(in srgb, var(--accent-blue) 6%, var(--bg-secondary))" },
  };

  return (
    <MobileFrame showNav>
      <Header title="보장 분석 리포트" />

      <div className="animate-slide-in" style={{ background: "var(--bg-secondary)" }}>
        {/* Overall score */}
        <div className="px-5 pt-5 pb-5" style={{ background: "var(--bg-primary)" }}>
          <div className="text-center mb-5">
            <p className="text-[13px] mb-4" style={{ color: "var(--text-secondary)" }}>
              종합 보장 충실도
            </p>
            <ScoreGauge score={overallScore} />
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-4 gap-2 mt-5">
            {[
              { value: policies.length, label: "보험증권", color: "var(--accent-blue)" },
              { value: totalRiders, label: "총 특약", color: "var(--accent-purple)" },
              { value: matchedRiders, label: "매칭 특약", color: "var(--accent-green)" },
              { value: coverageAreas.length, label: "분석 영역", color: "var(--accent-yellow)" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[16px] font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* Coverage areas */}
        <div className="px-5 py-5" style={{ background: "var(--bg-primary)" }}>
          <h3 className="text-[14px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            영역별 보장 분석
          </h3>
          <div className="space-y-3">
            {coverageAreas.map((area) => (
              <AreaDetail
                key={area.id}
                area={area}
                isOpen={expandedArea === area.id}
                onToggle={() => setExpandedArea(expandedArea === area.id ? null : area.id)}
              />
            ))}
          </div>
        </div>

        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* Coverage gaps */}
        <div className="px-5 py-5" style={{ background: "var(--bg-primary)" }}>
          <h3 className="text-[14px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            보장 공백 분석
          </h3>
          <div className="space-y-3">
            {coverageGaps.map((gap) => {
              const config = severityConfig[gap.severity];
              return (
                <div
                  key={gap.area}
                  className="rounded-[16px] p-4"
                  style={{ background: config.bg }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={config.variant}>{config.label}</Badge>
                    <span className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>
                      {gap.area}
                    </span>
                  </div>
                  <p className="text-[13px] mb-3" style={{ color: "var(--text-secondary)" }}>
                    {gap.description}
                  </p>

                  {/* Coverage comparison bar */}
                  {gap.currentCoverage > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span style={{ color: "var(--text-muted)" }}>현재 보장</span>
                        <span style={{ color: "var(--text-muted)" }}>
                          {formatKRW(gap.currentCoverage * 10000)} / 권장 {formatKRW(gap.recommendedCoverage * 10000)}
                        </span>
                      </div>
                      <ProgressBar
                        value={Math.round((gap.currentCoverage / gap.recommendedCoverage) * 100)}
                        color={gap.severity === "critical" ? "red" : gap.severity === "warning" ? "yellow" : "blue"}
                        height="sm"
                      />
                    </div>
                  )}

                  <div
                    className="rounded-[10px] p-3"
                    style={{ background: "var(--bg-primary)" }}
                  >
                    <p className="text-[12px] font-semibold" style={{ color: "var(--accent-blue)" }}>
                      💡 {gap.recommendation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* Monthly premium breakdown */}
        <div className="px-5 py-5" style={{ background: "var(--bg-primary)" }}>
          <h3 className="text-[14px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            월 보험료 분석
          </h3>

          <Card variant="filled" padding="lg">
            <div className="text-center mb-5">
              <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>총 월 보험료</p>
              <p className="text-[28px] font-extrabold mt-1" style={{ color: "var(--text-primary)" }}>
                {formatKRW(totalMonthlyPremium)}
              </p>
            </div>

            {/* Stacked bar */}
            <div className="flex h-4 rounded-full overflow-hidden mb-4">
              {monthlyPremiums.map((p) => (
                <div
                  key={p.insurer}
                  className="h-full"
                  style={{
                    width: `${(p.monthly / totalMonthlyPremium) * 100}%`,
                    background: p.color,
                  }}
                />
              ))}
            </div>

            <div className="space-y-3">
              {monthlyPremiums.map((p) => (
                <div key={p.insurer} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: p.color }} />
                    <div>
                      <p className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>{p.insurer}</p>
                      <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>{p.productName}</p>
                    </div>
                  </div>
                  <span className="text-[14px] font-bold" style={{ color: "var(--text-primary)" }}>
                    {formatKRW(p.monthly)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* CTA */}
        <div className="px-5 py-5 space-y-3" style={{ background: "var(--bg-primary)" }}>
          <Button variant="primary" size="lg" fullWidth onClick={() => router.push("/premium-report")}>
            프리미엄 리포트 보기
          </Button>
          <Button variant="secondary" size="lg" fullWidth onClick={() => router.push("/claim")}>
            숨은 보험금 청구하기
          </Button>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
}
