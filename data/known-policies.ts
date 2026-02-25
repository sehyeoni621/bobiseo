// Insurance product registry extracted from policy PDF filenames
// Source: C:\Users\ed442\JEJUMVP\보험사 판매약관\

export interface KnownPolicy {
  id: string;
  productName: string;
  insurer: string;
  category: "life" | "health" | "annuity" | "savings" | "injury" | "dental" | "cancer" | "other";
  keywords: string[]; // OCR matching keywords
}

export const knownPolicies: KnownPolicy[] = [
  // === Annuity / Pension products ===
  { id: "kp-001", productName: "子子孫孫연금전환특약", insurer: "신한라이프", category: "annuity", keywords: ["자자손손", "연금전환", "子子孫孫"] },
  { id: "kp-002", productName: "이율보증형 퇴직적립식보험", insurer: "신한라이프", category: "savings", keywords: ["이율보증", "퇴직적립", "퇴직"] },
  { id: "kp-003", productName: "이율보증형 퇴직적립식보험Ⅱ", insurer: "신한라이프", category: "savings", keywords: ["이율보증", "퇴직적립", "퇴직"] },
  { id: "kp-004", productName: "3대질병연금전환특약(무배당)", insurer: "신한라이프", category: "annuity", keywords: ["3대질병", "연금전환", "질병연금"] },
  { id: "kp-005", productName: "New연금전환특약(무배당)", insurer: "신한라이프", category: "annuity", keywords: ["New연금", "연금전환"] },
  { id: "kp-006", productName: "달러연금보험Ⅱ(무배당)", insurer: "신한라이프", category: "annuity", keywords: ["달러연금", "달러"] },
  { id: "kp-007", productName: "신한ONE더라이프연금보험(무배당)", insurer: "신한라이프", category: "annuity", keywords: ["ONE더라이프", "라이프연금"] },
  { id: "kp-008", productName: "신한The부자만들기연금보험(무배당)", insurer: "신한라이프", category: "annuity", keywords: ["부자만들기", "부자", "연금"] },
  { id: "kp-009", productName: "신한VIP참연금저축보험Ⅲ", insurer: "신한라이프", category: "savings", keywords: ["VIP", "참연금", "저축"] },
  { id: "kp-010", productName: "신한슈퍼SOL연금보험(무배당)", insurer: "신한라이프", category: "annuity", keywords: ["슈퍼SOL", "SOL연금"] },
  { id: "kp-011", productName: "신한알찬연금저축보험Ⅱ", insurer: "신한라이프", category: "savings", keywords: ["알찬연금", "연금저축"] },
  { id: "kp-012", productName: "신한톤틴연금보험(무배당)", insurer: "신한라이프", category: "annuity", keywords: ["톤틴", "톤틴연금"] },
  { id: "kp-013", productName: "프리미어하이브리드연금보험(무배당)", insurer: "신한라이프", category: "annuity", keywords: ["프리미어", "하이브리드", "하이브리드연금"] },
  { id: "kp-014", productName: "신한SOL메이트달러연금보험Ⅱ(무배당)", insurer: "신한라이프", category: "annuity", keywords: ["SOL메이트", "달러연금", "메이트"] },

  // === Life / Whole life products ===
  { id: "kp-020", productName: "신한(간편가입)The든든한종신보험(무배당)", insurer: "신한라이프", category: "life", keywords: ["든든한종신", "종신보험", "The든든한"] },
  { id: "kp-021", productName: "신한(간편가입)든든한실속종신보험(무배당)", insurer: "신한라이프", category: "life", keywords: ["든든한실속", "실속종신", "종신보험"] },
  { id: "kp-022", productName: "신한(간편가입)종신보험 더블플랜(무배당)", insurer: "신한라이프", category: "life", keywords: ["더블플랜", "종신보험"] },
  { id: "kp-023", productName: "신한(간편가입)종신보험 드림UP(무배당)", insurer: "신한라이프", category: "life", keywords: ["드림UP", "드림", "종신보험"] },
  { id: "kp-024", productName: "신한(간편가입)종신보험 모아더드림(무배당)", insurer: "신한라이프", category: "life", keywords: ["모아더드림", "종신보험"] },
  { id: "kp-025", productName: "신한(간편가입)종신보험 모아더드림Plus(무배당)", insurer: "신한라이프", category: "life", keywords: ["모아더드림Plus", "모아더드림", "종신보험"] },
  { id: "kp-026", productName: "신한(간편가입)종신보험 밸런스핏(무배당)", insurer: "신한라이프", category: "life", keywords: ["밸런스핏", "밸런스", "종신보험"] },
  { id: "kp-027", productName: "신한(간편가입)종신보험 세븐PlusⅡ(무배당)", insurer: "신한라이프", category: "life", keywords: ["세븐Plus", "세븐", "종신보험"] },
  { id: "kp-028", productName: "신한(간편가입)종신보험 세븐Plus골드(무배당)", insurer: "신한라이프", category: "life", keywords: ["세븐Plus골드", "세븐골드", "종신보험"] },
  { id: "kp-029", productName: "신한(간편가입)위너스경영인정기보험(무배당)", insurer: "신한라이프", category: "life", keywords: ["위너스", "경영인", "정기보험"] },
  { id: "kp-030", productName: "신한(간편가입)통합종신보험원(ONE)(무배당)", insurer: "신한라이프", category: "life", keywords: ["통합종신", "종신보험원", "ONE"] },
  { id: "kp-031", productName: "신한놀라운ONE더보장종신보험(무배당)", insurer: "신한라이프", category: "life", keywords: ["놀라운", "ONE더보장", "종신보험"] },
  { id: "kp-032", productName: "신한놀라운종신보험(무배당)", insurer: "신한라이프", category: "life", keywords: ["놀라운종신", "종신보험"] },
  { id: "kp-033", productName: "신한멀티라이프변액유니버설종신보험(무배당)", insurer: "신한라이프", category: "life", keywords: ["멀티라이프", "변액유니버설", "유니버설종신"] },
  { id: "kp-034", productName: "신한종신보험 패밀리케어(무배당)", insurer: "신한라이프", category: "life", keywords: ["패밀리케어", "패밀리", "종신보험"] },
  { id: "kp-035", productName: "신한진심을품은대출안심보장보험(무배당)", insurer: "신한라이프", category: "life", keywords: ["진심을품은", "대출안심", "안심보장"] },

  // === Health / Medical products ===
  { id: "kp-040", productName: "신한(간편가입)꼬박꼬박항암치료비보험(무배당)", insurer: "신한라이프", category: "cancer", keywords: ["꼬박꼬박", "항암치료", "항암"] },
  { id: "kp-041", productName: "신한(간편가입)생활보장보험 ONE더세이프(무배당)", insurer: "신한라이프", category: "health", keywords: ["ONE더세이프", "생활보장", "세이프"] },
  { id: "kp-042", productName: "신한(간편가입)케어받는암보험(무배당)", insurer: "신한라이프", category: "cancer", keywords: ["케어받는", "암보험"] },
  { id: "kp-043", productName: "신한(간편가입)통합건강보험 ONE더우먼(무배당)", insurer: "신한라이프", category: "health", keywords: ["ONE더우먼", "통합건강", "우먼"] },
  { id: "kp-044", productName: "신한(간편가입)통합건강보험 원(ONE)(무배당, 갱신형)", insurer: "신한라이프", category: "health", keywords: ["통합건강", "원ONE", "건강보험"] },
  { id: "kp-045", productName: "신한(간편가입)통합건강보험 원(ONE)(무배당)", insurer: "신한라이프", category: "health", keywords: ["통합건강", "원ONE", "건강보험"] },
  { id: "kp-046", productName: "신한간편가입통합건강보험 라이트원(ONE)(무배당)", insurer: "신한라이프", category: "health", keywords: ["라이트원", "통합건강", "라이트"] },
  { id: "kp-047", productName: "신한급여실손의료비보장보험(무배당)", insurer: "신한라이프", category: "health", keywords: ["급여실손", "실손의료비", "의료비보장"] },
  { id: "kp-048", productName: "신한통합건강보험 슈퍼원(ONE)(무배당)", insurer: "신한라이프", category: "health", keywords: ["슈퍼원", "통합건강", "슈퍼"] },
  { id: "kp-049", productName: "신한통합건강보험 주니어큐브(무배당)", insurer: "신한라이프", category: "health", keywords: ["주니어큐브", "주니어", "통합건강"] },
  { id: "kp-050", productName: "신한단체급여실손의료비보장보험(무배당)", insurer: "신한라이프", category: "health", keywords: ["단체급여", "실손의료비", "단체"] },

  // === SOL mini products ===
  { id: "kp-060", productName: "신한SOL3대폴립보험 mini(무배당)", insurer: "신한라이프", category: "health", keywords: ["SOL", "3대폴립", "폴립", "mini"] },
  { id: "kp-061", productName: "신한SOL뇌심보험(무배당)", insurer: "신한라이프", category: "health", keywords: ["SOL뇌심", "뇌심보험", "뇌심"] },
  { id: "kp-062", productName: "신한SOL다치면속상해보험 mini(무배당)", insurer: "신한라이프", category: "injury", keywords: ["SOL", "다치면", "속상해", "상해보험"] },
  { id: "kp-063", productName: "신한SOL대중교통보험mini(무배당)", insurer: "신한라이프", category: "injury", keywords: ["SOL", "대중교통", "교통보험"] },
  { id: "kp-064", productName: "신한SOL독감보험 mini(무배당)", insurer: "신한라이프", category: "health", keywords: ["SOL", "독감", "독감보험"] },
  { id: "kp-065", productName: "신한SOL상처솔솔보험 mini(무배당)", insurer: "신한라이프", category: "health", keywords: ["SOL", "상처솔솔", "상처"] },
  { id: "kp-066", productName: "신한SOL스쿨존보험 mini(무배당)", insurer: "신한라이프", category: "injury", keywords: ["SOL", "스쿨존", "스쿨"] },
  { id: "kp-067", productName: "신한SOL쏠한처음저축보험(무배당)", insurer: "신한라이프", category: "savings", keywords: ["SOL", "쏠한처음", "처음저축"] },
  { id: "kp-068", productName: "신한SOL암보험(무배당)", insurer: "신한라이프", category: "cancer", keywords: ["SOL암", "암보험", "SOL"] },
  { id: "kp-069", productName: "신한SOL여성수술보험 mini(무배당)", insurer: "신한라이프", category: "health", keywords: ["SOL", "여성수술", "여성"] },
  { id: "kp-070", productName: "신한SOL정기보험(무배당)", insurer: "신한라이프", category: "life", keywords: ["SOL정기", "정기보험"] },

  // === Dental products ===
  { id: "kp-080", productName: "신한참좋은치아보험PlusⅢ(무배당)", insurer: "신한라이프", category: "dental", keywords: ["참좋은치아", "치아보험", "치아"] },
  { id: "kp-081", productName: "신한단체치아치료보장보험(무배당)", insurer: "신한라이프", category: "dental", keywords: ["단체치아", "치아치료", "치아보장"] },

  // === Other products ===
  { id: "kp-090", productName: "신한치매간병보험 ONE더케어(무배당)", insurer: "신한라이프", category: "health", keywords: ["치매간병", "ONE더케어", "치매"] },
  { id: "kp-091", productName: "신한윈윈플러스보험Ⅲ(무배당)", insurer: "신한라이프", category: "other", keywords: ["윈윈플러스", "윈윈"] },
  { id: "kp-092", productName: "신한The안심VIP저축보험Ⅲ(무배당)", insurer: "신한라이프", category: "savings", keywords: ["안심VIP", "VIP저축", "안심"] },
  { id: "kp-093", productName: "신한모으고키우는변액연금보험(무배당)", insurer: "신한라이프", category: "annuity", keywords: ["모으고키우는", "변액연금"] },
  { id: "kp-094", productName: "신한모으고키우는변액적립보험v2.0(무배당)", insurer: "신한라이프", category: "savings", keywords: ["모으고키우는", "변액적립"] },

  // === Third-party ===
  { id: "kp-100", productName: "한화생명 간편가입 시그니처 암보험 3.0(무배당)", insurer: "한화생명", category: "cancer", keywords: ["한화생명", "시그니처", "암보험", "간편가입"] },

  // === Policy add-ons / Riders ===
  { id: "kp-110", productName: "무배당 新연금전환특약", insurer: "신한라이프", category: "annuity", keywords: ["新연금", "연금전환"] },
  { id: "kp-111", productName: "무배당 연금전환특약", insurer: "신한라이프", category: "annuity", keywords: ["연금전환"] },
  { id: "kp-112", productName: "보험수익자신탁변경특약", insurer: "신한라이프", category: "other", keywords: ["수익자신탁", "신탁변경"] },
  { id: "kp-113", productName: "사망보험금 유동화 특약", insurer: "신한라이프", category: "other", keywords: ["사망보험금", "유동화"] },
  { id: "kp-114", productName: "위험변경정산액분할납입특약", insurer: "신한라이프", category: "other", keywords: ["위험변경", "정산액", "분할납입"] },
  { id: "kp-115", productName: "제휴서비스 대체할인특약", insurer: "신한라이프", category: "other", keywords: ["제휴서비스", "대체할인"] },

  // === DB/DC/IRP products ===
  { id: "kp-120", productName: "DB자산관리", insurer: "신한라이프", category: "savings", keywords: ["DB자산", "자산관리"] },
  { id: "kp-121", productName: "DC자산관리", insurer: "신한라이프", category: "savings", keywords: ["DC자산", "자산관리"] },
  { id: "kp-122", productName: "IRP자산관리", insurer: "신한라이프", category: "savings", keywords: ["IRP", "자산관리"] },
];

/**
 * Match OCR-extracted text against known policies.
 * Returns matched policies sorted by match strength (number of keyword hits).
 */
export function matchPolicies(ocrText: string): KnownPolicy[] {
  const normalizedText = ocrText
    .replace(/\s+/g, "")
    .toLowerCase();

  const scored = knownPolicies
    .map((policy) => {
      const hits = policy.keywords.filter((kw) =>
        normalizedText.includes(kw.replace(/\s+/g, "").toLowerCase())
      );
      return { policy, score: hits.length };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map(({ policy }) => policy);
}

/**
 * Check if OCR text matches any known policy.
 * Also tries partial product name matching.
 */
export function hasMatchingPolicy(ocrText: string): boolean {
  const normalizedText = ocrText.replace(/\s+/g, "").toLowerCase();

  // Check keyword matches
  const keywordMatch = knownPolicies.some((policy) =>
    policy.keywords.some((kw) =>
      normalizedText.includes(kw.replace(/\s+/g, "").toLowerCase())
    )
  );

  if (keywordMatch) return true;

  // Check product name partial match
  return knownPolicies.some((policy) => {
    const normalizedName = policy.productName.replace(/\s+/g, "").toLowerCase();
    // Match if at least 4+ consecutive characters match
    for (let i = 0; i <= normalizedName.length - 4; i++) {
      const chunk = normalizedName.slice(i, i + 4);
      if (normalizedText.includes(chunk)) return true;
    }
    return false;
  });
}
