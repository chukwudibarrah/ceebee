// /app/api/comments/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-03-10',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN // Make sure this is your developer token
});

// GET handler to fetch comments for a journal
export async function GET(request: NextRequest) {
  try {
    // Get journal ID from query params
    const { searchParams } = new URL(request.url);
    const journalId = searchParams.get('journalId');

    if (!journalId) {
      return NextResponse.json(
        { message: 'Journal ID is required' },
        { status: 400 }
      );
    }

    // Fetch comments from Sanity - only get already approved ones
    const query = `*[_type == "comment" && journal._ref == $journalId && approved == true] | order(createdAt desc) {
      _id,
      name,
      text,
      createdAt,
      likes
    }`;
    
    const comments = await client.fetch(query, { journalId });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { message: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST handler to create a new comment
export async function POST(request: NextRequest) {
  try {
    const { journalId, text, user } = await request.json();
    
    // User data should be passed from the frontend now
    if (!user || !user.id || !user.name || !user.email) {
      return NextResponse.json(
        { message: 'User information is required' },
        { status: 400 }
      );
    }

    // Validate input
    if (!journalId || !text.trim()) {
      return NextResponse.json(
        { message: 'Journal ID and comment text are required' },
        { status: 400 }
      );
    }

    // Check if journal exists - simple existence check
    let journalExists = true;
    try {
      const journal = await client.fetch(
        `*[_type == "journal" && _id == $journalId][0]._id`,
        { journalId }
      );
      if (!journal) {
        journalExists = false;
      }
    } catch (error) {
      console.error("Error checking if journal exists:", error);
      // Continue anyway - the journal ID might be correct even if the fetch fails
    }

    if (!journalExists) {
      console.warn(`Journal with ID ${journalId} not found, but continuing anyway`);
    }

    console.log("Creating comment for journal:", journalId, "by user:", user.name);
    
    // Create the comment
    try {
      const newComment = await client.create({
        _type: 'comment',
        journal: {
          _type: 'reference',
          _ref: journalId
        },
        name: user.name,
        email: user.email,
        text,
        userId: user.id,
        approved: false,
        createdAt: new Date().toISOString(),
        likes: 0
      });

      console.log("Comment created successfully:", newComment._id);

      return NextResponse.json({
        message: 'Comment submitted successfully',
        commentId: newComment._id
      });
    } catch (createError) {
      console.error("Error creating comment:", createError);
      return NextResponse.json(
        { message: 'Failed to create comment. Error: ' + (createError.message || 'Unknown error') },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { message: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
