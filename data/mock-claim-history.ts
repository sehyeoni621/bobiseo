export interface ClaimHistoryItem {
  id: string;
  insurer: string;
  riderName: string;
  amount: number;
  status: "submitted" | "reviewing" | "approved" | "paid" | "rejected";
  submittedAt: string;
  updatedAt: string;
  receiptNumber: string;
  kcdCode: string;
  diagnosisName: string;
  paidAt?: string;
  paidAmount?: number;
  rejectReason?: string;
}

export const mockClaimHistory: ClaimHistoryItem[] = [
  {
    id: "ch-001",
    insurer: "신한라이프",
    riderName: "실손의료비",
    amount: 623000,
    status: "paid",
    submittedAt: "2026-02-18",
    updatedAt: "2026-02-25",
    receiptNumber: "CLM-2026-0218-001",
    kcdCode: "M51.1",
    diagnosisName: "요추 추간판장애",
    paidAt: "2026-02-25",
    paidAmount: 623000,
  },
  {
    id: "ch-002",
    insurer: "현대해상",
    riderName: "디스크 수술비(1~5종)",
    amount: 1500000,
    status: "approved",
    submittedAt: "2026-02-19",
    updatedAt: "2026-02-24",
    receiptNumber: "CLM-2026-0219-002",
    kcdCode: "M51.1",
    diagnosisName: "요추 추간판장애",
  },
  {
    id: "ch-003",
    insurer: "신한라이프",
    riderName: "질병입원일당 (3일)",
    amount: 90000,
    status: "reviewing",
    submittedAt: "2026-02-20",
    updatedAt: "2026-02-22",
    receiptNumber: "CLM-2026-0220-003",
    kcdCode: "M51.1",
    diagnosisName: "요추 추간판장애",
  },
  {
    id: "ch-004",
    insurer: "한화생명",
    riderName: "MRI 검사비",
    amount: 300000,
    status: "submitted",
    submittedAt: "2026-02-24",
    updatedAt: "2026-02-24",
    receiptNumber: "CLM-2026-0224-004",
    kcdCode: "M51.1",
    diagnosisName: "요추 추간판장애",
  },
  {
    id: "ch-005",
    insurer: "한화생명",
    riderName: "통원치료비 (재활)",
    amount: 500000,
    status: "rejected",
    submittedAt: "2026-02-15",
    updatedAt: "2026-02-20",
    receiptNumber: "CLM-2026-0215-005",
    kcdCode: "M54.5",
    diagnosisName: "요통",
    rejectReason: "진료확인서 미첨부 - 서류 보완 후 재청구 가능",
  },
];

export const statusConfig: Record<ClaimHistoryItem["status"], { label: string; color: string; bgColor: string }> = {
  submitted: { label: "접수완료", color: "var(--accent-blue)", bgColor: "color-mix(in srgb, var(--accent-blue) 12%, transparent)" },
  reviewing: { label: "심사중", color: "var(--accent-yellow)", bgColor: "color-mix(in srgb, var(--accent-yellow) 12%, transparent)" },
  approved: { label: "승인완료", color: "var(--accent-green)", bgColor: "color-mix(in srgb, var(--accent-green) 12%, transparent)" },
  paid: { label: "지급완료", color: "var(--accent-green)", bgColor: "color-mix(in srgb, var(--accent-green) 12%, transparent)" },
  rejected: { label: "반려", color: "var(--accent-red)", bgColor: "color-mix(in srgb, var(--accent-red) 12%, transparent)" },
};
