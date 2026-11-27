"use client";

import Link from "next/link";
import { useState } from "react";
import { EnquiryForm } from "../../components/EnquiryForm";
import { formatPrice } from "@/lib/data";

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PropertyView({ property }) {
  const [shot, setShot] = useState(0);
  const plural = { house: "Houses", apartment: "Apartments", land: "Land" }[property.type];
  const shots = property.gallery?.length ? property.gallery : [property.image];
  const active = shots[Math.min(shot, shots.length - 1)];
  const specs = [];
  if (property.beds) specs.push(["bed", `${property.beds} Bedroom${property.beds === 1 ? "" : "s"}`]);
  else if (property.beds === 0) specs.push(["bed", "Studio"]);
  if (property.baths) specs.push(["bath", `${property.baths} Bathroom${property.baths === 1 ? "" : "s"}`]);
  if (property.size) specs.push(["size", property.size]);
  if (property.extra) specs.push(["pin", property.extra]);

  const icons = {
    bed: "M3 18V9m0 5h18M7 14v-3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3M21 18V11a2 2 0 0 0-2-2h-2",
    bath: "M5 12h14v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-3Zm2-2V7a3 3 0 0 1 6 0M7 19v2M17 19v2",
    size: "M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4",
    pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"
  };

  return (
    <article className="property-page">
      <nav className="sale-crumb" aria-label="Breadcrumb">
        <Link href="/" aria-label="Home">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" /></svg>
        </Link>
        <span aria-hidden="true">›</span>
        <Link href={`/for-sale?type=${property.type}`}>{plural}</Link>
        <span aria-hidden="true">›</span>
        <span>{property.title}</span>
      </nav>

      <header className="property-head">
        <div>
          <h1>{property.title}</h1>
          <p className="property-price"><span>Price</span> <strong>{formatPrice(property.price)}</strong></p>
        </div>
        <span className="sale-badge">{property.status}</span>
      </header>

      <div className={shots.length > 1 ? "property-gallery" : "property-gallery solo"}>
        <div className="property-hero">
          <img src={active} alt={property.title} />
        </div>
        {shots.length > 1 ? (
          <div className="property-side">
            {shots.map((src, index) => (
              <button key={`${src}-${index}`} type="button" aria-label={`Photo ${index + 1}`} aria-current={index === shot ? "true" : undefined} onClick={() => setShot(index)}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="property-layout">
        <div className="property-copy">
          <h2>{property.title}</h2>
          <p className="property-place">{property.place}</p>
          <p className="property-lead">{property.description}</p>

          {specs.length ? (
            <>
              <h3>Property Features:</h3>
              <ul className="property-specs">
                {specs.map(([icon, label]) => (
                  <li key={label}><Icon d={icons[icon]} />{label}</li>
                ))}
              </ul>
            </>
          ) : null}

          {(property.points || []).length ? (
            <>
              <h3>Features:</h3>
              <ul className="property-features">
                {property.points.map((point) => (
                  <li key={point}>
                    <span className="feature-mark" aria-hidden="true">
                      <Icon d="M5 12.5 9.2 17 19 7" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        <aside className="property-aside">
          <h2>For more information, fill out the form</h2>
          <EnquiryForm compact interest={property.typeLabel} />
        </aside>
      </div>
    </article>
  );
}
