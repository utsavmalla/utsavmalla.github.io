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
    id: { type: String, required: false, unique: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    imageAlt: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
)

// Generate ID from title before saving if not provided
ProjectSchema.pre('save', async function () {
  if (!this.id) {
    // Generate ID from title: convert to lowercase, replace spaces and special chars with hyphens
    const generatedId = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    
    if (!generatedId) {
      throw new Error(`Cannot generate ID from title: "${this.title}" contains no alphanumeric characters`)
    }
    
    // Check for uniqueness by appending a counter if needed
    let finalId = generatedId
    let counter = 1
    let isDuplicate = true
    
    while (isDuplicate) {
      const existing = await mongoose.model('Project').findOne({ id: finalId })
      if (!existing) {
        isDuplicate = false
        this.id = finalId
      } else {
        finalId = `${generatedId}-${counter}`
        counter++
      }
    }
  }
})

export const ProjectModel = mongoose.model<ProjectDocument>('Project', ProjectSchema)


