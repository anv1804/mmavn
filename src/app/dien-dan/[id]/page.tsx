import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import {
  getPostById,
  getCommentsByPostId,
  getPostsByCategory,
} from '@/lib/services/forum-service'
import { ForumDetailClient } from './ForumDetailClient'

interface ForumDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: ForumDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const post = getPostById(id)

  if (!post) {
    return {
      title: 'Không tìm thấy bài viết | MMAVN Hub',
      description: 'Bài thảo luận không tồn tại hoặc đã bị xóa.',
    }
  }

  return {
    title: `${post.title} | Diễn đàn MMAVN`,
    description: post.content.substring(0, 160).replace(/[#*`_]/g, ''),
  }
}

export default async function ForumDetailPage({ params }: ForumDetailPageProps) {
  const { id } = await params
  const post = getPostById(id)

  if (!post) {
    notFound()
  }

  const comments = getCommentsByPostId(id)
  const relatedPosts = getPostsByCategory(post.category)
    .filter((p) => p.id !== post.id)
    .slice(0, 4)

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <ForumDetailClient
        post={post}
        initialComments={comments}
        relatedPosts={relatedPosts}
      />
    </div>
  )
}
