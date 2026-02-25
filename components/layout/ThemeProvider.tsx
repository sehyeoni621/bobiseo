"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/useThemeStore";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const setTheme = useThemeStore((s) => s.setTheme);

  useEffect(() => {
    const saved = localStorage.getItem("bobiseo_theme") as "dark" | "light" | null;
    const theme = saved || "dark";
    setTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [setTheme]);

  return <>{children}</>;
}
