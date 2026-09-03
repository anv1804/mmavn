'use client'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export interface Tab {
  id: string
  label: string
  icon?: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("inline-flex bg-card/50 p-1 rounded-xl overflow-x-auto w-full sm:w-auto hide-scrollbar", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap",
              isActive ? "bg-card text-foreground shadow-sm" : "text-muted hover:text-foreground"
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
