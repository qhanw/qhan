export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-prose mx-auto">{children}</div>;
}
