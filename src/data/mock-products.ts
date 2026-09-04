import { Product } from '@/types/shop'

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Găng Thi Đấu MMA LION Championship Pro 4oz (Da Bò Cao Cấp)',
    slug: 'gang-thi-dau-mma-lion-championship-pro-4oz',
    category: 'gloves',
    categoryName: 'Găng đấu & Luyện tập',
    brand: 'LION Gear',
    price: 1250000,
    originalPrice: 1550000,
    rating: 4.9,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop&q=80',
    badge: 'Độc Quyền LION',
    isFeatured: true,
    isBestSeller: true,
    description: 'Găng tay thi đấu chính thức tiêu chuẩn lồng bát giác LION Championship. Thiết kế mở lòng bàn tay (Open-palm) tối ưu cho kỹ thuật vật và địa chiến (Ground & Pound, Submission). Đệm bọt xốp đúc đa tầng hấp thụ xung lực đòn đấm.',
    specs: [
      { label: 'Trọng lượng', value: '4 oz (Tiêu chuẩn Pro)' },
      { label: 'Chất liệu', value: '100% Da bò thật Genuine Leather' },
      { label: 'Thiết kế', value: 'Mở ngón cái, thông khí lòng bàn tay' },
      { label: 'Khóa cổ tay', value: 'Băng dán Dual-Lock ôm chắc khớp tay' },
    ],
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Đen Vàng Championship', hex: '#EAB308' },
      { name: 'Đỏ LION Bát Giác', hex: '#DC2626' }
    ]
  },
  {
    id: 'prod-2',
    name: 'Găng MMA Sparring & Đấu Tập Fairtex FGV12 7oz',
    slug: 'gang-mma-sparring-fairtex-fgv12-7oz',
    category: 'gloves',
    categoryName: 'Găng đấu & Luyện tập',
    brand: 'Fairtex',
    price: 1680000,
    originalPrice: 1950000,
    rating: 5.0,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=600&auto=format&fit=crop&q=80',
    badge: 'Chính Hãng Thái Lan',
    isFeatured: true,
    description: 'Dòng găng MMA đấu tập bán chạy số 1 thế giới từ lò đào tạo Fairtex Muay Thai/MMA Thái Lan. Đệm mu bàn tay dày 7oz bảo vệ an toàn tối đa cho bạn tập trong các buổi sparring nặng.',
    specs: [
      { label: 'Trọng lượng', value: '7 oz (Tiêu chuẩn Sparring an toàn)' },
      { label: 'Chất liệu', value: 'Da tổng hợp cao cấp Syntek Leather' },
      { label: 'Xuất xứ', value: 'Bangkok, Thái Lan (Handcrafted)' },
      { label: 'Đệm lót', value: 'Hệ thống đệm 3 lớp bọt xốp mật độ cao' },
    ],
    inStock: true,
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Đen Tuyển', hex: '#111827' },
      { name: 'Xanh Navy', hex: '#1E3A8A' }
    ]
  },
  {
    id: 'prod-3',
    name: 'Găng Boxing & Đánh Đứng Twins Special BGVL-3 Da Thật 10oz/12oz',
    slug: 'gang-boxing-twins-special-bgvl-3',
    category: 'gloves',
    categoryName: 'Găng đấu & Luyện tập',
    brand: 'Twins Special',
    price: 1850000,
    originalPrice: 2100000,
    rating: 4.8,
    reviewCount: 215,
    image: 'https://images.unsplash.com/photo-1509255929945-568b209a341e?w=600&auto=format&fit=crop&q=80',
    badge: 'Huyền Thoại Muay Thai',
    isBestSeller: true,
    description: 'Mẫu găng tập quyền anh và muay thai chuẩn mực nhất mọi thời đại. Được làm thủ công 100% tại xưởng Twins Bangkok, đệm phân bổ bảo vệ cổ tay hoàn hảo khi tung các cú đấm nặng.',
    specs: [
      { label: 'Trọng lượng', value: '10oz / 12oz' },
      { label: 'Chất liệu', value: 'Da bò cao cấp 100% Top-grain leather' },
      { label: 'Khóa dán', value: 'Velcro cổ tay bản to trợ lực' },
    ],
    inStock: true,
    sizes: ['10 oz', '12 oz', '14 oz'],
    colors: [
      { name: 'Đỏ Cổ Điển', hex: '#EF4444' },
      { name: 'Đen Mờ', hex: '#1F2937' }
    ]
  },
  {
    id: 'prod-4',
    name: 'Quần Thi Đấu MMA Fight Shorts LION Championship Co Giãn 4 Chiều',
    slug: 'quan-thi-dau-mma-fight-shorts-lion',
    category: 'apparel',
    categoryName: 'Quần áo thi đấu',
    brand: 'LION Gear',
    price: 550000,
    originalPrice: 690000,
    rating: 4.9,
    reviewCount: 84,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    badge: 'Thi Đấu Chuyên Nghiệp',
    isFeatured: true,
    isBestSeller: true,
    description: 'Quần thi đấu MMA chuyên dụng cho võ sĩ. Chất liệu Polyester pha Spandex co giãn 4 chiều, xẻ tà bên hông 12cm giúp tung đòn đá High Kick và vật takedown không bao giờ bị vướng víu.',
    specs: [
      { label: 'Chất liệu', value: '88% Polyester, 12% Spandex Ultra-Flex' },
      { label: 'Thiết kế', value: 'Xẻ tà bên hông, đáy thun co giãn' },
      { label: 'Cạp quần', value: 'Đai dán chống tuột kèm dây rút an toàn' },
    ],
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Đen Đỏ Octagon', hex: '#B91C1C' },
      { name: 'Trắng Bạc Warrior', hex: '#E5E7EB' }
    ]
  },
  {
    id: 'prod-5',
    name: 'Áo Rashguard Nén Cơ MMAVN Pro Compression Dry-Fit Dài Tay',
    slug: 'ao-rashguard-nen-co-mmavn-pro-dry-fit',
    category: 'apparel',
    categoryName: 'Quần áo thi đấu',
    brand: 'MMAVN Official',
    price: 480000,
    originalPrice: 590000,
    rating: 4.8,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd208?w=600&auto=format&fit=crop&q=80',
    badge: 'Thương Hiệu MMAVN',
    isNewArrival: true,
    description: 'Áo tập nén cơ chuyên nghiệp chống bỏng da khi vật địa chiến (Grappling/BJJ). Công nghệ Dry-Fit thoát mồ hôi siêu tốc, giữ cơ bắp luôn ấm nóng tránh chấn thương chuột rút.',
    specs: [
      { label: 'Công nghệ', value: 'Dry-Fit 4-Way Stretch Compression' },
      { label: 'Họa tiết', value: 'In chìm nhiệt Sublimation không bong tróc' },
      { label: 'Đường may', value: 'Flatlock may phẳng 4 kim 6 chỉ không cọ xát' },
    ],
    inStock: true,
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Đen Nhám MMAVN', hex: '#0F172A' },
      { name: 'Than Chì', hex: '#334155' }
    ]
  },
  {
    id: 'prod-6',
    name: 'Giáp Chân Bảo Vệ Ống Đồng Fairtex Pro Shin Guards SP5',
    slug: 'giap-chan-fairtex-shin-guards-sp5',
    category: 'protection',
    categoryName: 'Đồ bảo hộ',
    brand: 'Fairtex',
    price: 1950000,
    originalPrice: 2250000,
    rating: 4.9,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
    badge: 'Chống Chấn Thương',
    isFeatured: true,
    description: 'Mẫu giáp ống đồng cao cấp nhất cho các đòn đá Low Kick và Check Kick trong MMA và Muay Thai. Thiết kế uốn lượn ôm sát chân, không có móc kim loại gây nguy hiểm cho đối thủ.',
    specs: [
      { label: 'Cấu trúc', value: 'Không vòng kim loại kim khí (An toàn tuyệt đối)' },
      { label: 'Chất liệu', value: 'Da Microfiber Syntek siêu bền' },
      { label: 'Bảo vệ', value: 'Đệm gối kép bảo vệ xương bánh chè và mu bàn chân' },
    ],
    inStock: true,
    sizes: ['M (Cao 1m55-1m70)', 'L (Cao 1m70-1m85)', 'XL (Trên 1m85)'],
    colors: [
      { name: 'Đen Hoàng Gia', hex: '#18181B' },
      { name: 'Trắng Sữa', hex: '#F4F4F5' }
    ]
  },
  {
    id: 'prod-7',
    name: 'Nón Bảo Hộ Thi Đấu & Đấu Tập Twins Special HGL-3 Đỉnh Đầu',
    slug: 'non-bao-ho-twins-special-hgl-3',
    category: 'protection',
    categoryName: 'Đồ bảo hộ',
    brand: 'Twins Special',
    price: 1750000,
    originalPrice: 1990000,
    rating: 4.7,
    reviewCount: 43,
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&auto=format&fit=crop&q=80',
    badge: 'Bảo Vệ Đỉnh Cao',
    description: 'Nón bảo hiểm đấm bốc và đối kháng cao cấp. Bảo vệ toàn diện vùng cằm, thái dương, gò má và đỉnh đầu, góc nhìn mở 180 độ không làm hạn chế tầm quan sát đòn tấn công.',
    specs: [
      { label: 'Chất liệu', value: '100% Da bò thật Genuine Leather' },
      { label: 'Đặc tính', value: 'Bảo vệ gò má và cằm nâng cao (Full Face Check)' },
      { label: 'Tầm nhìn', value: 'Góc nhìn rộng không cản trở góc né đòn' },
    ],
    inStock: true,
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Đen Chiến Binh', hex: '#18181B' },
      { name: 'Đỏ Thi Đấu', hex: '#DC2626' }
    ]
  },
  {
    id: 'prod-8',
    name: 'Bảo Hộ Hàm Tự Biến Tính Shock Doctor Pro Gel Max',
    slug: 'bao-ho-ham-shock-doctor-pro-gel-max',
    category: 'protection',
    categoryName: 'Đồ bảo hộ',
    brand: 'Shock Doctor',
    price: 320000,
    originalPrice: 420000,
    rating: 4.9,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=600&auto=format&fit=crop&q=80',
    badge: 'Top 1 Khuyên Dùng',
    isBestSeller: true,
    description: 'Bảo hộ hàm tiêu chuẩn Hoa Kỳ giúp bảo vệ răng và chống chấn động não (concussion) khi bị đấm trúng quai hàm. Ngâm nước nóng và cắn để ôm khít khuôn răng của từng cá nhân.',
    specs: [
      { label: 'Công nghệ', value: 'Khung Gel-Fit định hình nhiệt chuẩn xác' },
      { label: 'Tiêu chuẩn', value: 'Bảo vệ chấn động hàm dưới và răng hàm mặt' },
      { label: 'Chất liệu', value: 'Silicone y tế không mùi, không BPA' },
    ],
    inStock: true,
    sizes: ['Người lớn (Trên 11 tuổi)'],
    colors: [
      { name: 'Đen Viền Đỏ', hex: '#DC2626' },
      { name: 'Xanh Dạ Quang', hex: '#06B6D4' }
    ]
  },
  {
    id: 'prod-9',
    name: 'Bao Cát Đấm Bốc Fairtex Heavy Bag HB6 1m8 Da Bò Cao Cấp',
    slug: 'bao-cat-fairtex-heavy-bag-hb6-1m8',
    category: 'equipment',
    categoryName: 'Dụng cụ tập luyện',
    brand: 'Fairtex',
    price: 3400000,
    originalPrice: 3890000,
    rating: 5.0,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop&q=80',
    badge: 'Tiêu Chuẩn Phòng Gym',
    isFeatured: true,
    description: 'Bao cát quả chuối huyền thoại dài 1m8 cho phép luyện tập trọn vẹn từ đòn đấm, gối, cùi chỏ cho tới các cú đá quét trụ Low Kick và Body Kick. Dây xích treo chịu tải trọng 80kg.',
    specs: [
      { label: 'Chiều dài', value: '180 cm (Tập đá thấp và cao)' },
      { label: 'Đường kính', value: '36 cm' },
      { label: 'Chất liệu', value: 'Da Syntek công nghiệp chống thấm nước' },
    ],
    inStock: true,
    sizes: ['1m8 Chưa dồn', '1m8 Đã dồn sẵn mút vải'],
    colors: [
      { name: 'Đen Truyền Thống', hex: '#000000' }
    ]
  },
  {
    id: 'prod-10',
    name: 'Băng Quấn Tay Co Giãn Venum Kontact Cotton 4.5m (Cặp)',
    slug: 'bang-quan-tay-venum-kontact-cotton-4-5m',
    category: 'merchandise',
    categoryName: 'Phụ kiện & Merch',
    brand: 'Venum',
    price: 220000,
    originalPrice: 280000,
    rating: 4.9,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=600&auto=format&fit=crop&q=80',
    badge: 'Cần Thiết Bắt Buộc',
    isBestSeller: true,
    description: 'Băng quấn tay co giãn 4.5m bảo vệ khớp ngón tay và cổ tay khỏi nguy cơ rạn nứt xương ngón tay khi ra đòn. Có móc xỏ ngón cái và miếng dán khóa cổ tay chắc chắn.',
    specs: [
      { label: 'Chiều dài', value: '4.5 mét / Cuộn (9 mét / Cặp)' },
      { label: 'Chất liệu', value: 'Cotton pha Elastic co giãn linh hoạt' },
      { label: 'Khóa dán', value: 'Velcro dán nhanh và bám chắc' },
    ],
    inStock: true,
    sizes: ['4.5 Mét'],
    colors: [
      { name: 'Đen Trắng', hex: '#18181B' },
      { name: 'Đỏ Nảy Lửa', hex: '#EF4444' },
      { name: 'Vàng Neon', hex: '#EAB308' }
    ]
  },
  {
    id: 'prod-11',
    name: 'Dây Nhảy Thể Lực Tốc Độ MMAVN Speed Jump Rope Bạc Đạn',
    slug: 'day-nhay-toc-do-mmavn-speed-jump-rope',
    category: 'equipment',
    categoryName: 'Dụng cụ tập luyện',
    brand: 'MMAVN Official',
    price: 250000,
    originalPrice: 320000,
    rating: 4.8,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    badge: 'Tăng Thể Lực Cardio',
    description: 'Dây nhảy lõi thép bọc nhựa PU tốc độ cao với hệ thống vòng bi xoay 360 độ siêu mượt. Dụng cụ bắt buộc của mọi võ sĩ MMA để rèn luyện bộ pháp chân Footwork và thể lực tim mạch.',
    specs: [
      { label: 'Dây cáp', value: 'Lõi thép carbon 2.5mm bọc nhựa chống mài mòn' },
      { label: 'Tay cầm', value: 'Hợp kim nhôm siêu nhẹ có khía chống trượt' },
      { label: 'Vòng bi', value: 'Bạc đạn xoay 360 độ tốc độ cao không xoắn dây' },
    ],
    inStock: true,
    sizes: ['Dài 3m (Tự điều chỉnh ngắn dài bằng ốc siết)'],
    colors: [
      { name: 'Bạc Titan', hex: '#94A3B8' },
      { name: 'Đen Nhám', hex: '#1E293B' }
    ]
  },
  {
    id: 'prod-12',
    name: 'Áo Hoodie MMAVN Hub Signature Octagon Spirit Đen Nhám',
    slug: 'ao-hoodie-mmavn-hub-signature-octagon-spirit',
    category: 'apparel',
    categoryName: 'Quần áo thi đấu',
    brand: 'MMAVN Official',
    price: 590000,
    originalPrice: 750000,
    rating: 5.0,
    reviewCount: 95,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
    badge: 'Merch Độc Quyền',
    isNewArrival: true,
    description: 'Áo nỉ có mũ phong cách thể thao đường phố Combat Sports. Chất vải nỉ chân cua 380gsm dày dặn, ấm áp giữ nhiệt tuyệt vời khi khởi động làm nóng người trước trận đấu.',
    specs: [
      { label: 'Chất liệu', value: '100% Cotton nỉ chân cua 380gsm không xù lông' },
      { label: 'Kiểu dáng', value: 'Oversize thoải mái chuẩn street combat style' },
      { label: 'Họa tiết', value: 'Logo MMAVN Hub phản quang ánh bạc ngực áo' },
    ],
    inStock: true,
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Đen Nhám Octagon', hex: '#090D16' }
    ]
  }
]
