'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import {
  Menu,
  X,
  Users,
  Trophy,
  Calendar,
  GitCompare,
  Newspaper,
  MessageSquare,
  Flame,
  Swords,
  Dumbbell,
  BookOpen,
  ChevronDown,
  Sparkles,
  Search
} from 'lucide-react'
import { UserNavWidget } from '@/components/layout/UserNavWidget'

// Primary navigation links
const PRIMARY_NAV_LINKS = [
  { href: '/', label: 'Trang chủ', icon: null },
  { href: '/giai-dau', label: 'Giải đấu', icon: Swords },
  { href: '/vo-si', label: 'Võ sĩ', icon: Users },
  { href: '/bang-xep-hang', label: 'BXH', icon: Trophy },
  { href: '/su-kien', label: 'Sự kiện', icon: Calendar },
  { href: '/dien-dan', label: 'Diễn đàn', icon: MessageSquare },
  { 
    href: '/du-doan', 
    label: 'Dự đoán', 
    icon: Flame,
    hasFlameBadge: true 
  },
]

// Secondary navigation links grouped into "Khám phá"
const EXPLORE_LINKS = [
  {
    href: '/so-sanh',
    label: 'So sánh võ sĩ',
    description: 'Đối đầu chỉ số, thể hình & Elo',
    icon: GitCompare,
    accentColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    href: '/tin-tuc',
    label: 'Tin tức',
    description: 'Cập nhật giải đấu & chuyển nhượng',
    icon: Newspaper,
    accentColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    href: '/phong-tap',
    label: 'Phòng tập & CLB',
    description: 'Bản đồ võ đường & lò đào tạo',
    icon: Dumbbell,
    accentColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    href: '/ky-thuat',
    label: 'Thư viện Kỹ thuật',
    description: 'Striking, Takedown & Submissions',
    icon: BookOpen,
    accentColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname?.startsWith('/admin')) {
    return null
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isExploreOpen, setIsExploreOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check if any explore link is currently active
  const isExploreActive = EXPLORE_LINKS.some(
    link => pathname === link.href || pathname?.startsWith(`${link.href}/`)
  )

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsExploreOpen(false)
      }
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        if (!searchValue) setIsSearchExpanded(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [searchValue])

  // Close menus on route change
  useEffect(() => {
    setIsExploreOpen(false)
    setIsMobileMenuOpen(false)
    setIsSearchExpanded(false)
  }, [pathname])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsExploreOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsExploreOpen(false)
    }, 150)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      router.push(`/vo-si?search=${encodeURIComponent(searchValue.trim())}`)
      setIsSearchExpanded(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-xl border-b border-border/70 shadow-sm transition-all">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-2 md:gap-4">
        {/* Brand / Logo */}
        <Link 
          href="/" 
          className="flex-shrink-0 flex items-center gap-2 group mr-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-red-600 to-rose-700 flex items-center justify-center shadow-md shadow-primary/25 border border-white/10 group-hover:scale-105 transition-transform duration-200">
            <span className="text-base leading-none">🥊</span>
          </div>
          <div className="flex items-center gap-1 font-black tracking-tight text-lg">
            <span className="text-white">MMA</span>
            <span className="text-primary">VN</span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-md bg-card border border-border text-slate-300 ml-0.5">
              HUB
            </span>
          </div>
        </Link>

        {/* Primary Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center max-w-2xl">
          {PRIMARY_NAV_LINKS.map((link) => {
            const isActive = link.href === '/' 
              ? pathname === '/' 
              : pathname === link.href || pathname?.startsWith(`${link.href}/`)
            const Icon = link.icon

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap",
                  isActive
                    ? "text-primary bg-primary/10 border border-primary/20 shadow-xs"
                    : "text-slate-300 hover:text-white hover:bg-card-hover/80"
                )}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{link.label}</span>
                {link.hasFlameBadge && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                )}
              </Link>
            )
          })}

          {/* Explore Dropdown */}
          <div 
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setIsExploreOpen(!isExploreOpen)}
              className={cn(
                "px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer",
                isExploreActive
                  ? "text-primary bg-primary/10 border border-primary/20"
                  : "text-slate-300 hover:text-white hover:bg-card-hover/80"
              )}
            >
              <span>Khám phá</span>
              <ChevronDown className={cn(
                "w-3.5 h-3.5 transition-transform duration-200",
                isExploreOpen && "rotate-180"
              )} />
            </button>

            {isExploreOpen && (
              <div className="absolute top-full left-0 pt-2 w-64 z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                <div className="p-2 bg-card/95 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl shadow-black/60 space-y-1">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-border/50 flex items-center justify-between">
                    <span>Hệ sinh thái MMAVN</span>
                    <Sparkles className="w-3 h-3 text-primary" />
                  </div>
                  
                  {EXPLORE_LINKS.map((item) => {
                    const isItemActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                    const ItemIcon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsExploreOpen(false)}
                        className={cn(
                          "group flex items-start gap-3 p-2 rounded-xl transition-all duration-150",
                          isItemActive 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-card-hover text-slate-200 hover:text-white"
                        )}
                      >
                        <div className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center border flex-shrink-0 transition-transform group-hover:scale-105",
                          item.accentColor
                        )}>
                          <ItemIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold leading-tight flex items-center justify-between">
                            <span>{item.label}</span>
                          </p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section: Expandable Search & User Profile Widget */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/* 🔍 EXPANDABLE SEARCH BAR (Kéo giãn ra khi click vào) */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div
              className={cn(
                "flex items-center rounded-xl bg-card/70 border border-border/70 transition-all duration-300 overflow-hidden",
                isSearchExpanded 
                  ? "w-48 sm:w-64 border-primary/50 ring-2 ring-primary/20 bg-card" 
                  : "w-9 sm:w-36 hover:border-border"
              )}
            >
              <button
                type="button"
                onClick={() => {
                  setIsSearchExpanded(true)
                  searchInputRef.current?.focus()
                }}
                className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white shrink-0 cursor-pointer"
                title="Tìm kiếm"
              >
                <Search className="w-4 h-4" />
              </button>

              <input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsSearchExpanded(true)}
                placeholder="Tìm võ sĩ, sự kiện..."
                className={cn(
                  "bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full pr-3 transition-opacity duration-200",
                  !isSearchExpanded && "hidden sm:block opacity-70"
                )}
              />

              {searchValue && isSearchExpanded && (
                <button
                  type="button"
                  onClick={() => setSearchValue('')}
                  className="p-1 mr-1 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </form>

          {/* 👤 USER PROFILE & AUTH WIDGET (Thay thế nút Admin CMS) */}
          <UserNavWidget />

          {/* Mobile Menu Button */}
          <button
            className="p-2 rounded-xl bg-card border border-border text-slate-300 hover:text-white hover:border-border-hover transition-colors lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-4 space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Tìm kiếm võ sĩ, giải đấu..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-card border border-border text-sm text-white placeholder-slate-400 focus:outline-none focus:border-primary"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-2">Điều hướng</span>
              {PRIMARY_NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold",
                      isActive ? "bg-primary/10 text-primary" : "text-slate-300 hover:bg-card"
                    )}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>

            <div className="space-y-1 pt-2 border-t border-border">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-2">Khám phá</span>
              {EXPLORE_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-card"
                >
                  <item.icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
