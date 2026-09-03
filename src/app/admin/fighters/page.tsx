'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  Users, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Filter, 
  Trophy, 
  Sliders, 
  Check, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Swords, 
  Dumbbell, 
  Scale, 
  Zap, 
  ArrowUpDown,
  Flame,
  Award
} from 'lucide-react'
import { fighters as initialFighters, divisions, gyms } from '@/data/mock-data'
import { RadarChart } from '@/components/charts/RadarChart'
import { formatRecord } from '@/lib/services/fighter-service'
import type { Fighter } from '@/types'

export default function AdminFightersPage() {
  const [fighterList, setFighterList] = useState<Fighter[]>(initialFighters)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDivision, setSelectedDivision] = useState<string>('all')
  const [selectedGym, setSelectedGym] = useState<string>('all')
  const [selectedChampionFilter, setSelectedChampionFilter] = useState<string>('all')
  
  // Toast notification state
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null)

  // Edit / Add Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFighterId, setEditingFighterId] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState<Partial<Fighter>>({
    name: '',
    nickname: '',
    dateOfBirth: '1995-01-01',
    nationality: 'VN',
    height: 170,
    reach: 172,
    divisionId: 'd-m-61',
    gymId: 'g1',
    styles: ['MMA', 'Striking'],
    eloRating: 1500,
    isChampion: false,
    championshipTitle: '',
    record: {
      wins: 0,
      losses: 0,
      draws: 0,
      noContests: 0,
      winsByKo: 0,
      winsBySub: 0,
      winsByDec: 0,
    },
    stats: {
      strikingAccuracy: 60,
      strikingDefense: 60,
      takedownAccuracy: 50,
      takedownDefense: 50,
      finishRate: 70,
      striking: 3,
      wrestling: 3,
      clinch: 3,
      groundGame: 3,
      defense: 3,
      cardio: 3,
    }
  })

  // Show temporary toast
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type })
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Open modal for new fighter
  const handleOpenAdd = () => {
    setEditingFighterId(null)
    setFormData({
      name: '',
      nickname: '',
      dateOfBirth: '1996-05-10',
      nationality: 'VN',
      height: 172,
      reach: 174,
      divisionId: 'd-m-65',
      gymId: 'g1',
      styles: ['MMA', 'Boxing'],
      eloRating: 1450,
      isChampion: false,
      championshipTitle: '',
      record: {
        wins: 5,
        losses: 1,
        draws: 0,
        noContests: 0,
        winsByKo: 3,
        winsBySub: 1,
        winsByDec: 1,
      },
      stats: {
        strikingAccuracy: 55,
        strikingDefense: 60,
        takedownAccuracy: 45,
        takedownDefense: 60,
        finishRate: 80,
        striking: 3,
        wrestling: 3,
        clinch: 3,
        groundGame: 3,
        defense: 3,
        cardio: 4,
      }
    })
    setIsModalOpen(true)
  }

  // Open modal for editing existing fighter
  const handleOpenEdit = (fighter: Fighter) => {
    setEditingFighterId(fighter.id)
    setFormData(JSON.parse(JSON.stringify(fighter)))
    setIsModalOpen(true)
  }

  // Handle delete fighter
  const handleDeleteFighter = (id: string) => {
    const fighter = fighterList.find(f => f.id === id)
    setFighterList(prev => prev.filter(f => f.id !== id))
    setDeleteConfirmId(null)
    showToast(`Đã xóa võ sĩ ${fighter?.name || id} khỏi cơ sở dữ liệu.`, 'info')
  }

  // Handle Save (Add or Update)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name?.trim()) {
      showToast('Vui lòng nhập họ và tên võ sĩ.', 'error')
      return
    }

    if (editingFighterId) {
      // Update
      setFighterList(prev => prev.map(f => {
        if (f.id === editingFighterId) {
          return {
            ...f,
            ...formData,
          } as Fighter
        }
        return f
      }))
      showToast(`Đã cập nhật thông tin võ sĩ ${formData.name} thành công!`)
    } else {
      // Add new
      const newId = `f-new-${Date.now()}`
      const newFighter: Fighter = {
        ...formData,
        id: newId,
        name: formData.name.trim(),
        record: formData.record || { wins: 0, losses: 0, draws: 0, noContests: 0, winsByKo: 0, winsBySub: 0, winsByDec: 0 },
        stats: formData.stats || {
          strikingAccuracy: 50,
          strikingDefense: 50,
          takedownAccuracy: 50,
          takedownDefense: 50,
          finishRate: 50,
          striking: 3,
          wrestling: 3,
          clinch: 3,
          groundGame: 3,
          defense: 3,
          cardio: 3,
        }
      } as Fighter

      setFighterList(prev => [newFighter, ...prev])
      showToast(`Đã thêm mới võ sĩ ${newFighter.name} vào hệ thống!`)
    }

    setIsModalOpen(false)
  }

  // Filtered list
  const filteredFighters = useMemo(() => {
    return fighterList.filter(fighter => {
      // Search query
      const matchSearch = searchQuery === '' || 
        fighter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (fighter.nickname && fighter.nickname.toLowerCase().includes(searchQuery.toLowerCase()))

      // Division
      const matchDivision = selectedDivision === 'all' || fighter.divisionId === selectedDivision

      // Gym
      const matchGym = selectedGym === 'all' || fighter.gymId === selectedGym

      // Champion
      const matchChamp = selectedChampionFilter === 'all' || 
        (selectedChampionFilter === 'champ' && fighter.isChampion) ||
        (selectedChampionFilter === 'non-champ' && !fighter.isChampion)

      return matchSearch && matchDivision && matchGym && matchChamp
    })
  }, [fighterList, searchQuery, selectedDivision, selectedGym, selectedChampionFilter])

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-2xl text-xs font-semibold animate-fade-in ${
          toastMessage.type === 'success' ? 'bg-emerald-950 border-emerald-500/50 text-emerald-200' :
          toastMessage.type === 'error' ? 'bg-rose-950 border-rose-500/50 text-rose-200' :
          'bg-blue-950 border-blue-500/50 text-blue-200'
        }`}>
          {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
          {toastMessage.type === 'info' && <AlertCircle className="w-4 h-4 text-blue-400" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Swords className="w-6 h-6 text-red-500" />
            <span>Quản Lý Hồ Sơ Võ Sĩ MMA</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tổng cộng <strong className="text-white">{fighterList.length}</strong> võ sĩ trong cơ sở dữ liệu MMAVN Hub
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-900/30 transition-all hover:scale-[1.02] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Võ Sĩ Mới</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-[#121627] border border-[#1e2438] p-4 rounded-2xl space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search box */}
          <div className="md:col-span-1 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, biệt danh..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          {/* Division Filter */}
          <div className="relative">
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
            >
              <option value="all">Tất cả hạng cân ({divisions.length})</option>
              {divisions.map(div => (
                <option key={div.id} value={div.id}>
                  {div.nameVi} ({div.weightLimit}kg - {div.gender === 'male' ? 'Nam' : 'Nữ'})
                </option>
              ))}
            </select>
          </div>

          {/* Gym Filter */}
          <div className="relative">
            <select
              value={selectedGym}
              onChange={(e) => setSelectedGym(e.target.value)}
              className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
            >
              <option value="all">Tất cả phòng tập / CLB ({gyms.length})</option>
              {gyms.map(gym => (
                <option key={gym.id} value={gym.id}>
                  {gym.name} ({gym.city})
                </option>
              ))}
            </select>
          </div>

          {/* Champion Filter */}
          <div className="relative">
            <select
              value={selectedChampionFilter}
              onChange={(e) => setSelectedChampionFilter(e.target.value)}
              className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
            >
              <option value="all">Tất cả trạng thái đai</option>
              <option value="champ">🏆 Đương kim Vô địch</option>
              <option value="non-champ">Võ sĩ thách đấu / Tranh tài</option>
            </select>
          </div>
        </div>

        {/* Active filter counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-[#1a1f33]">
          <span>
            Đang hiển thị <strong className="text-white">{filteredFighters.length}</strong> / {fighterList.length} võ sĩ
          </span>
          {(searchQuery || selectedDivision !== 'all' || selectedGym !== 'all' || selectedChampionFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedDivision('all')
                setSelectedGym('all')
                setSelectedChampionFilter('all')
              }}
              className="text-red-400 hover:text-red-300 font-medium"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Fighters Table */}
      <div className="bg-[#121627] border border-[#1e2438] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1e2438] bg-[#0f1222] text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Võ Sĩ</th>
                <th className="py-3.5 px-4">Hạng Cân</th>
                <th className="py-3.5 px-4">Phòng Tập (Gym)</th>
                <th className="py-3.5 px-4 text-center">Thành Tích (W-L-D)</th>
                <th className="py-3.5 px-4 text-center">Chi Tiết Thắng</th>
                <th className="py-3.5 px-4 text-center">Hệ Số Elo</th>
                <th className="py-3.5 px-4 text-center">Trạng Thái</th>
                <th className="py-3.5 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2438]">
              {filteredFighters.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-400 opacity-60" />
                    <p className="text-sm font-medium">Không tìm thấy võ sĩ nào phù hợp với bộ lọc.</p>
                  </td>
                </tr>
              ) : (
                filteredFighters.map((fighter) => {
                  const division = divisions.find(d => d.id === fighter.divisionId)
                  const gym = gyms.find(g => g.id === fighter.gymId)

                  return (
                    <tr key={fighter.id} className="hover:bg-[#161b30] transition-colors group">
                      {/* Avatar & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-amber-600 flex items-center justify-center text-white font-black text-sm border border-red-500/40 overflow-hidden shadow-md">
                              {fighter.name.charAt(0)}
                            </div>
                            {fighter.isChampion && (
                              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-[10px] shadow" title="Đương kim Vô địch">
                                👑
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-white text-sm group-hover:text-red-400 transition-colors">
                                {fighter.name}
                              </span>
                            </div>
                            <span className="text-slate-400 text-[11px]">
                              {fighter.nickname ? `"${fighter.nickname}"` : 'Võ sĩ MMA'} • {fighter.nationality}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Weight Class */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-200">
                          {division ? division.nameVi : fighter.divisionId}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {division ? `${division.weightLimit} kg` : ''}
                        </span>
                      </td>

                      {/* Gym */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-300 flex items-center gap-1.5 truncate max-w-[160px]" title={gym?.name}>
                          <Dumbbell className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span className="truncate">{gym ? gym.name : 'Tự do'}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{gym?.city || 'Việt Nam'}</span>
                      </td>

                      {/* Record */}
                      <td className="py-3 px-4 text-center">
                        <span className="font-black text-white text-xs px-2 py-1 rounded bg-[#0d101e] border border-[#1e2438] inline-block font-mono">
                          {formatRecord(fighter.record)}
                        </span>
                      </td>

                      {/* Finish detail */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                          <span className="text-red-400 font-semibold">{fighter.record.winsByKo} KO</span>
                          <span>•</span>
                          <span className="text-blue-400 font-semibold">{fighter.record.winsBySub} Sub</span>
                          <span>•</span>
                          <span className="text-slate-400">{fighter.record.winsByDec} Dec</span>
                        </div>
                      </td>

                      {/* Elo */}
                      <td className="py-3 px-4 text-center">
                        <span className="font-extrabold text-amber-400 font-mono text-xs">
                          {fighter.eloRating}
                        </span>
                      </td>

                      {/* Status / Champion */}
                      <td className="py-3 px-4 text-center">
                        {fighter.isChampion ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            <Trophy className="w-3 h-3" /> Vô địch
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300">
                            Thách đấu
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/vo-si/${fighter.id}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="Xem trang công khai"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleOpenEdit(fighter)}
                            className="p-1.5 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-950/40 transition-colors"
                            title="Sửa thông tin & radar"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(fighter.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
                            title="Xóa võ sĩ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#14182b] border border-[#1e2438] rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white">Xác nhận xóa võ sĩ?</h3>
              <p className="text-xs text-slate-400">
                Hành động này sẽ gỡ hồ sơ võ sĩ khỏi danh sách hiển thị và bảng xếp hạng MMAVN Hub.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => handleDeleteFighter(deleteConfirmId)}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white transition-colors"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Add Modal with Live Radar Chart */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121627] border border-[#1e2438] rounded-2xl max-w-4xl w-full p-6 md:p-8 shadow-2xl space-y-6 my-8 animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1e2438]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-600/20 text-red-400">
                  <Swords className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {editingFighterId ? 'Chỉnh Sửa Hồ Sơ & Chỉ Số Võ Sĩ' : 'Thêm Võ Sĩ MMA Mới'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Cập nhật thông số kỹ thuật, thành tích thi đấu và biểu đồ Radar năng lực
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column (7 cols): Basic Info & Record */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Name & Nickname */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Họ và Tên <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                        placeholder="Ví dụ: Trần Quang Lộc"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Biệt danh (Nickname)</label>
                      <input
                        type="text"
                        value={formData.nickname || ''}
                        onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                        className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                        placeholder="Ví dụ: Quái Vật Biển"
                      />
                    </div>
                  </div>

                  {/* Division & Gym */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Hạng cân thi đấu</label>
                      <select
                        value={formData.divisionId}
                        onChange={(e) => setFormData({ ...formData, divisionId: e.target.value })}
                        className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                      >
                        {divisions.map(div => (
                          <option key={div.id} value={div.id}>
                            {div.nameVi} ({div.weightLimit}kg)
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">CLB / Phòng tập</label>
                      <select
                        value={formData.gymId}
                        onChange={(e) => setFormData({ ...formData, gymId: e.target.value })}
                        className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                      >
                        {gyms.map(gym => (
                          <option key={gym.id} value={gym.id}>
                            {gym.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Height, Reach, Elo */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Chiều cao (cm)</label>
                      <input
                        type="number"
                        value={formData.height || 170}
                        onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                        className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Sải tay (cm)</label>
                      <input
                        type="number"
                        value={formData.reach || 170}
                        onChange={(e) => setFormData({ ...formData, reach: Number(e.target.value) })}
                        className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Điểm Elo</label>
                      <input
                        type="number"
                        value={formData.eloRating || 1500}
                        onChange={(e) => setFormData({ ...formData, eloRating: Number(e.target.value) })}
                        className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-amber-400 font-bold focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  {/* Record Section */}
                  <div className="p-3.5 bg-[#0d101e] border border-[#1e2438] rounded-xl space-y-3">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Thành Tích Thi Đấu Chuyên Nghiệp (Fight Record)
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-0.5">Số trận Thắng (Wins)</label>
                        <input
                          type="number"
                          value={formData.record?.wins || 0}
                          onChange={(e) => setFormData({
                            ...formData,
                            record: { ...formData.record!, wins: Math.max(0, Number(e.target.value)) }
                          })}
                          className="w-full bg-[#121627] border border-[#1e2438] rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-0.5">Số trận Thua (Losses)</label>
                        <input
                          type="number"
                          value={formData.record?.losses || 0}
                          onChange={(e) => setFormData({
                            ...formData,
                            record: { ...formData.record!, losses: Math.max(0, Number(e.target.value)) }
                          })}
                          className="w-full bg-[#121627] border border-[#1e2438] rounded-lg px-2.5 py-1.5 text-xs text-rose-400 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-0.5">Hòa (Draws)</label>
                        <input
                          type="number"
                          value={formData.record?.draws || 0}
                          onChange={(e) => setFormData({
                            ...formData,
                            record: { ...formData.record!, draws: Math.max(0, Number(e.target.value)) }
                          })}
                          className="w-full bg-[#121627] border border-[#1e2438] rounded-lg px-2.5 py-1.5 text-xs text-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-1 border-t border-[#1a1f33]">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-0.5">Thắng KO/TKO</label>
                        <input
                          type="number"
                          value={formData.record?.winsByKo || 0}
                          onChange={(e) => setFormData({
                            ...formData,
                            record: { ...formData.record!, winsByKo: Math.max(0, Number(e.target.value)) }
                          })}
                          className="w-full bg-[#121627] border border-[#1e2438] rounded-lg px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-0.5">Thắng Khóa (Sub)</label>
                        <input
                          type="number"
                          value={formData.record?.winsBySub || 0}
                          onChange={(e) => setFormData({
                            ...formData,
                            record: { ...formData.record!, winsBySub: Math.max(0, Number(e.target.value)) }
                          })}
                          className="w-full bg-[#121627] border border-[#1e2438] rounded-lg px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-0.5">Thắng Điểm (Dec)</label>
                        <input
                          type="number"
                          value={formData.record?.winsByDec || 0}
                          onChange={(e) => setFormData({
                            ...formData,
                            record: { ...formData.record!, winsByDec: Math.max(0, Number(e.target.value)) }
                          })}
                          className="w-full bg-[#121627] border border-[#1e2438] rounded-lg px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Championship Status */}
                  <div className="flex items-center gap-3 p-3 bg-[#0d101e] border border-[#1e2438] rounded-xl">
                    <input
                      type="checkbox"
                      id="isChamp"
                      checked={formData.isChampion || false}
                      onChange={(e) => setFormData({ ...formData, isChampion: e.target.checked })}
                      className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                    />
                    <label htmlFor="isChamp" className="text-xs font-semibold text-slate-200 cursor-pointer">
                      Đang giữ đai vô địch (Champion Status)
                    </label>
                  </div>
                </div>

                {/* Right Column (5 cols): Radar Stats Sliders + Live Radar Chart */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 bg-[#0d101e] border border-[#1e2438] rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-red-400" />
                        Chỉ Số Kỹ Năng (Thang điểm 1 - 5)
                      </span>
                    </div>

                    {/* 6 Sliders */}
                    {[
                      { key: 'striking', label: 'Đòn đánh (Striking)' },
                      { key: 'wrestling', label: 'Đô vật (Wrestling)' },
                      { key: 'clinch', label: 'Khống chế gáy (Clinch)' },
                      { key: 'groundGame', label: 'Địa chiến (Ground Game)' },
                      { key: 'defense', label: 'Phòng thủ (Defense)' },
                      { key: 'cardio', label: 'Thể lực (Cardio)' },
                    ].map(statItem => {
                      const k = statItem.key as keyof typeof formData.stats
                      const val = (formData.stats && typeof formData.stats[k] === 'number') ? (formData.stats[k] as number) : 3

                      return (
                        <div key={statItem.key} className="space-y-1">
                          <div className="flex justify-between text-xs text-slate-300">
                            <span>{statItem.label}</span>
                            <strong className="text-red-400 font-mono">{val}/5</strong>
                          </div>
                          <input
                            type="range"
                            min={1}
                            max={5}
                            step={0.5}
                            value={val}
                            onChange={(e) => setFormData({
                              ...formData,
                              stats: {
                                ...formData.stats!,
                                [k]: Number(e.target.value)
                              }
                            })}
                            className="w-full accent-red-600 h-1.5 bg-[#1e2438] rounded-lg cursor-pointer"
                          />
                        </div>
                      )
                    })}
                  </div>

                  {/* Live Radar Preview */}
                  {formData.stats && (
                    <div className="p-3 bg-[#0d101e] border border-[#1e2438] rounded-xl">
                      <p className="text-[11px] font-bold text-center text-slate-400 uppercase tracking-wider mb-1">
                        Xem trước biểu đồ Radar
                      </p>
                      <RadarChart
                        stats={{
                          striking: formData.stats.striking,
                          wrestling: formData.stats.wrestling,
                          clinch: formData.stats.clinch,
                          groundGame: formData.stats.groundGame,
                          defense: formData.stats.defense,
                          cardio: formData.stats.cardio,
                        }}
                        label={formData.name || 'Võ sĩ'}
                        color="#e53e3e"
                        size={210}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Form Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1e2438]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-900/30 transition-colors"
                >
                  {editingFighterId ? 'Lưu Cập Nhật' : 'Tạo Võ Sĩ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
