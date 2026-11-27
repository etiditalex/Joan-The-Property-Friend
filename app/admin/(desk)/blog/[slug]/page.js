import { notFound } from "next/navigation";
import { getPostRecord } from "@/lib/store";
import { BlogForm } from "../../../blog-form";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostRecord(slug);
  if (!post) notFound();
  return <BlogForm post={post} />;
}
