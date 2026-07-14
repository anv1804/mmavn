export interface MMAClub {
  id: string;
  slug: string;

  // Thông tin cơ bản
  name: string;
  shortName: string;
  englishName?: string;

  // Địa điểm
  city: string;
  district?: string;
  address?: string;
  region: "north" | "central" | "south";

  // Thành lập
  foundedYear?: number;

  // Logo
  logo: string;
  cover?: string;

  // Thông tin liên hệ
  website?: string;
  facebook?: string;
  youtube?: string;
  instagram?: string;
  tiktok?: string;

  // Người phụ trách
  headCoach: string;
  assistantCoaches?: string[];

  // Mô tả
  description: string;

  // Môn đào tạo
  disciplines: string[];

  // Thành tích
  achievements: string[];

  // Giải đấu
  competitions: string[];

  // Thống kê
  statistics: {
      fighters: number;
      lionFighters: number;
      champions: number;
      wins: number;
      losses: number;
      koWins: number;
      submissionWins: number;
  };

  // Trạng thái
  active: boolean;

  updatedAt: string;
}
