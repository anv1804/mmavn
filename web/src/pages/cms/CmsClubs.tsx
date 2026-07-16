import { useState } from "react";
import { useCms } from "../../context/CmsContext";
import { supabase } from "../../utils/supabase";
import CmsToast from "../../components/cms/shared/CmsToast";
import CmsPageHeader from "../../components/cms/shared/CmsPageHeader";
import ClubTable from "../../components/cms/clubs/ClubTable";
import ClubForm from "../../components/cms/clubs/ClubForm";

const NEW_CLUB_TEMPLATE = {
  name: "", short_name: "", city: "TP. Hồ Chí Minh",
  district: "", address: "", head_coach: "", disciplines: ["MMA"],
  description: "", founded_year: 2026,
  logo: "/logo-lionchampionship.png", cover: "",
  facebook: "", tiktok: "",
  statistics: { wins: 0, losses: 0, draws: 0 },
  active: true,
};

export default function CmsClubs() {
  const { clubs, setClubs, msg, showMsg } = useCms();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any | null>(null);

  const filtered = clubs.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.city?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa võ đường này?")) return;
    const { error } = await supabase.from("clubs").delete().eq("id", id);
    if (error) showMsg("Lỗi xóa: " + error.message, "error");
    else { setClubs(clubs.filter((c) => c.id !== id)); showMsg("Đã xóa võ đường thành công!"); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected.name) return showMsg("Vui lòng điền tên võ đường", "error");
    const { error } = await supabase.from("clubs").upsert(selected);
    if (error) return showMsg("Lỗi lưu võ đường: " + error.message, "error");
    const idx = clubs.findIndex((c) => c.id === selected.id);
    setClubs(
      idx > -1
        ? clubs.map((c) => (c.id === selected.id ? selected : c))
        : [...clubs, selected].sort((a, b) => a.name.localeCompare(b.name)),
    );
    setSelected(null);
    showMsg("Đã lưu võ đường thành công!");
  };

  const initNew = () => setSelected({ id: "club-" + Date.now(), slug: "new-club-" + Date.now(), ...NEW_CLUB_TEMPLATE });

  return (
    <div className="space-y-6">
      <CmsToast msg={msg} />

      {!selected ? (
        <>
          <CmsPageHeader
            title="Quản Lý Câu Lạc Bộ"
            subtitle={`${filtered.length} võ đường`}
            addLabel="+ Thêm Võ Đường"
            onAdd={initNew}
          />
          <ClubTable
            clubs={filtered} search={search} onSearch={setSearch}
            onEdit={setSelected} onDelete={handleDelete}
          />
        </>
      ) : (
        <ClubForm
          club={selected} onChange={setSelected}
          onSave={handleSave} onCancel={() => setSelected(null)}
        />
      )}
    </div>
  );
}
