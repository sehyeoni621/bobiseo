import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import ToastContainer from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "보비서 (Bo-Biseo) | AI 보험금 청구 도우미",
  description: "AI 기반 약관 정밀 분석 및 자동 보험금 청구 솔루션",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="dark">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <ToastContainer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
