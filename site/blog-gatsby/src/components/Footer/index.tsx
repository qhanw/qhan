import { Link } from "gatsby";

import IconSakura from "../Icons/sakura";
import IconJueJin from "../Icons/juejin";
import IconGithub from "../Icons/github";
import IconYuQue from "../Icons/yuque";

const social = [
  { name: "GitHub", href: "http://github.com/qhanw", icon: IconGithub },
  {
    name: "JueJin",
    href: "https://juejin.cn/user/342703357833255",
    icon: IconJueJin,
  },
  { name: "YuQue", href: "https://www.yuque.com/qhan", icon: IconYuQue },
];

export default ({ siteMetadata }: any) => (
  <footer className="flex text-center pt-12 pb-12 mt-24 border-t-2 border-gray-100">
    <div className="flex">
      <Link to="/" className="inline-flex items-center">
        <span className="sr-only">Workflow</span>
        <IconSakura className="w-8 h-8 text-indigo-600 logo-rotate" />
        <span className="text-lg ml-2 font-medium">Qhan W</span>
      </Link>

      {/* {siteMetadata.title} */}
    </div>

    <div className="flex flex-1 ml-8">
      {social.map((c) => (
        <Link
          key={c.href}
          className="border border-indigo-600 border-solid rounded p-2 mr-2 opacity-50 hover:opacity-80"
          to={c.href}
          title={c.name}
          target="_blank"
        >
          <c.icon className="w-4 h-4 text-indigo-600" />
        </Link>
      ))}
    </div>

    {/* {[
      { title: "Github", url: "http://github.com/qhanw", target: "_blank" },
      { title: "YuQue", url: "https://www.yuque.com/qhan", target: "_blank" },
      {
        title: "JunJin",
        url: "https://juejin.cn/user/342703357833255",
        target: "_blank",
      },
    ].map(({ url, title, ...rest }) => (
      <Link
        className="inline-block text-gray-300 px-4 py-2 text-sm"
        to={url}
        key={title}
        {...rest}
      >
        {title}
      </Link>
    ))} */}
  </footer>
);
