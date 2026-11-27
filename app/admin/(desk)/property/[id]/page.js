import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, site } from "@/lib/data";
import { getPropertyRecord } from "@/lib/store";
import { DetailHero } from "../../../detail-hero";
import { DeleteProperty } from "./delete";

export const dynamic = "force-dynamic";

export default async function PropertyDetailPage({ params }) {
  const { id } = await params;
  const property = await getPropertyRecord(id, { includeDrafts: true });
  if (!property) notFound();
  const shots = property.gallery?.length ? property.gallery : [property.image];

  return (
    <>
      <DetailHero property={property} />
      <div className="detail-grid">
        <aside className="detail-person">
          <h3>Joan</h3>
          <p className="role">{site.tagline}</p>
          <p className="address">{site.address}</p>
          <div className="detail-price">
            <span>Guide price</span>
            <strong>{formatPrice(property.price)}</strong>
          </div>
          <div className="desk-actions" style={{ marginTop: 16 }}>
            <Link className="desk-gold" href={`/admin/property/${property.id}/edit`}>Edit</Link>
          </div>
          <DeleteProperty id={property.id} />
        </aside>
        <div className="detail-copy">
          <h3>Description</h3>
          <p>{property.description || property.summary}</p>
          <h3 style={{ marginTop: 22 }}>Gallery</h3>
          <div className="detail-shots">
            {shots.map((src) => <img key={src} src={src} alt="" />)}
          </div>
          <div className="detail-where">
            <h3>Location</h3>
            <p>{property.place}</p>
            <p>{property.area}</p>
          </div>
        </div>
      </div>
    </>
  );
}
