import { cn } from '@/lib/utils'

interface BeltBadgeProps {
  belt: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function BeltBadge({ belt, size = 'sm', className }: BeltBadgeProps) {
  const normalized = belt.toLowerCase().trim()

  let styleClasses = 'bg-slate-800 text-slate-300 border-slate-700'
  let barColor = 'bg-slate-500'

  if (normalized.includes('trắng')) {
    styleClasses = 'bg-slate-100 text-slate-900 border-slate-300 font-semibold shadow-xs'
    barColor = 'bg-slate-900'
  } else if (normalized.includes('xanh')) {
    styleClasses = 'bg-blue-600/90 text-white border-blue-400 font-semibold shadow-xs'
    barColor = 'bg-black'
  } else if (normalized.includes('tím')) {
    styleClasses = 'bg-purple-700 text-white border-purple-400 font-semibold shadow-xs'
    barColor = 'bg-black'
  } else if (normalized.includes('nâu')) {
    styleClasses = 'bg-amber-900 text-amber-100 border-amber-700 font-semibold shadow-xs'
    barColor = 'bg-black'
  } else if (normalized.includes('đen')) {
    styleClasses = 'bg-neutral-950 text-red-400 border-red-600/70 font-bold shadow-[0_0_12px_rgba(239,68,68,0.25)]'
    barColor = 'bg-red-600'
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
    lg: 'text-sm px-3 py-1.5 gap-2.5',
  }[size]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border tracking-wide transition-colors',
        styleClasses,
        sizeClasses,
        className
      )}
      title={`Cấp bậc: ${belt}`}
    >
      <span>{belt}</span>
      {/* Belt rank bar indicator */}
      <span
        className={cn(
          'w-1.5 h-3 rounded-[1px] shrink-0 opacity-90',
          barColor
        )}
      />
    </span>
  )
}
