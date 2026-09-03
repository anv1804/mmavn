'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Plus,
  Flame,
  Shield,
  Dumbbell,
  ShoppingBag,
  Layers,
  Sparkles,
  TrendingUp,
  Clock,
  ThumbsUp,
  Tag,
  X,
  Filter,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react'
import type { ForumPost, ForumCategory } from '@/types'
import { ForumPostCard } from '@/components/forum/ForumPostCard'
import { CreatePostModal } from '@/components/forum/CreatePostModal'
import { SearchInput } from '@/components/ui/SearchInput'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface ForumClientProps {
  initialPosts: ForumPost[]
  categoryCounts: Record<string, number>
  trendingTags: { name: string; count: number }[]
  hotDiscussions: ForumPost[]
}

type SortOption = 'latest' | 'trending' | 'top'

const CATEGORY_TABS: {
  id: ForumCategory | 'all'
  label: string
  icon: typeof Shield
  color: string
}[] = [
  { id: 'all', label: 'Tất cả', icon: Layers, color: 'text-foreground' },
  { id: 'ky-thuat', label: 'Kỹ thuật & Chiến thuật', icon: Shield, color: 'text-blue-400' },
  { id: 'soi-keo', label: 'Bàn luận & Soi kèo', icon: Flame, color: 'text-amber-400' },
  { id: 'phong-tap', label: 'Góc phòng gym', icon: Dumbbell, color: 'text-emerald-400' },
  { id: 'cho-do', label: 'Chợ đồ tập', icon: ShoppingBag, color: 'text-purple-400' },
]

export function ForumClient({
  initialPosts,
  categoryCounts: initialCounts,
  trendingTags,
  hotDiscussions,
}: ForumClientProps) {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts)
  const [activeCategory, setActiveCategory] = useState<ForumCategory | 'all'>('all')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [categoryCounts, setCategoryCounts] = useState(initialCounts)

  // Handle new post created
  const handlePostCreated = (newPost: ForumPost) => {
    setPosts((prev) => [newPost, ...prev])
    setCategoryCounts((prev) => ({
      ...prev,
      all: (prev.all || 0) + 1,
      [newPost.category]: (prev[newPost.category] || 0) + 1,
    }))
    // Switch to category of new post
    setActiveCategory(newPost.category)
  }

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = [...posts]

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory)
    }

    // Tag filter
    if (activeTag) {
      const normalized = activeTag.toLowerCase()
      result = result.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === normalized)
      )
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.author.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    // Sorting
    if (sortBy === 'top') {
      result.sort((a, b) => b.upvotes - a.upvotes)
    } else if (sortBy === 'trending') {
      result.sort(
        (a, b) => b.upvotes + b.repliesCount * 2 - (a.upvotes + a.repliesCount * 2)
      )
    } else {
      // latest (pinned first)
      result.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1
        if (!a.pinned && b.pinned) return 1
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
    }

    return result
  }, [posts, activeCategory, activeTag, searchQuery, sortBy])

  return (
    <div className="space-y-8">
      {/* Category Navigation Bar */}
      <div className="border-b border-border pb-2">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeCategory === tab.id
            const count = categoryCounts[tab.id] ?? 0

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id)
                  setActiveTag(null) // reset active tag on category change
                }}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer border',
                  isActive
                    ? 'bg-primary/15 text-primary border-primary/40 shadow-sm shadow-primary/10'
                    : 'bg-card border-border text-muted hover:text-foreground hover:bg-card-hover hover:border-border-hover'
                )}
              >
                <Icon className={cn('w-4 h-4', tab.color)} />
                <span>{tab.label}</span>
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full font-bold',
                    isActive ? 'bg-primary text-white' : 'bg-background/80 text-muted'
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Grid: Feed (Left) + Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Filter Bar + Posts Feed */}
        <div className="lg:col-span-8 space-y-6">
          {/* Controls Bar: Search & Sort */}
          <div className="bg-card border border-border rounded-2xl p-3 sm:p-4 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Tìm chủ đề, đòn thế, tác giả, hashtag..."
              />
            </div>

            {/* Sort Filter Tabs */}
            <div className="flex items-center gap-1 bg-background/60 p-1 rounded-xl border border-border shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setSortBy('latest')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer',
                  sortBy === 'latest'
                    ? 'bg-card text-foreground shadow-xs font-semibold'
                    : 'text-muted hover:text-foreground'
                )}
              >
                <Clock className="w-3.5 h-3.5" />
                Mới nhất
              </button>
              <button
                onClick={() => setSortBy('trending')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer',
                  sortBy === 'trending'
                    ? 'bg-card text-primary shadow-xs font-semibold'
                    : 'text-muted hover:text-foreground'
                )}
              >
                <Flame className="w-3.5 h-3.5" />
                Nổi bật
              </button>
              <button
                onClick={() => setSortBy('top')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer',
                  sortBy === 'top'
                    ? 'bg-card text-accent shadow-xs font-semibold'
                    : 'text-muted hover:text-foreground'
                )}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                Nhiều upvote
              </button>
            </div>
          </div>

          {/* Active Tag Filter Indicator */}
          {activeTag && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-primary/10 border border-primary/20 text-sm">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                <span className="text-muted">Đang lọc theo hashtag:</span>
                <span className="font-semibold text-primary">#{activeTag}</span>
              </div>
              <button
                onClick={() => setActiveTag(null)}
                className="inline-flex items-center gap-1 text-xs text-muted hover:text-foreground px-2 py-1 rounded-lg bg-card border border-border transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Xóa lọc
              </button>
            </div>
          )}

          {/* Posts List */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <ForumPostCard
                  key={post.id}
                  post={post}
                  onTagClick={(tag) => setActiveTag(tag)}
                  onUpvote={() => {
                    // Update locally
                    setPosts((prev) =>
                      prev.map((p) =>
                        p.id === post.id ? { ...p, upvotes: p.upvotes + 1 } : p
                      )
                    )
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-8">
              <EmptyState
                icon={<Layers className="w-12 h-12" />}
                title="Không tìm thấy bài thảo luận nào"
                description={
                  searchQuery || activeTag
                    ? 'Thử thay đổi từ khóa tìm kiếm hoặc bỏ chọn hashtag để xem thêm bài viết.'
                    : 'Chuyên mục này hiện chưa có bài viết nào. Hãy là người đầu tiên mở màn cuộc thảo luận!'
                }
              />
              <div className="text-center mt-4">
                <Button
                  variant="primary"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Đăng bài ngay
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Create Post Action Button */}
          <div className="bg-gradient-to-br from-primary/20 via-card to-card border border-primary/30 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-base">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>Cộng đồng võ thuật MMA</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Bạn có thắc mắc kỹ thuật, kèo đấu cần mổ xẻ hay đồ tập cần pass?
            </p>
            <Button
              variant="primary"
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/20"
            >
              <Plus className="w-5 h-5" />
              <span className="font-semibold">Tạo bài viết mới</span>
            </Button>
          </div>

          {/* Hot / Trending Discussions Widget */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <TrendingUp className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">
                Chủ đề nóng trong tuần
              </h3>
            </div>
            <div className="space-y-3">
              {hotDiscussions.map((topic, idx) => (
                <Link
                  key={topic.id}
                  href={`/dien-dan/${topic.id}`}
                  className="group block p-2.5 rounded-xl hover:bg-card-hover border border-transparent hover:border-border transition-all"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-md bg-accent/15 text-accent text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {topic.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-muted">
                        <span>{topic.upvotes} upvotes</span>
                        <span>•</span>
                        <span>{topic.repliesCount} thảo luận</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Tags Cloud */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <Tag className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">
                Hashtag phổ biến
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTag(item.name)}
                  className={cn(
                    'text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5',
                    activeTag === item.name
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-card-hover/80 text-muted hover:text-foreground border-border/80 hover:border-border-hover'
                  )}
                >
                  <span>#{item.name}</span>
                  <span className="text-[10px] opacity-70 bg-background/50 px-1.5 py-0.2 rounded-full">
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Community Code of Conduct / Martial Arts spirit */}
          <div className="bg-card/60 border border-border/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <ShieldAlert className="w-4 h-4 text-accent" />
              <span>Quy tắc ứng xử MMAVN</span>
            </div>
            <ul className="text-xs text-muted space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                <span>Tôn trọng võ đạo, chia sẻ kiến thức trung thực và văn minh.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                <span>An toàn là số 1 khi giao lưu sparring và tìm bạn tập.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                <span>Chợ đồ tập: Minh bạch xuất xứ, không bán hàng giả, hàng nhái.</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Modal create post */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handlePostCreated}
        defaultCategory={activeCategory}
      />
    </div>
  )
}
