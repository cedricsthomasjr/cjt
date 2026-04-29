import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CJ Thomas | AI/ML, Data, Full-Stack",
  description:
    "Portfolio for CJ Thomas, an NYU computer science student working across AI/ML engineering, data science, business intelligence, and full-stack products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>{/* Optional: include font preconnect or favicon here */}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background text-foreground`}
      >
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
