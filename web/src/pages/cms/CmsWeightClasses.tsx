import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCms } from "../../context/CmsContext";
import { supabase } from "../../utils/supabase";
import CmsToast from "../../components/cms/shared/CmsToast";
import CmsPageHeader from "../../components/cms/shared/CmsPageHeader";
import WeightClassTable from "../../components/cms/weight-classes/WeightClassTable";
import WeightClassForm from "../../components/cms/weight-classes/WeightClassForm";
import CmsConfirmModal from "../../components/cms/shared/CmsConfirmModal";

const NEW_WC_TEMPLATE = {
  name: "", gender: "Nam", sort_order: 0,
  champion: { name: "", record: "", club: "" },
  rankings: [],
  status: "Hoạt động",
};

export default function CmsWeightClasses() {
  const { rankings, setRankings, msg, showMsg } = useCms();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Sort by sort_order then name
  const sorted = [...rankings].sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999) || a.name.localeCompare(b.name));
  
  const filtered = sorted.filter(wc => {
    const q = search.toLowerCase();
    const matchesSearch = wc.name?.toLowerCase().includes(q);
    const matchesGender = !filterGender || wc.gender === filterGender;
    const matchesStatus = !filterStatus || (wc.status ?? "Hoạt động") === filterStatus;
    return matchesSearch && matchesGender && matchesStatus;
  });

  const hasFilter = !!(search || filterGender || filterStatus);
  const resetFilters = () => { setSearch(""); setFilterGender(""); setFilterStatus(""); };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("rankings").delete().eq("id", deleteId);
    if (error) return showMsg("Lỗi xóa: " + error.message, "error");
    setRankings(rankings.filter(r => r.id !== deleteId));
    showMsg("Đã xóa hạng cân thành công!");
    setDeleteId(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected.name) return showMsg("Vui lòng nhập tên hạng cân", "error");
    const { data, error } = await supabase.from("rankings").upsert(selected).select().single();
    if (error) return showMsg("Lỗi lưu: " + error.message, "error");
    const saved = data || selected;
    const idx = rankings.findIndex(r => r.id === saved.id);
    setRankings(idx > -1 ? rankings.map(r => r.id === saved.id ? saved : r) : [...rankings, saved]);
    setSelected(null);
    showMsg("Đã lưu hạng cân thành công!");
  };

  const initNew = () => setSelected({ id: "wc-" + Date.now(), ...NEW_WC_TEMPLATE });

  // Navigate to BXH management for a weight class
  const handleManageBxh = (wc: any) => {
    navigate("/cms/rankings", { state: { weightClassId: wc.id } });
  };

  return (
    <div className="space-y-6">
      <CmsToast msg={msg} />

      {!selected ? (
        <>
          <CmsPageHeader
            title="Hạng Cân"
            subtitle={`${filtered.length} hạng cân`}
            addLabel="+ Thêm Hạng Cân"
            onAdd={initNew}
          />
          <WeightClassTable
            weightClasses={filtered}
            search={search}
            onSearch={setSearch}
            filterGender={filterGender}
            onGenderChange={setFilterGender}
            filterStatus={filterStatus}
            onStatusChange={setFilterStatus}
            hasFilter={hasFilter}
            onReset={resetFilters}
            onEdit={setSelected}
            onDelete={handleDelete}
            onManageBxh={handleManageBxh}
          />
        </>
      ) : (
        <WeightClassForm
          wc={selected}
          onChange={setSelected}
          onSave={handleSave}
          onCancel={() => setSelected(null)}
        />
      )}
      {/* Confirm Delete Modal */}
      <CmsConfirmModal
        isOpen={deleteId !== null}
        title="Xác nhận xóa"
        message="Xóa hạng cân này sẽ xóa toàn bộ bảng xếp hạng của hạng cân này. Hành động này không thể hoàn tác."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
