import React from "react";
import { Link } from "gatsby";

const classnames =
  "inline-block text-gray-300 px-4 py-2 text-sm";
export default ({ siteMetadata }: any) => (
  <footer className="pt-4 text-center pb-12">
    {[
      { title: "About", type: "link", url: "/about" },
      { title: "Github", url: "http://github.com/qhanw",target:'_blank' },
      { title: "YuQue", url: "https://www.yuque.com/qhan", target:'_blank' },
      { title: "JunJin", url: "https://juejin.cn/user/342703357833255", target:'_blank' },



    ].map(({ type, url, title, ...rest }) =>
      type === "link" ? (
        <Link className={classnames} to={url}>
          {title}
        </Link>
      ) : (
        <a className={classnames} href={url}>
          {title}
        </a>
      )
    )}
  </footer>
);
