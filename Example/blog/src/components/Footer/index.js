import React from "react";
import Link from "gatsby-link";
import logo from "../../static/logo.svg";
import IconSakura from "../Icons/sakura";

const Footer = ({ siteMetadata }) => (
  <div className="footer">
    <div className="pure-menu pure-menu-horizontal">
      <ul>
        <li className="pure-menu-item">
          <Link className="pure-menu-link" to="/about">
            About
          </Link>
        </li>
        <li className="pure-menu-item">
          <a href="http://twitter.com/yuilibrary/" className="pure-menu-link">
            Twitter
          </a>
        </li>
        <li className="pure-menu-item">
          <a className="pure-menu-link" href="http://github.com/evkylin">
            Github
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default Footer;
