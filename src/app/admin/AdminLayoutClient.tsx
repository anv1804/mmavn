'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  History, 
  Swords, 
  Trophy, 
  Shield, 
  Calendar, 
  Newspaper, 
  MessageSquare, 
  Dumbbell, 
  BookOpen, 
  ShieldCheck, 
  ExternalLink, 
  Search, 
  Bell, 
  Check, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  ShieldAlert,
  Edit3,
  Award,
  User as UserIcon,
  Activity,
  ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { 
  INITIAL_NOTIFICATIONS, 
  getCurrentUser, 
  setCurrentUserRole 
} from '@/lib/services/admin-service'
import { ROLE_CONFIGS } from '@/types/admin'
import type { AdminNotification, User, UserRole } from '@/types/admin'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  exact?: boolean
  badge?: string
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'TỔNG QUAN',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { href: '/admin/logs', label: 'Nhật ký hoạt động', icon: History, badge: 'Audit' },
    ],
  },
  {
    title: 'QUẢN TRỊ NỘI DUNG',
    items: [
      { href: '/admin/fighters', label: 'Võ sĩ MMA', icon: Swords },
      { href: '/admin/rankings', label: 'Bảng xếp hạng', icon: Trophy },
      { href: '/admin/promotions', label: 'Giải đấu', icon: Shield },
      { href: '/admin/events', label: 'Sự kiện & Trận đấu', icon: Calendar },
      { href: '/admin/articles', label: 'Tin tức & Bài viết', icon: Newspaper },
    ],
  },
  {
    title: 'CỘNG ĐỒNG & ĐÀO TẠO',
    items: [
      { href: '/admin/forum', label: 'Diễn đàn & Báo cáo', icon: MessageSquare },
      { href: '/admin/gyms', label: 'Phòng tập & CLB', icon: Dumbbell },
      { href: '/admin/techniques', label: 'Thư viện Kỹ thuật', icon: BookOpen },
    ],
  },
  {
    title: 'HỆ THỐNG',
    items: [
      { href: '/admin/users', label: 'Phân quyền & Thành viên', icon: ShieldCheck },
    ],
  },
]

// Quick searchable navigation items for the Command Palette search
const SEARCHABLE_ITEMS = [
  { title: 'Tổng quan Dashboard', category: 'Điều hướng', href: '/admin' },
  { title: 'Quản lý Võ sĩ MMA', category: 'Võ sĩ', href: '/admin/fighters' },
  { title: 'Bảng xếp hạng các hạng cân', category: 'Xếp hạng', href: '/admin/rankings' },
  { title: 'Giải đấu LION, GMA, V1', category: 'Giải đấu', href: '/admin/promotions' },
  { title: 'Sự kiện & Lịch thi đấu', category: 'Sự kiện', href: '/admin/events' },
  { title: 'Quản lý Tin tức & Bài viết', category: 'Bài viết', href: '/admin/articles' },
  { title: 'Kiểm duyệt Diễn đàn & Báo cáo', category: 'Cộng đồng', href: '/admin/forum' },
  { title: 'Phòng tập & CLB đối tác', category: 'Đào tạo', href: '/admin/gyms' },
  { title: 'Thư viện Kỹ thuật Striking / BJJ', category: 'Kỹ thuật', href: '/admin/techniques' },
  { title: 'Phân quyền thành viên & RBAC', category: 'Hệ thống', href: '/admin/users' },
  { title: 'Nhật ký kiểm toán hệ thống', category: 'Kiểm toán', href: '/admin/logs' },
  { title: 'Trần Quang Lộc (Nhà vô địch)', category: 'Võ sĩ', href: '/admin/fighters' },
  { title: 'Nguyễn Trần Duy Nhất (Độc cô cầu bại)', category: 'Võ sĩ', href: '/admin/fighters' },
  { title: 'Phạm Văn Nam (Vô địch 56kg)', category: 'Võ sĩ', href: '/admin/fighters' },
]

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [notifications, setNotifications] = useState<AdminNotification[]>(INITIAL_NOTIFICATIONS)
  const [showNotifMenu, setShowNotifMenu] = useState(false)
  const [showRoleMenu, setShowRoleMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Live search state
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // Sync role from localStorage & admin-service on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('mmavn_active_role') as UserRole | null
    let initialUser: User
    if (savedRole && ROLE_CONFIGS[savedRole]) {
      initialUser = setCurrentUserRole(savedRole)
    } else {
      initialUser = getCurrentUser()
    }
    setCurrentUser(initialUser)

    const handleRoleChanged = (e: Event) => {
      const customEvent = e as CustomEvent<User>
      if (customEvent.detail) {
        setCurrentUser(customEvent.detail)
      }
    }
    window.addEventListener('mmavn-role-changed', handleRoleChanged)
    return () => {
      window.removeEventListener('mmavn-role-changed', handleRoleChanged)
    }
  }, [])

  // Close menus on route change
  useEffect(() => {
    setSidebarOpen(false)
    setShowNotifMenu(false)
    setShowRoleMenu(false)
    setShowUserMenu(false)
    setSearchOpen(false)
  }, [pathname])

  // Keyboard shortcut for Search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
        setTimeout(() => searchInputRef.current?.focus(), 50)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setShowRoleMenu(false)
        setShowNotifMenu(false)
        setShowUserMenu(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleRoleChange = (role: UserRole) => {
    const updated = setCurrentUserRole(role)
    setCurrentUser({ ...updated })
    localStorage.setItem('mmavn_active_role', role)

    window.dispatchEvent(
      new CustomEvent('mmavn-role-changed', {
        detail: updated,
      })
    )

    fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ switchRole: role }),
    }).catch(console.error)

    setShowRoleMenu(false)
  }

  const unreadCount = notifications.filter(n => !n.read).length
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  // Active role configuration
  const activeRole: UserRole = currentUser?.role || 'admin'
  const currentConfig = ROLE_CONFIGS[activeRole] || ROLE_CONFIGS.admin

  const getRoleIcon = (role: UserRole, className = 'w-4 h-4') => {
    switch (role) {
      case 'admin':
        return <ShieldAlert className={className} />
      case 'editor':
        return <Edit3 className={className} />
      case 'moderator':
        return <ShieldCheck className={className} />
      case 'fighter':
        return <Award className={className} />
      case 'user':
      default:
        return <UserIcon className={className} />
    }
  }

  // Filtered search results
  const searchResults = SEARCHABLE_ITEMS.filter(item => 
    !searchQuery ||
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6)

  // Dynamic breadcrumb label
  const getBreadcrumbLabel = () => {
    if (pathname === '/admin') return 'Tổng quan Dashboard'
    if (pathname?.startsWith('/admin/fighters')) return 'Quản trị Võ sĩ MMA'
    if (pathname?.startsWith('/admin/rankings')) return 'Bảng xếp hạng'
    if (pathname?.startsWith('/admin/promotions')) return 'Quản trị Giải đấu'
    if (pathname?.startsWith('/admin/events')) return 'Sự kiện & Trận đấu'
    if (pathname?.startsWith('/admin/articles')) return 'Tin tức & Bài viết'
    if (pathname?.startsWith('/admin/forum')) return 'Kiểm duyệt Diễn đàn'
    if (pathname?.startsWith('/admin/gyms')) return 'Phòng tập & CLB'
    if (pathname?.startsWith('/admin/techniques')) return 'Thư viện Kỹ thuật'
    if (pathname?.startsWith('/admin/users')) return 'Phân quyền & Thành viên'
    if (pathname?.startsWith('/admin/logs')) return 'Nhật ký Hoạt động'
    return 'CMS'
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col md:flex-row antialiased">
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sleek Dark Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-50 h-screen w-72 bg-[#0d111d] border-r border-[#1a2035] flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 shrink-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-[#1a2035] flex items-center justify-between bg-[#0b0e19]">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-lg shadow-lg shadow-red-600/30 border border-red-500/30 group-hover:scale-105 transition-transform">
              🥊
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base tracking-wider text-white">
                  MMA<span className="text-red-500">VN</span>
                </span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-1.5 py-0.2 rounded bg-red-600/20 text-red-400 border border-red-500/30">
                  CMS v2.4
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Bảng Điều Hành Trung Tâm</span>
            </div>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#161b2e] transition-colors"
            aria-label="Đóng sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grouped Navigation Links */}
        <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[#1a2035]">
          {NAV_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                {group.title}
              </div>
              {group.items.map((item) => {
                const isActive = item.exact 
                  ? pathname === item.href 
                  : pathname === item.href || pathname?.startsWith(item.href + '/')
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group relative",
                      isActive
                        ? "bg-gradient-to-r from-red-600/20 to-red-600/5 text-white font-bold border-l-2 border-red-500 pl-2.5 shadow-sm"
                        : "text-slate-400 hover:text-slate-100 hover:bg-[#14192b]"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={cn(
                        "w-4 h-4 transition-colors",
                        isActive ? "text-red-400" : "text-slate-400 group-hover:text-slate-200"
                      )} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {item.badge}
                      </span>
                    )}

                    {isActive && !item.badge && (
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                    )}
                  </Link>
                )
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer: View Website + User Profile */}
        <div className="p-3 border-t border-[#1a2035] bg-[#0b0e19] space-y-2">
          {/* Direct "Xem Website" Button */}
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#121627] hover:bg-[#181d33] border border-[#1e243d] transition-all group"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
              <span>Xem Website</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">mmavn.com ↗</span>
          </Link>

          {/* User mini profile card */}
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl bg-[#121627]/50 border border-[#1e243d]/60">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser?.name || 'Admin'}
              className="w-8 h-8 rounded-full border border-red-500/40 object-cover shrink-0"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-white truncate">
                {currentUser?.name || 'Nguyễn Thành Nam'}
              </span>
              <span className="text-[10px] text-slate-400 truncate">
                {currentUser?.email || 'admin@mmavn.com'}
              </span>
            </div>
            <span
              className={cn(
                "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase shrink-0",
                currentConfig.badgeBg,
                currentConfig.badgeBorder,
                currentConfig.badgeText
              )}
            >
              {activeRole}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Sleek Topbar */}
        <header className="sticky top-0 z-30 h-16 bg-[#0d111d]/90 backdrop-blur-xl border-b border-[#1a2035] px-4 md:px-8 flex items-center justify-between gap-4">
          {/* Left: Mobile Drawer Trigger + Breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#14192b] transition-colors"
              aria-label="Mở menu quản trị"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumbs */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-medium">
              <Link href="/admin" className="hover:text-slate-200 transition-colors">
                CMS
              </Link>
              <span>/</span>
              <span className="text-white font-bold truncate">
                {getBreadcrumbLabel()}
              </span>
            </div>
          </div>

          {/* Center: Live Command Palette / Quick Search Bar */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-md hidden md:block">
            <div 
              onClick={() => {
                setSearchOpen(true)
                searchInputRef.current?.focus()
              }}
              className="relative cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                placeholder="Tìm nhanh võ sĩ, sự kiện, bài viết, chức năng... (⌘K)"
                className="w-full pl-9 pr-14 py-1.5 rounded-xl bg-[#121627] border border-[#1e243d] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/40 transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                <kbd className="px-1.5 py-0.5 rounded bg-[#1a2038] border border-[#27304e] text-[10px] font-mono text-slate-400">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Search Suggestions Popover */}
            {searchOpen && (
              <div className="absolute left-0 right-0 mt-2 bg-[#121627] border border-[#1e243d] rounded-2xl shadow-2xl z-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-[#1e243d] mb-1 flex items-center justify-between">
                  <span>Điều hướng nhanh</span>
                  <span>{searchResults.length} kết quả</span>
                </div>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      Không tìm thấy kết quả nào cho "{searchQuery}"
                    </div>
                  ) : (
                    searchResults.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => {
                          setSearchOpen(false)
                          setSearchQuery('')
                        }}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-[#181e35] transition-colors group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1a2038] text-slate-400 border border-[#27304e]">
                            {item.category}
                          </span>
                          <span className="text-white font-medium group-hover:text-red-400 transition-colors truncate">
                            {item.title}
                          </span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Controls: Website Link, Role Switcher Badge, Notifications, User Menu */}
          <div className="flex items-center gap-2.5">
            {/* Direct "Xem Website" Topbar Button */}
            <Link
              href="/"
              target="_blank"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#121627] hover:bg-[#181d33] border border-[#1e243d] text-slate-300 hover:text-white transition-all shadow-xs"
              title="Mở giao diện người dùng MMAVN Hub"
            >
              <span>Xem Website</span>
              <ExternalLink className="w-3 h-3 text-red-400" />
            </Link>

            {/* Current Role Badge with Instant Switcher Dropdown inside Topbar */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowRoleMenu(!showRoleMenu)
                  setShowNotifMenu(false)
                  setShowUserMenu(false)
                }}
                aria-label="Chuyển đổi vai trò quản trị"
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:scale-[1.02] active:scale-[0.98]",
                  currentConfig.badgeBg,
                  currentConfig.badgeBorder,
                  currentConfig.badgeText
                )}
              >
                {getRoleIcon(activeRole, "w-3.5 h-3.5")}
                <span className="hidden sm:inline font-bold">
                  {currentConfig.nameVi}
                </span>
                <span className="sm:hidden font-mono uppercase text-[10px]">
                  {activeRole}
                </span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 ml-0.5" />
              </button>

              {/* Instant Role Switcher Dropdown */}
              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#121627] border border-[#1e243d] rounded-2xl shadow-2xl z-50 p-4 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1e243d]">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider font-mono">
                        <Sparkles className="w-3.5 h-3.5 text-red-400" />
                        Chuyển đổi Vai trò (RBAC)
                      </h4>
                    </div>
                    <button
                      onClick={() => setShowRoleMenu(false)}
                      className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Current Active Info Card */}
                  <div className="my-3 p-3 bg-[#0a0d18] border border-[#1a2035] rounded-xl flex items-center gap-3">
                    <img
                      src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                      alt="Avatar"
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-red-500/40"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white truncate">
                          {currentUser?.name || 'Nguyễn Thành Nam'}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-600/20 text-red-400 font-mono">
                          {activeRole.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {currentUser?.email || 'admin@mmavn.com'}
                      </p>
                    </div>
                  </div>

                  {/* Role Selection Buttons */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1 font-mono">
                      Chọn vai trò mô phỏng quyền:
                    </label>
                    <div className="grid grid-cols-1 gap-1.5 max-h-64 overflow-y-auto pr-1">
                      {(['admin', 'editor', 'moderator', 'fighter', 'user'] as UserRole[]).map(role => {
                        const cfg = ROLE_CONFIGS[role]
                        const isSelected = activeRole === role
                        return (
                          <button
                            key={role}
                            onClick={() => handleRoleChange(role)}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center justify-between group",
                              isSelected
                                ? "bg-red-600/15 border-red-500 text-white ring-1 ring-red-500/30 font-semibold"
                                : "bg-[#0f1322] border-[#1e243d] text-slate-300 hover:bg-[#181e35] hover:text-white"
                            )}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span
                                className={cn(
                                  "p-1.5 rounded-lg border shrink-0",
                                  cfg.badgeBg,
                                  cfg.badgeBorder,
                                  cfg.badgeText
                                )}
                              >
                                {getRoleIcon(role, "w-3.5 h-3.5")}
                              </span>
                              <div className="truncate">
                                <span className="font-bold text-white mr-1.5">{cfg.nameVi}</span>
                                <span className="text-[10px] text-slate-400 truncate hidden sm:inline">
                                  ({cfg.permissions.length} quyền)
                                </span>
                              </div>
                            </div>
                            {isSelected ? (
                              <Check className="w-4 h-4 text-red-400 shrink-0" />
                            ) : (
                              <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                                Chọn
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Active Permissions Summary */}
                  <div className="mt-3 pt-3 border-t border-[#1e243d] text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Quyền hiện hành:</span>
                    <span className="font-mono text-red-400 font-bold">
                      {currentConfig.permissions.length} / 11 quyền hệ thống
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell with Badge & Popover */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifMenu(!showNotifMenu)
                  setShowRoleMenu(false)
                  setShowUserMenu(false)
                }}
                className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#121627] border border-[#1e243d] transition-colors"
                aria-label="Thông báo hệ thống"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification dropdown */}
              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#121627] border border-[#1e243d] rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="p-3.5 border-b border-[#1e243d] flex items-center justify-between bg-[#0a0d18]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs uppercase tracking-wider text-white font-mono">
                        Thông báo hệ thống
                      </span>
                      {unreadCount > 0 && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 font-bold">
                          {unreadCount} mới
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                      >
                        <Check className="w-3 h-3" /> Đã đọc
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-[#1e243d]">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400">Không có thông báo mới</div>
                    ) : (
                      notifications.map(notif => (
                        <Link
                          key={notif.id}
                          href={notif.link || '/admin'}
                          onClick={() => setShowNotifMenu(false)}
                          className={cn(
                            "block p-3.5 hover:bg-[#181e35] transition-colors",
                            !notif.read && "bg-red-950/15"
                          )}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span className={cn(
                              "text-xs font-bold",
                              notif.type === 'warning' ? "text-amber-400" :
                              notif.type === 'success' ? "text-emerald-400" : "text-blue-400"
                            )}>
                              {notif.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                              {notif.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                            {notif.message}
                          </p>
                        </Link>
                      ))
                    )}
                  </div>
                  <div className="p-2.5 border-t border-[#1e243d] bg-[#0a0d18] text-center">
                    <Link
                      href="/admin/logs"
                      onClick={() => setShowNotifMenu(false)}
                      className="text-xs text-slate-400 hover:text-red-400 font-semibold transition-colors"
                    >
                      Xem toàn bộ nhật ký hệ thống →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar Button & Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu)
                  setShowNotifMenu(false)
                  setShowRoleMenu(false)
                }}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#121627] border border-[#1e243d] transition-colors"
              >
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt="Admin"
                  className="w-7 h-7 rounded-lg object-cover border border-red-500/50"
                />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-[#121627] border border-[#1e243d] rounded-2xl shadow-2xl z-50 p-3 animate-in fade-in slide-in-from-top-2 space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-[#1e243d]">
                    <img
                      src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                      alt="User avatar"
                      className="w-10 h-10 rounded-xl object-cover border border-red-500/40"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">
                        {currentUser?.name || 'Nguyễn Thành Nam'}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {currentUser?.email || 'admin@mmavn.com'}
                      </p>
                      <span className="inline-block mt-1 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-red-600/20 text-red-300">
                        {currentConfig.nameVi}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Link
                      href="/admin/users"
                      onClick={() => setShowUserMenu(false)}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                      Phân quyền & Tài khoản
                    </Link>
                    <Link
                      href="/admin/logs"
                      onClick={() => setShowUserMenu(false)}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <History className="w-3.5 h-3.5 text-slate-400" />
                      Nhật ký kiểm toán
                    </Link>
                  </div>
                  <div className="pt-2 border-t border-[#1e243d]">
                    <Link
                      href="/"
                      className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-950/30 rounded-lg transition-colors"
                    >
                      <span>Về Trang chủ MMAVN</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
