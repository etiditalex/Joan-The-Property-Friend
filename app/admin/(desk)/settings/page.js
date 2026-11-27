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
      <p>Run the SQL in supabase/schema.sql, then put SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local and restart the site.</p>
      <button className="desk-gold" type="button" onClick={seed}>Copy starter listings into Supabase</button>
      {note ? <p>{note}</p> : null}
      <button className="desk-dark" type="button" onClick={signOut}>Sign out</button>
    </section>
  );
}
