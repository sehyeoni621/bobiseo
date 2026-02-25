import { KcdCode } from "@/types/kcd";

export const mockKcdResults: KcdCode[] = [
  {
    id: "kcd-001",
    documentId: "doc-001",
    code: "M51.1",
    diseaseName: "요추 추간판 탈출증",
    department: "정형외과",
    confidence: 0.98,
  },
  {
    id: "kcd-002",
    documentId: "doc-001",
    code: "M54.5",
    diseaseName: "요통",
    department: "정형외과",
    confidence: 0.95,
  },
  {
    id: "kcd-003",
    documentId: "doc-001",
    code: "G55.1",
    diseaseName: "추간판 장애에서의 신경근 압박",
    department: "신경외과",
    confidence: 0.91,
  },
];

// KCD code to rider matching map
export const kcdToRiderMapping: Record<string, string[]> = {
  "M51.1": ["수술비", "수술비(1~5종)", "입원일당", "질병입원일당", "실손의료비"],
  "M54.5": ["통원치료비", "실손의료비", "질병입원일당"],
  "G55.1": ["수술비", "입원일당", "실손의료비", "질병입원일당"],
};
