"use client";

interface SummaryCardProps {
  totalAmount: number;
  analyzedCount: number;
  claimableCount: number;
  inProgressCount: number;
}

function formatAmount(amount: number): string {
  return amount.toLocaleString("ko-KR");
}

export default function SummaryCard({
  totalAmount,
  analyzedCount,
  claimableCount,
  inProgressCount,
}: SummaryCardProps) {
  const stats = [
    { value: analyzedCount, label: "분석완료", color: "var(--accent-blue)" },
    { value: claimableCount, label: "청구가능", color: "var(--accent-green)" },
    { value: inProgressCount, label: "진행중", color: "var(--accent-yellow)" },
  ];

  return (
    <div
      className="rounded-[28px] p-9"
      style={{ background: "var(--bg-secondary)" }}
    >
      <p className="text-[17px] font-medium mb-4" style={{ color: "var(--text-muted)" }}>
        총 예상 미청구 보험금
      </p>
      <div className="flex items-baseline gap-2 mb-10">
        <span
          className="text-[48px] font-extrabold tracking-[-0.03em] leading-none animate-count-up"
          style={{ color: "var(--text-primary)" }}
        >
          {formatAmount(totalAmount)}
        </span>
        <span className="text-[20px] font-bold" style={{ color: "var(--text-muted)" }}>원</span>
      </div>

      <div className="flex gap-5">
        {stats.map((item, i) => (
          <div
            key={item.label}
            className={`flex-1 rounded-[20px] py-6 px-5 text-center animate-slide-up stagger-${i + 1}`}
            style={{ background: "var(--bg-primary)" }}
          >
            <p className="text-[30px] font-extrabold leading-tight" style={{ color: item.color }}>
              {item.value}
            </p>
            <p className="text-[15px] mt-3 font-medium" style={{ color: "var(--text-muted)" }}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
