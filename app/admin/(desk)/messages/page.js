import { listEnquiries } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const enquiries = await listEnquiries();
  return (
    <section className="desk-panel" style={{ marginTop: 0 }}>
      <h2>Messages</h2>
      {enquiries.length ? (
        <table className="desk-table">
          <thead>
            <tr><th>Name</th><th>Phone</th><th>Looking for</th><th>Place</th><th>Note</th></tr>
          </thead>
          <tbody>
            {enquiries.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.kind}</td>
                <td>{item.location}</td>
                <td>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p style={{ padding: 18 }}>No messages yet. They appear here when someone sends the enquiry form.</p>}
    </section>
  );
}
