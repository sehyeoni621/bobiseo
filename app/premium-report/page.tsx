"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { usePolicyStore } from "@/store/usePolicyStore";

const coverageAreas = [
  { label: "실손", score: 95, color: "var(--accent-blue)" },
  { label: "암", score: 85, color: "var(--accent-red)" },
  { label: "뇌", score: 30, color: "var(--accent-purple)" },
  { label: "심장", score: 72, color: "var(--accent-green)" },
  { label: "수술", score: 88, color: "var(--accent-blue)" },
];

const duplicateWarnings = [
  {
    riders: ["질병입원일당 (신한라이프)", "입원일당 (한화생명)"],
    overlap: "질병입원 시 중복 보장 (각각 별도 청구 가능)",
    type: "info" as const,
  },
  {
    riders: ["수술비 (신한라이프)", "수술비 1~5종 (현대해상)"],
    overlap: "수술 시 중복 보장 가능 - 두 곳 모두 청구하세요",
    type: "good" as const,
  },
];

const missingCoverages = [
  { area: "뇌혈관 질환", risk: "high", recommendation: "뇌혈관 진단비 특약 추가 가입 권장 (보장 30% 수준)" },
  { area: "치과 치료", risk: "medium", recommendation: "치과 실손 특약 미가입 상태 - 임플란트/보철 보장 없음" },
];

const reportItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "보장 부족 항목 안내",
    description: "뇌혈관 질환 보장이 30% 수준입니다. 추가 특약 가입을 권장합니다.",
    variant: "yellow" as const,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: "보험금 부지급 대응 가이드",
    description: "부지급 결정 시 이의제기 절차와 분쟁조정 방법을 안내합니다.",
    variant: "red" as const,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    title: "약관 변경 이력 분석",
    description: "2026년 3월 실손보험 약관 개정 예정 - 자기부담금 변경 안내",
    variant: "blue" as const,
  },
];

export default function PremiumReportPage() {
  const router = useRouter();
  const policies = usePolicyStore((s) => s.policies);
  const loadMockData = usePolicyStore((s) => s.loadMockData);

  useEffect(() => {
    if (policies.length === 0) loadMockData();
  }, [policies.length, loadMockData]);

  const totalRiders = policies.reduce((sum, p) => sum + p.riders.length, 0);

  return (
    <MobileFrame showNav>
      <Header title="프리미엄 리포트" />

      <div className="animate-slide-in" style={{ background: "var(--bg-secondary)" }}>
        {/* PRO badge + score */}
        <div className="px-5 pt-5 pb-5" style={{ background: "var(--bg-primary)" }}>
          <div className="flex justify-center mb-5">
            <span
              className="px-5 py-2 rounded-full text-[13px] font-bold tracking-wider"
              style={{ background: "var(--accent-blue)", color: "#FFFFFF" }}
            >
              PRO 리포트
            </span>
          </div>

          <Card variant="filled" padding="lg">
            <div className="text-center mb-5">
              <p className="text-[13px] mb-3" style={{ color: "var(--text-secondary)" }}>보장 충실도 점수</p>
              <div className="relative inline-flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg-secondary)" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="50" fill="none" stroke="var(--accent-blue)" strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50 * 0.78} ${2 * Math.PI * 50 * 0.22}`}
                    strokeDashoffset={2 * Math.PI * 50 * 0.25}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="absolute">
                  <span className="text-[24px] font-extrabold" style={{ color: "var(--text-primary)" }}>78</span>
                  <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>/100</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-[15px] font-bold" style={{ color: "var(--accent-blue)" }}>{policies.length}</p>
                <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>보험증권</p>
              </div>
              <div>
                <p className="text-[15px] font-bold" style={{ color: "var(--accent-purple)" }}>{totalRiders}</p>
                <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>총 특약</p>
              </div>
              <div>
                <p className="text-[15px] font-bold" style={{ color: "var(--accent-green)" }}>5</p>
                <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>보장영역</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* Coverage area analysis */}
        <div className="px-5 py-5" style={{ background: "var(--bg-primary)" }}>
          <h3 className="text-[14px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            영역별 보장 수준
          </h3>
          <div className="space-y-4">
            {coverageAreas.map((area) => (
              <div key={area.label} className="flex items-center gap-4">
                <span className="text-[13px] font-bold w-10" style={{ color: "var(--text-primary)" }}>
                  {area.label}
                </span>
                <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${area.score}%`, background: area.score < 50 ? "var(--accent-red)" : area.color }}
                  />
                </div>
                <span
                  className="text-[13px] font-bold w-10 text-right"
                  style={{ color: area.score < 50 ? "var(--accent-red)" : area.color }}
                >
                  {area.score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* Missing coverage warnings */}
        <div className="px-5 py-5" style={{ background: "var(--bg-primary)" }}>
          <h3 className="text-[14px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            보장 부족 경고
          </h3>
          <div className="space-y-3">
            {missingCoverages.map((item) => (
              <div
                key={item.area}
                className="rounded-[16px] p-4"
                style={{
                  background: item.risk === "high"
                    ? "color-mix(in srgb, var(--accent-red) 6%, var(--bg-secondary))"
                    : "color-mix(in srgb, var(--accent-yellow) 6%, var(--bg-secondary))",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={item.risk === "high" ? "red" : "yellow"}>
                    {item.risk === "high" ? "위험" : "주의"}
                  </Badge>
                  <span className="text-[14px] font-bold" style={{ color: "var(--text-primary)" }}>
                    {item.area}
                  </span>
                </div>
                <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                  {item.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* Duplicate coverage info */}
        <div className="px-5 py-5" style={{ background: "var(--bg-primary)" }}>
          <h3 className="text-[14px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            중복 보장 분석
          </h3>
          <div className="space-y-3">
            {duplicateWarnings.map((item, i) => (
              <div
                key={i}
                className="rounded-[16px] p-4"
                style={{ background: "var(--bg-secondary)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={item.type === "good" ? "green" : "blue"}>
                    {item.type === "good" ? "유리" : "참고"}
                  </Badge>
                </div>
                <div className="space-y-1 mb-2">
                  {item.riders.map((r) => (
                    <p key={r} className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
                      {r}
                    </p>
                  ))}
                </div>
                <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>{item.overlap}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* AI analysis report */}
        <div className="px-5 py-5" style={{ background: "var(--bg-primary)" }}>
          <h3 className="text-[14px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>AI 분석 리포트</h3>
          <div className="space-y-4">
            {reportItems.map((item, i) => (
              <Card key={i} padding="md" hoverable>
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-[16px] flex items-center justify-center flex-shrink-0"
                    style={{
                      background: item.variant === "yellow"
                        ? "color-mix(in srgb, var(--accent-yellow) 12%, var(--bg-secondary))"
                        : item.variant === "red"
                          ? "color-mix(in srgb, var(--accent-red) 12%, var(--bg-secondary))"
                          : "color-mix(in srgb, var(--accent-blue) 12%, var(--bg-secondary))",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                      <Badge variant={item.variant} className="text-[11px]">
                        {item.variant === "yellow" ? "주의" : item.variant === "red" ? "중요" : "참고"}
                      </Badge>
                    </div>
                    <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* CTA */}
        <div className="px-5 py-5" style={{ background: "var(--bg-primary)" }}>
          <Button variant="primary" size="lg" fullWidth onClick={() => router.push("/dashboard")}>
            숨은 보험금 확인하기
          </Button>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
}
