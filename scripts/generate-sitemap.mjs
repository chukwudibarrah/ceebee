import { promises as fs } from 'fs';
import { globby } from 'globby';
import pkg from 'contentful';

const { createClient } = pkg;

async function generateSiteMap() {
  const pages = await globby([
    "pages/**/*.tsx",
    "!pages/_*.tsx",
    "!pages/**/[slug].tsx",
    "!pages/api",
  ]);

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  const currentDate = new Date().toISOString();

  const journalPosts = await client
    .getEntries({ content_type: "journal", order: "sys.createdAt" })
    .then((response) => {
      const posts = generateJournalPosts(response.items);
      return posts;
    });

  const notePaths = journalPosts.map(({ fields: { slug } }) => slug);

  // Static pages to include
  const staticPages = [
    { loc: "/", priority: "1.0" },
    { loc: "/about", priority: "0.8" },
    { loc: "/journal", priority: "0.8" },
    { loc: "/projects", priority: "0.8" },
    { loc: "/404", priority: "0.5" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map((page) => {
    return `
    <url>
      <loc>https://chukwudibarrah.com${page.loc}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${page.priority}</priority>
    </url>`;
  }).join("")}
  ${pages.map((page) => {
    const path = page
      .replace("pages", "")
      .replace(".js", "")
      .replace(".tsx", "")
      .replace(".md", "");
    const route = path === "/index" ? "" : path;
    return `
    <url>
      <loc>${`https://chukwudibarrah.com${route}`}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>`;
  }).join("")}
  ${notePaths.map((route) => {
    return `
    <url>
      <loc>${`https://chukwudibarrah.com/notes/${route}`}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>`;
  }).join("")}
</urlset>`;

  await fs.writeFile("public/sitemap.xml", sitemap.trim());
}

// Custom utility function to extract journal posts
function generateJournalPosts(items) {
  return items.map(item => {
    return {
      fields: {
        slug: item.fields.slug,
      }
    };
  });
}

generateSiteMap();
