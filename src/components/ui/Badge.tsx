import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type BadgeVariant = 'default' | 'primary' | 'accent' | 'success' | 'live' | 'outline'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full font-medium inline-flex items-center justify-center',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1',
        {
          'bg-slate-800 text-slate-300': variant === 'default',
          'bg-primary/15 text-primary-soft': variant === 'primary',
          'bg-accent/15 text-accent-soft': variant === 'accent',
          'bg-success/15 text-green-400': variant === 'success',
          'bg-red-600 text-white animate-pulse-soft': variant === 'live',
          'border border-border text-muted bg-transparent': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
