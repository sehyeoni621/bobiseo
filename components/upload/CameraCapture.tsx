"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Button from "@/components/ui/Button";

interface CameraCaptureProps {
  onCapture: (imageBlob: Blob) => void;
  onClose: () => void;
}

/**
 * Check if getUserMedia is available (requires HTTPS or localhost).
 */
function isGetUserMediaSupported(): boolean {
  return !!(
    typeof navigator !== "undefined" &&
    navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === "function"
  );
}

export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nativeInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const [useNative, setUseNative] = useState(false);

  // Determine camera mode on mount
  useEffect(() => {
    if (!isGetUserMediaSupported()) {
      // HTTP or unsupported browser: use native <input capture>
      setUseNative(true);
    }
  }, []);

  // Auto-trigger native file input when in native mode
  useEffect(() => {
    if (useNative && nativeInputRef.current) {
      nativeInputRef.current.click();
    }
  }, [useNative]);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch {
      // getUserMedia failed — fall back to native input
      setUseNative(true);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  useEffect(() => {
    if (!useNative) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useNative]);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    setIsCaptured(true);
    stopCamera();
  };

  const handleRetake = () => {
    setIsCaptured(false);
    if (useNative) {
      nativeInputRef.current?.click();
    } else {
      startCamera();
    }
  };

  const handleConfirm = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(
      (blob) => {
        if (blob) {
          onCapture(blob);
        }
      },
      "image/jpeg",
      0.9
    );
  };

  // Handle native file input (camera capture via OS)
  const handleNativeCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      onClose();
      return;
    }

    // Draw the captured file to canvas for preview
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }
      }
      URL.revokeObjectURL(url);
      setIsCaptured(true);
    };
    img.src = url;
  };

  // Hidden native camera input (works over HTTP on mobile)
  const nativeInput = (
    <input
      ref={nativeInputRef}
      type="file"
      accept="image/*"
      capture="environment"
      onChange={handleNativeCapture}
      className="hidden"
    />
  );

  if (error) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6">
        {nativeInput}
        <div className="text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5" className="mx-auto mb-4">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="9" y1="13" x2="15" y2="13" strokeLinecap="round" />
          </svg>
          <p className="text-white text-sm mb-4">{error}</p>
          <Button variant="secondary" onClick={onClose}>닫기</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {nativeInput}

      {/* Camera view */}
      <div className="relative flex-1">
        {!useNative && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${isCaptured ? "hidden" : ""}`}
          />
        )}
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-contain ${isCaptured ? "" : "hidden"}`}
        />

        {/* Guide overlay (stream mode only) */}
        {!useNative && !isCaptured && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[85%] h-[60%] border-2 border-white/50 rounded-2xl relative">
              {/* Corner markers */}
              <div className="absolute -top-0.5 -left-0.5 w-6 h-6 border-t-3 border-l-3 border-[#3B82F6] rounded-tl-lg" />
              <div className="absolute -top-0.5 -right-0.5 w-6 h-6 border-t-3 border-r-3 border-[#3B82F6] rounded-tr-lg" />
              <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 border-b-3 border-l-3 border-[#3B82F6] rounded-bl-lg" />
              <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 border-b-3 border-r-3 border-[#3B82F6] rounded-br-lg" />
            </div>
          </div>
        )}

        {/* Waiting message (native mode, not yet captured) */}
        {useNative && !isCaptured && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="mb-4">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <p className="text-white/80 text-sm mb-6">카메라 앱에서 촬영해주세요</p>
            <Button variant="secondary" onClick={() => nativeInputRef.current?.click()}>
              카메라 다시 열기
            </Button>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={() => { stopCamera(); onClose(); }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
          aria-label="닫기"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {!useNative && !isCaptured && (
          <p className="absolute bottom-24 left-0 right-0 text-center text-white/80 text-sm">
            서류 전체가 보이도록 촬영해주세요
          </p>
        )}
      </div>

      {/* Bottom controls */}
      <div className="bg-black px-6 py-6 flex items-center justify-center gap-6">
        {isCaptured ? (
          <>
            <Button variant="secondary" size="lg" onClick={handleRetake}>
              다시 촬영
            </Button>
            <Button variant="primary" size="lg" onClick={handleConfirm}>
              사용하기
            </Button>
          </>
        ) : !useNative ? (
          <button
            onClick={handleCapture}
            className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 active:scale-90 transition-transform"
            aria-label="촬영"
          />
        ) : null}
      </div>
    </div>
  );
}
