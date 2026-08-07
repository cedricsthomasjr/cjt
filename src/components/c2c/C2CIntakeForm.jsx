"use client";

import { useState } from "react";

// Same verified endpoint the main Contact page posts to — one inbox, no new
// account to provision before this is live. Swap this if C2C leads should
// route somewhere else.
const FORMSPREE = "https://formspree.io/f/mldbzvpp";

const NEEDS = ["A new site (Build)", "A redesign (Refresh)", "Ongoing maintenance", "Not sure yet"];

/**
 * The audit request form the hero CTA and pricing cards both point at.
 * Same field treatment as ContactForm — same input classes, same honeypot,
 * same Formspree wiring — but the fields themselves are shaped for a lead
 * qualifying a job, not a recruiter starting a conversation: business name
 * and phone stand in for the resume/portfolio questions Contact doesn't need.
 */
export default function C2CIntakeForm() {
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    need: NEEDS[0],
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const update = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (e.target.company.value) return; // honeypot

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: "C2C audit request" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setForm({ name: "", business: "", email: "", phone: "", need: NEEDS[0], message: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "min-h-12 w-full rounded-md border border-rule bg-raised px-4 py-3 text-[0.9375rem] text-bone outline-none transition-colors placeholder:text-muted/60 focus:border-gold";

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
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
          <span className="t-label">Business name</span>
          <input
            name="business"
            value={form.business}
            onChange={update}
            required
            autoComplete="organization"
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
          <span className="t-label">Phone</span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={update}
            autoComplete="tel"
            className={field}
          />
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="t-label">What do you need?</span>
          <select
            name="need"
            value={form.need}
            onChange={update}
            className={`${field} appearance-none`}
          >
            {NEEDS.map((need) => (
              <option key={need} value={need}>
                {need}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="t-label">Anything else</span>
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={update}
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
        {status === "sending" ? "Sending" : "Request my free audit"}
      </button>

      <p aria-live="polite" className="t-sub-sm mt-4 text-center">
        {status === "sent" && (
          <span className="text-gold">
            Request sent. I&apos;ll follow up within a day.
          </span>
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
