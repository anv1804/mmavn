'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  Calendar, 
  Plus, 
  Search, 
  Swords, 
  Trophy, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Building2, 
  Edit3, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle,
  X,
  Sparkles,
  Flame,
  Check
} from 'lucide-react'
import { events as initialEvents, fights as initialFights, promotions, divisions, getFighterById } from '@/data/mock-data'
import { PROMOTION_COLORS, METHOD_LABELS } from '@/lib/constants'
import type { MmaEvent, Fight, FightMethod, Promotion } from '@/types'

export default function AdminEventsPage() {
  const [eventList, setEventList] = useState<MmaEvent[]>(initialEvents)
  const [fightList, setFightList] = useState<Fight[]>(initialFights)
  const [selectedPromotion, setSelectedPromotion] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedEventId, setExpandedEventId] = useState<string | null>('e5') // Expand e5 (LION 29) by default
  
  // Toast state
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'info' } | null>(null)

  // Modals state
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false)
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)
  const [activeFightForUpdate, setActiveFightForUpdate] = useState<Fight | null>(null)

  // Form state for updating fight result
  const [resultForm, setResultForm] = useState<{
    winnerId: string
    method: FightMethod
    round: number
    time: string
    description: string
  }>({
    winnerId: '',
    method: 'KO',
    round: 1,
    time: '2:30',
    description: '',
  })

  // Form state for creating new event
  const [newEventForm, setNewEventForm] = useState<{
    name: string
    promotionId: string
    date: string
    venue: string
    city: string
    status: 'upcoming' | 'live' | 'completed'
  }>({
    name: '',
    promotionId: 'p1',
    date: '2026-11-20T19:00:00Z',
    venue: '',
    city: 'TP.HCM',
    status: 'upcoming',
  })

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToast({ text, type })
    setTimeout(() => setToast(null), 3500)
  }

  // Open Fight Result Modal
  const handleOpenResultModal = (fight: Fight) => {
    setActiveFightForUpdate(fight)
    if (fight.result) {
      setResultForm({
        winnerId: fight.result.winnerId,
        method: fight.result.method,
        round: fight.result.round,
        time: fight.result.time,
        description: fight.result.description || '',
      })
    } else {
      setResultForm({
        winnerId: fight.fighter1Id,
        method: 'KO',
        round: 1,
        time: '2:30',
        description: '',
      })
    }
    setIsResultModalOpen(true)
  }

  // Save Fight Result
  const handleSaveFightResult = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeFightForUpdate) return

    setFightList(prev => prev.map(f => {
      if (f.id === activeFightForUpdate.id) {
        return {
          ...f,
          result: {
            winnerId: resultForm.winnerId,
            method: resultForm.method,
            round: Number(resultForm.round),
            time: resultForm.time.trim(),
            description: resultForm.description.trim() || undefined,
          }
        }
      }
      return f
    }))

    const winner = getFighterById(resultForm.winnerId)
    showToast(`Đã cập nhật kết quả: ${winner?.name || 'Võ sĩ'} thắng (${resultForm.method})`)
    setIsResultModalOpen(false)
  }

  // Save New Event
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEventForm.name.trim() || !newEventForm.venue.trim()) {
      alert('Vui lòng điền tên sự kiện và địa điểm thi đấu.')
      return
    }

    const createdEvent: MmaEvent = {
      id: `e-${Date.now()}`,
      name: newEventForm.name.trim(),
      promotionId: newEventForm.promotionId,
      date: newEventForm.date,
      venue: newEventForm.venue.trim(),
      city: newEventForm.city,
      status: newEventForm.status,
    }

    setEventList(prev => [createdEvent, ...prev])
    setExpandedEventId(createdEvent.id)
    showToast(`Đã tạo sự kiện mới "${createdEvent.name}" thành công!`)
    setIsCreateEventModalOpen(false)
  }

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return eventList.filter(ev => {
      const matchSearch = searchQuery === '' || 
        ev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.city.toLowerCase().includes(searchQuery.toLowerCase())

      const matchPromotion = selectedPromotion === 'all' || ev.promotionId === selectedPromotion
      const matchStatus = selectedStatus === 'all' || ev.status === selectedStatus

      return matchSearch && matchPromotion && matchStatus
    })
  }, [eventList, searchQuery, selectedPromotion, selectedStatus])

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border border-emerald-500/50 bg-emerald-950 text-emerald-200 shadow-2xl text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast.text}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Calendar className="w-6 h-6 text-red-500" />
            <span>Quản Lý Sự Kiện & Cập Nhật Kết Quả Trận Đấu</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tổng cộng <strong className="text-white">{eventList.length}</strong> sự kiện và <strong className="text-white">{fightList.length}</strong> trận đấu trên toàn hệ thống
          </p>
        </div>

        <button
          onClick={() => setIsCreateEventModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-900/30 transition-all hover:scale-[1.02] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo Sự Kiện Mới</span>
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-[#121627] border border-[#1e2438] p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Tìm theo tên sự kiện, nhà thi đấu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Promotion filter */}
        <div>
          <select
            value={selectedPromotion}
            onChange={(e) => setSelectedPromotion(e.target.value)}
            className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="all">Tất cả giải đấu (Promotions)</option>
            {promotions.map(promo => (
              <option key={promo.id} value={promo.id}>
                {promo.name} ({promo.shortName})
              </option>
            ))}
          </select>
        </div>

        {/* Status filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="upcoming">⏳ Sắp diễn ra</option>
            <option value="live">🔴 Đang trực tiếp</option>
            <option value="completed">✅ Đã kết thúc</option>
          </select>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center bg-[#121627] border border-[#1e2438] rounded-2xl text-slate-400">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-400 opacity-60" />
            <p className="text-sm font-medium">Không có sự kiện nào phù hợp.</p>
          </div>
        ) : (
          filteredEvents.map(event => {
            const promotion = promotions.find(p => p.id === event.promotionId)
            const eventFights = fightList.filter(f => f.eventId === event.id)
            const isExpanded = expandedEventId === event.id
            const completedCount = eventFights.filter(f => f.result).length

            return (
              <div
                key={event.id}
                className="bg-[#121627] border border-[#1e2438] rounded-2xl overflow-hidden transition-all shadow-md"
              >
                {/* Event Card Header */}
                <div 
                  onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
                  className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-[#161b30] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Promotion badge */}
                    <div className="w-12 h-12 rounded-xl bg-[#0d101e] border border-[#1e2438] flex flex-col items-center justify-center text-center p-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {promotion?.shortName || 'MMA'}
                      </span>
                      <span className="text-xs font-black text-red-500">VN</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-white">{event.name}</h3>
                        {event.status === 'upcoming' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-950/40 text-blue-300 border border-blue-500/30">
                            Sắp diễn ra
                          </span>
                        )}
                        {event.status === 'completed' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-950/40 text-emerald-300 border border-emerald-500/30">
                            Đã kết thúc
                          </span>
                        )}
                        {event.status === 'live' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-red-600 text-white animate-pulse">
                            LIVE ĐANG ĐẤU
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {new Date(event.date).toLocaleDateString('vi-VN', {
                            weekday: 'short',
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {event.venue}, {event.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right side info & expand button */}
                  <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-[#1e2438]">
                    <div className="text-left md:text-right">
                      <p className="text-xs font-bold text-white">
                        {eventFights.length} Trận Đấu
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {completedCount} / {eventFights.length} đã có kết quả
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-[#0d101e] border border-[#1e2438] text-slate-300">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expandable Fight Cards */}
                {isExpanded && (
                  <div className="border-t border-[#1e2438] bg-[#0d101e]/80 p-4 md:p-6 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#1e2438]">
                      <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Swords className="w-4 h-4 text-red-500" />
                        Danh sách Fight Card ({eventFights.length} trận)
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Nhấn vào nút "Cập nhật kết quả" để ghi nhận tỷ số trận đấu
                      </span>
                    </div>

                    {eventFights.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-400">
                        Chưa có cặp đấu nào được thiết lập cho sự kiện này.
                      </div>
                    ) : (
                      eventFights.map((fight, idx) => {
                        const f1 = getFighterById(fight.fighter1Id)
                        const f2 = getFighterById(fight.fighter2Id)
                        const division = divisions.find(d => d.id === fight.divisionId)
                        const hasResult = !!fight.result
                        const winner = fight.result?.winnerId ? getFighterById(fight.result.winnerId) : null

                        return (
                          <div
                            key={fight.id}
                            className="bg-[#121627] border border-[#1e2438] rounded-xl p-3.5 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            {/* Match details */}
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap text-[11px]">
                                <span className="font-mono text-slate-400 font-bold">#{idx + 1}</span>
                                {fight.isMainEvent && (
                                  <span className="px-2 py-0.2 rounded bg-red-600 text-white font-bold text-[10px]">
                                    MAIN EVENT
                                  </span>
                                )}
                                {fight.isTitleFight && (
                                  <span className="px-2 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-[10px]">
                                    TRANH ĐAI 🏆
                                  </span>
                                )}
                                <span className="text-slate-400">
                                  {division?.nameVi || 'Hạng cân'} ({fight.numberOfRounds} hiệp)
                                </span>
                              </div>

                              {/* Fighters */}
                              <div className="flex items-center gap-3 text-xs">
                                <span className={`font-bold ${fight.result?.winnerId === f1?.id ? 'text-emerald-400 font-black' : 'text-white'}`}>
                                  {f1?.name || fight.fighter1Id}
                                </span>
                                <span className="text-[10px] text-slate-400 uppercase font-black px-1.5 py-0.2 bg-[#0d101e] rounded">
                                  VS
                                </span>
                                <span className={`font-bold ${fight.result?.winnerId === f2?.id ? 'text-emerald-400 font-black' : 'text-white'}`}>
                                  {f2?.name || fight.fighter2Id}
                                </span>
                              </div>
                            </div>

                            {/* Result state & Action button */}
                            <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-[#1e2438]">
                              {hasResult && fight.result ? (
                                <div className="text-left md:text-right">
                                  <div className="flex items-center md:justify-end gap-1.5 text-xs font-bold text-emerald-400">
                                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                                    <span>{winner?.name || 'Võ sĩ thắng'} ({fight.result.method})</span>
                                  </div>
                                  <p className="text-[10px] text-slate-400">
                                    Hiệp {fight.result.round} • {fight.result.time}
                                  </p>
                                </div>
                              ) : (
                                <span className="text-xs text-slate-400 italic">
                                  Chưa diễn ra
                                </span>
                              )}

                              <button
                                onClick={() => handleOpenResultModal(fight)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a2038] hover:bg-red-600 text-slate-200 hover:text-white text-xs font-semibold border border-[#273050] transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>{hasResult ? 'Sửa kết quả' : 'Nhập kết quả'}</span>
                              </button>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Fight Result Update Modal */}
      {isResultModalOpen && activeFightForUpdate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#121627] border border-[#1e2438] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1e2438]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-red-600/20 text-red-400">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Ghi Nhận / Cập Nhật Kết Quả Trận Đấu
                  </h3>
                  <p className="text-[11px] text-slate-400">Trận mã #{activeFightForUpdate.id}</p>
                </div>
              </div>
              <button
                onClick={() => setIsResultModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFightResult} className="space-y-4">
              {/* Winner Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Chọn Võ Sĩ Giành Chiến Thắng:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(() => {
                    const f1 = getFighterById(activeFightForUpdate.fighter1Id)
                    const f2 = getFighterById(activeFightForUpdate.fighter2Id)

                    return (
                      <>
                        <button
                          type="button"
                          onClick={() => setResultForm({ ...resultForm, winnerId: f1?.id || activeFightForUpdate.fighter1Id })}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            resultForm.winnerId === f1?.id
                              ? 'bg-red-950/40 border-red-500 text-white ring-1 ring-red-500'
                              : 'bg-[#0d101e] border-[#1e2438] text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold truncate">{f1?.name || activeFightForUpdate.fighter1Id}</span>
                            {resultForm.winnerId === f1?.id && <Check className="w-3.5 h-3.5 text-red-400" />}
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Góc đài Đỏ</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setResultForm({ ...resultForm, winnerId: f2?.id || activeFightForUpdate.fighter2Id })}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            resultForm.winnerId === f2?.id
                              ? 'bg-red-950/40 border-red-500 text-white ring-1 ring-red-500'
                              : 'bg-[#0d101e] border-[#1e2438] text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold truncate">{f2?.name || activeFightForUpdate.fighter2Id}</span>
                            {resultForm.winnerId === f2?.id && <Check className="w-3.5 h-3.5 text-red-400" />}
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Góc đài Xanh</span>
                        </button>
                      </>
                    )
                  })()}
                </div>
              </div>

              {/* Finish Method */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phương thức kết thúc (Finish Method):
                </label>
                <select
                  value={resultForm.method}
                  onChange={(e) => setResultForm({ ...resultForm, method: e.target.value as FightMethod })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="KO">Knockout (KO)</option>
                  <option value="TKO">Technical Knockout (TKO)</option>
                  <option value="Submission">Khóa siết đầu hàng (Submission)</option>
                  <option value="Decision (Unanimous)">Tính điểm đồng thuận (Decision Unanimous)</option>
                  <option value="Decision (Split)">Tính điểm chia rẽ (Decision Split)</option>
                  <option value="Decision (Majority)">Tính điểm đa số (Decision Majority)</option>
                  <option value="Draw">Hòa (Draw)</option>
                  <option value="No Contest">Hủy kết quả (No Contest)</option>
                  <option value="DQ">Truất quyền thi đấu (DQ)</option>
                </select>
              </div>

              {/* Round & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hiệp đấu (Round)</label>
                  <select
                    value={resultForm.round}
                    onChange={(e) => setResultForm({ ...resultForm, round: Number(e.target.value) })}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    {[1, 2, 3, 4, 5].map(r => (
                      <option key={r} value={r}>Hiệp {r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Thời gian dừng (Time)</label>
                  <input
                    type="text"
                    required
                    placeholder="ví dụ: 2:15 hoặc 5:00"
                    value={resultForm.time}
                    onChange={(e) => setResultForm({ ...resultForm, time: e.target.value })}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Mô tả chi tiết đòn kết liễu (Tùy chọn):
                </label>
                <textarea
                  rows={2}
                  value={resultForm.description}
                  onChange={(e) => setResultForm({ ...resultForm, description: e.target.value })}
                  placeholder="Ví dụ: Đòn gối bay trúng cằm đối thủ khiến trọng tài dừng trận..."
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1e2438]">
                <button
                  type="button"
                  onClick={() => setIsResultModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-900/30"
                >
                  Lưu Kết Quả
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Event Modal */}
      {isCreateEventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#121627] border border-[#1e2438] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e2438]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-600/20 text-red-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Tạo Sự Kiện Võ Thuật Mới</h3>
              </div>
              <button
                onClick={() => setIsCreateEventModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tên Sự Kiện <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: LION Championship 31"
                  value={newEventForm.name}
                  onChange={(e) => setNewEventForm({ ...newEventForm, name: e.target.value })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Giải Đấu Tổ Chức</label>
                <select
                  value={newEventForm.promotionId}
                  onChange={(e) => setNewEventForm({ ...newEventForm, promotionId: e.target.value })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  {promotions.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Thời Gian Khai Mạc</label>
                  <input
                    type="datetime-local"
                    value={newEventForm.date.slice(0, 16)}
                    onChange={(e) => setNewEventForm({ ...newEventForm, date: new Date(e.target.value).toISOString() })}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Thành Phố</label>
                  <input
                    type="text"
                    value={newEventForm.city}
                    onChange={(e) => setNewEventForm({ ...newEventForm, city: e.target.value })}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Địa Điểm Thi Đấu <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Cung thể thao Quần Ngựa"
                  value={newEventForm.venue}
                  onChange={(e) => setNewEventForm({ ...newEventForm, venue: e.target.value })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Trạng Thái Khởi Tạo</label>
                <select
                  value={newEventForm.status}
                  onChange={(e) => setNewEventForm({ ...newEventForm, status: e.target.value as any })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="upcoming">Sắp diễn ra</option>
                  <option value="live">Đang trực tiếp</option>
                  <option value="completed">Đã kết thúc</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1e2438]">
                <button
                  type="button"
                  onClick={() => setIsCreateEventModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-900/30"
                >
                  Tạo Sự Kiện
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
