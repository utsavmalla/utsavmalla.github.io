import mongoose, { Schema, Document } from 'mongoose'

export interface SkillDocument extends Document {
  name: string
  proficiency: number
}

const SkillSchema = new Schema<SkillDocument>(
  {
    name: { type: String, required: true },
    proficiency: { type: Number, required: true },
  },
  { timestamps: true }
)

export const SkillModel = mongoose.model<SkillDocument>('Skill', SkillSchema)

