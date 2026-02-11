import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Love Letter For You | Valentine's Day",
  description:
    "An intimate, cinematic love story experience — crafted with care, just for you. Open your letter and discover a world of memories and promises.",
  keywords: ["valentine", "love letter", "romantic", "interactive story"],
  openGraph: {
    title: "A Love Letter For You ❤️",
    description:
      "An intimate, cinematic love story experience — crafted with care, just for you.",
    type: "website",
    locale: "en_US",
    siteName: "Love Letter",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Love Letter For You ❤️",
    description:
      "An intimate, cinematic love story experience — crafted with care, just for you.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
