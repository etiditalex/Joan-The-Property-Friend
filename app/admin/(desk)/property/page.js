import Link from "next/link";
import { formatPrice } from "@/lib/data";
import { listProperties } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function PropertyListPage({ searchParams }) {
  const params = await searchParams;
  const query = String(params.q || "").trim().toLowerCase();
  const previewId = String(params.preview || "");
  const properties = (await listProperties()).filter((item) => {
    if (!query) return true;
    return `${item.title} ${item.place} ${item.type} ${item.status}`.toLowerCase().includes(query);
  });
  const preview = properties.find((item) => item.id === previewId) || null;
  const closeHref = query ? `/admin/property?q=${encodeURIComponent(query)}` : "/admin/property";

  return (
    <>
      <div className="desk-actions">
        <Link className="desk-gold" href="/admin/property/new">Add property</Link>
        <Link className="desk-dark" href="/admin/blog/new">Add blog post</Link>
      </div>
      <section className="desk-panel" style={{ marginTop: 0 }}>
        <table className="desk-table">
          <thead>
            <tr><th>Title</th><th>Type</th><th>Place</th><th>Price</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td><Link href={`/admin/property/${property.id}`}>{property.title}</Link></td>
                <td>{property.typeLabel}</td>
                <td>{property.place}</td>
                <td>{formatPrice(property.price)}</td>
                <td>{property.status}</td>
                <td><Link href={`/admin/property?preview=${property.id}${query ? `&q=${encodeURIComponent(query)}` : ""}`}>Preview</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        {properties.length ? null : <p style={{ padding: 18 }}>No property matches that search.</p>}
      </section>
      {preview ? (
        <section className="desk-preview">
          <div className="desk-preview-bar">
            <strong>{preview.title}</strong>
            <Link href={closeHref}>Close preview</Link>
          </div>
          <iframe src={`/desk-preview/property/${preview.id}`} title={`Preview ${preview.title}`} />
        </section>
      ) : null}
    </>
  );
}
