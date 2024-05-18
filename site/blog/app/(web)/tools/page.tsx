import Link from "next/link";
import Image from "next/image";

import seo from "@/utils/seo";

import { getAllPosts } from "@/app/(web)/lib/service";

import Footer from "../components/Footer";

import list from "./set";

export async function generateMetadata() {
  return seo({
    title: "Tools",
    description: "工作中的一些项目经验总结以及一些学习感悟和技巧分享",
  });
}

export default async function Tools() {
  return (
    <>
      {list.map((item) => (
        <>
          <h3 className="text-2xl">{item.name}</h3>
          <ul className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 mt-4 mb-6">
            {item.list.map((c) => (
              <Link
                href={c.href}
                key={c.name}
                className="block border rounded p-4"
                target="_blank"
              >
                <li className="flex">
                  <span>
                    <Image
                      className="rounded-full overflow-hidden"
                      src={c.icon}
                      width={64}
                      height={64}
                      alt={c.name}
                    />
                  </span>
                  <div className="flex-1 ml-4">
                    <div className="text-lg">{c.name}</div>
                    <div className="text-sm text-gray-500">{c.description}</div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </>
      ))}
      <Footer className="mt-6 pt-6" />
    </>
  );
}
