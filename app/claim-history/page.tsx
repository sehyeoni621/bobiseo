"use client";

import { useState } from "react";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { mockClaimHistory, statusConfig, ClaimHistoryItem } from "@/data/mock-claim-history";

type FilterStatus = "all" | ClaimHistoryItem["status"];

const filterOptions: Array<{ value: FilterStatus; label: string }> = [
  { value: "all", label: "전체" },
  { value: "paid", label: "지급완료" },
  { value: "approved", label: "승인" },
  { value: "reviewing", label: "심사중" },
  { value: "submitted", label: "접수" },
  { value: "rejected", label: "반려" },
];

export default function ClaimHistoryPage() {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === "all"
    ? mockClaimHistory
    : mockClaimHistory.filter((c) => c.status === filter);

  const totalPaid = mockClaimHistory
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => sum + (c.paidAmount || 0), 0);

  const pendingCount = mockClaimHistory.filter(
    (c) => c.status === "submitted" || c.status === "reviewing",
  ).length;

  return (
    <MobileFrame showNav>
      <Header title="청구 이력" />

      <div className="animate-slide-in" style={{ background: "var(--bg-secondary)" }}>
        {/* Summary cards */}
        <div className="px-7 pt-6 pb-5" style={{ background: "var(--bg-primary)" }}>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[16px] p-5" style={{ background: "var(--bg-secondary)" }}>
              <p className="text-[12px] mb-1.5" style={{ color: "var(--text-muted)" }}>총 수령액</p>
              <p className="text-[20px] font-extrabold" style={{ color: "var(--accent-green)" }}>
                {totalPaid.toLocaleString("ko-KR")}원
              </p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "var(--bg-secondary)" }}>
              <p className="text-[12px] mb-1.5" style={{ color: "var(--text-muted)" }}>진행중</p>
              <p className="text-[20px] font-extrabold" style={{ color: "var(--accent-blue)" }}>
                {pendingCount}건
              </p>
            </div>
          </div>
        </div>

        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* Filter tabs */}
        <div className="px-7 pt-5 pb-3" style={{ background: "var(--bg-primary)" }}>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filterOptions.map((opt) => {
              const isActive = filter === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setFilter(opt.value)}
                  className="px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all active:scale-95"
                  style={{
                    background: isActive ? "var(--accent-blue)" : "var(--bg-secondary)",
                    color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Claim list */}
        <div className="px-7 py-4" style={{ background: "var(--bg-primary)" }}>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[15px]" style={{ color: "var(--text-muted)" }}>해당 상태의 청구 건이 없습니다</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((claim) => (
                <ClaimCard
                  key={claim.id}
                  claim={claim}
                  isExpanded={expandedId === claim.id}
                  onToggle={() =>
                    setExpandedId(expandedId === claim.id ? null : claim.id)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
}

function ClaimCard({
  claim,
  isExpanded,
  onToggle,
}: {
  claim: ClaimHistoryItem;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const config = statusConfig[claim.status];

  return (
    <div className="rounded-[16px] overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center gap-4 text-left active:opacity-80 transition-all"
      >
        {/* Status indicator */}
        <div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ background: config.color }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[14px] font-bold truncate" style={{ color: "var(--text-primary)" }}>
              {claim.riderName}
            </p>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: config.bgColor, color: config.color }}
            >
              {config.label}
            </span>
          </div>
          <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
            {claim.insurer} · {claim.submittedAt}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-[15px] font-bold" style={{ color: claim.status === "paid" ? "var(--accent-green)" : "var(--text-primary)" }}>
            {claim.amount.toLocaleString("ko-KR")}원
          </p>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 animate-slide-up">
          <div className="h-px mb-3" style={{ background: "var(--border)" }} />

          {/* Timeline */}
          <div className="space-y-3">
            <TimelineStep
              label="청구 접수"
              date={claim.submittedAt}
              done
              color="var(--accent-blue)"
            />
            <TimelineStep
              label="심사 진행"
              date={claim.status !== "submitted" ? claim.updatedAt : undefined}
              done={claim.status !== "submitted"}
              color="var(--accent-yellow)"
            />
            {claim.status === "rejected" ? (
              <TimelineStep
                label="반려"
                date={claim.updatedAt}
                done
                color="var(--accent-red)"
              />
            ) : (
              <>
                <TimelineStep
                  label="승인 완료"
                  date={claim.status === "approved" || claim.status === "paid" ? claim.updatedAt : undefined}
                  done={claim.status === "approved" || claim.status === "paid"}
                  color="var(--accent-green)"
                />
                <TimelineStep
                  label="보험금 입금"
                  date={claim.paidAt}
                  done={claim.status === "paid"}
                  color="var(--accent-green)"
                />
              </>
            )}
          </div>

          {/* Details */}
          <div className="mt-3 rounded-[12px] p-3 space-y-2" style={{ background: "var(--bg-primary)" }}>
            <DetailRow label="접수번호" value={claim.receiptNumber} mono />
            <DetailRow label="진단코드" value={`${claim.kcdCode} (${claim.diagnosisName})`} />
            {claim.paidAmount && (
              <DetailRow label="지급액" value={`${claim.paidAmount.toLocaleString("ko-KR")}원`} accent />
            )}
            {claim.rejectReason && (
              <div className="mt-2 rounded-[10px] p-3" style={{ background: "color-mix(in srgb, var(--accent-red) 8%, transparent)" }}>
                <p className="text-[12px] font-bold mb-1" style={{ color: "var(--accent-red)" }}>반려 사유</p>
                <p className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{claim.rejectReason}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TimelineStep({
  label,
  date,
  done,
  color,
}: {
  label: string;
  date?: string;
  done: boolean;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
        style={{ background: done ? color : "var(--border)" }}
      />
      <span
        className="text-[12px] flex-1"
        style={{ color: done ? "var(--text-primary)" : "var(--text-muted)", fontWeight: done ? 600 : 400 }}
      >
        {label}
      </span>
      <span className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>
        {date || "-"}
      </span>
    </div>
  );
}

function DetailRow({ label, value, mono, accent }: { label: string; value: string; mono?: boolean; accent?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>{label}</span>
      <span
        className={`text-[12px] font-semibold ${mono ? "font-mono" : ""}`}
        style={{ color: accent ? "var(--accent-green)" : "var(--text-primary)" }}
      >
        {value}
      </span>
    </div>
  );
}
