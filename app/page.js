import { getAllArticlesMeta } from "@/lib/articles";
import { getSiteConfig } from "@/lib/site";
import Nav from "@/components/Nav";
import Ticker from "@/components/Ticker";
import SiteFooter from "@/components/SiteFooter";
import ClipCard from "@/components/ClipCard";

export default function HomePage() {
  const site = getSiteConfig();
  const articles = getAllArticlesMeta();
  const headlines = articles
    .slice(0, 5)
    .map((a) => `${a.title}${a.outlet ? ` <b>— ${a.outlet}</b>` : ""}`);

  return (
    <>
      <Ticker headlines={headlines} />
      <Nav brand={site.brand} />

      <header className="hero">
        <div className="wrap">
          <div className="eyebrow">{site.hero.eyebrow}</div>
          <h1>{site.hero.title}</h1>
          <p className="tagline">{site.hero.tagline}</p>
          <div className="hero-ctas">
            <a href="#clips" className="btn btn-primary">
              Read the Clips
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in Touch
            </a>
          </div>
          <div className="scoreboard">
            {site.stats.map((stat, i) => (
              <div className="stat" key={i}>
                <div className="num">{stat.num}</div>
                <div className="label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="section" id="clips">
        <div className="wrap">
          <div className="section-head">
            <h2>The Beat Sheet</h2>
            <div className="kicker">SELECTED CLIPS</div>
          </div>
          {articles.length > 0 ? (
            <div className="clips">
              {articles.map((article) => (
                <ClipCard article={article} key={article.slug} />
              ))}
            </div>
          ) : (
            <p className="empty-state">
              No articles yet — drop a markdown file into content/articles to get started.
            </p>
          )}
        </div>
      </section>

      <section className="section" id="about">
        <div className="wrap">
          <div className="section-head">
            <h2>About</h2>
            <div className="kicker">PLAYER CARD</div>
          </div>
          <div className="about-grid">
            <div className="player-card">
              <div className="player-photo">
                {site.about.photo ? (
                  <img src={site.about.photo} alt={site.about.name} />
                ) : (
                  <div className="num">{site.about.initials}</div>
                )}
              </div>
              <div className="player-meta">
                <div className="name">{site.about.name}</div>
                <div className="role">{site.about.role}</div>
              </div>
            </div>
            <div className="about-copy">
              {site.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {site.about.pullQuote && (
                <p className="pull">&ldquo;{site.about.pullQuote}&rdquo;</p>
              )}
              <div className="tags">
                {site.about.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="wrap">
          <div className="locker">
            <div className="nameplate">{site.contact.nameplate}</div>
            <div className="sub">{site.contact.sub}</div>
            <div className="contact-row">
              {site.contact.links.map((link, i) => (
                <a href={link.url} className="btn btn-ghost" key={i}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter text={site.footer} />
    </>
  );
}
