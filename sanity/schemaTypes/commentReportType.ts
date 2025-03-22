// /sanity/schemaTypes/commentType.ts

import { CommentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";


export const commentReportType = defineType({
    name: "commentReport",
    title: "Comment Report",
    type: "document",
    fields: [
      defineField({
        name: "comment",
        title: "Reported Comment",
        type: "reference",
        to: { type: "comment" },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "reportedBy",
        title: "Reported By",
        type: "reference",
        to: { type: "user" },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "reporterName",
        title: "Reporter Name",
        type: "string",
      }),
      defineField({
        name: "reporterEmail",
        title: "Reporter Email",
        type: "string",
      }),
      defineField({
        name: "reason",
        title: "Reason",
        type: "text",
      }),
      defineField({
        name: "status",
        title: "Status",
        type: "string",
        options: {
          list: [
            { title: "Pending", value: "pending" },
            { title: "Reviewed", value: "reviewed" },
            { title: "Ignored", value: "ignored" },
            { title: "Comment Removed", value: "removed" },
          ],
        },
        initialValue: "pending",
      }),
      defineField({
        name: "createdAt",
        title: "Created At",
        type: "datetime",
        options: {
          dateFormat: "DD-MM-YYYY",
          timeFormat: "HH:mm",
        },
        initialValue: new Date().toISOString(),
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "resolvedAt",
        title: "Resolved At",
        type: "datetime",
        options: {
          dateFormat: "DD-MM-YYYY",
          timeFormat: "HH:mm",
        },
      }),
      defineField({
        name: "resolvedBy",
        title: "Resolved By",
        type: "reference",
        to: { type: "user" },
      }),
      defineField({
        name: "notes",
        title: "Admin Notes",
        type: "text",
      }),
    ],
    preview: {
      select: {
        title: "reason",
        comment: "comment.text",
        date: "createdAt",
        status: "status",
      },
      prepare({ title, comment, date, status }) {
        return {
          title: title || "Report",
          subtitle: `${status} • ${date ? `on ${date}` : ''}`,
        };
      },
    },
  });
  