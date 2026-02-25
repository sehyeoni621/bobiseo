"use client";

import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Badge from "@/components/ui/Badge";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  description?: string;
  path?: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
    label: "보험증권 관리",
    description: "등록된 증권 목록 및 관리",
    path: "/my-policies",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-yellow)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>,
    label: "알림",
    description: "청구 현황, 알림 확인",
    path: "/notifications",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
    label: "청구 이력",
    description: "과거 청구 현황 및 입금 내역",
    path: "/claim-history",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M7 10l3 3 4-5 3 2" /></svg>,
    label: "프리미엄 리포트",
    description: "보장 분석, 부족 보장 경고",
    path: "/premium-report",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
    label: "보안 설정",
    description: "비밀번호, 생체인증 관리",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>,
    label: "고객센터",
  },
];

export default function SettingsPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const theme = useThemeStore((s) => s.theme);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("bobiseo_logged_in");
    router.push("/");
  };

  return (
    <MobileFrame showNav>
      <Header title="설정" showBack={false} />

      <div style={{ background: "var(--bg-secondary)" }}>
        {/* Profile section */}
        <div className="px-8 py-9 animate-fade-in" style={{ background: "var(--bg-primary)" }}>
          <div className="flex items-center gap-6">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: "color-mix(in srgb, var(--accent-blue) 12%, transparent)" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[22px] font-bold" style={{ color: "var(--text-primary)" }}>{user?.name || "김보비"}</p>
              <p className="text-[16px] mt-1" style={{ color: "var(--text-muted)" }}>{user?.phone || "010-1234-5678"}</p>
            </div>
            <Badge variant={user?.isPremium ? "yellow" : "gray"}>
              {user?.isPremium ? "PRO" : "무료"}
            </Badge>
          </div>
        </div>

        {/* Section separator */}
        <div className="h-5" style={{ background: "var(--bg-secondary)" }} />

        {/* Theme toggle */}
        <div className="px-8 animate-slide-up" style={{ background: "var(--bg-primary)" }}>
          <div className="flex items-center justify-between py-7">
            <div className="flex items-center gap-5">
              <div
                className="w-14 h-14 rounded-[18px] flex items-center justify-center"
                style={{ background: "var(--bg-secondary)" }}
              >
                {theme === "dark" ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-yellow)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-yellow)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                )}
              </div>
              <div>
                <p className="text-[19px] font-bold" style={{ color: "var(--text-primary)" }}>화면 테마</p>
                <p className="text-[15px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {theme === "dark" ? "다크 모드" : "라이트 모드"}
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Section separator */}
        <div className="h-5" style={{ background: "var(--bg-secondary)" }} />

        {/* Menu items as clean list */}
        <div className="px-8 animate-slide-up" style={{ background: "var(--bg-primary)" }}>
          {menuItems.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => item.path && router.push(item.path)}
                className="w-full flex items-center gap-6 py-7 text-left active:scale-[0.97] active:opacity-90 transition-all"
              >
                <div
                  className="w-14 h-14 rounded-[18px] flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[19px] font-bold" style={{ color: "var(--text-primary)" }}>{item.label}</p>
                  {item.description && (
                    <p className="text-[15px] mt-0.5" style={{ color: "var(--text-muted)" }}>{item.description}</p>
                  )}
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              {i < menuItems.length - 1 && (
                <div className="h-px" style={{ background: "var(--border)" }} />
              )}
            </div>
          ))}
        </div>

        {/* Section separator */}
        <div className="h-5" style={{ background: "var(--bg-secondary)" }} />

        {/* Logout & version */}
        <div className="px-8 py-9" style={{ background: "var(--bg-primary)" }}>
          <button
            onClick={handleLogout}
            className="w-full text-center text-[19px] font-medium py-6 rounded-[20px] active:scale-[0.97] active:opacity-90 transition-all"
            style={{ color: "var(--accent-red)", background: "color-mix(in srgb, var(--accent-red) 8%, transparent)" }}
          >
            로그아웃
          </button>
          <p className="text-center text-[15px] mt-6" style={{ color: "var(--text-muted)" }}>
            bobiseo v1.0.0 (MVP)
          </p>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}
