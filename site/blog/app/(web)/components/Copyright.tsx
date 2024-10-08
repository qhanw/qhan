"use client";

import Link from "next/link";

export default () => (
  <div className="text-sm opacity-50 ml-1 dark:text-slate-400">
    ©2022-{new Date().getFullYear()} Qhan W. All Rights Reserved.
    <Link
      className="text-brand ml-2"
      target="_blank"
      href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
    >
      CC BY-NC-SA 4.0
    </Link>
  </div>
);
