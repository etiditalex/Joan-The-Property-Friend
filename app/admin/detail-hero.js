"use client";

import { useState } from "react";
import { site } from "@/lib/data";

export function DetailHero({ property }) {
  const shots = property.gallery?.length ? property.gallery : [property.image];
  const [index, setIndex] = useState(0);
  const shot = shots[index % shots.length];
  const specs = [];
  if (property.beds) specs.push(`${property.beds} Bedroom${property.beds === 1 ? "" : "s"}`);
  else if (property.beds === 0) specs.push("Studio");
  if (property.baths) specs.push(`${property.baths} Bathroom${property.baths === 1 ? "" : "s"}`);
  if (property.extra) specs.push(property.extra);

  return (
    <div className="detail-hero">
      <img src={shot} alt="" />
      <span className="detail-status">{property.status}</span>
      <div className="detail-agent">
        <img src={site.logo} alt="" />
      </div>
      <div className="detail-caption">
        <h2>{property.title}</h2>
        {specs.length ? <p className="detail-specs">{specs.map((item) => <span key={item}>{item}</span>)}</p> : null}
      </div>
      <p className="detail-count">{index + 1} of {shots.length}</p>
      {shots.length > 1 ? (
        <button className="detail-next" type="button" aria-label="Next photo" onClick={() => setIndex((value) => (value + 1) % shots.length)}>→</button>
      ) : null}
    </div>
  );
}
