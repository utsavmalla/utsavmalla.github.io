import { useMemo, useState, FormEvent, ChangeEvent } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

type SubmitStatus = 'idle' | 'success' | 'error'

const Contact = () => {
  const contactRef = useScrollReveal()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [submitMessage, setSubmitMessage] = useState<string>('')
  const [honeypot, setHoneypot] = useState('')

  const formspreeEndpoint = useMemo(() => {
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined
    return endpoint?.trim() || ''
  }, [])

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

    setSubmitStatus('idle')
    setSubmitMessage('')

    // Honeypot: if filled, treat as bot submission.
    if (honeypot.trim()) {
      return
    }

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    if (!formspreeEndpoint) {
      setIsSubmitting(false)
      setSubmitStatus('error')
      setSubmitMessage(
        'Contact form is not configured yet. Please set VITE_FORMSPREE_ENDPOINT and redeploy.'
      )
      return
    }

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
        signal: controller.signal,
      })

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage("Thanks! Your message has been sent.")
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
        setHoneypot('')
        return
      }

      let errorText = 'Sorry—something went wrong while sending your message.'
      try {
        const data = (await response.json()) as { error?: string }
        if (typeof data?.error === 'string' && data.error.trim()) {
          errorText = data.error
        }
      } catch {
        // ignore JSON parse errors
      }

      setSubmitStatus('error')
      setSubmitMessage(errorText)
    } catch (err) {
      const isAbort = err instanceof DOMException && err.name === 'AbortError'
      setSubmitStatus('error')
      setSubmitMessage(
        isAbort
          ? 'Request timed out. Please check your connection and try again.'
          : 'Network error. Please check your connection and try again.'
      )
    } finally {
      window.clearTimeout(timeout)
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
          <input
            type="text"
            name="company"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, opacity: 0 }}
          />

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

          {submitStatus !== 'idle' && (
            <div
              role="status"
              aria-live="polite"
              className={submitStatus === 'success' ? 'success' : 'error'}
              style={{ marginTop: 12 }}
            >
              {submitMessage}
            </div>
          )}
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
