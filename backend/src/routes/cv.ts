import { Router, Request, Response, NextFunction } from 'express'
import path from 'path'
import multer, { MulterError } from 'multer'
import { CvModel } from '../models/Cv'
import { verifyAuth } from '../middleware/auth'
import { getSupabaseClient } from '../lib/supabase'

const router = Router()

const CV_KEY = 'current'
const CV_MAX_BYTES = 5 * 1024 * 1024
const SIGNED_URL_TTL_SECONDS = 60

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: CV_MAX_BYTES,
    files: 1,
  },
})

function runCvUpload(req: Request, res: Response, next: NextFunction) {
  upload.single('cv')(req, res, (err) => {
    if (err instanceof MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({ message: 'CV PDF must be 5 MB or smaller' })
        return
      }

      res.status(400).json({ message: 'Invalid CV upload' })
      return
    }

    if (err) {
      res.status(400).json({ message: 'Invalid CV upload' })
      return
    }

    next()
  })
}

function isPdf(file: Express.Multer.File) {
  const hasPdfMimeType = file.mimetype === 'application/pdf'
  const hasPdfExtension = file.originalname.toLowerCase().endsWith('.pdf')
  const hasPdfSignature = file.buffer.subarray(0, 5).toString('utf8') === '%PDF-'

  return hasPdfMimeType && hasPdfExtension && hasPdfSignature
}

function getSafeFileName(originalName: string) {
  const parsedName = path.parse(originalName).name
  const safeName = parsedName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return `${safeName || 'cv'}.pdf`
}

function getStoragePath(originalName: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  return `cv/${timestamp}-${getSafeFileName(originalName)}`
}

function serializeCv(cv: {
  originalName: string
  storageBucket: string
  storagePath: string
  mimeType: string
  size: number
  updatedAt?: Date
  createdAt?: Date
}) {
  return {
    originalName: cv.originalName,
    storageBucket: cv.storageBucket,
    storagePath: cv.storagePath,
    mimeType: cv.mimeType,
    size: cv.size,
    updatedAt: cv.updatedAt,
    createdAt: cv.createdAt,
  }
}

router.get('/', async (_req, res) => {
  try {
    const cv = await CvModel.findOne({ key: CV_KEY }).lean()

    if (!cv) {
      res.json({ available: false })
      return
    }

    res.json({ available: true, cv: serializeCv(cv) })
  } catch (err) {
    console.error('Error fetching CV metadata', err)
    res.status(500).json({ message: 'Failed to fetch CV metadata' })
  }
})

router.get('/download', async (_req, res) => {
  try {
    const cv = await CvModel.findOne({ key: CV_KEY }).lean()

    if (!cv) {
      res.status(404).json({ message: 'CV is not available' })
      return
    }

    const { data, error } = await getSupabaseClient()
      .storage
      .from(cv.storageBucket)
      .createSignedUrl(cv.storagePath, SIGNED_URL_TTL_SECONDS)

    if (error || !data?.signedUrl) {
      console.error('Error creating CV signed URL', error)
      res.status(502).json({ message: 'Failed to create CV download link' })
      return
    }

    const downloadUrl = new URL(data.signedUrl)
    downloadUrl.searchParams.set('download', cv.originalName)

    res.redirect(downloadUrl.toString())
  } catch (err) {
    console.error('Error downloading CV', err)
    res.status(500).json({ message: 'Failed to download CV' })
  }
})

router.put('/', verifyAuth, runCvUpload, async (req, res) => {
  try {
    const file = req.file

    if (!file) {
      res.status(400).json({ message: 'CV PDF file is required' })
      return
    }

    if (!isPdf(file)) {
      res.status(400).json({ message: 'Only valid PDF files are allowed' })
      return
    }

    const storageBucket = process.env.SUPABASE_CV_BUCKET || 'cv'
    const storagePath = getStoragePath(file.originalname)

    const { error: uploadError } = await getSupabaseClient()
      .storage
      .from(storageBucket)
      .upload(storagePath, file.buffer, {
        contentType: 'application/pdf',
        upsert: false,
      })

    if (uploadError) {
      console.error('Error uploading CV to Supabase Storage', uploadError)
      res.status(502).json({ message: 'Failed to upload CV file' })
      return
    }

    const cv = await CvModel.findOneAndUpdate(
      { key: CV_KEY },
      {
        key: CV_KEY,
        originalName: file.originalname,
        storageBucket,
        storagePath,
        mimeType: 'application/pdf',
        size: file.size,
        uploadedBy: req.userId,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )

    res.json({ message: 'CV updated successfully', cv: serializeCv(cv) })
  } catch (err) {
    console.error('Error updating CV', err)
    res.status(500).json({ message: 'Failed to update CV' })
  }
})

export default router

