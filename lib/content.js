export function slugify(value) {
  const base = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
  return base || "listing";
}

export function blocksFromText(text) {
  const blocks = [];
  let list = null;
  const flush = () => {
    if (list) {
      blocks.push({ type: "ul", items: list });
      list = null;
    }
  };
  String(text || "").replace(/\r/g, "").split("\n").forEach((line) => {
    if (line.startsWith("## ")) {
      flush();
      blocks.push({ type: "h2", text: line.slice(3).trim() });
    } else if (line.startsWith("### ")) {
      flush();
      blocks.push({ type: "h3", text: line.slice(4).trim() });
    } else if (line.startsWith("- ")) {
      if (!list) list = [];
      list.push(line.slice(2).trim());
    } else if (!line.trim()) {
      flush();
    } else {
      flush();
      blocks.push({ type: "p", text: line.trim() });
    }
  });
  flush();
  return blocks;
}

export function textFromBlocks(blocks) {
  return (blocks || []).map((block) => {
    if (block.type === "h2") return `## ${block.text}`;
    if (block.type === "h3" || block.type === "sub") return `### ${block.text}`;
    if (block.type === "ul") return block.items.map((item) => `- ${item}`).join("\n");
    return block.text;
  }).join("\n\n");
}
