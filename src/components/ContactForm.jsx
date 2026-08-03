"use client";

import { useState } from "react";

const FORMSPREE = "https://formspree.io/f/mldbzvpp";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const update = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    // Bots fill every field they find; a real person never sees this one.
    if (e.target.company.value) return;

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "min-h-12 w-full rounded-md border border-rule bg-raised px-4 py-3 text-[0.9375rem] text-bone outline-none transition-colors placeholder:text-muted/60 focus:border-gold";

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8">
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="t-label">Name</span>
          <input
            name="name"
            value={form.name}
            onChange={update}
            required
            autoComplete="name"
            className={field}
          />
        </label>

        <label className="grid gap-2">
          <span className="t-label">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            required
            autoComplete="email"
            className={field}
          />
        </label>

        <label className="grid gap-2">
          <span className="t-label">Message</span>
          <textarea
            name="message"
            rows={6}
            value={form.message}
            onChange={update}
            required
            className={`${field} resize-none`}
          />
        </label>

        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px]"
        />
      </div>

      <button
        type="submit"
        className="btn-solid mt-6 w-full disabled:opacity-60"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending" : "Send message"}
      </button>

      <p aria-live="polite" className="t-sub-sm mt-4 text-center">
        {status === "sent" && (
          <span className="text-gold">Message sent. I&apos;ll reply soon.</span>
        )}
        {status === "error" && (
          <span className="text-bone">
            That did not go through. Email me directly and it will reach me.
          </span>
        )}
      </p>
    </form>
  );
}
