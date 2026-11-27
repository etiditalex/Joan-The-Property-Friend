import Link from "next/link";
import { Carousel } from "./components/Carousel";
import { EnquiryForm } from "./components/EnquiryForm";
import { Hero } from "./components/Hero";
import { collections, reasons } from "@/lib/data";
import { listProperties } from "@/lib/store";

const icons = [
  "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  "M4 8h16v10H4zM8 8V6h8v2",
  "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 19c.6-2.4 2.4-3.5 4-3.5s3.4 1.1 4 3.5M12 19c.6-2.4 2.4-3.5 4-3.5s3.4 1.1 4 3.5",
  "M8 13l2 2 4-5M4 7h16v12H4z",
  "M3 12s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6zM12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12.5a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z"
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const properties = await listProperties();
  return (
    <>
      <Hero />
      <section className="band">
        <h2>Join the Family</h2>
        <p className="lede">
          Joan’s list is as varied as the reason you are looking. A house to live in, an apartment on the coast, or land you can build on across Mombasa, Kilifi, Malindi, and Kwale. Choose what fits, then ask for a private viewing.
        </p>
        <Carousel properties={properties} />
      </section>
      <section className="block">
        <h2>Why Joan</h2>
        <div className="why-grid">
          {reasons.map((reason, index) => (
            <article key={reason.title}>
              <div className="why-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d={icons[index]} fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
              </div>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="block" style={{ paddingTop: 10 }}>
        <div className="section-head">
          <h2>Our Collection</h2>
          <Link className="discover" href="/for-sale">Discover More</Link>
        </div>
        <div className="collection">
          {collections.map((item) => (
            <Link key={item.title + item.place} href={item.href} style={{ backgroundImage: `url(${item.image})` }}>
              <span>
                <em>{item.place}</em>
                <strong>{item.title}</strong>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="enquire-band">
        <h2>For more information, fill out the form</h2>
        <p className="lede">Tell Joan whether you want a house, an apartment, or land. She will come back on the number you leave.</p>
        <EnquiryForm />
      </section>
    </>
  );
}
