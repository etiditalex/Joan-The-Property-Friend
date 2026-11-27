"use client";

import { useRef } from "react";
import { PropertyCard } from "./PropertyCard";

export function Carousel({ properties }) {
  const track = useRef(null);
  const move = (dir) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 640), behavior: "smooth" });
  };

  return (
    <div className="carousel-wrap">
      <button className="card-nav prev" type="button" aria-label="Previous properties" onClick={() => move(-1)}>
        <svg viewBox="0 0 24 24" className="icon"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>
      </button>
      <div className="card-track" ref={track}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      <button className="card-nav next" type="button" aria-label="Next properties" onClick={() => move(1)}>
        <svg viewBox="0 0 24 24" className="icon"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>
      </button>
    </div>
  );
}
