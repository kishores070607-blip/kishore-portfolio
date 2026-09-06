import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/Grain";
import Cursor from "@/components/Cursor";
import ProgressBar from "@/components/ProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kishore S — Builder",
  description:
    "Kishore S. ECSE, Chennai. Systems you can hold — and prove. Credify, self-hosted infrastructure, and hardware that tells the truth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="cursor-none-desktop min-h-full bg-[#0C0B0A] text-[#F4EFE6]">
        <SmoothScroll />
        <Grain />
        <Cursor />
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
