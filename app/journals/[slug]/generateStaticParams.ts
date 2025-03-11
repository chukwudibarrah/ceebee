// // /app/journals/[slug]/generateStaticParams.ts

// import { client } from '@/lib/client';

// export async function generateStaticParams() {
//   try {
//     const slugs = await client.fetch(`
//       *[_type == "journal"] {
//         "slug": slug.current
//       }
//     `);

//     return slugs;
//   } catch (error) {
//     console.error("Error fetching slugs for static generation:", error);
//     return [];
//   }
// }
