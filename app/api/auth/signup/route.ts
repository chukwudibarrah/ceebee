// /app/api/auth/signup/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
// In a real app, you'd use a library like bcrypt
// import bcrypt from 'bcryptjs';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-10',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN // Use a token with write access
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // In a real app, you'd hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user in Sanity
    const newUser = await client.create({
      _type: 'user',
      name,
      email,
      // In a real app, store the hashed password
      password: password, // NOT SECURE - for demo only
      createdAt: new Date().toISOString()
    });

    // Return the new user data (excluding sensitive info)
    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Sign up error:', error);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
