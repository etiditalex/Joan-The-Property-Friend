"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function MessagesTable({ enquiries }) {
  const router = useRouter();
  const [rows, setRows] = useState(enquiries);
  const [picked, setPicked] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setRows(enquiries);
  }, [enquiries]);

  const allMarked = rows.length > 0 && picked.length === rows.length;

  function toggle(id) {
    setPicked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function markAll() {
    setPicked(allMarked ? [] : rows.map((item) => item.id));
  }

  async function remove(ids, label) {
    if (!ids.length || busy) return;
    if (!window.confirm(label)) return;
    setBusy(true);
    setError("");
    const response = await fetch("/api/enquiries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids })
    });
    const json = await response.json().catch(() => ({}));
    setBusy(false);
    if (!response.ok) {
      setError(json.error || "The message was not deleted.");
      return;
    }
    const gone = new Set(ids.map(String));
    setRows((current) => current.filter((item) => !gone.has(String(item.id))));
    setPicked((current) => current.filter((id) => !gone.has(String(id))));
    router.refresh();
  }

  if (!rows.length) {
    return <p style={{ padding: 18 }}>No messages yet. They appear here when someone sends the enquiry form.</p>;
  }

  return (
    <>
      <div className="desk-toolbar">
        <button className="desk-dark" type="button" disabled={!picked.length || busy} onClick={() => remove(picked, picked.length === 1 ? "Delete this message?" : `Delete ${picked.length} messages?`)}>
          Delete
        </button>
        <button className="desk-gold" type="button" disabled={busy} onClick={() => remove(rows.map((item) => item.id), "Delete every message?")}>
          Delete all
        </button>
        <button className="desk-plain" type="button" disabled={!picked.length || busy} onClick={() => setPicked([])}>
          Unmark
        </button>
        {error ? <p className="desk-error">{error}</p> : null}
      </div>
      <div className="desk-table-wrap">
        <table className="desk-table">
          <thead>
            <tr>
              <th className="desk-check">
                <input type="checkbox" checked={allMarked} onChange={markAll} aria-label="Mark all messages" />
              </th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Looking for</th>
              <th>Place</th>
              <th>Note</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id}>
                <td className="desk-check">
                  <input
                    type="checkbox"
                    checked={picked.includes(item.id)}
                    onChange={() => toggle(item.id)}
                    aria-label={`Mark ${item.name}`}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.kind}</td>
                <td>{item.location}</td>
                <td>{item.note}</td>
                <td>
                  <button className="desk-plain" type="button" disabled={busy} onClick={() => remove([item.id], "Delete this message?")}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
