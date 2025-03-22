// /app/api/comments/report/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { headers } from "next/headers";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-03-10",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // This needs write permissions
});

export async function POST(request: NextRequest) {
  try {
    const { commentId, reason = "Not specified" } = await request.json();

    // Validate input
    if (!commentId) {
      return NextResponse.json(
        { message: "Comment ID is required" },
        { status: 400 }
      );
    }

    // Get user info from auth header
    const headersList = await headers();
    const authHeader = headersList.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    // Extract user info from token
    // This is simplified - in a real app, you'd decode and verify a JWT
    const [_, userInfo] = authHeader.split(" ");
    const [userId, name, email] = userInfo.split(":");

    if (!userId) {
      return NextResponse.json(
        { message: "Invalid authentication token" },
        { status: 401 }
      );
    }

    // Check if comment exists
    const commentExists = await client.fetch(
      `*[_type == "comment" && _id == $commentId][0]._id`,
      { commentId }
    );

    if (!commentExists) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    // Create a report document
    await client.create({
      _type: "commentReport",
      comment: {
        _type: "reference",
        _ref: commentId,
      },
      reportedBy: {
        _type: "reference",
        _ref: userId,
      },
      reporterName: name,
      reporterEmail: email,
      reason,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    // Update the comment to mark it as reported
    await client
      .patch(commentId)
      .set({
        reported: true,
        reportCount: 1, // You could increment this if needed
      })
      .commit();

    return NextResponse.json({
      message: "Comment reported successfully",
    });
  } catch (error) {
    console.error("Error reporting comment:", error);
    return NextResponse.json(
      { message: "Failed to report comment" },
      { status: 500 }
    );
  }
}
