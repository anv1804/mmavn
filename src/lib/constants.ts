// App metadata
export const APP_NAME = 'MMAVN Hub'
export const APP_DESCRIPTION = 'Sàn đấu tri thức MMA Việt Nam'
export const APP_URL = 'https://mmavn.com'

// Route paths (used in Navbar, breadcrumbs, etc)
export const ROUTES = {
  HOME: '/',
  FIGHTERS: '/vo-si',
  FIGHTER_DETAIL: (id: string) => `/vo-si/${id}`,
  RANKINGS: '/bang-xep-hang',
  EVENTS: '/su-kien',
  EVENT_DETAIL: (id: string) => `/su-kien/${id}`,
  COMPARE: '/so-sanh',
  NEWS: '/tin-tuc',
  ARTICLE_DETAIL: (slug: string) => `/tin-tuc/${slug}`,
  PREDICTIONS: '/du-doan',
  PROMOTIONS: '/giai-dau',
  PROMOTION_DETAIL: (id: string) => `/giai-dau/${id}`,
  FORUM: '/dien-dan',
  FORUM_DETAIL: (id: string) => `/dien-dan/${id}`,
} as const

// Forum category configurations
export const FORUM_CATEGORIES = [
  {
    id: 'ky-thuat',
    name: 'Kỹ thuật & Chiến thuật',
    description: 'BJJ, Striking, Wrestling, phân tích các đòn thế và chiến thuật lồng bát giác',
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    id: 'soi-keo',
    name: 'Bàn luận & Dự đoán trận đấu',
    description: 'Dự đoán kết quả, nhận định phong độ và phân tích tỷ lệ các cặp đấu hot',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    id: 'phong-tap',
    name: 'Góc phòng gym & Tìm bạn tập',
    description: 'Review phòng tập, rủ bạn bè sparring, giao lưu học hỏi võ đường',
    color: 'text-green-400 bg-green-500/10 border-green-500/20',
  },
  {
    id: 'cho-do',
    name: 'Chợ đồ tập & Giáp hộ hộ',
    description: 'Mua bán, thanh lý và review găng tay, bọc chân, bảo hộ răng, giáp thi đấu',
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
] as const

// Division display names (Vi)
export const DIVISION_NAMES_VI: Record<string, string> = {
  'd-m-52': 'Hạng Rơm',
  'd-f-52': 'Nữ Hạng Rơm',
  'd-m-56': 'Hạng Ruồi',
  'd-f-56': 'Nữ Hạng Ruồi',
  'd-m-61': 'Hạng Gà',
  'd-f-61': 'Nữ Hạng Gà',
  'd-m-65': 'Hạng Lông',
  'd-m-70': 'Hạng Nhẹ',
  'd-m-77': 'Hạng Bán Trung',
  'd-m-84': 'Hạng Trung',
  'd-m-93': 'Hạng Nặng',
}

// Fight method display labels
export const METHOD_LABELS: Record<string, string> = {
  'KO': 'Knockout',
  'TKO': 'TKO',
  'Submission': 'Khoá siết',
  'Decision (Unanimous)': 'Nhất trí',
  'Decision (Split)': 'Chia phiếu',
  'Decision (Majority)': 'Đa số',
  'Draw': 'Hoà',
  'No Contest': 'Huỷ kết quả',
  'DQ': 'Truất quyền',
}

// Event status display
export const EVENT_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  'upcoming': { label: 'Sắp diễn ra', color: 'primary' },
  'live': { label: 'Đang diễn ra', color: 'live' },
  'completed': { label: 'Đã kết thúc', color: 'default' },
  'cancelled': { label: 'Đã huỷ', color: 'outline' },
}

// Radar chart labels (Vietnamese)
export const RADAR_LABELS = [
  { key: 'striking', label: 'Đòn đánh' },
  { key: 'wrestling', label: 'Vật' },
  { key: 'clinch', label: 'Clinch' },
  { key: 'groundGame', label: 'Mặt đất' },
  { key: 'defense', label: 'Phòng thủ' },
  { key: 'cardio', label: 'Thể lực' },
]

// Promotion colors for visual distinction  
export const PROMOTION_COLORS: Record<string, string> = {
  'p-lion': '#e53e3e',
  'p-gma': '#38a169', 
  'p-v1': '#d69e2e',
}
