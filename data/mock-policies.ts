import { Policy } from "@/types/insurance";

export const mockPolicies: Policy[] = [
  {
    id: "pol-001",
    userId: "user-001",
    insurer: "신한라이프",
    productName: "무배당 건강보험 Plus",
    contractDate: "2021-03-15",
    mainCoverage: "질병입원일당 3만원",
    riders: [
      { id: "r-001", policyId: "pol-001", name: "질병입원일당", coverageAmount: 30000, matched: true },
      { id: "r-002", policyId: "pol-001", name: "수술비", coverageAmount: 1000000, matched: true },
      { id: "r-003", policyId: "pol-001", name: "진단비(암)", coverageAmount: 30000000, matched: false },
      { id: "r-004", policyId: "pol-001", name: "실손의료비", coverageAmount: 5000000, matched: true },
      { id: "r-005", policyId: "pol-001", name: "통원치료비", coverageAmount: 250000, matched: true },
    ],
    status: "completed",
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "pol-002",
    userId: "user-001",
    insurer: "현대해상",
    productName: "무배당 굿앤굿건강보험",
    contractDate: "2022-08-20",
    mainCoverage: "상해입원일당 5만원",
    riders: [
      { id: "r-006", policyId: "pol-002", name: "상해입원일당", coverageAmount: 50000, matched: true },
      { id: "r-007", policyId: "pol-002", name: "골절진단비", coverageAmount: 500000, matched: false },
      { id: "r-008", policyId: "pol-002", name: "수술비(1~5종)", coverageAmount: 2000000, matched: true },
      { id: "r-009", policyId: "pol-002", name: "뇌출혈진단비", coverageAmount: 20000000, matched: false },
    ],
    status: "completed",
    createdAt: "2024-02-10T09:00:00Z",
  },
  {
    id: "pol-003",
    userId: "user-001",
    insurer: "한화생명",
    productName: "무배당 건강한생활보험",
    contractDate: "2020-01-10",
    mainCoverage: "암진단비 3000만원",
    riders: [
      { id: "r-010", policyId: "pol-003", name: "암진단비", coverageAmount: 30000000, matched: false },
      { id: "r-011", policyId: "pol-003", name: "뇌혈관진단비", coverageAmount: 20000000, matched: false },
      { id: "r-012", policyId: "pol-003", name: "심장질환진단비", coverageAmount: 20000000, matched: false },
      { id: "r-013", policyId: "pol-003", name: "입원일당", coverageAmount: 30000, matched: true },
    ],
    status: "completed",
    createdAt: "2024-03-01T09:00:00Z",
  },
];
