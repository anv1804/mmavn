import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCms } from "../../context/CmsContext";
import { supabase } from "../../utils/supabase";
import CmsToast from "../../components/cms/shared/CmsToast";
import CmsPageHeader from "../../components/cms/shared/CmsPageHeader";
import RankingList from "../../components/cms/rankings/RankingList";
import RankingBxhForm from "../../components/cms/rankings/RankingBxhForm";
import CmsUnsavedChangesModal from "../../components/cms/shared/CmsUnsavedChangesModal";

export default function CmsRankings() {
  const { rankings, setRankings, msg, showMsg } = useCms();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any | null>(null);
  const [original, setOriginal] = useState<any | null>(null);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // If redirected from CmsWeightClasses page with a specific weightClassId state
  useEffect(() => {
    if (location.state?.weightClassId) {
      const found = rankings.find((r) => r.id === location.state.weightClassId);
      if (found) {
        setSelected(found);
        setOriginal(found);
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
    setOriginal(null);
    showMsg("Đã lưu bảng xếp hạng thành công!");
  };

  const isDirty = () => {
    if (!selected || !original) return false;
    return JSON.stringify(selected) !== JSON.stringify(original);
  };

  const handleCancel = () => {
    if (isDirty()) {
      setShowUnsavedModal(true);
    } else {
      setSelected(null);
      setOriginal(null);
    }
  };

  const confirmLeave = () => {
    setSelected(null);
    setOriginal(null);
    setShowUnsavedModal(false);
  };

  const handleEdit = (r: any) => {
    setSelected(r);
    setOriginal(r);
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
            onEdit={handleEdit}
          />
        </>
      ) : (
        <RankingBxhForm
          weightClass={selected}
          onChange={setSelected}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      {/* Unsaved Warning Modal */}
      <CmsUnsavedChangesModal
        isOpen={showUnsavedModal}
        onConfirm={confirmLeave}
        onCancel={() => setShowUnsavedModal(false)}
      />
    </div>
  );
}
