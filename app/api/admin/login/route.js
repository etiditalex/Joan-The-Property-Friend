import { NextResponse } from "next/server";
import { adminCookie, passwordOk, roleFor, sessionToken, supabaseAuthClient, supabaseConfigured } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const body = await request.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const client = supabaseAuthClient();

  if (supabaseConfigured() && client) {
    if (!email || !email.includes("@") || !password) {
      return NextResponse.json({ error: "Enter the email and password from Supabase." }, { status: 401 });
    }
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error || !data?.user) {
      const message = error?.message === "Email not confirmed"
        ? "Confirm this user in Supabase Authentication, then sign in again."
        : "That email or password is not a desk login.";
      return NextResponse.json({ error: message }, { status: 401 });
    }
    const response = NextResponse.json({ ok: true, role: roleFor(data.user) });
    response.cookies.set(adminCookie.name, sessionToken({
      email: data.user.email,
      role: roleFor(data.user),
      sub: data.user.id
    }), adminCookie.options);
    return response;
  }

  if (!passwordOk(password)) {
    return NextResponse.json({ error: "That password is not the admin password." }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true, role: "admin" });
  response.cookies.set(adminCookie.name, sessionToken({ email: "Joan", role: "admin", sub: "local" }), adminCookie.options);
  return response;
}
