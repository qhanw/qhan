import Head from "next/head";
import Link from "next/link";

import SideBar from "./SideBar";

const name = "Your Name";
export const siteTitle = "Next.js Sample Website";

export default function Layout({ children, home }: any) {
  return (
    <div className="flex flex-row flex-wrap h-screen">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <SideBar className="basis-full md:basis-1/4 bg-purple-700" />

      <main className="basis-full md:basis-3/4">
        {children}
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
