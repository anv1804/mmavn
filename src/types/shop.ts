export type ProductCategory = 
  | 'all'
  | 'gloves'         // Găng thi đấu & tập luyện
  | 'apparel'        // Quần áo thi đấu, Rashguard, Hoodie
  | 'protection'     // Giáp chân, Nón, Bảo hộ hàm
  | 'equipment'      // Bao cát, Dây nhảy, Đích đấm/đá
  | 'merchandise'    // Phụ kiện, Bình nước, Băng quấn tay

export interface Product {
  id: string
  name: string
  slug: string
  category: ProductCategory
  categoryName: string
  brand: 'Fairtex' | 'Venum' | 'Twins Special' | 'LION Gear' | 'MMAVN Official' | 'Shock Doctor'
  price: number // VND
  originalPrice?: number // VND
  rating: number // 1 - 5
  reviewCount: number
  image: string
  gallery?: string[]
  isFeatured?: boolean
  isBestSeller?: boolean
  isNewArrival?: boolean
  badge?: string
  description: string
  specs: { label: string; value: string }[]
  inStock: boolean
  sizes?: string[]
  colors?: { name: string; hex: string }[]
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export interface CheckoutFormData {
  fullName: string
  phone: string
  address: string
  city: string
  paymentMethod: 'cod' | 'banking' | 'vnpay'
  note?: string
}
