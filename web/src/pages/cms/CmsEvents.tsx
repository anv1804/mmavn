import { useState } from "react";
import { useCms } from "../../context/CmsContext";
import CmsToast from "../../components/cms/shared/CmsToast";
import CmsPageHeader from "../../components/cms/shared/CmsPageHeader";
import EventTable from "../../components/cms/events/EventTable";
import EventForm from "../../components/cms/events/EventForm";
import CmsConfirmModal from "../../components/cms/shared/CmsConfirmModal";

const NEW_EVENT_TEMPLATE = {
  title: "", date: "", loc: "",
  type: "Championship Bout", status: "Sắp diễn ra",
};

export default function CmsEvents() {
  const { events, saveEvents, msg, showMsg } = useCms();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
    showMsg("Đã lưu sự kiện thành công!");
  };

  const initNew = () => setSelected({ id: "event-" + Date.now(), ...NEW_EVENT_TEMPLATE });

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
          onEdit={setSelected} onDelete={handleDelete}
        />
      ) : (
        <EventForm
          event={selected} onChange={setSelected}
          onSave={handleSave} onCancel={() => setSelected(null)}
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
    </div>
  );
}
