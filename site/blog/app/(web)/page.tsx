import Image from "next/image";

import Footer from "@/app/(web)/components/Footer";
import Social from "@/app/(web)/components/Social";
import Bizk from "@/app/(web)/components/Bizk";
import QrCode from "@/app/(web)/assets/qr_code.png";

import seo from "@/utils/seo";

export async function generateMetadata() {
  return seo({});
}

export default function Home() {
  return (
    <div className="max-w-prose mx-auto">
      <div className="text-3xl mb-2">
        <span className="i-ri:quill-pen-line text-brand" />
      </div>
      <div className="text-gray-600 tracking-tight max-w-5xl">
        专注于前端的全栈工程师，参与工作距今已经有十多年，有着丰富的2B系统开发及架构经验。早年从事UI设计工作，因此对用户体验及交互上具有一定的把控。目前主要以前端开发为主，对服务端技术如：nodejs、next.js、nest也具备一定的掌握。擅长以React为核心的各类技术栈进行软件开发，喜欢工程化方面领域，喜欢交互设计。
      </div>
      <ul className="mt-4 text-gray-400 font-light">
        <li>
          🎉
          技术栈包括:react、nextjs、nodejs、typescript、electron、sass、unocss、tailwind
          css等。
        </li>
        <li>🌱 目前正在学习Rust、以及项目管理方面知识。</li>
        <li>
          💬 如何联系我：微信搜索
          <span className="text-brand no-underline font-normal">AsQhan</span> 或邮箱：
          <a
            className="text-brand no-underline font-normal"
            href="mailto:whenhan@foxmail.com"
          >
            whenhan@foxmail.com
          </a>
          <Image
            src={QrCode}
            width={120}
            height={120}
            alt="qr code"
            className="opacity-60 grayscale mt-1"
          />
        </li>
      </ul>

      <Bizk />
      <Social />

      <Footer className="mt-6 pt-6" />
    </div>
  );
}
