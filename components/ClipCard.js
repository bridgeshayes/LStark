import Link from "next/link";
import { badgeColor, formatDate } from "@/lib/articles";

export default function ClipCard({ article }) {
  return (
    <Link href={`/articles/${article.slug}`} className="clip">
      <div className="clip-top">
        <span className="badge" style={{ background: badgeColor(article.sport) }}>
          {article.sport.toUpperCase()}
        </span>
        <span className="clip-date mono">{formatDate(article.date)}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      {article.outlet && <div className="clip-outlet">— {article.outlet}</div>}
    </Link>
  );
}
