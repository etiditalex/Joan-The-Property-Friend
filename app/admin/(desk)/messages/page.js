import { listEnquiries } from "@/lib/store";
import { MessagesTable } from "../../messages-table";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const enquiries = await listEnquiries();
  return (
    <section className="desk-panel" style={{ marginTop: 0 }}>
      <h2>Messages</h2>
      <MessagesTable enquiries={enquiries} />
    </section>
  );
}
