import Link from "next/link";
import { formatPrice } from "@/lib/data";

export function PropertyCard({ property }) {
  return (
    <Link className="pcard" href={`/property/${property.id}`}>
      <div className="pcard-media">
        <img src={property.image} alt={`${property.title} in ${property.place}`} />
      </div>
      <div className="pcard-body">
        <span className="badge">{property.status}</span>
        <h3>{property.title}</h3>
        <p className="excerpt">{property.summary}</p>
        <div className="pcard-foot">
          <div>
            <p className="price-label">Price</p>
            <p className="price">{formatPrice(property.price)}</p>
          </div>
          <span className="buy-now">Buy Now</span>
        </div>
      </div>
    </Link>
  );
}
