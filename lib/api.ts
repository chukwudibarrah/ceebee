import * as contentful from "contentful";
import { ArticleEntry, ArticleSkeleton } from "./contentfulTypes";

export const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

export async function getArticle(slug: string): Promise<ArticleEntry | null> {
  try {
    const response = await client.getEntries<ArticleSkeleton>({
      content_type: "journal",
      "fields.slug": slug,
    } as any); // Casting to `any` to bypass TypeScript error

    if (response.items.length > 0) {
      return response.items[0] as ArticleEntry;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
}
