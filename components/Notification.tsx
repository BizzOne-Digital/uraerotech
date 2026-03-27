'use client'

import { useEffect } from 'react'

interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  onClose: () => void
  duration?: number
}

export default function Notification({ type, message, onClose, duration = 3000 }: NotificationProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const styles = {
    success: 'bg-green-500/20 border-green-500/40 text-green-300',
    error: 'bg-red-500/20 border-red-500/40 text-red-300',
    warning: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300',
    info: 'bg-blue-500/20 border-blue-500/40 text-blue-300'
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${styles[type]} border-l-4 rounded-lg shadow-lg backdrop-blur-md p-4 max-w-md flex items-start gap-3`}>
        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-white ${
          type === 'success' ? 'bg-green-500' :
          type === 'error' ? 'bg-red-500' :
          type === 'warning' ? 'bg-yellow-500' :
          'bg-blue-500'
        }`}>
          {icons[type]}
        </div>
        <div className="flex-1">
          <p className="font-medium text-white">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-white/40 hover:text-white/80 transition"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
