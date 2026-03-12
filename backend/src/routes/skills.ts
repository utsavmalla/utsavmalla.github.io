import { Router } from 'express'
import { SkillModel } from '../models/Skill'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const skills = await SkillModel.find().sort({ createdAt: 1 }).lean()
    res.json(skills)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching skills', err)
    res.status(500).json({ message: 'Failed to fetch skills' })
  }
})

export default router

