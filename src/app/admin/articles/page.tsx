'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Newspaper, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  User, 
  Tag, 
  CheckCircle2,
  Eye
} from 'lucide-react'
import { articles as initialArticles } from '@/data/mock-data'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export default function AdminArticlesPage() {
  const [articlesList, setArticlesList] = useState(initialArticles)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const categories = [
    { id: 'all', label: 'Tất cả danh mục' },
    { id: 'breaking', label: 'Tin nóng' },
    { id: 'analysis', label: 'Phân tích' },
    { id: 'interview', label: 'Phỏng vấn' },
    { id: 'technique', label: 'Kỹ thuật' },
    { id: 'opinion', label: 'Góc nhìn' },
    { id: 'gym-spotlight', label: 'Tiêu điểm CLB' },
  ]

  const filteredArticles = articlesList.filter(article => {
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Bạn có chắc muốn xóa bài viết "${title}"?`)) {
      setArticlesList(prev => prev.filter(a => a.id !== id))
      setToastMessage(`Đã xóa bài viết: "${title}"`)
      setTimeout(() => setToastMessage(null), 3000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Newspaper className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-white">Quản trị Tin tức & Bài viết MMA</h1>
          </div>
          <p className="text-sm text-slate-400">
            Biên tập, xuất bản bài viết chuyên sâu, phỏng vấn độc quyền và tin chuyển nhượng/kết quả MMA.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/tin-tuc"
            target="_blank"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#161b2e] border border-[#232942] text-slate-300 hover:text-white transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Xem trang Tin tức</span>
          </Link>
          <button
            onClick={() => {
              setToastMessage('Khung soạn thảo bài viết mới đang mở!')
              setTimeout(() => setToastMessage(null), 3000)
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white transition-all shadow-lg shadow-red-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Viết bài mới</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-[#121626] border border-[#1e243b] rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tiêu đề, tác giả, thẻ tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#161a2e] border border-[#232942] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border",
                categoryFilter === cat.id
                  ? "bg-red-600 text-white border-red-500 shadow-sm"
                  : "bg-[#161a2e] border-[#232942] text-slate-400 hover:text-white"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-[#121626] border border-[#1e243b] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1e243b] text-slate-400 uppercase tracking-wider text-[11px] bg-[#0c0f1c]/40">
                <th className="py-3 px-4">Bài viết</th>
                <th className="py-3 px-4">Chuyên mục</th>
                <th className="py-3 px-4">Tác giả</th>
                <th className="py-3 px-4">Ngày đăng</th>
                <th className="py-3 px-4 text-center">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e243b]/60">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400 text-xs">
                    Không tìm thấy bài viết nào phù hợp bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredArticles.map(article => (
                  <tr key={article.id} className="hover:bg-[#161b2e]/50 transition-colors">
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#1a2038] border border-[#232942] flex items-center justify-center shrink-0 text-xl overflow-hidden">
                          {article.coverImage ? (
                            <img 
                              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150" 
                              alt={article.title} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <span>📰</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-white text-sm line-clamp-1 hover:text-red-400 transition-colors cursor-pointer">
                            {article.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 uppercase">
                        {article.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-300">
                      {article.author}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Đã xuất bản
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/tin-tuc/${article.slug || article.id}`}
                          target="_blank"
                          title="Xem trước"
                          className="p-1.5 rounded-lg bg-[#181d33] text-slate-400 hover:text-white hover:bg-[#202744] transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => {
                            setToastMessage(`Đang mở chỉnh sửa bài viết: ${article.title}`)
                            setTimeout(() => setToastMessage(null), 3000)
                          }}
                          title="Chỉnh sửa"
                          className="p-1.5 rounded-lg bg-[#181d33] text-slate-400 hover:text-amber-400 hover:bg-[#202744] transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id, article.title)}
                          title="Xóa bài viết"
                          className="p-1.5 rounded-lg bg-[#181d33] text-slate-400 hover:text-red-400 hover:bg-[#202744] transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
