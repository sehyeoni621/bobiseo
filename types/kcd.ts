export interface KcdCode {
  id: string;
  documentId: string;
  code: string;
  diseaseName: string;
  department: string;
  confidence: number;
}

export interface ScannedDocument {
  id: string;
  userId: string;
  docType: "prescription" | "surgery" | "opinion" | "treatment";
  imageUrl: string;
  ocrRawData?: Record<string, unknown>;
  createdAt: string;
}

export type DocType = ScannedDocument["docType"];
