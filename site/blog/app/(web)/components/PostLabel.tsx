const colors = { indigo: "brand-color" };

export default ({
  title,
  color = "indigo",
}: {
  title: string;
  color?: keyof typeof colors;
}) => (
  <span
    className={`${colors[color]} inline-flex items-center py-1 mr-2.5 text-sm`}
  >
    <span className="i-heroicons:tag mr-1 w-4 h-4" />
    {title}
  </span>
);
