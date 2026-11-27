"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [status, setStatus] = useState("Checking the database…");
  const [note, setNote] = useState("");

  useEffect(() => {
    fetch("/api/admin/status").then((response) => response.json()).then((json) => setStatus(json.message));
  }, []);

  async function seed() {
    const response = await fetch("/api/admin/seed", { method: "POST" });
    const json = await response.json();
    setNote(response.ok ? "Starter listings and the sample post are in Supabase." : json.error);
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <section className="desk-form">
      <h2>Database</h2>
      <p>{status}</p>
      <p>Desk sign-in uses the email and password from Supabase Authentication. Create the first user there, then add other admins and managers from Team. Put SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel, and leave public sign-up turned off.</p>
      <button className="desk-gold" type="button" onClick={seed}>Copy starter listings into Supabase</button>
      {note ? <p>{note}</p> : null}
      <button className="desk-dark" type="button" onClick={signOut}>Sign out</button>
    </section>
  );
}
