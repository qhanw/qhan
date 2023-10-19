import NextTopLoader from "nextjs-toploader";
import Footer from "@/app/components/Footer";
export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NextTopLoader
        color="rgba(156,163,175,0.45)"
        height={2}
        showSpinner={false}
        shadow={false}
      />
      {children}
      <Footer className="prose mx-auto" />
    </>
  );
}
