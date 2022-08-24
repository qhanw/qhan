import { css } from "@emotion/react";
import IconSakura from "../Icons/sakura";
import IconJueJin from "../Icons/juejin";
import IconGithub from "../Icons/github";
import IconYuQue from "../Icons/yuque";
import { Link } from "gatsby";

const sakura = css`
  animation: sakuraRotate infinite 6s linear;
  @keyframes sakuraRotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }
`;

const social = [
  { name: "GitHub", href: "http://github.com/qhanw", icon: IconGithub },
  {
    name: "JueJin",
    href: "https://juejin.cn/user/342703357833255",
    icon: IconJueJin,
  },
  { name: "YuQue", href: "https://www.yuque.com/qhan", icon: IconYuQue },
];

const SideBar = ({ siteMetadata }: any) => {
  return (
    <div className="bg-slate-700 flex items-center justify-center w-full mt-[82px] md:mt-auto md:w-1/4 md:h-screen md:float-left md:fixed">
      <div className="absolute top-6 left-4 inline-flex text-white/80 items-center">
        <IconSakura css={css(sakura)} className="w-8 h-8" />
        <span className="text-xl inline-block ml-3">
          {siteMetadata.title}
        </span>
      </div>
      <div className="text-center md:text-right p-12 pt-16 md:-mt-24">
        <h2
          className="text-2xl font-light"
          style={{ color: "rgb(176, 202, 219)" }}
        >
          Fear can hold you prisoner. Hope can set you free.
        </h2>
      </div>
      <div className="absolute bottom-4 left-4 inline-flex">
        {social.map((c) => (
          <Link
            key={c.href}
            className="border border-white border-solid rounded p-2 mr-2 opacity-50 hover:opacity-80"
            to={c.href}
            title={c.name}
            target="_blank"
          >
            <c.icon className="w-4 h-4 text-white" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
