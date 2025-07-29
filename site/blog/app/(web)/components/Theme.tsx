"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Theme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <i className="i-ri:palette-line" />;

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
