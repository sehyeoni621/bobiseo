"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useScanStore } from "@/store/useScanStore";

const codeColors = ["var(--accent-blue)", "var(--accent-purple)", "var(--accent-red)", "var(--accent-green)", "var(--accent-blue)"];

export default function DocScanResultPage() {
  const router = useRouter();
  const kcdResults = useScanStore((s) => s.kcdResults);
  const loadMockData = useScanStore((s) => s.loadMockData);

  useEffect(() => {
    if (kcdResults.length === 0) loadMockData();
  }, [kcdResults.length, loadMockData]);

  return (
    <MobileFrame showNav>
      <Header title="질병코드 분석 결과" />

      <div className="animate-slide-in">
        {/* Status section */}
        <div className="px-7 pt-6 pb-5" style={{ background: "var(--bg-primary)" }}>
          <div className="flex justify-center mb-3">
            <Badge variant="green" icon={
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
            }>AI 분석 완료</Badge>
          </div>
        </div>

        {/* Section separator */}
        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* KCD codes section */}
        <div className="px-7 py-6" style={{ background: "var(--bg-primary)" }}>
          <h3 className="text-[17px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>추출된 KCD 코드</h3>
          <div className="space-y-3 mb-7">
            {kcdResults.map((kcd, i) => (
              <Card key={kcd.id} padding="md">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="px-3 py-1.5 rounded-[12px] text-[13px] font-bold text-white"
                      style={{ background: codeColors[i % codeColors.length] }}
                    >
                      {kcd.code}
                    </span>
                    <span className="text-[15px] font-bold" style={{ color: "var(--text-primary)" }}>{kcd.diseaseName}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>{kcd.department}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
                      <div className="h-full rounded-full" style={{ width: `${kcd.confidence * 100}%`, background: codeColors[i % codeColors.length] }} />
                    </div>
                    <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{Math.round(kcd.confidence * 100)}%</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Section separator */}
        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* Coverage matching summary */}
        <div className="px-7 py-6" style={{ background: "var(--bg-primary)" }}>
          <Card variant="filled" padding="lg" className="mb-7">
            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-[16px] flex items-center justify-center flex-shrink-0"
                style={{ background: "color-mix(in srgb, var(--accent-blue) 12%, var(--bg-secondary))" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <div>
                <p className="text-[15px] font-bold mb-1.5" style={{ color: "var(--text-primary)" }}>보장 매칭 요약</p>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  M51.1 &rarr; 수술비, 입원일당 등 5개 특약 매칭
                </p>
                <p className="text-[15px] font-bold mt-3" style={{ color: "var(--accent-blue)" }}>
                  예상 청구 가능 금액: 2,847,000원
                </p>
              </div>
            </div>
          </Card>

          <Button variant="primary" size="lg" fullWidth onClick={() => router.push("/claim")}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>}>
            바로 청구 진행하기
          </Button>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
}
