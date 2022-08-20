import { useEffect } from "react";
import { css } from "@emotion/react";
import ScrollReveal from "scrollreveal";
import Layout from "../components/Layout";
import PosLabel from "../components/PostLabel";
//import Chart from "chart.js";

import Seo from "../components/Seo";
import data from "../resource/about";

import { cssSeries, cssProject } from "../emotion/about";

const PostLabel = (props: { title: string }) => (
  <PosLabel {...props} color="#00bec6" />
);

export default () => {
  useEffect(() => {
    ScrollReveal().reveal("#series-content", {
      delay: 500,
      useDelay: "onload",
      reset: true,
      origin: "right",
      distance: "120px",
    });
    ScrollReveal().reveal("#series>li>time", {
      delay: 500,
      useDelay: "onload",
      reset: true,
      origin: "left",
      distance: "120px",
    });

    return () => {
      ScrollReveal().destroy();
    };
  }, []);
  return (
    <Layout>
      <header className="text-3xl pb-4 mb-8 border-b border-gray-200 text-black/80">
        About Us
      </header>

      <main>
        <ul id="series" css={cssSeries}>
          {data.map((c) => (
            <li
              key={c.date}
              {...(c.type === "company" ? {} : { css: cssProject })}
            >
              <i className="icon-square" />
              <time>{c.date}</time>
              <div id="series-content" className="series-content">
                <div className="text-xl text-black/80">
                  {c.url ? (
                    <a href="http://www.jxjd627.com/index.html" target="_blank">
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
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export const Head = () => <Seo title="关于" />;
