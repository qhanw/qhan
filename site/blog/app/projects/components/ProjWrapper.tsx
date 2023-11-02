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
    const cls = clsx(
      props.className,
      "block border border-transparent hover:border-brand group no-underline font-normal"
    );
    if (/^http(s?):\/\//.test(href)) {
      return <a href={href} target="_blank" {...props} className={cls} />;
    }

    return <Link href={`/projects/${href}`}  {...props} className={cls} />;
  }
  return <div {...props} className={clsx(props.className, "group/show")} />;
}
