export interface Policy {
  id: string;
  userId: string;
  insurer: string;
  productName: string;
  contractDate: string;
  mainCoverage: string;
  riders: Rider[];
  status: "analyzing" | "completed" | "error";
  ocrRawData?: Record<string, unknown>;
  createdAt: string;
}

export interface Rider {
  id: string;
  policyId: string;
  name: string;
  coverageAmount: number;
  matched: boolean;
}

export interface InsuranceCompany {
  name: string;
  logo?: string;
  color: string;
}
