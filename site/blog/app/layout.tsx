import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "./components/Footer";
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
        <Header />
        <main className="container mx-auto px-4 pt-10">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
