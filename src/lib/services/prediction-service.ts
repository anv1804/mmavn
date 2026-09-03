import { FightPrediction, TopPredictor, VoteSubmission } from '@/types';
import { fights } from '@/data/mock-data';

// In-memory prediction store
const fightPredictionsStore: Map<string, FightPrediction> = new Map();

// Initial mock predictions for fights
const initialMockPredictions: Record<string, { f1Votes: number; f2Votes: number; koTko: number; submission: number; decision: number }> = {
  'ft20': { f1Votes: 986, f2Votes: 434, koTko: 58, submission: 22, decision: 20 },  // Trần Quang Lộc vs Võ Thành Đạt
  'ft21': { f1Votes: 1369, f2Votes: 481, koTko: 65, submission: 10, decision: 25 }, // Nguyễn Trần Duy Nhất vs Lê Văn Tuấn
  'ft22': { f1Votes: 598, f2Votes: 382, koTko: 24, submission: 56, decision: 20 },  // Phạm Văn Nam vs Lý Hoàng
  'ft23': { f1Votes: 538, f2Votes: 302, koTko: 15, submission: 62, decision: 23 },  // Nguyễn Thị Hằng vs Đặng Yến Nhi
  'ft24': { f1Votes: 322, f2Votes: 298, koTko: 46, submission: 18, decision: 36 },  // Vũ Minh Hiếu vs Mai Khắc Tuấn
  'ft25': { f1Votes: 250, f2Votes: 260, koTko: 18, submission: 37, decision: 45 },  // Trịnh Cát Tường vs Trương Mỹ Linh
  'ft26': { f1Votes: 1491, f2Votes: 609, koTko: 62, submission: 12, decision: 26 }, // Duy Nhất vs Đỗ Văn Thành
  'ft27': { f1Votes: 667, f2Votes: 483, koTko: 20, submission: 48, decision: 32 },  // Phạm Văn Nam vs Hoàng Tú
  'ft28': { f1Votes: 336, f2Votes: 394, koTko: 55, submission: 15, decision: 30 },  // Phan Minh Tiến vs Võ Thành Đạt
  'ft29': { f1Votes: 358, f2Votes: 282, koTko: 70, submission: 10, decision: 20 },  // Đoàn Thanh Lâm vs Bùi Đức Anh
  'ft30': { f1Votes: 427, f2Votes: 463, koTko: 48, submission: 32, decision: 20 },  // Tạ Văn Tuấn vs Lý Hoàng
  'ft31': { f1Votes: 147, f2Votes: 273, koTko: 25, submission: 45, decision: 30 },  // Nguyễn Tấn Đạt vs Đỗ Văn Thành
};

// Seed store
function initializeStore() {
  if (fightPredictionsStore.size > 0) return;

  for (const fight of fights) {
    const mock = initialMockPredictions[fight.id] || {
      f1Votes: 120,
      f2Votes: 80,
      koTko: 45,
      submission: 30,
      decision: 25,
    };

    const totalVotes = mock.f1Votes + mock.f2Votes;
    const f1Pct = Math.round((mock.f1Votes / totalVotes) * 100);
    const f2Pct = 100 - f1Pct;

    fightPredictionsStore.set(fight.id, {
      fightId: fight.id,
      totalVotes,
      fighter1Votes: mock.f1Votes,
      fighter2Votes: mock.f2Votes,
      fighter1Percentage: f1Pct,
      fighter2Percentage: f2Pct,
      methodBreakdown: {
        koTko: mock.koTko,
        submission: mock.submission,
        decision: mock.decision,
      },
    });
  }
}

// Top predictors leaderboard mock data
const mockLeaderboard: TopPredictor[] = [
  {
    rank: 1,
    id: 'u-1',
    name: 'Hoàng Long MMA',
    avatar: 'HL',
    points: 4850,
    accuracy: 88.5,
    correctCount: 46,
    totalCount: 52,
    beltTier: 'gold',
    beltName: 'Đai Vàng Vô Địch',
    badge: '👑 Độc Cô Cầu Bại',
    streak: 9,
  },
  {
    rank: 2,
    id: 'u-2',
    name: 'Bảo Cage Master',
    avatar: 'BC',
    points: 4420,
    accuracy: 85.0,
    correctCount: 51,
    totalCount: 60,
    beltTier: 'black',
    beltName: 'Đai Đen 3 Đẳng',
    badge: '⚡ Thánh Phán Knockout',
    streak: 6,
  },
  {
    rank: 3,
    id: 'u-3',
    name: 'Minh Tán Thủ',
    avatar: 'MT',
    points: 4190,
    accuracy: 82.7,
    correctCount: 43,
    totalCount: 52,
    beltTier: 'black',
    beltName: 'Đai Đen 2 Đẳng',
    badge: '🎯 Chuyên Gia Quyết Định',
    streak: 5,
  },
  {
    rank: 4,
    id: 'u-4',
    name: 'Thảo BJJ Hunter',
    avatar: 'TH',
    points: 3950,
    accuracy: 80.4,
    correctCount: 37,
    totalCount: 46,
    beltTier: 'brown',
    beltName: 'Đai Nâu',
    badge: '🥋 Bậc Thầy Khóa Siết',
    streak: 4,
  },
  {
    rank: 5,
    id: 'u-5',
    name: 'Vũ Iron Chin',
    avatar: 'VI',
    points: 3720,
    accuracy: 78.3,
    correctCount: 36,
    totalCount: 46,
    beltTier: 'brown',
    beltName: 'Đai Nâu',
    badge: '🥊 Thợ Săn Kèo Dưới',
    streak: 3,
  },
  {
    rank: 6,
    id: 'u-6',
    name: 'Trần Nam Knockout',
    avatar: 'TN',
    points: 3410,
    accuracy: 76.9,
    correctCount: 30,
    totalCount: 39,
    beltTier: 'purple',
    beltName: 'Đai Tím',
    badge: '🔥 Tiên Tri Sàn Đấu',
    streak: 4,
  },
  {
    rank: 7,
    id: 'u-7',
    name: 'Kim Oanh Octagon',
    avatar: 'KO',
    points: 3180,
    accuracy: 75.0,
    correctCount: 33,
    totalCount: 44,
    beltTier: 'purple',
    beltName: 'Đai Tím',
    badge: '🌟 Phán Đâu Thắng Đó',
    streak: 2,
  },
  {
    rank: 8,
    id: 'u-8',
    name: 'Đức Saigon Combat',
    avatar: 'DS',
    points: 2950,
    accuracy: 73.2,
    correctCount: 30,
    totalCount: 41,
    beltTier: 'blue',
    beltName: 'Đai Xanh',
    badge: '🛡️ Chiến Thuật Gia',
    streak: 3,
  },
  {
    rank: 9,
    id: 'u-9',
    name: 'Quân Striker VN',
    avatar: 'QS',
    points: 2710,
    accuracy: 71.8,
    correctCount: 28,
    totalCount: 39,
    beltTier: 'blue',
    beltName: 'Đai Xanh',
    badge: '💥 Cú Đấm Sấm Sét',
    streak: 1,
  },
  {
    rank: 10,
    id: 'u-10',
    name: 'Tuấn C-Gym Fan',
    avatar: 'TC',
    points: 2480,
    accuracy: 70.3,
    correctCount: 26,
    totalCount: 37,
    beltTier: 'blue',
    beltName: 'Đai Xanh',
    badge: '🌾 Chiến Binh Mới Nổi',
    streak: 2,
  },
];

/**
 * Get prediction data for a single fight.
 * If not found, initializes or creates default calculation.
 */
export function getPredictionByFightId(fightId: string): FightPrediction {
  initializeStore();

  if (fightPredictionsStore.has(fightId)) {
    return fightPredictionsStore.get(fightId)!;
  }

  // Create default fallback if not in store
  const defaultPrediction: FightPrediction = {
    fightId,
    totalVotes: 100,
    fighter1Votes: 55,
    fighter2Votes: 45,
    fighter1Percentage: 55,
    fighter2Percentage: 45,
    methodBreakdown: {
      koTko: 50,
      submission: 25,
      decision: 25,
    },
  };

  fightPredictionsStore.set(fightId, defaultPrediction);
  return defaultPrediction;
}

/**
 * Get all available predictions indexed by fightId.
 */
export function getAllPredictions(): Record<string, FightPrediction> {
  initializeStore();
  const result: Record<string, FightPrediction> = {};
  fightPredictionsStore.forEach((pred, id) => {
    result[id] = { ...pred };
  });
  return result;
}

/**
 * Submit a user vote for a fight.
 * Updates in-memory vote counters and percentages dynamically.
 */
export function submitPredictionVote(submission: VoteSubmission): {
  success: boolean;
  prediction: FightPrediction;
  message: string;
} {
  initializeStore();

  const current = getPredictionByFightId(submission.fightId);
  const fight = fights.find((f) => f.id === submission.fightId);

  const isFighter1 = fight ? fight.fighter1Id === submission.selectedFighterId : true;

  const f1Votes = current.fighter1Votes + (isFighter1 ? 1 : 0);
  const f2Votes = current.fighter2Votes + (!isFighter1 ? 1 : 0);
  const totalVotes = f1Votes + f2Votes;

  const f1Pct = Math.round((f1Votes / totalVotes) * 100);
  const f2Pct = 100 - f1Pct;

  // Recalculate method breakdown with weighted incremental vote
  const methods = { ...current.methodBreakdown };
  if (submission.predictedMethod === 'KO/TKO') {
    methods.koTko = Math.min(95, Math.round(methods.koTko * 0.98 + 2));
  } else if (submission.predictedMethod === 'Submission') {
    methods.submission = Math.min(95, Math.round(methods.submission * 0.98 + 2));
  } else if (submission.predictedMethod === 'Decision') {
    methods.decision = Math.min(95, Math.round(methods.decision * 0.98 + 2));
  }

  // Normalize method sum to 100
  const sum = methods.koTko + methods.submission + methods.decision;
  methods.koTko = Math.round((methods.koTko / sum) * 100);
  methods.submission = Math.round((methods.submission / sum) * 100);
  methods.decision = 100 - methods.koTko - methods.submission;

  const updated: FightPrediction = {
    fightId: submission.fightId,
    totalVotes,
    fighter1Votes: f1Votes,
    fighter2Votes: f2Votes,
    fighter1Percentage: f1Pct,
    fighter2Percentage: f2Pct,
    methodBreakdown: methods,
  };

  fightPredictionsStore.set(submission.fightId, updated);

  return {
    success: true,
    prediction: updated,
    message: 'Bình chọn thành công! Bạn nhận được +50 điểm tiềm năng nếu dự đoán chính xác.',
  };
}

/**
 * Get top predictor leaderboard.
 */
export function getTopPredictors(): TopPredictor[] {
  return [...mockLeaderboard];
}

/**
 * Get overall summary stats for prediction center.
 */
export function getPredictionStatsSummary() {
  initializeStore();

  let totalVotesAcrossAllFights = 0;
  let topVotedFightId = 'ft26';
  let maxVotes = 0;

  fightPredictionsStore.forEach((pred) => {
    totalVotesAcrossAllFights += pred.totalVotes;
    if (pred.totalVotes > maxVotes) {
      maxVotes = pred.totalVotes;
      topVotedFightId = pred.fightId;
    }
  });

  return {
    totalVotesAcrossAllFights,
    totalPredictors: 14280,
    topVotedFightId,
    mostPredictedMethod: 'KO / TKO',
    averageAccuracy: '76.4%',
  };
}

/**
 * Scoring rules and belt ranks configuration
 */
export const PREDICTION_RULES = {
  points: {
    correctFighter: 50,
    correctMethod: 50,
    correctRound: 100,
    perfectBonus: 50, // Total 250 points for a perfect pick
  },
  belts: [
    { tier: 'gold', name: 'Đai Vàng Vô Địch', minPoints: 4000, color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' },
    { tier: 'black', name: 'Đai Đen', minPoints: 3000, color: 'text-zinc-100 bg-zinc-800 border-zinc-600' },
    { tier: 'brown', name: 'Đai Nâu', minPoints: 2000, color: 'text-amber-700 bg-amber-950/40 border-amber-800/40' },
    { tier: 'purple', name: 'Đai Tím', minPoints: 1200, color: 'text-purple-400 bg-purple-900/30 border-purple-500/30' },
    { tier: 'blue', name: 'Đai Xanh', minPoints: 500, color: 'text-blue-400 bg-blue-900/30 border-blue-500/30' },
    { tier: 'white', name: 'Đai Trắng', minPoints: 0, color: 'text-zinc-400 bg-zinc-900 border-zinc-700' },
  ],
};
