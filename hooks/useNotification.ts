'use client'

import { useState, useCallback } from 'react'

interface NotificationState {
  show: boolean
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

export function useNotification() {
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    type: 'info',
    message: ''
  })

  const showNotification = useCallback((type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    setNotification({ show: true, type, message })
  }, [])

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, show: false }))
  }, [])

  return {
    notification,
    showNotification,
    hideNotification,
    showSuccess: (message: string) => showNotification('success', message),
    showError: (message: string) => showNotification('error', message),
    showWarning: (message: string) => showNotification('warning', message),
    showInfo: (message: string) => showNotification('info', message)
  }
}
