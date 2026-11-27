import { notFound } from "next/navigation";
import { getPostRecord } from "@/lib/store";
import { ArticleView } from "../../../blog/[slug]/view";

export const dynamic = "force-dynamic";

export default async function BlogPreviewPage({ params }) {
  const { slug } = await params;
  const post = await getPostRecord(slug, { includeDrafts: true });
  if (!post) notFound();
  return <ArticleView post={post} />;
}
