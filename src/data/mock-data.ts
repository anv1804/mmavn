import { Promotion, Division, Gym, Fighter, MmaEvent, Fight, Ranking, Article, Technique } from '@/types';

// 1. PROMOTIONS
export const promotions: Promotion[] = [
  {
    id: 'p1',
    name: 'LION Championship',
    shortName: 'LION',
    slug: 'lion-championship',
    foundedYear: 2022,
    description: 'Giải vô địch Sư tử Võ thuật tổng hợp Việt Nam - Đấu trường MMA chuyên nghiệp số 1 quốc gia',
    tagline: 'Đấu trường MMA Chuyên nghiệp hàng đầu Việt Nam',
    type: 'professional',
    formatType: 'Pro Cage',
    formatDescription: 'Thi đấu trong lồng bát giác (Octagon) đạt chuẩn quốc tế, áp dụng bộ luật Unified MMA chuyên nghiệp với các trận tranh đai vô địch 5 hiệp đầy kịch tính.',
    headquarters: 'Hà Nội & TP. Hồ Chí Minh',
    rules: {
      cageType: 'Lồng bát giác (Octagon Cage) tiêu chuẩn quốc tế 9m',
      roundDuration: 'Trận thường: 3 hiệp x 5 phút | Trận tranh đai: 5 hiệp x 5 phút (nghỉ 1 phút giữa hiệp)',
      elbowStrikes: 'Cho phép đòn chỏ toàn diện khi đứng và khi địa chiến (tuân thủ góc đòn hợp lệ)',
      kneesToHead: 'Cho phép khi cả hai võ sĩ ở tư thế đứng; cấm gối vào đầu khi đối thủ chạm sàn (grounded)',
      groundAndPound: 'Được phép đấm và chỏ vào phần thân và mặt đối thủ khi địa chiến',
      scoringSystem: 'Hệ thống tính điểm 10 điểm bắt buộc (10-Point Must System) bởi 3 giám định độc lập',
      weightCutting: 'Cân trọng lượng chính thức 24h trước trận đấu kèm kiểm tra y tế chuyên sâu',
      equipment: 'Găng MMA hở ngón 4oz chuyên nghiệp, bảo hộ hàm, quần short thi đấu tiêu chuẩn, không bảo hộ chân',
      specialRules: [
        'Hệ thống phân chia Hạng A (Chuyên nghiệp) & Hạng B (Tuyển chọn thăng hạng)',
        'Đai vô địch kim loại đúc nguyên khối mạ vàng danh giá được bảo trợ bởi Liên đoàn VMMAF',
        'Quy trình kiểm tra y tế võ sĩ và xét nghiệm phòng chống doping nghiêm ngặt trước & sau trận'
      ]
    },
    belts: [
      { id: 'b-lion-52m', divisionId: 'd-m-52', divisionName: 'Hạng Rơm (52kg Nam)', weightLimit: 52, gender: 'male', status: 'vacant' },
      { id: 'b-lion-56m', divisionId: 'd-m-56', divisionName: 'Hạng Ruồi (56kg Nam)', weightLimit: 56, gender: 'male', currentChampionId: 'f3', defenseCount: 1, status: 'active' },
      { id: 'b-lion-61m', divisionId: 'd-m-61', divisionName: 'Hạng Gà (61kg Nam)', weightLimit: 61, gender: 'male', status: 'vacant' },
      { id: 'b-lion-65m', divisionId: 'd-m-65', divisionName: 'Hạng Lông (65kg Nam)', weightLimit: 65, gender: 'male', status: 'vacant' },
      { id: 'b-lion-70m', divisionId: 'd-m-70', divisionName: 'Hạng Nhẹ (70kg Nam)', weightLimit: 70, gender: 'male', currentChampionId: 'f1', defenseCount: 2, status: 'active' },
      { id: 'b-lion-77m', divisionId: 'd-m-77', divisionName: 'Hạng Bán Trung (77kg Nam)', weightLimit: 77, gender: 'male', status: 'vacant' },
      { id: 'b-lion-84m', divisionId: 'd-m-84', divisionName: 'Hạng Trung (84kg Nam)', weightLimit: 84, gender: 'male', status: 'vacant' },
      { id: 'b-lion-52f', divisionId: 'd-f-52', divisionName: 'Hạng Rơm (52kg Nữ)', weightLimit: 52, gender: 'female', currentChampionId: 'f4', defenseCount: 1, status: 'active' },
      { id: 'b-lion-56f', divisionId: 'd-f-56', divisionName: 'Hạng Ruồi (56kg Nữ)', weightLimit: 56, gender: 'female', status: 'vacant' }
    ],
    keyMetrics: [
      { label: 'Sự kiện tổ chức', value: '28+ sự kiện', detail: 'Phủ sóng tại Hà Nội, TP.HCM, Đà Nẵng, Phú Quốc' },
      { label: 'Võ sĩ chuyên nghiệp', value: '60+ võ sĩ', detail: 'Hội tụ những tên tuổi hàng đầu làng võ Việt' },
      { label: 'Tỉ lệ knock-out/sub', value: '68%', detail: 'Tỉ lệ kết liễu trận đấu mãn nhãn' },
      { label: 'Khán giả / sự kiện', value: '4,500+', detail: 'Khán đài chật kín tại các nhà thi đấu lớn' }
    ],
    highlights: [
      'Tổ chức chuyên nghiệp với lồng bát giác đạt chuẩn quốc tế hàng đầu khu vực',
      'Phát sóng trực tiếp truyền hình quốc gia và hệ thống mạng xã hội hàng triệu view',
      'Chế độ bảo hiểm và thù lao thi đấu cao nhất trong các giải võ thuật Việt Nam',
      'Cánh cửa mở thẳng tới các đấu trường quốc tế như ONE Championship và Road to UFC'
    ]
  },
  {
    id: 'p2',
    name: 'GMA',
    shortName: 'GMA',
    slug: 'gma',
    foundedYear: 2019,
    description: 'Gods of Martial Arts - Giải đấu bán chuyên và bệ phóng ươm mầm tài năng võ thuật tổng hợp',
    tagline: 'Bệ phóng bán chuyên & Ươm mầm tài năng trẻ võ thuật',
    type: 'amateur',
    formatType: 'Semi-Pro Grassroots',
    formatDescription: 'Định dạng giải đấu bán chuyên phong trào, tối ưu hóa mức độ an toàn nhằm phát hiện, cọ xát và đào tạo lứa võ sĩ trẻ từ các lò võ khắp cả nước.',
    headquarters: 'TP. Hồ Chí Minh',
    rules: {
      cageType: 'Sàn đài lục giác (Hexagon) / Thảm đấu an toàn có đệm chống sốc',
      roundDuration: '3 hiệp x 3 phút (nghỉ 1 phút giữa hiệp), hiệp phụ 3 phút khi bất phân thắng bại',
      elbowStrikes: 'Hạn chế cùi chỏ nguy hiểm; cấm hoàn toàn cùi chỏ vào vùng đầu và cấm khi địa chiến',
      kneesToHead: 'Cấm hoàn toàn đòn gối vào đầu trong mọi tư thế (chỉ cho phép gối vào thân)',
      groundAndPound: 'Được phép đấm thân; cấm đòn giã mặt dồn dập khi đối thủ đã mất thế phòng ngự',
      scoringSystem: 'Chấm điểm chú trọng kỹ thuật kiểm soát thế trận, độ tích cực và khả năng chuyển vị trí',
      weightCutting: 'Cân trọng lượng trong ngày thi đấu (Same-day Weigh-in) để bảo vệ sức khỏe võ sĩ trẻ',
      equipment: 'Găng bán chuyên dày 6oz-7oz có đệm ngón, bảo vệ ống đồng và mu bàn chân, bảo vệ hàm bắt buộc',
      specialRules: [
        'Cơ chế kết nối đưa tài năng xuất sắc trực tiếp lên sàn đấu chuyên nghiệp LION Championship',
        'Phân nhóm Tân binh (Novice) và Bán chuyên (Semi-Pro) để tránh chênh lệch trình độ',
        'Trọng tài can thiệp sớm ngay khi phát hiện nguy cơ chấn thương nhằm bảo vệ võ sĩ'
      ]
    },
    belts: [
      { id: 'b-gma-52m', divisionId: 'd-m-52', divisionName: 'Hạng Rơm (52kg Nam)', weightLimit: 52, gender: 'male', status: 'vacant' },
      { id: 'b-gma-56m', divisionId: 'd-m-56', divisionName: 'Hạng Ruồi (56kg Nam)', weightLimit: 56, gender: 'male', currentChampionId: 'f17', defenseCount: 0, status: 'active' },
      { id: 'b-gma-61m', divisionId: 'd-m-61', divisionName: 'Hạng Gà (61kg Nam)', weightLimit: 61, gender: 'male', currentChampionId: 'f11', defenseCount: 1, status: 'active' },
      { id: 'b-gma-65m', divisionId: 'd-m-65', divisionName: 'Hạng Lông (65kg Nam)', weightLimit: 65, gender: 'male', currentChampionId: 'f16', defenseCount: 0, status: 'active' },
      { id: 'b-gma-52f', divisionId: 'd-f-52', divisionName: 'Hạng Rơm (52kg Nữ)', weightLimit: 52, gender: 'female', currentChampionId: 'f14', defenseCount: 0, status: 'active' }
    ],
    keyMetrics: [
      { label: 'CLB & Võ đường liên kết', value: '45+ lò võ', detail: 'Mạng lưới kết nối lò võ khắp 3 miền đất nước' },
      { label: 'Trận đấu mỗi mùa', value: '120+ trận', detail: 'Mật độ thi đấu dày đặc tạo kinh nghiệm thực chiến' },
      { label: 'Tỉ lệ lên sàn Pro', value: '35%', detail: 'Võ sĩ đạt thành tích cao được tuyển chọn lên giải chuyên nghiệp' },
      { label: 'Chỉ số an toàn y tế', value: '99.5%', detail: 'Kiểm soát chấn thương nghiêm ngặt bởi đội ngũ bác sĩ' }
    ],
    highlights: [
      'Luật thi đấu bán chuyên an toàn tuyệt đối, phù hợp cho võ sinh trẻ cọ xát',
      'Cân ký cùng ngày thi đấu xóa bỏ hoàn toàn rủi ro ép cân nguy hại sức khỏe',
      'Bệ phóng phát hiện các viên ngọc thô từ BJJ, Muay Thái, Tán thủ, Vovinam',
      'Chi phí hợp lý, tạo điều kiện thuận lợi nhất cho các câu lạc bộ cơ sở'
    ]
  },
  {
    id: 'p3',
    name: 'V1 Champion',
    shortName: 'V1',
    slug: 'v1-champion',
    foundedYear: 2020,
    description: 'Đại hội võ thuật thể thức Grand Prix loại trực tiếp & thách đấu liên môn đỉnh cao',
    tagline: 'Đại hội Grand Prix loại trực tiếp & Thách đấu đa môn',
    type: 'semi-pro',
    formatType: 'Grand Prix',
    formatDescription: 'Đấu trường thể thức nhánh đấu Knock-out 8 người và 4 người đầy kịch tính, kết hợp tinh hoa giữa MMA, Kickboxing, Boxing và Tán Thủ.',
    headquarters: 'TP. Hồ Chí Minh & Hà Nội',
    rules: {
      cageType: 'Sàn đài dây vuông (Roped Ring) kết hợp góc đài rào chắn chuyển đổi',
      roundDuration: 'Vòng loại & Tứ kết: 3 hiệp x 3 phút | Trận Chung kết: 3 hiệp x 4 phút (Hiệp phụ 3 phút)',
      elbowStrikes: 'Cho phép chỏ khi đứng có bọc bảo hộ mỏng; cấm chỏ cắm 12-to-6',
      kneesToHead: 'Cho phép đòn gối bay và đòn gối đơn trong tư thế ôm ghì (clinch) tối đa 3 giây',
      groundAndPound: 'Giới hạn thời gian địa chiến (30-45 giây nếu không có chuyển vị trí hoặc đòn dứt điểm)',
      scoringSystem: 'Ưu tiên tối đa cho võ sĩ tấn công chủ động, đổi đòn cống hiến và gây tổn thương',
      weightCutting: 'Cân ký trước 12h, theo dõi chỉ số hydrat hóa và thể trạng nghiêm ngặt',
      equipment: 'Găng hở ngón chuyên biệt 5oz, bọc cùi chỏ co giãn mềm, bảo vệ hàm tiêu chuẩn',
      specialRules: [
        'Thể thức nhánh đấu loại trực tiếp (8-Man / 4-Man Grand Prix Bracket) trong một mùa giải',
        'Quy chế trận đấu dự bị (Reserve Fight) thay thế võ sĩ chấn thương ở các vòng trong',
        'Các trận Siêu thách đấu liên môn (Super-Fights) giữa các nhà vô địch môn phái khác nhau'
      ]
    },
    belts: [
      { id: 'b-v1-77m', divisionId: 'd-m-77', divisionName: 'Grand Prix Bán Trung (77kg)', weightLimit: 77, gender: 'male', currentChampionId: 'f18', defenseCount: 0, status: 'active' },
      { id: 'b-v1-84m', divisionId: 'd-m-84', divisionName: 'Grand Prix Hạng Trung (84kg)', weightLimit: 84, gender: 'male', currentChampionId: 'f8', defenseCount: 1, status: 'active' },
      { id: 'b-v1-93m', divisionId: 'd-m-93', divisionName: 'Vô Địch Mở Rộng Hạng Nặng (93kg)', weightLimit: 120, gender: 'male', currentChampionId: 'f15', defenseCount: 1, status: 'active' }
    ],
    keyMetrics: [
      { label: 'Thể thức tranh tài', value: 'Grand Prix 8-Man', detail: 'Loại trực tiếp từng chặng cực kỳ kịch tính' },
      { label: 'Tỉ lệ KO/TKO', value: '72%', detail: 'Nhịp độ dồn dập khuyến khích đôi công đòn đứng' },
      { label: 'Giao thoa võ thuật', value: '5+ trường phái', detail: 'Muay Thai, Kickboxing, Boxing, Tán thủ, BJJ' },
      { label: 'Giải thưởng chặng', value: 'Hấp dẫn bậc nhất', detail: 'Tiền thưởng theo từng trận thắng và cúp vô địch' }
    ],
    highlights: [
      'Thể thức giải đấu nhánh Knock-out kịch tính, đòi hỏi chiến thuật và thể lực thép',
      'Không gian sàn đài dây hoài niệm phong cách Pride FC & K-1 huyền thoại',
      'Khuyến khích giao tranh đổi đòn nảy lửa, hạn chế giằng co làm nguội trận đấu',
      'Sân chơi chứng minh bản lĩnh của các tay đấm striking hàng đầu Việt Nam'
    ]
  }
];

// 2. DIVISIONS
export const divisions: Division[] = [
  { id: 'd-m-52', name: 'Strawweight', nameVi: 'Hạng Rơm', weightLimit: 52, gender: 'male' },
  { id: 'd-f-52', name: 'Women\'s Strawweight', nameVi: 'Hạng Rơm', weightLimit: 52, gender: 'female' },
  { id: 'd-m-56', name: 'Flyweight', nameVi: 'Hạng Ruồi', weightLimit: 56, gender: 'male' },
  { id: 'd-f-56', name: 'Women\'s Flyweight', nameVi: 'Hạng Ruồi', weightLimit: 56, gender: 'female' },
  { id: 'd-m-61', name: 'Bantamweight', nameVi: 'Hạng Gà', weightLimit: 61, gender: 'male' },
  { id: 'd-f-61', name: 'Women\'s Bantamweight', nameVi: 'Hạng Gà', weightLimit: 61, gender: 'female' },
  { id: 'd-m-65', name: 'Featherweight', nameVi: 'Hạng Lông', weightLimit: 65, gender: 'male' },
  { id: 'd-m-70', name: 'Lightweight', nameVi: 'Hạng Nhẹ', weightLimit: 70, gender: 'male' },
  { id: 'd-m-77', name: 'Welterweight', nameVi: 'Hạng Bán Trung', weightLimit: 77, gender: 'male' },
  { id: 'd-m-84', name: 'Middleweight', nameVi: 'Hạng Trung', weightLimit: 84, gender: 'male' },
  { id: 'd-m-93', name: 'Heavyweight', nameVi: 'Hạng Nặng', weightLimit: 120, gender: 'male' }
];

// 3. GYMS
export const gyms: Gym[] = [
  {
    id: 'g1',
    name: 'Vietnam Top Team',
    city: 'TP.HCM',
    address: 'Số 15 đường Số 4, Thảo Điền, TP. Thủ Đức, TP.HCM',
    disciplines: ['MMA', 'BJJ', 'Muay Thai', 'Boxing'],
    headCoach: 'Johnny Walker (BJJ Black Belt)',
    coaches: ['Johnny Walker (BJJ Black Belt)', 'Nguyễn Văn Tuấn (Muay Thai)', 'Dave Miller (Wrestling)'],
    contact: {
      phone: '0903 123 456',
      email: 'info@vietnamtopteam.vn',
      facebook: 'facebook.com/vietnamtopteam',
      website: 'https://vietnamtopteam.vn',
    },
    description: 'Lò đào tạo MMA chuyên nghiệp hàng đầu tại miền Nam, nơi sản sinh và quy tụ nhiều nhà vô địch LION Championship với cơ sở vật chất chuẩn quốc tế gồm lồng bát giác, khu thảm grappling chuyên dụng và phòng tập thể lực chuyên sâu.',
    foundedYear: 2018,
    openingHours: '06:00 - 21:30 (Thứ 2 - Chủ Nhật)',
    notableFighterIds: ['f1', 'f9', 'f17'],
  },
  {
    id: 'g2',
    name: 'Saigon MMA Academy',
    city: 'TP.HCM',
    address: '216/3 Nguyễn Văn Hưởng, P. Thảo Điền, TP. Thủ Đức, TP.HCM',
    disciplines: ['MMA', 'Boxing', 'Wrestling', 'BJJ'],
    headCoach: 'Jean-Charles Skarbowsky',
    coaches: ['Jean-Charles Skarbowsky (Muay/MMA)', 'Hoàng Tú (BJJ Purple Belt)', 'Đỗ Văn Thành (Wrestling)'],
    contact: {
      phone: '0938 789 101',
      email: 'saigonmma@gmail.com',
      facebook: 'facebook.com/saigonmmaacademy',
      website: 'https://saigonmma.com',
    },
    description: 'Trung tâm võ thuật đối kháng tổng hợp với giáo trình chuẩn quốc tế, thế mạnh đào tạo địa chiến Wrestling và khóa siết BJJ.',
    foundedYear: 2017,
    openingHours: '06:30 - 21:00 (Thứ 2 - Thứ 7)',
    notableFighterIds: ['f4', 'f11', 'f20'],
  },
  {
    id: 'g3',
    name: 'C-Gym MMA',
    city: 'TP.HCM',
    address: '45 Lê Văn Lương, Phường Tân Phong, Quận 7, TP.HCM',
    disciplines: ['MMA', 'Kickboxing', 'Boxing', 'BJJ'],
    headCoach: 'Lê Minh Cường',
    coaches: ['Lê Minh Cường (Head Coach)', 'Trương Mỹ Linh (Striking Coach)'],
    contact: {
      phone: '0908 555 789',
      email: 'cgym.mma@gmail.com',
      facebook: 'facebook.com/cgymmma',
    },
    description: 'Câu lạc bộ MMA hiện đại tại Quận 7, không gian tập luyện chuyên nghiệp cho cả người mới bắt đầu và võ sĩ bán chuyên / chuyên nghiệp.',
    foundedYear: 2020,
    openingHours: '07:00 - 22:00 (Hàng ngày)',
    notableFighterIds: ['f5', 'f14'],
  },
  {
    id: 'g4',
    name: 'Hanoi Combat Club',
    city: 'Hà Nội',
    address: 'Số 8 Trịnh Hoài Đức, P. Cát Linh, Đống Đa, Hà Nội',
    disciplines: ['MMA', 'Wrestling', 'Boxing', 'BJJ'],
    headCoach: 'Nguyễn Văn Nam',
    coaches: ['Nguyễn Văn Nam (Cựu HLV Vật Quốc Gia)', 'Phạm Văn Nam', 'Bùi Đức Anh (Boxing Coach)'],
    contact: {
      phone: '0989 112 233',
      email: 'hcc@hanoicombat.vn',
      facebook: 'facebook.com/hanoicombatclub',
      website: 'https://hanoicombat.vn',
    },
    description: 'Đội tuyển và câu lạc bộ MMA hàng đầu miền Bắc, đặc biệt nổi tiếng với bộ môn Vật cổ truyền & Vật tự do thích ứng MMA đỉnh cao.',
    foundedYear: 2019,
    openingHours: '06:00 - 21:00 (Thứ 2 - Chủ Nhật)',
    notableFighterIds: ['f3', 'f10', 'f18'],
  },
  {
    id: 'g5',
    name: 'Dragon Fight Gym',
    city: 'Đà Nẵng',
    address: '56 Duy Tân, P. Hòa Thuận Đông, Hải Châu, Đà Nẵng',
    disciplines: ['MMA', 'Vovinam', 'Muay Thai', 'BJJ'],
    headCoach: 'Huỳnh Anh Tuấn',
    coaches: ['Huỳnh Anh Tuấn (Vovinam Đệ Tam Đẳng)', 'Hoàng Hữu Thái', 'Nguyễn Tấn Đạt'],
    contact: {
      phone: '0905 112 244',
      email: 'dragonfightdanang@gmail.com',
      facebook: 'facebook.com/dragonfightgym',
      website: 'https://dragonfight.vn',
    },
    description: 'Trung tâm võ thuật đối kháng quy mô lớn nhất miền Trung, kết hợp đòn chân Vovinam độc đáo vào đấu trường bát giác MMA.',
    foundedYear: 2021,
    openingHours: '07:00 - 21:00 (Thứ 2 - Thứ 7)',
    notableFighterIds: ['f6', 'f12', 'f19'],
  },
  {
    id: 'g6',
    name: 'Muay Thái Nguyễn Trần Duy Nhất Academy',
    city: 'TP.HCM',
    address: 'Số 1 Trịnh Hoài Đức, Phường 13, Quận 5, TP.HCM',
    disciplines: ['Muay Thai', 'MMA', 'Kickboxing', 'Boxing'],
    headCoach: 'Nguyễn Trần Duy Nhất',
    coaches: ['Nguyễn Trần Duy Nhất (Tượng đài Muay Thai)', 'Nguyễn Trần Tự Do', 'Mai Khắc Tuấn'],
    contact: {
      phone: '0912 345 678',
      email: 'no1muaythai@gmail.com',
      facebook: 'facebook.com/no1muaythaiclub',
    },
    description: 'Lò võ của "Độc cô cầu bại" Nguyễn Trần Duy Nhất, chuyên sâu về striking Muay Thai và phát triển các võ sĩ thi đấu LION Championship và đấu trường quốc tế.',
    foundedYear: 2016,
    openingHours: '06:30 - 21:30 (Thứ 2 - Chủ Nhật)',
    notableFighterIds: ['f2', 'f13'],
  },
  {
    id: 'g7',
    name: 'No.1 Fight Team Hanoi',
    city: 'Hà Nội',
    address: '125 Nguyễn Sơn, P. Gia Thụy, Long Biên, Hà Nội',
    disciplines: ['MMA', 'BJJ', 'Muay Thai', 'Boxing'],
    headCoach: 'Vũ Hải Long',
    coaches: ['Vũ Hải Long (BJJ Black Belt)', 'Vũ Minh Hiếu'],
    contact: {
      phone: '0966 888 999',
      email: 'no1hanoi@fightteam.vn',
      facebook: 'facebook.com/no1fightteamhanoi',
    },
    description: 'Điểm đến hàng đầu cho cộng đồng Brazilian Jiu-Jitsu và MMA tại thủ đô với nhiều võ sĩ giành huy chương quốc tế.',
    foundedYear: 2019,
    openingHours: '07:00 - 21:30 (Hàng ngày)',
    notableFighterIds: ['f7', 'f16'],
  },
  {
    id: 'g8',
    name: 'Pacific MMA',
    city: 'TP.HCM',
    address: '88 Song Hành, Thảo Điền, TP. Thủ Đức, TP.HCM',
    disciplines: ['MMA', 'Kickboxing', 'BJJ', 'Boxing'],
    headCoach: 'Sean Murphy',
    coaches: ['Sean Murphy (BJJ Brown Belt)', 'Võ Thành Đạt (Striking Coach)'],
    contact: {
      phone: '0977 444 333',
      email: 'info@pacificmma.vn',
      facebook: 'facebook.com/pacificmma',
      website: 'https://pacificmma.vn',
    },
    description: 'Phòng tập cao cấp với lồng Octagon tiêu chuẩn, trang thiết bị tối tân và các khóa huấn luyện MMA từ cơ bản đến chuyên nghiệp.',
    foundedYear: 2020,
    openingHours: '06:00 - 22:00 (Thứ 2 - Chủ Nhật)',
    notableFighterIds: ['f8', 'f15'],
  },
  {
    id: 'g9',
    name: 'Danang BJJ & MMA Club',
    city: 'Đà Nẵng',
    address: '12 An Đồn 4, An Hải Bắc, Sơn Trà, Đà Nẵng',
    disciplines: ['BJJ', 'MMA', 'Muay Thai', 'Boxing'],
    headCoach: 'Carlos Ribeiro',
    coaches: ['Carlos Ribeiro (BJJ Black Belt)', 'Trần Hải Đăng'],
    contact: {
      phone: '0935 889 977',
      email: 'danangbjj@gmail.com',
      facebook: 'facebook.com/danangbjjmma',
    },
    description: 'Cộng đồng Grappling và MMA sôi động bên bờ biển Đà Nẵng, điểm đến thu hút nhiều võ sĩ quốc tế và các tài năng trẻ miền Trung.',
    foundedYear: 2021,
    openingHours: '07:00 - 21:00 (Thứ 2 - Chủ Nhật)',
    notableFighterIds: ['f6', 'f12'],
  },
  {
    id: 'g10',
    name: 'Vietnam Top Team Hanoi',
    city: 'Hà Nội',
    address: '48 Võ Thị Sáu, P. Thanh Nhàn, Hai Bà Trưng, Hà Nội',
    disciplines: ['MMA', 'BJJ', 'Muay Thai', 'Boxing'],
    headCoach: 'Alex Silva',
    coaches: ['Alex Silva (MMA Specialist)', 'Trần Mạnh Hùng (Boxing Coach)'],
    contact: {
      phone: '0945 678 890',
      email: 'hanoi@vietnamtopteam.vn',
      facebook: 'facebook.com/vtthanoi',
      website: 'https://vietnamtopteam.vn',
    },
    description: 'Chi nhánh phía Bắc của hệ thống VTT, trang bị đầy đủ sàn đấu và chương trình huấn luyện MMA bài bản.',
    foundedYear: 2022,
    openingHours: '06:30 - 21:30 (Hàng ngày)',
    notableFighterIds: ['f3', 'f7'],
  }
];


// 4. FIGHTERS
export const fighters: Fighter[] = [
  {
    id: 'f1', name: 'Trần Quang Lộc', nickname: 'Quái Vật Biển', isChampion: true, gymId: 'g1', divisionId: 'd-m-70',
    record: { wins: 15, losses: 2, draws: 0, noContests: 0, winsByKo: 8, winsBySub: 5, winsByDec: 2 },
    stats: { strikingAccuracy: 55, strikingDefense: 60, takedownAccuracy: 50, takedownDefense: 65, finishRate: 85, striking: 4, wrestling: 3, clinch: 4, groundGame: 3, defense: 4, cardio: 5 },
    eloRating: 1800, styles: ['Tán Thủ', 'MMA'], height: 175, reach: 178, dateOfBirth: '1989-01-01', nationality: 'VN',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1000&auto=format&fit=crop&q=80',
    fullBodyImage: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1000&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    quote: 'Khi bước vào lồng bát giác, tôi không chỉ chiến đấu cho riêng mình, mà chiến đấu vì màu cờ sắc áo Việt Nam và niềm tự hào của hàng triệu người hâm mộ võ thuật nước nhà.',
    quoteAuthor: 'Trần Quang Lộc — Đương kim Vô địch Hạng 70kg LION Championship',
    socialLinks: {
      facebook: 'https://facebook.com/tranquanglocmma',
      instagram: 'https://instagram.com/tranquangloc_mma',
      youtube: 'https://youtube.com/@tranquangloc_official',
      tiktok: 'https://tiktok.com/@tranquangloc'
    },
    gallery: [
      { id: 'g1', url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&auto=format&fit=crop&q=80', caption: 'Khoảnh khắc tung đòn móc trái sấm sét hạ gục đối thủ tại hiệp 2 giải LION 28.', title: 'Cú Knockout định đoạt trận đấu' },
      { id: 'g2', url: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd208?w=1200&auto=format&fit=crop&q=80', caption: 'Giây phút đăng quang bảo vệ thành công đai vô địch 70kg trước 5,000 khán giả cuồng nhiệt.', title: 'Bảo vệ đai vô địch thuyết phục' },
      { id: 'g3', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80', caption: 'Tập luyện cường độ cao các bài phối hợp đòn tay và vật tại Vietnam Top Team.', title: 'Tập huấn kỹ chiến thuật' },
      { id: 'g4', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&auto=format&fit=crop&q=80', caption: 'Bước lên bàn cân chính thức đạt đúng mốc 70.0kg tại buổi Ceremonial Weigh-in.', title: 'Buổi cân ký chính thức' },
      { id: 'g5', url: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=1200&auto=format&fit=crop&q=80', caption: 'Kiểm soát vị trí mount áp đảo và ra đòn Ground & Pound dồn dập.', title: 'Thế trận địa chiến vượt trội' },
      { id: 'g6', url: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=1200&auto=format&fit=crop&q=80', caption: 'Tập trung cao độ trong phòng thay đồ cùng HLV trưởng trước giờ bước ra sàn đấu.', title: 'Tập trung trước giờ xuất trận' }
    ],
    highlightVideos: [
      { id: 'v1', title: 'Top 5 pha Knockout kinh điển của Trần Quang Lộc tại đấu trường LION Championship', thumbnail: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop&q=80', duration: '06:45', views: '280K lượt xem' },
      { id: 'v2', title: 'Trần Quang Lộc vs Hoàng Hữu Thái | Toàn bộ trận bảo vệ đai LION 28 mãn nhãn', thumbnail: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=600&auto=format&fit=crop&q=80', duration: '15:20', views: '450K lượt xem' },
      { id: 'v3', title: 'Phỏng vấn độc quyền: Hành trình từ võ sĩ Tán Thủ đường phố đến ngôi vương MMA Việt', thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80', duration: '18:10', views: '195K lượt xem' },
      { id: 'v4', title: 'Một ngày tập luyện đỉnh cao của "Quái Vật Biển" tại đại bản doanh Liên Phong MMA', thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80', duration: '11:35', views: '135K lượt xem' }
    ]
  },
  {
    id: 'f2', name: 'Nguyễn Trần Duy Nhất', nickname: 'No.1', isChampion: false, gymId: 'g6', divisionId: 'd-m-61',
    record: { wins: 18, losses: 3, draws: 0, noContests: 0, winsByKo: 12, winsBySub: 2, winsByDec: 4 },
    stats: { strikingAccuracy: 75, strikingDefense: 70, takedownAccuracy: 40, takedownDefense: 60, finishRate: 75, striking: 5, wrestling: 2, clinch: 4, groundGame: 2, defense: 4, cardio: 5 },
    eloRating: 1750, styles: ['Muay Thai'], height: 168, reach: 170, dateOfBirth: '1989-03-21', nationality: 'VN',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=80',
    fullBodyImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    quote: 'Võ thuật không chỉ là những đòn thế hủy diệt, võ thuật là đạo đức, là ý chí thép không bao giờ lùi bước trước bất kỳ nghịch cảnh nào.',
    quoteAuthor: 'Nguyễn Trần Duy Nhất — Độc cô cầu bại Muay Thai Việt Nam',
    socialLinks: {
      facebook: 'https://facebook.com/duynhatno1',
      instagram: 'https://instagram.com/nguyentranduynhat_no1',
      youtube: 'https://youtube.com/@no1muaythai',
      tiktok: 'https://tiktok.com/@duynhatno1'
    },
    gallery: [
      { id: 'g2-1', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80', caption: 'Cú đá high-kick sở trường trúng đích hạ đo ván đối thủ.', title: 'Cú đá tầm cao sát thủ' },
      { id: 'g2-2', url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&auto=format&fit=crop&q=80', caption: 'Màn ăn mừng rực lửa sau chiến thắng KO chớp nhoáng tại LION 26.', title: 'Niềm vui chiến thắng' },
      { id: 'g2-3', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&auto=format&fit=crop&q=80', caption: 'Tập luyện đánh pad cùng HLV tại No.1 Muay Club.', title: 'Rèn luyện đòn đánh' },
      { id: 'g2-4', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&auto=format&fit=crop&q=80', caption: 'Tự tin đối mặt đối thủ trong buổi họp báo face-off.', title: 'Face-off nảy lửa' }
    ],
    highlightVideos: [
      { id: 'v2-1', title: 'Tuyển tập những cú đá Headkick làm nên thương hiệu "Độc Cô Cầu Bại" Duy Nhất', thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80', duration: '08:22', views: '520K lượt xem' },
      { id: 'v2-2', title: 'Nguyễn Trần Duy Nhất vs Đỗ Văn Thành | Trận thư hùng lịch sử tại LION Championship', thumbnail: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop&q=80', duration: '12:40', views: '380K lượt xem' }
    ]
  },
  {
    id: 'f3', name: 'Phạm Văn Nam', nickname: 'Nam Tốc Độ', isChampion: true, gymId: 'g4', divisionId: 'd-m-56',
    record: { wins: 12, losses: 1, draws: 0, noContests: 0, winsByKo: 4, winsBySub: 6, winsByDec: 2 },
    stats: { strikingAccuracy: 50, strikingDefense: 55, takedownAccuracy: 70, takedownDefense: 65, finishRate: 80, striking: 3, wrestling: 5, clinch: 4, groundGame: 4, defense: 4, cardio: 5 },
    eloRating: 1680, styles: ['Wrestling', 'BJJ'], height: 165, reach: 165, dateOfBirth: '1995-12-10', nationality: 'VN',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1000&auto=format&fit=crop&q=80',
    fullBodyImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1000&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
    quote: 'Trên sàn đấu, ai nắm giữ được tốc độ và kiểm soát được mặt sàn, người đó nắm giữ chìa khóa đến ngôi vị vô địch.',
    quoteAuthor: 'Phạm Văn Nam — Đương kim Vô địch Hạng 56kg LION Championship',
    socialLinks: {
      facebook: 'https://facebook.com/phamvannam_mma',
      instagram: 'https://instagram.com/nam_speed_mma',
      youtube: 'https://youtube.com/@phamvannam_fighter',
      tiktok: 'https://tiktok.com/@namtocdo_mma'
    },
    gallery: [
      { id: 'g3-1', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&auto=format&fit=crop&q=80', caption: 'Pha bắt chân quật ngã đối thủ chuẩn xác bằng đòn Double Leg Takedown.', title: 'Cú vật hoàn hảo' },
      { id: 'g3-2', url: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd208?w=1200&auto=format&fit=crop&q=80', caption: 'Chiến thắng nghẹt thở bảo vệ ngôi vương hạng cân 56kg.', title: 'Vinh quang của Nam Tốc Độ' }
    ],
    highlightVideos: [
      { id: 'v3-1', title: 'Top những pha Takedown và siết cổ Rear-Naked Choke đỉnh cao của Phạm Văn Nam', thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80', duration: '05:50', views: '210K lượt xem' }
    ]
  },
  {
    id: 'f4', name: 'Nguyễn Thị Hằng', nickname: 'Sát Thủ', isChampion: true, gymId: 'g2', divisionId: 'd-f-52',
    record: { wins: 9, losses: 0, draws: 0, noContests: 0, winsByKo: 3, winsBySub: 4, winsByDec: 2 },
    stats: { strikingAccuracy: 48, strikingDefense: 60, takedownAccuracy: 55, takedownDefense: 70, finishRate: 75, striking: 3, wrestling: 4, clinch: 4, groundGame: 5, defense: 4, cardio: 5 },
    eloRating: 1650, styles: ['BJJ'], height: 158, reach: 160, dateOfBirth: '1998-05-15', nationality: 'VN',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    quote: 'Là phụ nữ bước lên sàn đấu MMA, tôi muốn chứng minh rằng sự dẻo dai, kỷ luật và tinh thần thượng võ không hề có giới hạn giới tính.',
    quoteAuthor: 'Nguyễn Thị Hằng — Đương kim Vô địch Nữ 52kg LION Championship',
    socialLinks: {
      facebook: 'https://facebook.com/nguyenthihang_mma',
      instagram: 'https://instagram.com/hang_assassin_mma',
      youtube: 'https://youtube.com/@nguyenthihang_bjj',
      tiktok: 'https://tiktok.com/@hang_mma_vietnam'
    },
    gallery: [
      { id: 'g4-1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80', caption: 'Pha bẻ tay Armbar quyết định ở hiệp đấu thứ 3 đem về đai vàng danh giá.', title: 'Kỹ thuật khóa siết hoàn mỹ' }
    ],
    highlightVideos: [
      { id: 'v4-1', title: 'Hành trình bất bại 9 trận toàn thắng của "Sát Thủ" Nguyễn Thị Hằng', thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80', duration: '09:15', views: '310K lượt xem' }
    ]
  },
  {
    id: 'f5', name: 'Lê Văn Tuấn', nickname: 'Báo Gấm', isChampion: false, gymId: 'g3', divisionId: 'd-m-65',
    record: { wins: 10, losses: 5, draws: 0, noContests: 0, winsByKo: 6, winsBySub: 1, winsByDec: 3 },
    stats: { strikingAccuracy: 60, strikingDefense: 50, takedownAccuracy: 35, takedownDefense: 55, finishRate: 70, striking: 4, wrestling: 2, clinch: 3, groundGame: 2, defense: 3, cardio: 4 },
    eloRating: 1500, styles: ['Boxing'], height: 170, reach: 172, dateOfBirth: '1993-08-22', nationality: 'VN'
  },
  {
    id: 'f6', name: 'Hoàng Hữu Thái', nickname: 'Rồng Lửa', isChampion: false, gymId: 'g5', divisionId: 'd-m-70',
    record: { wins: 5, losses: 2, draws: 0, noContests: 0, winsByKo: 2, winsBySub: 1, winsByDec: 2 },
    stats: { strikingAccuracy: 45, strikingDefense: 50, takedownAccuracy: 45, takedownDefense: 50, finishRate: 60, striking: 3, wrestling: 3, clinch: 3, groundGame: 3, defense: 3, cardio: 4 },
    eloRating: 1250, styles: ['Vovinam'], height: 173, reach: 175, dateOfBirth: '2000-04-05', nationality: 'VN'
  },
  {
    id: 'f7', name: 'Đặng Yến Nhi', nickname: 'Queen B', isChampion: false, gymId: 'g7', divisionId: 'd-f-56',
    record: { wins: 6, losses: 2, draws: 0, noContests: 0, winsByKo: 1, winsBySub: 3, winsByDec: 2 },
    stats: { strikingAccuracy: 40, strikingDefense: 55, takedownAccuracy: 65, takedownDefense: 60, finishRate: 65, striking: 2, wrestling: 4, clinch: 3, groundGame: 5, defense: 4, cardio: 4 },
    eloRating: 1400, styles: ['BJJ'], height: 162, reach: 163, dateOfBirth: '1999-09-12', nationality: 'VN'
  },
  {
    id: 'f8', name: 'Võ Thành Đạt', nickname: 'Cỗ Máy', isChampion: false, gymId: 'g8', divisionId: 'd-m-77',
    record: { wins: 14, losses: 4, draws: 1, noContests: 0, winsByKo: 9, winsBySub: 2, winsByDec: 3 },
    stats: { strikingAccuracy: 65, strikingDefense: 60, takedownAccuracy: 50, takedownDefense: 65, finishRate: 75, striking: 5, wrestling: 3, clinch: 4, groundGame: 3, defense: 3, cardio: 5 },
    eloRating: 1580, styles: ['Kickboxing'], height: 180, reach: 182, dateOfBirth: '1990-11-20', nationality: 'VN'
  },
  {
    id: 'f9', name: 'Trịnh Cát Tường', nickname: 'Lucky', isChampion: false, gymId: 'g1', divisionId: 'd-f-61',
    record: { wins: 3, losses: 1, draws: 0, noContests: 0, winsByKo: 1, winsBySub: 0, winsByDec: 2 },
    stats: { strikingAccuracy: 55, strikingDefense: 50, takedownAccuracy: 40, takedownDefense: 55, finishRate: 33, striking: 4, wrestling: 2, clinch: 4, groundGame: 2, defense: 3, cardio: 4 },
    eloRating: 1150, styles: ['Muay Thai'], height: 165, reach: 166, dateOfBirth: '2002-01-30', nationality: 'VN'
  },
  {
    id: 'f10', name: 'Bùi Đức Anh', nickname: 'Người Đá', isChampion: false, gymId: 'g4', divisionId: 'd-m-84',
    record: { wins: 8, losses: 3, draws: 0, noContests: 0, winsByKo: 5, winsBySub: 2, winsByDec: 1 },
    stats: { strikingAccuracy: 50, strikingDefense: 65, takedownAccuracy: 50, takedownDefense: 70, finishRate: 85, striking: 4, wrestling: 3, clinch: 3, groundGame: 3, defense: 5, cardio: 4 },
    eloRating: 1450, styles: ['Boxing'], height: 185, reach: 188, dateOfBirth: '1994-06-18', nationality: 'VN'
  },
  {
    id: 'f11', name: 'Đỗ Văn Thành', nickname: 'Thợ Săn', isChampion: false, gymId: 'g2', divisionId: 'd-m-61',
    record: { wins: 11, losses: 6, draws: 0, noContests: 0, winsByKo: 4, winsBySub: 5, winsByDec: 2 },
    stats: { strikingAccuracy: 48, strikingDefense: 55, takedownAccuracy: 60, takedownDefense: 60, finishRate: 80, striking: 3, wrestling: 4, clinch: 4, groundGame: 4, defense: 3, cardio: 4 },
    eloRating: 1380, styles: ['Wrestling'], height: 168, reach: 170, dateOfBirth: '1992-04-14', nationality: 'VN'
  },
  {
    id: 'f12', name: 'Lý Hoàng', nickname: 'Vua Hổ', isChampion: false, gymId: 'g5', divisionId: 'd-m-56',
    record: { wins: 4, losses: 0, draws: 0, noContests: 0, winsByKo: 3, winsBySub: 1, winsByDec: 0 },
    stats: { strikingAccuracy: 70, strikingDefense: 65, takedownAccuracy: 30, takedownDefense: 55, finishRate: 100, striking: 5, wrestling: 2, clinch: 4, groundGame: 2, defense: 3, cardio: 4 },
    eloRating: 1250, styles: ['Muay Thai'], height: 166, reach: 168, dateOfBirth: '2003-10-10', nationality: 'VN'
  },
  {
    id: 'f13', name: 'Mai Khắc Tuấn', nickname: 'Cuồng Phong', isChampion: false, gymId: 'g6', divisionId: 'd-m-70',
    record: { wins: 16, losses: 8, draws: 0, noContests: 0, winsByKo: 7, winsBySub: 4, winsByDec: 5 },
    stats: { strikingAccuracy: 55, strikingDefense: 50, takedownAccuracy: 55, takedownDefense: 60, finishRate: 65, striking: 4, wrestling: 3, clinch: 3, groundGame: 3, defense: 4, cardio: 5 },
    eloRating: 1520, styles: ['Kickboxing'], height: 174, reach: 176, dateOfBirth: '1988-12-05', nationality: 'VN'
  },
  {
    id: 'f14', name: 'Trương Mỹ Linh', nickname: 'Tiên Nữ', isChampion: false, gymId: 'g3', divisionId: 'd-f-52',
    record: { wins: 5, losses: 3, draws: 0, noContests: 0, winsByKo: 0, winsBySub: 2, winsByDec: 3 },
    stats: { strikingAccuracy: 40, strikingDefense: 55, takedownAccuracy: 55, takedownDefense: 60, finishRate: 40, striking: 3, wrestling: 3, clinch: 3, groundGame: 4, defense: 4, cardio: 4 },
    eloRating: 1280, styles: ['Vovinam'], height: 160, reach: 160, dateOfBirth: '1997-07-22', nationality: 'VN'
  },
  {
    id: 'f15', name: 'Đoàn Thanh Lâm', nickname: 'Búa Tạ', isChampion: false, gymId: 'g8', divisionId: 'd-m-93',
    record: { wins: 7, losses: 1, draws: 0, noContests: 0, winsByKo: 7, winsBySub: 0, winsByDec: 0 },
    stats: { strikingAccuracy: 60, strikingDefense: 50, takedownAccuracy: 20, takedownDefense: 55, finishRate: 100, striking: 5, wrestling: 2, clinch: 3, groundGame: 2, defense: 3, cardio: 3 },
    eloRating: 1420, styles: ['Boxing'], height: 188, reach: 195, dateOfBirth: '1995-03-30', nationality: 'VN'
  },
  {
    id: 'f16', name: 'Vũ Minh Hiếu', nickname: 'Kẻ Huỷ Diệt', isChampion: false, gymId: 'g7', divisionId: 'd-m-65',
    record: { wins: 9, losses: 2, draws: 0, noContests: 0, winsByKo: 4, winsBySub: 3, winsByDec: 2 },
    stats: { strikingAccuracy: 52, strikingDefense: 55, takedownAccuracy: 48, takedownDefense: 60, finishRate: 75, striking: 4, wrestling: 3, clinch: 3, groundGame: 3, defense: 4, cardio: 4 },
    eloRating: 1480, styles: ['Tán Thủ'], height: 171, reach: 172, dateOfBirth: '1996-09-25', nationality: 'VN'
  },
  {
    id: 'f17', name: 'Tạ Văn Tuấn', nickname: 'The Dragon', isChampion: false, gymId: 'g1', divisionId: 'd-m-52',
    record: { wins: 2, losses: 0, draws: 0, noContests: 0, winsByKo: 1, winsBySub: 1, winsByDec: 0 },
    stats: { strikingAccuracy: 45, strikingDefense: 50, takedownAccuracy: 45, takedownDefense: 55, finishRate: 100, striking: 3, wrestling: 3, clinch: 3, groundGame: 3, defense: 3, cardio: 4 },
    eloRating: 1050, styles: ['Vovinam'], height: 162, reach: 164, dateOfBirth: '2004-02-14', nationality: 'VN'
  },
  {
    id: 'f18', name: 'Phan Minh Tiến', nickname: 'Iron Fist', isChampion: false, gymId: 'g4', divisionId: 'd-m-77',
    record: { wins: 10, losses: 4, draws: 0, noContests: 0, winsByKo: 8, winsBySub: 0, winsByDec: 2 },
    stats: { strikingAccuracy: 68, strikingDefense: 55, takedownAccuracy: 35, takedownDefense: 65, finishRate: 80, striking: 5, wrestling: 2, clinch: 3, groundGame: 2, defense: 3, cardio: 4 },
    eloRating: 1410, styles: ['Boxing'], height: 178, reach: 180, dateOfBirth: '1994-08-08', nationality: 'VN'
  },
  {
    id: 'f19', name: 'Nguyễn Tấn Đạt', nickname: 'Thép', isChampion: false, gymId: 'g5', divisionId: 'd-m-61',
    record: { wins: 0, losses: 1, draws: 0, noContests: 0, winsByKo: 0, winsBySub: 0, winsByDec: 0 },
    stats: { strikingAccuracy: 35, strikingDefense: 40, takedownAccuracy: 30, takedownDefense: 45, finishRate: 0, striking: 2, wrestling: 2, clinch: 2, groundGame: 3, defense: 2, cardio: 3 },
    eloRating: 980, styles: ['BJJ'], height: 167, reach: 168, dateOfBirth: '2005-11-11', nationality: 'VN'
  },
  {
    id: 'f20', name: 'Hoàng Tú', nickname: 'Bóng Ma', isChampion: false, gymId: 'g2', divisionId: 'd-m-56',
    record: { wins: 18, losses: 5, draws: 1, noContests: 0, winsByKo: 5, winsBySub: 10, winsByDec: 3 },
    stats: { strikingAccuracy: 45, strikingDefense: 55, takedownAccuracy: 75, takedownDefense: 65, finishRate: 83, striking: 3, wrestling: 4, clinch: 3, groundGame: 5, defense: 4, cardio: 4 },
    eloRating: 1550, styles: ['BJJ'], height: 164, reach: 165, dateOfBirth: '1991-05-19', nationality: 'VN'
  }
];

// 5. EVENTS
export const events: MmaEvent[] = [
  { id: 'e1', name: 'LION Championship 25', promotionId: 'p1', date: '2024-04-10T19:00:00Z', venue: 'Nhà thi đấu Rạch Miễu', city: 'TP.HCM', status: 'completed' },
  { id: 'e2', name: 'LION Championship 26', promotionId: 'p1', date: '2024-06-15T19:00:00Z', venue: 'Quần ngựa', city: 'Hà Nội', status: 'completed' },
  { id: 'e3', name: 'LION Championship 27', promotionId: 'p1', date: '2024-09-20T19:00:00Z', venue: 'Cung thể thao Tiên Sơn', city: 'Đà Nẵng', status: 'completed' },
  { id: 'e4', name: 'LION Championship 28', promotionId: 'p1', date: '2025-01-12T19:00:00Z', venue: 'Nhà thi đấu Nguyễn Du', city: 'TP.HCM', status: 'completed' },
  { id: 'e5', name: 'LION Championship 29', promotionId: 'p1', date: '2026-10-15T19:00:00Z', venue: 'Nhà thi đấu Mỹ Đình', city: 'Hà Nội', status: 'upcoming' },
  { id: 'e6', name: 'LION Championship 30', promotionId: 'p1', date: '2026-12-20T19:00:00Z', venue: 'Nhà thi đấu Phú Thọ', city: 'TP.HCM', status: 'upcoming' },
  { id: 'e7', name: 'GMA 15', promotionId: 'p2', date: '2024-05-05T18:00:00Z', venue: 'SSC', city: 'TP.HCM', status: 'completed' },
  { id: 'e8', name: 'GMA 16', promotionId: 'p2', date: '2024-11-10T18:00:00Z', venue: 'Hanoi Martial Arts Center', city: 'Hà Nội', status: 'completed' },
  { id: 'e9', name: 'V1 Champion 8', promotionId: 'p3', date: '2024-08-22T19:30:00Z', venue: 'Nhà thi đấu Lãnh Binh Thăng', city: 'TP.HCM', status: 'completed' },
  { id: 'e10', name: 'V1 Champion 9', promotionId: 'p3', date: '2026-11-05T19:30:00Z', venue: 'Cung thể thao Quần Ngựa', city: 'Hà Nội', status: 'upcoming' }
];

// 6. FIGHTS
export const fights: Fight[] = [
  // LION 25
  { id: 'ft1', eventId: 'e1', fighter1Id: 'f1', fighter2Id: 'f13', divisionId: 'd-m-70', numberOfRounds: 5, isTitleFight: true, isMainEvent: true, cardPosition: 'main-card', result: { winnerId: 'f1', method: 'KO', round: 2, time: '2:15' } },
  { id: 'ft2', eventId: 'e1', fighter1Id: 'f5', fighter2Id: 'f16', divisionId: 'd-m-65', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'main-card', result: { winnerId: 'f16', method: 'Decision (Unanimous)', round: 3, time: '5:00' } },
  { id: 'ft3', eventId: 'e1', fighter1Id: 'f9', fighter2Id: 'f7', divisionId: 'd-f-61', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'prelims', result: { winnerId: 'f7', method: 'Submission', round: 1, time: '4:10' } },
  
  // LION 26
  { id: 'ft4', eventId: 'e2', fighter1Id: 'f3', fighter2Id: 'f20', divisionId: 'd-m-56', numberOfRounds: 5, isTitleFight: true, isMainEvent: true, cardPosition: 'main-card', result: { winnerId: 'f3', method: 'Decision (Unanimous)', round: 5, time: '5:00' } },
  { id: 'ft5', eventId: 'e2', fighter1Id: 'f2', fighter2Id: 'f11', divisionId: 'd-m-61', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'main-card', result: { winnerId: 'f2', method: 'KO', round: 1, time: '1:30' } },
  { id: 'ft6', eventId: 'e2', fighter1Id: 'f10', fighter2Id: 'f15', divisionId: 'd-m-84', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'prelims', result: { winnerId: 'f15', method: 'KO', round: 2, time: '3:45' } },

  // LION 27
  { id: 'ft7', eventId: 'e3', fighter1Id: 'f4', fighter2Id: 'f14', divisionId: 'd-f-52', numberOfRounds: 5, isTitleFight: true, isMainEvent: true, cardPosition: 'main-card', result: { winnerId: 'f4', method: 'Submission', round: 3, time: '2:50' } },
  { id: 'ft8', eventId: 'e3', fighter1Id: 'f8', fighter2Id: 'f18', divisionId: 'd-m-77', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'main-card', result: { winnerId: 'f8', method: 'Decision (Unanimous)', round: 3, time: '5:00' } },
  { id: 'ft9', eventId: 'e3', fighter1Id: 'f6', fighter2Id: 'f13', divisionId: 'd-m-70', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'prelims', result: { winnerId: 'f13', method: 'Decision (Unanimous)', round: 3, time: '5:00' } },

  // LION 28
  { id: 'ft10', eventId: 'e4', fighter1Id: 'f1', fighter2Id: 'f6', divisionId: 'd-m-70', numberOfRounds: 5, isTitleFight: true, isMainEvent: true, cardPosition: 'main-card', result: { winnerId: 'f1', method: 'KO', round: 1, time: '0:45' } },
  { id: 'ft11', eventId: 'e4', fighter1Id: 'f2', fighter2Id: 'f19', divisionId: 'd-m-61', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'main-card', result: { winnerId: 'f2', method: 'KO', round: 1, time: '0:15' } },
  { id: 'ft12', eventId: 'e4', fighter1Id: 'f12', fighter2Id: 'f20', divisionId: 'd-m-56', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'prelims', result: { winnerId: 'f20', method: 'Submission', round: 2, time: '1:12' } },

  // GMA 15
  { id: 'ft13', eventId: 'e7', fighter1Id: 'f17', fighter2Id: 'f3', divisionId: 'd-m-52', numberOfRounds: 3, isTitleFight: false, isMainEvent: true, cardPosition: 'main-card', result: { winnerId: 'f3', method: 'Submission', round: 1, time: '3:05' } },
  { id: 'ft14', eventId: 'e7', fighter1Id: 'f9', fighter2Id: 'f14', divisionId: 'd-f-52', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'prelims', result: { winnerId: 'f9', method: 'Decision (Unanimous)', round: 3, time: '3:00' } },

  // GMA 16
  { id: 'ft15', eventId: 'e8', fighter1Id: 'f11', fighter2Id: 'f19', divisionId: 'd-m-61', numberOfRounds: 3, isTitleFight: false, isMainEvent: true, cardPosition: 'main-card', result: { winnerId: 'f11', method: 'Submission', round: 2, time: '2:20' } },
  { id: 'ft16', eventId: 'e8', fighter1Id: 'f16', fighter2Id: 'f5', divisionId: 'd-m-65', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'main-card', result: { winnerId: 'f16', method: 'Decision (Unanimous)', round: 3, time: '3:00' } },

  // V1 Champion 8
  { id: 'ft17', eventId: 'e9', fighter1Id: 'f8', fighter2Id: 'f10', divisionId: 'd-m-84', numberOfRounds: 3, isTitleFight: false, isMainEvent: true, cardPosition: 'main-card', result: { winnerId: 'f8', method: 'KO', round: 2, time: '1:50' } },
  { id: 'ft18', eventId: 'e9', fighter1Id: 'f18', fighter2Id: 'f8', divisionId: 'd-m-77', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'main-card', result: { winnerId: 'f18', method: 'Decision (Unanimous)', round: 3, time: '3:00' } },
  { id: 'ft19', eventId: 'e9', fighter1Id: 'f15', fighter2Id: 'f10', divisionId: 'd-m-84', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'prelims', result: { winnerId: 'f15', method: 'KO', round: 1, time: '2:10' } },

  // LION 29 (Upcoming)
  { id: 'ft20', eventId: 'e5', fighter1Id: 'f1', fighter2Id: 'f8', divisionId: 'd-m-70', numberOfRounds: 5, isTitleFight: true, isMainEvent: true, cardPosition: 'main-card' },
  { id: 'ft21', eventId: 'e5', fighter1Id: 'f2', fighter2Id: 'f5', divisionId: 'd-m-65', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'main-card' },
  { id: 'ft22', eventId: 'e5', fighter1Id: 'f3', fighter2Id: 'f12', divisionId: 'd-m-56', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'main-card' },
  { id: 'ft23', eventId: 'e5', fighter1Id: 'f4', fighter2Id: 'f7', divisionId: 'd-f-56', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'prelims' },
  { id: 'ft24', eventId: 'e5', fighter1Id: 'f16', fighter2Id: 'f13', divisionId: 'd-m-65', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'prelims' },
  { id: 'ft25', eventId: 'e5', fighter1Id: 'f9', fighter2Id: 'f14', divisionId: 'd-f-61', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'prelims' },

  // LION 30 (Upcoming)
  { id: 'ft26', eventId: 'e6', fighter1Id: 'f2', fighter2Id: 'f11', divisionId: 'd-m-61', numberOfRounds: 5, isTitleFight: true, isMainEvent: true, cardPosition: 'main-card' },
  { id: 'ft27', eventId: 'e6', fighter1Id: 'f3', fighter2Id: 'f20', divisionId: 'd-m-56', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'main-card' },
  { id: 'ft28', eventId: 'e6', fighter1Id: 'f18', fighter2Id: 'f8', divisionId: 'd-m-77', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'prelims' },
  { id: 'ft29', eventId: 'e6', fighter1Id: 'f15', fighter2Id: 'f10', divisionId: 'd-m-84', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'prelims' },
  
  // V1 Champion 9 (Upcoming)
  { id: 'ft30', eventId: 'e10', fighter1Id: 'f17', fighter2Id: 'f12', divisionId: 'd-m-52', numberOfRounds: 3, isTitleFight: false, isMainEvent: true, cardPosition: 'main-card' },
  { id: 'ft31', eventId: 'e10', fighter1Id: 'f19', fighter2Id: 'f11', divisionId: 'd-m-61', numberOfRounds: 3, isTitleFight: false, isMainEvent: false, cardPosition: 'prelims' }
];

// 7. RANKINGS
export const rankings: Ranking[] = [
  // Lightweight (70kg)
  { position: 1, fighterId: 'f1', divisionId: 'd-m-70', previousPosition: 1, eloRating: 1800, type: 'official' },
  { position: 2, fighterId: 'f13', divisionId: 'd-m-70', previousPosition: 2, eloRating: 1520, type: 'official' },
  { position: 3, fighterId: 'f6', divisionId: 'd-m-70', previousPosition: 4, eloRating: 1250, type: 'official' },
  { position: 4, fighterId: 'f5', divisionId: 'd-m-70', previousPosition: 3, eloRating: 1200, type: 'official' },
  { position: 5, fighterId: 'f8', divisionId: 'd-m-70', previousPosition: 5, eloRating: 1100, type: 'official' },

  // Bantamweight (61kg)
  { position: 1, fighterId: 'f2', divisionId: 'd-m-61', previousPosition: 1, eloRating: 1750, type: 'official' },
  { position: 2, fighterId: 'f11', divisionId: 'd-m-61', previousPosition: 2, eloRating: 1380, type: 'official' },
  { position: 3, fighterId: 'f19', divisionId: 'd-m-61', previousPosition: 3, eloRating: 980, type: 'official' },
  { position: 4, fighterId: 'f3', divisionId: 'd-m-61', previousPosition: 4, eloRating: 950, type: 'official' },
  { position: 5, fighterId: 'f10', divisionId: 'd-m-61', previousPosition: 5, eloRating: 900, type: 'official' },

  // Women's Strawweight (52kg)
  { position: 1, fighterId: 'f4', divisionId: 'd-f-52', previousPosition: 1, eloRating: 1650, type: 'official' },
  { position: 2, fighterId: 'f14', divisionId: 'd-f-52', previousPosition: 3, eloRating: 1280, type: 'official' },
  { position: 3, fighterId: 'f7', divisionId: 'd-f-52', previousPosition: 2, eloRating: 1200, type: 'official' },
  { position: 4, fighterId: 'f9', divisionId: 'd-f-52', previousPosition: 4, eloRating: 1100, type: 'official' },
  { position: 5, fighterId: 'f17', divisionId: 'd-f-52', previousPosition: 5, eloRating: 1050, type: 'official' }
];

// 8. ARTICLES
export const articles: Article[] = [
  { id: 'a1', title: 'Trần Quang Lộc bảo vệ thành công đai vô địch LION 28', slug: 'tran-quang-loc-bao-ve-thanh-cong-dai-vo-dich-lion-28', excerpt: 'Nhà vô địch hạng 70kg đã có chiến thắng chớp nhoáng trước Hoàng Hữu Thái.', content: '', author: 'MMAVN', publishedAt: '2025-01-13T09:00:00Z', category: 'breaking', coverImage: '/images/articles/a1.jpg', tags: ['LION Championship', 'Trần Quang Lộc'], relatedFighterIds: ['f1', 'f6'] },
  { id: 'a2', title: 'Phân tích kỹ thuật: Cú đá quyết định của Nguyễn Trần Duy Nhất', slug: 'phan-tich-ky-thuat-cu-da-quyet-dinh-cua-nguyen-tran-duy-nhat', excerpt: 'Cùng xem lại cú đá headkick đã làm nên chiến thắng tại LION 26.', content: '', author: 'Chuyên gia võ thuật', publishedAt: '2024-06-16T10:00:00Z', category: 'analysis', coverImage: '/images/articles/a2.jpg', tags: ['Kỹ thuật', 'Nguyễn Trần Duy Nhất'], relatedFighterIds: ['f2', 'f11'] },
  { id: 'a3', title: 'Phỏng vấn độc quyền: Phạm Văn Nam nói về trận tái đấu', slug: 'phong-van-doc-quyen-pham-van-nam-noi-ve-tran-tai-dau', excerpt: 'Nam Tốc Độ đã sẵn sàng cho đối thủ tiếp theo tại LION 29 sắp tới.', content: '', author: 'Phóng viên MMAVN', publishedAt: '2026-08-15T14:00:00Z', category: 'interview', coverImage: '/images/articles/a3.jpg', tags: ['Phỏng vấn', 'Phạm Văn Nam'], relatedFighterIds: ['f3', 'f20'] },
  { id: 'a4', title: 'Cách chống Take-down hiệu quả từ các võ sĩ hàng đầu', slug: 'cach-chong-take-down-hieu-qua-tu-cac-vo-si-hang-dau', excerpt: 'Kỹ thuật phòng thủ vật là một phần không thể thiếu trong MMA hiện đại.', content: '', author: 'HLV MMA', publishedAt: '2026-07-20T08:00:00Z', category: 'technique', coverImage: '/images/articles/a4.jpg', tags: ['Kỹ thuật', 'Vật'], relatedFighterIds: ['f1', 'f3', 'f4'] },
  { id: 'a5', title: 'Góc nhìn: Tương lai của MMA nữ Việt Nam', slug: 'goc-nhin-tuong-lai-cua-mma-nu-viet-nam', excerpt: 'Với sự nổi lên của Nguyễn Thị Hằng, MMA nữ Việt Nam đang có những bước tiến đáng kể.', content: '', author: 'Nhà báo thể thao', publishedAt: '2026-08-01T09:30:00Z', category: 'opinion', coverImage: '/images/articles/a5.jpg', tags: ['MMA Nữ', 'Phân tích'], relatedFighterIds: ['f4', 'f7', 'f14'] },
  { id: 'a6', title: 'Tiêu điểm phòng tập: Vietnam Top Team', slug: 'tieu-diem-phong-tap-vietnam-top-team', excerpt: 'Tìm hiểu về lò đào tạo võ sĩ chuyên nghiệp hàng đầu TP.HCM.', content: '', author: 'MMAVN', publishedAt: '2026-08-25T11:00:00Z', category: 'gym-spotlight', coverImage: '/images/articles/a6.jpg', tags: ['Phòng tập', 'Vietnam Top Team'], relatedFighterIds: ['f1', 'f9'] }
];

// 9. HELPER FUNCTIONS
export const getFighterById = (id: string) => fighters.find(f => f.id === id);
export const getEventById = (id: string) => events.find(e => e.id === id);
export const getFightersByDivision = (divisionId: string) => fighters.filter(f => f.divisionId === divisionId);
export const getFightersByGym = (gymId: string) => fighters.filter(f => f.gymId === gymId);
export const getUpcomingEvents = () => events.filter(e => e.status === 'upcoming').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
export const getCompletedEvents = () => events.filter(e => e.status === 'completed').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
export const getRankingsByDivision = (divisionId: string) => rankings.filter(r => r.divisionId === divisionId).sort((a, b) => a.position - b.position);
export const getArticlesByCategory = (category: string) => articles.filter(a => a.category === category).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
export const compareFighters = (id1: string, id2: string) => ({ fighter1: getFighterById(id1), fighter2: getFighterById(id2) });
export const searchFighters = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return fighters.filter(f => f.name.toLowerCase().includes(lowerQuery) || (f.nickname && f.nickname.toLowerCase().includes(lowerQuery)));
};
export function getDivisionById(id: string): Division | undefined {
  return divisions.find(d => d.id === id);
}
export function getGymById(id: string): Gym | undefined {
  return gyms.find(g => g.id === id);
}
export function getPromotionById(id: string): Promotion | undefined {
  return promotions.find(p => p.id === id);
}
export function getFightsByEventId(eventId: string): Fight[] {
  return fights.filter(f => f.eventId === eventId);
}
export function getFighterFights(fighterId: string): Fight[] {
  return fights.filter(f => f.fighter1Id === fighterId || f.fighter2Id === fighterId);
}

// 10. TECHNIQUES
export const techniques: Technique[] = [
  // --- Striking ---
  {
    id: 'tech-head-kick',
    name: 'Head Kick (Đá Cao)',
    nameVi: 'Cú đá cao vòng cầu vào đầu (High Kick / Head Kick)',
    category: 'striking',
    difficulty: 'Nâng cao',
    description: 'Kỹ thuật tung đòn chân vươn tới vùng thái dương, quai hàm hoặc cổ của đối phương từ góc khuất thị giác. Đây là một trong những đòn dứt điểm knockout mãn nhãn và có sức hủy diệt lớn nhất trong MMA.',
    executionSteps: [
      'Vào thế tấn cân bằng, ngụy trang bằng cú chọc nhử (Jab) hoặc cú đá thấp (Calf Kick).',
      'Xoay mũi bàn chân trụ ra ngoài góc khoảng 90 - 135 độ, xoay hông tối đa để dồn toàn bộ trọng lượng cơ thể vào cú đá.',
      'Vung cánh tay cùng phía với chân đá ra sau để tạo đà quán tính và giữ thăng bằng, tay còn lại che sát thái dương và cằm.',
      'Tiếp xúc mục tiêu bằng phần dưới của ống đồng (cẳng chân) thay vì mu bàn chân để tối đa hóa lực va chạm.',
      'Thu hồi chân nhanh chóng trở về thế thủ cân bằng tránh bị đối phương bắt chân quật ngã.'
    ],
    keyPoints: [
      'Xoay hông là yếu tố quyết định 80% lực phát ra của cú đá.',
      'Luôn luôn che chắn cằm bằng vai và tay còn lại.',
      'Tạo nhịp đòn đánh bất ngờ, tránh ra đòn khi đối thủ đang tập trung cao độ quan sát chân.'
    ],
    counters: [
      'Thụt lùi né đòn (Lean back) hoặc cúi luồn (Duck under).',
      'Dùng cẳng tay hai lớp (Double arm block) che chắn chặt chẽ.',
      'Bắt chân (Catch the kick) rồi lập tức quét chân trụ quật ngã.'
    ],
    commonMistakes: [
      'Không xoay chân trụ khiến cú đá bị gò bó lực và dễ chấn thương khớp gối.',
      'Hạ tay phòng thủ làm hở toàn bộ phần mặt trước cú phản đòn của đối thủ.'
    ],
    notableFighters: [
      {
        fighterId: 'f2',
        fighterName: 'Nguyễn Trần Duy Nhất',
        highlight: 'Cú đá cao chân trái sấm sét mang thương hiệu "Độc cô cầu bại", từng knockout nhiều đối thủ tại đấu trường LION Championship và quốc tế.'
      },
      {
        fighterId: 'f12',
        fighterName: 'Lý Hoàng',
        highlight: 'Sở trường đá cao bất ngờ từ thế đảo chân (switch kick) với tốc độ chớp nhoáng.'
      }
    ]
  },
  {
    id: 'tech-overhand-right',
    name: 'Overhand Right (Đấm Móc Vòng)',
    nameVi: 'Cú đấm móc vòng qua đầu (Overhand Right)',
    category: 'striking',
    difficulty: 'Cơ bản',
    description: 'Đòn đấm vòng qua tay phòng thủ của đối phương theo quỹ đạo vòng cung hướng xuống, tận dụng sức nặng cơ thể và đà xoay của vai để tạo nên cú đấm knock-out một phát đo ván.',
    executionSteps: [
      'Hạ thấp đầu và hơi nghiêng người sang phía tay trước (tránh tầm đấm thẳng của đối thủ).',
      'Đạp mạnh chân sau, xoay gót chân, hông và vai cùng lúc theo chiều kim đồng hồ.',
      'Vung tay sau vòng qua đỉnh găng tay che chắn của đối thủ, cổ tay hơi cụp xuống để điểm tiếp xúc là hai đốt ngón tay đầu.',
      'Đầu gối khuỵu thấp tạo độ vững chắc khi va chạm mục tiêu.'
    ],
    keyPoints: [
      'Đầu phải lệch khỏi trục trung tâm (off the centerline) để không bị ăn đòn thẳng.',
      'Không vung tay quá rộng khiến đối phương dễ dàng nhận biết và né tránh.',
      'Có thể cài cắm sau một cú chọc nhử hoặc sau pha giả vờ lao vào quật ngã (faked takedown).'
    ],
    counters: [
      'Bước lùi thẳng cự ly hoặc bước chéo sang phải.',
      'Cú đấm xúc (Uppercut) phản công ngay khi đối thủ cúi người.',
      'Hạ thấp người lao vào bắt hai chân (Double Leg Takedown).'
    ],
    commonMistakes: [
      'Mất thăng bằng ngã chúi người về phía trước nếu đòn đấm trượt đích.',
      'Nhắm mắt khi tung đòn khiến mất phương hướng phản ứng tiếp theo.'
    ],
    notableFighters: [
      {
        fighterId: 'f1',
        fighterName: 'Trần Quang Lộc',
        highlight: 'Vũ khí knock-out đáng sợ nhất của cựu vương LION 70kg, tận dụng đà né đòn rồi quăng quả overhand sấm sét.'
      },
      {
        fighterId: 'f10',
        fighterName: 'Bùi Đức Anh',
        highlight: 'Tận dụng thể hình đầm chắc để quăng cú overhand búa bổ đè bẹp phòng ngự.'
      }
    ]
  },
  {
    id: 'tech-spinning-back-kick',
    name: 'Spinning Back Kick (Đá Xoay Sau)',
    nameVi: 'Cú đạp gót xoay người sau (Spinning Back Kick)',
    category: 'striking',
    difficulty: 'Nâng cao',
    description: 'Kỹ thuật xoay người 360 độ đầy bất ngờ để phóng gót chân trực diện vào ngực hoặc mạng sườn đối thủ, tạo ra lực đẩy cực mạnh có khả năng gây khó thở hoặc gãy xương sườn ngay lập tức.',
    executionSteps: [
      'Bước chân trước chéo qua trục đối thủ để tạo góc xoay mượt mà.',
      'Xoay đầu và thân trên trước, mắt nhìn thấy mục tiêu qua vai trước khi bung đòn chân.',
      'Co gối chân sau sát ngực rồi đạp thẳng gót chân ra phía sau như một chiếc pít-tông.',
      'Gót chân tiếp xúc vào vùng chấn thủy hoặc mạn sườn đối phương.',
      'Thu chân nhanh và xoay người trở lại tư thế bảo vệ.'
    ],
    keyPoints: [
      'Tốc độ xoay đầu quyết định độ chính xác của cú đá.',
      'Đường đạp chân phải đi thẳng theo một đường chỉ, không đá quạt vòng tròn.',
      'Thời điểm ra đòn tốt nhất là khi đối thủ đang bước tới gây áp lực.'
    ],
    counters: [
      'Chủ động bước chéo áp sát góc mù của đối thủ khi họ vừa bắt đầu xoay lưng.',
      'Lao vào ôm ghì (Clinch) hoặc ôm hông quật ngã từ phía sau.'
    ],
    commonMistakes: [
      'Đá mù khi chưa kịp nhìn thấy đối thủ qua vai.',
      'Quay lưng quá lâu tạo cơ hội cho đối phương nhảy lên ôm cổ bắt đòn khóa.'
    ],
    notableFighters: [
      {
        fighterId: 'f6',
        fighterName: 'Hoàng Hữu Thái',
        highlight: 'Vận dụng tinh hoa đòn chân Vovinam vào lồng bát giác tạo nên những pha ra đòn ngoạn mục.'
      },
      {
        fighterId: 'f13',
        fighterName: 'Mai Khắc Tuấn',
        highlight: 'Thường xuyên gài đòn xoay người phản công khi đối thủ hung hãn dồn ép.'
      }
    ]
  },
  {
    id: 'tech-liver-shot',
    name: 'Liver Shot (Đấm Móc Gan)',
    nameVi: 'Cú đấm móc mạn sườn gan (Left Hook to the Body / Liver Shot)',
    category: 'striking',
    difficulty: 'Cơ bản',
    description: 'Đòn đấm móc tay trái nhắm thẳng vào vùng hạ sườn phải của đối phương (nơi đặt lá gan). Khi trúng đòn, xung lực gây co thắt cơ hoành và sốc hệ thần kinh tự chủ khiến đối thủ tê liệt và quỵ xuống sàn.',
    executionSteps: [
      'Gài đòn bằng cách nhá đòn đấm thẳng lên đầu để đối thủ nâng cao tay thủ.',
      'Hơi khuỵu gối trái và chuyển trọng tâm sang chân trước góc 45 độ.',
      'Tung cú hook tay trái xéo góc từ dưới lên chếch vào vùng sườn dưới xương sườn số 9-10 của đối thủ.',
      'Xoay hông và vai trái tạo lực chèn ép sâu vào bên trong nội tạng.',
      'Thu tay trái về cằm ngay lập tức.'
    ],
    keyPoints: [
      'Góc đấm phải xiên chéo khoảng 45 độ chứ không chỉ là đấm ngang sườn.',
      'Sự thư giãn trước khi va chạm giúp đòn đấm xuyên sâu vào mô cơ.',
      'Đặc biệt hiệu quả khi đối thủ thở dốc hoặc hở tay thủ sườn.'
    ],
    counters: [
      'Hạ thấp cùi chỏ phải ép sát sườn che chắn (Elbow block).',
      'Bước lùi hoặc tung cú đấm thẳng phải phản công.'
    ],
    commonMistakes: [
      'Đấm quá nông hoặc nhắm quá cao vào ngực thay vì vùng gan.',
      'Hạ tay phải phòng thủ làm lộ cằm trước cú móc trái của đối phương.'
    ],
    notableFighters: [
      {
        fighterId: 'f8',
        fighterName: 'Võ Thành Đạt',
        highlight: 'Sở hữu những cú móc sườn gan uy lực từ nền tảng Kickboxing khiến đối phương khuỵu gối tức thì.'
      },
      {
        fighterId: 'f15',
        fighterName: 'Đoàn Thanh Lâm',
        highlight: 'Sức mạnh đòn đấm hạng nặng làm vỡ lá chắn sườn đối thủ chỉ sau vài pha chạm.'
      }
    ]
  },
  {
    id: 'tech-calf-kick',
    name: 'Calf Kick (Đá Bắp Chuối)',
    nameVi: 'Cú đá tầm thấp vào mép bắp chân (Low Calf Kick)',
    category: 'striking',
    difficulty: 'Cơ bản',
    description: 'Cú đá nhắm vào dây thần kinh mác (peroneal nerve) ở ngoài cẳng chân đối phương. Đòn đá này làm giảm khả năng di chuyển, hạn chế sức bật và có thể làm liệt tạm thời chân trụ của đối thủ.',
    executionSteps: [
      'Giữ cự ly an toàn ngoài tầm đấm của đối phương.',
      'Bước chân trụ chéo nhẹ sang một bên tạo góc đá an toàn.',
      'Quất cẳng chân theo quỹ đạo thấp và ngang nhắm vào phần thịt bắp chân ngoài đối thủ.',
      'Rút chân về thần tốc trước khi đối thủ kịp phản xạ đấm thẳng.'
    ],
    keyPoints: [
      'Cự ly thi triển xa hơn low kick đùi truyền thống nên độ an toàn cao hơn.',
      'Ống đồng tiếp xúc dứt khoát như một nhát chém.',
      'Tập trung tích lũy sát thương qua từng hiệp đấu.'
    ],
    counters: [
      'Xoay mũi chân ra ngoài để dùng xương ống đồng đón đỡ (Check the kick).',
      'Rút chân trước về né đòn rồi phản công bằng đấm thẳng.',
      'Đổi thế đứng (Switch stance) để bảo vệ chân bị thương tích.'
    ],
    commonMistakes: [
      'Đá vào phần xương ống đồng của đối phương gây gãy hoặc tổn thương chân mình.',
      'Đứng quá gần khiến đòn đá thiếu lực và dễ bị đấm trúng mặt.'
    ],
    notableFighters: [
      {
        fighterId: 'f2',
        fighterName: 'Nguyễn Trần Duy Nhất',
        highlight: 'Kỹ thuật triệt hạ chân trụ đối thủ ngay từ hiệp 1 bằng ống đồng tôi luyện cứng như thép.'
      },
      {
        fighterId: 'f5',
        fighterName: 'Lê Văn Tuấn',
        highlight: 'Tích cực dùng calf kick để bào mòn thể lực và hạn chế khả năng áp sát của các võ sĩ địa chiến.'
      }
    ]
  },

  // --- Wrestling & Takedowns ---
  {
    id: 'tech-sanshou-takedown',
    name: 'Tán Thủ Takedown (Bắt Chân Quật Ngã)',
    nameVi: 'Đòn bắt chân quật ngã đặc trưng Tán Thủ (Sanshou Catch & Sweep)',
    category: 'wrestling',
    difficulty: 'Nâng cao',
    description: 'Đòn đón bắt cú đá của đối thủ (đá sườn hoặc đá quét), dùng cùi chỏ và cánh tay kẹp chặt chân đối phương rồi lập tức phối hợp gài chân trụ hoặc đẩy thân trên để quật ngã đối thủ ra sàn.',
    executionSteps: [
      'Khi đối phương tung đòn đá, chủ động đón nhận bằng cách hóp bụng giảm chấn động và luồn cánh tay dưới cẳng chân đối thủ.',
      'Kẹp chặt cổ chân hoặc gối đối thủ sát vào sườn hông.',
      'Nhanh chóng bước chân vào sâu áp sát chân trụ còn lại của đối phương.',
      'Một tay đẩy vai hoặc ngực đối thủ ra sau, đồng thời chân quét hoặc cài gót chân trụ đối thủ.',
      'Đè người kiểm soát đối phương khi họ vừa ngã chạm sàn.'
    ],
    keyPoints: [
      'Phản xạ bắt chân phải tính bằng phần mười giây; không chần chừ do dự.',
      'Phải triển khai đòn quét ngã ngay lập tức, không ôm chân đứng yên để tránh bị đấm phản hồi.',
      'Giữ thế thăng bằng vững vàng của bản thân khi bắt chân đối phương.'
    ],
    counters: [
      'Lao tới ôm chặt cổ đối thủ (Collar Tie) kéo ghì xuống triệt tiêu đà quét.',
      'Tung cú đấm thẳng bằng tay còn lại khi chân bị bắt.',
      'Nhảy lò cò chân trụ xoay người thoát đòn.'
    ],
    commonMistakes: [
      'Dùng bàn tay chộp bắt thay vì dùng cả cẳng tay và sườn kẹp giữ.',
      'Đứng im sau khi bắt chân tạo điều kiện cho đối thủ tung đòn đấm vào mặt.'
    ],
    notableFighters: [
      {
        fighterId: 'f1',
        fighterName: 'Trần Quang Lộc',
        highlight: 'Bậc thầy Tán thủ Việt Nam với phản xạ bắt đòn đá đối phương chỉ trong tích tắc và quật ngã không tốn sức.'
      }
    ]
  },
  {
    id: 'tech-double-leg-takedown',
    name: 'Double Leg Takedown (Vật Hai Chân)',
    nameVi: 'Quật ngã túm hai chân (Double Leg Takedown)',
    category: 'wrestling',
    difficulty: 'Cơ bản',
    description: 'Kỹ thuật quật ngã nền tảng và phổ biến nhất trong Wrestling và MMA: võ sĩ hạ thấp trọng tâm, lao xuyên qua hông đối thủ, hai tay ôm sau hai khoeo gối rồi dùng vai húc đẩy đối phương ngã ngửa ra sàn.',
    executionSteps: [
      'Gài đòn bằng cú đấm nhá (Setup punch) để đối thủ giơ tay thủ lên cao.',
      'Hạ thấp trọng tâm (Level change) bằng cách khuỵu gối, giữ lưng thẳng.',
      'Bước bước xuyên phá (Penetration step) đưa đầu gối chân trước chạm sàn giữa hai chân đối thủ.',
      'Hai tay ôm chặt sau hai khoeo gối, đầu ép chặt vào mạn sườn ngoài của đối phương.',
      'Đạp mạnh chân sau, đánh hông về phía trước và bẻ lái theo góc chéo để đưa đối thủ xuống thảm đấu.'
    ],
    keyPoints: [
      'Đầu luôn giữ cao tì vào mạn sườn đối thủ, tuyệt đối không cúi gằm đầu để tránh bị bắt Guillotine Choke.',
      'Lực bộc phát xuất phát từ cú đạp của chân sau và cú húc của cơ vai.',
      'Chuyển tiếp tức thì vào vị trí Side Control hoặc Mount khi đối thủ chạm sàn.'
    ],
    counters: [
      'Tư thế chống vật (Sprawl): bật hai chân về phía sau, đè toàn bộ trọng lượng hông và ngực lên lưng đối thủ.',
      'Đòn gối đón đầu (Intercepting knee) khi đối phương vừa cúi người lao vào.',
      'Bắt đòn khóa cổ máy chém (Guillotine Choke).'
    ],
    commonMistakes: [
      'Cúi gập lưng thay vì hạ thấp hông khiến đòn vật mất hoàn toàn lực đẩy.',
      'Lao vào từ cự ly quá xa khiến đối thủ dễ dàng nhận biết và sprawl đè bẹp.'
    ],
    notableFighters: [
      {
        fighterId: 'f3',
        fighterName: 'Phạm Văn Nam',
        highlight: 'Khả năng đổi tầng trọng tâm chớp nhoáng biến cú double leg thành thương hiệu thống trị hạng ruồi của "Nam Tốc Độ".'
      },
      {
        fighterId: 'f11',
        fighterName: 'Đỗ Văn Thành',
        highlight: 'Sức tì đè và quật ngã mãnh liệt xuất phát từ nền tảng Đấu vật tự do đỉnh cao.'
      }
    ]
  },
  {
    id: 'tech-single-leg-takedown',
    name: 'Single Leg Takedown (Vật Một Chân)',
    nameVi: 'Quật ngã túm một chân (Single Leg Takedown)',
    category: 'wrestling',
    difficulty: 'Cơ bản',
    description: 'Võ sĩ cô lập một bên chân đối thủ, kẹp chặt chân đó giữa hai đùi hoặc nhấc bổng lên cao rồi dùng các kỹ thuật xoay người, gạt chân hoặc ép lồng để đưa trận đấu xuống sàn.',
    executionSteps: [
      'Chớp thời cơ khi đối thủ bước chân trước tới hoặc sau khi né cú đấm.',
      'Hạ thấp hông, luồn hai tay ôm lấy phần đùi hoặc gối của một bên chân đối thủ.',
      'Kẹp chặt chân đối thủ vào giữa hai đùi của mình (High Crotch hoặc Low Single).',
      'Dùng trán tì vào ngực hoặc mạn sườn đối thủ tạo áp lực đòn bẩy.',
      'Xoay người theo vòng cung (Run the pipe) hoặc nhấc bổng chân đối thủ lên để quét chân còn lại.'
    ],
    keyPoints: [
      'Duy trì cột sống thẳng và giữ chặt chân đối thủ không để họ rút chân ra.',
      'Đầu luôn ở vị trí an toàn (trong ngực hoặc nách đối thủ) tránh bị ăn cùi chỏ.',
      'Liên tục di chuyển chân để triệt tiêu nỗ lực giữ thăng bằng của đối phương.'
    ],
    counters: [
      'Khoét nách đối phương (Whizzer) và đẩy đầu đối thủ ra ngoài.',
      'Dùng tay ấn đầu đối thủ xuống thảm rồi xoay người thoát chân.',
      'Nhảy chân trụ lùi lại và bám lồng bát giác.'
    ],
    commonMistakes: [
      'Để đầu ra phía ngoài tạo góc cho đối thủ tung đòn bắt khóa Guillotine.',
      'Đứng yên một chỗ sau khi ôm được chân đối phương.'
    ],
    notableFighters: [
      {
        fighterId: 'f3',
        fighterName: 'Phạm Văn Nam',
        highlight: 'Chuyển đổi mượt mà giữa các đòn đơn và đôi chân khi đối phương cố gắng bám lồng phòng thủ.'
      },
      {
        fighterId: 'f20',
        fighterName: 'Hoàng Tú',
        highlight: 'Kéo chân đối thủ vào thế địa chiến để lập tức triển khai chuỗi khóa siết BJJ điêu luyện.'
      }
    ]
  },
  {
    id: 'tech-hip-throw',
    name: 'Hip Toss / Harai Goshi (Quật Qua Hông)',
    nameVi: 'Quật ngã qua hông (Hip Throw / Harai Goshi)',
    category: 'wrestling',
    difficulty: 'Nâng cao',
    description: 'Kỹ thuật xoay hông chèn sát hông đối thủ trong thế áp sát ghì nhau (Clinch), dùng cánh tay khóa cổ hoặc nách để nhấc bổng và quật đối thủ bay qua lưng rơi xuống thảm đấu.',
    executionSteps: [
      'Trong thế ôm sát, chiếm được tay cài nách (Underhook) hoặc quàng tay qua gáy đối phương (Headlock).',
      'Bước chân chéo xoay người 180 độ, đặt hông mình thấp hơn hông của đối thủ.',
      'Kéo cánh tay đối thủ ép sát ngực, đồng thời ưỡn hông nhấc bổng đối thủ rời khỏi sàn.',
      'Xoay vai gập người về phía trước quăng đối thủ qua lưng.',
      'Tiếp đất ngay trong tư thế Kesa Gatame (Khống chế khăn quàng) hoặc Side Control.'
    ],
    keyPoints: [
      'Trọng tâm hông của bạn phải thấp hơn hông đối thủ thì đòn bẩy mới phát huy tác dụng.',
      'Động tác kéo tay và xoay hông phải diễn ra đồng thời.',
      'Đặc biệt nguy hiểm khi đối phương đang dồn lực đẩy bạn về phía sau.'
    ],
    counters: [
      'Hạ thấp hông lùi lại khi thấy đối thủ bắt đầu xoay người.',
      'Luồn tay ôm hông đối thủ từ phía sau (Take the back) khi họ xoay lưng.',
      'Đứng thẳng người và dùng đầu gối chặn sau mông đối phương.'
    ],
    commonMistakes: [
      'Không nhấc được hông đối thủ khiến bản thân bị đối thủ đè ngược từ phía sau.',
      'Hở lưng quá nhiều mà chưa kiểm soát được tay trên của đối phương.'
    ],
    notableFighters: [
      {
        fighterId: 'f4',
        fighterName: 'Nguyễn Thị Hằng',
        highlight: 'Cú quật hông dứt khoát trong cự ly ôm sát giúp cô nhanh chóng chiếm vị trí khống chế trên lưng đối thủ.'
      }
    ]
  },

  // --- Submissions ---
  {
    id: 'tech-rear-naked-choke',
    name: 'Rear-Naked Choke (RNC - Siết Cổ Sau)',
    nameVi: 'Khoá siết cổ từ phía sau (Rear-Naked Choke / Mata Leão)',
    category: 'submission',
    difficulty: 'Cơ bản',
    description: 'Thế khóa siết vĩ đại và có tỷ lệ kết liễu cao nhất trong lịch sử MMA: võ sĩ chiếm vị trí sau lưng (Back Mount), vòng cánh tay ôm trọn cổ đối thủ tạo thành hình số 4 ép chặt hai động mạch cảnh dẫn máu lên não.',
    executionSteps: [
      'Kiểm soát lưng đối thủ bằng hai móc chân (hooks) gài vào mặt trong đùi hoặc khóa thân (Body Triangle).',
      'Luồn cánh tay siết qua dưới cằm đối thủ, sao cho cùi chỏ thẳng hàng với tâm cằm.',
      'Bàn tay siết nắm lấy bắp tay (Bicep) của cánh tay còn lại.',
      'Bàn tay phụ giấu ra sau đầu đối thủ để tránh bị đối phương nắm kéo gỡ.',
      'Hít sâu ưỡn ngực, khép chặt hai cùi chỏ và siết đều lực cho đến khi đối thủ xin hàng (Tap out).'
    ],
    keyPoints: [
      'Cánh tay phải luồn thật sâu dưới cằm, không siết lên mặt hay quai hàm.',
      'Dùng cằm của mình tì chặt vào vai đối thủ để cố định góc đầu.',
      'Giữ bình tĩnh không bung lực giật cục, siết đều đặn tạo áp lực nghẹt thở.'
    ],
    counters: [
      'Dùng hai tay nắm chặt cổ tay tấn công của đối thủ (Fight the hands) trước khi nó khóa kín.',
      'Hạ cằm ép sát ngực không cho cánh tay luồn qua.',
      'Trượt hông ra khỏi hai móc chân để xoay người vào lại thế Guard.'
    ],
    commonMistakes: [
      'Không khóa được móc chân khiến đối phương dễ dàng xoay người thoát ra.',
      'Để lộ bàn tay phụ phía trước cho đối thủ túm bẻ ngón tay hoặc gỡ đòn.'
    ],
    notableFighters: [
      {
        fighterId: 'f3',
        fighterName: 'Phạm Văn Nam',
        highlight: 'Kỹ năng leo lưng và khóa RNC thần tốc từng mang lại đai vô địch hạng ruồi LION Championship.'
      },
      {
        fighterId: 'f20',
        fighterName: 'Hoàng Tú',
        highlight: 'Thợ săn submission với 10 chiến thắng bằng các thế khóa nghẹt thở trên sàn đấu chuyên nghiệp.'
      }
    ]
  },
  {
    id: 'tech-armbar',
    name: 'Armbar (Bẻ Khớp Khuỷu Tay)',
    nameVi: 'Khoá bẻ khớp tay (Armbar / Juji Gatame)',
    category: 'submission',
    difficulty: 'Cơ bản',
    description: 'Kỹ thuật cô lập một cánh tay của đối thủ giữa hai đùi, dùng khớp háng và xương mu làm điểm tựa đòn bẩy để bẻ ngược khớp khuỷu tay theo chiều ngược giải phẫu, buộc đối phương lập tức xin hàng.',
    executionSteps: [
      'Từ tư thế Closed Guard hoặc Mount, khống chế cổ tay và cùi chỏ của đối phương kéo chéo qua ngực.',
      'Xoay hông vuông góc 90 độ so với thân người đối thủ.',
      'Vung một chân qua đầu đối phương để đè cổ và mặt đối thủ xuống sàn đấu.',
      'Kẹp chặt hai đầu gối lại với nhau để cố định khớp vai đối thủ.',
      'Hai tay giữ chặt cổ tay đối phương sao cho ngón cái chỉ thẳng lên trần nhà, từ từ nâng hông lên cao để tạo áp lực bẻ khớp.'
    ],
    keyPoints: [
      'Ngón cái đối thủ hướng lên trần nhà là yếu tố bắt buộc để bẻ gãy khớp đúng chiều.',
      'Hai đầu gối phải khép chặt, không để hở khoảng trống cho đối thủ rút cùi chỏ về.',
      'Nâng hông chậm rãi và kiểm soát lực để tránh gây gãy tay đối phương trước khi trọng tài can thiệp.'
    ],
    counters: [
      'Khóa chặt hai tay vào nhau (Grip defense: Gable grip hoặc bắt bắp tay) chống bị duỗi tay.',
      'Xoay người lao tới đè nặng lên ngực đối thủ (Stack defense).',
      'Rút cùi chỏ ra ngoài trước khi đối thủ kịp vắt chân qua đầu.'
    ],
    commonMistakes: [
      'Đầu gối mở rộng khiến đối phương dễ dàng giật mạnh tay thoát ra.',
      'Không khống chế được tư thế ngón cái khiến góc bẻ bị trượt khỏi khớp.'
    ],
    notableFighters: [
      {
        fighterId: 'f4',
        fighterName: 'Nguyễn Thị Hằng',
        highlight: 'Nhà vô địch BJJ thể hiện kỹ thuật bẻ tay hoàn hảo ngay từ thế nằm dưới (Closed Guard).'
      },
      {
        fighterId: 'f7',
        fighterName: 'Đặng Yến Nhi',
        highlight: 'Phản xạ bắt tay đối phương khi họ sơ hở trong lúc giã đòn Ground and Pound.'
      }
    ]
  },
  {
    id: 'tech-guillotine-choke',
    name: 'Guillotine Choke (Khoá Máy Chém)',
    nameVi: 'Khoá siết máy chém (Guillotine Choke)',
    category: 'submission',
    difficulty: 'Nâng cao',
    description: 'Đòn phản công siết cổ kinh điển khi đối thủ cúi thấp người hoặc lao vào quật ngã; võ sĩ quàng cánh tay qua trước cổ và ép nách kẹp đầu đối phương, kết hợp dùng hai chân khóa kín bụng để bóp nghẹt khí quản và mạch máu.',
    executionSteps: [
      'Khi đối phương cúi người lao vào vật, quàng cánh tay vòng qua trước cổ đối thủ.',
      'Kéo cạnh xương cẳng tay áp sát vào khí quản hoặc động mạch cổ đối phương.',
      'Tay còn lại chắp vào cổ tay hoặc bàn tay siết (Gable grip hoặc High-elbow Marcelotine).',
      'Ngả người ra sau kéo đối thủ vào thế Closed Guard, dùng hai chân khóa chặt quanh eo đối phương.',
      'Ưỡn hông về phía trước và gập người theo hướng cẳng tay siết để tạo lực bóp nghẹt cực đại.'
    ],
    keyPoints: [
      'Nâng cao cùi chỏ của cánh tay siết (High Elbow) giúp tăng áp lực siết lên gấp đôi.',
      'Hai chân phải khóa kín quanh eo (Closed Guard) để ngăn đối thủ nhảy qua Side Control thoát đòn.',
      'Đòn đánh có thể thi triển cả ở tư thế đứng (Standing Guillotine) hoặc khi nằm sàn.'
    ],
    counters: [
      'Lập tức nhảy người sang phía đối diện với cánh tay siết (Vào Side Control) để hóa giải góc siết.',
      'Dùng tay tì vào cùi chỏ đối phương đẩy lên (Von Flue counter choke).',
      'Dùng cằm ghìm chặt vào ngực đối thủ và ưỡn hông giải phóng khí quản.'
    ],
    commonMistakes: [
      'Để đối thủ nhảy sang Side Control khiến bản thân rơi vào thế nguy hiểm bị siết ngược.',
      'Dùng lực cơ tay giật kéo thay vì dùng lực toàn bộ cơ thể và hông để nén ép.'
    ],
    notableFighters: [
      {
        fighterId: 'f20',
        fighterName: 'Hoàng Tú',
        highlight: 'Cái bẫy chết người dành cho bất kỳ đối thủ nào liều lĩnh lao vào quật ngã mà cúi đầu quá thấp.'
      },
      {
        fighterId: 'f16',
        fighterName: 'Vũ Minh Hiếu',
        highlight: 'Sở trường khóa Guillotine đứng (standing guillotine) khi ép đối thủ vào góc lồng.'
      }
    ]
  },
  {
    id: 'tech-triangle-choke',
    name: 'Triangle Choke (Khoá Siết Tam Giác)',
    nameVi: 'Khoá siết tam giác bằng chân (Triangle Choke / Sankaku-Jime)',
    category: 'submission',
    difficulty: 'Nâng cao',
    description: 'Kỹ thuật khóa siết thực hiện từ thế nằm dưới (Guard), dùng hai chân bắt chéo tạo thành hình tam giác kẹp một tay và cổ của đối thủ, lấy chính vai của đối phương ép vào một bên động mạch cổ trong khi đùi của mình ép vào bên còn lại.',
    executionSteps: [
      'Từ thế Guard, đẩy một tay đối thủ ra ngoài trong khi tay còn lại bị kẹp lại bên trong (1 Arm In, 1 Arm Out).',
      'Bật hông cao, phóng chân qua vai đối thủ gài khoeo gối vào gáy đối phương.',
      'Đẩy cánh tay bị kẹp của đối thủ vắt ngang qua cổ họ.',
      'Gập cẳng chân đối diện khóa chặt lên trên cổ chân thứ nhất tạo thành hình tam giác cân.',
      'Kéo đầu đối thủ xuống, đồng thời nhấc hông lên cao để hoàn tất việc siết nghẹt động mạch.'
    ],
    keyPoints: [
      'Tạo góc nghiêng 45-90 độ so với đối thủ thay vì nằm thẳng hàng giúp khóa siết chặt hơn nhiều lần.',
      'Cánh tay đối thủ bắt buộc phải vắt ngang qua cổ, nếu cánh tay nằm dọc thì góc siết sẽ bị hở.',
      'Có thể kết hợp bẻ tay Armbar ngay trong khi đang siết Triangle Choke.'
    ],
    counters: [
      'Đứng thẳng người dựng cột sống (Posture up) không cho đối thủ kéo đầu xuống.',
      'Nhấc bổng đối thủ lên khỏi thảm rồi dập mạnh xuống sàn (Slam).',
      'Luồn tay còn lại vào trong để giấu cổ (Hide the neck).'
    ],
    commonMistakes: [
      'Khóa tam giác quanh bàn chân thay vì quanh khoeo gối làm giảm áp lực và đau cổ chân mình.',
      'Nằm thẳng hàng với đối thủ khiến việc khóa chân bị căng cơ và khó khép kín.'
    ],
    notableFighters: [
      {
        fighterId: 'f7',
        fighterName: 'Đặng Yến Nhi',
        highlight: 'Khả năng linh hoạt của đôi chân giúp cô khóa chặt đối thủ và dứt điểm bất ngờ.'
      },
      {
        fighterId: 'f4',
        fighterName: 'Nguyễn Thị Hằng',
        highlight: 'Kỹ năng chuyển tiếp mượt mà giữa Triangle Choke và Armbar.'
      }
    ]
  },
  {
    id: 'tech-kimura-lock',
    name: 'Kimura Lock (Khoá Khớp Vai)',
    nameVi: 'Khoá bẻ khớp vai Kimura (Kimura Lock / Double Wristlock)',
    category: 'submission',
    difficulty: 'Cơ bản',
    description: 'Đòn đòn bẩy hai tay ôm khóa cẳng tay đối thủ theo góc vuông 90 độ, xoay ngược cánh tay về phía sau lưng gây áp lực cực đại lên khớp vai và khớp khuỷu tay buộc đối phương phải chịu thua.',
    executionSteps: [
      'Từ Closed Guard, Half Guard hoặc Side Control, bắt lấy cổ tay cùng phía của đối thủ.',
      'Vòng cánh tay còn lại qua nách đối thủ và chộp lấy cổ tay của chính mình (Hình số 4).',
      'Giữ cánh tay đối thủ gập đúng góc 90 độ.',
      'Dùng toàn bộ trọng lượng thân trên đè giữ người đối thủ không cho lộn vòng thoát hiểm.',
      'Từ từ đẩy cổ tay đối thủ về phía gáy và sau lưng họ cho tới khi họ đập tay xin hàng.'
    ],
    keyPoints: [
      'Cánh tay đối thủ phải duy trì góc 90 độ; nếu tay duỗi thẳng đòn bẩy sẽ mất tác dụng.',
      'Xoay cả thân trên của mình chứ không chỉ dùng lực của hai cánh tay.',
      'Kimura còn là công cụ tuyệt vời để lật người (Kimura sweep) hoặc chuyển sang Back Mount.'
    ],
    counters: [
      'Duỗi thẳng cánh tay thoát góc vuông trước khi đòn khóa được chốt.',
      'Túm lấy đùi trong hoặc quần của mình để chống lại lực xoay.',
      'Lộn nhào qua người đối thủ (Re-roll) để giải phóng khớp vai.'
    ],
    commonMistakes: [
      'Để cánh tay đối thủ duỗi thẳng ra ngoài làm mất thế đòn bẩy.',
      'Không kiểm soát hông đối thủ để họ lộn vòng thoát ra ngoài.'
    ],
    notableFighters: [
      {
        fighterId: 'f20',
        fighterName: 'Hoàng Tú',
        highlight: 'Đòn bẩy kinh điển dùng để đảo thế hoặc bẻ cong cánh tay đối thủ từ Half Guard.'
      },
      {
        fighterId: 'f11',
        fighterName: 'Đỗ Văn Thành',
        highlight: 'Sử dụng sức mạnh vai và tay để kiểm soát đối thủ khi địa chiến.'
      }
    ]
  },

  // --- Clinch ---
  {
    id: 'tech-thai-clinch',
    name: 'Thai Clinch & Knee Strikes (Ôm Ghì & Lên Gối)',
    nameVi: 'Ôm ghì Muay Thai (Plum) & Liên hoàn đòn gối',
    category: 'clinch',
    difficulty: 'Cơ bản',
    description: 'Kỹ thuật ôm ghì áp sát tối thượng của Muay Thai trong MMA: võ sĩ áp chặt hai bàn tay lên đỉnh đầu và gáy đối thủ, khép kín cùi chỏ khống chế hướng quay đầu, đồng thời bẻ lái đối phương để tung các đòn gối liên hoàn vào bụng và mặt.',
    executionSteps: [
      'Luồn hai cánh tay vào bên trong tay đối thủ (Inside collar control).',
      'Úp hai lòng bàn tay chồng lên nhau ở đỉnh gáy đối phương (không đan các ngón tay để tránh chấn thương ngón).',
      'Khép chặt hai cùi chỏ tì vào xương quai xanh đối thủ, dùng sức nặng kéo gập đầu đối thủ xuống.',
      'Xoay chuyển hướng thân người đối thủ liên tục để phá chân trụ của họ.',
      'Nhón chân trụ, đẩy hông về phía trước và phóng đầu gối thẳng vào ngực, bụng hoặc cằm đối thủ.'
    ],
    keyPoints: [
      'Khép cùi chỏ là chìa khóa để khống chế đòn đấm của đối thủ và bẻ lái cơ thể họ.',
      'Không đan ngón tay vào nhau vì găng MMA sẽ làm cộm và dễ bị bẻ gãy ngón.',
      'Đẩy hông về phía trước khi lên gối để tạo lực xuyên tâm.'
    ],
    counters: [
      'Luồn tay vào nách đối thủ (Double Underhooks) rồi nhấc bổng quật ngã.',
      'Dùng cùi chỏ đánh xéo vào giữa hai tay đối thủ (Cut through elbow).',
      'Đưa một tay chặn ngang cằm đẩy mạnh đầu đối thủ ra xa.'
    ],
    commonMistakes: [
      'Kéo đầu đối thủ thẳng xuống mà không khép cùi chỏ, tạo điều kiện cho đối thủ đấm móc vào sườn.',
      'Đứng bằng cả bàn chân phẳng lì làm giảm tầm vươn và lực của đòn gối.'
    ],
    notableFighters: [
      {
        fighterId: 'f2',
        fighterName: 'Nguyễn Trần Duy Nhất',
        highlight: 'Nghệ thuật khống chế gáy và bẻ lái đối thủ để tung đòn gối bay trúng đích đầy biến hóa.'
      },
      {
        fighterId: 'f13',
        fighterName: 'Mai Khắc Tuấn',
        highlight: 'Uy lực từ các đòn gối thúc thẳng vào bụng trong cự ly ôm sát làm suy kiệt buồng phổi đối phương.'
      }
    ]
  },
  {
    id: 'tech-collar-tie-dirty-boxing',
    name: 'Collar Tie & Dirty Boxing (Kẹp Cổ & Đấm Cận Chiến)',
    nameVi: 'Kẹp cổ khống chế & Đấm đối kháng cự ly hẹp (Dirty Boxing)',
    category: 'clinch',
    difficulty: 'Cơ bản',
    description: 'Một tay dùng lòng bàn tay giữ chặt gáy đối thủ (Collar Tie) để kéo ghì và phá thăng bằng, tay còn lại liên tục tung các cú đấm uppercut, hook ngắn và cùi chỏ uy lực trong cự ly ôm sát không có không gian né tránh.',
    executionSteps: [
      'Dùng tay thuận hoặc tay trước chộp chặt sau gáy đối thủ, cẳng tay tì vào xương đòn của họ.',
      'Dùng trán hoặc thái dương của mình tựa vào đầu đối thủ để hạn chế tầm nhìn và không gian ra đòn của họ.',
      'Tay còn lại mở góc vung những cú móc ngắn (Short hooks) vào sườn hoặc xúc (Uppercuts) vào cằm.',
      'Liên tục giật kéo đầu đối thủ sang trái phải để làm mất thăng bằng.',
      'Chủ động ngắt cự ly bằng cú đẩy hoặc đòn chỏ khi đối thủ phản kháng.'
    ],
    keyPoints: [
      'Đầu tựa vào đầu đối thủ giúp bạn tránh bị ăn cùi chỏ phản đòn.',
      'Chân luôn ở tư thế vững chãi sẵn sàng chống lại nỗ lực vật của đối thủ.',
      'Đòn đấm ngắn nhưng xoay hông tối đa để tạo lực chấn động.'
    ],
    counters: [
      'Dùng tay đối diện gạt mạnh cùi chỏ tay Collar Tie của đối phương.',
      'Hạ thấp trọng tâm chui dưới cánh tay lao vào bắt hai chân.',
      'Bắt tay áo/cổ tay đối phương kéo gập vào trong.'
    ],
    commonMistakes: [
      'Đứng thẳng người để lộ phần bụng dưới trước đòn gối của đối thủ.',
      'Chỉ lo đấm mà không kiểm soát đầu đối thủ khiến họ dễ dàng đấm trả.'
    ],
    notableFighters: [
      {
        fighterId: 'f10',
        fighterName: 'Bùi Đức Anh',
        highlight: 'Một tay ghì chặt đầu đối phương, tay kia liên tiếp xả đòn uppercut và hook ngắn tàn phá.'
      },
      {
        fighterId: 'f18',
        fighterName: 'Phan Minh Tiến',
        highlight: 'Tận dụng thể hình vượt trội để đè gáy và nã đấm cự ly gần làm đối phương choáng váng.'
      }
    ]
  },
  {
    id: 'tech-underhooks-cage-control',
    name: 'Underhooks & Cage Control (Cài Tay Nách & Ép Lồng)',
    nameVi: 'Cài tay nách (Underhook) & Kiểm soát áp đài / ép lồng',
    category: 'clinch',
    difficulty: 'Nâng cao',
    description: 'Võ sĩ luồn tay xuống dưới nách đối thủ (Underhook), ép lưng đối thủ dính chặt vào thành lồng bát giác. Kỹ thuật này triệt tiêu hoàn toàn góc đánh của đối phương, bào mòn thể lực và mở ra cơ hội quật ngã hoặc giã đòn cự ly gần.',
    executionSteps: [
      'Lao vào áp sát, luồn một hoặc hai cánh tay sâu xuống dưới nách đối thủ, bàn tay giữ lấy cơ lưng sau của họ.',
      'Dùng ngực và vai đẩy dồn đối thủ tựa lưng hoàn toàn vào lưới lồng.',
      'Tì trán hoặc cằm vào hõm vai/cổ đối thủ để kiểm soát tư thế đầu của họ.',
      'Đặt hai chân rộng bằng vai, một chân gài giữa hai chân đối thủ chặn đường xoay thoát.',
      'Đè toàn bộ trọng lượng cơ thể lên người đối thủ kết hợp dặm chân (Foot stomps) và lên gối vào đùi.'
    ],
    keyPoints: [
      'Cánh tay Underhook phải nâng cao cùi chỏ đối phương lên để làm tê liệt sức mạnh tay đó của họ.',
      'Không để đối thủ xoay được lưng khỏi lưới lồng.',
      'Đổi góc liên tục để chuẩn bị cho cú quật ngã bằng chân (Trip takedown).'
    ],
    counters: [
      'Khoét nách đối phương (Whizzer) để bẻ góc tay underhook của họ.',
      'Quay mặt đối diện lồng và xoay hông luồn qua bên ngoài (Circle out).',
      'Dùng cùi chỏ chém vào mang tai đối thủ khi họ cúi đầu đè ép.'
    ],
    commonMistakes: [
      'Cài underhook quá lỏng để đối thủ luồn qua lưng mình.',
      'Chỉ ôm ép thụ động không ra đòn khiến trọng tài tách hai võ sĩ ra ngoài.'
    ],
    notableFighters: [
      {
        fighterId: 'f3',
        fighterName: 'Phạm Văn Nam',
        highlight: 'Bậc thầy ép lồng triệt tiêu thể lực đối phương trước khi chuyển tiếp sang đòn quật ngã uy lực.'
      },
      {
        fighterId: 'f11',
        fighterName: 'Đỗ Văn Thành',
        highlight: 'Khóa chặt 2 underhooks để khống chế hoàn toàn không gian và nhấc bổng đối thủ quật xuống sàn.'
      }
    ]
  },
  {
    id: 'tech-clinch-elbows',
    name: 'Elbows in Clinch (Đòn Chỏ Cận Chiến)',
    nameVi: 'Đòn cùi chỏ cắt trong thế ôm ghì (Clinch Elbows)',
    category: 'clinch',
    difficulty: 'Nâng cao',
    description: 'Tung các đòn cùi chỏ sắc bén với cự ly cực ngắn từ thế ôm sát (chỏ chém ngang, chỏ lật từ dưới lên, chỏ xoay). Do cùi chỏ là phần xương cứng và sắc nhọn, đòn đánh rất dễ gây rách da (cut) quanh vùng mắt, làm chảy máu cản trở thị giác hoặc knockout tức khắc.',
    executionSteps: [
      'Từ cự ly ôm sát hoặc khi vừa tách ra khỏi Clinch, tạo khoảng trống nhỏ bằng cách hơi đẩy vai đối thủ.',
      'Gập cùi chỏ tối đa tạo thành một góc nhọn xương sắc bén.',
      'Xoay hông và thân trên chém cùi chỏ theo đường chéo từ trên xuống hoặc từ dưới lên qua lông mày, gò má hoặc cằm đối thủ.',
      'Tay còn lại luôn che kín cằm đề phòng cú chỏ phản hồi.',
      'Lập tức thu tay về hoặc tiếp tục ôm ghì kiểm soát đối thủ.'
    ],
    keyPoints: [
      'Điểm tiếp xúc phải là đỉnh nhọn của xương cùi chỏ (Olecranon process).',
      'Đường chém phải dứt khoát như một nhát dao, tận dụng đà xoay của toàn bộ thân người.',
      'Hiệu quả cao nhất khi đối thủ đang cố gắng ôm vật hoặc sơ hở khi thoát Clinch.'
    ],
    counters: [
      'Khép chặt hai cánh tay che kín vùng đầu và thái dương (Ear muffs guard).',
      'Hạ thấp trọng tâm lao thẳng vào ôm hông đối thủ.',
      'Thụt lùi nhẹ đầu né góc chém rồi phản công bằng cú đấm thẳng.'
    ],
    commonMistakes: [
      'Vung tay quá rộng làm mất tốc độ và lực cắt của đòn chỏ.',
      'Quên phòng thủ tay còn lại khiến bản thân bị ăn đòn chỏ chéo phản hồi.'
    ],
    notableFighters: [
      {
        fighterId: 'f2',
        fighterName: 'Nguyễn Trần Duy Nhất',
        highlight: 'Các đòn chỏ chém và chỏ lật có độ chính xác tuyệt đối, dễ dàng gây vết cắt chảy máu đối thủ.'
      },
      {
        fighterId: 'f13',
        fighterName: 'Mai Khắc Tuấn',
        highlight: 'Vũ khí gây sát thương cực lớn khiến bác sĩ và trọng tài nhiều lần phải can thiệp dừng trận đấu sớm.'
      }
    ]
  }
];

// 11. TECHNIQUE HELPERS
export function getTechniqueById(id: string): Technique | undefined {
  return techniques.find(t => t.id === id);
}

export function getTechniquesByCategory(category: Technique['category']): Technique[] {
  return techniques.filter(t => t.category === category);
}

export function searchTechniques(query: string): Technique[] {
  const q = query.toLowerCase().trim();
  if (!q) return techniques;
  return techniques.filter(t => 
    t.name.toLowerCase().includes(q) ||
    t.nameVi.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.notableFighters.some(f => f.fighterName.toLowerCase().includes(q) || f.highlight.toLowerCase().includes(q))
  );
}

