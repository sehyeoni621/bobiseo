"use client";

import { useEffect, useState, useCallback } from "react";
import { create } from "zustand";
import { useThemeStore } from "@/store/useThemeStore";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastStore {
  toasts: ToastMessage[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (type, message, duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    set((state) => ({
      toasts: [...state.toasts, { id, type, message, duration }],
    }));
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

// Convenience hook
export function useToast() {
  const addToast = useToastStore((s) => s.addToast);
  return {
    success: (msg: string) => addToast("success", msg),
    error: (msg: string) => addToast("error", msg),
    warning: (msg: string) => addToast("warning", msg),
    info: (msg: string) => addToast("info", msg),
  };
}

const lightBgMap: Record<ToastType, string> = {
  success: "#E8F7EF",
  error: "#FEECEE",
  warning: "#FFF4E5",
  info: "#E8F1FD",
};

const darkBgMap: Record<ToastType, string> = {
  success: "color-mix(in srgb, #10B981 10%, transparent)",
  error: "color-mix(in srgb, #EF4444 10%, transparent)",
  warning: "color-mix(in srgb, #F59E0B 10%, transparent)",
  info: "color-mix(in srgb, #3B82F6 10%, transparent)",
};

const iconColorMap: Record<ToastType, string> = {
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
};

const icons: Record<ToastType, React.ReactNode> = {
  success: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const theme = useThemeStore((s) => s.theme);

  const handleRemove = useCallback(() => {
    setIsExiting(true);
    setTimeout(onRemove, 300);
  }, [onRemove]);

  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(handleRemove, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, handleRemove]);

  const bg = theme === "dark" ? darkBgMap[toast.type] : lightBgMap[toast.type];

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3
        rounded-xl shadow-lg
        transition-all duration-300
        ${isExiting ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
      `}
      style={{ background: bg }}
    >
      <span className="flex-shrink-0" style={{ color: iconColorMap[toast.type] }}>
        {icons[toast.type]}
      </span>
      <p className="text-sm font-medium text-[var(--text-primary)] flex-1">{toast.message}</p>
      <button
        onClick={handleRemove}
        className="flex-shrink-0 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-[400px] px-4 space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onRemove={() => removeToast(toast.id)} />
        </div>
      ))}
    </div>
  );
}
