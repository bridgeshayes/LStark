import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  badgeColor,
  formatDate,
} from "@/lib/articles";
import { getSiteConfig } from "@/lib/site";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const article = await getArticleBySlug(slug);
    return {
      title: `${article.title} — Logan Starkey`,
      description: article.excerpt,
    };
  } catch {
    return { title: "Article not found" };
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const site = getSiteConfig();
  let article;
  try {
    article = await getArticleBySlug(slug);
  } catch {
    notFound();
  }
  if (article.draft) notFound();

  return (
    <>
      <Nav brand={site.brand} />

      <header className="article-hero">
        <div className="wrap">
          <Link href="/#clips" className="article-back">
            ← Back to the Beat Sheet
          </Link>
          <div>
            <span className="badge" style={{ background: badgeColor(article.sport) }}>
              {article.sport.toUpperCase()}
            </span>
          </div>
          <h1>{article.title}</h1>
          <div className="article-meta mono">
            <span>{formatDate(article.date)}</span>
            {article.outlet && <span>— {article.outlet}</span>}
          </div>
        </div>
      </header>

      <section className="wrap">
        <article className="article-body">
          <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
          {article.outletUrl && (
            <div className="article-outlet-note">
              Originally published at{" "}
              <a href={article.outletUrl} className="mono" style={{ color: "var(--amber)" }}>
                {article.outlet}
              </a>
              .
            </div>
          )}
        </article>
      </section>

      <SiteFooter text={site.footer} />
    </>
  );
}
