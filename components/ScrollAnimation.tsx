'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
  animation?: 'fadeIn' | 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown' | 'scale' | 'zoom'
  delay?: number
  duration?: number
  className?: string
  threshold?: number
}

export function ScrollAnimation({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.1,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold])

  const animationClasses = {
    fadeIn: isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    slideLeft: isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12',
    slideRight: isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12',
    slideUp: isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
    slideDown: isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12',
    scale: isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
    zoom: isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-110',
  }

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${animationClasses[animation]} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
