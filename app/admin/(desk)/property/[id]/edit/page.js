import { notFound } from "next/navigation";
import { getPropertyRecord } from "@/lib/store";
import { PropertyForm } from "../../../../property-form";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({ params }) {
  const { id } = await params;
  const property = await getPropertyRecord(id);
  if (!property) notFound();
  return <PropertyForm property={property} />;
}
