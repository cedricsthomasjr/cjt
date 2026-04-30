"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { contactLinks } from "@/data/resume";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/mldbzvpp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.ok || res.status === 200) {
        setFormData({ name: "", email: "", message: "" });
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#080806] pt-14 text-[#f4f1ea] sm:pt-16">
      <section className="site-shell grid gap-6 py-8 sm:gap-7 sm:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:py-14">
        <div className="max-w-2xl">
          <p className="eyebrow">Contact</p>
          <h1 className="display-title mt-4">
            Let&apos;s build the next run.
          </h1>
          <p className="body-copy mt-4">
            I am open to conversations around AI/ML engineering, data
            platforms, business intelligence, market research, and full-stack
            product work.
          </p>
          <div className="mt-5 grid gap-3 sm:mt-6">
            <Link
              href={`mailto:${contactLinks.email}`}
              className="industrial-panel flex items-center justify-between gap-3 p-3.5 hover:border-[#f05a28] sm:p-4"
            >
              <span className="flex min-w-0 items-center gap-3 text-sm font-bold">
                <Mail className="shrink-0" size={18} />{" "}
                <span className="min-w-0 break-all">{contactLinks.email}</span>
              </span>
              <ArrowUpRight className="shrink-0" size={16} />
            </Link>
            <Link
              href="tel:+12164064458"
              className="industrial-panel flex items-center justify-between gap-3 p-3.5 hover:border-[#f05a28] sm:p-4"
            >
              <span className="flex min-w-0 items-center gap-3 text-sm font-bold">
                <Phone className="shrink-0" size={18} /> {contactLinks.phone}
              </span>
              <ArrowUpRight className="shrink-0" size={16} />
            </Link>
            <Link
              href={contactLinks.website}
              target="_blank"
              className="industrial-panel flex items-center justify-between gap-3 p-3.5 hover:border-[#f05a28] sm:p-4"
            >
              <span className="flex min-w-0 items-center gap-3 text-sm font-bold">
                <Globe className="shrink-0" size={18} /> cjst.dev
              </span>
              <ArrowUpRight className="shrink-0" size={16} />
            </Link>
            <div className="industrial-panel flex items-center justify-between gap-3 p-3.5 sm:p-4">
              <span className="flex min-w-0 items-center gap-3 text-sm font-bold">
                <MapPin className="shrink-0" size={18} /> {contactLinks.location}
              </span>
            </div>
            <Link
              href={contactLinks.linkedin}
              target="_blank"
              className="industrial-panel flex items-center justify-between gap-3 p-3.5 hover:border-[#f05a28] sm:p-4"
            >
              <span className="flex min-w-0 items-center gap-3 text-sm font-bold">
                <Linkedin className="shrink-0" size={18} /> LinkedIn
              </span>
              <ArrowUpRight className="shrink-0" size={16} />
            </Link>
            <Link
              href={contactLinks.github}
              target="_blank"
              className="industrial-panel flex items-center justify-between gap-3 p-3.5 hover:border-[#f05a28] sm:p-4"
            >
              <span className="flex min-w-0 items-center gap-3 text-sm font-bold">
                <Github className="shrink-0" size={18} /> GitHub
              </span>
              <ArrowUpRight className="shrink-0" size={16} />
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="industrial-panel p-4 sm:p-5 md:p-6">
          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="spec-label">Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="min-h-12 border border-white/12 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-[#77736a] focus:border-[#f05a28]"
                placeholder="Your name"
              />
            </label>
            <label className="grid gap-2">
              <span className="spec-label">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="min-h-12 border border-white/12 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-[#77736a] focus:border-[#f05a28]"
                placeholder="you@example.com"
              />
            </label>
            <label className="grid gap-2">
              <span className="spec-label">Message</span>
              <textarea
                name="message"
                rows={7}
                value={formData.message}
                onChange={handleChange}
                required
                className="resize-none border border-white/12 bg-black/30 p-4 text-sm text-white outline-none transition placeholder:text-[#77736a] focus:border-[#f05a28]"
                placeholder="Tell me what you are working on."
              />
            </label>
          </div>
          <button
            type="submit"
            className="solid-button mt-5 w-full"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending" : "Send"} <Send size={16} />
          </button>
          {status === "sent" && (
            <p className="mt-4 text-center text-sm font-bold text-[#8bd66f]">
              Message sent. I&apos;ll be in touch.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-center text-sm font-bold text-[#ff8066]">
              Something went wrong. Email me directly.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
