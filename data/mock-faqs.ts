// FAQ data for the FAQ page

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  popular: boolean;
}

export type FaqCategory = "claim" | "coverage" | "app" | "terms" | "etc";

export const categoryLabels: Record<FaqCategory, string> = {
  claim: "청구",
  coverage: "보장",
  app: "앱 사용",
  terms: "보험 용어",
  etc: "기타",
};

export const categoryIcons: Record<FaqCategory, { color: string }> = {
  claim: { color: "var(--accent-blue)" },
  coverage: { color: "var(--accent-green)" },
  app: { color: "var(--accent-purple)" },
  terms: { color: "var(--accent-yellow)" },
  etc: { color: "var(--text-secondary)" },
};

export const mockFaqs: FaqItem[] = [
  // --- Claim ---
  {
    id: "faq-01",
    category: "claim",
    question: "보험금 청구는 어떻게 하나요?",
    answer: "홈 화면의 '자동청구' 버튼을 눌러 5단계 프로세스를 따라가세요.\n\n1. 진료 서류 업로드 (처방전, 진료확인서)\n2. AI가 질병코드를 자동 추출합니다\n3. 보장 매칭 및 예상 금액이 계산됩니다\n4. 필요 서류 체크리스트를 확인하세요\n5. 보험사로 청구서가 자동 전송됩니다\n\n전체 과정은 약 3분이면 완료됩니다.",
    popular: true,
  },
  {
    id: "faq-02",
    category: "claim",
    question: "여러 보험사에 동시에 청구할 수 있나요?",
    answer: "네, 가능합니다. 보비서는 등록된 모든 보험증권을 분석하여 청구 가능한 보험사를 자동으로 찾아줍니다.\n\n예를 들어, 수술비를 신한라이프와 현대해상에 각각 청구할 수 있는 경우 한 번의 프로세스로 동시에 전송합니다.\n\n실손보험은 1곳만 청구 가능하지만, 정액보험(진단비, 수술비, 입원일당 등)은 가입한 모든 보험사에 중복 청구가 가능합니다.",
    popular: true,
  },
  {
    id: "faq-03",
    category: "claim",
    question: "청구 후 보험금은 언제 입금되나요?",
    answer: "일반적으로 영업일 기준 3~5일 이내에 처리됩니다.\n\n• 실손의료비: 3~5 영업일\n• 정액보험금(진단비, 수술비): 3~7 영업일\n• 추가 서류 요청 시: 서류 제출 후 3~5 영업일\n\n'청구 이력' 메뉴에서 실시간 진행 상태를 확인할 수 있습니다.",
    popular: true,
  },
  {
    id: "faq-04",
    category: "claim",
    question: "보험금이 부지급(거절) 되면 어떻게 하나요?",
    answer: "부지급 결정을 받았다면 다음 절차를 따르세요:\n\n1. 부지급 사유 확인: 보험사에서 통지한 부지급 사유를 정확히 파악합니다.\n2. 이의제기: 부지급 통지일로부터 3년 이내에 이의제기가 가능합니다.\n3. 금융감독원 분쟁조정: 이의제기 후에도 해결되지 않으면 금융감독원에 분쟁조정을 신청할 수 있습니다.\n\n보비서의 프리미엄 리포트에서 부지급 대응 가이드를 확인할 수 있습니다.",
    popular: false,
  },

  // --- Coverage ---
  {
    id: "faq-05",
    category: "coverage",
    question: "보장 분석은 어떻게 이루어지나요?",
    answer: "보비서의 AI가 업로드된 보험증권을 분석하여 다음을 파악합니다:\n\n• 가입된 모든 특약 자동 추출\n• 6대 보장 영역별 충실도 점수 산출\n• 보장 공백(Gap) 자동 감지\n• 중복 보장 분석\n• 맞춤형 보완 추천\n\n분석 결과는 '프리미엄 리포트'에서 확인할 수 있습니다.",
    popular: true,
  },
  {
    id: "faq-06",
    category: "coverage",
    question: "보장 부족 경고는 무엇인가요?",
    answer: "보장 부족 경고는 현재 보험으로 충분히 보장받지 못하는 영역을 알려주는 기능입니다.\n\n• 위험(빨강): 보장이 심각하게 부족 (권장 대비 50% 미만)\n• 주의(노랑): 보장이 다소 부족 (권장 대비 50~80%)\n• 참고(파랑): 개선하면 좋은 수준 (권장 대비 80% 이상)\n\n각 경고에는 구체적인 보완 추천이 포함됩니다.",
    popular: false,
  },
  {
    id: "faq-07",
    category: "coverage",
    question: "중복 보장은 중복 청구가 가능한가요?",
    answer: "보험 종류에 따라 다릅니다:\n\n✅ 중복 청구 가능:\n• 정액보험 (진단비, 수술비, 입원일당)\n• 가입한 모든 보험사에 각각 청구 가능\n\n❌ 중복 청구 불가:\n• 실손의료비 보험\n• 실제 지출한 의료비만 보장\n• 여러 곳 가입해도 1곳에서만 수령\n\n보비서가 자동으로 중복 보장 여부를 분석해드립니다.",
    popular: true,
  },

  // --- App ---
  {
    id: "faq-08",
    category: "app",
    question: "보험증권은 어떻게 등록하나요?",
    answer: "두 가지 방법으로 등록할 수 있습니다:\n\n1. 사진 촬영: 보험증권을 카메라로 촬영하면 AI가 자동으로 정보를 추출합니다.\n2. PDF 업로드: 보험사 앱이나 이메일에서 받은 전자증권 PDF를 업로드합니다.\n\n홈 화면 → '증권업로드' 또는 설정 → '보험증권 관리'에서 진행할 수 있습니다.",
    popular: true,
  },
  {
    id: "faq-09",
    category: "app",
    question: "개인정보는 안전한가요?",
    answer: "보비서는 사용자의 개인정보를 최우선으로 보호합니다:\n\n• 모든 데이터는 암호화되어 저장됩니다 (AES-256)\n• 보험증권 원본은 서버에 저장되지 않습니다\n• 제3자에게 개인정보를 절대 공유하지 않습니다\n• 금융감독원 보안 가이드라인을 준수합니다\n\n설정 → '보안 설정'에서 생체인증을 활성화할 수 있습니다.",
    popular: false,
  },
  {
    id: "faq-10",
    category: "app",
    question: "프리미엄(PRO) 기능은 무엇인가요?",
    answer: "프리미엄 구독 시 다음 기능을 이용할 수 있습니다:\n\n• 프리미엄 리포트: 상세 보장 분석, 부족 보장 경고, 중복 분석\n• 약관 변경 알림: 실시간 약관 개정 모니터링\n• 부지급 대응 가이드: 전문 이의제기 절차 안내\n• 우선 처리: 청구 심사 우선 처리 요청\n• 전문가 상담: 손해사정사 1:1 연결\n\n현재 MVP 기간에는 모든 기능이 무료로 제공됩니다.",
    popular: true,
  },

  // --- Terms ---
  {
    id: "faq-11",
    category: "terms",
    question: "실손보험이란 무엇인가요?",
    answer: "실손보험(실손의료비보험)은 실제로 지출한 의료비를 보상해주는 보험입니다.\n\n• 급여 항목: 본인부담금의 80~90% 보상\n• 비급여 항목: 실제 부담액의 70~80% 보상\n• 자기부담금이 있어 100% 보상은 아닙니다\n\n국민건강보험이 커버하지 못하는 본인부담 의료비를 보전하는 가장 기본적인 보험입니다.",
    popular: true,
  },
  {
    id: "faq-12",
    category: "terms",
    question: "KCD 코드(질병분류코드)란 무엇인가요?",
    answer: "KCD(Korean Standard Classification of Diseases)는 한국표준질병사인분류 코드입니다.\n\n예시:\n• M51.1: 요추 추간판 장애 (허리디스크)\n• M54.5: 요통\n• G55.1: 추간판 장애에서의 신경근 압박\n\n보험사는 이 코드를 기준으로 보장 여부를 판단합니다. 보비서는 진료확인서에서 KCD 코드를 자동으로 추출하여 보장 매칭에 활용합니다.",
    popular: false,
  },
  {
    id: "faq-13",
    category: "terms",
    question: "특약이란 무엇인가요?",
    answer: "특약(특별약관)은 주계약에 추가로 가입하는 보장 항목입니다.\n\n• 주계약: 보험의 기본 보장 (예: 사망보험금)\n• 특약: 선택적 추가 보장 (예: 수술비, 입원일당, 진단비)\n\n대부분의 실제 보험금 청구는 특약에서 발생합니다. 보비서는 모든 특약을 분석하여 청구 가능한 항목을 찾아드립니다.",
    popular: false,
  },

  // --- Etc ---
  {
    id: "faq-14",
    category: "etc",
    question: "고객센터 운영시간은 언제인가요?",
    answer: "고객센터 운영시간:\n\n• 전화 상담: 평일 09:00 ~ 18:00\n• 카카오톡 상담: 평일 09:00 ~ 20:00\n• 이메일 문의: 24시간 접수 (영업일 내 답변)\n\n긴급한 보험금 청구 관련 문의는 카카오톡 상담을 이용해주세요.",
    popular: false,
  },
  {
    id: "faq-15",
    category: "etc",
    question: "탈퇴하면 데이터는 어떻게 되나요?",
    answer: "회원 탈퇴 시:\n\n• 모든 개인정보는 즉시 삭제됩니다\n• 보험증권 데이터는 복구 불가능하게 파기됩니다\n• 청구 이력은 법적 보관 기간(5년) 경과 후 삭제됩니다\n• 탈퇴 후 동일 번호로 재가입 가능합니다\n\n설정 → 고객센터에서 탈퇴를 요청할 수 있습니다.",
    popular: false,
  },
];
