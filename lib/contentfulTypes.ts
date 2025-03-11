// import { Document } from "@contentful/rich-text-types";
// import { Asset, Entry, EntrySkeletonType } from "contentful";

// interface ImageFields {
//   file: {
//     url: string;
//     details: {
//       image: {
//         width: number;
//         height: number;
//       };
//     };
//   };
//   description: string;
// }

// type AssetWithFields<T> = Asset & T;

// export interface ArticleFields {
//   title: string;
//   slug: string;
//   description: string;
//   related: string[]; // Assuming related entry IDs are strings
//   content: Document;
//   published: string;
//   featuredImage?: AssetWithFields<ImageFields>;
//   relatedArticles: ArticleEntry[] | null; // Define relatedArticles as an array of ArticleEntry
//   [key: string]: any; // Allow for additional dynamic properties
// }

// export interface ArticleSkeleton extends EntrySkeletonType {
//   contentTypeId: "journal";
//   fields: ArticleFields;
// }

// export type ArticleEntry = Entry<ArticleSkeleton>;
