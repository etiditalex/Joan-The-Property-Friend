"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { areas, formatPrice } from "@/lib/data";

const types = [
  ["all", "All types", "Properties", "property", "properties"],
  ["house", "Houses", "Houses", "house", "houses"],
  ["apartment", "Apartments", "Apartments", "apartment", "apartments"],
  ["land", "Land", "Land", "plot", "plots"]
];

function validType(value) {
  return types.some(([id]) => id === value) ? value : "all";
}

function SaleCatalog({ properties }) {
  const params = useSearchParams();
  const bedOptions = [...new Set(properties.map((item) => item.beds).filter((value) => value !== null))].sort((a, b) => a - b);
  const bathOptions = [...new Set(properties.map((item) => item.baths).filter((value) => value !== null))].sort((a, b) => a - b);
  const statuses = [...new Set(properties.map((item) => item.status))];
  const starting = {
    type: validType(params.get("type")),
    location: "",
    beds: "",
    baths: "",
    min: "",
    max: "",
    status: ""
  };
  const [draft, setDraft] = useState(starting);
  const [applied, setApplied] = useState(starting);

  const list = useMemo(() => {
    const min = Number(applied.min);
    const max = Number(applied.max);
    return properties.filter((item) => {
      if (applied.type !== "all" && item.type !== applied.type) return false;
      if (applied.location && item.area !== applied.location) return false;
      if (applied.beds !== "" && item.beds !== Number(applied.beds)) return false;
      if (applied.baths !== "" && item.baths !== Number(applied.baths)) return false;
      if (applied.min !== "" && item.price < min) return false;
      if (applied.max !== "" && item.price > max) return false;
      if (applied.status && item.status !== applied.status) return false;
      return true;
    });
  }, [applied, properties]);

  const kind = types.find(([id]) => id === applied.type) || types[0];
  const noun = list.length === 1 ? kind[3] : kind[4];

  function setField(key, value) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="sale-page">
      <form
        className="sale-filters"
        onSubmit={(event) => {
          event.preventDefault();
          setApplied(draft);
        }}
      >
        <select aria-label="Property type" value={draft.type} onChange={(event) => setField("type", event.target.value)}>
          {types.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
        </select>
        <select aria-label="Location" value={draft.location} onChange={(event) => setField("location", event.target.value)}>
          <option value="">Coast</option>
          {areas.map((place) => <option key={place} value={place}>{place}</option>)}
        </select>
        <select aria-label="Bedrooms" value={draft.beds} onChange={(event) => setField("beds", event.target.value)}>
          <option value="">Beds</option>
          {bedOptions.map((count) => <option key={count} value={count}>{count === 0 ? "Studio" : count}</option>)}
        </select>
        <select aria-label="Bathrooms" value={draft.baths} onChange={(event) => setField("baths", event.target.value)}>
          <option value="">Baths</option>
          {bathOptions.map((count) => <option key={count} value={count}>{count}</option>)}
        </select>
        <input aria-label="Minimum price" inputMode="numeric" placeholder="Min Price" value={draft.min} onChange={(event) => setField("min", event.target.value.replace(/[^\d]/g, ""))} />
        <input aria-label="Maximum price" inputMode="numeric" placeholder="Max Price" value={draft.max} onChange={(event) => setField("max", event.target.value.replace(/[^\d]/g, ""))} />
        <select aria-label="Status" value={draft.status} onChange={(event) => setField("status", event.target.value)}>
          <option value="">Status</option>
          {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
        <button type="submit">Search</button>
      </form>

      <div className="sale-body">
        <nav className="sale-crumb" aria-label="Breadcrumb">
          <Link href="/" aria-label="Home">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" /></svg>
          </Link>
          <span aria-hidden="true">›</span>
          <span>{kind[2]} for Sale</span>
        </nav>
        <h1>{kind[2]} for Sale, the Coast</h1>
        <p className="sale-count">{list.length} {noun.charAt(0).toUpperCase() + noun.slice(1)}.</p>

        {list.length ? (
          <ul className="sale-list">
            {list.map((property) => (
              <li className="sale-item" key={property.id}>
                <article className="sale-row">
                  <Link className="sale-image" href={`/property/${property.id}`}>
                    <img src={property.image} alt={`${property.title} in ${property.place}`} />
                  </Link>
                  <div className="sale-info">
                    <div className="sale-top">
                      <span className="sale-badge">{property.status}</span>
                      <p className="sale-price">{formatPrice(property.price)}</p>
                    </div>
                    <h3><Link href={`/property/${property.id}`}>{property.title}</Link></h3>
                    <p className="sale-place">{property.place}</p>
                    <ul className="sale-points">
                      {(property.points || []).slice(0, 2).map((point) => <li key={point}>{point}</li>)}
                    </ul>
                    <div className="sale-actions">
                      <Link className="sale-contact" href="/contact">Contact Us</Link>
                      <Link className="sale-more" href={`/property/${property.id}`}>More Information</Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="sale-empty">Nothing matches that search. Widen the filters, or ask Joan.</p>
        )}
      </div>
    </div>
  );
}

export function ForSaleCatalog({ properties }) {
  return (
    <Suspense fallback={<div className="sale-page"><div className="sale-body"><h1>For Sale</h1></div></div>}>
      <SaleCatalog properties={properties} />
    </Suspense>
  );
}
