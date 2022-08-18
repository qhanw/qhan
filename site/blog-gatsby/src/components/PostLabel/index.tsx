import { css } from "@emotion/react";
import IconTag from "../Icons/tag";

export default ({
  title,
  color = "#999",
}: {
  title: string;
  color?: string;
}) => (
  <span
    css={css`
      display: inline-flex;
      align-items: center;
      color: ${color};
      padding: 0.3em 0;
      font-size: 80%;
      > svg {
        margin-right: 5px;
        // color: #b0c323;
        font-size: 14px;
      }
      &:not(:last-child) {
        margin-right: 10px;
      }
    `}
  >
    <IconTag />
    {title}
  </span>
);
