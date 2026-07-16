import { useState } from "react";
import { useCms } from "../../context/CmsContext";
import { supabase } from "../../utils/supabase";
import CmsToast from "../../components/cms/shared/CmsToast";
import CmsPageHeader from "../../components/cms/shared/CmsPageHeader";
import RankingList from "../../components/cms/rankings/RankingList";
import RankingForm from "../../components/cms/rankings/RankingForm";

export default function CmsRankings() {
  const { rankings, setRankings, msg, showMsg } = useCms();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any | null>(null);

  const filtered = rankings.filter((r) => r.name?.toLowerCase().includes(search.toLowerCase()));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("rankings").upsert(selected);
    if (error) return showMsg("Lỗi lưu bảng xếp hạng: " + error.message, "error");
    setRankings(rankings.map((r) => (r.id === selected.id ? selected : r)));
    setSelected(null);
    showMsg("Đã lưu bảng xếp hạng thành công!");
  };

  return (
    <div className="space-y-6">
      <CmsToast msg={msg} />
      <CmsPageHeader
        title="Hạng Cân / Bảng Xếp Hạng"
        subtitle={`${filtered.length} hạng cân`}
      />

      {!selected ? (
        <RankingList
          rankings={filtered} search={search}
          onSearch={setSearch} onEdit={setSelected}
        />
      ) : (
        <RankingForm
          ranking={selected} onChange={setSelected}
          onSave={handleSave} onCancel={() => setSelected(null)}
        />
      )}
    </div>
  );
}
