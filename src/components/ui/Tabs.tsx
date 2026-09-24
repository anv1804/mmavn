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
    <div className={cn("inline-flex bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 overflow-x-auto w-full sm:w-auto hide-scrollbar gap-1", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap",
              isActive 
                ? "bg-white text-primary shadow-sm border border-slate-200/60 font-bold" 
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
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
