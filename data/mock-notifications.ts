export interface AppNotification {
  id: string;
  type: "claim_update" | "coverage_found" | "document_needed" | "payment" | "system";
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export const mockNotifications: AppNotification[] = [
  {
    id: "noti-001",
    type: "payment",
    title: "보험금 입금 완료",
    body: "신한라이프 실손의료비 623,000원이 입금되었습니다.",
    timestamp: "2026-02-25T09:30:00Z",
    read: false,
    actionUrl: "/claim-history",
  },
  {
    id: "noti-002",
    type: "claim_update",
    title: "청구 심사 완료",
    body: "현대해상 디스크 수술비 청구 건이 심사 완료되었습니다. 영업일 2일 내 입금 예정입니다.",
    timestamp: "2026-02-24T14:20:00Z",
    read: false,
    actionUrl: "/claim-history",
  },
  {
    id: "noti-003",
    type: "coverage_found",
    title: "새로운 보장 발견!",
    body: "한화생명 MRI 검사비 특약에서 300,000원 추가 청구가 가능합니다.",
    timestamp: "2026-02-23T11:00:00Z",
    read: true,
    actionUrl: "/dashboard",
  },
  {
    id: "noti-004",
    type: "document_needed",
    title: "서류 보완 요청",
    body: "한화생명 통원치료비 청구에 진료확인서가 추가로 필요합니다.",
    timestamp: "2026-02-22T16:45:00Z",
    read: true,
    actionUrl: "/doc-scan",
  },
  {
    id: "noti-005",
    type: "claim_update",
    title: "청구 접수 완료",
    body: "현대해상 디스크 수술비 1,500,000원 청구가 정상 접수되었습니다.",
    timestamp: "2026-02-21T10:10:00Z",
    read: true,
    actionUrl: "/claim-history",
  },
  {
    id: "noti-006",
    type: "system",
    title: "약관 업데이트 알림",
    body: "신한라이프 실손의료비 약관이 2026년 3월 개정 예정입니다. 변경 내용을 확인하세요.",
    timestamp: "2026-02-20T09:00:00Z",
    read: true,
    actionUrl: "/premium-report",
  },
];
