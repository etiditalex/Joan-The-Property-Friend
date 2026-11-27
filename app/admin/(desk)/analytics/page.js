import Link from "next/link";
import { BarList, ColumnChart, PieChart, chartColor } from "../../charts";
import { listEnquiries, listProperties, listViews } from "@/lib/store";

export const dynamic = "force-dynamic";

const kindLabel = {
  home: "Home",
  catalog: "For sale",
  property: "Property",
  blog: "Blog",
  article: "Article",
  contact: "Contact",
  about: "About"
};

function dayKey(value) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Nairobi" }).format(new Date(value));
}

function lastDays(count) {
  const days = [];
  const [year, month, day] = dayKey(new Date()).split("-").map(Number);
  for (let offset = count - 1; offset >= 0; offset -= 1) {
    const date = new Date(Date.UTC(year, month - 1, day - offset, 12));
    const key = dayKey(date);
    const label = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Nairobi", day: "numeric", month: "short" }).format(date);
    days.push({ key, label });
  }
  return days;
}

function slicesFrom(pairs) {
  return pairs.filter(([, value]) => value > 0).map(([label, value], index) => ({
    label,
    value,
    color: chartColor(index)
  }));
}

function countBy(items, labelFor) {
  const totals = new Map();
  items.forEach((item) => {
    const label = labelFor(item);
    if (!label) return;
    totals.set(label, (totals.get(label) || 0) + 1);
  });
  return [...totals.entries()].sort((a, b) => b[1] - a[1]);
}

export default async function AnalyticsPage() {
  const [{ views, warning }, properties, enquiries] = await Promise.all([
    listViews(),
    listProperties(),
    listEnquiries()
  ]);
  const propertyViews = views.filter((view) => view.kind === "property" && view.propertyId);
  const byProperty = countBy(propertyViews, (view) => view.propertyId);
  const ranked = byProperty.map(([id, value]) => {
    const property = properties.find((item) => item.id === id);
    const sample = propertyViews.find((view) => view.propertyId === id);
    return {
      id,
      label: property?.title || sample?.title || id,
      place: property?.place || "",
      type: property?.typeLabel || "Property",
      value
    };
  });
  const most = ranked[0] || null;
  const days = lastDays(14).map((day) => ({
    ...day,
    value: views.filter((view) => view.createdAt && dayKey(view.createdAt) === day.key).length
  }));
  const pageSlices = slicesFrom(countBy(views, (view) => kindLabel[view.kind] || "Page"));
  const typeSlices = slicesFrom(countBy(propertyViews, (view) => {
    const property = properties.find((item) => item.id === view.propertyId);
    return property?.typeLabel || "Property";
  }));
  const askSlices = slicesFrom(countBy(enquiries, (item) => item.kind || "Not stated"));
  const placeSlices = slicesFrom(countBy(enquiries, (item) => item.location || "Not stated"));

  return (
    <>
      <div className="desk-stats">
        <article className="desk-stat"><span>Visits</span><strong>{views.length}</strong></article>
        <article className="desk-stat"><span>Property visits</span><strong>{propertyViews.length}</strong></article>
        <article className="desk-stat"><span>Enquiries</span><strong>{enquiries.length}</strong></article>
        <article className="desk-stat"><span>Pages opened</span><strong>{new Set(views.map((view) => view.path)).size}</strong></article>
      </div>

      <section className="analytics-lead">
        <p>Most visited property</p>
        {most ? (
          <>
            <h2>{most.label}</h2>
            <span>{[most.place, most.type, `${most.value} ${most.value === 1 ? "visit" : "visits"}`].filter(Boolean).join(" · ")}</span>
            <Link href={`/admin/property/${most.id}`}>Open property</Link>
          </>
        ) : <h2>No property has been opened yet.</h2>}
      </section>

      {warning ? <p className="desk-error" style={{ marginTop: 16 }}>{warning}. Run the views table in supabase/schema.sql, and use the service role key so this desk can read the visits.</p> : null}

      <div className="analytics-grid">
        <section className="desk-panel">
          <h2>Visits over 14 days</h2>
          <ColumnChart bars={days} />
        </section>
        <section className="desk-panel">
          <h2>Where people go</h2>
          <PieChart slices={pageSlices} />
        </section>
        <section className="desk-panel">
          <h2>Property types opened</h2>
          <PieChart slices={typeSlices} />
        </section>
        <section className="desk-panel">
          <h2>Most visited properties</h2>
          <BarList rows={ranked.slice(0, 8)} />
        </section>
        <section className="desk-panel">
          <h2>What enquiries ask for</h2>
          <PieChart slices={askSlices} />
        </section>
        <section className="desk-panel">
          <h2>Where enquiries are looking</h2>
          <PieChart slices={placeSlices} />
        </section>
      </div>
    </>
  );
}
