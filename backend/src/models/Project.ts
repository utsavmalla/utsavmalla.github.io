import mongoose, { Schema, Document } from 'mongoose'

export interface ProjectDocument extends Document {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  link: string
}

const ProjectSchema = new Schema<ProjectDocument>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    imageAlt: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
)

export const ProjectModel = mongoose.model<ProjectDocument>('Project', ProjectSchema)

