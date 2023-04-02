import { TagIcon } from "@heroicons/react/24/outline";

const colors = {
  indigo: "text-indigo-600",
};

export default ({
  title,
  color = "indigo",
}: {
  title: string;
  color?: keyof typeof colors;
}) => (
  <span
    className={`${colors[color]} inline-flex items-center py-1 mr-2.5 text-xs`}
  >
    <TagIcon className="mr-1 w-4 h-4" />
    {title}
  </span>
);
