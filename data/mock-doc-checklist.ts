export interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  required: boolean;
  checked: boolean;
}

export interface KcdChecklist {
  kcdCode: string;
  diagnosisName: string;
  items: ChecklistItem[];
}

export const mockDocChecklists: KcdChecklist[] = [
  {
    kcdCode: "M51.1",
    diagnosisName: "요추 추간판장애 (디스크)",
    items: [
      { id: "dc-001", label: "진단서", description: "담당의 발급 진단서 (KCD 코드 포함)", required: true, checked: true },
      { id: "dc-002", label: "세부진료비확인서", description: "입원/통원 진료비 상세 내역", required: true, checked: true },
      { id: "dc-003", label: "진료기록사본", description: "입원 기간 진료기록 (의무기록실 발급)", required: true, checked: false },
      { id: "dc-004", label: "수술확인서", description: "경막외 신경차단술 시행 확인서", required: true, checked: false },
      { id: "dc-005", label: "MRI 판독소견서", description: "영상의학과 MRI 판독 결과지", required: false, checked: false },
      { id: "dc-006", label: "통원확인서", description: "퇴원 후 외래 통원 내역 (해당 시)", required: false, checked: false },
    ],
  },
  {
    kcdCode: "M54.5",
    diagnosisName: "요통",
    items: [
      { id: "dc-011", label: "진단서", description: "담당의 발급 진단서", required: true, checked: true },
      { id: "dc-012", label: "세부진료비확인서", description: "통원 진료비 상세 내역", required: true, checked: true },
      { id: "dc-013", label: "처방전 사본", description: "약 처방 내역서", required: false, checked: false },
    ],
  },
  {
    kcdCode: "G55.1",
    diagnosisName: "추간판장애의 신경근 압박",
    items: [
      { id: "dc-021", label: "진단서", description: "신경외과 진단서", required: true, checked: true },
      { id: "dc-022", label: "수술확인서", description: "신경차단술 시행 확인", required: true, checked: false },
      { id: "dc-023", label: "세부진료비확인서", description: "시술 관련 진료비 내역", required: true, checked: true },
    ],
  },
];
