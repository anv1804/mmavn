export interface FightRecord {
  opponent: string;
  result: "W" | "L" | "D" | "NC";
  method: string;       // KO, TKO, Submission, Decision, ...
  round: number;
  time: string;         // "3:42"
  event: string;
  date: string;
}

export interface FighterProfile {
  id: string;

  // Basic
  name: string;
  nickname?: string;
  photo?: string;
  nationality: string;
  flag?: string;          // emoji

  // Weight
  weightClass: string;
  weight: string;         // "56 kg"
  height?: string;
  reach?: string;

  // Club
  club: string;
  coach?: string;

  // Status
  status: "champion" | "contender" | "active" | "inactive";
  rank?: number;
  title?: string;

  // Stats
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
  finishRate?: number;   // percent
  koWins?: number;
  subWins?: number;
  decisionWins?: number;

  // Bio
  age?: number;
  hometown?: string;
  bio?: string;
  disciplines?: string[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };

  // Fight history
  fights?: FightRecord[];
}
