'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  MessageSquare, 
  Search, 
  AlertTriangle, 
  Pin, 
  Lock, 
  Unlock, 
  Trash2, 
  Eye, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  ShieldCheck,
  X,
  Flame,
  ThumbsUp,
  MessageCircle,
  Clock,
  Filter
} from 'lucide-react'
import { INITIAL_FORUM_MODERATION } from '@/lib/services/admin-service'
import type { ForumModerationItem } from '@/types/admin'

export default function AdminForumPage() {
  const [posts, setPosts] = useState<ForumModerationItem[]>(INITIAL_FORUM_MODERATION)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [filterMode, setFilterMode] = useState<'all' | 'flagged' | 'pinned' | 'hidden'>('all')
  
  // Toast
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null)

  // Inspection modal
  const [inspectingPost, setInspectingPost] = useState<ForumModerationItem | null>(null)

  // Removal confirmation dialog
  const [removingPostId, setRemovingPostId] = useState<string | null>(null)
  const [removeReason, setRemoveReason] = useState('Vi phạm điều khoản cộng đồng MMAVN Hub')

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ text, type })
    setTimeout(() => setToast(null), 3500)
  }

  // Toggle Pin
  const handleTogglePin = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        const nextPinned = !p.isPinned
        showToast(nextPinned ? `Đã ghim bài viết lên đầu diễn đàn` : `Đã bỏ ghim bài viết`, 'info')
        return { ...p, isPinned: nextPinned }
      }
      return p
    }))
  }

  // Toggle Lock
  const handleToggleLock = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        const nextLocked = !p.isLocked
        showToast(nextLocked ? `Đã khóa bình luận bài viết` : `Đã mở lại bình luận`, 'info')
        return { ...p, isLocked: nextLocked }
      }
      return p
    }))
  }

  // Dismiss reports
  const handleDismissReports = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, reportsCount: 0, reportReasons: [] }
      }
      return p
    }))
    showToast('Đã bỏ qua các báo cáo vi phạm cho bài viết này', 'success')
    if (inspectingPost?.id === id) {
      setInspectingPost(prev => prev ? { ...prev, reportsCount: 0, reportReasons: [] } : null)
    }
  }

  // Confirm remove post
  const handleConfirmRemove = () => {
    if (!removingPostId) return

    setPosts(prev => prev.map(p => {
      if (p.id === removingPostId) {
        return { ...p, status: 'hidden' }
      }
      return p
    }))

    showToast(`Đã ẩn gỡ bài viết do: ${removeReason}`, 'error')
    setRemovingPostId(null)
    if (inspectingPost?.id === removingPostId) {
      setInspectingPost(null)
    }
  }

  // Restore post
  const handleRestorePost = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: 'active' }
      }
      return p
    }))
    showToast('Đã khôi phục bài viết hiển thị công khai', 'success')
  }

  // Total flagged
  const flaggedCount = posts.filter(p => p.reportsCount > 0 && p.status === 'active').length

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchSearch = searchQuery === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.authorName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory

      let matchFilter = true
      if (filterMode === 'flagged') matchFilter = p.reportsCount > 0
      if (filterMode === 'pinned') matchFilter = p.isPinned
      if (filterMode === 'hidden') matchFilter = p.status === 'hidden'

      return matchSearch && matchCategory && matchFilter
    })
  }, [posts, searchQuery, selectedCategory, filterMode])

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'ky-thuat': return { label: 'Kỹ thuật MMA', color: 'text-blue-400 bg-blue-950/40 border-blue-500/30' }
      case 'soi-keo': return { label: 'Bàn luận & Soi kèo', color: 'text-amber-400 bg-amber-950/40 border-amber-500/30' }
      case 'phong-tap': return { label: 'Phòng tập & Sparring', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30' }
      case 'cho-do': return { label: 'Chợ đồ tập & Giáp', color: 'text-purple-400 bg-purple-950/40 border-purple-500/30' }
      default: return { label: cat, color: 'text-slate-300 bg-slate-800 border-slate-700' }
    }
  }

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
            <MessageSquare className="w-6 h-6 text-red-500" />
            <span>Kiểm Duyệt & Giám Sát Diễn Đàn MMA</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Xử lý báo cáo vi phạm, ghim bài tiêu biểu, khóa bình luận hoặc gỡ bài spam trên diễn đàn MMAVN Hub
          </p>
        </div>

        {flaggedCount > 0 && (
          <button
            onClick={() => setFilterMode('flagged')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600/20 text-rose-300 border border-rose-500/40 text-xs font-bold self-start sm:self-auto hover:bg-rose-600/30 transition-all"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>{flaggedCount} bài viết có báo cáo chờ xử lý</span>
          </button>
        )}
      </div>

      {/* Filter Tabs & Search Toolbar */}
      <div className="bg-[#121627] border border-[#1e2438] p-4 rounded-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0d101e] border border-[#1e2438] rounded-xl text-xs">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${filterMode === 'all' ? 'bg-red-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Tất cả ({posts.length})
            </button>
            <button
              onClick={() => setFilterMode('flagged')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${filterMode === 'flagged' ? 'bg-red-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Có báo cáo ({flaggedCount})</span>
            </button>
            <button
              onClick={() => setFilterMode('pinned')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${filterMode === 'pinned' ? 'bg-red-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Pin className="w-3.5 h-3.5 text-blue-400" />
              <span>Đang ghim</span>
            </button>
            <button
              onClick={() => setFilterMode('hidden')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${filterMode === 'hidden' ? 'bg-red-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <span>Đã ẩn</span>
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm theo tiêu đề, tác giả..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#1a1f33] overflow-x-auto text-xs">
          <span className="text-slate-400 text-[11px] whitespace-nowrap">Chuyên mục:</span>
          {[
            { id: 'all', label: 'Tất cả chuyên mục' },
            { id: 'ky-thuat', label: 'Kỹ thuật & Chiến thuật' },
            { id: 'soi-keo', label: 'Bàn luận & Soi kèo' },
            { id: 'phong-tap', label: 'Phòng gym & Sparring' },
            { id: 'cho-do', label: 'Chợ đồ tập' },
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap font-medium transition-colors ${
                selectedCategory === c.id
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Moderation List */}
      <div className="space-y-3">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center bg-[#121627] border border-[#1e2438] rounded-2xl text-slate-400">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-400 opacity-60" />
            <p className="text-sm font-medium">Không có bài viết nào trong danh sách lọc này.</p>
          </div>
        ) : (
          filteredPosts.map(post => {
            const catInfo = getCategoryLabel(post.category)
            const isHidden = post.status === 'hidden'

            return (
              <div
                key={post.id}
                className={`bg-[#121627] border rounded-2xl p-4 md:p-5 transition-all ${
                  isHidden ? 'border-rose-950/40 opacity-70 bg-[#0d101e]' :
                  post.reportsCount > 0 ? 'border-amber-500/40 shadow-lg shadow-amber-950/10' :
                  'border-[#1e2438] hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left Column: Post details */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      {/* Category Badge */}
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${catInfo.color}`}>
                        {catInfo.label}
                      </span>

                      {/* Flag Badge */}
                      {post.reportsCount > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-600/20 text-rose-300 border border-rose-500/40">
                          <AlertTriangle className="w-3 h-3 text-rose-400" />
                          {post.reportsCount} báo cáo vi phạm
                        </span>
                      )}

                      {/* Pin Badge */}
                      {post.isPinned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-600/20 text-blue-300 border border-blue-500/40">
                          <Pin className="w-3 h-3" /> Đang ghim
                        </span>
                      )}

                      {/* Lock Badge */}
                      {post.isLocked && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          <Lock className="w-3 h-3" /> Đã khóa bình luận
                        </span>
                      )}

                      {/* Hidden status */}
                      {isHidden && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                          Đã gỡ bài (Bị ẩn)
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className={`text-base font-bold text-white leading-snug ${isHidden ? 'line-through text-slate-400' : ''}`}>
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>

                    {/* Author & Metrics */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 flex-wrap">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          className="w-5 h-5 rounded-full object-cover border border-slate-700"
                        />
                        <span className="font-semibold text-slate-300">{post.authorName}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          {post.authorBelt}
                        </span>
                      </div>

                      <span>•</span>

                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 text-slate-400" />
                        {post.upvotes}
                      </span>

                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3 text-slate-400" />
                        {post.repliesCount} bình luận
                      </span>

                      <span>•</span>

                      <span className="text-[11px] text-slate-400">
                        {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>

                    {/* Reasons summary if flagged */}
                    {post.reportsCount > 0 && post.reportReasons.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-900/30 text-xs text-rose-300 space-y-1">
                        <span className="font-bold flex items-center gap-1 text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                          Lý do người dùng báo cáo:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {post.reportReasons.map((reason, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-rose-900/40 text-[10px] border border-rose-800/50">
                              {reason}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Moderation Action Buttons */}
                  <div className="flex flex-row md:flex-col items-center justify-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-[#1e2438]">
                    <button
                      onClick={() => setInspectingPost(post)}
                      className="px-3 py-1.5 rounded-xl bg-[#1a2038] hover:bg-[#242c4c] text-slate-200 text-xs font-semibold border border-[#273050] transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                      <span>Xem xét</span>
                    </button>

                    <button
                      onClick={() => handleTogglePin(post.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                        post.isPinned
                          ? 'bg-blue-950/40 text-blue-300 border-blue-500/40 hover:bg-blue-900/50'
                          : 'bg-[#1a2038] hover:bg-[#242c4c] text-slate-300 border-[#273050]'
                      }`}
                    >
                      <Pin className="w-3.5 h-3.5" />
                      <span>{post.isPinned ? 'Bỏ ghim' : 'Ghim'}</span>
                    </button>

                    <button
                      onClick={() => handleToggleLock(post.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                        post.isLocked
                          ? 'bg-amber-950/40 text-amber-300 border-amber-500/40 hover:bg-amber-900/50'
                          : 'bg-[#1a2038] hover:bg-[#242c4c] text-slate-300 border-[#273050]'
                      }`}
                    >
                      {post.isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      <span>{post.isLocked ? 'Mở khóa' : 'Khóa bình luận'}</span>
                    </button>

                    {isHidden ? (
                      <button
                        onClick={() => handleRestorePost(post.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Khôi phục</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setRemovingPostId(post.id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Gỡ bài</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Inspect & Detailed Moderation Modal */}
      {inspectingPost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#121627] border border-[#1e2438] rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e2438]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-600/20 text-red-400">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Kiểm Duyệt Chi Tiết Bài Viết</h3>
              </div>
              <button
                onClick={() => setInspectingPost(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3 p-3 bg-[#0d101e] border border-[#1e2438] rounded-xl">
              <img
                src={inspectingPost.authorAvatar}
                alt={inspectingPost.authorName}
                className="w-10 h-10 rounded-full object-cover border border-red-500/40"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white">{inspectingPost.authorName}</p>
                <p className="text-[11px] text-slate-400">Đẳng cấp: {inspectingPost.authorBelt} • Ngày đăng: {new Date(inspectingPost.createdAt).toLocaleString('vi-VN')}</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getCategoryLabel(inspectingPost.category).color}`}>
                {getCategoryLabel(inspectingPost.category).label}
              </span>
            </div>

            {/* Post content preview */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">{inspectingPost.title}</h4>
              <div className="p-4 bg-[#0d101e] border border-[#1e2438] rounded-xl text-xs text-slate-300 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-line">
                {inspectingPost.content}
              </div>
            </div>

            {/* Reports status */}
            {inspectingPost.reportsCount > 0 ? (
              <div className="p-3.5 bg-rose-950/20 border border-rose-900/40 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    Có {inspectingPost.reportsCount} khiếu nại vi phạm từ người dùng
                  </span>
                  <button
                    onClick={() => handleDismissReports(inspectingPost.id)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/50 font-semibold"
                  >
                    Bỏ qua báo cáo hợp lệ
                  </button>
                </div>
                <div className="space-y-1">
                  {inspectingPost.reportReasons.map((r, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Không có khiếu nại vi phạm nào cho bài viết này.</span>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#1e2438]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePin(inspectingPost.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
                >
                  {inspectingPost.isPinned ? 'Bỏ ghim' : 'Ghim bài'}
                </button>
                <button
                  onClick={() => handleToggleLock(inspectingPost.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
                >
                  {inspectingPost.isLocked ? 'Mở bình luận' : 'Khóa bình luận'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                {inspectingPost.status !== 'hidden' ? (
                  <button
                    onClick={() => {
                      setRemovingPostId(inspectingPost.id)
                    }}
                    className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                  >
                    Gỡ bài viết
                  </button>
                ) : (
                  <button
                    onClick={() => handleRestorePost(inspectingPost.id)}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                  >
                    Khôi phục bài
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Removal Confirmation Dialog */}
      {removingPostId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#14182b] border border-[#1e2438] rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white">Gỡ bỏ bài viết vi phạm?</h3>
              <p className="text-xs text-slate-400">
                Bài viết sẽ bị ẩn khỏi cộng đồng và ghi vào nhật ký kiểm duyệt.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Lý do xử lý gỡ bài:</label>
              <select
                value={removeReason}
                onChange={(e) => setRemoveReason(e.target.value)}
                className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="Vi phạm điều khoản cộng đồng MMAVN Hub">Vi phạm điều khoản cộng đồng MMAVN Hub</option>
                <option value="Nội dung spam / quảng cáo sai quy định">Nội dung spam / quảng cáo sai quy định</option>
                <option value="Ngôn từ kích động thù địch / xúc phạm">Ngôn từ kích động thù địch / xúc phạm</option>
                <option value="Nghi vấn lừa đảo / rao bán hàng giả">Nghi vấn lừa đảo / rao bán hàng giả</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setRemovingPostId(null)}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmRemove}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white"
              >
                Xác nhận gỡ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
