'use client'

interface ConfirmDialogProps {
  title: string
  message: string
  disclaimer?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  type?: 'danger' | 'warning' | 'info'
  loading?: boolean
}

export default function ConfirmDialog({
  title,
  message,
  disclaimer,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'warning',
  loading = false
}: ConfirmDialogProps) {
  const buttonStyles = {
    danger: 'bg-red-500 hover:bg-red-600',
    warning: 'bg-yellow-500 hover:bg-yellow-600',
    info: 'bg-blue-500 hover:bg-blue-600'
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/95 border border-white/10 rounded-xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-start gap-4 mb-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
            type === 'danger' ? 'bg-red-500/20 text-red-400' :
            type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-blue-500/20 text-blue-400'
          }`}>
            {type === 'info' ? 'ℹ' : '⚠'}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/60 text-sm">{message}</p>
            {disclaimer && (
              <div className="mt-3 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-xs">{disclaimer}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-white/10 border border-white/10 text-white rounded-lg hover:bg-white/20 transition font-medium disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 px-4 py-3 text-white rounded-lg transition font-medium disabled:opacity-60 flex items-center justify-center gap-2 ${buttonStyles[type]}`}
          >
            {loading ? (
              <><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />Deleting...</>
            ) : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
