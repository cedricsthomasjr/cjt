import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CJ Thomas — CS × Finance × Visual Design",
  description: "Built from scratch. Built with purpose.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>{/* Optional: include font preconnect or favicon here */}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
