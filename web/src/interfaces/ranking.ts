export interface Fighter {
  rank: number;
  name: string;
  club: string;
  record: string;
}

export interface Champion {
  name: string;
  club: string;
  record: string;
  photo?: string;
}

export interface Division {
  weightClass: string;
  status?: string;
  description?: string;
  champion: Champion | null;
  rankings: Fighter[];
}
