import Tesseract from "tesseract.js";

export interface OcrResult {
  text: string;
  confidence: number;
  lines: Array<{
    text: string;
    confidence: number;
    bbox: { x0: number; y0: number; x1: number; y1: number };
  }>;
}

/**
 * Perform OCR on an image file or blob using Tesseract.js.
 * Supports Korean + English text extraction.
 */
export async function performOcr(
  image: File | Blob | string,
  onProgress?: (progress: number) => void
): Promise<OcrResult> {
  const result = await Tesseract.recognize(image, "kor+eng", {
    logger: (m) => {
      if (m.status === "recognizing text" && onProgress) {
        onProgress(Math.round(m.progress * 100));
      }
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lines = (result.data as any).lines.map((line: any) => ({
    text: line.text.trim(),
    confidence: line.confidence,
    bbox: line.bbox,
  }));

  return {
    text: result.data.text,
    confidence: result.data.confidence,
    lines,
  };
}

/**
 * Extract structured policy info from OCR text.
 */
export function extractPolicyInfo(ocrText: string): {
  insurer: string | null;
  productName: string | null;
  contractDate: string | null;
  coverageItems: string[];
} {
  const insurerPatterns = [
    { regex: /신한라이프|신한생명|SHINHAN/gi, name: "신한라이프" },
    { regex: /현대해상|HYUNDAI/gi, name: "현대해상" },
    { regex: /한화생명|HANWHA/gi, name: "한화생명" },
    { regex: /삼성생명|SAMSUNG/gi, name: "삼성생명" },
    { regex: /교보생명|KYOBO/gi, name: "교보생명" },
    { regex: /동부화재|DB손해/gi, name: "DB손해보험" },
    { regex: /KB손해보험|KB손보/gi, name: "KB손해보험" },
    { regex: /메리츠화재|메리츠/gi, name: "메리츠화재" },
  ];

  let insurer: string | null = null;
  for (const p of insurerPatterns) {
    if (p.regex.test(ocrText)) {
      insurer = p.name;
      break;
    }
  }

  // Extract dates (YYYY-MM-DD or YYYY.MM.DD or YYYY년 MM월 DD일)
  const dateRegex = /(\d{4})[.\-/년]\s*(\d{1,2})[.\-/월]\s*(\d{1,2})[일]?/g;
  const dates = [...ocrText.matchAll(dateRegex)];
  const contractDate = dates.length > 0
    ? `${dates[0][1]}-${dates[0][2].padStart(2, "0")}-${dates[0][3].padStart(2, "0")}`
    : null;

  // Extract product name keywords
  const productPatterns = [
    /(?:보험|특약)\s*(?:명|상품명)[:\s]*(.+?)(?:\n|$)/gi,
    /상품명[:\s]*(.+?)(?:\n|$)/gi,
  ];
  let productName: string | null = null;
  for (const regex of productPatterns) {
    const match = regex.exec(ocrText);
    if (match) {
      productName = match[1].trim();
      break;
    }
  }

  // Extract coverage items
  const coverageKeywords = [
    "입원일당", "수술비", "진단비", "실손의료비", "통원치료비",
    "암진단비", "뇌혈관", "심장질환", "골절진단", "상해입원",
    "질병입원", "사망보험금", "후유장해", "치아치료",
  ];
  const coverageItems = coverageKeywords.filter((kw) =>
    ocrText.includes(kw)
  );

  return { insurer, productName, contractDate, coverageItems };
}
