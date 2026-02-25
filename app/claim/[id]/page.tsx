"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useClaimStore } from "@/store/useClaimStore";

const mockRiderMatches = [
  { name: "수술비(1~5종)", amount: 1500000, confidence: 0.97 },
  { name: "질병입원일당 (7일)", amount: 210000, confidence: 0.95 },
  { name: "실손의료비", amount: 847000, confidence: 0.92 },
  { name: "통원치료비", amount: 500000, confidence: 0.88 },
];

export default function ClaimDetailPage() {
  const router = useRouter();
  const loadMockData = useClaimStore((s) => s.loadMockData);
  const claimableItems = useClaimStore((s) => s.claimableItems);

  useEffect(() => {
    if (claimableItems.length === 0) loadMockData();
  }, [claimableItems.length, loadMockData]);

  const totalAmount = mockRiderMatches.reduce((sum, r) => sum + r.amount, 0);

  return (
    <MobileFrame showNav>
      <Header title="청구 상세" />

      <div className="animate-slide-in">
        {/* Disease code info */}
        <div className="px-5 pt-6 pb-6" style={{ background: "var(--bg-primary)" }}>
          <Card variant="filled" padding="lg">
            <div className="flex items-center gap-4">
              <Badge variant="red">M51.1</Badge>
              <div>
                <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>요추 추간판 탈출증</p>
                <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>정형외과</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Section separator */}
        <div className="h-2" style={{ background: "var(--bg-secondary)" }} />

        {/* Coverage matching results */}
        <div className="px-5 py-6" style={{ background: "var(--bg-primary)" }}>
          <h3 className="text-[14px] font-bold mb-5" style={{ color: "var(--text-primary)" }}>보장 매칭 결과</h3>
          <div className="space-y-3 mb-5">
            {mockRiderMatches.map((rider, i) => (
              <Card key={i} padding="md">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-[13px] font-bold mb-1.5" style={{ color: "var(--text-primary)" }}>{rider.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
                        <div className="h-full rounded-full" style={{ width: `${rider.confidence * 100}%`, background: "var(--accent-green)" }} />
                      </div>
                      <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>{Math.round(rider.confidence * 100)}%</span>
                    </div>
                  </div>
                  <p className="text-[13px] font-bold" style={{ color: "var(--accent-blue)" }}>
                    {rider.amount.toLocaleString("ko-KR")}원
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Section separator */}
        <div className="h-2" style={{ background: "var(--bg-secondary)" }} />

        {/* Total amount */}
        <div className="px-5 py-6" style={{ background: "var(--bg-primary)" }}>
          <Card variant="filled" padding="lg" className="mb-5">
            <div className="text-center">
              <p className="text-[13px] mb-1.5" style={{ color: "var(--text-secondary)" }}>예상 총 지급액</p>
              <div className="flex items-baseline justify-center gap-1.5">
                <span className="text-[24px] font-extrabold" style={{ color: "var(--text-primary)" }}>
                  {totalAmount.toLocaleString("ko-KR")}
                </span>
                <span className="text-[13px] font-bold" style={{ color: "var(--text-secondary)" }}>원</span>
              </div>
            </div>
          </Card>

          <Button variant="primary" size="lg" fullWidth onClick={() => router.push("/claim")}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>}>
            즉시 청구하기
          </Button>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
}
