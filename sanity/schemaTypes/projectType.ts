// /sanity/schemaTypes/projectType.ts

import { ProjectsIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          {
            title: "Editing and copywriting",
            value: "Editing and copywriting",
          },
          { title: "Podcasting", value: "Podcasting" },
          { title: "Web development", value: "Web development" },
          { title: "Web editing", value: "Web editing" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "featuredImage",
    },
    prepare(selection) {
      const { title } = selection;
      return { ...selection, subtitle: title && `by ${title}` };
    },
  },
});
