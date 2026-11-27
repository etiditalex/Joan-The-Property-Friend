import crypto from "crypto";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const COOKIE = "joan_admin";
const SESSION_MS = 60 * 60 * 24 * 14;

function secret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "joan-local-admin";
}

function supabaseUrl() {
  return process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
}

export function supabaseConfigured() {
  return Boolean(supabaseUrl() && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY));
}

export function supabaseAuthClient() {
  const url = supabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function supabaseServiceClient() {
  const url = supabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function roleFor(user) {
  const role = user?.app_metadata?.role;
  if (role === "manager" || role === "admin") return role;
  return "admin";
}

function signSession(session) {
  const body = Buffer.from(JSON.stringify(session)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function safeEqual(left, right) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function readSession(token) {
  if (!token || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  const expected = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  if (!safeEqual(sig, expected)) return null;
  try {
    const session = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!session?.exp || session.exp < Date.now()) return null;
    if (session.role !== "admin" && session.role !== "manager") return null;
    return session;
  } catch {
    return null;
  }
}

export function adminToken() {
  return crypto.createHmac("sha256", secret()).update("joan-admin-session").digest("hex");
}

export function sessionToken({ email, role, sub }) {
  return signSession({
    email,
    role,
    sub,
    exp: Date.now() + SESSION_MS
  });
}

export async function currentSession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  if (token === adminToken()) return { email: "Joan", role: "admin", sub: "local" };
  return readSession(token);
}

export async function isAdmin() {
  return Boolean(await currentSession());
}

function normalizePassword(value) {
  return String(value || "")
    .trim()
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, "-");
}

export function passwordOk(password) {
  const expected = normalizePassword(process.env.ADMIN_PASSWORD || "joan-property");
  return typeof password === "string" && normalizePassword(password) === expected && expected.length > 0;
}

export const adminCookie = {
  name: COOKIE,
  options: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MS / 1000
  }
};
