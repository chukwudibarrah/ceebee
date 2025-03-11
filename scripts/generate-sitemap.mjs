// scripts/generate-sitemap.mjs

import { promises as fs } from 'fs';
import { globby } from 'globby';
import { createClient } from '@sanity/client';

async function generateSiteMap() {
  const pages = await globby([
    "pages/**/*.tsx",
    "app/**/*.tsx",
    "!app/**/_*.tsx",
    "!app/**/components/**",
    "!app/**/layout.tsx",
    "!app/**/[slug]/page.tsx",
    "!app/api/**",
    "!pages/_*.tsx",
    "!pages/**/[slug].tsx",
    "!pages/api/**",
  ]);

  // Initialize Sanity client
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-10',
    useCdn: process.env.NODE_ENV === 'production',
  });

  const currentDate = new Date().toISOString();

  // Query Sanity for journal posts
  const journalPosts = await fetchJournalPosts(client);
  const postSlugs = journalPosts.map(post => post.slug.current);

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
      .replace("app", "")
      .replace("/page", "")
      .replace(".js", "")
      .replace(".tsx", "")
      .replace(".md", "");
    const route = path === "/index" ? "" : path;
    
    // Skip dynamic routes and special files
    if (route.includes('[') || route.includes('_')) {
      return '';
    }
    
    return `
    <url>
      <loc>${`https://chukwudibarrah.com${route}`}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>`;
  }).join("")}
  ${postSlugs.map((slug) => {
    return `
    <url>
      <loc>${`https://chukwudibarrah.com/journal/${slug}`}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>`;
  }).join("")}
</urlset>`;

  await fs.writeFile("public/sitemap.xml", sitemap.trim());
  console.log('Sitemap generated successfully!');
}

// Function to fetch journal posts from Sanity
async function fetchJournalPosts(client) {
  try {
    // GROQ query to get all published journal posts with their slugs
    const query = `*[_type == "journal" && defined(slug.current)] {
      slug,
      _updatedAt
    }`;
    
    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error('Error fetching posts from Sanity:', error);
    return [];
  }
}

// Execute the function
generateSiteMap();
