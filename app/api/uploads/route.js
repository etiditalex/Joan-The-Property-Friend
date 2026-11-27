import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

const types = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif"
};

const maxBytes = 4 * 1024 * 1024;

function readOnly(error) {
  const message = String(error?.message || "");
  return error?.code === "EROFS" || error?.code === "EACCES" || error?.code === "EPERM" || /read-only|EROFS/i.test(message);
}

async function saveToSupabase(name, bytes, type) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("This deployment cannot store photos on disk. Add SUPABASE_SERVICE_ROLE_KEY in Vercel, or paste a photo link.");
  }
  const client = createClient(url, key, { auth: { persistSession: false } });
  const bucket = "property-photos";
  const found = await client.storage.getBucket(bucket);
  if (found.error) {
    const created = await client.storage.createBucket(bucket, { public: true });
    if (created.error && !/already exists/i.test(created.error.message)) throw new Error(created.error.message);
  }
  const uploaded = await client.storage.from(bucket).upload(name, bytes, { contentType: type, upsert: true });
  if (uploaded.error) throw new Error(uploaded.error.message);
  return client.storage.from(bucket).getPublicUrl(name).data.publicUrl;
}

export async function POST(request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  try {
    const form = await request.formData();
    const files = form.getAll("files").filter((item) => item && typeof item.arrayBuffer === "function");
    if (!files.length) return NextResponse.json({ error: "Choose a photo from your device." }, { status: 400 });

    const dir = path.join(process.cwd(), "public", "uploads");
    const urls = [];

    for (const file of files) {
      const ext = types[file.type];
      if (!ext) return NextResponse.json({ error: "Use a JPG, PNG, or WEBP photo." }, { status: 400 });
      if (file.size > maxBytes) return NextResponse.json({ error: "Each photo must be under 4 MB after it is reduced." }, { status: 400 });
      const bytes = Buffer.from(await file.arrayBuffer());
      const name = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}.${ext}`;
      try {
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(path.join(dir, name), bytes);
        urls.push(`/uploads/${name}`);
      } catch (error) {
        if (!readOnly(error)) throw error;
        urls.push(await saveToSupabase(name, bytes, file.type));
      }
    }

    return NextResponse.json({ urls });
  } catch (error) {
    return NextResponse.json({ error: error.message || "The photo did not upload." }, { status: 500 });
  }
}
