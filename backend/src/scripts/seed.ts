import 'dotenv/config'
import mongoose from 'mongoose'

import { ProjectModel } from '../models/Project'
import { ExperienceModel } from '../models/Experience'
import { SkillModel } from '../models/Skill'

// Import the static data from the frontend so we keep a single source of truth
// Paths are relative to backend/src/scripts
import { projects } from '../../../src/data/projects'
import { experience } from '../../../src/data/experience'
import { skills } from '../../../src/data/skills'

async function seed() {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set')
  }

  await mongoose.connect(mongoUri)

  try {
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB, starting seed...')

    await ProjectModel.deleteMany({})
    await ExperienceModel.deleteMany({})
    await SkillModel.deleteMany({})

    await ProjectModel.insertMany(projects)
    await ExperienceModel.insertMany(experience)
    await SkillModel.insertMany(skills)

    // eslint-disable-next-line no-console
    console.log('Seeding completed successfully')
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while seeding data', err)
  } finally {
    await mongoose.disconnect()
  }
}

void seed()

