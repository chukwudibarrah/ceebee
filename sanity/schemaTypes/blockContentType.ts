// /sanity/schemaTypes/blockContentType.ts

import { defineType, defineArrayMember } from "sanity";
import { ImageIcon, CodeIcon } from "@sanity/icons";

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    // Code block for syntax highlighting
    defineArrayMember({
      name: "code",
      title: "Code Block",
      type: "object",
      icon: CodeIcon,
      preview: {
        select: {
          title: "filename",
          subtitle: "language",
          code: "code",
        },
        prepare({ title, subtitle, code }) {
          return {
            title: title || "Code Block",
            subtitle: subtitle
              ? `Language: ${subtitle}`
              : "No language specified",
            // Show the first few characters of the code
            media: CodeIcon,
          };
        },
      },
      fields: [
        {
          name: "language",
          title: "Language",
          type: "string",
          options: {
            list: [
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "JSX", value: "jsx" },
              { title: "TSX", value: "tsx" },
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
              { title: "SCSS", value: "scss" },
              { title: "JSON", value: "json" },
              { title: "Python", value: "python" },
              { title: "PHP", value: "php" },
              { title: "Ruby", value: "ruby" },
              { title: "Go", value: "go" },
              { title: "Java", value: "java" },
              { title: "C", value: "c" },
              { title: "C++", value: "cpp" },
              { title: "C#", value: "csharp" },
              { title: "Rust", value: "rust" },
              { title: "Swift", value: "swift" },
              { title: "Kotlin", value: "kotlin" },
              { title: "Bash", value: "bash" },
              { title: "SQL", value: "sql" },
              { title: "GraphQL", value: "graphql" },
              { title: "Markdown", value: "markdown" },
              { title: "YAML", value: "yaml" },
              { title: "Plain text", value: "text" },
            ],
          },
        },
        {
          name: "code",
          title: "Code",
          type: "text",
        },
        {
          name: "filename",
          title: "Filename (optional)",
          type: "string",
        },
      ],
    }),
  ],
});
