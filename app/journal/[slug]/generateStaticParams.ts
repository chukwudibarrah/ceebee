import { client } from "@/lib/api"; // Adjust the import path if necessary

export async function generateStaticParams() {
  try {
    const response = await client.getEntries({
      content_type: "journal",
    });

    const slugs = response.items.map((item) => ({
      slug: item.fields.slug,
    }));

    return slugs;
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }
}
