"use client";

import { useMemo, useState } from "react";
import { textFromBlocks } from "@/lib/content";

async function uploadFiles(files) {
  if (!files.length) return [];
  const body = new FormData();
  files.forEach((file) => body.append("files", file));
  const response = await fetch("/api/uploads", { method: "POST", body });
  const json = await response.json();
  if (!response.ok) throw new Error(json.error || "The photo did not upload.");
  return json.urls;
}

export function BlogForm({ post }) {
  const [error, setError] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const editing = Boolean(post);
  const coverPreview = useMemo(() => (coverFile ? URL.createObjectURL(coverFile) : post?.image || ""), [coverFile, post?.image]);

  async function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setSaving(true);
    setError("");
    try {
      const [uploaded] = await uploadFiles(coverFile ? [coverFile] : []);
      const image = uploaded || String(data.image || "").trim();
      if (!image) {
        setError("Add a cover photo from your device, or paste a photo link.");
        setSaving(false);
        return;
      }
      const url = editing ? `/api/posts/${post.slug}` : "/api/posts";
      const response = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, image })
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error || "Could not save.");
        setSaving(false);
        return;
      }
      window.location.href = `/blog/${json.slug}`;
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <form className="desk-form" onSubmit={submit}>
      <label>Title
        <input name="title" defaultValue={post?.title || ""} required />
      </label>
      <label>Web address
        <input name="slug" defaultValue={post?.slug || ""} placeholder="Filled from the title if you leave this blank" />
      </label>
      <label>Date
        <input name="date" defaultValue={post?.date || ""} placeholder="November 27, 2026" />
      </label>
      <label>Short excerpt
        <textarea name="excerpt" defaultValue={post?.excerpt || ""} />
      </label>
      <label>Cover photo
        <input className="desk-file" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setCoverFile(event.target.files?.[0] || null)} />
        <span className="desk-hint">Choose a photo from your device. JPG, PNG, or WEBP, up to 8 MB.</span>
        {coverPreview ? <span className="desk-photos"><img src={coverPreview} alt="" /></span> : null}
      </label>
      <label>Or paste a cover photo link
        <input name="image" defaultValue={post?.image || ""} placeholder="https://" />
      </label>
      <label>Body
        <textarea name="body" style={{ minHeight: 280 }} defaultValue={post ? textFromBlocks(post.blocks) : ""} placeholder={"A paragraph.\n\n## A large heading\n\n### A smaller heading\n\n- A list item"} />
      </label>
      {error ? <p className="desk-error">{error}</p> : null}
      <button className="desk-gold" type="submit" disabled={saving}>{saving ? "Saving…" : editing ? "Save post" : "Publish post"}</button>
    </form>
  );
}
