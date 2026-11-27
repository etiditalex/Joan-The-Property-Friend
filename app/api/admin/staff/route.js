import { NextResponse } from "next/server";
import { currentSession, supabaseServiceClient } from "@/lib/auth";

export const dynamic = "force-dynamic";

function roleOf(user) {
  const role = user?.app_metadata?.role;
  return role === "manager" ? "manager" : "admin";
}

export async function GET() {
  const session = await currentSession();
  if (!session) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Only an admin can manage desk logins." }, { status: 403 });
  const client = supabaseServiceClient();
  if (!client) return NextResponse.json({ error: "Add SUPABASE_SERVICE_ROLE_KEY before creating desk logins." }, { status: 400 });
  const { data, error } = await client.auth.admin.listUsers({ page: 1, perPage: 200 });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const people = (data?.users || [])
    .map((user) => ({
      id: user.id,
      email: user.email,
      role: roleOf(user),
      createdAt: user.created_at
    }))
    .sort((a, b) => String(a.email).localeCompare(String(b.email)));
  return NextResponse.json({ people });
}

export async function POST(request) {
  const session = await currentSession();
  if (!session) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Only an admin can create a desk login." }, { status: 403 });
  const client = supabaseServiceClient();
  if (!client) return NextResponse.json({ error: "Add SUPABASE_SERVICE_ROLE_KEY before creating desk logins." }, { status: 400 });

  const body = await request.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const role = body.role === "manager" ? "manager" : "admin";
  if (!email.includes("@") || !email.includes(".")) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Use a password of at least 8 characters." }, { status: 400 });
  }

  const { data, error } = await client.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { role }
  });
  if (error) {
    const message = /already|registered|exists/i.test(error.message)
      ? "That email already has a desk login."
      : error.message;
    return NextResponse.json({ error: message }, { status: 400 });
  }
  return NextResponse.json({
    id: data.user.id,
    email: data.user.email,
    role
  });
}
