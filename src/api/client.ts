const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export async function fetchProjects() {
  const res = await fetch(`${API_BASE_URL}/api/projects`)
  if (!res.ok) {
    throw new Error('Failed to fetch projects')
  }
  return res.json()
}

export async function fetchExperience() {
  const res = await fetch(`${API_BASE_URL}/api/experience`)
  if (!res.ok) {
    throw new Error('Failed to fetch experience')
  }
  return res.json()
}

export async function fetchSkills() {
  const res = await fetch(`${API_BASE_URL}/api/skills`)
  if (!res.ok) {
    throw new Error('Failed to fetch skills')
  }
  return res.json()
}

export async function createProject(data: {
  id?: string
  title: string
  description: string
  image: string
  imageAlt: string
  link: string
}) {
  const res = await fetch(`${API_BASE_URL}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error('Failed to create project')
  }
  return res.json()
}

