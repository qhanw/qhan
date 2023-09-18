import Footer from "@/app/components/Footer";

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
      {/* <h2 className="mb-8 mt-12 pb-2 text-xl text-slate-500 tracking-tight border-b border-slate-100">
        项目经历
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
        {projects.map((proj) => (
          <ProjWrapper
            key={proj.key}
            className="relative rounded-xl p-6 text-sm leading-6 transition bg-slate-50 hover:bg-slate-100"
            href={proj.href}
          >
            <h2>
              <button className="flex gap-2 transition items-center">
                <span className="absolute inset-0 rounded-xl"></span>
                <span className="font-semibold text-slate-900 group-hover:text-brand">
                  {proj.name}
                </span>
                <span className="text-slate-400 flex gap-1 items-center grayscale group-hover:grayscale-0 group-hover/show:grayscale-0">
                  {proj.icons?.map((c, i) => (
                    <span
                      key={c + i}
                      className={c}
                      style={{
                        ...(c.includes("echarts")
                          ? { fontSize: 15 }
                          : c.includes("antv")
                          ? { fontSize: 14 }
                          : { fontSize: 18 }),
                      }}
                    />
                  ))}
                </span>
              </button>
            </h2>
            <p className="mt-1 text-slate-500">{proj.desc}</p>
            <div className="flex items-center mt-2 text-brand font-semibold">
              {proj.sub_href ? <AdmLink href={proj.sub_href} /> : null}

              {proj.href ? (
                <span className="inline-flex items-center">
                  Preview
                  <span className="i-heroicons:arrow-right ml-1" />
                </span>
              ) : null}
            </div>
          </ProjWrapper>
        ))}
      </div> */}
      <Footer />
    </div>
  );
}
