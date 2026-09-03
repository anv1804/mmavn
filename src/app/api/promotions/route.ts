import { NextRequest, NextResponse } from 'next/server'
import { getAllPromotionsWithDetails } from '@/lib/services/promotion-service'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type')
  const format = searchParams.get('format')

  let promotions = getAllPromotionsWithDetails()

  if (type) {
    promotions = promotions.filter(p => p.type.toLowerCase() === type.toLowerCase())
  }

  if (format) {
    promotions = promotions.filter(p => 
      p.formatType?.toLowerCase().replace(/\s+/g, '-') === format.toLowerCase()
    )
  }

  return NextResponse.json({
    data: promotions,
    total: promotions.length
  })
}
