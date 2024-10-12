"use client";
import { useTheme } from "next-themes";

export default function Theme() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <span
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 cursor-pointer"
    >
      <i className={isDark ? "i-ri:sun-fill" : "i-ri:moon-fill"} />
    </span>
  );
}
