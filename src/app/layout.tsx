import type { Metadata } from "next";
import { Marcellus, Jost, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
  display: "swap",
});

const jost = Jost({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Bridge Wellness Centre | Miriam Gathoni Mwangi, LPC",
  description:
    "Professional counseling and coaching with Miriam Gathoni Mwangi, LPC. Individual therapy, marriage coaching, child & adolescent therapy, and blended family therapy. Based in Nairobi, Kenya — serving clients worldwide.",
  keywords: "counseling, therapy, Nairobi, Kenya, Miriam Gathoni, LPC, marriage coaching, family therapy",
  openGraph: {
    title: "The Bridge Wellness Centre",
    description: "You Don't Have To Carry This Alone. Professional counseling with Miriam Gathoni Mwangi, LPC.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${jost.variable} ${cormorant.variable}`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body style={{ margin: 0, background: "#FAFAF8", fontFamily: "var(--font-jost), sans-serif" }}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
