'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  href, 
  onClick, 
  type = 'button',
  disabled = false
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200',
    {
      'bg-primary hover:bg-sky-600 text-white shadow-xs': variant === 'primary',
      'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-xs': variant === 'secondary',
      'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900': variant === 'ghost',
      'bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200': variant === 'accent',
      'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700': variant === 'outline',
    },
    {
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-5 py-2.5': size === 'md',
      'px-7 py-3 text-lg': size === 'lg',
    },
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={baseClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
