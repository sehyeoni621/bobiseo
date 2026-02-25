"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { mockNotifications, AppNotification } from "@/data/mock-notifications";

const typeConfig: Record<AppNotification["type"], { color: string; icon: React.ReactNode }> = {
  payment: {
    color: "var(--accent-green)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  claim_update: {
    color: "var(--accent-blue)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  coverage_found: {
    color: "var(--accent-purple)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  document_needed: {
    color: "var(--accent-yellow)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  system: {
    color: "var(--text-muted)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
};

function formatTimeAgo(timestamp: string): string {
  const now = new Date("2026-02-25T12:00:00Z");
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 7) return `${diffDay}일 전`;
  return date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
}

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleClick = (noti: AppNotification) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === noti.id ? { ...n, read: true } : n)),
    );
    if (noti.actionUrl) {
      router.push(noti.actionUrl);
    }
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <MobileFrame showNav>
      <Header
        title="알림"
        rightAction={
          unreadCount > 0 ? (
            <button
              onClick={markAllRead}
              className="text-[13px] font-semibold px-3 py-1.5 rounded-full active:scale-95 transition-all"
              style={{ color: "var(--accent-blue)" }}
            >
              모두 읽음
            </button>
          ) : undefined
        }
      />

      <div className="animate-slide-in" style={{ background: "var(--bg-secondary)" }}>
        {/* Unread count */}
        {unreadCount > 0 && (
          <div className="px-5 py-4" style={{ background: "var(--bg-primary)" }}>
            <p className="text-[14px]" style={{ color: "var(--text-secondary)" }}>
              읽지 않은 알림 <span className="font-bold" style={{ color: "var(--accent-blue)" }}>{unreadCount}건</span>
            </p>
          </div>
        )}

        <div className="h-1" style={{ background: "var(--bg-secondary)" }} />

        {/* Notification list */}
        <div style={{ background: "var(--bg-primary)" }}>
          {notifications.map((noti, i) => {
            const config = typeConfig[noti.type];
            return (
              <div key={noti.id}>
                <button
                  onClick={() => handleClick(noti)}
                  className="w-full px-5 py-5 flex items-start gap-4 text-left active:opacity-80 transition-all"
                  style={{
                    background: noti.read
                      ? "var(--bg-primary)"
                      : "color-mix(in srgb, var(--accent-blue) 4%, var(--bg-primary))",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `color-mix(in srgb, ${config.color} 12%, transparent)` }}
                  >
                    {config.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!noti.read && (
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--accent-blue)" }} />
                      )}
                      <p
                        className="text-[14px] truncate"
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: noti.read ? 500 : 700,
                        }}
                      >
                        {noti.title}
                      </p>
                    </div>
                    <p
                      className="text-[13px] leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {noti.body}
                    </p>
                    <p className="text-[11px] mt-1.5" style={{ color: "var(--text-muted)" }}>
                      {formatTimeAgo(noti.timestamp)}
                    </p>
                  </div>

                  {/* Arrow */}
                  {noti.actionUrl && (
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="var(--text-disabled)" strokeWidth="2"
                      className="flex-shrink-0 mt-2"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                </button>
                {i < notifications.length - 1 && (
                  <div className="mx-7 h-px" style={{ background: "var(--border)" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
}
