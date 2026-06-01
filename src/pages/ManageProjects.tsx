import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import StatusMessage from '../components/ui/StatusMessage'
import { fetchAdminProjects, softDeleteProject, updateProject } from '../api/client'
import '../styles/globals.css'

interface AdminProject {
  _id: string
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  link: string
}

type ProjectFormData = Pick<AdminProject, 'title' | 'description' | 'image' | 'imageAlt' | 'link'>
type ActionFeedback = {
  type: 'success' | 'error' | 'progress'
  message: string
  area: 'form' | 'list'
} | null

const emptyFormData: ProjectFormData = {
  title: '',
  description: '',
  image: '',
  imageAlt: '',
  link: '',
}

const ManageProjects = () => {
  const [projects, setProjects] = useState<AdminProject[]>([])
  const [selectedProject, setSelectedProject] = useState<AdminProject | null>(null)
  const [formData, setFormData] = useState<ProjectFormData>(emptyFormData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [projectPendingDelete, setProjectPendingDelete] = useState<AdminProject | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [actionFeedback, setActionFeedback] = useState<ActionFeedback>(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchAdminProjects()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    void loadProjects()
  }, [])

  useEffect(() => {
    if (actionFeedback?.type !== 'success') {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setSuccess(null)
      setActionFeedback(null)
    }, 4000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [actionFeedback])

  const selectProject = (project: AdminProject) => {
    setSelectedProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      imageAlt: project.imageAlt,
      link: project.link,
    })
    setError(null)
    setSuccess(null)
    setActionFeedback(null)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCancel = () => {
    setSelectedProject(null)
    setFormData(emptyFormData)
    setError(null)
    setSuccess(null)
    setActionFeedback(null)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedProject) {
      return
    }

    setSaving(true)
    setError(null)
    setSuccess(null)
    setActionFeedback({ type: 'progress', message: 'Saving changes...', area: 'form' })

    try {
      const updatedProject = await updateProject(selectedProject._id, formData)
      setProjects((current) =>
        current.map((project) => (project._id === updatedProject._id ? updatedProject : project))
      )
      setSelectedProject(updatedProject)
      setSuccess('Project updated successfully')
      setActionFeedback({ type: 'success', message: 'Project updated successfully', area: 'form' })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update project'
      setError(message)
      setActionFeedback({ type: 'error', message, area: 'form' })
    } finally {
      setSaving(false)
    }
  }

  const requestDelete = (project: AdminProject) => {
    setProjectPendingDelete(project)
    setError(null)
    setSuccess(null)
    setActionFeedback(null)
  }

  const closeDeleteDialog = () => {
    if (deletingId) {
      return
    }

    setProjectPendingDelete(null)
  }

  const confirmDelete = async () => {
    if (!projectPendingDelete) {
      return
    }

    const project = projectPendingDelete
    setDeletingId(project._id)
    setError(null)
    setSuccess(null)
    setActionFeedback({ type: 'progress', message: `Deleting ${project.title}...`, area: 'list' })

    try {
      await softDeleteProject(project._id)
      setProjects((current) => current.filter((item) => item._id !== project._id))
      if (selectedProject?._id === project._id) {
        setSelectedProject(null)
        setFormData(emptyFormData)
      }
      setSuccess('Project deleted successfully')
      setActionFeedback({ type: 'success', message: 'Project deleted successfully', area: 'list' })
      setProjectPendingDelete(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete project'
      setError(message)
      setActionFeedback({ type: 'error', message, area: 'list' })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <Helmet>
        <title>Manage Projects — Utsav Malla</title>
      </Helmet>

      <Header />

      <main id="main" className="admin-page">
        <div className="container admin-page-inner">
          <div className="admin-heading">
            <p className="eyebrow">Admin</p>
            <h1>Manage Projects</h1>
            <p>Edit active portfolio projects or delete projects that should no longer appear publicly.</p>
          </div>

          {(error || success) && (
            <StatusMessage type={error ? 'error' : 'success'}>
              {error || success}
            </StatusMessage>
          )}

          <div className="project-manager">
            <section className="project-manager-panel" aria-labelledby="project-list-heading">
              <div className="project-manager-panel-header">
                <h2 id="project-list-heading">Active Projects</h2>
                <a className="btn ghost" href="/add-project">
                  Add Project
                </a>
              </div>

              {actionFeedback?.area === 'list' && (
                <StatusMessage type={actionFeedback.type} className="is-inline">
                  {actionFeedback.message}
                </StatusMessage>
              )}

              {loading ? (
                <p className="admin-muted">Loading projects...</p>
              ) : projects.length > 0 ? (
                <div className="admin-project-list">
                  {projects.map((project) => (
                    <article
                      key={project._id}
                      className={`admin-project-list-item${
                        selectedProject?._id === project._id ? ' is-selected' : ''
                      }`}
                    >
                      <div>
                        <h3>{project.title}</h3>
                        <p>{project.id}</p>
                      </div>
                      <div className="admin-project-actions">
                        <button type="button" className="btn ghost" onClick={() => selectProject(project)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn danger"
                          disabled={deletingId === project._id}
                          onClick={() => requestDelete(project)}
                        >
                          {deletingId === project._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="admin-muted">No active projects found.</p>
              )}
            </section>

            <section className="project-manager-panel" aria-labelledby="project-edit-heading">
              <h2 id="project-edit-heading">Edit Project</h2>

              {selectedProject ? (
                <form className="admin-form" onSubmit={handleSubmit}>
                  {actionFeedback?.area === 'form' && (
                    <StatusMessage type={actionFeedback.type} className="is-inline">
                      {actionFeedback.message}
                    </StatusMessage>
                  )}

                  <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" value={formData.title} onChange={handleChange} required />
                  </div>

                  <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={7}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="image">Image Path/URL</label>
                    <input id="image" name="image" value={formData.image} onChange={handleChange} required />
                  </div>

                  <div>
                    <label htmlFor="imageAlt">Image Alt Text</label>
                    <input id="imageAlt" name="imageAlt" value={formData.imageAlt} onChange={handleChange} required />
                  </div>

                  <div>
                    <label htmlFor="link">Project Link</label>
                    <input id="link" name="link" value={formData.link} onChange={handleChange} required />
                  </div>

                  <div className="admin-form-actions">
                    <button type="submit" className="btn primary" disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button type="button" className="btn ghost" disabled={saving} onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <p className="admin-muted">Choose a project from the list to edit its details.</p>
              )}
            </section>
          </div>
        </div>
      </main>

      <ConfirmDialog
        open={Boolean(projectPendingDelete)}
        title="Delete project?"
        confirmLabel={deletingId ? 'Deleting...' : 'Delete Project'}
        cancelLabel="Cancel"
        isLoading={Boolean(deletingId)}
        danger
        onCancel={closeDeleteDialog}
        onConfirm={() => void confirmDelete()}
      >
        {projectPendingDelete && (
          <>
            {/* <p>
              Delete <strong>{projectPendingDelete.title}</strong> from the active project list?
            </p> */}
            <p className="admin-muted">
              The project will be removed from the portfolio. This action cannot be undone.
            </p>
            {deletingId === projectPendingDelete._id && (
              <StatusMessage type="progress" className="is-inline">
                Deleting {projectPendingDelete.title}...
              </StatusMessage>
            )}
          </>
        )}
      </ConfirmDialog>

      <Footer />
    </>
  )
}

export default ManageProjects
