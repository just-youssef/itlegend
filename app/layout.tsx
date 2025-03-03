import type { Metadata } from "next";
import "@/styles/globals.css";
import { Cairo } from "next/font/google";
import { Footer, Header } from "@/server/components";

// Initialize the font with desired options
const cairo = Cairo({
  subsets: ["arabic", "latin"], // Include Arabic subset if needed
  weight: ["400", "700"], // Specify font weights you need
  variable: "--font-cairo", // Define a CSS variable
});

export const metadata: Metadata = {
  title: "IT Legend",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${cairo.variable} !scroll-smooth`}
    >
      <body suppressHydrationWarning>
        <Header />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
