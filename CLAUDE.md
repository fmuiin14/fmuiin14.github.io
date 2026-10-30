# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # runs prebuild (scripts/generate-rss.mjs) then `next build` → static export in ./out
npm run lint       # eslint (flat config, eslint.config.mjs)
npm run lint:fix
npm run format     # prettier --write . (double quotes, semicolons, trailing commas es5, width 80)
```

There is no test suite. Verify changes with `npm run lint` and `npm run build`.

## Architecture

Personal portfolio site for Fathul Muiin: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 (via `@tailwindcss/postcss`, configured in `app/globals.css` — no `tailwind.config`). Path alias `@/*` maps to the repo root.

**Fully static export.** `next.config.ts` sets `output: "export"` and unoptimized images; the site is deployed to GitHub Pages (`fmuiin14.github.io`) by `.github/workflows/deploy.yml` on every push to `main`. Consequences:
- No server runtime: no API routes, server actions, middleware, or request-time data. Dynamic routes (`app/blog/[slug]`, `app/projects/[slug]`) must implement `generateStaticParams`.
- Server components read content at build time; anything interactive is a `"use client"` component in `components/`.
- `fetch(..., { next: { revalidate } })` in `lib/github.ts` only runs at build time. It falls back to hardcoded repos/stats when the GitHub API fails, so builds never break on network errors.

**Content sources:**
- Blog posts: `content/blog/*.mdx` with frontmatter `title`, `excerpt`, `date`, `tags`. Loaded by `lib/mdx.ts` (gray-matter + reading-time); filename is the slug. Rendered by `components/shared/MdxContent.tsx` using `next-mdx-remote/rsc` with remark-gfm, rehype-slug (heading ids feed `TableOfContents`), and rehype-highlight.
- Structured page data: typed TS modules in `content/data/` (projects, experience, skills, about, uses, now), typed against `types/index.ts`. Projects are accessed through `lib/projects.ts`.
- Site metadata, nav items, social links: `lib/constants.ts` (`siteConfig`).

**Generated files.** `scripts/generate-rss.mjs` runs as `prebuild` and writes `public/feed.xml` and `public/sitemap.xml`. It duplicates data instead of importing it:
- its own `siteConfig.url`, which must stay in sync with `lib/constants.ts`
- a hardcoded `projectSlugs` list, which must match `content/data/projects.ts`
- a hardcoded list of static pages

When adding a project, a top-level page, or changing the site URL, update this script too.

**Layout.** `app/layout.tsx` wraps pages with `Navbar`, `Footer`, and the `CommandPalette` (cmdk). Pages use `components/layout/PageWrapper.tsx`. Home page sections live in `components/sections/`; reusable pieces live in `components/shared/`. Animations use framer-motion (`AnimatedSection`). Class merging uses `cn()` from `lib/utils.ts` (clsx + tailwind-merge).

## Known placeholders

- `components/shared/ContactForm.tsx` posts to a placeholder Formspree endpoint (`your-form-id`).
- `components/shared/VisitorCounter.tsx` hardcodes `fmuiin.github.io`, which differs from the configured site URL `fmuiin14.github.io`.
- `fmuiin.md` is the original build brief (owner profile, goals, page list). It is reference material, not app code.
