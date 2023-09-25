import Image from "next/image";

import Footer from "@/app/components/Footer";
import Social from "@/app/components/Social";
import Bizk from "@/app/components/Bizk";

import seo from "@/utils/seo";
import QrCode from "@/app/assets/qr_code.png";

export async function generateMetadata() {
  return seo({});
}

export default function Home() {
  return (
    <div className="prose mx-auto">
      <div className="text-3xl text-gray-600 mb-2">
        <a className="i-ri:quill-pen-line" />
      </div>
      <div className="text-gray-600 tracking-tight max-w-5xl">
        专注于前端的全栈工程师，参与工作距今已经有十多年，有着丰富的2B系统开发及架构经验。早年从事UI设计工作，因此对用户体验及交互上具有一定的把控。目前主要以前端开发为主，对服务端技术如：nodejs、next、nest也具备一定的掌握。擅长以React为核心的各类技术栈进行软件开发，喜欢工程化方面领域，喜欢交互设计。
      </div>
      <ul className="mt-4 text-gray-400 font-light">
        <li>
          🎉
          技术栈包括:react、nextjs、nodejs、typescript、electron、sass、unocss、tailwind
          css等。
        </li>
        <li>🌱 目前正在学习前端自动化测试方面知识。</li>
        <li>
          💬 如何联系我：微信搜索
          <a className="text-brand no-underline font-normal">AsQhan</a> 或邮箱：
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
