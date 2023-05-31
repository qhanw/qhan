import { useEffect } from "react";
import Layout from "../components/Layout";
import PosLabel from "../components/PostLabel";
//import Chart from "chart.js";

import Seo from "@/components/Seo";
import data from "../resource/about";

const PostLabel = (props: { title: string }) => (
  <PosLabel {...props} color="indigo" />
);

export default () => {
  // useEffect(() => {
  //   ScrollReveal().reveal("#series-content", {
  //     delay: 500,
  //     useDelay: "onload",
  //     reset: true,
  //     origin: "right",
  //     distance: "120px",
  //   });
  //   ScrollReveal().reveal("#series>li>time", {
  //     delay: 500,
  //     useDelay: "onload",
  //     reset: true,
  //     origin: "left",
  //     distance: "120px",
  //   });

  //   return () => {
  //     ScrollReveal().destroy();
  //   };
  // }, []);
  return (
    <Layout>
      <Seo title="关于" />

      <main>
        <ul
          id="series"
          className="relative pl-8 ml-5 before:content-[''] before:block before:w-0.5 before:h-full before:bg-brand before:absolute before:left-0 before:top-0 before:overflow-hidden lg:ml-36 xl:60"
        >
          {data.map((c) => {
            const isProj = c.type !== "company";
            return (
              <li
                key={c.date}
                className="relative mb-12 last:mb-0 last:before:content-[''] last:before:inline-block last:before:h-full last:before:w-0.5 last:before:bg-white last:before:absolute last:before:-left-8 last:before:bottom-0"
              >
                <i
                  className={`
                  icon-square
                  ${isProj ? " scale-50" : ""}
                  absolute inline-block w-5 h-5
                  before:absolute before:content-[""] before:inline-block before:rotate-45 before:rounded-sm before:w-full before:h-full before:bg-white  before:border-brand before:border-solid before:border-2 before:left-0 before:top-0
                  after:absolute after:content-[""] after:inline-block after:rotate-45 after:rounded-sm after:w-2 after:h-2 after:bg-brand after:left-1.5 after:top-1.5
                  `}
                  style={{ left: -41 }}
                />
                <time
                  className={`text-sm italic inline-block text-right ${
                    isProj ? "text-gray-400" : "text-brand"
                  } -left-52 lg:absolute lg:w-36`}
                >
                  {c.date}
                </time>
                <div id="series-content" className="xl:w-4/5">
                  <div className="text-xl text-black/80">
                    {c.url ? (
                      <a
                        href="http://www.jxjd627.com/index.html"
                        target="_blank"
                      >
                        {c.organization}
                      </a>
                    ) : (
                      c.organization
                    )}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">{c.position}</div>
                  {c.tags ? (
                    <div className="my-1">
                      {c.tags.map((t) => (
                        <PostLabel title={t} key={t} />
                      ))}
                    </div>
                  ) : null}

                  <div className="text-base text-gray-600">
                    {c.desc}
                    {c.duty ? (
                      <ul>
                        {c.duty?.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </Layout>
  );
};
