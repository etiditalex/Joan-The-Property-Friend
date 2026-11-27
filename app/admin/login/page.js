"use client";

import { useState } from "react";
import { site } from "@/lib/data";
import "../admin.css";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get("password") || "").trim();
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    if (!response.ok) {
      setError("That password is not the admin password.");
      return;
    }
    window.location.href = "/admin";
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <img src={site.logo} alt="" />
        <h1>Joan</h1>
        <p>Sign in to add a property or a blog post.</p>
        <form onSubmit={submit}>
          <label>
            Password
            <input name="password" type="password" autoComplete="off" required />
          </label>
          <button type="submit">Sign in</button>
          {error ? <p className="desk-error">{error}</p> : null}
        </form>
      </div>
    </div>
  );
}
