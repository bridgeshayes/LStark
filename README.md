# Logan Starkey — Sports Correspondent

A Next.js site for a sports journalism portfolio/blog. Articles are written as markdown files — adding a new one requires no code changes.

## Adding a new article

Create a new file in `content/articles/`, e.g. `content/articles/my-new-story.md`:

```markdown
---
title: "Your Headline Here"
date: "2026-07-23"
sport: "NFL"
excerpt: "One or two sentences that show up on the card and in the ticker."
outlet: "Some Publication"
outletUrl: "https://example.com/the-original-article"
---

Your article body goes here, written in normal markdown.

## Subheadings work

> Blockquotes render as pull quotes.

As many paragraphs as you like.
```

Notes on the fields:

- `title`, `date`, `sport`, `excerpt` — required. `sport` controls the colored badge (NFL, NBA, Soccer, Motorsport, MLB, Olympics get themed colors; anything else falls back to a neutral color).
- `outlet` / `outletUrl` — optional. If set, the article page shows "Originally published at [outlet]" linking out. Leave both out for pieces that only live on this site.
- `draft: true` — optional. Add this to a file to hide it from the site while you're still writing it.

The file name (minus `.md`) becomes the URL: `content/articles/my-new-story.md` → `/articles/my-new-story`.

Articles are sorted newest-first automatically based on `date`. The homepage ticker automatically pulls the 5 most recent headlines — nothing to update by hand.

## Editing site text (hero, bio, stats, contact links)

All of that lives in `content/site.json` — edit the values there, no code involved.

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Deploying to Vercel

Push this repo to GitHub, then import it in Vercel — it will detect Next.js automatically and just work. No environment variables are required. New articles ship by committing a new `.md` file and letting Vercel redeploy (or pushing straight to the branch Vercel tracks).
