import React, { useEffect } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import ScrollReveal from "scrollreveal";
import "./side-bar.scss";

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
      container: ".sidebar",
    });

    ScrollReveal().reveal(".nav", {
      delay: 0,
      origin: "bottom",
      distance: "120px",
      useDelay: "once",
      container: ".sidebar",
    });

    return () => {
      ScrollReveal().destroy();
    };
  }, []);

  return (
    <div className="sidebar w-full md:w-1/4 md:h-screen md:float-left md:fixed">
      <div className="text-center md:text-right p-12 md:mt-[80%]">
        <h1 className="brand-title">{siteMetadata.title}</h1>
        <h2 className="brand-tagline">
          Fear can hold you prisoner. Hope cna set you free.
        </h2>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link className="pure-button" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item" style={{ marginLeft: 8 }}>
              <Link className="pure-button" to="/archives">
                Archives
              </Link>
            </li>
            <li className="nav-item" style={{ marginLeft: 8 }}>
              <Link className="pure-button" to="/about">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
