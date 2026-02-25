"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/ui/Button";
import { sampleMedicalBill, groupBillItems } from "@/data/sample-medical-bill";
import { runClaimSimulation, SimulationResult } from "@/data/claim-simulation";

function formatMoney(n: number): string {
  return n.toLocaleString("ko-KR");
}

function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color =
    pct >= 90 ? "var(--accent-green)" : pct >= 80 ? "var(--accent-blue)" : "var(--accent-yellow)";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: "var(--bg-secondary)" }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-[12px] font-mono font-bold" style={{ color }}>{pct}%</span>
    </div>
  );
}

export default function SimulationPage() {
  const router = useRouter();
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [step, setStep] = useState<"loading" | "bill" | "result">("loading");
  const [showBillDetail, setShowBillDetail] = useState(false);

  useEffect(() => {
    // Simulate loading
    const t1 = setTimeout(() => setStep("bill"), 1200);
    const sim = runClaimSimulation(sampleMedicalBill);
    setResult(sim);
    return () => clearTimeout(t1);
  }, []);

  const grouped = groupBillItems(sampleMedicalBill.items);

  // Loading state
  if (step === "loading") {
    return (
      <MobileFrame>
        <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: "var(--bg-primary)" }}>
          <div className="relative w-10 h-10 mb-4">
            <div
              className="absolute inset-0 rounded-full animate-spin"
              style={{
                border: "2.5px solid var(--bg-secondary)",
                borderTopColor: "var(--accent-blue)",
              }}
            />
          </div>
          <p className="text-[15px] font-bold mb-3" style={{ color: "var(--text-primary)" }}>진료비 내역 분석 중</p>
          <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>KCD 질병코드 매칭 중...</p>
        </div>
      </MobileFrame>
    );
  }

  if (!result) return null;

  // Bill view
  if (step === "bill") {
    return (
      <MobileFrame showNav>
        <Header title="진료비 세부내역서" />
        <div style={{ background: "var(--bg-secondary)" }}>
          {/* Hospital & patient info */}
          <div className="px-5 py-5 animate-fade-in" style={{ background: "var(--bg-primary)" }}>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-10 h-10 rounded-[16px] flex items-center justify-center"
                style={{ background: "color-mix(in srgb, var(--accent-blue) 12%, transparent)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>{result.bill.hospital}</p>
                <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>진료일: {result.bill.visitDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[16px] p-4" style={{ background: "var(--bg-secondary)" }}>
                <p className="text-[12px] mb-1.5" style={{ color: "var(--text-muted)" }}>환자명</p>
                <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>{result.bill.patient}</p>
              </div>
              <div className="rounded-[16px] p-4" style={{ background: "var(--bg-secondary)" }}>
                <p className="text-[12px] mb-1.5" style={{ color: "var(--text-muted)" }}>입원기간</p>
                <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>{result.bill.daysAdmitted}일</p>
              </div>
            </div>
          </div>

          {/* Section separator */}
          <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

          {/* KCD codes */}
          <div className="px-5 py-5 animate-slide-up" style={{ background: "var(--bg-primary)" }}>
            <p className="text-[13px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>진단명 (KCD 질병코드)</p>
            <div className="space-y-3">
              {result.bill.diagnoses.map((d) => (
                <div
                  key={d.code}
                  className="flex items-center gap-4 rounded-[16px] p-4"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  <span
                    className="px-3 py-1.5 rounded-[10px] text-[13px] font-mono font-bold flex-shrink-0"
                    style={{ background: "color-mix(in srgb, var(--accent-red) 12%, transparent)", color: "var(--accent-red)" }}
                  >
                    {d.code}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium truncate" style={{ color: "var(--text-primary)" }}>{d.name}</p>
                    <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>{d.department}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section separator */}
          <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

          {/* Bill summary */}
          <div className="px-5 py-5 animate-slide-up" style={{ background: "var(--bg-primary)" }}>
            <div className="flex justify-between items-center mb-5">
              <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>진료비 요약</p>
              <button
                onClick={() => setShowBillDetail(!showBillDetail)}
                className="text-[13px] font-semibold px-3.5 py-2 rounded-full active:scale-[0.97] active:opacity-90 transition-all"
                style={{ background: "color-mix(in srgb, var(--accent-blue) 10%, transparent)", color: "var(--accent-blue)" }}
              >
                {showBillDetail ? "접기" : "상세보기"}
              </button>
            </div>

            {showBillDetail && (
              <div className="space-y-4 mb-5 animate-slide-up">
                {Object.entries(grouped).map(([cat, items]) => (
                  <div key={cat}>
                    <p className="text-[12px] font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{cat}</p>
                    {items.map((item, i) => (
                      <div key={i} className="flex justify-between py-2">
                        <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>{item.description}</span>
                        <div className="flex gap-3 text-[13px]">
                          <span style={{ color: "var(--text-muted)" }}>{formatMoney(item.insuranceCovered)}</span>
                          <span className="font-medium" style={{ color: "var(--text-primary)" }}>{formatMoney(item.patientPay)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="flex justify-end gap-3 text-[12px] pt-2.5" style={{ borderTop: "1px dashed var(--border)" }}>
                  <span style={{ color: "var(--text-muted)" }}>공단부담</span>
                  <span className="font-medium" style={{ color: "var(--text-primary)" }}>본인부담</span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>총 진료비</span>
                <span className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>{formatMoney(result.bill.totalAmount)}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>공단 부담금</span>
                <span className="text-[13px]" style={{ color: "var(--accent-blue)" }}>-{formatMoney(result.bill.insuranceCovered)}원</span>
              </div>
              <div className="h-px" style={{ background: "var(--border)" }} />
              <div className="flex justify-between">
                <span className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>본인 부담금</span>
                <span className="text-[13px] font-extrabold" style={{ color: "var(--accent-red)" }}>{formatMoney(result.bill.patientTotal)}원</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="px-5 pt-5 pb-5" style={{ background: "var(--bg-primary)" }}>
            <Button variant="primary" size="lg" fullWidth onClick={() => setStep("result")}>
              보험금 청구 시뮬레이션 시작
            </Button>
          </div>
        </div>
        <BottomNav />
      </MobileFrame>
    );
  }

  // Result view
  return (
    <MobileFrame showNav>
      <Header title="시뮬레이션 결과" />
      <div style={{ background: "var(--bg-secondary)" }}>
        {/* Hero refund card */}
        <div className="px-5 pt-5 pb-5 animate-scale-in" style={{ background: "var(--bg-primary)" }}>
          <div
            className="rounded-[16px] p-6 text-center"
            style={{ background: "var(--accent-blue)" }}
          >
            <p className="text-white/70 text-[13px] mb-2">예상 환급 금액</p>
            <p className="text-[40px] font-extrabold text-white tracking-tight mb-4">
              {formatMoney(result.estimatedRefund)}
              <span className="text-[15px] ml-1">원</span>
            </p>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              <span className="text-white text-[13px] font-bold">
                {result.refundRate}% 환급
              </span>
            </div>
          </div>
        </div>

        {/* Section separator */}
        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* Summary stats */}
        <div className="px-5 py-5 animate-slide-up" style={{ background: "var(--bg-primary)" }}>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-[18px] p-5 text-center" style={{ background: "var(--bg-secondary)" }}>
              <p className="text-[17px] font-extrabold" style={{ color: "var(--accent-red)" }}>{formatMoney(result.patientPaid)}</p>
              <p className="text-[14px] mt-2" style={{ color: "var(--text-muted)" }}>본인부담금</p>
            </div>
            <div className="rounded-[18px] p-5 text-center" style={{ background: "var(--bg-secondary)" }}>
              <p className="text-[17px] font-extrabold" style={{ color: "var(--accent-green)" }}>{formatMoney(result.estimatedRefund)}</p>
              <p className="text-[14px] mt-2" style={{ color: "var(--text-muted)" }}>예상환급</p>
            </div>
            <div className="rounded-[18px] p-5 text-center" style={{ background: "var(--bg-secondary)" }}>
              <p className="text-[17px] font-extrabold" style={{ color: "var(--accent-blue)" }}>{result.matchedClaims.length}</p>
              <p className="text-[14px] mt-2" style={{ color: "var(--text-muted)" }}>매칭특약</p>
            </div>
          </div>
        </div>

        {/* Section separator */}
        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* Insurer breakdown */}
        <div className="px-5 py-5 animate-slide-up" style={{ background: "var(--bg-primary)" }}>
          <p className="text-[13px] font-bold mb-5" style={{ color: "var(--text-primary)" }}>보험사별 예상 환급</p>
          <div className="space-y-4">
            {result.insurerBreakdown.map((ins) => {
              const pct = Math.round((ins.amount / result.totalEstimatedClaim) * 100);
              return (
                <div
                  key={ins.insurer}
                  className="rounded-[16px] p-5"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>{ins.insurer}</p>
                    <p className="text-[13px] font-extrabold" style={{ color: "var(--accent-blue)" }}>{formatMoney(ins.amount)}원</p>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${pct}%`, background: "var(--accent-blue)" }}
                    />
                  </div>
                  <p className="text-[12px] mt-2" style={{ color: "var(--text-muted)" }}>{ins.claimCount}건 청구 가능</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section separator */}
        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* Claim detail list */}
        <div className="px-5 py-5 animate-slide-up" style={{ background: "var(--bg-primary)" }}>
          <p className="text-[13px] font-bold mb-5" style={{ color: "var(--text-primary)" }}>매칭된 보험 특약 상세</p>
          <div className="space-y-4">
            {result.matchedClaims.map((claim) => (
              <div
                key={claim.id}
                className="rounded-[18px] p-5"
                style={{ background: "var(--bg-secondary)" }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] mb-1" style={{ color: "var(--text-muted)" }}>{claim.insurer}</p>
                    <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>{claim.riderName}</p>
                  </div>
                  <span className="text-[13px] font-extrabold flex-shrink-0 ml-3" style={{ color: "var(--accent-green)" }}>
                    +{formatMoney(claim.estimatedAmount)}원
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="px-2.5 py-1 rounded-[8px] text-[12px] font-mono font-bold"
                    style={{ background: "color-mix(in srgb, var(--accent-red) 10%, transparent)", color: "var(--accent-red)" }}
                  >
                    {claim.kcdCode}
                  </span>
                  <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>{claim.matchedDiagnosis}</span>
                </div>

                <p
                  className="text-[13px] mb-3.5 px-3.5 py-3 rounded-[12px]"
                  style={{ background: "var(--bg-primary)", color: "var(--text-secondary)" }}
                >
                  {claim.basis}
                </p>

                <ConfidenceBar value={claim.confidence} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-5 py-5" style={{ background: "var(--bg-primary)" }}>
          <div className="space-y-4 pb-5">
            <Button variant="primary" size="lg" fullWidth onClick={() => router.push("/claim")}>
              실제 청구 시작하기
            </Button>
            <Button variant="secondary" size="lg" fullWidth onClick={() => router.push("/home")}>
              홈으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}
