import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dityo Rivandayu - Digital Creative Portfolio",
  description:
    "A cinematic personal portfolio for web development, filmmaking, storytelling, UI/UX, and content creation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f2ecdc] text-[#2a2119]">{children}</body>
    </html>
  );
}
