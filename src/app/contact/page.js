"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [status, setStatus] = useState("idle");

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
    <main className="min-h-screen bg-black text-white px-6 md:px-12 pt-32 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold">Let&rsquo;s Connect.</h1>
          <p className="text-gray-400">
            Whether it&rsquo;s an opportunity, idea, or just a hello — I&rsquo;d
            love to hear from you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-zinc-900 border border-zinc-700 p-8 rounded-2xl"
        >
          <div className="grid gap-4">
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full hover:bg-red-600 transition">
            Send Message
          </Button>
          {status === "sent" && (
            <p className="text-green-500 text-sm text-center">
              Thanks! I&rsquo;ll be in touch.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-sm text-center">
              Something went wrong. Try again later.
            </p>
          )}
        </form>

        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>Or reach out directly:</p>
          <p>
            📧{" "}
            <a href="mailto:cedricsthomasjr@gmail.com" className="underline">
              cedricsthomasjr@gmail.com
            </a>
            <br />
            🔗{" "}
            <a
              href="https://linkedin.com/in/cedricsthomasjr"
              className="underline"
              target="_blank"
            >
              LinkedIn
            </a>
          </p>
        </div>

        {/* Optional: Calendly Embed */}
        {/*
        <div className="mt-12">
          <iframe
            src="https://calendly.com/your-username/15min"
            className="w-full h-[650px] rounded-xl border-none"
            title="Schedule a Call"
          ></iframe>
        </div>
        */}
      </motion.div>
    </main>
  );
}
