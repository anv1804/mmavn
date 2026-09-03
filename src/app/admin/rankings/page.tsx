'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Trophy,
  ArrowUp,
  ArrowDown,
  Award,
  Crown,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  RotateCcw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Shield,
  Zap,
  TrendingUp,
  UserCheck,
  ArrowUpDown,
  Filter
} from 'lucide-react'
import { divisions, fighters as initialFighters, rankings as initialRankings, gyms } from '@/data/mock-data'
import type { Division, Fighter, Ranking } from '@/types'

interface RankedFighterItem {
  rankingId: string
  position: number
  previousPosition?: number
  fighter: Fighter
  divisionId: string
  eloRating: number
  isChampion: boolean
}

export default function AdminRankingsPage() {
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>('d-m-70')
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all')
  const [fightersList, setFightersList] = useState<Fighter[]>(initialFighters)
  const [rankingsList, setRankingsList] = useState<Ranking[]>(initialRankings)
  const [searchQuery, setSearchQuery] = useState('')

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null)
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Inline Elo editing state: { [fighterId]: eloValue }
  const [editingEloId, setEditingEloId] = useState<string | null>(null)
  const [tempEloValue, setTempEloValue] = useState<number>(1500)

  // Add Fighter Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedFighterToAdd, setSelectedFighterToAdd] = useState<string>('')
  const [addFighterSearch, setAddFighterSearch] = useState('')

  // Strip belt confirmation modal
  const [stripConfirmFighter, setStripConfirmFighter] = useState<Fighter | null>(null)

  // Filtered Divisions based on gender
  const availableDivisions = useMemo(() => {
    if (genderFilter === 'all') return divisions
    return divisions.filter(d => d.gender === genderFilter)
  }, [genderFilter])

  const currentDivision = useMemo(() => {
    return divisions.find(d => d.id === selectedDivisionId) || divisions[0]
  }, [selectedDivisionId])

  // Get ranked fighters for the selected division
  const currentRankedFighters = useMemo(() => {
    const divisionRankings = rankingsList
      .filter(r => r.divisionId === selectedDivisionId)
      .sort((a, b) => a.position - b.position)

    const items: RankedFighterItem[] = []

    for (const r of divisionRankings) {
      const fighter = fightersList.find(f => f.id === r.fighterId)
      if (fighter) {
        items.push({
          rankingId: `${r.divisionId}-${r.fighterId}`,
          position: r.position,
          previousPosition: r.previousPosition,
          fighter,
          divisionId: r.divisionId,
          eloRating: r.eloRating || fighter.eloRating,
          isChampion: fighter.isChampion && fighter.divisionId === selectedDivisionId,
        })
      }
    }

    if (!searchQuery) return items
    return items.filter(
      item =>
        item.fighter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.fighter.nickname && item.fighter.nickname.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [rankingsList, fightersList, selectedDivisionId, searchQuery])

  // Find division champion (if any)
  const divisionChampion = useMemo(() => {
    return fightersList.find(f => f.divisionId === selectedDivisionId && f.isChampion)
  }, [fightersList, selectedDivisionId])

  // Available fighters not in the current division ranking
  const unrankedFighters = useMemo(() => {
    const rankedIds = new Set(
      rankingsList.filter(r => r.divisionId === selectedDivisionId).map(r => r.fighterId)
    )
    return fightersList
      .filter(f => !rankedIds.has(f.id))
      .filter(f => {
        if (!addFighterSearch) return true
        return (
          f.name.toLowerCase().includes(addFighterSearch.toLowerCase()) ||
          (f.nickname && f.nickname.toLowerCase().includes(addFighterSearch.toLowerCase()))
        )
      })
  }, [fightersList, rankingsList, selectedDivisionId, addFighterSearch])

  // Helpers
  const getGymName = (gymId: string) => {
    const gym = gyms.find(g => g.id === gymId)
    return gym ? gym.name : 'Tự do'
  }

  // Action: Move Up in ranking
  const handleMoveUp = (index: number) => {
    if (index <= 0) return

    const divisionRankings = rankingsList
      .filter(r => r.divisionId === selectedDivisionId)
      .sort((a, b) => a.position - b.position)

    const currentItem = divisionRankings[index]
    const aboveItem = divisionRankings[index - 1]

    if (!currentItem || !aboveItem) return

    const prevPosCurrent = currentItem.position
    const prevPosAbove = aboveItem.position

    const updated = rankingsList.map(r => {
      if (r.divisionId === selectedDivisionId && r.fighterId === currentItem.fighterId) {
        return { ...r, position: prevPosAbove, previousPosition: prevPosCurrent }
      }
      if (r.divisionId === selectedDivisionId && r.fighterId === aboveItem.fighterId) {
        return { ...r, position: prevPosCurrent, previousPosition: prevPosAbove }
      }
      return r
    })

    setRankingsList(updated)
    const fighter = fightersList.find(f => f.id === currentItem.fighterId)
    showToast(`Đã nâng hạng #${prevPosAbove} cho ${fighter?.name || 'võ sĩ'}`)
  }

  // Action: Move Down in ranking
  const handleMoveDown = (index: number) => {
    const divisionRankings = rankingsList
      .filter(r => r.divisionId === selectedDivisionId)
      .sort((a, b) => a.position - b.position)

    if (index >= divisionRankings.length - 1) return

    const currentItem = divisionRankings[index]
    const belowItem = divisionRankings[index + 1]

    if (!currentItem || !belowItem) return

    const prevPosCurrent = currentItem.position
    const prevPosBelow = belowItem.position

    const updated = rankingsList.map(r => {
      if (r.divisionId === selectedDivisionId && r.fighterId === currentItem.fighterId) {
        return { ...r, position: prevPosBelow, previousPosition: prevPosCurrent }
      }
      if (r.divisionId === selectedDivisionId && r.fighterId === belowItem.fighterId) {
        return { ...r, position: prevPosCurrent, previousPosition: prevPosBelow }
      }
      return r
    })

    setRankingsList(updated)
    const fighter = fightersList.find(f => f.id === currentItem.fighterId)
    showToast(`Đã hạ hạng #${prevPosBelow} cho ${fighter?.name || 'võ sĩ'}`)
  }

  // Action: Set / Crown Champion
  const handleCrownChampion = (fighter: Fighter) => {
    const updatedFighters = fightersList.map(f => {
      // If another fighter in this division was champion, demote them
      if (f.divisionId === selectedDivisionId && f.isChampion && f.id !== fighter.id) {
        return { ...f, isChampion: false, championshipTitle: undefined }
      }
      // Crown new champion
      if (f.id === fighter.id) {
        return {
          ...f,
          isChampion: true,
          championshipTitle: `Vô địch ${currentDivision.nameVi} (${currentDivision.name})`,
          divisionId: selectedDivisionId
        }
      }
      return f
    })

    // Also move new champion to position #1 if not already
    const divisionRankings = rankingsList.filter(r => r.divisionId === selectedDivisionId)
    const currentRanking = divisionRankings.find(r => r.fighterId === fighter.id)

    let updatedRankings = [...rankingsList]
    if (currentRanking && currentRanking.position !== 1) {
      const otherRankings = divisionRankings
        .filter(r => r.fighterId !== fighter.id)
        .sort((a, b) => a.position - b.position)

      let posCounter = 2
      const newDivisionRankings: Ranking[] = [
        { ...currentRanking, position: 1, previousPosition: currentRanking.position },
        ...otherRankings.map(r => ({ ...r, position: posCounter++, previousPosition: r.position }))
      ]

      updatedRankings = rankingsList
        .filter(r => r.divisionId !== selectedDivisionId)
        .concat(newDivisionRankings)
    }

    setFightersList(updatedFighters)
    setRankingsList(updatedRankings)
    showToast(`👑 Đã phong đai Vô địch ${currentDivision.nameVi} cho ${fighter.name}!`)
  }

  // Action: Strip belt
  const handleStripBelt = (fighter: Fighter) => {
    const updatedFighters = fightersList.map(f => {
      if (f.id === fighter.id) {
        return { ...f, isChampion: false, championshipTitle: undefined }
      }
      return f
    })
    setFightersList(updatedFighters)
    setStripConfirmFighter(null)
    showToast(`Đã tước đai vô địch của ${fighter.name}. Đai hạng cân hiện đang để trống.`, 'info')
  }

  // Action: Remove from rankings
  const handleRemoveFromRanking = (fighterId: string, fighterName: string) => {
    const remainingInDivision = rankingsList
      .filter(r => r.divisionId === selectedDivisionId && r.fighterId !== fighterId)
      .sort((a, b) => a.position - b.position)

    // Re-index positions 1, 2, 3...
    const reIndexed = remainingInDivision.map((item, idx) => ({
      ...item,
      position: idx + 1,
      previousPosition: item.position
    }))

    const updated = rankingsList
      .filter(r => r.divisionId !== selectedDivisionId)
      .concat(reIndexed)

    setRankingsList(updated)
    showToast(`Đã xoá ${fighterName} khỏi bảng xếp hạng ${currentDivision.nameVi}`)
  }

  // Action: Save Elo Rating
  const handleSaveElo = (fighterId: string) => {
    const updatedRankings = rankingsList.map(r => {
      if (r.divisionId === selectedDivisionId && r.fighterId === fighterId) {
        return { ...r, eloRating: tempEloValue }
      }
      return r
    })
    const updatedFighters = fightersList.map(f => {
      if (f.id === fighterId) {
        return { ...f, eloRating: tempEloValue }
      }
      return f
    })

    setRankingsList(updatedRankings)
    setFightersList(updatedFighters)
    setEditingEloId(null)
    showToast(`Đã cập nhật hệ số Elo: ${tempEloValue}`)
  }

  // Action: Quick Elo Adjust (+/- 15)
  const handleQuickElo = (fighterId: string, delta: number) => {
    let newElo = 1500
    const updatedRankings = rankingsList.map(r => {
      if (r.divisionId === selectedDivisionId && r.fighterId === fighterId) {
        newElo = Math.max(500, (r.eloRating || 1500) + delta)
        return { ...r, eloRating: newElo }
      }
      return r
    })
    const updatedFighters = fightersList.map(f => {
      if (f.id === fighterId) {
        return { ...f, eloRating: Math.max(500, f.eloRating + delta) }
      }
      return f
    })

    setRankingsList(updatedRankings)
    setFightersList(updatedFighters)
    showToast(`Elo ${delta > 0 ? `+${delta}` : delta} (Hiện tại: ${newElo})`)
  }

  // Action: Add Fighter to Ranking
  const handleAddFighter = () => {
    if (!selectedFighterToAdd) return

    const fighter = fightersList.find(f => f.id === selectedFighterToAdd)
    if (!fighter) return

    const currentDivisionRankings = rankingsList.filter(r => r.divisionId === selectedDivisionId)
    const nextPosition = currentDivisionRankings.length + 1

    const newRanking: Ranking = {
      position: nextPosition,
      fighterId: fighter.id,
      divisionId: selectedDivisionId,
      eloRating: fighter.eloRating,
      type: 'official',
      previousPosition: undefined,
    }

    setRankingsList([...rankingsList, newRanking])
    setIsAddModalOpen(false)
    setSelectedFighterToAdd('')
    setAddFighterSearch('')
    showToast(`Đã thêm ${fighter.name} vào thứ hạng #${nextPosition} của ${currentDivision.nameVi}`)
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div
            className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50'
                : toast.type === 'error'
                ? 'bg-red-950/90 text-red-200 border-red-500/50'
                : 'bg-blue-950/90 text-blue-200 border-blue-500/50'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-red-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Quản Lý Bảng Xếp Hạng & Danh Hiệu
              </h1>
              <p className="text-xs text-slate-400">
                Điều chỉnh thứ tự top 10 theo hạng cân, phong/tước đai vô địch và cập nhật điểm Elo trực tiếp
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-lg shadow-red-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Võ Sĩ Vào Bảng Xếp Hạng</span>
          </button>
        </div>
      </div>

      {/* Gender & Division Selector Tabs */}
      <div className="bg-[#121627] border border-[#1e2438] rounded-2xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e2438] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Hạng đấu:</span>
            <div className="inline-flex p-1 bg-[#0d101e] border border-[#1e2438] rounded-lg">
              {(['all', 'male', 'female'] as const).map(g => (
                <button
                  key={g}
                  onClick={() => setGenderFilter(g)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                    genderFilter === g
                      ? 'bg-red-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {g === 'all' ? 'Tất cả' : g === 'male' ? 'Nam' : 'Nữ'}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm võ sĩ trong hạng..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Division Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {availableDivisions.map(div => {
            const count = rankingsList.filter(r => r.divisionId === div.id).length
            const isCurrent = div.id === selectedDivisionId
            return (
              <button
                key={div.id}
                onClick={() => setSelectedDivisionId(div.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition border ${
                  isCurrent
                    ? 'bg-red-600/20 text-red-300 border-red-500/50 shadow-md shadow-red-950/40'
                    : 'bg-[#14182b] text-slate-400 border-[#1e2438] hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>{div.nameVi}</span>
                <span className="text-[10px] text-slate-400 font-normal">({div.weightLimit}kg)</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isCurrent ? 'bg-red-500/40 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Division Status Card (Reigning Champion Banner & Division Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Champion Spot */}
        <div className="md:col-span-2 bg-gradient-to-r from-[#1b1728] via-[#161b33] to-[#121627] border border-amber-500/30 rounded-2xl p-5 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20">
                <div className="w-full h-full rounded-[14px] bg-[#0c0f1a] flex items-center justify-center overflow-hidden">
                  {divisionChampion ? (
                    <span className="text-2xl font-black text-amber-400">
                      {divisionChampion.name.slice(0, 2).toUpperCase()}
                    </span>
                  ) : (
                    <Shield className="w-8 h-8 text-slate-400" />
                  )}
                </div>
              </div>
              <div className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 p-1 rounded-full shadow">
                <Crown className="w-4 h-4 fill-current" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400">
                  Nhà Vô Địch Trị Vì (Reigning Champion)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold border border-amber-500/30">
                  {currentDivision.nameVi} ({currentDivision.weightLimit}kg)
                </span>
              </div>
              <h2 className="text-xl font-black text-white mt-0.5">
                {divisionChampion ? divisionChampion.name : 'Đang bỏ trống (Vacant)'}
              </h2>
              {divisionChampion ? (
                <p className="text-xs text-slate-300 mt-0.5">
                  Biệt danh: <span className="text-amber-300 font-semibold">{divisionChampion.nickname || 'Chưa đặt'}</span> | CLB: {getGymName(divisionChampion.gymId)} | Elo: <span className="font-mono text-emerald-400 font-bold">{divisionChampion.eloRating}</span>
                </p>
              ) : (
                <p className="text-xs text-slate-400 mt-0.5">
                  Chưa có võ sĩ giữ đai cho hạng cân này. Chọn một võ sĩ bên dưới để phong đai.
                </p>
              )}
            </div>
          </div>

          {divisionChampion && (
            <button
              onClick={() => setStripConfirmFighter(divisionChampion)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold border border-red-500/30 transition shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Tước đai vô địch</span>
            </button>
          )}
        </div>

        {/* Division Key Stats */}
        <div className="bg-[#121627] border border-[#1e2438] rounded-2xl p-5 flex flex-col justify-center space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-[#1e2438] pb-2">
            <span>Tổng số võ sĩ xếp hạng:</span>
            <span className="font-bold text-white font-mono text-sm">{currentRankedFighters.length}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-[#1e2438] pb-2">
            <span>Elo Trung Bình Hạng:</span>
            <span className="font-bold text-emerald-400 font-mono text-sm">
              {currentRankedFighters.length > 0
                ? Math.round(
                    currentRankedFighters.reduce((sum, item) => sum + item.eloRating, 0) /
                      currentRankedFighters.length
                  )
                : 0}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Hạng cân & Giới tính:</span>
            <span className="font-semibold text-slate-200">
              {currentDivision.gender === 'male' ? 'Nam' : 'Nữ'} • Tối đa {currentDivision.weightLimit}kg
            </span>
          </div>
        </div>
      </div>

      {/* Rankings Table Card */}
      <div className="bg-[#121627] border border-[#1e2438] rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-[#151a30] border-b border-[#1e2438] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-red-500" />
            <span className="font-bold text-sm text-white">
              Bảng Top Xếp Hạng - {currentDivision.nameVi} ({currentDivision.name})
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Kéo thả / Dùng nút mũi tên để đổi thứ bậc
          </span>
        </div>

        {currentRankedFighters.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Trophy className="w-10 h-10 mx-auto mb-3 text-slate-400 opacity-40" />
            <p className="text-sm font-medium">Chưa có võ sĩ nào trong bảng xếp hạng hạng cân này.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-semibold hover:bg-red-600/30"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm võ sĩ đầu tiên</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0e1222] text-slate-400 font-semibold border-b border-[#1e2438]">
                <tr>
                  <th className="py-3 px-4 w-16 text-center">Hạng</th>
                  <th className="py-3 px-4">Võ sĩ</th>
                  <th className="py-3 px-4">CLB / Võ đường</th>
                  <th className="py-3 px-4 text-center">Thành tích (W-L-D)</th>
                  <th className="py-3 px-4 text-center">Hệ số Elo</th>
                  <th className="py-3 px-4 text-center">Danh hiệu</th>
                  <th className="py-3 px-4 text-center">Thứ tự</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2438]">
                {currentRankedFighters.map((item, index) => {
                  const isChamp = item.isChampion
                  const isEditingElo = editingEloId === item.fighter.id
                  const rec = item.fighter.record

                  return (
                    <tr
                      key={item.rankingId}
                      className={`hover:bg-[#161c35] transition-colors ${
                        isChamp ? 'bg-amber-500/5' : ''
                      }`}
                    >
                      {/* Rank Position */}
                      <td className="py-4 px-4 text-center">
                        {isChamp ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 font-black text-sm">
                            <Crown className="w-4 h-4" />
                          </span>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-black font-mono text-sm ${
                                item.position === 1
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  : item.position <= 3
                                  ? 'bg-slate-800 text-slate-200'
                                  : 'text-slate-400'
                              }`}
                            >
                              #{item.position}
                            </span>
                            {/* Movement indicator */}
                            {item.previousPosition !== undefined && (
                              <span className="text-[10px] flex items-center gap-0.5 mt-0.5">
                                {item.previousPosition > item.position ? (
                                  <span className="text-emerald-400 flex items-center">
                                    <ArrowUp className="w-2.5 h-2.5" />
                                    {item.previousPosition - item.position}
                                  </span>
                                ) : item.previousPosition < item.position ? (
                                  <span className="text-red-400 flex items-center">
                                    <ArrowDown className="w-2.5 h-2.5" />
                                    {item.position - item.previousPosition}
                                  </span>
                                ) : (
                                  <span className="text-slate-400">-</span>
                                )}
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Fighter Info */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#1a213d] border border-[#27325c] flex items-center justify-center font-bold text-slate-200 shrink-0">
                            {item.fighter.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">
                                {item.fighter.name}
                              </span>
                              {isChamp && (
                                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                                  Champion
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400">
                              {item.fighter.nickname ? `"${item.fighter.nickname}"` : 'Võ sĩ MMA'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Gym */}
                      <td className="py-4 px-4">
                        <span className="text-slate-300 font-medium">
                          {getGymName(item.fighter.gymId)}
                        </span>
                      </td>

                      {/* Record */}
                      <td className="py-4 px-4 text-center">
                        <span className="font-mono text-xs font-bold text-slate-200">
                          <span className="text-emerald-400">{rec.wins}W</span> -{' '}
                          <span className="text-red-400">{rec.losses}L</span> -{' '}
                          <span className="text-slate-400">{rec.draws}D</span>
                        </span>
                        <div className="text-[10px] text-slate-400">
                          {rec.winsByKo} KO • {rec.winsBySub} SUB
                        </div>
                      </td>

                      {/* Elo Rating */}
                      <td className="py-4 px-4 text-center">
                        {isEditingElo ? (
                          <div className="inline-flex items-center gap-1.5 bg-[#0d101e] p-1 rounded-lg border border-red-500/50">
                            <input
                              type="number"
                              value={tempEloValue}
                              onChange={e => setTempEloValue(Number(e.target.value))}
                              className="w-16 bg-transparent text-white text-xs font-mono font-bold px-1 text-center focus:outline-none"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveElo(item.fighter.id)}
                              className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
                              title="Lưu"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setEditingEloId(null)}
                              className="p-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300"
                              title="Hủy"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5 group">
                            <button
                              onClick={() => handleQuickElo(item.fighter.id, -10)}
                              className="p-1 rounded hover:bg-[#1f2642] text-slate-400 hover:text-white transition opacity-60 group-hover:opacity-100"
                              title="Giảm 10 Elo"
                            >
                              -10
                            </button>
                            <span className="font-mono font-black text-sm text-emerald-400 px-2 py-0.5 bg-emerald-950/40 rounded border border-emerald-500/20">
                              {item.eloRating}
                            </span>
                            <button
                              onClick={() => handleQuickElo(item.fighter.id, 10)}
                              className="p-1 rounded hover:bg-[#1f2642] text-slate-400 hover:text-white transition opacity-60 group-hover:opacity-100"
                              title="Tăng 10 Elo"
                            >
                              +10
                            </button>
                            <button
                              onClick={() => {
                                setEditingEloId(item.fighter.id)
                                setTempEloValue(item.eloRating)
                              }}
                              className="p-1 text-slate-400 hover:text-white transition opacity-0 group-hover:opacity-100 ml-1"
                              title="Sửa trực tiếp"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Belt / Championship Status */}
                      <td className="py-4 px-4 text-center">
                        {isChamp ? (
                          <button
                            onClick={() => setStripConfirmFighter(item.fighter)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-[11px] font-bold transition"
                            title="Nhấp để tước đai"
                          >
                            <Crown className="w-3.5 h-3.5 fill-current" />
                            <span>Đang giữ đai</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleCrownChampion(item.fighter)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1a2038] hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 border border-[#273050] hover:border-amber-500/30 text-[11px] font-semibold transition"
                            title="Phong đai vô địch cho võ sĩ này"
                          >
                            <Crown className="w-3 h-3" />
                            <span>Phong đai</span>
                          </button>
                        )}
                      </td>

                      {/* Reorder Buttons */}
                      <td className="py-4 px-4 text-center">
                        <div className="inline-flex items-center gap-1 bg-[#0d101e] p-1 rounded-lg border border-[#1e2438]">
                          <button
                            onClick={() => handleMoveUp(index)}
                            disabled={index === 0}
                            className="p-1 rounded hover:bg-[#1a2038] text-slate-400 hover:text-emerald-400 disabled:opacity-30 disabled:pointer-events-none transition"
                            title="Nâng 1 bậc hạng"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveDown(index)}
                            disabled={index === currentRankedFighters.length - 1}
                            className="p-1 rounded hover:bg-[#1a2038] text-slate-400 hover:text-red-400 disabled:opacity-30 disabled:pointer-events-none transition"
                            title="Hạ 1 bậc hạng"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleRemoveFromRanking(item.fighter.id, item.fighter.name)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition"
                          title="Xóa khỏi bảng xếp hạng"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: ADD FIGHTER TO RANKINGS */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121627] border border-[#1e2438] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-[#1e2438] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-red-500" />
                  <span>Thêm võ sĩ vào Bảng Xếp Hạng</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Hạng cân: <span className="text-white font-semibold">{currentDivision.nameVi}</span> ({currentDivision.weightLimit}kg)
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Search input for unranked fighters */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Tìm kiếm võ sĩ chưa xếp hạng
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Nhập tên võ sĩ hoặc biệt danh..."
                    value={addFighterSearch}
                    onChange={e => setAddFighterSearch(e.target.value)}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Fighter selection list */}
              <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
                {unrankedFighters.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    Không tìm thấy võ sĩ nào khả dụng để thêm vào hạng cân này.
                  </div>
                ) : (
                  unrankedFighters.map(fighter => {
                    const isSelected = selectedFighterToAdd === fighter.id
                    return (
                      <div
                        key={fighter.id}
                        onClick={() => setSelectedFighterToAdd(fighter.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-red-600/20 border-red-500 text-white'
                            : 'bg-[#14182b] border-[#1e2438] hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#0d101e] flex items-center justify-center text-xs font-bold">
                            {fighter.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{fighter.name}</p>
                            <p className="text-[10px] text-slate-400">
                              {fighter.nickname || 'Chưa đặt biệt danh'} • {getGymName(fighter.gymId)}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[11px] font-mono font-bold text-emerald-400">
                            Elo {fighter.eloRating}
                          </span>
                          <p className="text-[10px] text-slate-400">
                            {fighter.record.wins}W - {fighter.record.losses}L
                          </p>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            <div className="p-4 bg-[#0e1222] border-t border-[#1e2438] flex items-center justify-end gap-2.5">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleAddFighter}
                disabled={!selectedFighterToAdd}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition disabled:opacity-40 disabled:pointer-events-none"
              >
                Thêm vào bảng xếp hạng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRM STRIP BELT */}
      {stripConfirmFighter && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121627] border border-[#1e2438] rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-amber-400">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Xác nhận tước đai vô địch</h3>
                <p className="text-xs text-slate-400">Hành động này sẽ giải phóng đai vô địch của hạng cân</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-[#0d101e] p-3 rounded-xl border border-[#1e2438]">
              Bạn có chắc chắn muốn tước đai vô địch <span className="text-amber-400 font-bold">{currentDivision.nameVi}</span> của võ sĩ <span className="text-white font-bold">{stripConfirmFighter.name}</span>? Đai sẽ chuyển sang trạng thái <strong className="text-white">Bỏ trống (Vacant)</strong>.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setStripConfirmFighter(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Giữ lại đai
              </button>
              <button
                onClick={() => handleStripBelt(stripConfirmFighter)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-lg shadow-red-600/20"
              >
                Xác nhận tước đai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
