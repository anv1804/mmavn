'use client'

import { useState } from 'react'
import { X, Send, Tag, AlertCircle, Shield, Flame, Dumbbell, ShoppingBag } from 'lucide-react'
import type { ForumCategory, BeltLevel, ForumPost } from '@/types'
import { BeltBadge } from './BeltBadge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (newPost: ForumPost) => void
  defaultCategory?: ForumCategory | 'all'
}

const CATEGORIES: {
  id: ForumCategory
  name: string
  desc: string
  icon: typeof Shield
}[] = [
  {
    id: 'ky-thuat',
    name: 'Kỹ thuật & Chiến thuật',
    desc: 'Phân tích thế võ BJJ, Striking, Wrestling',
    icon: Shield,
  },
  {
    id: 'soi-keo',
    name: 'Bàn luận & Soi kèo',
    desc: 'Dự đoán trận đấu LION, GMA, UFC',
    icon: Flame,
  },
  {
    id: 'phong-tap',
    name: 'Góc phòng gym & Bạn tập',
    desc: 'Tìm bạn sparring, review lò võ',
    icon: Dumbbell,
  },
  {
    id: 'cho-do',
    name: 'Chợ đồ tập & Giáp hộ hộ',
    desc: 'Pass găng tay, giáp, bọc chân bảo hộ',
    icon: ShoppingBag,
  },
]

const BELT_OPTIONS: BeltLevel[] = [
  'Đai Trắng',
  'Đai Xanh',
  'Đai Tím',
  'Đai Nâu',
  'Đai Đen',
]

const QUICK_TAGS = [
  'BJJ',
  'Striking',
  'LionChampionship',
  'NoGi',
  'Sparring',
  'Wrestling',
  'PassDo',
  'ReviewPhongTap',
]

export function CreatePostModal({
  isOpen,
  onClose,
  onSuccess,
  defaultCategory,
}: CreatePostModalProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<ForumCategory>(
    defaultCategory && defaultCategory !== 'all' ? defaultCategory : 'ky-thuat'
  )
  const [content, setContent] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [authorName, setAuthorName] = useState('Võ Sinh MMA')
  const [beltLevel, setBeltLevel] = useState<BeltLevel>('Đai Xanh')
  const [gym, setGym] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleQuickTag = (tag: string) => {
    const existing = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    if (!existing.includes(tag)) {
      setTagsInput(existing.length > 0 ? `${existing.join(', ')}, ${tag}` : tag)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim()) {
      setError('Vui lòng nhập tiêu đề bài viết')
      return
    }

    if (title.trim().length < 10) {
      setError('Tiêu đề cần ít nhất 10 ký tự để mô tả rõ ràng vấn đề')
      return
    }

    if (!content.trim()) {
      setError('Vui lòng nhập nội dung bài viết')
      return
    }

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean)

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          category,
          tags: parsedTags.length > 0 ? parsedTags : ['MMAVN'],
          author: {
            name: authorName.trim() || 'Võ Sinh MMA',
            beltLevel,
            gym: gym.trim() || undefined,
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
              authorName || 'MMA'
            )}`,
          },
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra khi tạo bài viết')
      }

      onSuccess(data.data)
      onClose()
    } catch (err: any) {
      setError(err.message || 'Không thể tạo bài viết, vui lòng thử lại!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Tạo bài viết mới
            </h2>
            <p className="text-sm text-muted mt-0.5">
              Chia sẻ kinh nghiệm, phân tích đòn thế hoặc tìm bạn tập luyện
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-muted hover:text-foreground hover:bg-card-hover transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted">
              Chọn chuyên mục <span className="text-primary">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                const isSelected = category === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer',
                      isSelected
                        ? 'border-primary bg-primary/10 text-foreground ring-1 ring-primary/40'
                        : 'border-border bg-card-hover/40 text-muted hover:text-foreground hover:border-border-hover'
                    )}
                  >
                    <div
                      className={cn(
                        'p-2 rounded-lg shrink-0',
                        isSelected ? 'bg-primary text-white' : 'bg-card text-muted'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-tight">{cat.name}</p>
                      <p className="text-[11px] text-muted mt-1 leading-snug">{cat.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Title input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted">
              Tiêu đề bài thảo luận <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Phân tích đòn Calf Kick hiệu quả trong MMA hiện đại..."
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted/60"
            />
          </div>

          {/* Content input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted">
              Nội dung chi tiết <span className="text-primary">*</span>
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Mô tả kỹ thuật, góc nhìn chiến thuật, thời gian địa điểm tập hoặc tình trạng trang phục cần pass..."
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted/60 resize-y"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                Tags (cách nhau bởi dấu phẩy)
              </label>
            </div>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="BJJ, Striking, LionChampionship, Sparring..."
              className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted/60"
            />
            {/* Quick tag suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-muted/80 mr-1">Gợi ý tag:</span>
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleQuickTag(tag)}
                  className="text-xs px-2 py-0.5 rounded-md bg-card-hover text-muted hover:text-foreground border border-border transition-colors cursor-pointer"
                >
                  +{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Author Profile info */}
          <div className="pt-3 border-t border-border/60 space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted">
              Thông tin người đăng
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-muted block mb-1">Tên / Biệt danh</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs text-muted block mb-1">Cấp bậc đai võ thuật</label>
                <select
                  value={beltLevel}
                  onChange={(e) => setBeltLevel(e.target.value as BeltLevel)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  {BELT_OPTIONS.map((belt) => (
                    <option key={belt} value={belt}>
                      {belt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-muted block mb-1">CLB / Phòng gym (tuỳ chọn)</label>
                <input
                  type="text"
                  value={gym}
                  onChange={(e) => setGym(e.target.value)}
                  placeholder="VD: SSC Saigon, VTT..."
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Live Author Preview */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card-hover/40 border border-border/60 text-xs">
              <span className="text-muted">Xem trước thẻ tên:</span>
              <span className="font-semibold text-foreground">{authorName || 'Võ Sinh'}</span>
              <BeltBadge belt={beltLevel} size="sm" />
              {gym && <span className="text-muted font-normal">• {gym}</span>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-card-hover transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Đang đăng bài...' : 'Đăng bài viết'}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
