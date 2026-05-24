import mongoose, { Document, Schema } from 'mongoose'

export interface CvDocument extends Document {
  key: string
  originalName: string
  storageBucket: string
  storagePath: string
  mimeType: string
  size: number
  uploadedBy?: string
  createdAt: Date
  updatedAt: Date
}

const CvSchema = new Schema<CvDocument>(
  {
    key: { type: String, required: true, unique: true, default: 'current' },
    originalName: { type: String, required: true },
    storageBucket: { type: String, required: true },
    storagePath: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedBy: { type: String, required: false },
  },
  { timestamps: true }
)

export const CvModel = mongoose.model<CvDocument>('Cv', CvSchema)

