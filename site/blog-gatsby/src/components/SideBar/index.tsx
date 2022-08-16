import React, { useEffect } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import ScrollReveal from "scrollreveal";
import "./sidebar.scss";

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
    ScrollReveal().reveal(".brand-title, .brand-tagline", {
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
      className="bg-slate-700 text-white flex items-center w-full md:w-1/4 md:h-screen md:float-left md:fixed"
    >
      <div className="text-center md:text-right px-12">
        <h1 className="brand-title text-4xl">{siteMetadata.title}</h1>
        <h2 className="brand-tagline text-2xl">
          Fear can hold you prisoner. Hope cna set you free.
        </h2>
        <nav id="nav" className="mt-4">
          {[
            { title: "Home", path: "/" },
            { title: "Archives", path: "/archives" },
            { title: "About", path: "/about" },
          ].map(({ title, path }) => (
            <Link
              className="transition ease-in-out duration-300 ml-2 mb-6 leading-tight inline-block uppercase tracking-wider text-white px-4 py-2 border-2 rounded-sm border-slate-400 hover:border-sky-500 hover:text-sky-500"
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
