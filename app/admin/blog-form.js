"use client";

import { useMemo, useState } from "react";
import { textFromBlocks } from "@/lib/content";
import { readResponse, uploadFiles } from "./upload-client";

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
      const json = await readResponse(response);
      if (!response.ok || !json?.slug) {
        setError(json.error || "Could not save.");
        setSaving(false);
        return;
      }
      window.location.href = json.published === false ? `/admin/blog/${json.slug}` : `/blog/${json.slug}`;
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
        <span className="desk-hint">Choose a photo from your device. Large photos are reduced before they upload.</span>
        {coverPreview ? <span className="desk-photos"><img src={coverPreview} alt="" /></span> : null}
      </label>
      <label>Or paste a cover photo link
        <input name="image" defaultValue={post?.image || ""} placeholder="https://" />
      </label>
      <label>Body
        <textarea name="body" style={{ minHeight: 280 }} defaultValue={post ? textFromBlocks(post.blocks) : ""} placeholder={"A paragraph.\n\n## A large heading\n\n### A smaller heading\n\n- A list item"} />
      </label>
      {error ? <p className="desk-error">{error}</p> : null}
      {editing ? <p className="desk-hint">{post.published === false ? "This is a draft. It is hidden from the website." : "This is live on the website."}</p> : null}
      <div className="desk-actions">
        <button className="desk-plain" name="intent" value="draft" type="submit" disabled={saving}>Save as draft</button>
        <button className="desk-gold" name="intent" value="live" type="submit" disabled={saving}>{saving ? "Saving…" : "Publish live"}</button>
      </div>
    </form>
  );
}
