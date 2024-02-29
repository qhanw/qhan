import Link from "next/link";

const kits = [
  {
    name: "Components",
    href: "https://bizk.qhan.wang/components",
    icon: "i-ri:shapes-line",
  },
  {
    name: "Hooks",
    href: "https://bizk.qhan.wang/hooks",
    icon: "i-ri:circle-line",
  },
  {
    name: "utils",
    href: "https://bizk.qhan.wang/utils",
    icon: "i-ri:tools-line",
  },
  {
    name: "Store",
    href: "https://bizk.qhan.wang/store",
    icon: "i-ri:store-line",
  },
  {
    name: "Regexps",
    href: "https://bizk.qhan.wang/regexps",
    icon: "i-ri:magic-line",
  },
];

export default function Bizk() {
  return (
    <div className="flex flex-wrap gap-x-3 mt-24">
      {kits.map((c) => (
        <Link
          key={c.href}
          className="opacity-50 hover:opacity-80 font-normal text-brand"
          href={c.href}
          title={c.name}
          target="_blank"
        >
          <span className={`${c.icon} w-4 h-4 mr-1`} />
          {c.name}
        </Link>
      ))}
    </div>
  );
}
