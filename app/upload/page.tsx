"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import CameraCapture from "@/components/upload/CameraCapture";
import { useToast } from "@/components/ui/Toast";
import { performOcr, extractPolicyInfo } from "@/lib/ocr";
import { hasMatchingPolicy, matchPolicies, knownPolicies } from "@/data/known-policies";
import { usePolicyStore } from "@/store/usePolicyStore";
import { useScanStore } from "@/store/useScanStore";

// Demo file detection keywords
const DEMO_KEYWORDS = ["세부진료", "진료비확인", "김보비", "medical_receipt", "medical-receipt"];

type UploadMethod = "camera" | "file" | "mydata";

export default function UploadPage() {
  const router = useRouter();
  const toast = useToast();
  const loadMockData = usePolicyStore((s) => s.loadMockData);
  const loadScanMockData = useScanStore((s) => s.loadMockData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");

  const [selectedMethod, setSelectedMethod] = useState<UploadMethod | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [capturedImage, setCapturedImage] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const processImage = async (imageSource: Blob | File) => {
    setIsProcessing(true);
    setOcrProgress(0);

    try {
      toast.info("OCR 분석을 시작합니다...");

      const ocrResult = await performOcr(imageSource, (progress) => {
        setOcrProgress(progress);
      });

      if (!ocrResult.text || ocrResult.text.trim().length < 10) {
        toast.warning("텍스트를 인식하지 못했습니다. 더 선명한 이미지로 다시 시도해주세요.");
        setIsProcessing(false);
        return;
      }

      const hasMatch = hasMatchingPolicy(ocrResult.text);
      const matches = matchPolicies(ocrResult.text);

      if (!hasMatch) {
        toast.error("준비되지 않은 약관입니다. 현재 신한라이프, 한화생명 약관만 지원됩니다.");
        setIsProcessing(false);
        return;
      }

      const info = extractPolicyInfo(ocrResult.text);

      toast.success(
        matches.length > 0
          ? `"${matches[0].productName}" 약관이 매칭되었습니다!`
          : "약관 분석이 완료되었습니다."
      );

      if (typeof window !== "undefined") {
        sessionStorage.setItem("ocr_result", JSON.stringify({
          ocrText: ocrResult.text,
          confidence: ocrResult.confidence,
          matchedPolicies: matches.slice(0, 3),
          extractedInfo: info,
        }));
      }

      loadMockData();
      setTimeout(() => router.push("/ocr-result"), 500);
    } catch (error) {
      console.error("OCR failed:", error);
      toast.error("OCR 분석에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCameraCapture = (blob: Blob) => {
    setShowCamera(false);
    setCapturedImage(blob);
    setPreviewUrl(URL.createObjectURL(blob));
    setSelectedMethod("camera");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.warning("파일 크기가 10MB를 초과합니다.");
      return;
    }

    setCapturedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadedFileName(file.name);
    setSelectedMethod("file");
  };

  const isDemoFile = (fileName: string): boolean => {
    const normalized = decodeURIComponent(fileName).toLowerCase();
    return DEMO_KEYWORDS.some((kw) => normalized.includes(kw));
  };

  const processDemoFile = () => {
    setIsProcessing(true);
    setOcrProgress(0);
    toast.info("AI 서류 분석을 시작합니다...");

    // Simulate OCR progress animation
    const steps = [15, 35, 55, 75, 90, 100];
    steps.forEach((val, i) => {
      setTimeout(() => setOcrProgress(val), (i + 1) * 400);
    });

    setTimeout(() => {
      const matchedPolicy = knownPolicies.find((p) => p.id === "kp-044");

      toast.success(
        matchedPolicy
          ? `"${matchedPolicy.productName}" 약관이 매칭되었습니다!`
          : "세부진료비 분석이 완료되었습니다."
      );

      if (typeof window !== "undefined") {
        sessionStorage.setItem("ocr_result", JSON.stringify({
          ocrText: "세부진료비확인서 제주대학교병원 신한라이프 통합건강보험 원(ONE)(무배당) 실손의료비 질병입원일당 질병수술비 M51.1 요추간판장애 경막외신경차단술",
          confidence: 96.5,
          matchedPolicies: matchedPolicy ? [matchedPolicy] : [],
          extractedInfo: {
            insurer: "신한라이프",
            productName: "신한통합건강보험 원(ONE)(무배당)",
            contractDate: "2023-06-15",
            coverageItems: ["실손의료비", "입원일당", "수술비", "진단비", "통원치료비"],
          },
        }));
      }

      loadMockData();
      loadScanMockData();
      setIsProcessing(false);
      setTimeout(() => router.push("/ocr-result"), 300);
    }, 2800);
  };

  const handleUpload = () => {
    if (selectedMethod === "mydata") {
      setIsProcessing(true);
      toast.info("마이데이터 연동 중...");
      loadMockData();
      setTimeout(() => {
        toast.success("마이데이터 연동 완료!");
        router.push("/ocr-result");
      }, 1500);
      return;
    }

    // Demo file detection: PDF or image with demo keywords in filename
    if (uploadedFileName && isDemoFile(uploadedFileName)) {
      processDemoFile();
      return;
    }

    if (capturedImage) {
      processImage(capturedImage);
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

  const methods = [
    {
      key: "camera" as UploadMethod,
      label: "카메라 촬영",
      desc: "증권 전체가 보이도록 촬영해주세요",
      color: "var(--accent-blue)",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
      onClick: () => setShowCamera(true),
    },
    {
      key: "file" as UploadMethod,
      label: "파일 업로드",
      desc: "PDF, JPG, PNG / 최대 10MB",
      color: "var(--accent-purple)",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
      onClick: () => fileInputRef.current?.click(),
    },
    {
      key: "mydata" as UploadMethod,
      label: "마이데이터 연동",
      desc: "보험사 자동 불러오기",
      color: "var(--accent-green)",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </svg>
      ),
      onClick: () => { setSelectedMethod("mydata"); setCapturedImage(null); setPreviewUrl(null); },
    },
  ];

  return (
    <MobileFrame showNav>
      <Header title="증권 업로드" />

      <div className="animate-slide-in">
        {/* Method cards */}
        <div className="px-5 pt-5 pb-5" style={{ background: "var(--bg-primary)" }}>
          <p className="text-[15px] mb-5" style={{ color: "var(--text-secondary)" }}>
            보험증권을 업로드하면 AI가 자동으로 분석합니다
          </p>

          <div className="space-y-4">
            {methods.map((m) => (
              <button
                key={m.key}
                onClick={m.onClick}
                className="w-full flex items-center gap-4 p-5 rounded-[16px] transition-all duration-150 active:scale-[0.98] active:opacity-90 text-left"
                style={{
                  background: selectedMethod === m.key
                    ? `color-mix(in srgb, ${m.color} 8%, var(--bg-secondary))`
                    : "var(--bg-secondary)",
                  outline: selectedMethod === m.key ? `2px solid ${m.color}` : "none",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `color-mix(in srgb, ${m.color} 10%, transparent)` }}
                >
                  {m.icon}
                </div>
                <div className="flex-1">
                  <p className="text-[16px] font-semibold" style={{ color: "var(--text-primary)" }}>{m.label}</p>
                  <p className="text-[13px] mt-1.5" style={{ color: "var(--text-muted)" }}>{m.desc}</p>
                </div>
                {selectedMethod === m.key && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: m.color }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Spacer */}
        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* Simulation banner */}
        <div className="px-5 py-5" style={{ background: "var(--bg-primary)" }}>
          <button
            onClick={() => router.push("/simulation")}
            className="w-full rounded-[16px] p-5 flex items-center gap-4 transition-all duration-150 active:scale-[0.98] active:opacity-90"
            style={{ background: "var(--bg-secondary)" }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "color-mix(in srgb, var(--accent-purple) 10%, transparent)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M7 10l3 3 4-5 3 2" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>예시 서류로 시뮬레이션 체험</p>
              <p className="text-[13px] mt-1" style={{ color: "var(--text-muted)" }}>진료비 예시로 청구 금액 확인</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-disabled)" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className="px-5 pb-4" style={{ background: "var(--bg-primary)" }}>
            <div className="rounded-[14px] overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Preview" className="w-full max-h-48 object-contain" />
            </div>
          </div>
        )}

        {/* OCR Progress */}
        {isProcessing && (
          <div className="px-5 pb-5 animate-slide-up" style={{ background: "var(--bg-primary)" }}>
            <ProgressBar value={ocrProgress} color="blue" height="md" showLabel />
            <p className="text-[13px] mt-3 text-center" style={{ color: "var(--text-muted)" }}>
              텍스트 인식 중...
            </p>
          </div>
        )}

        {/* Upload button */}
        <div className="px-5 pt-5 pb-10" style={{ background: "var(--bg-primary)" }}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleUpload}
            disabled={!selectedMethod || isProcessing}
          >
            {isProcessing ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                분석 중...
              </span>
            ) : (
              "업로드 & 분석 시작"
            )}
          </Button>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}
