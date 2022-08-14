import React, { useEffect } from "react";
import { Link } from "gatsby";
import ScrollReveal from "scrollreveal";

const SideBar = ({ siteMetadata }: any) => {
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
    <div className="sidebar pure-u-1 pure-u-md-1-4">
      <div className="header">
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
