export interface Claim {
  id: string;
  userId: string;
  policyId: string;
  kcdCodeId: string;
  totalAmount: number;
  status: "docs_preparing" | "analyzing" | "matched" | "submitted";
  receiptNumber?: string;
  submittedAt?: string;
  createdAt: string;
}

export interface ClaimItem {
  id: string;
  claimId: string;
  riderId: string;
  riderName: string;
  matchedAmount: number;
  confidence: number;
}

export interface ClaimableItem {
  id: string;
  title: string;
  amount: number;
  insurer: string;
  status: "claimable" | "docs_needed" | "in_progress";
}
