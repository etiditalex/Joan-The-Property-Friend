import { listEnquiries } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const enquiries = await listEnquiries();
  const people = [];
  enquiries.forEach((item) => {
    if (!people.some((person) => person.phone === item.phone)) people.push(item);
  });

  return (
    <section className="desk-panel" style={{ marginTop: 0 }}>
      <h2>Customers</h2>
      {people.length ? (
        <table className="desk-table">
          <thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Last interest</th></tr></thead>
          <tbody>
            {people.map((item) => (
              <tr key={item.phone}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.kind} in {item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p style={{ padding: 18 }}>Customers are collected from the enquiry form.</p>}
    </section>
  );
}
