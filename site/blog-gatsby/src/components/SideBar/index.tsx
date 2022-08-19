import { useEffect } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import ScrollReveal from "scrollreveal";

const SideBar = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  useEffect(() => {
    ScrollReveal().reveal("#brand-title, #brand-tagline", {
      delay: 0,
      origin: "top",
      distance: "120px",
      useDelay: "once",
      container: "#sidebar",
    });

    ScrollReveal().reveal("#nav", {
      delay: 0,
      origin: "bottom",
      distance: "120px",
      useDelay: "once",
      container: "#sidebar",
    });

    return () => {
      ScrollReveal().destroy();
    };
  }, []);

  return (
    <div
      id="sidebar"
      className="bg-slate-700 text-white flex items-center justify-center w-full md:w-1/4 md:h-screen md:float-left md:fixed"
    >
      <div className="text-center md:text-right p-12 pt-16 md:-mt-24">
        <h1 id="brand-title" className="text-4xl uppercase">
          {siteMetadata.title}
        </h1>
        <h2
          id="brand-tagline"
          className="text-2xl font-light"
          style={{ color: "rgb(176, 202, 219)" }}
        >
          Fear can hold you prisoner. Hope can set you free.
        </h2>
        <nav id="nav" className="mt-4">
          {[
            { title: "Home", path: "/" },
            { title: "Archives", path: "/archives" },
            { title: "About", path: "/about" },
          ].map(({ title, path }) => (
            <Link
              key={path}
              className="ml-2 mb-6 leading-tight inline-block uppercase tracking-wider text-white px-4 py-2 border-2 rounded-sm border-slate-400 hover:border-sky-500 hover:text-sky-500"
              to={path}
            >
              {title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
