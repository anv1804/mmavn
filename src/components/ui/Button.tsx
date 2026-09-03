'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent'
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
      'bg-primary hover:bg-red-700 text-white': variant === 'primary',
      'bg-card hover:bg-card-hover text-foreground border border-border': variant === 'secondary',
      'bg-transparent hover:bg-card text-muted hover:text-foreground': variant === 'ghost',
      'bg-accent hover:bg-amber-600 text-black': variant === 'accent',
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
