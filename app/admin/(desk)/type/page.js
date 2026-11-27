import Link from "next/link";
import { listProperties } from "@/lib/store";

export const dynamic = "force-dynamic";

const types = [
  ["house", "Houses"],
  ["apartment", "Apartments"],
  ["land", "Land"]
];

export default async function TypePage() {
  const properties = await listProperties();
  return (
    <div className="desk-stats">
      {types.map(([id, label]) => (
        <article className="desk-stat" key={id}>
          <span>{label}</span>
          <strong>{properties.filter((item) => item.type === id).length}</strong>
          <p style={{ marginTop: 10 }}><Link href={`/admin/property?q=${id}`}>{label} in the list</Link></p>
        </article>
      ))}
    </div>
  );
}
