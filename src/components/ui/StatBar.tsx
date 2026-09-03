'use client'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface StatBarProps {
  label: string
  value: number // 0-100
  color?: string
  showValue?: boolean
  className?: string
}

export function StatBar({ label, value, color = 'bg-primary', showValue = true, className }: StatBarProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        {showValue && <span className="text-muted">{value}%</span>}
      </div>
      <div className="bg-slate-800/50 rounded-full h-2 w-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-1000 ease-out", color)}
          style={{ width: mounted ? `${Math.min(Math.max(value, 0), 100)}%` : '0%' }}
        />
      </div>
    </div>
  )
}
