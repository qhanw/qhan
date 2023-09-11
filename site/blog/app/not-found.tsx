import Link from "next/link";
import seo from "@/app/utils/seo";

export async function generateMetadata() {
  return seo({ title: "Not found" });
}

export default function NotFound() {
  return (
    <main className="p-24">
      <h1 className="mb-16 max-w-xs">Page not found</h1>
      <p className="mb-12">
        Sorry 😔, we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in{" "}
            <code className="p-1 rounded text-xl bg-orange-100 text-amber-500">
              app/
            </code>
            .
            <br />
          </>
        ) : null}
        <br />
        <Link href="/">Go home</Link>.
      </p>
    </main>
  );
}
