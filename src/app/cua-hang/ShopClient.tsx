'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  ShoppingBag, Search, Filter, Star, ShieldCheck, Truck, RefreshCw, 
  Check, X, Plus, Minus, Trash2, ArrowRight, Flame, Award, Sparkles, 
  Phone, MapPin, CheckCircle2, ChevronRight, CreditCard 
} from 'lucide-react'
import { Product, ProductCategory, CartItem, CheckoutFormData } from '@/types/shop'
import { cn } from '@/lib/utils'

interface ShopClientProps {
  initialProducts: Product[]
}

const CATEGORIES: { id: ProductCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'Tất cả trang bị', icon: '🥊' },
  { id: 'gloves', label: 'Găng đấu & Luyện tập', icon: '🧤' },
  { id: 'apparel', label: 'Quần áo & Rashguard', icon: '🩳' },
  { id: 'protection', label: 'Đồ bảo hộ', icon: '🛡️' },
  { id: 'equipment', label: 'Dụng cụ tập luyện', icon: '🎯' },
  { id: 'merchandise', label: 'Phụ kiện & Merch', icon: '🎒' },
]

const BRANDS = ['Tất cả', 'LION Gear', 'Fairtex', 'Twins Special', 'Venum', 'MMAVN Official', 'Shock Doctor']

function formatVND(amount: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
}

export function ShopClient({ initialProducts }: ShopClientProps) {
  const [products] = useState<Product[]>(initialProducts)
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all')
  const [selectedBrand, setSelectedBrand] = useState('Tất cả')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'bestseller' | 'price-asc' | 'price-desc' | 'rating'>('bestseller')

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Product detail modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [detailSize, setDetailSize] = useState<string>('')
  const [detailColor, setDetailColor] = useState<string>('')

  // Checkout modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    address: '',
    city: 'Hà Nội',
    paymentMethod: 'cod',
    note: ''
  })

  // Trigger brief toast
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
        const matchesBrand = selectedBrand === 'Tất cả' || p.brand === selectedBrand
        const matchesSearch = 
          !searchQuery || 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesBrand && matchesSearch
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)
      })
  }, [products, selectedCategory, selectedBrand, searchQuery, sortBy])

  // Cart operations
  const addToCart = (product: Product, size?: string, color?: string) => {
    const chosenSize = size || product.sizes?.[0]
    const chosenColor = color || product.colors?.[0]?.name

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === chosenSize && item.selectedColor === chosenColor
      )
      if (existingIdx > -1) {
        const updated = [...prev]
        updated[existingIdx].quantity += 1
        return updated
      } else {
        return [...prev, { product, quantity: 1, selectedSize: chosenSize, selectedColor: chosenColor }]
      }
    })
    showToast('Đã thêm sản phẩm vào giỏ hàng!')
  }

  const updateQuantity = (idx: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev]
      const newQty = updated[idx].quantity + delta
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== idx)
      }
      updated[idx].quantity = newQty
      return updated
    })
  }

  const removeFromCart = (idx: number) => {
    setCart((prev) => prev.filter((_, i) => i !== idx))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng!')
      return
    }
    const orderCode = 'MMAVN-' + Math.floor(100000 + Math.random() * 900000)
    setCheckoutSuccess(orderCode)
    setCart([])
  }
  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-24 right-4 z-40 p-3.5 rounded-full bg-gradient-to-tr from-primary to-red-600 text-white shadow-2xl shadow-red-600/40 border border-white/20 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center group"
        title="Xem giỏ hàng"
      >
        <ShoppingBag className="w-6 h-6 group-hover:animate-bounce" />
        {cartItemsCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-400 text-black font-black text-xs flex items-center justify-center border-2 border-background shadow-md">
            {cartItemsCount}
          </span>
        )}
      </button>

      {/* Hero Promo Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0d1222] via-[#151c33] to-[#0a0d18] border border-border/80 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>MMAVN Official Combat Store • 100% Chính Hãng</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Sàn Đồ Đấu &amp; Trang Bị <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-500">MMA Chuyên Nghiệp</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Phân phối độc quyền găng thi đấu lồng bát giác <strong>LION Championship</strong>, trang bị Muay Thai <strong>Fairtex, Twins Special</strong>, băng quấn tay, quần áo nén cơ Rashguard và dụng cụ bảo hộ chuẩn thi đấu quốc tế.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-border/50 text-slate-200">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Freeship toàn quốc đơn từ 500k</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-border/50 text-slate-200">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Cam kết da bò thật 100%</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-border/50 text-slate-200">
                <RefreshCw className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Đổi size miễn phí trong 7 ngày</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-card/60 border border-border/60 text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mã ưu đãi độc quyền</span>
            <div className="px-5 py-3 rounded-xl bg-red-600/20 border border-red-500/40 text-red-300 font-mono font-black text-xl tracking-widest">
              MMAVN10
            </div>
            <p className="text-[11px] text-slate-400">
              Giảm ngay 10% cho đơn hàng đầu tiên của thành viên cộng đồng MMAVN Hub.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer border",
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                  : "bg-card/70 hover:bg-card text-slate-300 border-border/60 hover:text-white"
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-card/40 border border-border/60">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm tên trang bị, hãng, mã sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-background border border-border/80 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-primary"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-3 py-2 rounded-xl bg-background border border-border/80 text-xs text-slate-300 focus:outline-none focus:border-primary"
            >
              {BRANDS.map((b) => (
                <option key={b} value={b}>{b === 'Tất cả' ? 'Tất cả thương hiệu' : b}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-background border border-border/80 text-xs text-slate-300 focus:outline-none focus:border-primary"
            >
              <option value="bestseller">Bán chạy nhất</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-bold flex items-center gap-1.5 transition-all ml-auto cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Giỏ hàng ({cartItemsCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-card/40 border border-border/60 space-y-3">
          <span className="text-4xl">🥊</span>
          <h3 className="text-base font-bold text-white">Không tìm thấy sản phẩm phù hợp</h3>
          <p className="text-xs text-slate-400">Hãy thử đổi từ khóa tìm kiếm hoặc chọn danh mục khác.</p>
          <button
            onClick={() => {
              setSelectedCategory('all')
              setSelectedBrand('Tất cả')
              setSearchQuery('')
            }}
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold mt-2 cursor-pointer"
          >
            Xem tất cả sản phẩm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => {
            const discountPct = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : null

            return (
              <div
                key={product.id}
                className="group rounded-2xl overflow-hidden bg-card/60 border border-border/70 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/20 flex flex-col justify-between"
              >
                <div>
                  <div 
                    onClick={() => {
                      setSelectedProduct(product)
                      setDetailSize(product.sizes?.[0] || '')
                      setDetailColor(product.colors?.[0]?.name || '')
                    }}
                    className="relative h-56 w-full overflow-hidden bg-black/60 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-60" />

                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      {product.badge && (
                        <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                          {product.badge}
                        </span>
                      )}
                      {discountPct && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-400 text-black text-[10px] font-black font-mono shadow-md">
                          -{discountPct}%
                        </span>
                      )}
                    </div>

                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-bold text-slate-300">
                      {product.brand}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{product.categoryName}</span>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-bold text-white font-mono">{product.rating.toFixed(1)}</span>
                        <span>({product.reviewCount})</span>
                      </div>
                    </div>

                    <h4 
                      onClick={() => {
                        setSelectedProduct(product)
                        setDetailSize(product.sizes?.[0] || '')
                        setDetailColor(product.colors?.[0]?.name || '')
                      }}
                      className="text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-2 cursor-pointer leading-snug"
                      title={product.name}
                    >
                      {product.name}
                    </h4>

                    <div className="pt-1 flex items-baseline gap-2">
                      <span className="text-base font-black text-amber-400 font-mono">
                        {formatVND(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through font-mono">
                          {formatVND(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedProduct(product)
                      setDetailSize(product.sizes?.[0] || '')
                      setDetailColor(product.colors?.[0]?.name || '')
                    }}
                    className="px-3 py-2 rounded-xl bg-card hover:bg-card-hover border border-border text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
                  >
                    Chi tiết
                  </button>

                  <button
                    onClick={() => addToCart(product)}
                    className="px-3 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Mua ngay</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-background hover:bg-card-hover border border-border text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 rounded-2xl overflow-hidden bg-black aspect-square">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black uppercase">
                    {selectedProduct.brand}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {selectedProduct.categoryName}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white leading-tight">
                  {selectedProduct.name}
                </h3>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-amber-400 font-mono">
                    {formatVND(selectedProduct.price)}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through font-mono">
                      {formatVND(selectedProduct.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-300 block">Kích cỡ / Trọng lượng:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setDetailSize(sz)}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer",
                            detailSize === sz
                              ? "bg-primary text-white border-primary shadow-sm"
                              : "bg-background border-border text-slate-300 hover:border-slate-500"
                          )}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-300 block">Màu sắc:</span>
                    <div className="flex items-center gap-2">
                      {selectedProduct.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setDetailColor(c.name)}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs border transition-all cursor-pointer",
                            detailColor === c.name ? "border-amber-400 bg-amber-400/10 text-white" : "border-border text-slate-400"
                          )}
                        >
                          <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-background border border-border/80 space-y-1.5 text-xs">
                  <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider block">Thông số kỹ thuật</span>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.specs.map((sp, idx) => (
                      <div key={idx}>
                        <span className="text-slate-400 text-[11px]">{sp.label}: </span>
                        <strong className="text-slate-200">{sp.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct, detailSize, detailColor)
                      setSelectedProduct(null)
                    }}
                    className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Thêm vào giỏ hàng ngay</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md h-full bg-card border-l border-border p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-black text-white">Giỏ Hàng Của Bạn</h3>
                  <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-bold font-mono">
                    {cartItemsCount}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-card-hover cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-3 px-3.5 my-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {cartTotal >= 500000 
                    ? '🎉 Bạn đã đủ điều kiện nhận MIỄN PHÍ VẬN CHUYỂN!' 
                    : 'Mua thêm để được Miễn phí vận chuyển.'}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-border/60 my-4 pr-1">
              {cart.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                  <p className="text-sm font-bold text-slate-300">Giỏ hàng đang trống</p>
                  <p className="text-xs text-slate-400">Hãy chọn các sản phẩm găng đấu và trang bị chất lượng phía trên!</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="py-3.5 flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-black shrink-0 border border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-white truncate leading-tight">
                        {item.product.name}
                      </h5>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex gap-2">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedColor && <span>Màu: {item.selectedColor}</span>}
                      </div>
                      <span className="text-xs font-black text-amber-400 font-mono block mt-1">
                        {formatVND(item.product.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-background border border-border/80 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(idx, -1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold font-mono px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(idx, 1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(idx)}
                      className="p-1.5 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                      title="Xóa món này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Tổng cộng tạm tính:</span>
                <span className="text-xl font-black text-amber-400 font-mono">
                  {formatVND(cartTotal)}
                </span>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={() => {
                  setIsCartOpen(false)
                  setIsCheckoutOpen(true)
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 disabled:opacity-50 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                <span>Tiến hành đặt hàng ({formatVND(cartTotal)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => {
                setIsCheckoutOpen(false)
                setCheckoutSuccess(null)
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-background hover:bg-card-hover border border-border text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {checkoutSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-white">Đặt Hàng Thành Công!</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cảm ơn bạn đã tin tưởng ủng hộ MMAVN Pro Shop. Đơn hàng của bạn đã được ghi nhận vào hệ thống và chuyên viên tư vấn sẽ gọi xác nhận trong ít phút.
                </p>
                <div className="p-4 rounded-2xl bg-black/60 border border-border/80 font-mono text-sm">
                  <span className="text-slate-400 block text-xs">Mã đơn hàng chính thức:</span>
                  <strong className="text-amber-400 text-lg">{checkoutSuccess}</strong>
                </div>
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false)
                    setCheckoutSuccess(null)
                  }}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Thông Tin Giao Hàng &amp; Thanh Toán
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Giao hàng hỏa tốc trong 2-3 ngày làm việc trên toàn quốc
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Họ và tên người nhận *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Số điện thoại *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0912 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Tỉnh / Thành phố *</label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-white focus:outline-none focus:border-primary"
                      >
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        <option value="Hải Phòng">Hải Phòng</option>
                        <option value="Cần Thơ">Cần Thơ</option>
                        <option value="Khác">Tỉnh thành khác</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Địa chỉ nhận hàng chi tiết *</label>
                    <input
                      type="text"
                      required
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Phương thức thanh toán</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className={cn(
                          "p-2.5 rounded-xl border text-center font-bold cursor-pointer transition-all",
                          formData.paymentMethod === 'cod'
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-background border-border text-slate-300"
                        )}
                      >
                        💵 COD
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'banking' })}
                        className={cn(
                          "p-2.5 rounded-xl border text-center font-bold cursor-pointer transition-all",
                          formData.paymentMethod === 'banking'
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-background border-border text-slate-300"
                        )}
                      >
                        🏦 Chuyển khoản
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'vnpay' })}
                        className={cn(
                          "p-2.5 rounded-xl border text-center font-bold cursor-pointer transition-all",
                          formData.paymentMethod === 'vnpay'
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-background border-border text-slate-300"
                        )}
                      >
                        📱 QR Pay
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-sm shadow-lg shadow-red-600/30 transition-all cursor-pointer"
                  >
                    Xác nhận đặt hàng ({formatVND(cartTotal)})
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}