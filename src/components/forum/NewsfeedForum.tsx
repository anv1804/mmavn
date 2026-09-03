'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Heart,
  MessageCircle,
  Share2,
  Flag,
  Send,
  Image as ImageIcon,
  Hash,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Flame,
  Clock,
  TrendingUp,
  X,
  MoreHorizontal,
  ChevronRight,
  Filter,
  Layers,
  Award,
  Swords
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { User } from '@/types/admin'
import { getCurrentUser } from '@/lib/services/admin-service'

interface NewsfeedComment {
  id: string
  authorName: string
  authorAvatar: string
  authorRole?: string
  content: string
  createdAt: string
  likes: number
}

interface NewsfeedPost {
  id: string
  isOfficial?: boolean
  officialOrgName?: string
  officialOrgBadge?: string
  authorName: string
  authorAvatar: string
  authorRole: string
  title: string
  content: string
  images?: string[]
  tags: string[]
  category: 'chinh-thuc' | 'du-doan' | 'soi-keo' | 'ky-thuat' | 'giai-dau' | 'hoi-dap'
  likes: number
  isLiked?: boolean
  shares: number
  comments: NewsfeedComment[]
  createdAt: string
  pinned?: boolean
}

const INITIAL_NEWSFEED_POSTS: NewsfeedPost[] = [
  {
    id: 'nf-1',
    isOfficial: true,
    officialOrgName: 'LION Championship Ban Tổ Chức',
    officialOrgBadge: 'LION Official',
    authorName: 'BTC LION Championship',
    authorAvatar: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=120',
    authorRole: 'Ban Tổ Chức',
    pinned: true,
    title: 'CÔNG BỐ CHÍNH THỨC: Main Event Tranh Đai 70kg LION Championship 29',
    content: 'Ban tổ chức LION Championship xin trân trọng công bố trận tranh đai vô địch hạng Nhẹ (70kg) tại sự kiện LION 29 sẽ diễn ra vào ngày 20/09 tới đây tại Nhà thi đấu Quần Ngựa, Hà Nội. Đương kim vô địch Trần Quang Lộc "Quái Vật Biển" sẽ có trận bảo vệ đai lịch sử trước kẻ thách đấu số 1 Võ Thành Đạt "Cỗ Máy". Vé chính thức mở bán từ 10:00 sáng mai!',
    images: ['https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=80'],
    tags: ['LIONChampionship', 'LION29', 'TranQuangLoc', 'VoThanhDat', 'TranhDai'],
    category: 'chinh-thuc',
    likes: 428,
    shares: 89,
    createdAt: '1 giờ trước',
    comments: [
      {
        id: 'c1-1',
        authorName: 'Nguyễn Trần Duy Nhất',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
        authorRole: 'Võ sĩ Pro',
        content: 'Trận đấu này hứa hẹn sẽ là màn đôi công mãn nhãn nhất mùa giải! Chúc hai anh em cống hiến hết mình.',
        createdAt: '45 phút trước',
        likes: 64
      },
      {
        id: 'c1-2',
        authorName: 'Lê Minh Tuấn',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
        authorRole: 'Thành viên',
        content: 'Chờ đợi kèo này cả năm rồi. Vote 1 vé KO hiệp 2 cho Quang Lộc!',
        createdAt: '30 phút trước',
        likes: 19
      }
    ]
  },
  {
    id: 'nf-2',
    isOfficial: true,
    officialOrgName: 'GMA - Thần Võ Việt Nam',
    officialOrgBadge: 'GMA Official',
    authorName: 'Ban Điều Hành GMA',
    authorAvatar: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd208?w=120',
    authorRole: 'Ban Tổ Chức',
    title: 'Thông Báo Mở Đăng Ký Giải Bán Chuyên Mùa Hè 2026 - Cơ Hội Thăng Hạng Pro',
    content: 'Đấu trường GMA tiếp tục sứ mệnh ươm mầm các tài năng võ thuật đối kháng trên khắp cả nước. Chúng tôi chính thức mở cổng đăng ký cho các võ sinh thuộc hệ thống CLB trên toàn quốc. Top 4 võ sĩ xuất sắc nhất giải đấu sẽ nhận được hợp đồng thi đấu chuyên nghiệp cùng suất tập huấn tại Thái Lan!',
    images: ['https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=1000&auto=format&fit=crop&q=80'],
    tags: ['GMA', 'ThanVoVietNam', 'UomMamMMA', 'TuyenChon'],
    category: 'chinh-thuc',
    likes: 215,
    shares: 42,
    createdAt: '3 giờ trước',
    comments: [
      {
        id: 'c2-1',
        authorName: 'CLB Saigon Top Team',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        authorRole: 'CLB Võ Thuật',
        content: 'Đội mình đã đăng ký 3 bạn trẻ hạng 60kg và 65kg. Hẹn gặp các lò võ tại TP.HCM!',
        createdAt: '2 giờ trước',
        likes: 12
      }
    ]
  },
  {
    id: 'nf-3',
    authorName: 'Phạm Văn Nam',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120',
    authorRole: 'Vô Địch Hạng 56kg',
    title: 'Chia sẻ kỹ thuật: 3 bước sprawl chống takedown hiệu quả cho anh em đánh đứng',
    content: 'Khi gặp đối thủ chuyên wrestling thích luồn chân bắt single-leg hoặc double-leg, điều quan trọng nhất không phải là lùi lại mà là phản xạ Sprawl hạ trọng tâm ngay lập tức, tì ngực đè lên lưng đối phương và kiểm soát đầu. Anh em có thể xem video buổi tập chiều nay của mình tại CLB.',
    tags: ['KyThuatMMA', 'Sprawl', 'ChongVat', 'BJJ', 'PhamVanNam'],
    category: 'ky-thuat',
    likes: 310,
    shares: 56,
    createdAt: '5 giờ trước',
    comments: [
      {
        id: 'c3-1',
        authorName: 'Hoàng Anh',
        authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100',
        authorRole: 'Võ sinh',
        content: 'Cảm ơn anh Nam chia sẻ, em hay bị bắt chân lúc ra đòn đấm thẳng, bài này đúng chỗ em cần khắc phục!',
        createdAt: '4 giờ trước',
        likes: 8
      }
    ]
  },
  {
    id: 'nf-4',
    isOfficial: true,
    officialOrgName: 'V1 Championship',
    officialOrgBadge: 'V1 Grand Prix',
    authorName: 'V1 Grand Prix Organizer',
    authorAvatar: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=120',
    authorRole: 'Ban Tổ Chức',
    title: 'Lễ bốc thăm phân nhánh giải đấu Knock-out 8-Man Tournament hạng Bán Trung',
    content: 'Đại hội V1 Champion trân trọng công bố nhánh đấu loại trực tiếp 8 người. 8 võ sĩ đại diện cho các trường phái Muay Thai, Tán Thủ, Boxing và Kyokushin Karate sẽ cùng tranh tài trong 1 đêm duy nhất để tìm ra nhà vô địch tuyệt đối.',
    tags: ['V1Champion', 'GrandPrix8Man', 'KnockoutTournament'],
    category: 'chinh-thuc',
    likes: 184,
    shares: 31,
    createdAt: '8 giờ trước',
    comments: []
  }
]

const POPULAR_HASHTAGS = [
  '#LIONChampionship',
  '#TranQuangLoc',
  '#GMA',
  '#NguyenTranDuyNhat',
  '#V1Champion',
  '#DuDoanMMA',
  '#KyThuatBJJ',
  '#LION29'
]

export function NewsfeedForum() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<NewsfeedPost[]>(INITIAL_NEWSFEED_POSTS)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // New Post Form State
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostCategory, setNewPostCategory] = useState<'chinh-thuc' | 'du-doan' | 'ky-thuat' | 'giai-dau' | 'hoi-dap'>('du-doan')
  const [newPostTagInput, setNewPostTagInput] = useState('')
  const [newPostImageUrl, setNewPostImageUrl] = useState('')
  const [showImageInput, setShowImageInput] = useState(false)
  const [showTagInput, setShowTagInput] = useState(false)

  // Comment input per post
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({})
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({ 'nf-1': true })

  // Report Modal
  const [reportModalPostId, setReportModalPostId] = useState<string | null>(null)
  const [reportReason, setReportReason] = useState('Spam hoặc nội dung không phù hợp')

  useEffect(() => {
    setCurrentUser(getCurrentUser())
    const handleRoleChanged = (e: Event) => {
      const customEvent = e as CustomEvent<User>
      if (customEvent.detail) setCurrentUser(customEvent.detail)
    }
    window.addEventListener('mmavn-role-changed', handleRoleChanged)
    return () => window.removeEventListener('mmavn-role-changed', handleRoleChanged)
  }, [])

  // Create Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPostContent.trim()) return

    const isOfficialRole = currentUser?.role === 'admin' || currentUser?.role === 'editor'
    const newPost: NewsfeedPost = {
      id: `nf-${Date.now()}`,
      isOfficial: isOfficialRole && newPostCategory === 'chinh-thuc',
      officialOrgName: isOfficialRole ? 'Ban Biên Tập MMAVN' : undefined,
      officialOrgBadge: isOfficialRole ? 'Xác Minh' : undefined,
      authorName: currentUser?.name || 'Thành viên MMAVN',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      authorRole: currentUser?.role === 'admin' ? 'Quản trị viên' : currentUser?.role === 'editor' ? 'Biên tập viên' : 'Thành viên',
      title: newPostTitle.trim() || 'Thảo luận mới từ cộng đồng võ thuật',
      content: newPostContent.trim(),
      images: newPostImageUrl.trim() ? [newPostImageUrl.trim()] : undefined,
      tags: newPostTagInput ? newPostTagInput.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean) : ['MMAVN', 'ThaoLuan'],
      category: newPostCategory,
      likes: 1,
      isLiked: true,
      shares: 0,
      createdAt: 'Vừa xong',
      comments: []
    }

    setPosts([newPost, ...posts])
    setNewPostContent('')
    setNewPostTitle('')
    setNewPostImageUrl('')
    setNewPostTagInput('')
    setShowImageInput(false)
    setShowTagInput(false)
  }

  // Like Post Toggle
  const handleToggleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = !p.isLiked
        return {
          ...p,
          isLiked,
          likes: isLiked ? p.likes + 1 : p.likes - 1
        }
      }
      return p
    }))
  }

  // Add Comment
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim()
    if (!text) return

    const newComment: NewsfeedComment = {
      id: `c-${Date.now()}`,
      authorName: currentUser?.name || 'Thành viên ẩn danh',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      authorRole: currentUser?.role === 'admin' ? 'Admin' : 'Thành viên',
      content: text,
      createdAt: 'Vừa xong',
      likes: 0
    }

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        }
      }
      return p
    }))

    setCommentInputs({ ...commentInputs, [postId]: '' })
  }

  // Share action
  const handleShare = (post: NewsfeedPost) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert(`Đã sao chép liên kết bài viết: "${post.title}"`)
    }
  }

  // Submit Report
  const handleSendReport = () => {
    alert(`Đã gửi báo cáo vi phạm về Ban Quản Trị: "${reportReason}". Cảm ơn bạn đã giữ gìn cộng đồng văn minh!`)
    setReportModalPostId(null)
  }

  // Filter Posts
  const filteredPosts = posts.filter(p => {
    if (filterCategory === 'chinh-thuc' && !p.isOfficial) return false
    if (filterCategory !== 'all' && filterCategory !== 'chinh-thuc' && p.category !== filterCategory) return false
    if (selectedTag && !p.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase().replace(/^#/, ''))) return false
    return true
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* ========================================================= */}
      {/* 🧭 CỘT TRÁI (3 CỘT): BỘ LỌC CHỦ ĐỀ & HASHTAG HOT          */}
      {/* ========================================================= */}
      <aside className="lg:col-span-3 space-y-5 lg:sticky lg:top-24">
        {/* Navigation Categories */}
        <div className="rounded-2xl bg-card/50 border border-border/60 p-4 space-y-1 shadow-md">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">
            Bảng Tin & Chủ Đề
          </span>

          <button
            onClick={() => { setFilterCategory('all'); setSelectedTag(null) }}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
              filterCategory === 'all' && !selectedTag
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            )}
          >
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4" /> Tất cả bài viết
            </span>
            <span className="text-[10px] opacity-80">{posts.length}</span>
          </button>

          <button
            onClick={() => { setFilterCategory('chinh-thuc'); setSelectedTag(null) }}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
              filterCategory === 'chinh-thuc'
                ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                : "text-amber-400 hover:bg-amber-500/10"
            )}
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Tin chính thức giải đấu
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40">VIP</span>
          </button>

          <button
            onClick={() => { setFilterCategory('du-doan'); setSelectedTag(null) }}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
              filterCategory === 'du-doan'
                ? "bg-primary text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            )}
          >
            <span className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" /> Bàn luận & Dự đoán
            </span>
          </button>

          <button
            onClick={() => { setFilterCategory('ky-thuat'); setSelectedTag(null) }}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
              filterCategory === 'ky-thuat'
                ? "bg-primary text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            )}
          >
            <span className="flex items-center gap-2">
              <Swords className="w-4 h-4 text-blue-400" /> Kỹ thuật & BJJ
            </span>
          </button>
        </div>

        {/* Trending Hashtags */}
        <div className="rounded-2xl bg-card/50 border border-border/60 p-4 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-primary" /> Hashtag Thịnh Hành
            </span>
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-[10px] text-red-400 hover:underline cursor-pointer"
              >
                Bỏ lọc
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {POPULAR_HASHTAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer",
                  selectedTag === tag
                    ? "bg-primary text-white shadow-xs"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-300"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 📰 CỘT GIỮA (6 CỘT): MAIN NEWSFEED POSTS & CREATOR BOX    */}
      {/* ========================================================= */}
      <main className="lg:col-span-6 space-y-6">
        {/* 1. HỘP ĐĂNG BÀI VIẾT (SOCIAL FEED CREATOR) */}
        <div className="rounded-3xl bg-card/60 border border-border/70 p-5 shadow-xl space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-border">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Tiêu đề bài viết (tùy chọn)..."
                className="w-full bg-slate-900/60 border border-border/50 rounded-xl px-3.5 py-2 text-xs font-bold text-white placeholder-slate-500 focus:outline-none focus:border-primary"
              />
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Bạn đang quan tâm đến võ sĩ, giải đấu hay kỹ thuật nào hôm nay?..."
                rows={3}
                className="w-full bg-slate-900/60 border border-border/50 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary resize-none"
              />
            </div>
          </div>

          {/* Optional Image Input */}
          {showImageInput && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-border/60">
              <ImageIcon className="w-4 h-4 text-cyan-400" />
              <input
                type="text"
                value={newPostImageUrl}
                onChange={(e) => setNewPostImageUrl(e.target.value)}
                placeholder="Dán URL hình ảnh minh họa..."
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button onClick={() => setShowImageInput(false)} className="text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Optional Tag Input */}
          {showTagInput && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-border/60">
              <Hash className="w-4 h-4 text-amber-400" />
              <input
                type="text"
                value={newPostTagInput}
                onChange={(e) => setNewPostTagInput(e.target.value)}
                placeholder="Nhập hashtag phân cách bằng dấu phẩy (vd: LION29, TranQuangLoc)..."
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button onClick={() => setShowTagInput(false)} className="text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowImageInput(!showImageInput)}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" /> Chèn ảnh
              </button>
              <button
                type="button"
                onClick={() => setShowTagInput(!showTagInput)}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Hash className="w-3.5 h-3.5 text-amber-400" /> Gắn thẻ
              </button>
              <select
                value={newPostCategory}
                onChange={(e: any) => setNewPostCategory(e.target.value)}
                className="bg-slate-800/80 border border-slate-700 text-slate-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
              >
                <option value="du-doan">Bàn luận & Dự đoán</option>
                <option value="ky-thuat">Kỹ thuật & Võ thuật</option>
                <option value="giai-dau">Tin tức Giải đấu</option>
                {currentUser?.role === 'admin' && (
                  <option value="chinh-thuc">👑 Thông báo Chính thức</option>
                )}
              </select>
            </div>

            <button
              type="button"
              onClick={handleCreatePost}
              className="px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-primary/25 cursor-pointer active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5" /> Đăng bài
            </button>
          </div>
        </div>

        {/* Active Tag Notice */}
        {selectedTag && (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-primary/10 border border-primary/20 text-xs">
            <span>Đang hiển thị bài viết gắn thẻ: <strong className="text-primary font-mono">{selectedTag}</strong></span>
            <button onClick={() => setSelectedTag(null)} className="text-red-400 hover:underline">Xóa lọc</button>
          </div>
        )}

        {/* 2. DANH SÁCH BÀI VIẾT (NEWSFEED POSTS STREAM) */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className={cn(
                "rounded-3xl bg-card/50 border overflow-hidden shadow-lg transition-all",
                post.isOfficial ? "border-amber-500/40 bg-gradient-to-b from-amber-500/5 via-card/50 to-card/50" : "border-border/70"
              )}
            >
              {/* Post Header */}
              <div className="p-5 pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-slate-800 shrink-0 border border-border">
                      <img src={post.authorAvatar} alt={post.authorName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{post.authorName}</span>
                        {post.isOfficial && (
                          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow">
                            <ShieldCheck className="w-3 h-3" /> {post.officialOrgBadge || 'Chính thức'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span>{post.authorRole}</span>
                        <span>•</span>
                        <span>{post.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Report Button */}
                  <button
                    onClick={() => setReportModalPostId(post.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Báo cáo bài viết"
                  >
                    <Flag className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Post Title & Text */}
                <div className="mt-3.5 space-y-2">
                  {post.title && (
                    <h3 className="text-base font-bold text-white leading-snug">
                      {post.title}
                    </h3>
                  )}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Hashtags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.tags.map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedTag(`#${t}`)}
                        className="text-xs text-primary font-mono hover:underline cursor-pointer"
                      >
                        #{t}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Attached Images */}
              {post.images && post.images.length > 0 && (
                <div className="mt-1 aspect-video w-full overflow-hidden bg-black">
                  <img src={post.images[0]} alt="Attached visual" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Interactions Bar */}
              <div className="px-5 py-3 border-t border-border/40 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  {/* Like Button */}
                  <button
                    onClick={() => handleToggleLike(post.id)}
                    className={cn(
                      "flex items-center gap-1.5 font-semibold transition-colors cursor-pointer",
                      post.isLiked ? "text-rose-500" : "hover:text-white"
                    )}
                  >
                    <Heart className={cn("w-4 h-4", post.isLiked && "fill-current")} />
                    <span>{post.likes}</span>
                  </button>

                  {/* Comment Toggle */}
                  <button
                    onClick={() => setOpenComments({ ...openComments, [post.id]: !openComments[post.id] })}
                    className="flex items-center gap-1.5 hover:text-white font-semibold transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments.length} bình luận</span>
                  </button>
                </div>

                {/* Share Button */}
                <button
                  onClick={() => handleShare(post)}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Chia sẻ</span>
                </button>
              </div>

              {/* Comments Section */}
              {openComments[post.id] && (
                <div className="px-5 py-4 bg-slate-900/50 border-t border-border/40 space-y-3">
                  {/* List comments */}
                  {post.comments.length > 0 && (
                    <div className="space-y-3 mb-3">
                      {post.comments.map(c => (
                        <div key={c.id} className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-border mt-0.5">
                            <img src={c.authorAvatar} alt={c.authorName} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 rounded-2xl bg-card/60 p-3 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">{c.authorName}</span>
                              <span className="text-[10px] text-slate-400">{c.createdAt}</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">{c.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Input new comment */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      placeholder="Viết bình luận của bạn..."
                      className="flex-1 bg-slate-900 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="p-2 rounded-xl bg-primary hover:bg-primary/90 text-white cursor-pointer transition-colors"
                      title="Gửi bình luận"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </main>

      {/* ========================================================= */}
      {/* 🏆 CỘT PHẢI (3 CỘT): SỰ KIỆN TÂM ĐIỂM & BXH THÀNH VIÊN    */}
      {/* ========================================================= */}
      <aside className="lg:col-span-3 space-y-5 lg:sticky lg:top-24">
        {/* Spotlight Event Card */}
        <div className="rounded-2xl bg-gradient-to-br from-red-600/15 via-card to-card border border-red-500/30 p-5 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4" /> Sự kiện tâm điểm
          </div>
          <h4 className="text-sm font-bold text-white leading-snug">
            LION Championship 29: Đêm Quyết Đấu Vô Địch
          </h4>
          <p className="text-xs text-slate-300">
            Trần Quang Lộc vs Võ Thành Đạt • Hà Nội
          </p>
          <Link
            href="/du-doan"
            className="w-full py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-600/20 transition-all"
          >
            <Flame className="w-3.5 h-3.5" /> Dự đoán kết quả trận
          </Link>
        </div>

        {/* Top Contributors */}
        <div className="rounded-2xl bg-card/50 border border-border/60 p-4 space-y-3 shadow-md">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Thành Viên Nổi Bật
          </span>
          <div className="space-y-2.5">
            {[
              { name: 'Trần Quang Lộc', role: 'Vô địch 70kg', posts: '24 bài', avatar: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=100' },
              { name: 'Nguyễn Trần Duy Nhất', role: 'Võ sĩ Muay Thai', posts: '18 bài', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
              { name: 'Phạm Văn Nam', role: 'Vô địch 56kg', posts: '15 bài', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' }
            ].map(user => (
              <div key={user.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <strong className="text-white block font-bold">{user.name}</strong>
                    <span className="text-[10px] text-amber-400">{user.role}</span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{user.posts}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Community Rules */}
        <div className="rounded-2xl bg-card/40 border border-border/40 p-4 text-[11px] text-slate-400 space-y-1.5">
          <strong className="text-white block mb-1">Nội quy cộng đồng MMAVN:</strong>
          <p>• Tôn trọng võ đạo và tinh thần thể thao thượng võ.</p>
          <p>• Không spam link cá độ bất hợp pháp hoặc xúc phạm võ sĩ.</p>
          <p>• Cùng nhau chia sẻ kiến thức và xây dựng MMA Việt Nam phát triển.</p>
        </div>
      </aside>

      {/* Report Modal */}
      {reportModalPostId && (
        <div
          onClick={() => setReportModalPostId(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full bg-[#0e1322] border border-[#1e2740] rounded-3xl p-6 shadow-2xl cursor-default space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flag className="w-4 h-4 text-rose-500" /> Báo Cáo Vi Phạm
              </h3>
              <button onClick={() => setReportModalPostId(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Vui lòng chọn lý do báo cáo bài viết này để Ban Quản Trị xem xét xử lý:
            </p>

            <div className="space-y-2">
              {[
                'Spam quảng cáo hoặc link độc hại',
                'Ngôn từ xúc phạm, khiêu khích võ sĩ',
                'Thông tin sai lệch về kết quả trận đấu',
                'Nội dung không phù hợp chuẩn mực võ đạo'
              ].map(reason => (
                <label
                  key={reason}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white cursor-pointer"
                >
                  <input
                    type="radio"
                    name="reportReason"
                    value={reason}
                    checked={reportReason === reason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="accent-primary"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setReportModalPostId(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Hủy
              </button>
              <button
                onClick={handleSendReport}
                className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Gửi báo cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
