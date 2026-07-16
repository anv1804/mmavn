import { useState } from "react";
import { useCms } from "../../context/CmsContext";
import { supabase } from "../../utils/supabase";
import CmsToast from "../../components/cms/shared/CmsToast";
import CmsPageHeader from "../../components/cms/shared/CmsPageHeader";
import ClubTable from "../../components/cms/clubs/ClubTable";
import ClubForm from "../../components/cms/clubs/ClubForm";
import CmsConfirmModal from "../../components/cms/shared/CmsConfirmModal";
import CmsUnsavedChangesModal from "../../components/cms/shared/CmsUnsavedChangesModal";

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
  const [original, setOriginal] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);

  const filtered = clubs.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.city?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("clubs").delete().eq("id", deleteId);
    if (error) showMsg("Lỗi xóa: " + error.message, "error");
    else {
      setClubs(clubs.filter((c) => c.id !== deleteId));
      showMsg("Đã xóa võ đường thành công!");
    }
    setDeleteId(null);
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
    const fresh = { id: "club-" + Date.now(), slug: "new-club-" + Date.now(), ...NEW_CLUB_TEMPLATE };
    setSelected(fresh);
    setOriginal(fresh);
  };

  const handleEdit = (club: any) => {
    setSelected(club);
    setOriginal(club);
  };

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
            onEdit={handleEdit} onDelete={handleDelete}
          />
        </>
      ) : (
        <ClubForm
          club={selected} onChange={setSelected}
          onSave={handleSave} onCancel={handleCancel}
        />
      )}
      {/* Confirm Delete Modal */}
      <CmsConfirmModal
        isOpen={deleteId !== null}
        title="Xác nhận xóa"
        message="Bạn chắc chắn muốn xóa võ đường này? Toàn bộ thông tin liên quan sẽ bị loại bỏ."
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
