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
      name: "userId",
      title: "User ID",
      type: "string", 
      description: "ID of the authenticated user who created the comment",
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
    defineField({
      name: "text",
      title: "Comment text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
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
      name: "likes",
      title: "Likes",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "likedBy",
      title: "Liked By",
      type: "array",
      of: [{ type: "reference", to: [{ type: "user" }] }],
    }),
    defineField({
      name: "reported",
      title: "Reported",
      type: "boolean",
      description: "Whether this comment has been reported",
      initialValue: false,
    }),
    defineField({
      name: "reportCount",
      title: "Report Count",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "parentComment",
      title: "Parent Comment",
      type: "reference",
      to: { type: "comment" },
      description: "If this is a reply to another comment",
    }),
  ],
  preview: {
    select: {
      name: "name",
      comment: "text",
      date: "createdAt",
      approved: "approved",
    },
    prepare({ name, comment, date, approved }) {
      const previewComment = comment?.length > 50 ? `${comment.substring(0, 50)}...` : comment;
      return {
        title: previewComment,
        subtitle: `By ${name} ${date ? `on ${date}` : ''} ${approved ? '(Approved)' : '(Pending)'}`,
      };
    },
  },
});
