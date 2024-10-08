import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-slate-800`}>
        <ThemeProvider attribute="class" enableColorScheme={false}>
          <NextTopLoader
            color="rgba(156,163,175,0.45)"
            height={2}
            showSpinner={false}
            shadow={false}
          />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
