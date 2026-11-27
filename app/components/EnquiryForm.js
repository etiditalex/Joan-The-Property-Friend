"use client";

import { useState } from "react";
import { areas, site } from "@/lib/data";

export function EnquiryForm({ interest = "", compact = false }) {
  const [note, setNote] = useState("");
  const [failed, setFailed] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      email: String(data.get("email") || "").trim(),
      kind: String(data.get("kind") || "House"),
      location: String(data.get("location") || ""),
      budget: String(data.get("budget") || ""),
      note: String(data.get("note") || "").trim()
    };
    if (payload.name.length < 2 || payload.phone.replace(/\D/g, "").length < 9) {
      setFailed(true);
      setNote("Add your name and a phone number Joan can reach.");
      return;
    }
    setSending(true);
    setFailed(false);
    setNote("");
    try {
      const saved = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await saved.json().catch(() => null);
      if (!saved.ok || result?.ok !== true) {
        setFailed(true);
        const error = typeof result?.error === "string" && result.error.trim();
        setNote(
          saved.status >= 500 || !error
            ? "We couldn't confirm receipt of your enquiry. Please try again or email Joan directly."
            : error
        );
        return;
      }
      setNote(`Thank you, ${payload.name}. We received your enquiry. Joan will use ${payload.phone} to reach you.`);
      form.reset();
    } catch {
      setFailed(true);
      setNote("We couldn't confirm receipt of your enquiry. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form className={compact ? "stack" : "form-grid"} onSubmit={submit} id="enquire">
      <label>Name *
        <input name="name" required autoComplete="name" />
      </label>
      <label>Phone *
        <span className="phone-row">
          <span>+254</span>
          <input name="phone" required autoComplete="tel" inputMode="tel" />
        </span>
      </label>
      <label>E-mail *
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>I am looking for *
        <select name="kind" defaultValue={interest || "House"}>
          <option>House</option>
          <option>Apartment</option>
          <option>Land</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label>Select your location *
        <select name="location" defaultValue="Mombasa">
          {areas.map((place) => (
            <option key={place}>{place}</option>
          ))}
        </select>
      </label>
      <label>Select your budget *
        <select name="budget" defaultValue="Under KES 10M">
          <option>Under KES 10M</option>
          <option>KES 10M – 25M</option>
          <option>KES 25M – 50M</option>
          <option>Over KES 50M</option>
        </select>
      </label>
      <label className="full">Note
        <textarea name="note" rows={4} placeholder="A day that suits you, or a listing you already like" />
      </label>
      <div className="form-actions">
        <p className={failed ? "form-note is-error" : "form-note"} role="status">
          {note}
          {failed && site.email && <> <a href={`mailto:${site.email}`}>Email Joan</a></>}
        </p>
        <button className="submit" type="submit" disabled={sending}>{sending ? "Sending…" : "Send to Joan"}</button>
      </div>
    </form>
  );
}
