import type { ReactNode } from 'react'

interface StatusMessageProps {
  type: 'success' | 'error' | 'progress'
  children: ReactNode
  className?: string
}

const StatusMessage = ({ type, children, className = '' }: StatusMessageProps) => {
  const classes = ['ui-status-message', `is-${type}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="status" aria-live="polite">
      {children}
    </div>
  )
}

export default StatusMessage
