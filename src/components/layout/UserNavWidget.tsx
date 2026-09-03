'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  User as UserIcon,
  Shield,
  LogOut,
  LogIn,
  UserCheck,
  ChevronDown,
  Edit3,
  Check,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { User, UserRole } from '@/types/admin'
import { ROLE_CONFIGS } from '@/types/admin'
import { getCurrentUser, setCurrentUserRole } from '@/lib/services/admin-service'

export function UserNavWidget() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Sync current user on mount & listen for role change events
  useEffect(() => {
    setCurrentUser(getCurrentUser())

    const handleRoleChanged = (e: Event) => {
      const customEvent = e as CustomEvent<User>
      if (customEvent.detail) {
        setCurrentUser(customEvent.detail)
      }
    }
    window.addEventListener('mmavn-role-changed', handleRoleChanged)
    return () => window.removeEventListener('mmavn-role-changed', handleRoleChanged)
  }, [])

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleRoleSelect = (role: UserRole) => {
    const updated = setCurrentUserRole(role)
    setCurrentUser(updated)
    setIsDropdownOpen(false)
  }

  const roleConfig = currentUser ? ROLE_CONFIGS[currentUser.role] : ROLE_CONFIGS.user
  const isAdminOrEditor = currentUser?.role === 'admin' || currentUser?.role === 'editor'

  return (
    <div className="relative" ref={dropdownRef}>
      {currentUser ? (
        /* User Profile Trigger Button */
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl bg-card/60 hover:bg-card border border-border/70 hover:border-border transition-all cursor-pointer shadow-xs group"
          title={`Tài khoản: ${currentUser.name}`}
        >
          <div className="text-left hidden xl:block">
            <p className="text-xs font-bold text-white leading-tight truncate max-w-[100px]">
              {currentUser.name}
            </p>
            <span className={cn(
              "text-[10px] font-semibold px-1.5 py-0.2 rounded inline-block",
              roleConfig.badgeBg, roleConfig.badgeBorder, roleConfig.badgeText
            )}>
              {roleConfig.nameVi}
            </span>
          </div>

          <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-border bg-slate-800 shrink-0">
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-300">
                {currentUser.name.charAt(0)}
              </div>
            )}
            {isAdminOrEditor && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-red-500 border border-background" />
            )}
          </div>

          <ChevronDown className={cn(
            "w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform duration-200",
            isDropdownOpen && "rotate-180"
          )} />
        </button>
      ) : (
        /* Login / Register Trigger */
        <button
          onClick={() => setShowAuthModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20 transition-all cursor-pointer active:scale-95"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Đăng nhập</span>
        </button>
      )}

      {/* User Dropdown Menu */}
      {isDropdownOpen && currentUser && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0e1322] border border-[#1e2740] shadow-2xl p-3 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
          {/* User Info Header */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-border bg-slate-800 shrink-0">
              <img src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120'} alt={currentUser.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate">{currentUser.name}</h4>
              <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
              <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded mt-1 inline-block border", roleConfig.badgeBg, roleConfig.badgeBorder, roleConfig.badgeText)}>
                {roleConfig.nameVi}
              </span>
            </div>
          </div>

          {/* Admin CMS Access Link (ONLY FOR ADMIN OR EDITOR) */}
          {isAdminOrEditor && (
            <div className="mt-2 pt-2 border-t border-[#1e2740]">
              <Link
                href="/admin"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 border border-red-500/20 font-bold text-xs transition-all"
              >
                <Shield className="w-4 h-4 text-red-500" />
                <div className="flex-1">
                  <span className="block leading-tight">Quản Trị Admin CMS</span>
                  <span className="text-[10px] font-normal text-slate-400">Quản lý giải đấu, võ sĩ & tin tức</span>
                </div>
              </Link>
            </div>
          )}

          {/* Quick Role Switcher */}
          <div className="mt-2 pt-2 border-t border-[#1e2740]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-1.5">
              Chuyển đổi vai trò nhanh
            </span>
            <div className="space-y-1">
              {(Object.keys(ROLE_CONFIGS) as UserRole[]).map((r) => {
                const cfg = ROLE_CONFIGS[r]
                const isSelected = currentUser.role === r
                return (
                  <button
                    key={r}
                    onClick={() => handleRoleSelect(r)}
                    className={cn(
                      "w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left",
                      isSelected
                        ? "bg-slate-800 text-white font-bold"
                        : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className={cn("w-2 h-2 rounded-full", cfg.badgeBg)} />
                      {cfg.nameVi}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* User Links */}
          <div className="mt-2 pt-2 border-t border-[#1e2740] space-y-0.5">
            <Link
              href="/dien-dan"
              onClick={() => setIsDropdownOpen(false)}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Bài viết của tôi trên Diễn đàn</span>
            </Link>

            <button
              onClick={() => {
                setCurrentUser(null)
                setIsDropdownOpen(false)
              }}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất tài khoản</span>
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal (Login / Register) */}
      {showAuthModal && (
        <div
          onClick={() => setShowAuthModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full bg-[#0e1322] border border-[#1e2740] rounded-3xl p-6 shadow-2xl cursor-default"
          >
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white">
                {authMode === 'login' ? 'Đăng Nhập MMAVN' : 'Tạo Tài Khoản Mới'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Tham gia cộng đồng võ thuật và dự đoán các trận thư hùng
              </p>
            </div>

            {/* Quick Demo Login Buttons */}
            <div className="space-y-2 mb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center mb-2">
                Chọn vai trò đăng nhập thử nghiệm:
              </span>
              <button
                onClick={() => {
                  const u = setCurrentUserRole('admin')
                  setCurrentUser(u)
                  setShowAuthModal(false)
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer hover:opacity-95"
              >
                <Shield className="w-4 h-4" /> Đăng nhập với quyền Quản Trị Viên (Admin)
              </button>
              <button
                onClick={() => {
                  const u = setCurrentUserRole('editor')
                  setCurrentUser(u)
                  setShowAuthModal(false)
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer hover:opacity-95"
              >
                <Edit3 className="w-4 h-4" /> Đăng nhập với quyền Biên Tập Viên (Editor)
              </button>
              <button
                onClick={() => {
                  const u = setCurrentUserRole('user')
                  setCurrentUser(u)
                  setShowAuthModal(false)
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
              >
                <UserIcon className="w-4 h-4" /> Đăng nhập với quyền Thành Viên (User)
              </button>
            </div>

            <div className="text-center pt-3 border-t border-border/40 text-xs text-slate-400">
              {authMode === 'login' ? (
                <span>Chưa có tài khoản? <button onClick={() => setAuthMode('register')} className="text-red-400 font-bold hover:underline">Đăng ký ngay</button></span>
              ) : (
                <span>Đã có tài khoản? <button onClick={() => setAuthMode('login')} className="text-red-400 font-bold hover:underline">Đăng nhập</button></span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
