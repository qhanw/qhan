"use client";
import clsx from "clsx";
import { useWindowScroll } from "react-use";

export default function ScrollTop() {
  const { y } = useWindowScroll();
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <span
      onClick={toTop}
      className={clsx(
        `fixed z-40 right-8 bottom-8 rounded-full w-10 h-10 bg-slate-50 flex items-center justify-center text-slate-400 transition ease-in-out 
         hover:bg-slate-100 hover:text-slate-500
         dark:bg-slate-700 dark:hover:bg-slate-600`,
        { "opacity-80 cursor-pointer": y > 300, "opacity-0": y < 300 },
      )}
    >
      <i className="i-heroicons:arrow-small-up" />
    </span>
  );
}
