import { css } from "@emotion/react";
import { TagIcon } from "@heroicons/react/24/outline";

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
      &:not(:last-child) {
        margin-right: 10px;
      }
    `}
  >
    <TagIcon className="mr-1 w-4 h-4" />
    {title}
  </span>
);
