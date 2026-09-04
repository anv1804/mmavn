// === Promotion ===
export type PromotionType = 'professional' | 'semi-pro' | 'amateur';
export type PromotionFormat = 'Pro Cage' | 'Semi-Pro Grassroots' | 'Grand Prix';

export interface ChampionshipBelt {
  id: string;
  divisionId: string;
  divisionName: string;
  weightLimit: number;
  gender: Gender;
  currentChampionId?: string;
  defenseCount?: number;
  status: 'active' | 'vacant';
}

export interface PromotionRules {
  cageType: string;
  roundDuration: string;
  elbowStrikes: string;
  kneesToHead: string;
  groundAndPound: string;
  scoringSystem: string;
  weightCutting: string;
  equipment: string;
  specialRules: string[];
}

export interface PromotionKeyMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface Promotion {
  id: string;
  name: string;
  shortName: string;
  description: string;
  foundedYear: number;
  type: PromotionType;
  slug?: string;
  tagline?: string;
  formatType?: PromotionFormat;
  formatDescription?: string;
  headquarters?: string;
  rules?: PromotionRules;
  belts?: ChampionshipBelt[];
  keyMetrics?: PromotionKeyMetric[];
  highlights?: string[];
}

// === Division ===
export type Gender = 'male' | 'female';

export interface Division {
  id: string;
  name: string;
  nameVi: string;
  weightLimit: number;
  gender: Gender;
}

// === Gym ===
export interface GymContact {
  phone?: string;
  email?: string;
  website?: string;
  facebook?: string;
}

export interface Gym {
  id: string;
  name: string;
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  disciplines: string[];
  headCoach?: string;
  coaches?: string[];
  contact?: GymContact;
  description?: string;
  foundedYear?: number;
  openingHours?: string;
  image?: string;
  logo?: string;
  coverImage?: string;
  rating?: number;
  memberCount?: number;
  facilities?: string[];
  notableFighterIds?: string[];
}

// === Fighter ===
export interface FightRecord {
  wins: number;
  losses: number;
  draws: number;
  noContests: number;
  winsByKo: number;
  winsBySub: number;
  winsByDec: number;
}

export interface FighterStats {
  strikingAccuracy: number; // 0-100
  strikingDefense: number;  // 0-100
  takedownAccuracy: number; // 0-100
  takedownDefense: number;  // 0-100
  finishRate: number;       // 0-100
  // Radar chart dimensions (1-5 scale)
  striking: number;
  wrestling: number;
  clinch: number;
  groundGame: number;
  defense: number;
  cardio: number;
}

export interface FighterSocialLinks {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
}

export interface FighterGalleryItem {
  id: string;
  url: string;
  caption: string;
  title?: string;
}

export interface FighterHighlightVideo {
  id: string;
  title: string;
  url?: string;
  thumbnail: string;
  duration: string;
  views: string;
}

export interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  avatar?: string;
  image?: string;
  coverImage?: string;
  fullBodyImage?: string;
  gender?: 'male' | 'female';
  dateOfBirth: string;
  nationality: string;
  height: number;  // cm
  reach: number;   // cm
  divisionId: string;
  gymId: string;
  styles: string[];
  record: FightRecord;
  eloRating: number;
  ranking?: number;
  isChampion: boolean;
  championshipTitle?: string;
  stats: FighterStats;
  bio?: string;
  quote?: string;
  quoteAuthor?: string;
  socialLinks?: FighterSocialLinks;
  gallery?: FighterGalleryItem[];
  highlightVideos?: FighterHighlightVideo[];
}


// === Event ===
export type EventStatus = 'upcoming' | 'live' | 'completed' | 'cancelled';

export interface MmaEvent {
  id: string;
  name: string;
  promotionId: string;
  date: string;
  venue: string;
  city: string;
  status: EventStatus;
}

// === Fight ===
export type FightMethod = 'KO' | 'TKO' | 'Submission' | 'Decision (Unanimous)' | 'Decision (Split)' | 'Decision (Majority)' | 'Draw' | 'No Contest' | 'DQ';
export type CardPosition = 'main-card' | 'prelims';

export interface FightResult {
  winnerId: string;
  method: FightMethod;
  round: number;
  time: string;
  description?: string;
}

export interface Fight {
  id: string;
  eventId: string;
  fighter1Id: string;
  fighter2Id: string;
  divisionId: string;
  isMainEvent: boolean;
  isTitleFight: boolean;
  numberOfRounds: number;
  cardPosition: CardPosition;
  result?: FightResult;
}

// === Ranking ===
export type RankingType = 'official' | 'unified' | 'p4p';

export interface Ranking {
  position: number;
  fighterId: string;
  divisionId: string;
  promotionId?: string;
  previousPosition?: number;
  eloRating: number;
  type: RankingType;
}

// === Article ===
export type ArticleCategory = 'breaking' | 'analysis' | 'interview' | 'technique' | 'opinion' | 'gym-spotlight';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: ArticleCategory;
  tags: string[];
  publishedAt: string;
  relatedFighterIds?: string[];
  relatedEventIds?: string[];
}

// === Forum ===
export type ForumCategory = 'ky-thuat' | 'soi-keo' | 'phong-tap' | 'cho-do';

export type BeltLevel = 'Đai Trắng' | 'Đai Xanh' | 'Đai Tím' | 'Đai Nâu' | 'Đai Đen';

export interface ForumAuthor {
  name: string;
  avatar: string;
  beltLevel: BeltLevel | string;
  role?: string;
  gym?: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: ForumAuthor;
  category: ForumCategory;
  upvotes: number;
  repliesCount: number;
  createdAt: string;
  tags: string[];
  pinned?: boolean;
  locked?: boolean;
}

export interface ForumComment {
  id: string;
  postId: string;
  author: ForumAuthor;
  content: string;
  upvotes: number;
  createdAt: string;
}

// === Fight Prediction & Voting ===
export type PredictionMethod = 'KO/TKO' | 'Submission' | 'Decision';

export interface MethodBreakdown {
  koTko: number;      // percentage (0 - 100)
  submission: number; // percentage (0 - 100)
  decision: number;   // percentage (0 - 100)
}

export interface FightPrediction {
  fightId: string;
  totalVotes: number;
  fighter1Votes: number;
  fighter2Votes: number;
  fighter1Percentage: number;
  fighter2Percentage: number;
  methodBreakdown: MethodBreakdown;
  fighter1Methods?: MethodBreakdown;
  fighter2Methods?: MethodBreakdown;
}

export interface VoteSubmission {
  fightId: string;
  selectedFighterId: string;
  predictedMethod: PredictionMethod;
  predictedRound?: number;
  userId?: string;
  userName?: string;
}

export type BeltTier = 'white' | 'blue' | 'purple' | 'brown' | 'black' | 'gold';

export interface TopPredictor {
  rank: number;
  id: string;
  name: string;
  avatar?: string;
  points: number;
  accuracy: number;
  correctCount: number;
  totalCount: number;
  beltTier: BeltTier;
  beltName: string;
  badge: string;
  streak: number;
}

// === Technique Library ===
export type TechniqueCategory = 'striking' | 'wrestling' | 'submission' | 'clinch';

export type TechniqueDifficulty = 'Cơ bản' | 'Nâng cao' | 'Chuyên nghiệp';

export interface NotableFighterUsage {
  fighterId?: string;
  fighterName: string;
  highlight: string;
}

export interface Technique {
  id: string;
  name: string;
  nameVi: string;
  nameEn?: string;
  slug?: string;
  category: TechniqueCategory;
  difficulty: TechniqueDifficulty;
  description: string;
  descriptionVi?: string;
  originArt?: string;
  executionSteps: string[];
  keyPoints: string[];
  counters?: string[];
  commonMistakes?: string[];
  notableFighters: NotableFighterUsage[];
}

