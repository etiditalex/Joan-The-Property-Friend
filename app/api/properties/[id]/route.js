import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { slugify } from "@/lib/content";
import { deleteProperty, getPropertyRecord, saveProperty } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const { id } = await params;
  const property = await getPropertyRecord(id);
  if (!property) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json(property);
}

export async function PUT(request, { params }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const { id } = await params;
  const current = await getPropertyRecord(id);
  if (!current) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const body = await request.json();
  const title = String(body.title || current.title).trim();
  const image = String(body.image || current.image).trim();
  const gallery = String(body.gallery || "").split("\n").map((item) => item.trim()).filter(Boolean);
  const property = {
    ...current,
    id: slugify(body.id || title),
    type: body.type || current.type,
    typeLabel: body.type === "apartment" ? "Apartment" : body.type === "land" ? "Land" : "House",
    area: body.area || current.area,
    title,
    place: String(body.place || "").trim(),
    price: Number(body.price) || 0,
    status: body.status || "Available",
    beds: body.beds === "" || body.beds === null ? null : Number(body.beds),
    baths: body.baths === "" || body.baths === null ? null : Number(body.baths),
    size: String(body.size || "").trim(),
    extra: String(body.extra || "").trim(),
    summary: String(body.summary || "").trim(),
    description: String(body.description || "").trim(),
    points: String(body.points || "").split("\n").map((item) => item.trim()).filter(Boolean),
    image,
    gallery: gallery.length ? gallery : [image]
  };
  try {
    const saved = await saveProperty(property, id);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const { id } = await params;
  try {
    await deleteProperty(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
