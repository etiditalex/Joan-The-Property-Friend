"use client";

import { useState } from "react";
import { areas, site } from "@/lib/data";

const empty = { name: "", phone: "", email: "", kind: "House", location: "Mombasa", budget: "Under KES 10M", note: "" };

export function EnquiryForm({ interest = "", compact = false }) {
  const [form, setForm] = useState({ ...empty, kind: interest || "House" });
  const [note, setNote] = useState("");

  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (form.name.trim().length < 2 || form.phone.replace(/\D/g, "").length < 9) {
      setNote("Add your name and a phone number Joan can reach.");
      return;
    }
    const summary = `${form.name.trim()} is looking at a ${form.kind.toLowerCase()} in ${form.location}, budget ${form.budget}.`;
    const saved = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (!saved.ok) {
      const json = await saved.json().catch(() => ({}));
      setNote(json.error || "The message did not send. Try again.");
      return;
    }
    setNote(`Thank you, ${form.name.trim()}. ${summary} Joan will use ${form.phone.trim()} to reach you.`);
    if (site.email) {
      const body = encodeURIComponent(`${summary}\nPhone: ${form.phone}\nEmail: ${form.email}\n${form.note}`);
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Enquiry: " + form.kind)}&body=${body}`;
    }
    setForm({ ...empty, kind: interest || "House" });
  };

  return (
    <form className={compact ? "stack" : "form-grid"} onSubmit={submit} id="enquire">
      <label>Name *
        <input value={form.name} onChange={set("name")} required autoComplete="name" />
      </label>
      <label>Phone *
        <span className="phone-row">
          <span>+254</span>
          <input value={form.phone} onChange={set("phone")} required autoComplete="tel" inputMode="tel" />
        </span>
      </label>
      <label>E-mail *
        <input type="email" value={form.email} onChange={set("email")} required autoComplete="email" />
      </label>
      <label>I am looking for *
        <select value={form.kind} onChange={set("kind")}>
          <option>House</option>
          <option>Apartment</option>
          <option>Land</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label>Select your location *
        <select value={form.location} onChange={set("location")}>
          {areas.map((place) => (
            <option key={place}>{place}</option>
          ))}
        </select>
      </label>
      <label>Select your budget *
        <select value={form.budget} onChange={set("budget")}>
          <option>Under KES 10M</option>
          <option>KES 10M – 25M</option>
          <option>KES 25M – 50M</option>
          <option>Over KES 50M</option>
        </select>
      </label>
      <label className="full">Note
        <textarea rows={4} value={form.note} onChange={set("note")} placeholder="A day that suits you, or a listing you already like" />
      </label>
      <div className="form-actions">
        <button className="submit" type="submit">Send to Joan</button>
        <p className="form-note" role="status">{note}</p>
      </div>
    </form>
  );
}
