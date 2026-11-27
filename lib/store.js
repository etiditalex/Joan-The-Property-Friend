import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { properties as starterProperties } from "./data";
import { posts as starterPosts } from "./blog";
import { blocksFromText, slugify, textFromBlocks } from "./content";

export { blocksFromText, slugify, textFromBlocks };

const filePath = path.join(process.cwd(), "data", "db.json");

function supabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export function usingSupabase() {
  return Boolean(supabaseAdmin());
}

function propertyFromRow(row) {
  return {
    id: row.id,
    type: row.type,
    typeLabel: row.type_label,
    area: row.area,
    title: row.title,
    place: row.place,
    price: Number(row.price),
    status: row.status,
    beds: row.beds,
    baths: row.baths,
    size: row.size || "",
    extra: row.extra || "",
    summary: row.summary || "",
    description: row.description || "",
    points: Array.isArray(row.points) ? row.points : [],
    image: row.image,
    gallery: Array.isArray(row.gallery) ? row.gallery : []
  };
}

function propertyToRow(property) {
  return {
    id: property.id,
    type: property.type,
    type_label: property.typeLabel,
    area: property.area,
    title: property.title,
    place: property.place,
    price: Number(property.price),
    status: property.status,
    beds: property.beds === "" || property.beds === undefined ? null : property.beds,
    baths: property.baths === "" || property.baths === undefined ? null : property.baths,
    size: property.size || "",
    extra: property.extra || "",
    summary: property.summary || "",
    description: property.description || "",
    points: property.points || [],
    image: property.image,
    gallery: property.gallery || []
  };
}

function postFromRow(row) {
  return {
    slug: row.slug,
    title: row.title,
    date: row.date,
    excerpt: row.excerpt || "",
    image: row.image,
    blocks: Array.isArray(row.blocks) ? row.blocks : []
  };
}

async function readFileDb() {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return {
      properties: parsed.properties || [],
      posts: parsed.posts || [],
      enquiries: parsed.enquiries || []
    };
  } catch {
    const seeded = {
      properties: starterProperties,
      posts: starterPosts,
      enquiries: []
    };
    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(seeded, null, 2));
    } catch {
      // Vercel’s filesystem is read-only. The starter catalog is still served from memory.
    }
    return seeded;
  }
}

async function writeFileDb(db) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(db, null, 2));
  } catch (error) {
    if (error && (error.code === "EROFS" || error.code === "EACCES" || error.code === "EPERM")) {
      throw new Error("This deployment cannot save files. Add the Supabase keys in Vercel.");
    }
    throw error;
  }
}

export async function storeStatus() {
  const client = supabaseAdmin();
  if (!client) {
    return {
      mode: "local",
      message: "Supabase is not connected yet. Listings and posts are saved on this computer until you add the Supabase keys."
    };
  }
  const { error } = await client.from("properties").select("id").limit(1);
  if (error) return { mode: "error", message: error.message };
  return { mode: "supabase", message: "Connected to Supabase." };
}

let fillingCatalog = null;

async function fillEmptyCatalog(client) {
  if (!fillingCatalog) {
    fillingCatalog = (async () => {
      const properties = await client.from("properties").select("id", { count: "exact", head: true });
      if (!properties.error && properties.count === 0) {
        const saved = await client.from("properties").upsert(starterProperties.map(propertyToRow));
        if (saved.error) throw new Error(saved.error.message);
      }
      const posts = await client.from("posts").select("slug", { count: "exact", head: true });
      if (!posts.error && posts.count === 0) {
        const saved = await client.from("posts").upsert(starterPosts);
        if (saved.error) throw new Error(saved.error.message);
      }
    })().catch((error) => {
      fillingCatalog = null;
      throw error;
    });
  }
  return fillingCatalog;
}

export async function listProperties() {
  const client = supabaseAdmin();
  if (client) {
    let { data, error } = await client.from("properties").select("*").order("created_at", { ascending: false });
    if (!error && Array.isArray(data) && data.length === 0) {
      try {
        await fillEmptyCatalog(client);
        const again = await client.from("properties").select("*").order("created_at", { ascending: false });
        if (!again.error && again.data) data = again.data;
      } catch {
        return starterProperties;
      }
    }
    if (!error && data) return data.map(propertyFromRow);
  }
  const db = await readFileDb();
  return db.properties;
}

export async function getPropertyRecord(id) {
  const list = await listProperties();
  return list.find((item) => item.id === id) || null;
}

export async function saveProperty(property, existingId) {
  const client = supabaseAdmin();
  const row = propertyToRow(property);
  if (client) {
    if (existingId && existingId !== property.id) await client.from("properties").delete().eq("id", existingId);
    const { error } = await client.from("properties").upsert(row);
    if (error) throw new Error(error.message);
    return propertyFromRow(row);
  }
  const db = await readFileDb();
  const index = db.properties.findIndex((item) => item.id === (existingId || property.id));
  if (index >= 0) db.properties[index] = property;
  else db.properties.unshift(property);
  await writeFileDb(db);
  return property;
}

export async function deleteProperty(id) {
  const client = supabaseAdmin();
  if (client) {
    const { error } = await client.from("properties").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  const db = await readFileDb();
  db.properties = db.properties.filter((item) => item.id !== id);
  await writeFileDb(db);
}

export async function listPosts() {
  const client = supabaseAdmin();
  if (client) {
    let { data, error } = await client.from("posts").select("*").order("created_at", { ascending: false });
    if (!error && Array.isArray(data) && data.length === 0) {
      try {
        await fillEmptyCatalog(client);
        const again = await client.from("posts").select("*").order("created_at", { ascending: false });
        if (!again.error && again.data) data = again.data;
      } catch {
        return starterPosts;
      }
    }
    if (!error && data) return data.map(postFromRow);
  }
  const db = await readFileDb();
  return db.posts;
}

export async function getPostRecord(slug) {
  const list = await listPosts();
  return list.find((item) => item.slug === slug) || null;
}

export async function savePost(post, existingSlug) {
  const client = supabaseAdmin();
  if (client) {
    if (existingSlug && existingSlug !== post.slug) await client.from("posts").delete().eq("slug", existingSlug);
    const { error } = await client.from("posts").upsert(post);
    if (error) throw new Error(error.message);
    return post;
  }
  const db = await readFileDb();
  const index = db.posts.findIndex((item) => item.slug === (existingSlug || post.slug));
  if (index >= 0) db.posts[index] = post;
  else db.posts.unshift(post);
  await writeFileDb(db);
  return post;
}

export async function deletePost(slug) {
  const client = supabaseAdmin();
  if (client) {
    const { error } = await client.from("posts").delete().eq("slug", slug);
    if (error) throw new Error(error.message);
    return;
  }
  const db = await readFileDb();
  db.posts = db.posts.filter((item) => item.slug !== slug);
  await writeFileDb(db);
}

export async function listEnquiries() {
  const client = supabaseAdmin();
  if (client) {
    const { data, error } = await client.from("enquiries").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      return data.map((row) => ({
        id: row.id,
        name: row.name,
        phone: row.phone,
        email: row.email,
        kind: row.kind,
        location: row.location,
        budget: row.budget,
        note: row.note || "",
        createdAt: row.created_at
      }));
    }
  }
  const db = await readFileDb();
  return db.enquiries;
}

export async function saveEnquiry(entry) {
  const client = supabaseAdmin();
  if (client) {
    const { error } = await client.from("enquiries").insert({
      name: entry.name,
      phone: entry.phone,
      email: entry.email,
      kind: entry.kind,
      location: entry.location,
      budget: entry.budget,
      note: entry.note
    });
    if (error) throw new Error(error.message);
    return;
  }
  const db = await readFileDb();
  db.enquiries.unshift({ ...entry, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
  await writeFileDb(db);
}

export async function deleteEnquiries(ids) {
  const unique = [...new Set((ids || []).map((id) => String(id)).filter(Boolean))];
  if (!unique.length) return;
  const client = supabaseAdmin();
  if (client) {
    const { error } = await client.from("enquiries").delete().in("id", unique);
    if (error) throw new Error(error.message);
    return;
  }
  const db = await readFileDb();
  db.enquiries = db.enquiries.filter((item) => !unique.includes(String(item.id)));
  await writeFileDb(db);
}

export async function seedSupabase() {
  const client = supabaseAdmin();
  if (!client) throw new Error("Add the Supabase URL and service role key first.");
  const properties = starterProperties.map(propertyToRow);
  const posts = starterPosts;
  const propertyResult = await client.from("properties").upsert(properties);
  if (propertyResult.error) throw new Error(propertyResult.error.message);
  const postResult = await client.from("posts").upsert(posts);
  if (postResult.error) throw new Error(postResult.error.message);
}

