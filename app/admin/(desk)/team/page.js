"use client";

import { useEffect, useState } from "react";

export default function TeamPage() {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [blocked, setBlocked] = useState(false);

  async function load() {
    const response = await fetch("/api/admin/staff");
    const json = await response.json();
    if (response.status === 403) {
      setBlocked(true);
      return;
    }
    if (!response.ok) {
      setError(json.error || "The desk logins could not be loaded.");
      return;
    }
    setPeople(json.people || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setNote("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
        role: form.get("role")
      })
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error || "The login was not created.");
      return;
    }
    event.currentTarget.reset();
    setNote(`${json.email} can now sign in as ${json.role === "manager" ? "a manager" : "an admin"}.`);
    load();
  }

  if (blocked) {
    return <section className="desk-form"><h2>Team</h2><p>Only an admin can create desk logins.</p></section>;
  }

  return (
    <section className="desk-form">
      <h2>Add a desk login</h2>
      <p>Use an email as the username. The new admin or manager signs in with that email and password.</p>
      <form onSubmit={submit} className="desk-form" style={{ padding: 0, border: 0 }}>
        <label>Email
          <input name="email" type="email" autoComplete="off" required />
        </label>
        <label>Password
          <input name="password" type="password" autoComplete="new-password" minLength={8} required />
        </label>
        <label>Role
          <select name="role" defaultValue="manager">
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </label>
        <button className="desk-gold" type="submit">Create login</button>
      </form>
      {error ? <p className="desk-error">{error}</p> : null}
      {note ? <p>{note}</p> : null}
      <h2 style={{ marginTop: 8 }}>Desk logins</h2>
      <table className="desk-table">
        <thead><tr><th>Email</th><th>Role</th></tr></thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{person.email}</td>
              <td>{person.role === "manager" ? "Manager" : "Admin"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
