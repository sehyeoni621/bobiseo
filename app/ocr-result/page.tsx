"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { usePolicyStore } from "@/store/usePolicyStore";

export default function OcrResultPage() {
  const router = useRouter();
  const policies = usePolicyStore((s) => s.policies);
  const loadMockData = usePolicyStore((s) => s.loadMockData);

  useEffect(() => {
    if (policies.length === 0) loadMockData();
  }, [policies.length, loadMockData]);

  const policy = policies[0];
  if (!policy) return null;

  const infoItems = [
    { label: "보험사", value: policy.insurer, color: "var(--accent-blue)" },
    { label: "상품명", value: policy.productName, color: "var(--accent-purple)" },
    { label: "가입일", value: policy.contractDate, color: "var(--accent-green)" },
    { label: "주계약", value: policy.mainCoverage, color: "var(--accent-blue)" },
  ];

  return (
    <MobileFrame showNav>
      <Header title="OCR 분석 결과" />

      <div className="animate-slide-in">
        {/* Status badge section */}
        <div className="px-5 pt-6 pb-6" style={{ background: "var(--bg-primary)" }}>
          <div className="flex justify-center mb-5">
            <Badge variant="green" icon={
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
            }>분석 완료</Badge>
          </div>
        </div>

        {/* Info card section */}
        <div className="px-5 pb-6" style={{ background: "var(--bg-secondary)" }}>
          <Card variant="filled" padding="lg">
            <div className="space-y-3">
              {infoItems.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-[16px] flex items-center justify-center flex-shrink-0"
                    style={{ background: `color-mix(in srgb, ${item.color} 12%, var(--bg-secondary))` }}
                  >
                    <span className="text-xs font-bold" style={{ color: item.color }}>{item.label.slice(0, 1)}</span>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{item.label}</p>
                    <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Section separator */}
        <div className="h-2" style={{ background: "var(--bg-secondary)" }} />

        {/* Riders section */}
        <div className="px-5 py-6" style={{ background: "var(--bg-primary)" }}>
          <h3 className="text-[14px] font-bold mb-5" style={{ color: "var(--text-primary)" }}>특약 목록</h3>
          <div className="space-y-3 mb-5">
            {policy.riders.map((rider) => (
              <Card key={rider.id} padding="sm" className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {rider.matched ? (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: "color-mix(in srgb, var(--accent-green) 15%, var(--bg-secondary))" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                  ) : (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: "var(--bg-secondary)" }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: "var(--text-muted)" }} />
                    </div>
                  )}
                  <span
                    className="text-sm"
                    style={{
                      color: rider.matched ? "var(--text-primary)" : "var(--text-secondary)",
                      fontWeight: rider.matched ? 500 : 400,
                    }}
                  >
                    {rider.name}
                  </span>
                </div>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {rider.coverageAmount.toLocaleString("ko-KR")}원
                </span>
              </Card>
            ))}
          </div>

          <Button variant="primary" size="lg" fullWidth onClick={() => router.push("/dashboard")}>
            대시보드에서 확인하기
          </Button>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
}
