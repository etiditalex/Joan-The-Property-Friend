import Link from "next/link";
import { getPropertyRecord } from "@/lib/store";
import { PropertyView } from "./view";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = await getPropertyRecord(id);
  if (!property) return { title: "Property | Joan Property Friend" };
  return { title: `${property.title} | Joan Property Friend`, description: property.summary || property.description };
}

export default async function PropertyPage({ params }) {
  const { id } = await params;
  const property = await getPropertyRecord(id);
  if (!property) {
    return (
      <section className="page-intro">
        <h1>That property is not on the list</h1>
        <p className="lede"><Link href="/for-sale">Back to everything for sale</Link></p>
      </section>
    );
  }
  return <PropertyView property={property} />;
}
