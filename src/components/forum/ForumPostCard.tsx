'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MessageSquare, ArrowBigUp, Pin, Sparkles, Clock, MapPin } from 'lucide-react'
import type { ForumPost, ForumCategory } from '@/types'
import { BeltBadge } from './BeltBadge'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

interface ForumPostCardProps {
  post: ForumPost
  onTagClick?: (tag: string) => void
  onUpvote?: (postId: string) => void
}

const CATEGORY_MAP: Record<
  ForumCategory,
  { label: string; badgeClass: string }
> = {
  'ky-thuat': {
    label: 'Kỹ thuật & Chiến thuật',
    badgeClass: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
  },
  'soi-keo': {
    label: 'Bàn luận & Soi kèo',
    badgeClass: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  },
  'phong-tap': {
    label: 'Góc phòng gym',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  },
  'cho-do': {
    label: 'Chợ đồ tập',
    badgeClass: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
  },
}

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
    })
  } catch {
    return dateString
  }
}

export function ForumPostCard({ post, onTagClick, onUpvote }: ForumPostCardProps) {
  const [upvoted, setUpvoted] = useState(false)
  const [upvotes, setUpvotes] = useState(post.upvotes)
  const categoryInfo = CATEGORY_MAP[post.category] || {
    label: post.category,
    badgeClass: 'bg-slate-800 text-slate-300',
  }

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (upvoted) return
    setUpvoted(true)
    setUpvotes((prev) => prev + 1)
    if (onUpvote) {
      onUpvote(post.id)
    }
    // Fire API call asynchronously
    fetch(`/api/forum/${post.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'upvote' }),
    }).catch((err) => console.error('Error upvoting post:', err))
  }

  return (
    <article className="group relative bg-card border border-border hover:border-border-hover rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Upvote Button (Left Column on Desktop & Mobile) */}
        <div className="flex flex-col items-center shrink-0">
          <button
            onClick={handleUpvote}
            className={cn(
              'flex flex-col items-center justify-center w-11 h-14 rounded-xl border transition-all duration-200 cursor-pointer',
              upvoted
                ? 'bg-primary/15 border-primary text-primary shadow-sm shadow-primary/20 scale-105'
                : 'bg-background/80 border-border text-muted hover:text-foreground hover:border-border-hover hover:bg-card-hover'
            )}
            title={upvoted ? 'Đã upvote' : 'Upvote bài viết'}
          >
            <ArrowBigUp
              className={cn(
                'w-6 h-6 transition-transform',
                upvoted && 'fill-primary text-primary scale-110'
              )}
            />
            <span className="text-xs font-bold -mt-1">{upvotes}</span>
          </button>
        </div>

        {/* Post Content Details */}
        <div className="flex-1 min-w-0">
          {/* Header row: category, pinned tag, timestamp */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {post.pinned && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-accent bg-accent/15 border border-accent/30 px-2 py-0.5 rounded-md">
                <Pin className="w-3 h-3" />
                Ghim
              </span>
            )}
            <span className={cn('text-xs font-medium px-2.5 py-0.5 rounded-full', categoryInfo.badgeClass)}>
              {categoryInfo.label}
            </span>
            <span className="text-xs text-muted flex items-center gap-1 ml-auto">
              <Clock className="w-3.5 h-3.5" />
              {formatDateVi(post.createdAt)}
            </span>
          </div>

          {/* Post Title */}
          <Link href={`/dien-dan/${post.id}`} className="block group-hover:text-primary transition-colors">
            <h2 className="text-base sm:text-lg font-bold text-foreground leading-snug line-clamp-2">
              {post.title}
            </h2>
          </Link>

          {/* Content Excerpt */}
          <p className="mt-1.5 text-sm text-muted line-clamp-2 leading-relaxed">
            {post.content.replace(/[#*`_]/g, '')}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {post.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onTagClick?.(tag)
                  }}
                  className="text-xs px-2 py-0.5 rounded-md bg-card-hover/80 text-muted hover:text-foreground hover:bg-card-hover border border-border/50 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {/* Footer: Author & Stats */}
          <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Author info */}
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt={post.author.name}
                className="w-6 h-6 rounded-full object-cover border border-border"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                }}
              />
              <span className="font-medium text-foreground">{post.author.name}</span>
              <BeltBadge belt={post.author.beltLevel} size="sm" />
              {post.author.gym && (
                <span className="hidden md:inline-flex items-center gap-1 text-muted text-[11px]">
                  <MapPin className="w-3 h-3 text-muted/70" />
                  {post.author.gym}
                </span>
              )}
            </div>

            {/* Replies link */}
            <Link
              href={`/dien-dan/${post.id}`}
              className="inline-flex items-center gap-1.5 text-muted hover:text-foreground font-medium transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-muted/80" />
              <span>{post.repliesCount} thảo luận</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
