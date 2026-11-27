import { NextResponse } from "next/server";
import { adminCookie, adminToken, passwordOk } from "@/lib/auth";

export async function POST(request) {
  const body = await request.json();
  if (!passwordOk(body.password)) {
    return NextResponse.json({ error: "That password is not the admin password." }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie.name, adminToken(), adminCookie.options);
  return response;
}
