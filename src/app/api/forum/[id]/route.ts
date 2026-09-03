import { NextRequest, NextResponse } from 'next/server'
import {
  getPostById,
  getCommentsByPostId,
  addComment,
  upvotePost,
  upvoteComment,
} from '@/lib/services/forum-service'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const post = getPostById(id)

    if (!post) {
      return NextResponse.json(
        { error: 'Không tìm thấy bài viết' },
        { status: 404 }
      )
    }

    const comments = getCommentsByPostId(id)

    return NextResponse.json({
      data: {
        ...post,
        comments,
      },
    })
  } catch (error) {
    console.error('Error fetching post details:', error)
    return NextResponse.json(
      { error: 'Lỗi khi tải chi tiết bài viết' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const post = getPostById(id)

    if (!post) {
      return NextResponse.json(
        { error: 'Không tìm thấy bài viết' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { action, content, author, commentId } = body

    // Handle upvoting
    if (action === 'upvote') {
      const result = upvotePost(id)
      return NextResponse.json({
        message: 'Đã upvote bài viết',
        data: result,
      })
    }

    if (action === 'upvote-comment' && commentId) {
      const result = upvoteComment(commentId)
      return NextResponse.json({
        message: 'Đã upvote bình luận',
        data: result,
      })
    }

    // Otherwise handle adding a comment
    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json(
        { error: 'Nội dung bình luận không được để trống' },
        { status: 400 }
      )
    }

    const comment = addComment({
      postId: id,
      content,
      author,
    })

    return NextResponse.json(
      {
        message: 'Đã đăng bình luận thành công',
        data: comment,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding comment/upvoting:', error)
    return NextResponse.json(
      { error: 'Lỗi khi xử lý yêu cầu' },
      { status: 500 }
    )
  }
}
