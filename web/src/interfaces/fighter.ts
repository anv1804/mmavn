export interface FightRecord {
  opponent: string;
  result: "W" | "L" | "D" | "NC";
  method: string;
  round: number;
  time: string;
  event: string;
  date: string;
}

export interface FighterProfile {
  id: string;
  name: string;
  nickname?: string;
  photo?: string;
  nationality: string;
  flag?: string;

  weightClass: string;
  weight: string;
  height?: string;
  reach?: string;

  club: string;
  coach?: string;

  status: "champion" | "contender" | "active" | "inactive";
  rank?: number;
  title?: string;

  record: {
    wins: number;
    losses: number;
    draws: number;
  };
  finishRate?: number;
  koWins?: number;
  subWins?: number;
  decisionWins?: number;

  age?: number;
  birthYear?: number;
  hometown?: string;
  bio?: string;
  disciplines?: string[];
  achievements?: string[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };

  fights?: FightRecord[];
}
