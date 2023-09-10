import { ReactNode } from "react";
import clsx from "clsx";

import Link from "next/link";

export default function ProjWrapper({
  href,

  ...props
}: {
  className?: string;
  children?: ReactNode;
  href?: string;
}) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        {...props}
        className={clsx(
          props.className,
          "block border border-slate-50 hover:border-brand group"
        )}
      />
    );
  }
  return <div {...props} className={clsx(props.className, "group/show")} />;
}
