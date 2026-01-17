import { useState, FormEvent } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const Contact = () => {
  const contactRef = useScrollReveal()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    // Replace this with actual form submission logic (Formspree, Netlify Forms, etc.)
    setTimeout(() => {
      alert(
        'This demo form does not send messages. Replace with your form endpoint or use Formspree/Netlify Forms.'
      )
      setIsSubmitting(false)
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
    }, 800)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading" ref={contactRef}>
      <div className="container">
        <h2 id="contact-heading">Contact</h2>
        <p>
          If you'd like to work together or say hello, send a message below.
        </p>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span className="error" id="name-error" role="alert">
              {errors.name}
            </span>
          )}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span className="error" id="email-error" role="alert">
              {errors.email}
            </span>
          )}

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <span className="error" id="message-error" role="alert">
              {errors.message}
            </span>
          )}

          <button
            className="btn primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending…' : 'Send Message'}
          </button>
        </form>

        <div className="social-links">
          <a
            href="https://github.com/utsavmalla"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/utsav-m-aa244b130/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
