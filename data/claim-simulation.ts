import { SampleMedicalBill } from "./sample-medical-bill";

export interface ClaimMatchResult {
  id: string;
  insurer: string;
  productName: string;
  riderName: string;
  matchedDiagnosis: string;
  kcdCode: string;
  estimatedAmount: number;
  confidence: number;
  basis: string;
}

export interface SimulationResult {
  bill: SampleMedicalBill;
  matchedClaims: ClaimMatchResult[];
  totalEstimatedClaim: number;
  patientPaid: number;
  estimatedRefund: number;
  refundRate: number;
  insurerBreakdown: Array<{
    insurer: string;
    amount: number;
    claimCount: number;
  }>;
}

export function runClaimSimulation(bill: SampleMedicalBill): SimulationResult {
  const matchedClaims: ClaimMatchResult[] = [
    {
      id: "sim-001",
      insurer: "신한라이프",
      productName: "(무)신한통합보험건강보장",
      riderName: "실손의료비 특약",
      matchedDiagnosis: "요추간판장애 입원치료",
      kcdCode: "M51.1",
      estimatedAmount: Math.round(bill.patientTotal * 0.8),
      confidence: 0.95,
      basis: "실손의료비: 본인부담금의 80% 보상 (자기부담금 20%)",
    },
    {
      id: "sim-002",
      insurer: "신한라이프",
      productName: "(무)신한통합보험건강보장",
      riderName: "질병입원일당 특약",
      matchedDiagnosis: "요추간판장애 입원",
      kcdCode: "M51.1",
      estimatedAmount: 30000 * bill.daysAdmitted,
      confidence: 0.92,
      basis: `질병입원일당: 1일 3만원 x ${bill.daysAdmitted}일`,
    },
    {
      id: "sim-003",
      insurer: "현대해상",
      productName: "현대해상 하이라이프보험",
      riderName: "질병수술비 특약",
      matchedDiagnosis: "경막외 신경차단술",
      kcdCode: "G55.1",
      estimatedAmount: 500000,
      confidence: 0.88,
      basis: "질병수술비: 경막외 신경차단술 1회 50만원 지급",
    },
    {
      id: "sim-004",
      insurer: "현대해상",
      productName: "현대해상 하이라이프보험",
      riderName: "질병입원일당 특약",
      matchedDiagnosis: "요통 입원치료",
      kcdCode: "M54.5",
      estimatedAmount: 50000 * bill.daysAdmitted,
      confidence: 0.90,
      basis: `질병입원일당: 1일 5만원 x ${bill.daysAdmitted}일`,
    },
    {
      id: "sim-005",
      insurer: "한화생명",
      productName: "한화생명 건강보험",
      riderName: "MRI/CT 검사비 특약",
      matchedDiagnosis: "MRI 요추부 검사",
      kcdCode: "M51.1",
      estimatedAmount: 300000,
      confidence: 0.85,
      basis: "MRI 검사비: 연 1회 30만원 한도 지급",
    },
  ];

  const totalEstimatedClaim = matchedClaims.reduce((sum, c) => sum + c.estimatedAmount, 0);

  // Group by insurer
  const insurerMap = matchedClaims.reduce<Record<string, { amount: number; count: number }>>((acc, c) => {
    const existing = acc[c.insurer] || { amount: 0, count: 0 };
    return {
      ...acc,
      [c.insurer]: {
        amount: existing.amount + c.estimatedAmount,
        count: existing.count + 1,
      },
    };
  }, {});

  const insurerBreakdown = Object.entries(insurerMap).map(([insurer, data]) => ({
    insurer,
    amount: data.amount,
    claimCount: data.count,
  }));

  return {
    bill,
    matchedClaims,
    totalEstimatedClaim,
    patientPaid: bill.patientTotal,
    estimatedRefund: totalEstimatedClaim,
    refundRate: Math.min(Math.round((totalEstimatedClaim / bill.patientTotal) * 100), 100),
    insurerBreakdown,
  };
}
