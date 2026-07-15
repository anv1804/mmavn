import type { Division } from "../../interfaces/ranking";

// Hạng 77kg: đai bị bỏ trống sau khi Aleksei Filonenko trả đai do chấn thương
// LC34 (15/8/2026) dự kiến có trận tranh đai giữa Lý Văn Huỳnh và Đỗ Thành Chương
export const nam_77: Division = {
  weightClass: "77kg Nam",
  status: "Đang bỏ trống",
  description: "Aleksei Filonenko trả đai do chấn thương nặng. Trận tranh đai dự kiến tại LC34 (15/8/2026): Lý Văn Huỳnh vs Đỗ Thành Chương.",
  champion: { name: "Đang bỏ trống", club: "", record: "" },
  rankings: [
    { rank: 1, name: "Lý Văn Huỳnh",      club: "The Champ MMA",       record: "5-1-0" },
    { rank: 2, name: "Đỗ Thành Chương",   club: "KSC MMA",             record: "5-2-0" },
    { rank: 3, name: "Dương Đức Tùng",    club: "KSC MMA",             record: "4-2-0" },
    { rank: 4, name: "Trần Trung Nghĩa",  club: "Vietnam Top Team",    record: "4-1-0" },
    { rank: 5, name: "Nguyễn Văn Hùng",  club: "Saigon Sports Club",  record: "3-1-0" },
    { rank: 6, name: "Châu Văn Định",     club: "Liên Phong Club",     record: "3-2-0" },
  ],
};
