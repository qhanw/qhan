import Link from "next/link";

const kits = [
  {
    name: "Components",
    href: "http://bizk.qhan.wang/components",
    icon: "i-ri:shapes-line",
  },
  {
    name: "Hooks",
    href: "http://bizk.qhan.wang/hooks",
    icon: "i-ri:circle-line",
  },
  {
    name: "utils",
    href: "http://bizk.qhan.wang/utils",
    icon: "i-ri:tools-line",
  },
  {
    name: "Store",
    href: "http://bizk.qhan.wang/store",
    icon: "i-ri:store-line",
  },
  {
    name: "Regexps",
    href: "http://bizk.qhan.wang/regexps",
    icon: "i-ri:magic-line",
  },
];

export default function Bizk() {
  return (
    <div className="flex flex-wrap gap-3 mt-24">
      {kits.map((c) => (
        <Link
          key={c.href}
          className="opacity-50 hover:opacity-80 font-normal"
          href={c.href}
          title={c.name}
          target="_blank"
        >
          <span className={`${c.icon} w-4 h-4 text-brand mr-1`} />
          {c.name}
        </Link>
      ))}
    </div>
  );
}
