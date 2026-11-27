import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE = "joan_admin";

function secret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "joan-local-admin";
}

export function expectedPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

export function adminToken() {
  return crypto.createHmac("sha256", secret()).update("joan-admin-session").digest("hex");
}

export async function isAdmin() {
  const jar = await cookies();
  return jar.get(COOKIE)?.value === adminToken();
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
    maxAge: 60 * 60 * 24 * 14
  }
};
