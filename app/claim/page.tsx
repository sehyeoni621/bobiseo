"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { mockDocChecklists } from "@/data/mock-doc-checklist";

const steps = [
  { label: "진료 서류 업로드", description: "처방전, 진료확인서 업로드" },
  { label: "AI 분석", description: "질병코드 자동 추출 및 매칭" },
  { label: "보장 매칭 & 금액 산출", description: "특약별 예상 금액 계산" },
  { label: "서류 체크리스트", description: "필요 서류 확인 및 준비" },
  { label: "청구서 전송", description: "보험사 자동 전송" },
];

export default function ClaimPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checklist, setChecklist] = useState(mockDocChecklists);

  const handleToggleCheck = (kcdIdx: number, itemIdx: number) => {
    setChecklist((prev) =>
      prev.map((kcd, ki) =>
        ki === kcdIdx
          ? {
              ...kcd,
              items: kcd.items.map((item, ii) =>
                ii === itemIdx ? { ...item, checked: !item.checked } : item,
              ),
            }
          : kcd,
      ),
    );
  };

  const totalRequired = checklist.reduce(
    (sum, kcd) => sum + kcd.items.filter((i) => i.required).length,
    0,
  );
  const checkedRequired = checklist.reduce(
    (sum, kcd) => sum + kcd.items.filter((i) => i.required && i.checked).length,
    0,
  );

  const handleNext = () => {
    if (currentStep < 5) {
      setIsProcessing(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsProcessing(false);
      }, 1000);
    } else {
      router.push("/claim/complete");
    }
  };

  return (
    <MobileFrame showNav>
      <Header title="자동 청구" />

      <div className="animate-slide-in">
        {/* Step progress */}
        <div className="px-7 py-6" style={{ background: "var(--bg-primary)" }}>
          <div className="mb-6">
            {steps.map((step, i) => {
              const stepNum = i + 1;
              const isDone = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <div key={i} className="flex gap-5">
                  {/* Step indicator */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-bold transition-all duration-300"
                      style={{
                        background: isDone
                          ? "var(--accent-green)"
                          : isCurrent
                            ? "var(--accent-blue)"
                            : "var(--bg-secondary)",
                        color: isDone || isCurrent ? "#FFFFFF" : "var(--text-muted)",
                      }}
                    >
                      {isDone ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        stepNum
                      )}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className="w-0.5 h-14"
                        style={{ background: isDone ? "var(--accent-green)" : "var(--bg-secondary)" }}
                      />
                    )}
                  </div>

                  {/* Step content */}
                  <div className="flex-1 pb-7">
                    <p
                      className="text-[15px] font-bold"
                      style={{
                        color: isCurrent
                          ? "var(--text-primary)"
                          : isDone
                            ? "var(--text-secondary)"
                            : "var(--text-muted)",
                      }}
                    >
                      {step.label}
                    </p>
                    <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                      {step.description}
                    </p>

                    {/* Step 4: Document checklist */}
                    {isCurrent && stepNum === 4 && (
                      <div className="mt-4 space-y-4 animate-slide-up">
                        {/* Progress summary */}
                        <Card variant="filled" padding="md">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>
                              필수 서류 준비 현황
                            </span>
                            <span className="text-[13px] font-bold" style={{ color: "var(--accent-blue)" }}>
                              {checkedRequired}/{totalRequired}
                            </span>
                          </div>
                          <ProgressBar
                            value={totalRequired > 0 ? Math.round((checkedRequired / totalRequired) * 100) : 0}
                            color="blue"
                            height="sm"
                          />
                        </Card>

                        {/* Checklists by KCD */}
                        {checklist.map((kcd, kcdIdx) => (
                          <div key={kcd.kcdCode}>
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className="text-[11px] font-mono font-bold px-2 py-0.5 rounded"
                                style={{
                                  background: "color-mix(in srgb, var(--accent-red) 12%, transparent)",
                                  color: "var(--accent-red)",
                                }}
                              >
                                {kcd.kcdCode}
                              </span>
                              <span className="text-[12px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                                {kcd.diagnosisName}
                              </span>
                            </div>

                            <div className="space-y-1.5">
                              {kcd.items.map((item, itemIdx) => (
                                <button
                                  key={item.id}
                                  onClick={() => handleToggleCheck(kcdIdx, itemIdx)}
                                  className="w-full flex items-center gap-3 rounded-[12px] p-3 text-left active:opacity-80 transition-all"
                                  style={{ background: "var(--bg-secondary)" }}
                                >
                                  {/* Checkbox */}
                                  <div
                                    className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all"
                                    style={{
                                      background: item.checked ? "var(--accent-blue)" : "transparent",
                                      border: item.checked ? "none" : "2px solid var(--border)",
                                    }}
                                  >
                                    {item.checked && (
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    )}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span
                                        className="text-[13px]"
                                        style={{
                                          color: item.checked ? "var(--text-muted)" : "var(--text-primary)",
                                          fontWeight: item.checked ? 400 : 600,
                                          textDecoration: item.checked ? "line-through" : "none",
                                        }}
                                      >
                                        {item.label}
                                      </span>
                                      {item.required && (
                                        <span className="text-[10px] font-bold" style={{ color: "var(--accent-red)" }}>
                                          필수
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                                      {item.description}
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Default step card (not step 4) */}
                    {isCurrent && stepNum !== 4 && (
                      <Card variant="filled" padding="md" className="mt-4">
                        <div className="space-y-4">
                          <ProgressBar value={isProcessing ? 60 : 100} color="blue" height="sm" showLabel />
                          <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                            {isProcessing ? "처리 중입니다..." : `${step.label} 단계가 준비되었습니다`}
                          </p>
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <Button variant="primary" size="lg" fullWidth onClick={handleNext} disabled={isProcessing}>
            {isProcessing ? "처리 중..." : currentStep < 5 ? "다음 단계" : "청구서 전송하기"}
          </Button>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
}
