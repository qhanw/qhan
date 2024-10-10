import Footer from "@/app/(web)/components/Footer";
import seo from "@/utils/seo";

import AdmLink from "./components/AdmLink";
import ProjWrapper from "./components/ProjWrapper";

import projects from "./constant/projects";

export async function generateMetadata() {
  return seo({
    title: "Projects",
    description: "工作中一些值得展示的项目成果",
  });
}

export default function Projects() {
  return (
    <>
      {/* text-transparent text-stroke-2 text-stroke-hex-aaa */}
      <div className="text-3xl text-center font-semibold opacity-30 mb-8 mx-auto text-slate-800 dark:text-slate-100">
        Projects
      </div>
      <div className="grid gap-4 prose mx-auto">
        {projects.map((proj) => (
          <ProjWrapper
            key={proj.key}
            className="flex relative rounded-xl p-6 text-sm leading-6 transition bg-slate-50 dark:bg-slate-700 overflow-hidden ease-in duration-300 fade-in-up"
            href={proj.href}
          >
            <div className="flex flex-col -space-y-1.5 text-slate-400 pr-6 pt-1 group-hover:text-brand group-hover/show:text-brand">
              {proj.icons?.map((c, i) => (
                <span
                  key={c + i}
                  className="w-7 h-7 rounded-full bg-slate-100 ring-2 ring-white inline-flex items-center justify-center dark:bg-slate-800 dark:ring-slate-600"
                >
                  <span
                    className={`${c} ease-in duration-300`}
                    style={{
                      ...(/(echarts|antv|antd-mobile)$/.test(c)
                        ? { fontSize: 15 }
                        : { fontSize: 18 }),
                    }}
                  />
                </span>
              ))}
            </div>

            <div className="flex-1">
              <button className="flex gap-2 transition items-center">
                <span className="absolute inset-0 rounded-xl"></span>
                <span className="text-lg text-slate-600 dark:text-slate-400 group-hover:text-brand ease-in duration-300">
                  {proj.name}
                </span>
                {/* <span className="text-slate-400 flex gap-1 items-center grayscale group-hover:grayscale-0 group-hover/show:grayscale-0">
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
                </span> */}
              </button>

              <p className="mt-1 text-slate-500">{proj.desc}</p>
              <div className="flex items-center mt-2 text-brand font-semibold">
                {proj.sub_href ? <AdmLink href={proj.sub_href} /> : null}

                {proj.href ? (
                  <span className="inline-flex items-center">
                    {/^http(s?):\/\//.test(proj.href) ? "Preview" : "Details"}
                    <span className="i-heroicons:arrow-right ml-1" />
                  </span>
                ) : null}
              </div>
            </div>
          </ProjWrapper>
        ))}
      </div>
      <Footer className="prose mx-auto" />
    </>
  );
}
