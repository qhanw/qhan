"use client";
import { Icon } from "../components/Icons";

export default function AdmLink({ href }: { href: string }) {
  return (
    <span
      className="inline-flex items-center relative z-10"
      onClick={() => window.open(href, "_blank")}
      title={href}
    >
      <Icon icon="heroicons:globe-alt" className="mr-1" />
    </span>
  );
}
