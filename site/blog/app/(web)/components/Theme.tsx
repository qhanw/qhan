"use client";
import { useTheme } from "next-themes";

export default function Theme() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <a
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-slate-800 dark:text-white cursor-pointer"
    >
      <i className={isDark ? "i-ri:sun-fill" : "i-ri:moon-fill"} />
    </a>
  );
}
