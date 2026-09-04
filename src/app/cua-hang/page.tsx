import { Metadata } from 'next'
import { mockProducts } from '@/data/mock-products'
import { ShopClient } from './ShopClient'

export const metadata: Metadata = {
  title: 'Cửa hàng Trang bị Võ thuật & MMA Chính Hãng | MMAVN Hub Pro Shop',
  description:
    'Sàn mua bán trang bị MMA chính hãng: Găng thi đấu LION Championship, Fairtex, Venum, đồ bảo hộ ống đồng, bảo hộ hàm, quần áo thi đấu và phụ kiện võ thuật chuyên nghiệp.',
}

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 sm:py-8 space-y-6 sm:space-y-8">
      <ShopClient initialProducts={mockProducts} />
    </div>
  )
}
