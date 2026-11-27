"use client";

export function DeleteProperty({ id }) {
  async function remove() {
    if (!window.confirm("Remove this property from the site?")) return;
    const response = await fetch(`/api/properties/${id}`, { method: "DELETE" });
    if (response.ok) window.location.href = "/admin/property";
  }

  return <button className="desk-dark" type="button" onClick={remove} style={{ marginTop: 10 }}>Delete</button>;
}
