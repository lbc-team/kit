import { resolve } from "node:path";
import { readdirSync } from "node:fs";

export function getDocSlugs() {
  const docsDir = resolve(process.cwd(), "content/docs");
  const files = readdirSync(docsDir, { recursive: true });
  
  return files
    .filter((file) => typeof file === "string" && file.endsWith(".mdx"))
    .map((file) => {
      const path = file
        .replace(/\.mdx$/, "")
        .split("/")
        .filter((p) => p !== "index");
      
      return { slug: path };
    });
} 