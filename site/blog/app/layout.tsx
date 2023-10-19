import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";
import Header from "./components/Header";

import "./styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qhan W",
  description: "A personal website of Qhan W.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader
          color="rgba(156,163,175,0.45)"
          height={2}
          showSpinner={false}
          shadow={false}
        />
        <Header />
        <main className="container mx-auto px-4 pt-10">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
