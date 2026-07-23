import fs from "fs";
import path from "path";

const SITE_FILE = path.join(process.cwd(), "content", "site.json");

export function getSiteConfig() {
  const raw = fs.readFileSync(SITE_FILE, "utf8");
  return JSON.parse(raw);
}
