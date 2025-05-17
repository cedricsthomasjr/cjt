import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-black px-6 py-12 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} CJ Thomas. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link
            href="https://github.com/yourgithub"
            target="_blank"
            className="hover:text-white transition"
          >
            GitHub
          </Link>
          <Link
            href="mailto:ctho394@lsu.edu"
            className="hover:text-white transition"
          >
            Email
          </Link>
          <Link
            href="https://www.linkedin.com/in/your-link"
            target="_blank"
            className="hover:text-white transition"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
