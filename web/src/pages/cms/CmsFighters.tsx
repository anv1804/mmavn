import { useState } from "react";
import { useCms } from "../../context/CmsContext";
import { supabase } from "../../utils/supabase";
import CmsToast from "../../components/cms/shared/CmsToast";
import CmsPageHeader from "../../components/cms/shared/CmsPageHeader";
import CmsConfirmModal from "../../components/cms/shared/CmsConfirmModal";
import CmsUnsavedChangesModal from "../../components/cms/shared/CmsUnsavedChangesModal";
import FighterFilters from "../../components/cms/fighters/FighterFilters";
import FighterTable from "../../components/cms/fighters/FighterTable";
import FighterForm from "../../components/cms/fighters/FighterForm";

const FIGHTERS_PER_PAGE = 25;

const NEW_FIGHTER_TEMPLATE = {
  name: "", nickname: "", weight_class: "56kg", gender: "Nam",
  club: "", coach: "", photo: "/lvt.png", bio: "",
  age: 28, height: 168, reach: 168,
  hometown: "", nationality: "Việt Nam", flag: "🇻🇳",
  wins: 0, losses: 0, draws: 0,
  ko_wins: 0, sub_wins: 0, decision_wins: 0, active: true,
};

export default function CmsFighters() {
  const { fighters, setFighters, clubs, rankings, msg, showMsg } = useCms();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterWeightClass, setFilterWeightClass] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<any | null>(null);
  const [original, setOriginal] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);

  // Filtering
  const filtered = fighters.filter((f) => {
    const q = searchQuery.toLowerCase();
    return (
      (f.name.toLowerCase().includes(q) || f.nickname?.toLowerCase().includes(q) || f.club?.toLowerCase().includes(q)) &&
      (!filterWeightClass || f.weight_class === filterWeightClass) &&
      (!filterGender || (f.gender || "Nam") === filterGender) &&
      (!filterStatus || (f.status ?? "Thi đấu") === filterStatus)
    );
  });

  const uniqueWeightClasses = Array.from(new Set(rankings.map((r) => r.name).filter(Boolean))).sort() as string[];
  const totalPages = Math.max(1, Math.ceil(filtered.length / FIGHTERS_PER_PAGE));
  const paged = filtered.slice((page - 1) * FIGHTERS_PER_PAGE, page * FIGHTERS_PER_PAGE);
  const hasFilter = !!(searchQuery || filterWeightClass || filterGender || filterStatus);

  const resetFilters = () => { setSearchQuery(""); setFilterWeightClass(""); setFilterGender(""); setFilterStatus(""); setPage(1); };

  // CRUD
  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("fighters").delete().eq("id", deleteId);
    if (error) showMsg("Lỗi xóa: " + error.message, "error");
    else {
      setFighters(fighters.filter((f) => f.id !== deleteId));
      showMsg("Đã xóa võ sĩ thành công!");
    }
    setDeleteId(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected.name) return showMsg("Vui lòng nhập tên võ sĩ", "error");
    
    // Omit fields that do not exist as root columns in Supabase schema cache
    const {
      facebook, tiktok, instagram, youtube,
      birth_date, thumb, cover,
      ...validPayload
    } = selected;

    // Format raw 'Khác: ' methods inside fights history
    if (validPayload.fights && Array.isArray(validPayload.fights)) {
      validPayload.fights = validPayload.fights.map((f: any) => {
        if (f.method && f.method.startsWith("Khác: ")) {
          return { ...f, method: f.method.replace("Khác: ", "").trim() };
        }
        return f;
      });
    }

    const { error } = await supabase.from("fighters").upsert(validPayload);
    if (error) return showMsg("Lỗi lưu võ sĩ: " + error.message, "error");
    const idx = fighters.findIndex((f) => f.id === selected.id);
    setFighters(
      idx > -1
        ? fighters.map((f) => (f.id === selected.id ? selected : f))
        : [...fighters, selected].sort((a, b) => a.name.localeCompare(b.name)),
    );
    setSelected(null);
    showMsg("Đã lưu hồ sơ võ sĩ thành công!");
  };

  // Check if form is dirty
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

  const initNew = () => {
    const fresh = { id: "fighter-" + Date.now(), ...NEW_FIGHTER_TEMPLATE };
    setSelected(fresh);
    setOriginal(fresh);
  };

  const handleEdit = (fighter: any) => {
    setSelected(fighter);
    setOriginal(fighter);
  };

  return (
    <div className="space-y-6">
      <CmsToast msg={msg} />

      {!selected ? (
        <>
          <CmsPageHeader
            title="Quản Lý Võ Sĩ"
            subtitle={`${filtered.length} võ sĩ · Trang ${page}/${totalPages}`}
            addLabel="+ Thêm Võ Sĩ"
            onAdd={initNew}
          />
          <FighterFilters
            searchQuery={searchQuery} filterWeightClass={filterWeightClass}
            filterGender={filterGender} filterStatus={filterStatus}
            uniqueWeightClasses={uniqueWeightClasses} hasFilter={hasFilter}
            onSearch={(v) => { setSearchQuery(v); setPage(1); }}
            onWeightClass={(v) => { setFilterWeightClass(v); setPage(1); }}
            onGender={(v) => { setFilterGender(v); setPage(1); }}
            onStatus={(v) => { setFilterStatus(v); setPage(1); }}
            onReset={resetFilters}
          />
          <FighterTable
            fighters={paged} clubs={clubs}
            page={page} totalPages={totalPages} total={filtered.length}
            onEdit={handleEdit} onDelete={handleDelete} onPageChange={setPage}
          />
        </>
      ) : (
        <FighterForm
          fighter={selected} fighters={fighters} clubs={clubs} rankings={rankings}
          onChange={setSelected} onSave={handleSave} onCancel={handleCancel}
        />
      )}
      {/* Confirm Delete Modal */}
      <CmsConfirmModal
        isOpen={deleteId !== null}
        title="Xác nhận xóa"
        message="Bạn chắc chắn muốn xóa hồ sơ võ sĩ này? Hành động này không thể hoàn tác."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
      {/* Unsaved Warning Modal */}
      <CmsUnsavedChangesModal
        isOpen={showUnsavedModal}
        onConfirm={confirmLeave}
        onCancel={() => setShowUnsavedModal(false)}
      />
    </div>
  );
}
