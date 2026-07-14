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

export const nam_56: Division = {
  weightClass: "56kg Nam",
  champion: { name: "Lê Văn Tuần", club: "Vietnam Top Team", record: "8-3-0", photo: "/lvt.png" },
  rankings: [
    { rank: 1, name: "Phạm Văn Nam", club: "Saigon Sports Club", record: "7-1-0" },
    { rank: 2, name: "Trần Minh Nhựt", club: "Liên Phong Club", record: "5-2-0" },
    { rank: 3, name: "Đỗ Huy Hoàng", club: "KSC MMA", record: "6-2-0" },
    { rank: 4, name: "Nguyễn Phú Thịnh", club: "Lợi Hổ Club", record: "5-1-0" },
    { rank: 5, name: "Bùi Trường Sinh", club: "Liên Phong Club", record: "6-3-0" }
  ]
};
