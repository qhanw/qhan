import Link from "next/link";

import clsx from "clsx";

type FooterProps = {
  className?: string;
};

export default ({ className }: FooterProps) => (
  <footer
    className={clsx(
      "flex items-center pt-12 pb-12 mt-24 border-t-2 border-gray-100",
      className
    )}
  >
    <Link href="/">
      <span className="i-logos-sakura w-4 h-4 logo-rotate text-brand" />
    </Link>

    <div className="text-sm opacity-50 ml-1">
      ©2022-2023 Qhan W. All Rights Reserved.
    </div>
  </footer>
);
