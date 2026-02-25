import { ClaimableItem } from "@/types/claim";

export const mockClaimItems: ClaimableItem[] = [
  {
    id: "ci-001",
    title: "디스크 수술비",
    amount: 1500000,
    insurer: "현대해상",
    status: "claimable",
  },
  {
    id: "ci-002",
    title: "MRI 검사비",
    amount: 847000,
    insurer: "신한라이프",
    status: "claimable",
  },
  {
    id: "ci-003",
    title: "통원치료비 (재활)",
    amount: 500000,
    insurer: "한화생명",
    status: "docs_needed",
  },
  {
    id: "ci-004",
    title: "질병입원일당 (7일)",
    amount: 210000,
    insurer: "신한라이프",
    status: "claimable",
  },
  {
    id: "ci-005",
    title: "실손의료비",
    amount: 623000,
    insurer: "신한라이프",
    status: "in_progress",
  },
];

export const totalUnclaimedAmount = mockClaimItems.reduce(
  (sum, item) => sum + item.amount,
  0
);
