import { css } from "@emotion/react";
import IconFolder from "../Icons/folder";

const colors = {
  css: "#5aba59",
  pure: "#4d85d1",
  yui: "#8156a7",
  js: "#df2d4f",
  jsx: "#61dafb",
};

export default ({
  title,
  type = "js",
}: {
  title: string;
  type: keyof typeof colors;
}) => (
  <span
    css={css`
      display: inline-flex;
      align-items: center;
      font-size: 80%;
      > svg {
        margin-right: 5px;
        // color: #b0c323;
        font-size: 14px;
      }
      &:not(:last-child) {
        margin-right: 10px;
      }

      margin: 0 0.1em;
      padding: 0.5em 1em;
      color: #fff;
      background: ${colors[type] || "#fff"};
      border-radius: 2px;
    `}
  >
    <IconFolder />
    {title}
  </span>
);
