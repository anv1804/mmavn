'use client'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export function Card({ children, className, hover = false, padding = 'md', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-card border border-border rounded-2xl shadow-xs transition-all duration-200',
        hover && 'hover:bg-card-hover hover:border-sky-300 hover:shadow-md hover:shadow-sky-100 hover:-translate-y-[2px]',
        onClick && 'cursor-pointer',
        {
          'p-0': padding === 'none',
          'p-3': padding === 'sm',
          'p-5': padding === 'md',
          'p-7': padding === 'lg',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
