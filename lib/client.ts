// /lib/client.ts

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-10'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

// For handling image URLs
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Helper function to generate GROQ queries
export const groq = String.raw

// API endpoints for handling comments (for authenticated operations)
export async function createComment(data) {
  const { name, email, text, journalId, userId } = data
  
  return client.create({
    _type: 'comment',
    name,
    email,
    text,
    journal: {
      _type: 'reference',
      _ref: journalId
    },
    userId,
    createdAt: new Date().toISOString(),
    approved: false
  })
}

export async function getApprovedComments(journalId) {
  return client.fetch(
    groq`*[_type == "comment" && journal._ref == $journalId && approved == true] | order(createdAt asc) {
      _id,
      name,
      text,
      createdAt
    }`,
    { journalId }
  )
}
