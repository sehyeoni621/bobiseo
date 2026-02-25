// Coverage analysis data for the 보장 분석 리포트 page

export interface CoverageArea {
  id: string;
  label: string;
  score: number;
  maxScore: number;
  color: string;
  riders: CoverageRiderDetail[];
}

export interface CoverageRiderDetail {
  name: string;
  insurer: string;
  amount: number;
  status: "active" | "expiring" | "expired";
  expiryDate: string;
}

export interface CoverageGap {
  area: string;
  severity: "critical" | "warning" | "info";
  currentCoverage: number;
  recommendedCoverage: number;
  description: string;
  recommendation: string;
}

export interface MonthlyPremiumBreakdown {
  insurer: string;
  productName: string;
  monthly: number;
  color: string;
}

export const coverageAreas: CoverageArea[] = [
  {
    id: "ca-01",
    label: "실손의료비",
    score: 95,
    maxScore: 100,
    color: "var(--accent-blue)",
    riders: [
      { name: "실손의료비", insurer: "신한라이프", amount: 5000000, status: "active", expiryDate: "2031-03-15" },
    ],
  },
  {
    id: "ca-02",
    label: "암 보장",
    score: 85,
    maxScore: 100,
    color: "var(--accent-red)",
    riders: [
      { name: "진단비(암)", insurer: "신한라이프", amount: 30000000, status: "active", expiryDate: "2031-03-15" },
      { name: "암진단비", insurer: "한화생명", amount: 30000000, status: "active", expiryDate: "2030-01-10" },
    ],
  },
  {
    id: "ca-03",
    label: "뇌혈관",
    score: 30,
    maxScore: 100,
    color: "var(--accent-purple)",
    riders: [
      { name: "뇌출혈진단비", insurer: "현대해상", amount: 20000000, status: "active", expiryDate: "2032-08-20" },
    ],
  },
  {
    id: "ca-04",
    label: "심장질환",
    score: 72,
    maxScore: 100,
    color: "var(--accent-green)",
    riders: [
      { name: "심장질환진단비", insurer: "한화생명", amount: 20000000, status: "active", expiryDate: "2030-01-10" },
    ],
  },
  {
    id: "ca-05",
    label: "수술/입원",
    score: 88,
    maxScore: 100,
    color: "var(--accent-blue)",
    riders: [
      { name: "수술비", insurer: "신한라이프", amount: 1000000, status: "active", expiryDate: "2031-03-15" },
      { name: "수술비(1~5종)", insurer: "현대해상", amount: 2000000, status: "active", expiryDate: "2032-08-20" },
      { name: "질병입원일당", insurer: "신한라이프", amount: 30000, status: "active", expiryDate: "2031-03-15" },
      { name: "상해입원일당", insurer: "현대해상", amount: 50000, status: "active", expiryDate: "2032-08-20" },
      { name: "입원일당", insurer: "한화생명", amount: 30000, status: "expiring", expiryDate: "2026-06-10" },
    ],
  },
  {
    id: "ca-06",
    label: "골절/상해",
    score: 45,
    maxScore: 100,
    color: "var(--accent-yellow)",
    riders: [
      { name: "골절진단비", insurer: "현대해상", amount: 500000, status: "active", expiryDate: "2032-08-20" },
    ],
  },
];

export const coverageGaps: CoverageGap[] = [
  {
    area: "뇌혈관 질환",
    severity: "critical",
    currentCoverage: 2000,
    recommendedCoverage: 5000,
    description: "뇌출혈만 보장, 뇌경색 미보장. 뇌혈관질환의 80%가 뇌경색입니다.",
    recommendation: "뇌혈관질환 진단비 특약 추가 가입 권장 (월 8,500원 수준)",
  },
  {
    area: "치과 치료",
    severity: "critical",
    currentCoverage: 0,
    recommendedCoverage: 3000,
    description: "치과 보장 특약이 전혀 없습니다. 임플란트 1개당 평균 150만원.",
    recommendation: "치아보험 또는 치과 실손 특약 가입 권장",
  },
  {
    area: "골절/상해",
    severity: "warning",
    currentCoverage: 50,
    recommendedCoverage: 200,
    description: "골절진단비 50만원으로 실제 치료비 대비 부족합니다.",
    recommendation: "골절진단비 100만원 이상으로 증액 권장",
  },
  {
    area: "통원치료",
    severity: "info",
    currentCoverage: 25,
    recommendedCoverage: 30,
    description: "통원치료비 25만원으로 기본 수준입니다.",
    recommendation: "현재 수준 유지 가능, 여유 시 30만원으로 증액",
  },
];

export const monthlyPremiums: MonthlyPremiumBreakdown[] = [
  { insurer: "신한라이프", productName: "무배당 건강보험 Plus", monthly: 87000, color: "var(--accent-blue)" },
  { insurer: "현대해상", productName: "무배당 굿앤굿건강보험", monthly: 62000, color: "var(--accent-green)" },
  { insurer: "한화생명", productName: "무배당 건강한생활보험", monthly: 45000, color: "var(--accent-purple)" },
];

export const totalMonthlyPremium = monthlyPremiums.reduce((sum, p) => sum + p.monthly, 0);

export const overallScore = 78;
