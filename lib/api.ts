// lib/api.ts - Server functions for Sanity data

import { client, groq } from './client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export type ArticleEntry = {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  description?: string
  image?: SanityImageSource
  content: any
  category: string
  related?: ArticleEntry[]
}

/**
 * Get a single article by slug
 */
export async function getArticle(slug: string): Promise<ArticleEntry | null> {
  try {
    const article = await client.fetch(
      groq`*[_type == "journal" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        publishedAt,
        description,
        image,
        content,
        category,
        "related": related[]-> {
          _id,
          title,
          slug,
          description,
          image,
          category
        }
      }`,
      { slug }
    )
    
    return article
  } catch (error) {
    console.error("Error fetching article:", error)
    throw error
  }
}

/**
 * Get all articles
 */
export async function getAllArticles() {
  try {
    const articles = await client.fetch(
      groq`*[_type == "journal"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        description,
        image,
        category
      }`
    )
    
    return articles
  } catch (error) {
    console.error("Error fetching articles:", error)
    throw error
  }
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(category: string) {
  try {
    const articles = await client.fetch(
      groq`*[_type == "journal" && category == $category] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        description,
        image,
        category
      }`,
      { category }
    )
    
    return articles
  } catch (error) {
    console.error("Error fetching articles by category:", error)
    throw error
  }
}

/**
 * Get articles grouped by year and month
 */
export async function getGroupedArticlesByYear() {
  try {
    const articles = await getAllArticles()
    
    const groupedPostsByYear = articles.reduce((acc, post) => {
      const publishedDate = post.publishedAt
      if (typeof publishedDate === "string") {
        // Convert to Date object for proper formatting
        const date = new Date(publishedDate)
        const year = date.getFullYear().toString()
        const month = date.toLocaleString('en-US', { month: 'short' })

        if (!acc[year]) {
          acc[year] = {}
        }

        if (!acc[year][month]) {
          acc[year][month] = []
        }

        acc[year][month].push(post)
      }

      return acc
    }, {})
    
    return groupedPostsByYear
  } catch (error) {
    console.error("Error grouping articles by year:", error)
    throw error
  }
}

/**
 * Get related articles by IDs
 */
export async function getRelatedArticles(ids: string[]): Promise<ArticleEntry[]> {
  if (!ids || ids.length === 0) return []
  
  try {
    const relatedArticles = await client.fetch(
      groq`*[_type == "journal" && _id in $ids] {
        _id,
        title,
        slug,
        description,
        image,
        category
      }`,
      { ids }
    )
    
    return relatedArticles
  } catch (error) {
    console.error("Error fetching related articles:", error)
    throw error
  }
}

/**
 * Get latest articles for home page or featured sections
 */
export async function getLatestArticles(limit = 3) {
  try {
    const articles = await client.fetch(
      groq`*[_type == "journal"] | order(publishedAt desc)[0...$limit] {
        _id,
        title,
        slug,
        publishedAt,
        description,
        image,
        category
      }`,
      { limit: limit - 1 } // Adjust for zero-based index
    )
    
    return articles
  } catch (error) {
    console.error("Error fetching latest articles:", error)
    throw error
  }
}

/**
 * Get unique categories for filtering
 */
export async function getCategories() {
  try {
    const categories = await client.fetch(
      groq`array::unique(*[_type == "journal"].category)`
    )
    
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

/**
 * Get random articles (except the current one)
 */
export async function getRandomArticles(currentSlug: string, limit = 3): Promise<ArticleEntry[]> {
  try {
    // First get all articles except the current one
    const allArticles = await client.fetch(
      groq`*[_type == "journal" && slug.current != $currentSlug] {
        _id,
        title,
        slug,
        publishedAt,
        description,
        image,
        category
      }`,
      { currentSlug }
    )
    
    // Randomize the array and take first 'limit' items
    // Note: In a true server component, this randomization is done at request time
    const shuffled = [...allArticles].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, limit)
  } catch (error) {
    console.error("Error fetching random articles:", error)
    throw error
  }
}

/**
 * Get comments for a specific article
 * Note: This is used by client components, not the server component directly
 */
export async function getComments(journalId: string) {
  try {
    const comments = await client.fetch(
      groq`*[_type == "comment" && journal._ref == $journalId && approved == true] | order(createdAt asc) {
        _id,
        name,
        text,
        createdAt
      }`,
      { journalId }
    )
    
    return comments
  } catch (error) {
    console.error("Error fetching comments:", error)
    throw error
  }
}
