import Footer from "@/app/(web)/components/Footer";
export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer className="prose mx-auto" />
    </>
  );
}
