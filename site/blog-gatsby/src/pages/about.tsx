import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import Layout from "../components/Layout";
import PosLabel from "../components/PostLabel";
//import Chart from "chart.js";

import Seo from "../components/Seo";
import data from "../resource/about";

const PostLabel = (props: { title: string }) => (
  <PosLabel {...props} color="#00bec6" />
);

export default () => {
  useEffect(() => {
    ScrollReveal().reveal(".series>li>.series-content", {
      delay: 500,
      useDelay: "onload",
      reset: true,
      origin: "right",
      distance: "120px",
    });
    ScrollReveal().reveal(".series>li>time", {
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
      <header className="text-3xl pb-6 mb-6 border-b border-gray-200">
        About Us
      </header>

      <main className="article-content">
        <ul className="series">
          {data.map((c) => (
            <li
              key={c.date}
              {...(c.type === "company" ? {} : { className: "series-project" })}
            >
              <i className="icon-square" />
              <time>{c.date}</time>
              <div className="series-content">
                <div className="organization">
                  {c.url ? (
                    <a href="http://www.jxjd627.com/index.html" target="_blank">
                      {c.organization}
                    </a>
                  ) : (
                    c.organization
                  )}
                </div>
                <div className="title">{c.position}</div>
                {c.tags ? (
                  <div className="post-meta">
                    {c.tags.map((t) => (
                      <PostLabel title={t} key={t} />
                    ))}
                  </div>
                ) : null}

                <div className="duty">
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
        {/* <div id="chart">
          <canvas id="canvas" />
        </div> */}
      </main>
    </Layout>
  );
};

export const Head = () => <Seo title="关于" />;
