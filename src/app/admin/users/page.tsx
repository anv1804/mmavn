'use client'

import React, { useState, useMemo } from 'react'
import { 
  ShieldCheck, 
  Search, 
  UserPlus, 
  Shield, 
  AlertCircle, 
  CheckCircle2, 
  UserX, 
  UserCheck, 
  X, 
  Mail, 
  Phone, 
  Clock, 
  Calendar,
  Filter,
  Sparkles
} from 'lucide-react'
import { INITIAL_ADMIN_USERS } from '@/lib/services/admin-service'
import type { User, UserRole, UserStatus } from '@/types/admin'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(INITIAL_ADMIN_USERS)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null)

  // Invite/Add user modal state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [inviteForm, setInviteForm] = useState<{
    name: string
    email: string
    role: UserRole
    phone: string
  }>({
    name: '',
    email: '',
    role: 'editor',
    phone: '',
  })

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ text, type })
    setTimeout(() => setToast(null), 3500)
  }

  // Handle direct role change from dropdown
  const handleRoleChange = (userId: string, newRole: UserRole) => {
    const targetUser = users.find(u => u.id === userId)
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        return { ...user, role: newRole }
      }
      return user
    }))

    showToast(`Đã thay đổi quyền của "${targetUser?.name}" thành: ${newRole}`, 'success')
  }

  // Handle status toggle (Active / Suspended)
  const handleToggleStatus = (userId: string) => {
    const targetUser = users.find(u => u.id === userId)
    const newStatus: UserStatus = targetUser?.status === 'active' ? 'suspended' : 'active'

    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        return { ...user, status: newStatus }
      }
      return user
    }))

    if (newStatus === 'suspended') {
      showToast(`Đã đình chỉ tài khoản của "${targetUser?.name}".`, 'error')
    } else {
      showToast(`Đã khôi phục hoạt động cho tài khoản "${targetUser?.name}".`, 'success')
    }
  }

  // Handle invite/create user
  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteForm.name.trim() || !inviteForm.email.trim()) {
      showToast('Vui lòng điền đầy đủ tên và email.', 'error')
      return
    }

    const newUser: User = {
      id: `u-new-${Date.now()}`,
      name: inviteForm.name.trim(),
      email: inviteForm.email.trim(),
      role: inviteForm.role,
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString(),
      joinedDate: new Date().toISOString().split('T')[0],
      phone: inviteForm.phone.trim() || undefined,
      lastActive: 'Vừa tạo',
      postsCount: 0,
      reportsCount: 0,
    }

    setUsers(prev => [newUser, ...prev])
    showToast(`Đã thêm thành viên mới "${newUser.name}" với vai trò ${newUser.role}!`)
    setIsInviteModalOpen(false)
    setInviteForm({ name: '', email: '', role: 'editor', phone: '' })
  }

  // Filtered list
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchSearch = searchQuery === '' || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchRole = roleFilter === 'all' || user.role === roleFilter
      const matchStatus = statusFilter === 'all' || user.status === statusFilter

      return matchSearch && matchRole && matchStatus
    })
  }, [users, searchQuery, roleFilter, statusFilter])

  // Count by role
  const adminCount = users.filter(u => u.role === 'admin').length
  const editorCount = users.filter(u => u.role === 'editor').length
  const modCount = users.filter(u => u.role === 'moderator').length
  const fighterCount = users.filter(u => u.role === 'fighter').length
  const memberCount = users.filter(u => u.role === 'user').length

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-2xl text-xs font-semibold animate-fade-in ${
          toast.type === 'success' ? 'bg-emerald-950 border-emerald-500/50 text-emerald-200' :
          toast.type === 'error' ? 'bg-rose-950 border-rose-500/50 text-rose-200' :
          'bg-blue-950 border-blue-500/50 text-blue-200'
        }`}>
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
          {toast.type === 'info' && <AlertCircle className="w-4 h-4 text-blue-400" />}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-red-500" />
            <span>Thành Viên & Phân Quyền Vai Trò (RBAC)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Quản lý quyền truy cập hệ thống dành cho Ban Quản Trị, Biên Tập Viên, Kiểm Duyệt Viên và Võ Sĩ
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-900/30 transition-all hover:scale-[1.02] self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Thêm / Phân Quyền Thành Viên</span>
        </button>
      </div>

      {/* Role Distribution Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-[#121627] border border-[#1e2438] p-3 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center font-bold text-xs">
            {adminCount}
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Admin</p>
            <p className="text-xs font-bold text-white">Quản trị tối cao</p>
          </div>
        </div>

        <div className="bg-[#121627] border border-[#1e2438] p-3 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-300 flex items-center justify-center font-bold text-xs">
            {editorCount}
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Editor</p>
            <p className="text-xs font-bold text-white">Biên tập nội dung</p>
          </div>
        </div>

        <div className="bg-[#121627] border border-[#1e2438] p-3 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
            {modCount}
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Moderator</p>
            <p className="text-xs font-bold text-white">Kiểm duyệt forum</p>
          </div>
        </div>

        <div className="bg-[#121627] border border-[#1e2438] p-3 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-xs">
            {fighterCount}
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Fighter</p>
            <p className="text-xs font-bold text-white">Võ sĩ xác minh</p>
          </div>
        </div>

        <div className="bg-[#121627] border border-[#1e2438] p-3 rounded-xl flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs">
            {memberCount}
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">User</p>
            <p className="text-xs font-bold text-white">Thành viên chung</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#121627] border border-[#1e2438] p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email thành viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Role Filter */}
        <div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="all">Tất cả vai trò ({users.length})</option>
            <option value="Admin">Admin (Quản trị viên)</option>
            <option value="Editor">Editor (Biên tập viên)</option>
            <option value="Moderator">Moderator (Kiểm duyệt viên)</option>
            <option value="Fighter">Fighter (Võ sĩ)</option>
            <option value="User">User (Thành viên)</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="all">Tất cả trạng thái hoạt động</option>
            <option value="active">🟢 Đang hoạt động (Active)</option>
            <option value="suspended">🔴 Bị đình chỉ (Suspended)</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#121627] border border-[#1e2438] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1e2438] bg-[#0f1222] text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Thành Viên</th>
                <th className="py-3.5 px-4">Email / Điện Thoại</th>
                <th className="py-3.5 px-4">Phân Quyền Vai Trò (Trực Tiếp)</th>
                <th className="py-3.5 px-4 text-center">Trạng Thái</th>
                <th className="py-3.5 px-4 text-center">Ngày Tham Gia</th>
                <th className="py-3.5 px-4 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2438]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-60 text-slate-400" />
                    <p className="text-sm font-medium">Không tìm thấy thành viên phù hợp.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => {
                  const isSuspended = user.status === 'suspended'

                  return (
                    <tr key={user.id} className="hover:bg-[#161b30] transition-colors group">
                      {/* Avatar & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className={`w-9 h-9 rounded-xl object-cover border ${
                              isSuspended ? 'border-rose-500/50 grayscale' : 'border-[#273050]'
                            }`}
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className={`font-bold text-sm ${isSuspended ? 'text-slate-400 line-through' : 'text-white'}`}>
                                {user.name}
                              </span>
                              {user.fighterId && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-950/50 text-purple-300 border border-purple-500/30">
                                  Võ sĩ
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400">
                              Hoạt động: {user.lastActive}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Email & Phone */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-200 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{user.email}</span>
                        </div>
                        {user.phone && (
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{user.phone}</span>
                          </span>
                        )}
                      </td>

                      {/* Interactive Role Dropdown */}
                      <td className="py-3 px-4">
                        <div className="relative inline-block w-44">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                            className={`w-full rounded-lg px-2.5 py-1.5 text-xs font-semibold border transition-all cursor-pointer focus:outline-none ${
                              user.role === 'admin' ? 'bg-red-950/40 border-red-500/50 text-red-300' :
                              user.role === 'editor' ? 'bg-amber-950/40 border-amber-500/50 text-amber-300' :
                              user.role === 'moderator' ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' :
                              user.role === 'fighter' ? 'bg-purple-950/40 border-purple-500/50 text-purple-300' :
                              'bg-slate-900 border-[#1e2438] text-slate-300'
                            }`}
                          >
                            <option value="admin">Quản trị viên (Admin)</option>
                            <option value="editor">Biên tập viên (Editor)</option>
                            <option value="moderator">Kiểm duyệt viên (Moderator)</option>
                            <option value="fighter">Võ sĩ xác thực (Fighter)</option>
                            <option value="user">Thành viên (User)</option>
                          </select>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center">
                        {isSuspended ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-950/50 text-rose-300 border border-rose-500/40">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            Đã đình chỉ
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950/50 text-emerald-300 border border-emerald-500/40">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Đang hoạt động
                          </span>
                        )}
                      </td>

                      {/* Join Date */}
                      <td className="py-3 px-4 text-center text-slate-400">
                        {user.joinedDate}
                      </td>

                      {/* Action toggle */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            isSuspended
                              ? 'bg-emerald-950/30 hover:bg-emerald-900/50 text-emerald-300 border-emerald-500/30'
                              : 'bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 border-rose-500/30'
                          }`}
                        >
                          {isSuspended ? (
                            <>
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>Khôi phục</span>
                            </>
                          ) : (
                            <>
                              <UserX className="w-3.5 h-3.5" />
                              <span>Khóa tài khoản</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite/Add User Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#121627] border border-[#1e2438] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e2438]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-600/20 text-red-400">
                  <UserPlus className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Thêm Thành Viên & Thiết Lập Vai Trò</h3>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Họ và Tên <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hoàng Minh Trí"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Địa Chỉ Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="minhtri@mmavn.com"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Số Điện Thoại</label>
                <input
                  type="text"
                  placeholder="0912345678"
                  value={inviteForm.phone}
                  onChange={(e) => setInviteForm({ ...inviteForm, phone: e.target.value })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Quyền Hạn Khởi Tạo</label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value as UserRole })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 cursor-pointer"
                >
                  <option value="admin">Admin (Toàn quyền quản trị hệ thống)</option>
                  <option value="editor">Editor (Quản lý hồ sơ võ sĩ & sự kiện)</option>
                  <option value="moderator">Moderator (Kiểm duyệt bài viết diễn đàn)</option>
                  <option value="fighter">Fighter (Hồ sơ võ sĩ đã xác minh)</option>
                  <option value="user">User (Thành viên người dùng tiêu chuẩn)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1e2438]">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-900/30"
                >
                  Tạo Người Dùng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
