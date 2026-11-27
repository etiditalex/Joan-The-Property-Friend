import Link from "next/link";
import { formatPrice } from "@/lib/data";
import { listEnquiries, listPosts, listProperties } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [properties, posts, enquiries] = await Promise.all([listProperties(), listPosts(), listEnquiries()]);
  const available = properties.filter((item) => item.status === "Available").length;

  return (
    <>
      <div className="desk-stats">
        <article className="desk-stat"><span>Properties</span><strong>{properties.length}</strong></article>
        <article className="desk-stat"><span>Available</span><strong>{available}</strong></article>
        <article className="desk-stat"><span>Blog posts</span><strong>{posts.length}</strong></article>
        <article className="desk-stat"><span>Messages</span><strong>{enquiries.length}</strong></article>
      </div>
      <section className="desk-panel">
        <h2>Latest properties</h2>
        <table className="desk-table">
          <thead>
            <tr><th>Title</th><th>Place</th><th>Price</th><th>Status</th></tr>
          </thead>
          <tbody>
            {properties.slice(0, 8).map((property) => (
              <tr key={property.id}>
                <td><Link href={`/admin/property/${property.id}`}>{property.title}</Link></td>
                <td>{property.place}</td>
                <td>{formatPrice(property.price)}</td>
                <td>{property.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
