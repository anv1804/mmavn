import { useState } from "react";
import { useCms } from "../../context/CmsContext";
import CmsToast from "../../components/cms/shared/CmsToast";
import CmsPageHeader from "../../components/cms/shared/CmsPageHeader";
import EventTable from "../../components/cms/events/EventTable";
import EventForm from "../../components/cms/events/EventForm";
import CmsConfirmModal from "../../components/cms/shared/CmsConfirmModal";
import CmsUnsavedChangesModal from "../../components/cms/shared/CmsUnsavedChangesModal";

const NEW_EVENT_TEMPLATE = {
  title: "", date: "", loc: "",
  type: "Championship Bout", status: "Sắp diễn ra",
};

export default function CmsEvents() {
  const { events, saveEvents, msg, showMsg } = useCms();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any | null>(null);
  const [original, setOriginal] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);

  const filtered = events.filter(
    (e) => e.title.toLowerCase().includes(search.toLowerCase()) || e.loc?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    saveEvents(events.filter((e) => e.id !== deleteId));
    showMsg("Đã xóa sự kiện thành công!");
    setDeleteId(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected.title || !selected.date) return showMsg("Vui lòng điền tiêu đề và ngày sự kiện", "error");
    const idx = events.findIndex((ev) => ev.id === selected.id);
    saveEvents(idx > -1 ? events.map((ev) => (ev.id === selected.id ? selected : ev)) : [...events, selected]);
    setSelected(null);
    setOriginal(null);
    showMsg("Đã lưu sự kiện thành công!");
  };

  // Unsaved changes checks
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
    const fresh = { id: "event-" + Date.now(), ...NEW_EVENT_TEMPLATE };
    setSelected(fresh);
    setOriginal(fresh);
  };

  const handleEdit = (evt: any) => {
    setSelected(evt);
    setOriginal(evt);
  };

  return (
    <div className="space-y-6">
      <CmsToast msg={msg} />
      <CmsPageHeader
        title="Lịch Sự Kiện"
        subtitle={`${filtered.length} sự kiện`}
        addLabel="+ Thêm Sự Kiện"
        onAdd={initNew}
      />

      {!selected ? (
        <EventTable
          events={filtered} search={search} onSearch={setSearch}
          onEdit={handleEdit} onDelete={handleDelete}
        />
      ) : (
        <EventForm
          event={selected} onChange={setSelected}
          onSave={handleSave} onCancel={handleCancel}
        />
      )}
      {/* Confirm Delete Modal */}
      <CmsConfirmModal
        isOpen={deleteId !== null}
        title="Xác nhận xóa"
        message="Bạn chắc chắn muốn xóa sự kiện đấu Lion Championship này? Hành động này không thể khôi phục."
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
