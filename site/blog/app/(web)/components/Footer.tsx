import Link from "next/link";

import clsx from "clsx";

import Copyright from "./Copyright";

type FooterProps = { className?: string };

export default ({ className }: FooterProps) => (
  <footer
    className={clsx(
      "flex items-center pt-12 pb-12 mt-24 border-t-2 border-slate-100 dark:border-slate-700",
      className
    )}
  >
    <Link className="text-brand" href="/" aria-label="Qhan W">
      <span className="i-logos-sakura w-4 h-4 logo-rotate" />
    </Link>
    <Copyright />
  </footer>
);
