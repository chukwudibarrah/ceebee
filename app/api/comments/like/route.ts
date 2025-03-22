// /app/api/comments/like/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Initialize Sanity client with the API token
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-03-10',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN // This needs write permissions
});

export async function POST(request: NextRequest) {
  try {
    const { commentId } = await request.json();
    
    // Validate input
    if (!commentId) {
      return NextResponse.json(
        { message: 'Comment ID is required' },
        { status: 400 }
      );
    }
    
    // Fetch the current comment to get its likes
    let comment;
    try {
      comment = await client.fetch(
        `*[_type == "comment" && _id == $commentId][0]{
          _id,
          likes
        }`,
        { commentId }
      );
    } catch (fetchError) {
      console.error("Error fetching comment:", fetchError);
      return NextResponse.json(
        { message: 'Error fetching comment' },
        { status: 500 }
      );
    }
    
    if (!comment) {
      return NextResponse.json(
        { message: 'Comment not found' },
        { status: 404 }
      );
    }
    
    // Calculate the new likes count
    const currentLikes = comment.likes || 0;
    const newLikes = currentLikes + 1;
    
    // Update the comment with the new likes count
    try {
      await client
        .patch(commentId)
        .set({ likes: newLikes })
        .commit();
      
      return NextResponse.json({
        message: 'Comment liked successfully',
        likes: newLikes
      });
    } catch (updateError) {
      console.error("Error updating comment likes:", updateError);
      return NextResponse.json(
        { message: 'Error updating comment likes' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in like handler:', error);
    return NextResponse.json(
      { message: 'Failed to process like' },
      { status: 500 }
    );
  }
}
