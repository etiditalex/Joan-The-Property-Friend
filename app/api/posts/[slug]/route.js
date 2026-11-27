import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { blocksFromText, slugify } from "@/lib/content";
import { deletePost, getPostRecord, savePost } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const post = await getPostRecord(slug);
  if (!post) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(request, { params }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const { slug } = await params;
  const current = await getPostRecord(slug);
  if (!current) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const body = await request.json();
  const post = {
    slug: slugify(body.slug || body.title || slug),
    title: String(body.title || "").trim(),
    date: body.date || current.date,
    excerpt: String(body.excerpt || "").trim(),
    image: String(body.image || "").trim(),
    blocks: blocksFromText(body.body)
  };
  try {
    return NextResponse.json(await savePost(post, slug));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const { slug } = await params;
  try {
    await deletePost(slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
