import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteEnquiries, listEnquiries, markEnquiriesRead, saveEnquiry } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  return NextResponse.json(await listEnquiries());
}

export async function POST(request) {
  const body = await request.json();
  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  if (name.length < 2 || phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ error: "Add your name and a phone number Joan can reach." }, { status: 400 });
  }
  try {
    await saveEnquiry({
      name,
      phone,
      email: String(body.email || "").trim(),
      kind: body.kind || "",
      location: body.location || "",
      budget: body.budget || "",
      note: String(body.note || "").trim()
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const ids = Array.isArray(body.ids) ? body.ids : [];
  if (!ids.length) return NextResponse.json({ error: "Choose a message first." }, { status: 400 });
  try {
    await markEnquiriesRead(ids, Boolean(body.read));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const ids = Array.isArray(body.ids) ? body.ids : [];
  if (!ids.length) return NextResponse.json({ error: "Choose a message to delete." }, { status: 400 });
  try {
    await deleteEnquiries(ids);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
