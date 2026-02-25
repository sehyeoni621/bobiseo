"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/ui/Button";
import { mockDetailedReceipt, formatKRW } from "@/data/mock-medical-detail-receipt";
import { useScanStore } from "@/store/useScanStore";

const categoryColors: Record<string, string> = {
  "01": "var(--accent-blue)",
  "02": "var(--accent-green)",
  "03": "var(--accent-purple)",
  "04": "var(--accent-red)",
  "05": "var(--accent-blue)",
  "06": "var(--accent-green)",
  "07": "var(--accent-red)",
  "08": "var(--accent-purple)",
  "09": "var(--accent-green)",
};

export default function MedicalReceiptPage() {
  const router = useRouter();
  const loadMockData = useScanStore((s) => s.loadMockData);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const receipt = mockDetailedReceipt;

  const toggleCategory = (code: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  };

  const expandAll = () => {
    const allCodes = receipt.categories.map((c) => c.categoryCode);
    setExpandedCategories(new Set(allCodes));
  };

  const collapseAll = () => {
    setExpandedCategories(new Set());
  };

  const handleAnalyze = () => {
    loadMockData();
    router.push("/doc-scan-result");
  };

  return (
    <MobileFrame showNav>
      <Header title="세부진료확인서" />

      <div className="animate-slide-in" style={{ background: "var(--bg-secondary)" }}>
        {/* Hospital header - official document style */}
        <div className="px-5 pt-6 pb-6" style={{ background: "var(--bg-primary)" }}>
          <div className="text-center mb-6">
            <p className="text-[16px] font-extrabold tracking-wide" style={{ color: "var(--text-primary)" }}>
              세부진료비확인서
            </p>
            <p className="text-[12px] mt-1" style={{ color: "var(--text-muted)" }}>
              (건강보험 요양급여비용)
            </p>
          </div>

          <div
            className="rounded-[16px] p-6"
            style={{ background: "var(--bg-secondary)" }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0"
                style={{ background: "color-mix(in srgb, var(--accent-blue) 12%, transparent)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>
                  {receipt.hospitalName}
                </p>
                <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                  {receipt.hospitalAddress}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InfoRow label="환자명" value={receipt.patientName} />
              <InfoRow label="생년월일" value={receipt.patientBirthDate} />
              <InfoRow label="진료과" value={receipt.department} />
              <InfoRow label="담당의" value={`${receipt.attendingDoctor} 전문의`} />
              <InfoRow label="입원일" value={receipt.admissionDate} />
              <InfoRow label="퇴원일" value={receipt.dischargeDate} />
              <InfoRow label="재원일수" value={`${receipt.totalDays}일`} />
              <InfoRow label="환자번호" value={receipt.patientId} />
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-2" style={{ background: "var(--bg-secondary)" }} />

        {/* Diagnosis section */}
        <div className="px-5 py-6" style={{ background: "var(--bg-primary)" }}>
          <p className="text-[13px] font-bold mb-5" style={{ color: "var(--text-primary)" }}>
            진단명 (KCD 코드)
          </p>
          <div className="space-y-2.5">
            {receipt.diagnoses.map((d) => (
              <div
                key={d.kcdCode}
                className="flex items-center gap-3 rounded-[14px] p-5"
                style={{ background: "var(--bg-secondary)" }}
              >
                <span
                  className="px-2.5 py-1.5 rounded-[10px] text-[12px] font-mono font-bold flex-shrink-0"
                  style={{
                    background: d.isPrimary
                      ? "color-mix(in srgb, var(--accent-red) 15%, transparent)"
                      : "color-mix(in srgb, var(--accent-blue) 12%, transparent)",
                    color: d.isPrimary ? "var(--accent-red)" : "var(--accent-blue)",
                  }}
                >
                  {d.kcdCode}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium truncate" style={{ color: "var(--text-primary)" }}>
                    {d.name}
                  </p>
                </div>
                {d.isPrimary && (
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: "color-mix(in srgb, var(--accent-red) 10%, transparent)", color: "var(--accent-red)" }}
                  >
                    주상병
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-2" style={{ background: "var(--bg-secondary)" }} />

        {/* Detailed bill categories */}
        <div className="px-5 py-6" style={{ background: "var(--bg-primary)" }}>
          <div className="flex justify-between items-center mb-5">
            <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>
              진료비 세부내역
            </p>
            <button
              onClick={expandedCategories.size > 0 ? collapseAll : expandAll}
              className="text-[12px] font-semibold px-3 py-1.5 rounded-full transition-all active:scale-[0.97]"
              style={{
                background: "color-mix(in srgb, var(--accent-blue) 10%, transparent)",
                color: "var(--accent-blue)",
              }}
            >
              {expandedCategories.size > 0 ? "모두 접기" : "모두 펼치기"}
            </button>
          </div>

          {/* Table header */}
          <div
            className="grid grid-cols-12 gap-1 px-4 py-3 rounded-t-[14px] text-[11px] font-bold"
            style={{ background: "var(--bg-secondary)", color: "var(--text-muted)" }}
          >
            <span className="col-span-5">항목</span>
            <span className="col-span-2 text-right">급여</span>
            <span className="col-span-3 text-right">본인부담</span>
            <span className="col-span-2 text-right">비급여</span>
          </div>

          {/* Categories */}
          <div className="space-y-0">
            {receipt.categories.map((cat) => {
              const isExpanded = expandedCategories.has(cat.categoryCode);
              const accentColor = categoryColors[cat.categoryCode] || "var(--accent-blue)";

              return (
                <div key={cat.categoryCode}>
                  {/* Category row (clickable) */}
                  <button
                    onClick={() => toggleCategory(cat.categoryCode)}
                    className="w-full grid grid-cols-12 gap-1 px-4 py-3.5 text-left transition-all active:opacity-80"
                    style={{
                      borderBottom: "1px solid var(--border)",
                      background: isExpanded
                        ? `color-mix(in srgb, ${accentColor} 4%, var(--bg-primary))`
                        : "var(--bg-primary)",
                    }}
                  >
                    <div className="col-span-5 flex items-center gap-2">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={accentColor}
                        strokeWidth="3"
                        className={`transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      <span className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>
                        {cat.category}
                      </span>
                    </div>
                    <span className="col-span-2 text-right text-[12px] font-medium" style={{ color: "var(--accent-blue)" }}>
                      {formatKRW(cat.subtotal.insurancePay)}
                    </span>
                    <span className="col-span-3 text-right text-[12px] font-bold" style={{ color: "var(--text-primary)" }}>
                      {formatKRW(cat.subtotal.patientCopay + cat.subtotal.patientFull)}
                    </span>
                    <span className="col-span-2 text-right text-[12px] font-medium" style={{ color: "var(--accent-red)" }}>
                      {cat.subtotal.nonCovered > 0 ? formatKRW(cat.subtotal.nonCovered) : "-"}
                    </span>
                  </button>

                  {/* Expanded items */}
                  {isExpanded && (
                    <div className="animate-slide-up">
                      {cat.items.map((item, idx) => (
                        <div
                          key={`${item.ediCode}-${idx}`}
                          className="grid grid-cols-12 gap-1 px-4 py-3"
                          style={{
                            background: "color-mix(in srgb, var(--bg-secondary) 50%, var(--bg-primary))",
                            borderBottom: "1px solid var(--border)",
                          }}
                        >
                          <div className="col-span-5">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span
                                className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                                style={{
                                  background: `color-mix(in srgb, ${accentColor} 12%, transparent)`,
                                  color: accentColor,
                                }}
                              >
                                {item.ediCode}
                              </span>
                            </div>
                            <p className="text-[12px] leading-snug" style={{ color: "var(--text-secondary)" }}>
                              {item.procedureName}
                            </p>
                            <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                              {item.date} · {item.quantity}{item.unit} x {item.days}일
                            </p>
                          </div>
                          <span className="col-span-2 text-right text-[11px] self-center" style={{ color: "var(--text-muted)" }}>
                            {formatKRW(item.insurancePay)}
                          </span>
                          <span className="col-span-3 text-right text-[11px] font-medium self-center" style={{ color: "var(--text-primary)" }}>
                            {formatKRW(item.patientCopay + item.patientFull)}
                          </span>
                          <span className="col-span-2 text-right text-[11px] self-center" style={{ color: item.nonCovered > 0 ? "var(--accent-red)" : "var(--text-muted)" }}>
                            {item.nonCovered > 0 ? formatKRW(item.nonCovered) : "-"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Separator */}
        <div className="h-2" style={{ background: "var(--bg-secondary)" }} />

        {/* Grand total */}
        <div className="px-5 py-6" style={{ background: "var(--bg-primary)" }}>
          <p className="text-[13px] font-bold mb-5" style={{ color: "var(--text-primary)" }}>
            진료비 합계
          </p>

          <div
            className="rounded-[18px] p-6 space-y-3.5"
            style={{ background: "var(--bg-secondary)" }}
          >
            <TotalRow label="총 진료비" amount={receipt.grandTotal.totalAmount} color="var(--text-primary)" bold />

            <div className="h-px" style={{ background: "var(--border)" }} />

            <TotalRow label="공단 부담금" amount={receipt.grandTotal.insurancePay} color="var(--accent-blue)" prefix="-" />
            <TotalRow label="본인부담금 (급여)" amount={receipt.grandTotal.patientCopay} color="var(--text-secondary)" />
            <TotalRow label="본인부담금 (비급여)" amount={receipt.grandTotal.patientFull} color="var(--text-secondary)" />
            <TotalRow label="비급여" amount={receipt.grandTotal.nonCovered} color="var(--accent-red)" />

            <div className="h-px" style={{ background: "var(--border)" }} />

            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>
                본인 납부 총액
              </span>
              <span className="text-[16px] font-extrabold" style={{ color: "var(--accent-red)" }}>
                {formatKRW(receipt.grandTotal.patientTotal)}원
              </span>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-2" style={{ background: "var(--bg-secondary)" }} />

        {/* Document info & CTA */}
        <div className="px-5 py-6" style={{ background: "var(--bg-primary)" }}>
          {/* Receipt metadata */}
          <div
            className="rounded-[14px] p-5 mb-5"
            style={{ background: "var(--bg-secondary)" }}
          >
            <div className="grid grid-cols-2 gap-2.5 text-[12px]">
              <div>
                <span style={{ color: "var(--text-muted)" }}>발급번호: </span>
                <span className="font-mono" style={{ color: "var(--text-secondary)" }}>{receipt.receiptNumber}</span>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>발급일: </span>
                <span style={{ color: "var(--text-secondary)" }}>{receipt.issueDate}</span>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>면허번호: </span>
                <span className="font-mono" style={{ color: "var(--text-secondary)" }}>{receipt.licenseNumber}</span>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>전화: </span>
                <span style={{ color: "var(--text-secondary)" }}>{receipt.hospitalPhone}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pb-5">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAnalyze}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              }
            >
              AI 보험금 분석 시작
            </Button>
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => router.push("/simulation")}
            >
              청구 시뮬레이션 보기
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>{label}</p>
      <p className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>{value}</p>
    </div>
  );
}

function TotalRow({
  label,
  amount,
  color,
  bold,
  prefix,
}: {
  label: string;
  amount: number;
  color: string;
  bold?: boolean;
  prefix?: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>{label}</span>
      <span
        className={`text-[14px] ${bold ? "font-bold" : "font-medium"}`}
        style={{ color }}
      >
        {prefix}{formatKRW(amount)}원
      </span>
    </div>
  );
}
