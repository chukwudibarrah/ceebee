import { Document } from "@contentful/rich-text-types";
import { Asset, Entry, EntrySkeletonType } from "contentful";

// Define the structure for the Image fields
interface ImageFields {
  file: {
    url: string;
    details: {
      image: {
        width: number;
        height: number;
      };
    };
  };
  description: string;
}

type AssetWithFields<T> = Asset & T;

// Define the structure for the Article fields
export interface ArticleFields {
  title: string;
  related: string;
  slug: string;
  content: Document;
  published: string;
  featuredImage?: AssetWithFields<ImageFields>;
}

// export interface RelatedArticleFields {
//   title: string;
//   slug: string;
//   description: string;
//   published: string;
//   featuredImage?: AssetWithFields<ImageFields>;
// }

// Define the structure for the Article skeleton
export interface ArticleSkeleton extends EntrySkeletonType {
  contentTypeId: "journal";
  fields: ArticleFields;
  // field: RelatedArticleFields;
}

// Define the structure for the Article Entry
export type ArticleEntry = Entry<ArticleSkeleton>;
