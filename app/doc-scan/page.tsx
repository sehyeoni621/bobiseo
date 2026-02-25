"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import CameraCapture from "@/components/upload/CameraCapture";
import { useToast } from "@/components/ui/Toast";
import { performOcr } from "@/lib/ocr";
import { hasMatchingPolicy, matchPolicies } from "@/data/known-policies";
import { useScanStore } from "@/store/useScanStore";
import { DocType } from "@/types/kcd";

const DEMO_KEYWORDS = ["세부진료", "진료비확인", "김보비", "medical_receipt", "medical-receipt"];

interface DocOption {
  type: DocType;
  abbr: string;
  label: string;
  description: string;
  color: string;
}

const docOptions: DocOption[] = [
  { type: "prescription", abbr: "처방", label: "처방전", description: "약 처방 내역 및 질병코드 추출", color: "var(--accent-red)" },
  { type: "surgery", abbr: "수술", label: "수술확인서", description: "수술명 · 수술코드 자동 인식", color: "var(--accent-blue)" },
  { type: "opinion", abbr: "소견", label: "의사소견서", description: "진단명 · KCD 코드 매칭", color: "var(--accent-purple)" },
  { type: "treatment", abbr: "진료", label: "진료확인서", description: "입 · 통원 내역 및 진료 데이터", color: "var(--accent-green)" },
];

export default function DocScanPage() {
  const router = useRouter();
  const toast = useToast();
  const setDocType = useScanStore((s) => s.setDocType);
  const loadMockData = useScanStore((s) => s.loadMockData);

  const [selected, setSelected] = useState<DocType | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [capturedImage, setCapturedImage] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = async (imageSource: Blob | File) => {
    if (!selected) return;
    setIsProcessing(true);
    setOcrProgress(0);

    try {
      toast.info("서류 스캔 분석을 시작합니다...");

      const ocrResult = await performOcr(imageSource, (progress) => {
        setOcrProgress(progress);
      });

      if (!ocrResult.text || ocrResult.text.trim().length < 5) {
        toast.warning("텍스트를 인식하지 못했습니다. 더 선명한 이미지로 다시 시도해주세요.");
        setIsProcessing(false);
        return;
      }

      // Check against known policies
      const hasMatch = hasMatchingPolicy(ocrResult.text);
      const matches = matchPolicies(ocrResult.text);

      if (!hasMatch) {
        toast.error("준비되지 않은 약관입니다. 현재 등록된 보험사의 약관만 분석 가능합니다.");
        setIsProcessing(false);
        return;
      }

      if (matches.length > 0) {
        toast.success(`"${matches[0].productName}" 관련 서류가 확인되었습니다!`);
      } else {
        toast.success("서류 분석이 완료되었습니다.");
      }

      setDocType(selected);
      loadMockData();

      if (typeof window !== "undefined") {
        sessionStorage.setItem("scan_result", JSON.stringify({
          ocrText: ocrResult.text,
          confidence: ocrResult.confidence,
          docType: selected,
          matchedPolicies: matches.slice(0, 3),
        }));
      }

      setTimeout(() => router.push("/doc-scan-result"), 500);
    } catch (error) {
      console.error("OCR failed:", error);
      toast.error("스캔 분석에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCameraCapture = (blob: Blob) => {
    setShowCamera(false);
    setCapturedImage(blob);
    setPreviewUrl(URL.createObjectURL(blob));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCapturedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadedFileName(file.name);
  };

  const isDemoFile = (fileName: string): boolean => {
    const normalized = decodeURIComponent(fileName).toLowerCase();
    return DEMO_KEYWORDS.some((kw) => normalized.includes(kw));
  };

  const processDemoFile = () => {
    if (!selected) return;
    setIsProcessing(true);
    setOcrProgress(0);
    toast.info("서류 스캔 분석을 시작합니다...");

    const steps = [15, 35, 55, 75, 90, 100];
    steps.forEach((val, i) => {
      setTimeout(() => setOcrProgress(val), (i + 1) * 400);
    });

    setTimeout(() => {
      toast.success("세부진료비확인서 분석이 완료되었습니다!");

      setDocType(selected);
      loadMockData();

      if (typeof window !== "undefined") {
        sessionStorage.setItem("scan_result", JSON.stringify({
          ocrText: "세부진료비확인서 제주대학교병원 M51.1 요추간판장애 신경근병증 경막외신경차단술 신한라이프 통합건강보험",
          confidence: 96.5,
          docType: selected,
          matchedPolicies: [],
        }));
      }

      setIsProcessing(false);
      setTimeout(() => router.push("/doc-scan-result"), 300);
    }, 2800);
  };

  const handleScan = () => {
    if (!selected) return;

    // Demo file detection
    if (uploadedFileName && isDemoFile(uploadedFileName)) {
      processDemoFile();
      return;
    }

    if (capturedImage) {
      processImage(capturedImage);
    } else {
      setShowCamera(true);
    }
  };

  if (showCamera) {
    return (
      <CameraCapture
        onCapture={handleCameraCapture}
        onClose={() => setShowCamera(false)}
      />
    );
  }

  return (
    <MobileFrame showNav>
      <Header title="서류 스캔" />

      <div className="animate-slide-in">
        {/* Info badge section */}
        <div className="px-5 pt-6 pb-6" style={{ background: "var(--bg-primary)" }}>
          <div className="mb-3">
            <Badge variant="blue" icon={
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            }>
              처방전 · 수술확인서를 스캔하면 KCD 질병코드를 자동 추출합니다
            </Badge>
          </div>
        </div>

        {/* Section separator */}
        <div className="h-2" style={{ background: "var(--bg-secondary)" }} />

        {/* Document type selection */}
        <div className="px-5 pt-6 pb-6" style={{ background: "var(--bg-primary)" }}>
          <h3 className="text-[14px] font-bold mb-6" style={{ color: "var(--text-primary)" }}>서류 종류 선택</h3>
          <div className="space-y-5 mb-5">
            {docOptions.map((option) => {
              const isSelected = selected === option.type;
              return (
                <button
                  key={option.type}
                  onClick={() => setSelected(option.type)}
                  className="w-full flex items-center gap-3 p-6 rounded-[18px] transition-all duration-200 text-left active:scale-[0.98]"
                  style={{
                    background: isSelected
                      ? `color-mix(in srgb, ${option.color} 8%, var(--bg-secondary))`
                      : "var(--bg-secondary)",
                  }}
                >
                  <div
                    className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isSelected
                        ? `color-mix(in srgb, ${option.color} 15%, var(--bg-primary))`
                        : "var(--bg-primary)",
                    }}
                  >
                    <span
                      className="text-[13px] font-extrabold"
                      style={{ color: isSelected ? option.color : "var(--text-muted)" }}
                    >
                      {option.abbr}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[13px]" style={{ color: "var(--text-primary)" }}>{option.label}</p>
                    <p className="text-[13px] mt-0.5" style={{ color: "var(--text-secondary)" }}>{option.description}</p>
                  </div>
                  {isSelected && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: option.color }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Upload options (after type selection) */}
          {selected && !capturedImage && (
            <div className="flex gap-3 mb-6 animate-slide-up">
              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => setShowCamera(true)}
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="13" r="4" /></svg>}
              >
                카메라
              </Button>
              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => fileInputRef.current?.click()}
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" strokeLinejoin="round" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>}
              >
                파일
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}

          {/* Preview */}
          {previewUrl && (
            <div className="mb-5 rounded-[18px] overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="스캔 미리보기" className="w-full max-h-48 object-contain" style={{ background: "var(--bg-secondary)" }} />
            </div>
          )}

          {/* OCR Progress */}
          {isProcessing && (
            <div className="mb-5 animate-slide-up">
              <ProgressBar value={ocrProgress} color="red" height="md" showLabel />
              <p className="text-xs mt-2 text-center" style={{ color: "var(--text-secondary)" }}>
                서류 텍스트 인식 중...
              </p>
            </div>
          )}

          {/* Demo receipt banner */}
          <button
            onClick={() => router.push("/medical-receipt")}
            className="w-full rounded-[16px] p-5 flex items-center gap-4 mb-5 transition-all duration-150 active:scale-[0.98] active:opacity-90 text-left"
            style={{ background: "color-mix(in srgb, var(--accent-purple) 6%, var(--bg-secondary))" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "color-mix(in srgb, var(--accent-purple) 12%, transparent)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>데모: 세부진료확인서 보기</p>
              <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>진료코드(EDI) 포함 가상 서류 미리보기</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-disabled)" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>

          {/* Scan button */}
          <Button
            variant="danger"
            size="lg"
            fullWidth
            onClick={handleScan}
            disabled={!selected || isProcessing}
            icon={
              isProcessing ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              )
            }
          >
            {isProcessing
              ? "스캔 중..."
              : capturedImage
                ? "스캔 분석 시작"
                : "스캔 시작하기"}
          </Button>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
}
