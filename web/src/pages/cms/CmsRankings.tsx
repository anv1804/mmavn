import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCms } from "../../context/CmsContext";
import { supabase } from "../../utils/supabase";
import CmsToast from "../../components/cms/shared/CmsToast";
import CmsPageHeader from "../../components/cms/shared/CmsPageHeader";
import RankingList from "../../components/cms/rankings/RankingList";
import RankingBxhForm from "../../components/cms/rankings/RankingBxhForm";

export default function CmsRankings() {
  const { rankings, setRankings, msg, showMsg } = useCms();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // If redirected from CmsWeightClasses page with a specific weightClassId state
  useEffect(() => {
    if (location.state?.weightClassId) {
      const found = rankings.find((r) => r.id === location.state.weightClassId);
      if (found) {
        setSelected(found);
      }
      // Clear location state after picking it up
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, rankings, navigate]);

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
      
      {!selected ? (
        <>
          <CmsPageHeader
            title="Bảng Xếp Hạng"
            subtitle={`${filtered.length} bảng xếp hạng`}
          />
          <RankingList
            rankings={filtered}
            search={search}
            onSearch={setSearch}
            onEdit={setSelected}
          />
        </>
      ) : (
        <RankingBxhForm
          weightClass={selected}
          onChange={setSelected}
          onSave={handleSave}
          onCancel={() => setSelected(null)}
        />
      )}
    </div>
  );
}
