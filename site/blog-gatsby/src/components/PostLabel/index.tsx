import { css } from "@emotion/react";
import { TagIcon } from "@heroicons/react/24/outline";

export default ({
  title,
  color = "rgb(148 163 184 / var(--tw-text-opacity))",
}: {
  title: string;
  color?: string;
}) => (
  <span
    className="inline-flex items-center py-1 mr-2.5 text-xs"
    css={css`
      color: ${color};
    `}
  >
    <TagIcon className="mr-1 w-4 h-4" />
    {title}
  </span>
);
