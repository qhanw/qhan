import { css } from "@emotion/react";
import { FolderIcon } from "@heroicons/react/24/outline";

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
    className="inline-flex items-center text-xs mr-2.5 rounded-sm px-2 py-1 text-white"
    css={css`
      background: ${colors[type] || "#fff"};
    `}
  >
    <FolderIcon className="mr-1 w-4 h-4" />
    {title}
  </span>
);
