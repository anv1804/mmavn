'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowBigUp,
  MessageSquare,
  Share2,
  Check,
  Send,
  Pin,
  Clock,
  MapPin,
  Shield,
  Flame,
  Dumbbell,
  ShoppingBag,
  Sparkles,
  Award,
} from 'lucide-react'
import type { ForumPost, ForumComment, ForumCategory, BeltLevel } from '@/types'
import { BeltBadge } from '@/components/forum/BeltBadge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface ForumDetailClientProps {
  post: ForumPost
  initialComments: ForumComment[]
  relatedPosts: ForumPost[]
}

const CATEGORY_MAP: Record<
  ForumCategory,
  { label: string; badgeClass: string; icon: typeof Shield }
> = {
  'ky-thuat': {
    label: 'Kỹ thuật & Chiến thuật',
    badgeClass: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    icon: Shield,
  },
  'soi-keo': {
    label: 'Bàn luận & Soi kèo',
    badgeClass: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    icon: Flame,
  },
  'phong-tap': {
    label: 'Góc phòng gym & Bạn tập',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    icon: Dumbbell,
  },
  'cho-do': {
    label: 'Chợ đồ tập & Giáp hộ hộ',
    badgeClass: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
    icon: ShoppingBag,
  },
}

const BELT_OPTIONS: BeltLevel[] = [
  'Đai Trắng',
  'Đai Xanh',
  'Đai Tím',
  'Đai Nâu',
  'Đai Đen',
]

function formatDateVi(dateString: string): string {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return 'Vừa xong'
    if (diffHours < 24) return `${diffHours} giờ trước`
    if (diffDays < 7) return `${diffDays} ngày trước`

    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return dateString
  }
}

export function ForumDetailClient({
  post,
  initialComments,
  relatedPosts,
}: ForumDetailClientProps) {
  const [postUpvoted, setPostUpvoted] = useState(false)
  const [postUpvotes, setPostUpvotes] = useState(post.upvotes)
  const [comments, setComments] = useState<ForumComment[]>(initialComments)
  const [upvotedComments, setUpvotedComments] = useState<Record<string, boolean>>({})

  // Comment Form State
  const [commentContent, setCommentContent] = useState('')
  const [commenterName, setCommenterName] = useState('Võ Sinh MMA')
  const [commenterBelt, setCommenterBelt] = useState<BeltLevel>('Đai Xanh')
  const [commenterGym, setCommenterGym] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const categoryInfo = CATEGORY_MAP[post.category] || {
    label: post.category,
    badgeClass: 'bg-slate-800 text-slate-300',
    icon: Shield,
  }

  // Handle Post Upvote
  const handlePostUpvote = async () => {
    if (postUpvoted) return
    setPostUpvoted(true)
    setPostUpvotes((prev) => prev + 1)

    try {
      await fetch(`/api/forum/${post.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'upvote' }),
      })
    } catch (err) {
      console.error('Error upvoting post:', err)
    }
  }

  // Handle Comment Upvote
  const handleCommentUpvote = async (commentId: string) => {
    if (upvotedComments[commentId]) return

    setUpvotedComments((prev) => ({ ...prev, [commentId]: true }))
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, upvotes: c.upvotes + 1 } : c))
    )

    try {
      await fetch(`/api/forum/${post.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'upvote-comment', commentId }),
      })
    } catch (err) {
      console.error('Error upvoting comment:', err)
    }
  }

  // Handle Share / Copy Link
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    }
  }

  // Handle Submit Comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentContent.trim() || isSubmittingComment) return

    setIsSubmittingComment(true)
    try {
      const res = await fetch(`/api/forum/${post.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: commentContent.trim(),
          author: {
            name: commenterName.trim() || 'Võ Sinh MMA',
            beltLevel: commenterBelt,
            gym: commenterGym.trim() || undefined,
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
              commenterName || 'MMA'
            )}`,
          },
        }),
      })

      const data = await res.json()
      if (res.ok && data.data) {
        setComments((prev) => [...prev, data.data])
        setCommentContent('')
      }
    } catch (err) {
      console.error('Error adding comment:', err)
    } finally {
      setIsSubmittingComment(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Navigation Breadcrumb / Back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/dien-dan"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground hover:bg-card px-3 py-1.5 rounded-xl border border-transparent hover:border-border transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Diễn đàn</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-card border border-border text-muted hover:text-foreground hover:bg-card-hover transition-colors cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-success" />
                <span className="text-success">Đã sao chép link!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Chia sẻ</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Post & Comments (8 cols) + Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Post Article & Discussion Thread */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Post Card */}
          <article className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            {/* Meta Category & Time Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/60">
              <div className="flex items-center gap-2">
                {post.pinned && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-accent bg-accent/15 border border-accent/30 px-2.5 py-0.5 rounded-md">
                    <Pin className="w-3 h-3" />
                    Bài ghim
                  </span>
                )}
                <span
                  className={cn(
                    'text-xs font-semibold px-3 py-1 rounded-full',
                    categoryInfo.badgeClass
                  )}
                >
                  {categoryInfo.label}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatDateVi(post.createdAt)}</span>
              </div>
            </div>

            {/* Post Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Author Profile Row */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-background/60 border border-border">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/40 shadow-sm"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                  }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-sm sm:text-base">
                      {post.author.name}
                    </span>
                    <BeltBadge belt={post.author.beltLevel} size="sm" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted mt-0.5">
                    {post.author.role && (
                      <span className="text-primary font-medium">{post.author.role} • </span>
                    )}
                    {post.author.gym && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted/70" />
                        {post.author.gym}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="hidden sm:block text-right text-xs text-muted">
                <span className="block font-semibold text-foreground">Võ sĩ MMAVN</span>
                <span>Thành viên tích cực</span>
              </div>
            </div>

            {/* Post Full Content */}
            <div className="prose prose-invert max-w-none text-foreground text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line pt-2">
              {post.content}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border/60">
                <span className="text-xs text-muted mr-1">Chủ đề:</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/dien-dan?tag=${encodeURIComponent(tag)}`}
                    className="text-xs px-2.5 py-1 rounded-lg bg-card-hover text-muted hover:text-foreground hover:bg-card-hover/80 border border-border transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Interaction Footer Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                {/* Upvote Button */}
                <button
                  onClick={handlePostUpvote}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer',
                    postUpvoted
                      ? 'bg-primary/20 border-primary text-primary shadow-sm shadow-primary/20'
                      : 'bg-background/80 border-border text-muted hover:text-foreground hover:border-border-hover'
                  )}
                >
                  <ArrowBigUp
                    className={cn(
                      'w-5 h-5',
                      postUpvoted && 'fill-primary text-primary scale-110'
                    )}
                  />
                  <span>Upvote ({postUpvotes})</span>
                </button>

                <div className="flex items-center gap-1.5 text-sm text-muted px-3 py-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>{comments.length} phản hồi</span>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground px-3 py-2 rounded-xl hover:bg-card-hover transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Chia sẻ bài viết</span>
              </button>
            </div>
          </article>

          {/* Comments & Reply Section */}
          <section className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">
                  Bình luận & Thảo luận ({comments.length})
                </h2>
              </div>
              <span className="text-xs text-muted">Tham gia đóng góp ý kiến</span>
            </div>

            {/* Reply Box / Create Comment Form */}
            <form onSubmit={handleSubmitComment} className="space-y-4 bg-background/50 border border-border rounded-2xl p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Send className="w-4 h-4 text-primary" />
                Để lại bình luận của bạn
              </h3>

              <textarea
                rows={3}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Chia sẻ kinh nghiệm, góc nhìn kỹ thuật hoặc đặt câu hỏi cho tác giả..."
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted/60 resize-y"
              />

              {/* User credentials for comment */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-xs text-muted block mb-1">Tên của bạn</label>
                  <input
                    type="text"
                    value={commenterName}
                    onChange={(e) => setCommenterName(e.target.value)}
                    className="w-full bg-card border border-border rounded-xl px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1">Cấp bậc đai</label>
                  <select
                    value={commenterBelt}
                    onChange={(e) => setCommenterBelt(e.target.value as BeltLevel)}
                    className="w-full bg-card border border-border rounded-xl px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
                  >
                    {BELT_OPTIONS.map((belt) => (
                      <option key={belt} value={belt}>
                        {belt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1">CLB / Phòng gym</label>
                  <input
                    type="text"
                    value={commenterGym}
                    onChange={(e) => setCommenterGym(e.target.value)}
                    placeholder="VD: Agoge MMA..."
                    className="w-full bg-card border border-border rounded-xl px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>Hiển thị:</span>
                  <span className="font-semibold text-foreground">{commenterName}</span>
                  <BeltBadge belt={commenterBelt} size="sm" />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!commentContent.trim() || isSubmittingComment}
                  className="flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmittingComment ? 'Đang gửi...' : 'Gửi phản hồi'}</span>
                </Button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4 pt-2">
              {comments.length > 0 ? (
                comments.map((cmt) => {
                  const isUpvoted = !!upvotedComments[cmt.id]
                  return (
                    <div
                      key={cmt.id}
                      className="p-4 rounded-2xl bg-card border border-border/80 hover:border-border transition-colors space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={cmt.author.avatar}
                            alt={cmt.author.name}
                            className="w-8 h-8 rounded-full object-cover border border-border"
                            onError={(e) => {
                              e.currentTarget.src =
                                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                            }}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-foreground">
                                {cmt.author.name}
                              </span>
                              <BeltBadge belt={cmt.author.beltLevel} size="sm" />
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-muted">
                              <span>{formatDateVi(cmt.createdAt)}</span>
                              {cmt.author.gym && <span>• {cmt.author.gym}</span>}
                            </div>
                          </div>
                        </div>

                        {/* Comment Upvote Button */}
                        <button
                          onClick={() => handleCommentUpvote(cmt.id)}
                          className={cn(
                            'inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer',
                            isUpvoted
                              ? 'bg-primary/20 border-primary text-primary'
                              : 'bg-background/80 border-border text-muted hover:text-foreground hover:border-border-hover'
                          )}
                          title="Hữu ích"
                        >
                          <ArrowBigUp
                            className={cn('w-4 h-4', isUpvoted && 'fill-primary text-primary')}
                          />
                          <span>{cmt.upvotes}</span>
                        </button>
                      </div>

                      {/* Comment Body */}
                      <p className="text-sm text-foreground/90 leading-relaxed pl-10 sm:pl-10.5 whitespace-pre-line">
                        {cmt.content}
                      </p>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-8 text-muted text-sm bg-background/30 rounded-2xl border border-dashed border-border">
                  Chưa có bình luận nào cho bài viết này. Hãy là người đầu tiên đưa ra góc nhìn của bạn!
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Author Bio Card */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <Award className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">
                Hồ sơ tác giả
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-border"
              />
              <div>
                <h4 className="font-bold text-foreground text-base">{post.author.name}</h4>
                <div className="mt-1">
                  <BeltBadge belt={post.author.beltLevel} size="sm" />
                </div>
              </div>
            </div>
            {post.author.gym && (
              <p className="text-xs text-muted flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Sinh hoạt tại: <strong className="text-foreground">{post.author.gym}</strong></span>
              </p>
            )}
            <p className="text-xs text-muted leading-relaxed">
              Thành viên tích cực chia sẻ kiến thức trên cộng đồng MMAVN Hub.
            </p>
          </div>

          {/* Related Discussions in Category */}
          {relatedPosts.length > 0 && (
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                <categoryInfo.icon className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">
                  Chủ đề cùng chuyên mục
                </h3>
              </div>
              <div className="space-y-3">
                {relatedPosts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/dien-dan/${item.id}`}
                    className="group block p-3 rounded-xl bg-card-hover/40 hover:bg-card-hover border border-border/60 hover:border-border transition-all"
                  >
                    <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-muted mt-2">
                      <div className="flex items-center gap-1.5">
                        <span>{item.author.name}</span>
                        <BeltBadge belt={item.author.beltLevel} size="sm" />
                      </div>
                      <span>{item.repliesCount} thảo luận</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Guidelines */}
          <div className="bg-card/60 border border-border rounded-2xl p-5 space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-muted flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              Lưu ý khi thảo luận
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Mọi ý kiến đóng góp xin giữ thái độ hòa nhã, phản biện mang tính xây dựng kỹ thuật võ học. Không công kích cá nhân hay xúc phạm lò võ khác.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
