"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Button from "@/components/ui/Button";

interface OnboardingStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

const steps: OnboardingStep[] = [
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" /><line x1="11" y1="8" x2="11" y2="14" />
      </svg>
    ),
    title: "숨어있는 보험금,\nAI가 찾아드립니다",
    description: "보험증권을 촬영하면 AI가 자동으로 분석하여\n놓치고 있던 보장 내역을 찾아드립니다.",
    bgColor: "var(--accent-blue)",
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent-red)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" /><path d="M9 15l2 2 4-4" />
      </svg>
    ),
    title: "처방전 한 장으로\n질병코드 자동 추출",
    description: "처방전, 수술확인서 등을 스캔하면\nKCD 질병코드를 자동으로 추출하고 보장을 매칭합니다.",
    bgColor: "var(--accent-red)",
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "원스톱\n자동 청구까지",
    description: "서류 준비부터 보험사 전송까지\n5단계 자동 청구 프로세스로 간편하게 완료하세요.",
    bgColor: "var(--accent-green)",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("bobiseo_onboarded", "true");
      router.push("/login");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("bobiseo_onboarded", "true");
    router.push("/login");
  };

  const step = steps[currentStep];

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-screen px-9 py-12" style={{ background: "var(--bg-primary)" }}>
        {/* Skip button */}
        <div className="flex justify-end">
          <button
            onClick={handleSkip}
            className="text-[18px] py-2 px-4 transition-colors active:opacity-70"
            style={{ color: "var(--text-muted)" }}
          >
            건너뛰기
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 flex flex-col items-center justify-center animate-fade-in" key={currentStep}>
          {/* Solid bg icon circle */}
          <div
            className="w-36 h-36 rounded-full flex items-center justify-center mb-16"
            style={{
              background: `color-mix(in srgb, ${step.bgColor} 12%, var(--bg-secondary))`,
            }}
          >
            {step.icon}
          </div>

          <h2
            className="text-[34px] font-extrabold tracking-[-0.02em] text-center mb-7 whitespace-pre-line leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {step.title}
          </h2>

          <p
            className="text-[18px] text-center leading-relaxed whitespace-pre-line"
            style={{ color: "var(--text-secondary)" }}
          >
            {step.description}
          </p>
        </div>

        {/* Bottom section */}
        <div className="space-y-8 pb-6">
          {/* Step indicator dots */}
          <div className="flex justify-center gap-3.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className="h-[10px] rounded-full transition-all duration-300"
                style={{
                  width: i === currentStep ? "36px" : "10px",
                  background: i === currentStep ? "var(--accent-blue)" : "var(--bg-secondary)",
                }}
              />
            ))}
          </div>

          <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
            {currentStep === steps.length - 1 ? "시작하기" : "다음"}
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}
