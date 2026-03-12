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

export default router

