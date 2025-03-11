// /lib/projectApi.ts

import { client, groq } from './client'

export type Project = {
  _id: string
  title: string
  slug: string
  url: string
  category: string
  description?: string
  image?: any
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(
      groq`*[_type == "project"] | order(title asc) {
        _id,
        title,
        slug,
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

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  try {
    const projects = await client.fetch(
      groq`*[_type == "project" && category == $category] | order(title asc) {
        _id,
        title,
        slug,
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
