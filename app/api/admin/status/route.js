import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { storeStatus } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  return NextResponse.json(await storeStatus());
}
