import Link from "next/link";
import { currentSession } from "@/lib/auth";
import { formatPrice } from "@/lib/data";
import { listEnquiries, listPosts, listProperties } from "@/lib/store";

export const dynamic = "force-dynamic";

function greeting() {
  const hour = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Nairobi", hour: "numeric", hourCycle: "h23" }).format(new Date()));
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function displayName(session) {
  const email = session?.email || "Joan";
  if (!email.includes("@")) return email;
  return email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function DashboardPage() {
  const [properties, posts, enquiries, session] = await Promise.all([
    listProperties(),
    listPosts(),
    listEnquiries(),
    currentSession()
  ]);
  const available = properties.filter((item) => item.status === "Available").length;
  const featured = properties.find((item) => item.type === "house") || properties[0];
  const listed = properties.find((item) => item.id !== featured?.id) || featured;

  return (
    <>
      <h2 className="dash-hello">{greeting()} {displayName(session)} <span aria-hidden="true">👋</span></h2>
      {featured ? (
        <div className="dash-hero">
          <article className="offer-card">
            <div>
              <h2>Explore this {featured.typeLabel.toLowerCase()} on the coast.</h2>
              <p>{featured.place}</p>
              <Link href={`/admin/property/${featured.id}`}>Explore Now</Link>
            </div>
            <img src={featured.image} alt={featured.title} />
          </article>
          {listed ? (
            <article className="offer-side">
              <header>
                <h2>Property List</h2>
                <Link href="/admin/property">See all</Link>
              </header>
              <Link className="offer-photo" href={`/admin/property/${listed.id}`}>
                <img src={listed.image} alt="" />
                <span>{available} available</span>
              </Link>
              <strong>{listed.title}</strong>
              <p>{listed.place}{listed.size ? ` · ${listed.size}` : ""}</p>
              <b>{formatPrice(listed.price)}</b>
            </article>
          ) : null}
        </div>
      ) : null}
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
