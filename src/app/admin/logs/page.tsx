'use client'

import React, { useState, useMemo } from 'react'
import { 
  History, 
  Search, 
  Filter, 
  Swords, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  Activity, 
  Clock, 
  User,
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { INITIAL_AUDIT_LOGS } from '@/lib/services/admin-service'
import type { AuditLog, AuditCategory } from '@/types/admin'

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedRole, setSelectedRole] = useState<string>('all')

  const getCategoryBadge = (cat: AuditCategory) => {
    switch (cat) {
      case 'fighter':
        return { label: 'Võ sĩ MMA', color: 'bg-red-950/40 text-red-300 border-red-500/30', icon: Swords }
      case 'event':
        return { label: 'Sự kiện & Trận đấu', color: 'bg-blue-950/40 text-blue-300 border-blue-500/30', icon: Calendar }
      case 'forum':
        return { label: 'Kiểm duyệt diễn đàn', color: 'bg-purple-950/40 text-purple-300 border-purple-500/30', icon: MessageSquare }
      case 'user':
        return { label: 'Phân quyền thành viên', color: 'bg-amber-950/40 text-amber-300 border-amber-500/30', icon: ShieldCheck }
      case 'system':
        return { label: 'Hệ thống', color: 'bg-slate-800 text-slate-300 border-slate-700', icon: Activity }
      default:
        return { label: cat, color: 'bg-slate-800 text-slate-300 border-slate-700', icon: Activity }
    }
  }

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchSearch = searchQuery === '' || 
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.userName && log.userName.toLowerCase().includes(searchQuery.toLowerCase()))

      const category = log.category || (log.entity as AuditCategory) || 'system'
      const matchCategory = selectedCategory === 'all' || category === selectedCategory
      const matchRole = selectedRole === 'all' || log.userRole === selectedRole

      return matchSearch && matchCategory && matchRole
    })
  }, [logs, searchQuery, selectedCategory, selectedRole])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <History className="w-6 h-6 text-red-500" />
            <span>Nhật Ký Hoạt Động & Audit Trail</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ghi nhận toàn bộ thao tác thêm mới, điều chỉnh tỷ số, cấp quyền và xử lý vi phạm trong hệ thống
          </p>
        </div>

        <button
          onClick={() => alert('Xuất nhật ký thành công file mmavn-audit-trail.csv!')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a2038] hover:bg-[#242c4c] text-slate-200 text-xs font-semibold border border-[#273050] transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-slate-400" />
          <span>Xuất Báo Cáo (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#121627] border border-[#1e2438] p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Tìm theo hành động, người thực hiện..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Category filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="all">Tất cả phân loại hành động</option>
            <option value="fighter">Võ sĩ MMA</option>
            <option value="event">Sự kiện & Kết quả</option>
            <option value="forum">Kiểm duyệt diễn đàn</option>
            <option value="user">Phân quyền tài khoản</option>
            <option value="system">Hệ thống</option>
          </select>
        </div>

        {/* Role filter */}
        <div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="all">Tất cả cấp bậc thực hiện</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Moderator">Moderator</option>
          </select>
        </div>
      </div>

      {/* Logs Table / List */}
      <div className="bg-[#121627] border border-[#1e2438] rounded-2xl overflow-hidden shadow-xl">
        <div className="divide-y divide-[#1e2438]">
          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-400 opacity-60" />
              <p className="text-sm font-medium">Không có nhật ký nào phù hợp.</p>
            </div>
          ) : (
            filteredLogs.map(log => {
              const catBadge = getCategoryBadge(log.category || (log.entity as AuditCategory) || 'system')
              const CatIcon = catBadge.icon
              const avatar = log.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
              const name = log.userName || log.performedBy || 'Quản trị viên'
              const role = log.userRole || 'Admin'

              return (
                <div key={log.id} className="p-4 md:p-5 hover:bg-[#161b30] transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left: User avatar + Action & Details */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <img
                      src={avatar}
                      alt={name}
                      className="w-9 h-9 rounded-xl object-cover border border-[#2a3254] flex-shrink-0 mt-0.5"
                    />

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-white">{name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono font-bold">
                          {role}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold border ${catBadge.color}`}>
                          <CatIcon className="w-3 h-3" />
                          {catBadge.label}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-200">{log.action}</p>

                      <div className="p-2.5 rounded-xl bg-[#0d101e] border border-[#1e2438] text-xs text-slate-300 leading-relaxed font-mono">
                        {log.details}
                      </div>
                    </div>
                  </div>

                  {/* Right: Timestamp */}
                  <div className="flex items-center md:items-start gap-1 text-xs text-slate-400 whitespace-nowrap pt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
