"use client";

export default function AdmLink({ href }: { href: string }) {
  return (
    <span
      className="inline-flex items-center relative z-10"
      onClick={() => window.open(href, "_blank")}
      title={href}
    >
      <span className="i-heroicons:globe-alt mr-1" />
    </span>
  );
}
