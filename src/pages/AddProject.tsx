import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProject } from '../api/client'
import '../styles/globals.css'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const AddProject = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    image: '/images/projects/placeholder.avif',
    imageAlt: '',
    link: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await createProject(formData)
      navigate('/#main')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating project')
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Add Project — Utsav Malla</title>
      </Helmet>
      
      {/* We can include the Header so the layout stays consistent */}
      <Header />
      
      <main id="main" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '600px', 
          backgroundColor: 'var(--bg-secondary)', 
          padding: '2rem', 
          borderRadius: '12px',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
        }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', fontSize: '2rem' }}>Add New Project</h2>
          
          {error && <p style={{ color: 'var(--accent)', marginBottom: '1rem', padding: '0.75rem', backgroundColor: 'rgba(255, 0, 0, 0.1)', borderRadius: '6px' }}>{error}</p>}
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label htmlFor="id" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>ID (slug, e.g. 'my-new-project')</label>
              <input required type="text" id="id" name="id" value={formData.id} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
            </div>
            
            <div>
              <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Title</label>
              <input required type="text" id="title" name="title" value={formData.title} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
            </div>
            
            <div>
              <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Description</label>
              <textarea required id="description" name="description" value={formData.description} onChange={handleChange} rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}></textarea>
            </div>
            
            <div>
              <label htmlFor="image" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Image Path/URL</label>
              <input required type="text" id="image" name="image" value={formData.image} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
            </div>
            
            <div>
              <label htmlFor="imageAlt" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Image Alt Text</label>
              <input required type="text" id="imageAlt" name="imageAlt" value={formData.imageAlt} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
            </div>
            
            <div>
              <label htmlFor="link" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Project Link</label>
              <input required type="text" id="link" name="link" value={formData.link} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
            </div>
            
            <button type="submit" disabled={loading} style={{ 
                marginTop: '1rem',
                padding: '1rem', 
                backgroundColor: 'var(--accent)', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'opacity 0.2s'
              }}>
              {loading ? 'Submitting...' : 'Add Project'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default AddProject
