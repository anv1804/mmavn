import { NextRequest, NextResponse } from 'next/server'
import {
  getPosts,
  addPost,
  getCategoryCounts,
  getTrendingTags,
  type ForumCategory,
} from '@/lib/services/forum-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const category = searchParams.get('category') || undefined
    const tag = searchParams.get('tag') || undefined
    const search = searchParams.get('search') || undefined
    const sort = (searchParams.get('sort') as 'latest' | 'trending' | 'top') || 'latest'

    const posts = getPosts({ category, tag, search, sort })
    const counts = getCategoryCounts()
    const trendingTags = getTrendingTags()

    return NextResponse.json({
      data: posts,
      total: posts.length,
      categoryCounts: counts,
      trendingTags,
    })
  } catch (error) {
    console.error('Error fetching forum posts:', error)
    return NextResponse.json(
      { error: 'Không thể tải danh sách bài viết' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, category, tags, author } = body

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json(
        { error: 'Tiêu đề bài viết không được để trống' },
        { status: 400 }
      )
    }

    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json(
        { error: 'Nội dung bài viết không được để trống' },
        { status: 400 }
      )
    }

    const validCategories: ForumCategory[] = ['ky-thuat', 'soi-keo', 'phong-tap', 'cho-do']
    if (!category || !validCategories.includes(category as ForumCategory)) {
      return NextResponse.json(
        { error: 'Chuyên mục bài viết không hợp lệ' },
        { status: 400 }
      )
    }

    const newPost = addPost({
      title,
      content,
      category: category as ForumCategory,
      tags: Array.isArray(tags) ? tags : [],
      author,
    })

    return NextResponse.json(
      {
        message: 'Tạo bài viết thành công',
        data: newPost,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating forum post:', error)
    return NextResponse.json(
      { error: 'Lỗi khi tạo bài viết mới' },
      { status: 500 }
    )
  }
}
