"use client";

import { useMemo, useState } from "react";
import { areas } from "@/lib/data";
import { readResponse, uploadFiles } from "./upload-client";

export function PropertyForm({ property }) {
  const [error, setError] = useState("");
  const [mainFile, setMainFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const editing = Boolean(property);
  const mainPreview = useMemo(() => (mainFile ? URL.createObjectURL(mainFile) : property?.image || ""), [mainFile, property?.image]);
  const pickedGallery = useMemo(
    () => galleryFiles.map((file) => ({ name: `${file.name}-${file.size}`, src: URL.createObjectURL(file) })),
    [galleryFiles]
  );

  async function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setSaving(true);
    setError("");
    try {
      const [uploadedMain] = await uploadFiles(mainFile ? [mainFile] : []);
      const uploadedGallery = await uploadFiles(galleryFiles);
      const image = uploadedMain || String(data.image || "").trim();
      const gallery = [...uploadedGallery, ...String(data.gallery || "").split("\n").map((item) => item.trim()).filter(Boolean)];
      if (!image) {
        setError("Add a photo from your device, or paste a photo link.");
        setSaving(false);
        return;
      }
      const url = editing ? `/api/properties/${property.id}` : "/api/properties";
      const response = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, image, gallery: gallery.join("\n") })
      });
      const json = await readResponse(response);
      if (!response.ok) {
        setError(json.error || "Could not save.");
        setSaving(false);
        return;
      }
      window.location.href = `/admin/property/${json.id}`;
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <form className="desk-form" onSubmit={submit}>
      <label>Title
        <input name="title" defaultValue={property?.title || ""} required />
      </label>
      <div className="pair">
        <label>Type
          <select name="type" defaultValue={property?.type || "house"}>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
          </select>
        </label>
        <label>Area
          <select name="area" defaultValue={property?.area || "Mombasa"}>
            {areas.map((area) => <option key={area}>{area}</option>)}
          </select>
        </label>
      </div>
      <div className="pair">
        <label>Place
          <input name="place" defaultValue={property?.place || ""} placeholder="Nyali, Mombasa" required />
        </label>
        <label>Guide price (KES)
          <input name="price" inputMode="numeric" defaultValue={property?.price ?? ""} required />
        </label>
      </div>
      <div className="pair">
        <label>Status
          <select name="status" defaultValue={property?.status || "Available"}>
            <option>Available</option>
            <option>Few remaining</option>
            <option>Sold</option>
          </select>
        </label>
        <label>Size
          <input name="size" defaultValue={property?.size || ""} placeholder="280 sqm" />
        </label>
      </div>
      <div className="pair">
        <label>Bedrooms
          <input name="beds" defaultValue={property?.beds ?? ""} placeholder="Leave blank for land" />
        </label>
        <label>Bathrooms
          <input name="baths" defaultValue={property?.baths ?? ""} />
        </label>
      </div>
      <label>Extra line
        <input name="extra" defaultValue={property?.extra || ""} placeholder="Garden compound" />
      </label>
      <label>Short summary
        <textarea name="summary" defaultValue={property?.summary || ""} />
      </label>
      <label>Description
        <textarea name="description" defaultValue={property?.description || ""} />
      </label>
      <label>Features, one per line
        <textarea name="points" defaultValue={(property?.points || []).join("\n")} />
      </label>
      <label>Main photo
        <input className="desk-file" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setMainFile(event.target.files?.[0] || null)} />
        <span className="desk-hint">Choose a photo from your device. Large photos are reduced before they upload.</span>
        {mainPreview ? <span className="desk-photos"><img src={mainPreview} alt="" /></span> : null}
      </label>
      <label>Or paste a main photo link
        <input name="image" defaultValue={property?.image || ""} placeholder="https://" />
      </label>
      <label>Gallery photos
        <input className="desk-file" type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={(event) => setGalleryFiles(Array.from(event.target.files || []))} />
        <span className="desk-hint">Select one or more photos from your device.</span>
        {(property?.gallery?.length || galleryFiles.length) ? (
          <span className="desk-photos">
            {(property?.gallery || []).map((src) => <img key={src} src={src} alt="" />)}
            {pickedGallery.map((shot) => <img key={shot.name} src={shot.src} alt="" />)}
          </span>
        ) : null}
      </label>
      <label>Or paste gallery links, one per line
        <textarea name="gallery" defaultValue={(property?.gallery || []).join("\n")} />
      </label>
      {error ? <p className="desk-error">{error}</p> : null}
      {editing ? <p className="desk-hint">{property.published === false ? "This is a draft. It is hidden from the website." : "This is live on the website."}</p> : null}
      <div className="desk-actions">
        <button className="desk-plain" name="intent" value="draft" type="submit" disabled={saving}>Save as draft</button>
        <button className="desk-gold" name="intent" value="live" type="submit" disabled={saving}>{saving ? "Saving…" : "Publish live"}</button>
      </div>
    </form>
  );
}
