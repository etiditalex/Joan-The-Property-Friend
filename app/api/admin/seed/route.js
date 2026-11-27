import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { seedSupabase } from "@/lib/store";

export async function POST() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  try {
    await seedSupabase();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
