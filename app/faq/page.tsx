"use client";

import { useState, useMemo } from "react";
import MobileFrame from "@/components/layout/MobileFrame";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Badge from "@/components/ui/Badge";
import {
  mockFaqs,
  categoryLabels,
  categoryIcons,
  type FaqCategory,
  type FaqItem,
} from "@/data/mock-faqs";

const allCategories: (FaqCategory | "all" | "popular")[] = ["all", "popular", "claim", "coverage", "app", "terms", "etc"];

const tabLabels: Record<string, string> = {
  all: "전체",
  popular: "인기",
  ...categoryLabels,
};

function FaqAccordion({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  const catIcon = categoryIcons[item.category];

  return (
    <div
      className="rounded-[16px] overflow-hidden transition-all"
      style={{ background: "var(--bg-secondary)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-3 p-4 text-left active:opacity-80 transition-all"
      >
        {/* Q icon */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: `color-mix(in srgb, ${catIcon.color} 15%, transparent)` }}
        >
          <span className="text-[12px] font-extrabold" style={{ color: catIcon.color }}>Q</span>
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="text-[13px] font-bold leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {item.question}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: `color-mix(in srgb, ${catIcon.color} 10%, transparent)`,
                color: catIcon.color,
              }}
            >
              {categoryLabels[item.category]}
            </span>
            {item.popular && (
              <Badge variant="yellow">인기</Badge>
            )}
          </div>
        </div>

        {/* Chevron */}
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"
          className={`transition-transform duration-200 flex-shrink-0 mt-1 ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Answer */}
      {isOpen && (
        <div className="px-4 pb-4 animate-slide-up">
          <div className="h-px mb-3" style={{ background: "var(--border)" }} />
          <div className="flex gap-3">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "color-mix(in srgb, var(--accent-blue) 15%, transparent)" }}
            >
              <span className="text-[12px] font-extrabold" style={{ color: "var(--accent-blue)" }}>A</span>
            </div>
            <div className="flex-1">
              {item.answer.split("\n").map((line, i) => (
                <p
                  key={i}
                  className={`text-[13px] leading-relaxed ${line === "" ? "h-2" : ""}`}
                  style={{ color: "var(--text-secondary)" }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const filteredFaqs = useMemo(() => {
    let results: FaqItem[] = mockFaqs;

    // Category filter
    if (activeTab === "popular") {
      results = results.filter((f) => f.popular);
    } else if (activeTab !== "all") {
      results = results.filter((f) => f.category === activeTab);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (f) =>
          f.question.toLowerCase().includes(query) ||
          f.answer.toLowerCase().includes(query),
      );
    }

    return results;
  }, [activeTab, searchQuery]);

  return (
    <MobileFrame showNav>
      <Header title="자주 묻는 질문" />

      <div className="animate-slide-in" style={{ background: "var(--bg-secondary)" }}>
        {/* Search */}
        <div className="px-5 pt-5 pb-4" style={{ background: "var(--bg-primary)" }}>
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-[14px]"
            style={{ background: "var(--bg-secondary)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="궁금한 내용을 검색하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-[14px] bg-transparent outline-none"
              style={{ color: "var(--text-primary)" }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <div className="px-5 pb-4" style={{ background: "var(--bg-primary)" }}>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {allCategories.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveTab(cat);
                    setOpenFaqId(null);
                  }}
                  className="px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all"
                  style={{
                    background: isActive ? "var(--accent-blue)" : "var(--bg-secondary)",
                    color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                  }}
                >
                  {tabLabels[cat]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />

        {/* FAQ list */}
        <div className="px-5 py-5" style={{ background: "var(--bg-primary)" }}>
          {filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <FaqAccordion
                  key={faq.id}
                  item={faq}
                  isOpen={openFaqId === faq.id}
                  onToggle={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-disabled)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p className="text-[13px] font-bold" style={{ color: "var(--text-muted)" }}>
                검색 결과가 없습니다
              </p>
              <p className="text-[13px] mt-1" style={{ color: "var(--text-disabled)" }}>
                다른 키워드로 검색해보세요
              </p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="h-3" style={{ background: "var(--bg-secondary)" }} />
        <div className="px-5 py-5" style={{ background: "var(--bg-primary)" }}>
          <div
            className="rounded-[20px] p-5 text-center"
            style={{ background: "var(--bg-secondary)" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            <p className="text-[13px] font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              원하는 답변을 찾지 못하셨나요?
            </p>
            <p className="text-[13px] mb-4" style={{ color: "var(--text-muted)" }}>
              고객센터로 문의해주시면 빠르게 답변드립니다
            </p>
            <button
              className="px-5 py-2.5 rounded-full text-[14px] font-bold transition-all active:scale-95"
              style={{ background: "var(--accent-blue)", color: "#FFFFFF" }}
            >
              1:1 문의하기
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
}
