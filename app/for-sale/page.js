import { listProperties } from "@/lib/store";
import { ForSaleCatalog } from "./catalog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "For Sale | Joan Property Friend",
  description: "Houses, apartments, and land for sale across Mombasa, Kilifi, Malindi, and Kwale."
};

export default async function ForSalePage() {
  const properties = await listProperties();
  return <ForSaleCatalog properties={properties} />;
}
