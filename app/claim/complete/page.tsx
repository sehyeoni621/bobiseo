"use client";

import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ClaimCompletePage() {
  const router = useRouter();

  const infoRows = [
    { label: "청구 금액", value: "3,057,000원", color: "var(--accent-blue)" },
    { label: "접수번호", value: "CLM-2026-0225-001", color: "var(--text-primary)", mono: true },
    { label: "보험사", value: "현대해상 외 2곳", color: "var(--text-primary)" },
    { label: "예상 처리 기간", value: "영업일 3~5일", color: "var(--accent-blue)" },
  ];

  return (
    <MobileFrame>
      <div
        className="flex flex-col items-center justify-center min-h-screen px-5 animate-fade-in"
        style={{ background: "var(--bg-primary)" }}
      >
        {/* Success icon */}
        <div
          className="w-[88px] h-[88px] rounded-full flex items-center justify-center mb-6"
          style={{ background: "color-mix(in srgb, var(--accent-green) 12%, var(--bg-secondary))" }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <h1
          className="text-[26px] font-extrabold tracking-[-0.02em] mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          청구 완료!
        </h1>
        <p
          className="text-[13px] text-center mb-5"
          style={{ color: "var(--text-secondary)" }}
        >
          보험사에 청구서가 성공적으로 전송되었습니다
        </p>

        {/* Info card */}
        <Card variant="default" padding="lg" className="w-full mb-5">
          <div className="space-y-3">
            {infoRows.map((row, i) => (
              <div key={i}>
                {i > 0 && <div className="h-px mb-5" style={{ background: "var(--bg-secondary)" }} />}
                <div className="flex justify-between items-center">
                  <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>{row.label}</span>
                  <span
                    className={`text-[13px] font-bold ${row.mono ? "font-mono" : ""}`}
                    style={{ color: row.color }}
                  >
                    {row.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action buttons */}
        <div className="w-full space-y-5">
          <Button variant="primary" size="lg" fullWidth onClick={() => router.push("/claim-history")}>
            청구 현황 추적하기
          </Button>
          <Button variant="secondary" size="lg" fullWidth onClick={() => router.push("/home")}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}
