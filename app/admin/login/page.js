"use client";

import { useState } from "react";
import { site } from "@/lib/data";
import "../admin.css";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: String(form.get("email") || "").trim(),
        password: String(form.get("password") || "")
      })
    });
    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(json.error || "That email or password is not a desk login.");
      return;
    }
    window.location.href = "/admin";
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <img src={site.logo} alt="" />
        <h1>Joan</h1>
        <p>Sign in with the email and password created in Supabase.</p>
        <form onSubmit={submit}>
          <label>
            Email
            <input name="email" type="email" autoComplete="username" required />
          </label>
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button type="submit">Sign in</button>
          {error ? <p className="desk-error">{error}</p> : null}
        </form>
      </div>
    </div>
  );
}
