import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  className?: string
}

export function EmptyState({ icon, title, description, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      {icon && <div className="text-muted mb-4 opacity-50">{icon}</div>}
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      {description && <p className="text-muted mt-2 max-w-sm">{description}</p>}
    </div>
  )
}
