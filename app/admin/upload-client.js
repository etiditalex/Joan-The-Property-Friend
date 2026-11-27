async function readJson(response) {
  const text = await response.text();
  if (!text) {
    throw new Error("The live site did not accept that photo. Use a smaller image, or paste a photo link.");
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("The property could not be saved.");
  }
}

async function shrinkImage(file) {
  if (!file || !file.type.startsWith("image/") || file.type === "image/gif") return file;
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file;
  const max = 1600;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
  if (!blob) return file;
  const name = file.name.replace(/\.\w+$/, "") || "photo";
  return new File([blob], `${name}.jpg`, { type: "image/jpeg" });
}

export async function uploadFiles(files) {
  const ready = [];
  for (const file of files) ready.push(await shrinkImage(file));
  if (!ready.length) return [];
  const body = new FormData();
  ready.forEach((file) => body.append("files", file));
  const response = await fetch("/api/uploads", { method: "POST", body });
  const json = await readJson(response);
  if (!response.ok) throw new Error(json.error || "The photo did not upload.");
  return json.urls;
}

export async function readResponse(response) {
  return readJson(response);
}
