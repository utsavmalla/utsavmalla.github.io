import { Router } from 'express'
import mongoose from 'mongoose'
import {
  ProjectModel,
  editableProjectFields,
  findActiveProjects,
  softDeleteProject,
  updateActiveProject,
  type ProjectUpdateInput,
} from '../models/Project'
import { verifyAuth } from '../middleware/auth'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const projects = await findActiveProjects()
    res.json(projects)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching projects', err)
    res.status(500).json({ message: 'Failed to fetch projects' })
  }
})

router.get('/admin', verifyAuth, async (_req, res) => {
  try {
    const projects = await findActiveProjects()
    res.json(projects)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching admin projects', err)
    res.status(500).json({ message: 'Failed to fetch projects' })
  }
})

router.post('/', verifyAuth, async (req, res) => {
  try {
    const { id, title, description, image, imageAlt, link } = req.body

    if (!title || !description || !image || !imageAlt || !link) {
      res.status(400).json({ message: 'All fields except ID are required' })
      return
    }

    const newProject = new ProjectModel({
      ...(id && { id }),
      title,
      description,
      image,
      imageAlt,
      link,
    })

    const savedProject = await newProject.save()
    res.status(201).json(savedProject)
  } catch (err: any) {
    console.error('Error creating project', err)
    if (err.code === 11000) {
      res.status(409).json({ message: 'Project with this ID already exists' })
      return
    }
    res.status(500).json({ message: 'Failed to create project' })
  }
})

router.put('/:projectId', verifyAuth, async (req, res) => {
  try {
    const { projectId } = req.params

    if (typeof projectId !== 'string' || !mongoose.isValidObjectId(projectId)) {
      res.status(400).json({ message: 'Invalid project ID' })
      return
    }

    const updates = editableProjectFields.reduce<Partial<ProjectUpdateInput>>((acc, field) => {
      const value = req.body[field]
      if (typeof value === 'string') {
        acc[field] = value.trim()
      }
      return acc
    }, {})

    const hasMissingField = editableProjectFields.some((field) => !updates[field])
    if (hasMissingField) {
      res.status(400).json({ message: 'Title, description, image, image alt text, and link are required' })
      return
    }

    const updatedProject = await updateActiveProject(projectId, updates as ProjectUpdateInput)

    if (!updatedProject) {
      res.status(404).json({ message: 'Project not found' })
      return
    }

    res.json(updatedProject)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error updating project', err)
    res.status(500).json({ message: 'Failed to update project' })
  }
})

router.delete('/:projectId', verifyAuth, async (req, res) => {
  try {
    const { projectId } = req.params

    if (typeof projectId !== 'string' || !mongoose.isValidObjectId(projectId)) {
      res.status(400).json({ message: 'Invalid project ID' })
      return
    }

    const deletedProject = await softDeleteProject(projectId, req.userId || 'unknown')

    if (!deletedProject) {
      res.status(404).json({ message: 'Project not found' })
      return
    }

    res.json({ message: 'Project deleted successfully', project: deletedProject })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error deleting project', err)
    res.status(500).json({ message: 'Failed to delete project' })
  }
})

export default router

