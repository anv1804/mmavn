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
          'bg-slate-100 text-slate-700 border border-slate-200': variant === 'default',
          'bg-sky-50 text-sky-700 border border-sky-200': variant === 'primary',
          'bg-blue-50 text-blue-700 border border-blue-200': variant === 'accent',
          'bg-emerald-50 text-emerald-700 border border-emerald-200': variant === 'success',
          'bg-sky-600 text-white shadow-xs animate-pulse-soft': variant === 'live',
          'border border-slate-200 text-slate-600 bg-white': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
