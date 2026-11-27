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
      const text = await saved.text();
      let json = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch {
        json = {};
      }
      if (!saved.ok || !text) {
        setFailed(true);
        setNote(json.error || "The message did not send. Please try again.");
        setSending(false);
        return;
      }
      const summary = `${payload.name} is looking at a ${payload.kind.toLowerCase()} in ${payload.location}, budget ${payload.budget}.`;
      setFailed(false);
      setNote(`Thank you, ${payload.name}. ${summary} Joan will use ${payload.phone} to reach you.`);
      form.reset();
      if (site.email) {
        const body = encodeURIComponent(`${summary}\nPhone: ${payload.phone}\nEmail: ${payload.email}\n${payload.note}`);
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Enquiry: " + payload.kind)}&body=${body}`;
      }
    } catch {
      setFailed(true);
      setNote("The message did not send. Check your connection and try again.");
    }
    setSending(false);
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
        <p className={failed ? "form-note is-error" : "form-note"} role="status">{note}</p>
        <button className="submit" type="submit" disabled={sending}>{sending ? "Sending…" : "Send to Joan"}</button>
      </div>
    </form>
  );
}
