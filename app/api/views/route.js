import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { listViews, recordView } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  return NextResponse.json(await listViews());
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  try {
    await recordView({ path: body.path, kind: body.kind });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
