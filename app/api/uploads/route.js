import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

const types = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif"
};

const maxBytes = 8 * 1024 * 1024;

export async function POST(request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const form = await request.formData();
  const files = form.getAll("files").filter((item) => item && typeof item.arrayBuffer === "function");
  if (!files.length) return NextResponse.json({ error: "Choose a photo from your device." }, { status: 400 });

  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  const urls = [];

  for (const file of files) {
    const ext = types[file.type];
    if (!ext) return NextResponse.json({ error: "Use a JPG, PNG, or WEBP photo." }, { status: 400 });
    if (file.size > maxBytes) return NextResponse.json({ error: "Each photo must be under 8 MB." }, { status: 400 });
    const name = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}.${ext}`;
    await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
    urls.push(`/uploads/${name}`);
  }

  return NextResponse.json({ urls });
}
