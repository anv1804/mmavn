import { NextRequest, NextResponse } from 'next/server'
import { getPromotionWithDetails } from '@/lib/services/promotion-service'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const promotion = getPromotionWithDetails(id)

  if (!promotion) {
    return NextResponse.json(
      { error: 'Promotion not found', message: `Không tìm thấy thông tin giải đấu với mã: ${id}` },
      { status: 404 }
    )
  }

  return NextResponse.json({ data: promotion })
}
