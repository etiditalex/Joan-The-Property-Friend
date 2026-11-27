import Link from "next/link";

export function ArticleView({ post }) {
  return (
    <article className="article-page">
      <nav className="sale-crumb" aria-label="Breadcrumb">
        <Link href="/" aria-label="Home">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" /></svg>
        </Link>
        <span aria-hidden="true">›</span>
        <Link href="/blog">Joan&apos;s Blog</Link>
        <span aria-hidden="true">›</span>
        <span>{post.title}</span>
      </nav>
      <img className="article-hero" src={post.image} alt="" />
      <h1>{post.title}</h1>
      <p className="article-date">{post.date}</p>
      <div className="article-body">
        {post.blocks.map((block, index) => {
          if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
          if (block.type === "h3") return <h3 key={index}>{block.text}</h3>;
          if (block.type === "sub") return <p className="article-sub" key={index}>{block.text}</p>;
          if (block.type === "ul") {
            return (
              <ul key={index}>
                {block.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            );
          }
          return <p key={index}>{block.text}</p>;
        })}
      </div>
    </article>
  );
}
