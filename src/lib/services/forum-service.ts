import type { ForumPost, ForumComment, ForumCategory, BeltLevel, ForumAuthor } from '@/types'

export type { ForumPost, ForumComment, ForumCategory, BeltLevel, ForumAuthor }

export interface ForumCategoryConfig {
  id: ForumCategory
  name: string
  description: string
  iconName: string
  color: string
}

export const FORUM_CATEGORIES_DATA: ForumCategoryConfig[] = [
  {
    id: 'ky-thuat',
    name: 'Kỹ thuật & Chiến thuật',
    description: 'BJJ, Striking, Wrestling, phân tích các đòn thế và chiến thuật lồng bát giác',
    iconName: 'Shield',
    color: 'from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30',
  },
  {
    id: 'soi-keo',
    name: 'Bàn luận & Soi kèo trận đấu',
    description: 'Dự đoán kết quả, nhận định phong độ và phân tích tỷ lệ các cặp đấu hot',
    iconName: 'Flame',
    color: 'from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/30',
  },
  {
    id: 'phong-tap',
    name: 'Góc phòng gym & Tìm bạn tập',
    description: 'Review phòng tập, rủ bạn bè sparring, giao lưu học hỏi võ đường',
    iconName: 'Dumbbell',
    color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'cho-do',
    name: 'Chợ đồ tập & Giáp hộ hộ',
    description: 'Mua bán, thanh lý và review găng tay, bọc chân, bảo hộ răng, giáp thi đấu',
    iconName: 'ShoppingBag',
    color: 'from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/30',
  },
]

// Initial mock posts
let mockPosts: ForumPost[] = [
  {
    id: 'post-1',
    title: 'Phân tích kỹ thuật gài Guillotine Choke từ thế Half Guard của Trần Ngọc Lượng',
    content: `Chào anh em đam mê BJJ và MMA!

Trong sự kiện gần đây, mình thấy pha gài Guillotine của Trần Ngọc Lượng rất đáng để mổ xẻ. Thay vì dùng Guillotine cổ điển khi đứng (Standing Guillotine), anh ấy chủ động kéo đối thủ vào Half Guard rồi mới luồn cánh tay sâu qua nách.

Điểm mấu chốt ở đây là:
1. **Khống chế cằm (Chin strap):** Tay trái khóa chặt cằm đối thủ ngay khi họ hạ thấp trọng tâm để take down.
2. **Kẹp thân & hông:** Dùng chân ngoài khóa chặt một chân đối thủ, chân còn lại gác qua lưng (high guard bên hông) nhằm chặn đối thủ lộn qua đầu để thoát (hop over pass).
3. **Finish angle:** Uốn cong hông và vặn người theo góc 45 độ thay vì kéo ngửa thẳng ra sau. Điều này tạo áp lực cực mạnh lên động mạch cảnh.

Anh em tập No-Gi cho mình hỏi khi gặp đối thủ to con hơn hẳn về cơ bắp thì biến thể Marcelotine hay Arm-in Guillotine sẽ an toàn hơn trong MMA? Mời cao thủ vào bàn luận!`,
    author: {
      name: 'Nguyễn Tiến BJJ',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Tím',
      gym: 'Saigon BJJ Club',
    },
    category: 'ky-thuat',
    upvotes: 42,
    repliesCount: 6,
    createdAt: '2026-03-01T08:30:00Z',
    tags: ['BJJ', 'Guillotine', 'Submissions', 'KyThuatMMA'],
    pinned: true,
  },
  {
    id: 'post-2',
    title: 'Soi kèo LION Championship 14: Phạm Văn Nam vs Đinh Văn Hương - Ai sẽ thống trị hạng 56kg?',
    content: `Kèo tâm điểm hạng cân 56kg LION Championship 14 sắp tới thực sự là cuộc đụng độ giữa hai trường phái đối nghịch:
- **Phạm Văn Nam:** Trường phái Ground-and-Pound và Wrestling dẻo dai. Khả năng kiểm soát mặt sàn và thể lực ở các hiệp 4-5 luôn là vũ khí hủy diệt.
- **Đinh Văn Hương:** Võ sĩ có nền tảng Tán Thủ / Striking cực kỳ sắc bén, cự ly ra đòn tầm xa rất khó chịu với những cú đấm thẳng và đá quét chân sấm sét.

**Phân tích của cá nhân mình:**
Nếu Đinh Văn Hương giữ được khoảng cách và sprawl tốt trong 2 hiệp đầu, anh có thể gây sát thương lớn bằng đòn chân. Tuy nhiên, nếu để Văn Nam áp sát vào lồng bát giác thì áp lực wrestling sẽ dần bào mòn thể lực.

Tỷ lệ cá nhân: Văn Nam 55% - 45% Văn Hương. Anh em anh nghĩ sao về kèo này? Vote dự đoán bên dưới nhé!`,
    author: {
      name: 'Võ Sĩ Ẩn Danh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Xanh',
      gym: 'Vietnam Top Team',
    },
    category: 'soi-keo',
    upvotes: 35,
    repliesCount: 5,
    createdAt: '2026-03-02T10:15:00Z',
    tags: ['LionChampionship', 'SoiKeo', 'PhamVanNam', 'DinhVanHuong'],
  },
  {
    id: 'post-3',
    title: '[Hà Nội] Tìm bạn tập No-Gi BJJ & Wrestling vào các buổi sáng 3-5-7 tại Cầu Giấy',
    content: `Chào cả nhà, mình tập No-Gi BJJ được khoảng 2 năm (tương đương đai xanh).
Do tính chất công việc làm remote nên mình rảnh vào các buổi sáng thứ 3 - 5 - 7 (khoảng từ 7h30 đến 9h30 sáng).

Hiện tại mình đang muốn tìm 1-2 anh em cùng sở thích tại khu vực Cầu Giấy / Mỹ Đình / Đống Đa:
- Mục tiêu: Drills kỹ thuật vật, takedown lồng và roll No-Gi nhẹ nhàng giữ thể lực và trau dồi bài vở.
- Trình độ: Người mới hay có kinh nghiệm đều hoan nghênh, tinh thần học hỏi an toàn, không chơi bạo lực hay chấn thương.
- Địa điểm: Có thể thuê thảm tại phòng tập gần Keangnam hoặc qua phòng tập quen chia tiền thảm.

Bác nào hứng thú thì cmt hoặc nhắn tin Zalo giao lưu nhé!`,
    author: {
      name: 'Lê Hoàng Nam',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Xanh',
      gym: 'Agoge MMA Hà Nội',
    },
    category: 'phong-tap',
    upvotes: 19,
    repliesCount: 4,
    createdAt: '2026-03-02T14:40:00Z',
    tags: ['HaNoi', 'TimBanTap', 'NoGi', 'Wrestling'],
  },
  {
    id: 'post-4',
    title: '[Pass lại] Găng tay Fairtex BGV9 Mexican Style 12oz chính hãng mới 99%',
    content: `Mình vừa nhờ người quen xách tay về đôi Fairtex BGV9 (dáng Mexican Glove, đệm mút dày tập bao cát và pad cực đầm tay) màu Matte Black size 12oz.
Tình trạng: Mới xỏ thử đúng 1 lần quấn băng, chưa chạm mồ hôi.
Lý do bán: Cổ tay mình hơi nhỏ nên chuyển sang dùng bản BGV1 cổ dán ôm hơn.

- Giá thị trường: ~2.600.000đ
- Giá pass hữu nghị cho anh em diễn đàn: 1.850.000đ (tặng kèm 1 cuộn quấn tay Fairtex 4m5 màu đỏ).
- Giao dịch trực tiếp tại Quận 1, TP.HCM hoặc freeship COD toàn quốc cho anh em nhanh gọn.
- Có ảnh chi tiết từng đường chỉ và tem authentic dưới phần bình luận.`,
    author: {
      name: 'Trần Gia Bảo',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Trắng',
      gym: 'SSC Saigon Sports Club',
    },
    category: 'cho-do',
    upvotes: 14,
    repliesCount: 3,
    createdAt: '2026-03-03T09:00:00Z',
    tags: ['PassDo', 'Fairtex', 'GangTayBoxing', 'ChoDoTap'],
  },
  {
    id: 'post-5',
    title: 'Chiến thuật phòng thủ và phản công trước những cú Calf Kick (Low Kick bắp chân)',
    content: `Dạo gần đây trong cả UFC lẫn các giải MMA Việt Nam như LION hay GMA, đòn Calf Kick trở thành ác mộng thực sự. Chỉ cần dính 3-4 quả chuẩn xác vào dây thần kinh mác là chân gần như tê liệt, mất thăng bằng hoàn toàn.

Một số cách mình đã áp dụng thành công khi đối mặt đối thủ hay đá bắp chân:
1. **Check Calf Kick bằng mặt phẳng cẳng chân:** Nhấc chân nhẹ và xoay mũi chân ra ngoài 45 độ. Xương cẳng chân va vào mu bàn chân đối thủ sẽ khiến họ chùn chân ngay lập tức.
2. **Đổi thế đứng (Switch Stance):** Khi chân trước bị nhắm đến liên tục, lập tức switch sang Southpaw để che giấu chân đau và bắt nhịp góc ra đòn mới.
3. **Bắt đòn phản công đấm thẳng:** Calf kick đòi hỏi đối thủ phải đứng trong tầm đấm. Khoảnh khắc đối thủ vung chân, tung ngay đòn Overhand hoặc Cross thẳng mặt (Counter punch).

Anh em có kinh nghiệm thực chiến nào hiệu quả hơn không? Cùng chia sẻ nhé!`,
    author: {
      name: 'Coach Danny Thắng',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Đen',
      role: 'HLV Muay Thai & MMA',
      gym: 'Hanoi Fight Academy',
    },
    category: 'ky-thuat',
    upvotes: 58,
    repliesCount: 8,
    createdAt: '2026-02-28T16:20:00Z',
    tags: ['CalfKick', 'Striking', 'PhanCong', 'MuayThai'],
  },
  {
    id: 'post-6',
    title: 'Nhận định cơ hội của võ sĩ Việt Nam tại sàn đấu quốc tế ONE Championship & Road to UFC',
    content: `Nhìn lại năm 2025 - 2026, các đại diện Việt Nam đã bắt đầu để lại dấu ấn tại đấu trường quốc tế. Tuy nhiên, rào cản lớn nhất của võ sĩ chúng ta khi bước ra biển lớn vẫn là gì?

Theo góc nhìn cá nhân:
1. **Wrestling & Khả năng Wall-walk:** Các đối thủ Dagestan, Mông Cổ hay Mỹ có nền tảng vật tự do từ nhỏ, ép lồng cực kỳ rát.
2. **Cắt cân khoa học:** Nhiều võ sĩ Việt vẫn cắt cân kiểu mất nước truyền thống rất hại sức bền trong hiệp 3.
3. **Dinh dưỡng & Hồi phục:** Đội ngũ HLV thể lực (S&C) chuyên biệt vẫn còn thiếu ở hầu hết các lò đào tạo trong nước.

Liệu trong 2 năm tới, Việt Nam có đại diện nào giành được hợp đồng chính thức của UFC không? Mọi người đặt niềm tin vào ai nhất?`,
    author: {
      name: 'Minh Đức MMA',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Tím',
      gym: 'C-Lab Martial Arts',
    },
    category: 'soi-keo',
    upvotes: 27,
    repliesCount: 4,
    createdAt: '2026-02-27T11:00:00Z',
    tags: ['UFC', 'OneChampionship', 'RoadToUFC', 'MMAVietNam'],
  },
  {
    id: 'post-7',
    title: 'Top 5 phòng tập MMA & Jiu-Jitsu uy tín nhất tại TP. Hồ Chí Minh năm 2026',
    content: `Chào các tân binh đang muốn tìm lò luyện MMA tại Sài Gòn. Sau nhiều năm trải nghiệm qua các lò võ lớn nhỏ, đây là đánh giá khách quan của mình:

1. **Saigon Sports Club (SSC) - Quận 7:** Cơ sở vật chất 5 sao, sàn đấu chuyên nghiệp, nhiều HLV ngoại chất lượng cao. Điểm trừ là học phí khá cao.
2. **Vietnam Top Team (VTT) / Agoge:** Thiên về thực chiến, đội tuyển thi đấu mạnh, không khí tập luyện rất máu lửa.
3. **Kim Dong-hyun Team / Korean MMA:** Kỹ thuật Judo & Takedown rất sắc bén, thảm tập rộng.
4. **Overkill BJJ & Fight Club:** BJJ No-Gi và Leg-locks rất hiện đại, cộng đồng thân thiện.
5. **Rumble Gym:** Giá cả hợp lý cho sinh viên và người mới bắt đầu, HLV nhiệt tình nắn kỹ thuật cơ bản.

Anh em đang tập ở đâu? Hãy để lại cảm nhận để người mới có thêm lựa chọn nhé!`,
    author: {
      name: 'Huỳnh Tuấn Kiệt',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Xanh',
      gym: 'Overkill BJJ',
    },
    category: 'phong-tap',
    upvotes: 31,
    repliesCount: 5,
    createdAt: '2026-02-25T14:10:00Z',
    tags: ['ReviewPhongTap', 'TPHCM', 'BJJ', 'TapMMA'],
  },
  {
    id: 'post-8',
    title: 'Tư vấn mua bảo hộ ống đồng (Shin guards) Muay Thai/MMA: Venum Elite vs Fairtex SP5?',
    content: `Mình chuẩn bị tham gia lớp Sparring nâng cao nên cần đầu tư 1 đôi shin guard tốt để bảo vệ ống đồng và đối tác tập luyện.
Đang phân vân giữa 2 dòng:
- **Fairtex SP5:** Ôm chân vừa vặn, da tổng hợp Syntek siêu bền, nhưng phần bảo vệ mu bàn chân có vẻ hơi mỏng?
- **Venum Elite:** Đệm mút xốp dày bảo vệ tối đa, mẫu mã ngầu, nhưng có bạn bảo dùng lâu bị xoay khi sparring gối?

Ai đã dùng qua cả 2 đôi này cho mình xin review thực tế về độ bền và cảm giác di chuyển với ạ!`,
    author: {
      name: 'Dương Văn Khoa',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Trắng',
      gym: 'Muay Club Q3',
    },
    category: 'cho-do',
    upvotes: 16,
    repliesCount: 3,
    createdAt: '2026-02-24T09:45:00Z',
    tags: ['TuVanDoTap', 'ShinGuards', 'Fairtex', 'Venum'],
  },
]

// Initial mock comments
let mockComments: ForumComment[] = [
  {
    id: 'cmt-1',
    postId: 'post-1',
    author: {
      name: 'HLV Hùng "Sư Tử"',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Đen',
      gym: 'Saigon Fight Team',
    },
    content: 'Phân tích rất chuẩn xác! Với đối thủ cơ bắp khỏe thì Marcelotine (high elbow) sẽ tạo đòn bẩy tốt hơn vì không cần dùng quá nhiều lực tay mà tận dụng chuyển động nâng vai. Tuy nhiên trong MMA cần cẩn thận vì nếu trượt tay đối thủ sẽ thoát ra và mount ngay lập tức.',
    upvotes: 18,
    createdAt: '2026-03-01T09:15:00Z',
  },
  {
    id: 'cmt-2',
    postId: 'post-1',
    author: {
      name: 'Bảo Long BJJ',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Xanh',
    },
    content: 'Đồng quan điểm, quan trọng nhất của Guillotine từ Half Guard là góc của cái hông. Nhiều bạn cứ kéo thẳng ra sau thành ra đối thủ thở được và dễ bị pass guard.',
    upvotes: 9,
    createdAt: '2026-03-01T10:05:00Z',
  },
  {
    id: 'cmt-3',
    postId: 'post-1',
    author: {
      name: 'Trần Ngọc Lượng Fan',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Trắng',
    },
    content: 'Xem trận đó trực tiếp nổi cả da gà, pha setup kín kẽ làm đối thủ bất ngờ không kịp tap.',
    upvotes: 5,
    createdAt: '2026-03-01T11:20:00Z',
  },
  {
    id: 'cmt-4',
    postId: 'post-2',
    author: {
      name: 'Lê Minh Hải',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Tím',
    },
    content: 'Mình tin Văn Nam sẽ có chiến thuật kéo trận đấu vào hiệp sau. Văn Hương đòn tay rất nặng nhưng nhược điểm chống vật khi bị dồn vào lồng vẫn là câu hỏi lớn.',
    upvotes: 12,
    createdAt: '2026-03-02T11:00:00Z',
  },
  {
    id: 'cmt-5',
    postId: 'post-2',
    author: {
      name: 'Võ Thuật Tán Thủ',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Xanh',
    },
    content: 'Đừng coi thường Tán thủ nhé bác! Tán thủ có bài bắt chân quật ngã rất hay, nếu Nam sơ hở lúc vào đòn là dính counter ngay.',
    upvotes: 8,
    createdAt: '2026-03-02T12:30:00Z',
  },
  {
    id: 'cmt-6',
    postId: 'post-3',
    author: {
      name: 'Đức Anh Wrestling',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Trắng',
    },
    content: 'Mình ở Duy Tân đây bác ơi! Có phòng tập chung cư có thảm tập được. Mình add zalo giao lưu nhé!',
    upvotes: 4,
    createdAt: '2026-03-02T15:20:00Z',
  },
  {
    id: 'cmt-7',
    postId: 'post-4',
    author: {
      name: 'Thanh Tùng Boxing',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Xanh',
    },
    content: 'Check inbox em nhé bác, em ở Q1 sáng mai qua lấy trực tiếp luôn được không?',
    upvotes: 3,
    createdAt: '2026-03-03T09:40:00Z',
  },
  {
    id: 'cmt-8',
    postId: 'post-5',
    author: {
      name: 'Nguyễn Tiến BJJ',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      beltLevel: 'Đai Tím',
    },
    content: 'Bài viết rất thực tế thầy ơi! Em thấy nhiều bạn mới hay đứng nguyên tấn boxing chịu đòn nên gãy chân ngay. Đòn counter đấm overhand khi họ đá bắp chân cực kỳ nguy hiểm nếu bắt đúng nhịp.',
    upvotes: 11,
    createdAt: '2026-02-28T18:00:00Z',
  },
]

// ================= HELPER FUNCTIONS =================

export interface GetPostsFilter {
  category?: string
  tag?: string
  search?: string
  sort?: 'latest' | 'trending' | 'top'
}

/**
 * Get posts with optional filtering and sorting
 */
export function getPosts(filters: GetPostsFilter = {}): ForumPost[] {
  let result = [...mockPosts]

  if (filters.category && filters.category !== 'all') {
    result = result.filter((p) => p.category === filters.category)
  }

  if (filters.tag) {
    const normalizedTag = filters.tag.toLowerCase()
    result = result.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === normalizedTag)
    )
  }

  if (filters.search) {
    const q = filters.search.toLowerCase().trim()
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.author.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    )
  }

  // Sort
  if (filters.sort === 'top') {
    result.sort((a, b) => b.upvotes - a.upvotes)
  } else if (filters.sort === 'trending') {
    // Trending = upvotes + repliesCount * 2
    result.sort((a, b) => (b.upvotes + b.repliesCount * 2) - (a.upvotes + a.repliesCount * 2))
  } else {
    // latest (pinned first)
    result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }

  return result
}

/**
 * Filter posts by category
 */
export function getPostsByCategory(category: ForumCategory): ForumPost[] {
  return getPosts({ category })
}

/**
 * Get post by ID
 */
export function getPostById(id: string): ForumPost | undefined {
  return mockPosts.find((p) => p.id === id)
}

/**
 * Search posts by query string
 */
export function searchPosts(query: string): ForumPost[] {
  return getPosts({ search: query })
}

/**
 * Get comments for a post
 */
export function getCommentsByPostId(postId: string): ForumComment[] {
  return mockComments
    .filter((c) => c.postId === postId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
}

/**
 * Add a new post
 */
export function addPost(postData: {
  title: string
  content: string
  category: ForumCategory
  tags?: string[]
  author?: Partial<ForumAuthor>
}): ForumPost {
  const newPost: ForumPost = {
    id: `post-${Date.now()}`,
    title: postData.title.trim(),
    content: postData.content.trim(),
    category: postData.category,
    tags: postData.tags && postData.tags.length > 0 ? postData.tags : ['MMAVN'],
    author: {
      name: postData.author?.name || 'Võ Sinh MMA',
      avatar: postData.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      beltLevel: postData.author?.beltLevel || 'Đai Trắng',
      gym: postData.author?.gym || 'MMAVN Hub Member',
      role: postData.author?.role,
    },
    upvotes: 1,
    repliesCount: 0,
    createdAt: new Date().toISOString(),
    pinned: false,
  }

  mockPosts.unshift(newPost)
  return newPost
}

/**
 * Add comment to a post
 */
export function addComment(commentData: {
  postId: string
  content: string
  author?: Partial<ForumAuthor>
}): ForumComment {
  const post = getPostById(commentData.postId)
  if (post) {
    post.repliesCount += 1
  }

  const newComment: ForumComment = {
    id: `cmt-${Date.now()}`,
    postId: commentData.postId,
    content: commentData.content.trim(),
    author: {
      name: commentData.author?.name || 'Võ Sinh MMA',
      avatar: commentData.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      beltLevel: commentData.author?.beltLevel || 'Đai Trắng',
      gym: commentData.author?.gym,
    },
    upvotes: 0,
    createdAt: new Date().toISOString(),
  }

  mockComments.push(newComment)
  return newComment
}

/**
 * Upvote a post
 */
export function upvotePost(id: string): { upvotes: number } | null {
  const post = getPostById(id)
  if (!post) return null
  post.upvotes += 1
  return { upvotes: post.upvotes }
}

/**
 * Upvote a comment
 */
export function upvoteComment(id: string): { upvotes: number } | null {
  const comment = mockComments.find((c) => c.id === id)
  if (!comment) return null
  comment.upvotes += 1
  return { upvotes: comment.upvotes }
}

/**
 * Get category post counts
 */
export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {
    all: mockPosts.length,
    'ky-thuat': 0,
    'soi-keo': 0,
    'phong-tap': 0,
    'cho-do': 0,
  }

  mockPosts.forEach((post) => {
    if (counts[post.category] !== undefined) {
      counts[post.category] += 1
    }
  })

  return counts
}

/**
 * Get trending tags from all posts
 */
export function getTrendingTags(): { name: string; count: number }[] {
  const tagMap: Record<string, number> = {}
  mockPosts.forEach((p) => {
    p.tags.forEach((t) => {
      tagMap[t] = (tagMap[t] || 0) + 1
    })
  })

  return Object.entries(tagMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}

/**
 * Get hot/trending discussions
 */
export function getHotDiscussions(limit = 4): ForumPost[] {
  return [...mockPosts]
    .sort((a, b) => (b.upvotes + b.repliesCount) - (a.upvotes + a.repliesCount))
    .slice(0, limit)
}

/**
 * Moderate a forum post (pin, lock, or delete)
 */
export function moderatePost(postId: string, action: 'pin' | 'lock' | 'delete'): boolean {
  const index = mockPosts.findIndex(p => p.id === postId)
  if (index === -1) return false

  if (action === 'delete') {
    mockPosts.splice(index, 1)
    return true
  }

  if (action === 'pin') {
    mockPosts[index].pinned = !mockPosts[index].pinned
    return true
  }

  if (action === 'lock') {
    mockPosts[index].locked = !mockPosts[index].locked
    return true
  }

  return false
}

/**
 * Get total posts count
 */
export function getAllPostsCount(): number {
  return mockPosts.length
}
