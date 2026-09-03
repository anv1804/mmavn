'use client'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'

interface SearchInputProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SearchInput({ placeholder = 'Tìm kiếm...', value, onChange, className }: SearchInputProps) {
  return (
    <div className={cn("relative group", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted group-focus-within:text-primary transition-colors" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-card border border-border rounded-xl pl-10 pr-10 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted"
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
