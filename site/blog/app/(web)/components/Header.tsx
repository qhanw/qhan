import Link from "next/link";
import clsx from "clsx";

import ScrollTop from "./ScrollTop";
import Theme from "./Theme";

const nav = [
  {
    name: "Blog",
    href: "/posts",
    icon: (props: any) => (
      <span
        {...props}
        className={clsx("i-heroicons:newspaper", props.className)}
      />
    ),
  },
  // {
  //   name: "Notes",
  //   href: "/notes",
  //   icon: (props: any) => (
  //     <span
  //       {...props}
  //       className={clsx("i-heroicons:pencil-square", props.className)}
  //     />
  //   ),
  // },
  {
    name: "Code Snippets",
    href: "/code-snippets",
    icon: (props: any) => (
      <span
        {...props}
        className={clsx("i-heroicons:code-bracket", props.className)}
      />
    ),
  },
  {
    name: "Projects",
    href: "/projects",
    // icon: (props: any) => <Icon {...props} icon="ant-design:project-outlined" />,

    icon: (props: any) => (
      <span
        {...props}
        className={clsx("i-heroicons:rectangle-stack", props.className)}
      />
    ),
  },
  {
    name: "Bizk",
    href: "https://bizk.qhan.wang",
    icon: (props: any) => (
      <span
        {...props}
        className={clsx("i-heroicons:wrench-screwdriver", props.className)}
      />
    ),
  },

  // { name: "Archives", href: "/archives", icon: ArchiveBoxIcon },
  // { name: "Statistics", href: "/statistics", icon: ChartBarSquareIcon },
];

export default () => (
  <>
    <ScrollTop />
    <header
      className="px-4 sm:px-6 sticky top-0 z-40 w-full backdrop-blur transition-colors duration-500 bg-white/95 supports-backdrop-blur:bg-white/60
    dark:bg-slate-800"
    >
      <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
        <div className="flex justify-start md:w-0 md:flex-1">
          <Link href="/" className="inline-flex items-center text-brand">
            <span className="sr-only">Workflow</span>
            <span className="i-logos-sakura w-6 h-6 logo-rotate" />
            <span className="text-lg ml-2 font-medium text-slate-900 dark:text-slate-300">
              Qhan W
            </span>
          </Link>
        </div>

        <nav className="flex space-x-8 md:space-x-10">
          {nav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-medium inline-flex items-center space-x-2 text-brand"
              {...(/^http(s?):\/\//.test(item.href)
                ? { target: "_blank" }
                : {})}
              aria-label={item.name}
            >
              <item.icon
                className="flex-shrink-0 h-4 w-4 "
                aria-hidden="true"
              />
              <span className="hidden md:flex text-slate-500 hover:text-slate-900 dark:hover:text-slate-200">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
        <Theme />
      </div>
    </header>
    <div className="header-line-shadow" />
  </>
);
