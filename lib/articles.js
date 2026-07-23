import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

const BADGE_COLORS = {
  nfl: "#8CC6E8",
  nba: "#F4B41A",
  soccer: "#7FD6A0",
  motorsport: "#E8887F",
  mlb: "#C9A6E8",
  olympics: "#E8D07F",
};
const FALLBACK_BADGE_COLOR = "#7E93A7";

export function badgeColor(sport) {
  const key = (sport || "").toLowerCase().trim();
  return BADGE_COLORS[key] || FALLBACK_BADGE_COLOR;
}

function readSlugs() {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function readRawArticle(slug) {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, data, content };
}

export function getAllArticlesMeta({ includeDrafts = false } = {}) {
  const slugs = readSlugs();
  const articles = slugs.map((slug) => {
    const { data } = readRawArticle(slug);
    return {
      slug,
      title: data.title || slug,
      date: data.date || null,
      sport: data.sport || "General",
      excerpt: data.excerpt || "",
      outlet: data.outlet || null,
      outletUrl: data.outletUrl || null,
      draft: Boolean(data.draft),
    };
  });

  return articles
    .filter((a) => includeDrafts || !a.draft)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getArticleBySlug(slug) {
  const { data, content } = readRawArticle(slug);
  const processed = await remark().use(remarkHtml).process(content);
  return {
    slug,
    title: data.title || slug,
    date: data.date || null,
    sport: data.sport || "General",
    excerpt: data.excerpt || "",
    outlet: data.outlet || null,
    outletUrl: data.outletUrl || null,
    draft: Boolean(data.draft),
    contentHtml: processed.toString(),
  };
}

export function getAllArticleSlugs() {
  return readSlugs();
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  }).toUpperCase();
}
