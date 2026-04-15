import 'dotenv/config'
import mongoose from 'mongoose'

import { ProjectModel } from '../models/Project'
import { ExperienceModel } from '../models/Experience'
import { SkillModel } from '../models/Skill'
// import { User } from '../models/User'
// import bcrypt from 'bcrypt'

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

    try {
      // @ts-ignore - this file is gitignored so TS might complain if it's missing on other machines
      const credentialsSeed = await import('./seed-credentials.js').catch(() => import('./seed-credentials.ts'));
      if (credentialsSeed.seedAdminUser) {
        await credentialsSeed.seedAdminUser()
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('⚠️ No local seed-credentials file found. Skipping admin seed.')
    }

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

