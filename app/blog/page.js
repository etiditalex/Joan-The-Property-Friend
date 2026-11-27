import Link from "next/link";
import { listPosts } from "@/lib/store";

export const metadata = {
  title: "Joan's Blog | Joan Property Friend",
  description: "Notes from Joan on choosing a house, an apartment, or land in Kenya."
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await listPosts();
  return (
    <div className="blog-page">
      <nav className="sale-crumb" aria-label="Breadcrumb">
        <Link href="/" aria-label="Home">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" /></svg>
        </Link>
        <span aria-hidden="true">›</span>
        <h1>Joan&apos;s Blog</h1>
      </nav>
      <div className="blog-grid">
        {posts.map((post) => (
          <article className="blog-card" key={post.slug}>
            <Link className="blog-card-media" href={`/blog/${post.slug}`}>
              <img src={post.image} alt="" />
            </Link>
            <div className="blog-card-body">
              <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
              <p className="blog-date">{post.date}</p>
              <p className="blog-excerpt">{post.excerpt}</p>
              <Link className="blog-more" href={`/blog/${post.slug}`}>Read More</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
