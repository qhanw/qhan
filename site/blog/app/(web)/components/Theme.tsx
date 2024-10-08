"use client";
import clsx from "clsx";
import { useTheme } from "next-themes";

export default function Theme() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <a
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-slate-800 dark:text-white cursor-pointer"
    >
      <i
        className={clsx({ "i-ri:sun-fill": !isDark, "i-ri:moon-fill": isDark })}
      />
    </a>
  );
}
