// /sanity/schemaTypes/commentType.ts

import { CommentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const commentType = defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      options: {
        dateFormat: "DD-MM-YYYY",
        timeFormat: "HH:mm",
        timeStep: 15,
      },
      initialValue: new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    {
      name: "text",
      title: "Comment text",
      type: "text",
      rows: 3,
    },
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      description: "Comments must be approved before they appear on the site",
      initialValue: false,
    }),
    defineField({
      name: "journal",
      title: "Journal",
      type: "reference",
      to: { type: "journal" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      description: "ID of the authenticated user who created the comment",
    }),
  ],
  preview: {
    select: {
      name: "name",
      date: "createdAt",
    },
    prepare(selection) {
      const { name } = selection;
      return { ...selection, subtitle: name && `by ${name}` };
    },
  },
});
