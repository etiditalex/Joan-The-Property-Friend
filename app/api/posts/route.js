import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { blocksFromText, slugify } from "@/lib/content";
import { listPosts, savePost } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await listPosts());
}

export async function POST(request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const body = await request.json();
  const title = String(body.title || "").trim();
  const image = String(body.image || "").trim();
  if (!title || !image) return NextResponse.json({ error: "Add a title and a photo." }, { status: 400 });
  const post = {
    slug: slugify(body.slug || title),
    title,
    date: body.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    excerpt: String(body.excerpt || "").trim(),
    image,
    blocks: blocksFromText(body.body),
    published: body.intent !== "draft"
  };
  try {
    return NextResponse.json(await savePost(post));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
