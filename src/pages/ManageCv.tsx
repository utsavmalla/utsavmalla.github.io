import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { fetchCv, getCvDownloadUrl, uploadCv } from '../api/client'
import '../styles/globals.css'

interface CvMetadata {
  originalName: string
  storageBucket: string
  storagePath: string
  mimeType: string
  size: number
  updatedAt?: string
  createdAt?: string
}

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(date?: string) {
  if (!date) {
    return 'Not available'
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

const ManageCv = () => {
  const [cv, setCv] = useState<CvMetadata | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loadingMetadata, setLoadingMetadata] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const loadCv = async () => {
      try {
        const data = await fetchCv()
        setCv(data.available ? data.cv : null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load CV')
      } finally {
        setLoadingMetadata(false)
      }
    }

    void loadCv()
  }, [])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
    setError(null)
    setSuccess(null)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!selectedFile) {
      setError('Choose a PDF file to upload')
      return
    }

    if (selectedFile.type !== 'application/pdf' || !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Only PDF files are allowed')
      return
    }

    setUploading(true)

    try {
      const data = await uploadCv(selectedFile)
      setCv(data.cv)
      setSelectedFile(null)
      setSuccess('CV updated successfully')
      e.currentTarget.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload CV')
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Manage CV — Utsav Malla</title>
      </Helmet>

      <Header />

      <main
        id="main"
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 1rem',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '640px',
            backgroundColor: 'var(--surface)',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
          }}
        >
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text)', fontSize: '2rem' }}>
            Manage CV
          </h2>

          <div
            style={{
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1.5rem',
              color: 'var(--muted)',
            }}
          >
            {loadingMetadata ? (
              <p style={{ margin: 0 }}>Loading current CV...</p>
            ) : cv ? (
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <p style={{ margin: 0, color: 'var(--text)', fontWeight: 700 }}>
                  {cv.originalName}
                </p>
                <p style={{ margin: 0 }}>Size: {formatFileSize(cv.size)}</p>
                <p style={{ margin: 0 }}>Updated: {formatDate(cv.updatedAt)}</p>
                <a href={getCvDownloadUrl()} className="btn ghost" style={{ width: 'fit-content' }}>
                  Download current CV
                </a>
              </div>
            ) : (
              <p style={{ margin: 0 }}>No CV has been uploaded yet.</p>
            )}
          </div>

          {error && (
            <p
              style={{
                color: 'var(--accent)',
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                borderRadius: '6px',
              }}
            >
              {error}
            </p>
          )}

          {success && (
            <p
              style={{
                color: 'var(--text)',
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: 'rgba(46, 204, 113, 0.14)',
                borderRadius: '6px',
              }}
            >
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label htmlFor="cv" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--muted)' }}>
                Upload PDF
              </label>
              <input
                required
                type="file"
                id="cv"
                name="cv"
                accept="application/pdf,.pdf"
                onChange={handleFileChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text)',
                }}
              />
            </div>

            {selectedFile && (
              <p style={{ margin: 0, color: 'var(--muted)' }}>
                Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
              </p>
            )}

            <button
              type="submit"
              disabled={uploading}
              style={{
                marginTop: '0.5rem',
                padding: '1rem',
                backgroundColor: 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: uploading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'opacity 0.2s',
              }}
            >
              {uploading ? 'Uploading...' : 'Update CV'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default ManageCv
