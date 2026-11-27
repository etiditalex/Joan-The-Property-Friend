import Link from "next/link";
import { getPropertyRecord } from "@/lib/store";
import { PropertyView } from "../../../property/[id]/view";

export const dynamic = "force-dynamic";

export default async function PropertyPreviewPage({ params }) {
  const { id } = await params;
  const property = await getPropertyRecord(id);
  if (!property) {
    return (
      <section className="page-intro">
        <h1>That property is not on the list</h1>
        <p className="lede"><Link href="/admin/property">Back to properties</Link></p>
      </section>
    );
  }
  return <PropertyView property={property} />;
}
