import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/nav/Nav";
import Contact from "../components/form/Contact";
import Footer from "../components/footer/Footer";

export const metadata: Metadata = {
  title: "Crystal Genius International Limited",
  description:
    "Pioneering innovation and setting new standards of excellence in building construction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative w-full overflow-x-hidden">
        <Nav />
        <main className="">{children}</main>
        <Contact />
        <Footer />
      </body>
    </html>
  );
}
