import Link from "next/link";

import clsx from "clsx";

import IconSakura from "./Icons/sakura";
import IconJueJin from "./Icons/juejin";
import IconGithub from "./Icons/github";
import IconYuQue from "./Icons/yuque";

const social = [
  { name: "GitHub", href: "http://github.com/qhanw", icon: IconGithub },
  {
    name: "JueJin",
    href: "https://juejin.cn/user/342703357833255",
    icon: IconJueJin,
  },
  { name: "YuQue", href: "https://www.yuque.com/qhan", icon: IconYuQue },
];

type FooterProps = {
  className?: string;
};

export default ({ className }: FooterProps) => (
  <footer
    className={clsx(
      "flex items-center text-center pt-12 pb-12 mt-24 border-t-2 border-gray-100",
      className
    )}
  >
    <div className="flex">
      <Link href="/" className="inline-flex items-center no-underline">
        <span className="sr-only">Workflow</span>
        <IconSakura className="w-8 h-8 logo-rotate text-brand" />
        <span className="text-lg ml-2 font-medium">Qhan W</span>
      </Link>

      {/* {siteMetadata.title} */}
    </div>
    <div className="flex flex-1 ml-8">
      {social.map((c) => (
        <Link
          key={c.href}
          className="border border-solid rounded p-2 mr-2 opacity-50 hover:opacity-80 border-brand"
          href={c.href}
          title={c.name}
          target="_blank"
        >
          <c.icon className="w-4 h-4 text-brand" />
        </Link>
      ))}
    </div>
    <div className="text-sm opacity-50">
      ©2022-2023 Qhan W. All Rights Reserved.
    </div>
  </footer>
);
