import { notFound } from "next/navigation";
import { getPostRecord } from "@/lib/store";
import { ArticleView } from "./view";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostRecord(slug);
  if (!post) return { title: "Joan's Blog | Joan Property Friend" };
  return {
    title: `${post.title} | Joan's Blog`,
    description: post.excerpt
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostRecord(slug);
  if (!post) notFound();
  return <ArticleView post={post} />;
}
