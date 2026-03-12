import { Router } from 'express'
import { ExperienceModel } from '../models/Experience'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const items = await ExperienceModel.find().sort({ createdAt: 1 }).lean()
    res.json(items)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching experience', err)
    res.status(500).json({ message: 'Failed to fetch experience' })
  }
})

export default router

