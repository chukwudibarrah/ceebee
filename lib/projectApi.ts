import { client, groq } from './client'

export type Project = {
  _id: string
  title: string
  url: string
  category: string
  description?: string
  image?: any
}

/**
 * Get all projects
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(
      groq`*[_type == "project"] | order(title asc) {
        _id,
        title,
        url,
        category,
        description,
        image
      }`
    )
    
    return projects
  } catch (error) {
    console.error("Error fetching projects:", error)
    throw error
  }
}

/**
 * Get projects by category
 */
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  try {
    const projects = await client.fetch(
      groq`*[_type == "project" && category == $category] | order(title asc) {
        _id,
        title,
        url,
        category,
        description,
        image
      }`,
      { category }
    )
    
    return projects
  } catch (error) {
    console.error("Error fetching projects by category:", error)
    throw error
  }
}

/**
 * Get all unique categories from projects
 */
export async function getProjectCategories(): Promise<string[]> {
  try {
    const categories = await client.fetch(
      groq`array::unique(*[_type == "project"].category)`
    )
    
    return categories
  } catch (error) {
    console.error("Error fetching project categories:", error)
    throw error
  }
}
