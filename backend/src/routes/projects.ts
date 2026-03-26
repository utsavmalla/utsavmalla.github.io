import { Router } from 'express'
import { ProjectModel } from '../models/Project'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const projects = await ProjectModel.find().sort({ createdAt: 1 }).lean()
    res.json(projects)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching projects', err)
    res.status(500).json({ message: 'Failed to fetch projects' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { id, title, description, image, imageAlt, link } = req.body

    if (!id || !title || !description || !image || !imageAlt || !link) {
      res.status(400).json({ message: 'All fields are required' })
      return
    }

    const newProject = new ProjectModel({
      id,
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

export default router

