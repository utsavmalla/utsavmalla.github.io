import 'dotenv/config'
import mongoose from 'mongoose'

import { ProjectModel } from '../models/Project'
import { ExperienceModel } from '../models/Experience'
import { SkillModel } from '../models/Skill'

import { projectsSeed } from '../seed-data/projects'
import { experienceSeed } from '../seed-data/experience'
import { skillsSeed } from '../seed-data/skills'

async function seed() {
  const mongoUri = process.env.MONGODB_URI //?? 'mongodb://127.0.0.1:27017/portfolio'

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

    await ProjectModel.insertMany(projectsSeed)
    await ExperienceModel.insertMany(experienceSeed)
    await SkillModel.insertMany(skillsSeed)

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

