// /app/api/auth/signin/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-10',
  useCdn: false, // For authentication, always set to false
  token: process.env.SANITY_API_TOKEN // Use a token with read access
});

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // In a real implementation, you'd:
    // 1. Check the email exists in your database
    // 2. Verify the password against a stored hash
    // 3. Generate a JWT or session token
    
    // For demo purposes, we'll query Sanity for the user
    const query = `*[_type == "user" && email == $email][0]{
      _id,
      name,
      email,
      "hashedPassword": password
    }`;

    const user = await client.fetch(query, { email });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // In a real app, you'd verify the password here
    // This is just a simplified example
    // const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    
    // For demo purposes, we'll assume the password is correct
    // DO NOT USE THIS IN PRODUCTION
    const passwordMatch = true;

    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Remove sensitive data before sending response
    const { hashedPassword, ...safeUser } = user;

    // Return the user data
    return NextResponse.json({
      message: 'Signed in successfully',
      user: {
        id: safeUser._id,
        name: safeUser.name,
        email: safeUser.email
      }
    });
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
