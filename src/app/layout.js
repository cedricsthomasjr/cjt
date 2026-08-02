import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://cjst.dev"),
  title: {
    default: "CJ Thomas — AI/ML and data engineering",
    template: "%s — CJ Thomas",
  },
  description:
    "CJ Thomas builds data pipelines, machine learning workflows, and AI-powered finance tools. NYU computer science, incoming AI/ML engineer intern at NIKE.",
  openGraph: {
    title: "CJ Thomas — AI/ML and data engineering",
    description:
      "Data pipelines, machine learning workflows, and AI-powered finance tools.",
    url: "https://cjst.dev",
    siteName: "CJ Thomas",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CJ Thomas — AI/ML and data engineering",
    description:
      "Data pipelines, machine learning workflows, and AI-powered finance tools.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Navbar />
        <div id="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
