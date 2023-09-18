import Footer from "@/app/components/Footer";
import Social from "@/app/components/Social";

// import AdmLink from "./Home/AdmLink";
// import ProjWrapper from "./Home/ProjWrapper";

import seo from "@/app/utils/seo";

// import projects from "./projects/constant/projects";

export async function generateMetadata() {
  return seo({ title: "主页" });
}

export default function Home() {
  return (
    <div className="prose mx-auto">
      <div className="text-xl">Hi, here</div>
      <div className="mt-4 text-slate-900 tracking-tight max-w-5xl">
        我是一名软件开发工程师参与工作距今已经有十多年，有着丰富的2B系统开发及架构经验。早年从事UI设计工作，因此对用户体验交互上也具有一定的理解，现以前端开发为主，擅长以React为核心的各类技术栈进行软件开发。喜欢工程化方面领域，喜欢交互设计。
      </div>
      <ul className="mt-4 text-slate-500 font-light">
        <li>
          🎉 技术栈包括:
          React、NextJs、NodeJs、Typescript、Electron、Antd、Sass、Tailwind
          CSS等。
        </li>
        <li>🌱 目前正在学习前端自动化测试方面知识。</li>
        <li>
          💬 如何联系我: 微信搜索 AsQhan 或邮箱：
          <a className="text-brand" href="mailto:whenhan@foxmail.com">
            whenhan@foxmail.com
          </a>
        </li>
      </ul>

      <Social />

      <Footer className="mt-6 pt-6" />
    </div>
  );
}
