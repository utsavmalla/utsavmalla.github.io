import mongoose, { Schema, Document } from 'mongoose'

export interface ExperienceDocument extends Document {
  title: string
  duration: string
  responsibilities: string[]
}

const ExperienceSchema = new Schema<ExperienceDocument>(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true },
    responsibilities: { type: [String], required: true },
  },
  { timestamps: true }
)

export const ExperienceModel = mongoose.model<ExperienceDocument>('Experience', ExperienceSchema)

