import React from "react";
import Link from "gatsby-link";
import logo from "../../static/logo.svg";
import IconSakura from "../Icons/sakura";
import styles from "./styles.module.scss";

const Header = ({ siteMetadata }) => (
  <div className={styles.header}>
    <div className={styles.container}>
      <h1 className={styles.logo}>
        <Link to="/">
          <IconSakura className={styles.sakura} />
          {siteMetadata.title}
        </Link>
      </h1>

      <ul className={styles.nav}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/archives">Archives</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Header;
