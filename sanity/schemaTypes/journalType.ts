import { DocumentTextIcon } from "@sanity/icons";
import { format, parseISO } from "date-fns";
import { defineArrayMember, defineField, defineType } from "sanity";

export const journalType = defineType({
  name: "journal",
  title: "Journal",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    defineField({
      name: "image",
      title: "Featured image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Guides", value: "Guides" },
          { title: "Opinion", value: "Opinion" },
          { title: "Lifestyle", value: "Lifestyle" },
          { title: "Tech", value: "Tech" },
          { title: "Culture", value: "Culture" },
          { title: "Society", value: "Society" },
          { title: "Books", value: "Books" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'related',
      title: 'Related journals',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'journal' } }],
      description: 'Select related articles (optional)'
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "publishedAt",
      media: "image",
    },
    prepare({ title, media, date }) {
      const subtitles = [
        date && `on ${format(parseISO(date), "LLL d, yyyy")}`,
      ].filter(Boolean);

      return { title, media, subtitle: subtitles.join(" ") };
    },
  },
});
