import type { ReactNode } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  children: ReactNode
  confirmLabel: string
  cancelLabel: string
  isLoading: boolean
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDialog = ({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel,
  isLoading,
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  if (!open) {
    return null
  }

  const titleId = 'confirm-dialog-title'

  return (
    <div className="ui-dialog-backdrop">
      <div className="ui-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <h2 id={titleId}>{title}</h2>
        {children}
        <div className="ui-dialog-actions">
          <button type="button" className="btn ghost" disabled={isLoading} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`btn${danger ? ' danger' : ' primary'}`}
            disabled={isLoading}
            onClick={onConfirm}
          >
            {isLoading ? 'Working...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
