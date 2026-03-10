import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import projectsRouter from './routes/projects'
import experienceRouter from './routes/experience'
import skillsRouter from './routes/skills'

const app = express()

const port = process.env.PORT ? Number(process.env.PORT) : 4000
const mongoUri = process.env.MONGODB_URI as string
const corsOrigin = process.env.CORS_ORIGIN || '*'

if (!mongoUri) {
  throw new Error('MONGODB_URI is not set')
}

app.use(
  cors({
    origin: corsOrigin,
  })
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/projects', projectsRouter)
app.use('/api/experience', experienceRouter)
app.use('/api/skills', skillsRouter)

async function start() {
  try {
    await mongoose.connect(mongoUri)
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB')

    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Backend listening on port ${port}`)
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

void start()

