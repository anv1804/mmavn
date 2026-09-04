import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPromotionWithDetails, getAllPromotions } from '@/lib/services/promotion-service'
import { PromotionDetailClient } from './PromotionDetailClient'

export async function generateStaticParams() {
  const promotions = getAllPromotions()
  const params: { id: string }[] = []

  for (const p of promotions) {
    params.push({ id: p.id })
    if (p.slug) {
      params.push({ id: p.slug })
    }
  }

  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const promotion = getPromotionWithDetails(id)

  if (!promotion) {
    return {
      title: 'Không tìm thấy giải đấu | MMAVN Hub',
    }
  }

  return {
    title: `${promotion.name} (${promotion.shortName}) - ${promotion.formatType} | MMAVN Hub`,
    description: promotion.formatDescription || promotion.description,
  }
}

export default async function PromotionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const promotion = getPromotionWithDetails(id)

  if (!promotion) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 sm:py-8">
      <PromotionDetailClient promotion={promotion} />
    </div>
  )
}
