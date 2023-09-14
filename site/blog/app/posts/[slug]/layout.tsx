export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="prose mx-auto">{children}</div>;
}
