const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export function getCvDownloadUrl() {
  return `${API_BASE_URL}/api/cv/download`
}

export async function fetchProjects() {
  const res = await fetch(`${API_BASE_URL}/api/projects`)
  if (!res.ok) {
    throw new Error('Failed to fetch projects')
  }
  return res.json()
}

export async function fetchAdminProjects() {
  const res = await fetch(`${API_BASE_URL}/api/projects/admin`, {
    credentials: 'include',
  })
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
    credentials: 'include',
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error('Failed to create project')
  }
  return res.json()
}

export async function updateProject(
  projectId: string,
  data: {
    title: string
    description: string
    image: string
    imageAlt: string
    link: string
  }
) {
  const res = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    throw new Error(errorData?.message || 'Failed to update project')
  }
  return res.json()
}

export async function softDeleteProject(projectId: string) {
  const res = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    throw new Error(errorData?.message || 'Failed to delete project')
  }
  return res.json()
}

export async function fetchCv() {
  const res = await fetch(`${API_BASE_URL}/api/cv`)
  if (!res.ok) {
    throw new Error('Failed to fetch CV metadata')
  }
  return res.json()
}

export async function uploadCv(file: File) {
  const formData = new FormData()
  formData.append('cv', file)

  const res = await fetch(`${API_BASE_URL}/api/cv`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  })

  if (!res.ok) {
    const data = await res.json().catch(() => null)
    throw new Error(data?.message || 'Failed to upload CV')
  }

  return res.json()
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw new Error('Failed to login');
  }
  return res.json();
}

export async function logout() {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to logout');
  }
  return res.json();
}

export async function checkAuth() {
  const res = await fetch(`${API_BASE_URL}/api/auth/check`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Not authenticated');
  }
  return res.json();
}

