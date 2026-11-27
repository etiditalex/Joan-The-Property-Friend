import Link from "next/link";
import { listPosts } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage({ searchParams }) {
  const previewSlug = String((await searchParams).preview || "");
  const posts = await listPosts({ includeDrafts: true });
  const preview = posts.find((item) => item.slug === previewSlug) || null;
  return (
    <>
      <div className="desk-actions">
        <Link className="desk-gold" href="/admin/blog/new">Add blog post</Link>
      </div>
      <section className="desk-panel" style={{ marginTop: 0 }}>
        <table className="desk-table">
          <thead><tr><th>Title</th><th>Date</th><th>Visibility</th><th></th><th></th></tr></thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug}>
                <td>{post.title}</td>
                <td>{post.date}</td>
                <td>{post.published === false ? "Draft" : "Live"}</td>
                <td><Link href={`/admin/blog/${post.slug}`}>Edit</Link></td>
                <td><Link href={`/admin/blog?preview=${post.slug}`}>Preview</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {preview ? (
        <section className="desk-preview">
          <div className="desk-preview-bar">
            <strong>{preview.title}</strong>
            <Link href="/admin/blog">Close preview</Link>
          </div>
          <iframe src={`/desk-preview/blog/${preview.slug}`} title={`Preview ${preview.title}`} />
        </section>
      ) : null}
    </>
  );
}
