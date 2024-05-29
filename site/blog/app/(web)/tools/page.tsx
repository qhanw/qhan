import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

import seo from "@/utils/seo";

import Footer from "../components/Footer";

import list from "./set";

import "./styles.scss";

export async function generateMetadata() {
  return seo({
    title: "Tools",
    description:
      "收集的一些在线图片压缩、在线视频压缩、响应式设计工具、API文档工具，方便前端同学对开发资源处理，提升前端开发工作效率，提高工作辛福指数。",
  });
}

export default async function Tools() {
  return (
    <>
      {list.map((item) => (
        <Fragment key={item.name}>
          <h3 className="text-2xl">{item.name}</h3>
          <ul className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 mt-4 mb-6">
            {item.list.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="back border transition duration-700 ease-in-out hover:shadow-lg"
                target="_blank"
              >
                <li className="block rounded p-4">
                  <div className="flex relative z-10">
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
                      <div className="text-sm text-gray-500">
                        {c.description}
                      </div>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </Fragment>
      ))}
      <Footer className="mt-6 pt-6" />
    </>
  );
}
