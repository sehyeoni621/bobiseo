"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/components/ui/Toast";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      toast.warning("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    if (username === "bobi123" && password === "1234") {
      setIsLoading(true);
      setTimeout(() => {
        login({
          id: "user-001",
          phone: "01012345678",
          name: "김보비",
          isPremium: false,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem("bobiseo_logged_in", "true");
        toast.success("김보비님, 환영합니다!");
        router.push("/home");
      }, 600);
    } else {
      toast.error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      login({
        id: "user-001",
        phone: "01012345678",
        name: provider === "kakao" ? "카카오 사용자" : "네이버 사용자",
        isPremium: false,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("bobiseo_logged_in", "true");
      router.push("/home");
    }, 800);
  };

  return (
    <MobileFrame>
      <div
        className="flex flex-col min-h-screen min-h-[100dvh] px-6 py-10 animate-fade-in"
        style={{ background: "var(--bg-primary)" }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mt-12 mb-10">
          <div
            className="w-18 h-18 rounded-[20px] flex items-center justify-center mb-5"
            style={{ background: "var(--accent-blue)", width: 72, height: 72 }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1
            className="text-[28px] font-extrabold tracking-[-0.03em] mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            보비서
          </h1>
          <p className="text-[15px]" style={{ color: "var(--text-muted)" }}>
            AI 보험금 청구 도우미
          </p>
        </div>

        {/* Form */}
        <div className="space-y-3 mb-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디"
            className="w-full px-5 py-3.5 rounded-[14px] text-[15px] outline-none toss-input"
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full px-5 py-3.5 rounded-[14px] text-[15px] outline-none toss-input"
            autoComplete="current-password"
            onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
          />
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-7">
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span className="text-[13px] font-medium" style={{ color: "var(--text-disabled)" }}>또는</span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* Social */}
        <div className="space-y-3">
          <button
            onClick={() => handleSocialLogin("kakao")}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 min-h-[52px] rounded-[16px] bg-[#FEE500] text-[#191919] font-bold text-[15px] active:scale-[0.97] active:opacity-90 transition-all disabled:opacity-40"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#191919">
              <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.04 5.907l-1.02 3.72c-.037.135.095.25.218.19l4.326-2.48c.8.12 1.618.183 2.436.183 5.523 0 10-3.477 10-7.52S17.523 3 12 3z" />
            </svg>
            카카오로 시작하기
          </button>

          <button
            onClick={() => handleSocialLogin("naver")}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 min-h-[52px] rounded-[16px] bg-[#03C75A] text-white font-bold text-[15px] active:scale-[0.97] active:opacity-90 transition-all disabled:opacity-40"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M16.273 12.845L7.376 3H3v18h4.727V11.155L16.624 21H21V3h-4.727z" />
            </svg>
            네이버로 시작하기
          </button>
        </div>

        {/* Demo hint */}
        <div className="mt-auto pt-8">
          <div className="rounded-[14px] p-4 text-center" style={{ background: "var(--bg-secondary)" }}>
            <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
              체험 계정: bobi123 / 1234
            </p>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
