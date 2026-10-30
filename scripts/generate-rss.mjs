import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");

const siteConfig = {
  name: "Fathul Muiin",
  url: "https://fmuiin14.github.io",
  description:
    "Building scalable software that solves real-world business problems.",
};

// Project slugs (must match content/data/projects.ts)
const projectSlugs = [
  "wmedia-ticketing-system",
  "trustevolve-ai",
  "careerlift",
  "growthpedia",
  "blips-life",
  "reinsurance-management-system",
];

function getAllPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const fileContent = fs.readFileSync(
        path.join(BLOG_DIR, filename),
        "utf-8"
      );
      const { data } = matter(fileContent);
      return {
        slug,
        title: data.title || "",
        excerpt: data.excerpt || "",
        date: data.date || "",
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRss() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <guid>${siteConfig.url}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} - Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, "feed.xml"), rss);
  console.log("RSS feed generated at public/feed.xml");
}

function generateSitemap() {
  const posts = getAllPosts();
  const today = new Date().toISOString().split("T")[0];

  const staticPages = [
    { url: "", priority: "1.0" },
    { url: "/about", priority: "0.8" },
    { url: "/projects", priority: "0.8" },
    { url: "/experience", priority: "0.8" },
    { url: "/open-source", priority: "0.8" },
    { url: "/blog", priority: "0.8" },
    { url: "/resume", priority: "0.7" },
    { url: "/contact", priority: "0.7" },
    { url: "/uses", priority: "0.6" },
    { url: "/now", priority: "0.6" },
  ];

  const urls = [
    ...staticPages.map(
      (page) => `  <url>
    <loc>${siteConfig.url}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    ),
    ...projectSlugs.map(
      (slug) => `  <url>
    <loc>${siteConfig.url}/projects/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    ),
    ...posts.map(
      (post) => `  <url>
    <loc>${siteConfig.url}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    ),
  ].join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), sitemap);
  console.log("Sitemap generated at public/sitemap.xml");
}

generateRss();
generateSitemap();
