import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { slugify } from "@/lib/content";
import { listProperties, saveProperty } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const properties = await listProperties();
  return NextResponse.json(properties);
}

export async function POST(request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const body = await request.json();
  const title = String(body.title || "").trim();
  const image = String(body.image || "").trim();
  if (!title || !image) return NextResponse.json({ error: "Add a title and a photo." }, { status: 400 });
  const gallery = lines(body.gallery);
  const property = {
    id: slugify(body.id || title),
    type: body.type || "house",
    typeLabel: labelFor(body.type),
    area: body.area || "Mombasa",
    title,
    place: String(body.place || "").trim() || title,
    price: Number(body.price) || 0,
    status: body.status || "Available",
    beds: blankNumber(body.beds),
    baths: blankNumber(body.baths),
    size: String(body.size || "").trim(),
    extra: String(body.extra || "").trim(),
    summary: String(body.summary || "").trim(),
    description: String(body.description || "").trim(),
    points: lines(body.points),
    image,
    gallery: gallery.length ? gallery : [image],
    published: body.intent !== "draft"
  };
  try {
    const saved = await saveProperty(property);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function lines(value) {
  return String(value || "").split("\n").map((item) => item.trim()).filter(Boolean);
}

function blankNumber(value) {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number(value);
  return Number.isNaN(number) ? null : number;
}

function labelFor(type) {
  if (type === "apartment") return "Apartment";
  if (type === "land") return "Land";
  return "House";
}
