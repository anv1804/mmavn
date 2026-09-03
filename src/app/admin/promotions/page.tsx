'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Flame,
  Shield,
  Crown,
  BookOpen,
  Edit3,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Check,
  Scale,
  Clock,
  Layers,
  Award,
  Swords,
  ChevronRight,
  Sparkles,
  FileText,
  Building
} from 'lucide-react'
import { promotions as initialPromotions, fighters as initialFighters, divisions } from '@/data/mock-data'
import type { Promotion, ChampionshipBelt, PromotionRules, PromotionFormat, Gender } from '@/types'

export default function AdminPromotionsPage() {
  const [promotionsList, setPromotionsList] = useState<Promotion[]>(initialPromotions)
  const [selectedPromoId, setSelectedPromoId] = useState<string>('p1')
  const [fightersList] = useState(initialFighters)

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null)
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Active promotion
  const activePromo = useMemo(() => {
    return promotionsList.find(p => p.id === selectedPromoId) || promotionsList[0]
  }, [promotionsList, selectedPromoId])

  // Modals state
  const [isEditPromoModalOpen, setIsEditPromoModalOpen] = useState(false)
  const [promoFormData, setPromoFormData] = useState<Partial<Promotion>>({})

  const [isEditRulesModalOpen, setIsEditRulesModalOpen] = useState(false)
  const [rulesFormData, setRulesFormData] = useState<PromotionRules>({
    cageType: '',
    roundDuration: '',
    elbowStrikes: '',
    kneesToHead: '',
    groundAndPound: '',
    scoringSystem: '',
    weightCutting: '',
    equipment: '',
    specialRules: []
  })
  const [newSpecialRuleText, setNewSpecialRuleText] = useState('')

  // Belt Modal State
  const [isBeltModalOpen, setIsBeltModalOpen] = useState(false)
  const [editingBeltId, setEditingBeltId] = useState<string | null>(null)
  const [beltFormData, setBeltFormData] = useState<{
    divisionId: string
    divisionName: string
    weightLimit: number
    gender: Gender
    currentChampionId?: string
    defenseCount: number
    status: 'active' | 'vacant'
  }>({
    divisionId: 'd-m-70',
    divisionName: 'Hạng Nhẹ (70kg Nam)',
    weightLimit: 70,
    gender: 'male',
    currentChampionId: '',
    defenseCount: 0,
    status: 'vacant'
  })

  // Open Edit Promotion Modal
  const handleOpenEditPromo = () => {
    setPromoFormData({
      name: activePromo.name,
      shortName: activePromo.shortName,
      tagline: activePromo.tagline,
      formatType: activePromo.formatType,
      formatDescription: activePromo.formatDescription,
      headquarters: activePromo.headquarters,
      foundedYear: activePromo.foundedYear,
      description: activePromo.description
    })
    setIsEditPromoModalOpen(true)
  }

  // Save Promotion Info
  const handleSavePromo = () => {
    const updated = promotionsList.map(p => {
      if (p.id === activePromo.id) {
        return {
          ...p,
          ...promoFormData
        }
      }
      return p
    })
    setPromotionsList(updated)
    setIsEditPromoModalOpen(false)
    showToast(`Đã cập nhật thông tin giải đấu "${promoFormData.name}"!`)
  }

  // Open Edit Rules Modal
  const handleOpenEditRules = () => {
    if (activePromo.rules) {
      setRulesFormData({ ...activePromo.rules })
    }
    setIsEditRulesModalOpen(true)
  }

  // Save Rules
  const handleSaveRules = () => {
    const updated = promotionsList.map(p => {
      if (p.id === activePromo.id) {
        return {
          ...p,
          rules: rulesFormData
        }
      }
      return p
    })
    setPromotionsList(updated)
    setIsEditRulesModalOpen(false)
    showToast(`Đã cập nhật điều lệ thi đấu của ${activePromo.name}!`)
  }

  // Add a special rule bullet
  const handleAddSpecialRule = () => {
    if (!newSpecialRuleText.trim()) return
    setRulesFormData(prev => ({
      ...prev,
      specialRules: [...prev.specialRules, newSpecialRuleText.trim()]
    }))
    setNewSpecialRuleText('')
  }

  // Remove a special rule bullet
  const handleRemoveSpecialRule = (index: number) => {
    setRulesFormData(prev => ({
      ...prev,
      specialRules: prev.specialRules.filter((_, i) => i !== index)
    }))
  }

  // Open Add Belt Modal
  const handleOpenAddBelt = () => {
    setEditingBeltId(null)
    setBeltFormData({
      divisionId: 'd-m-70',
      divisionName: 'Hạng Nhẹ (70kg Nam)',
      weightLimit: 70,
      gender: 'male',
      currentChampionId: '',
      defenseCount: 0,
      status: 'vacant'
    })
    setIsBeltModalOpen(true)
  }

  // Open Edit Belt Modal
  const handleOpenEditBelt = (belt: ChampionshipBelt) => {
    setEditingBeltId(belt.id)
    setBeltFormData({
      divisionId: belt.divisionId,
      divisionName: belt.divisionName,
      weightLimit: belt.weightLimit,
      gender: belt.gender,
      currentChampionId: belt.currentChampionId || '',
      defenseCount: belt.defenseCount || 0,
      status: belt.status
    })
    setIsBeltModalOpen(true)
  }

  // Save Belt
  const handleSaveBelt = () => {
    const updatedPromos = promotionsList.map(p => {
      if (p.id === activePromo.id) {
        const currentBelts = p.belts || []
        if (editingBeltId) {
          // Edit existing belt
          const updatedBelts = currentBelts.map(b => {
            if (b.id === editingBeltId) {
              return {
                ...b,
                ...beltFormData,
                currentChampionId: beltFormData.status === 'vacant' ? undefined : beltFormData.currentChampionId,
              }
            }
            return b
          })
          return { ...p, belts: updatedBelts }
        } else {
          // Add new belt
          const newBelt: ChampionshipBelt = {
            id: `b-${p.slug || p.id}-${Date.now()}`,
            ...beltFormData,
            currentChampionId: beltFormData.status === 'vacant' ? undefined : beltFormData.currentChampionId,
          }
          return { ...p, belts: [...currentBelts, newBelt] }
        }
      }
      return p
    })

    setPromotionsList(updatedPromos)
    setIsBeltModalOpen(false)
    showToast(editingBeltId ? 'Đã cập nhật danh hiệu đai!' : 'Đã thêm hạng đai mới vào giải đấu!')
  }

  // Delete Belt
  const handleDeleteBelt = (beltId: string, beltName: string) => {
    const updatedPromos = promotionsList.map(p => {
      if (p.id === activePromo.id) {
        return {
          ...p,
          belts: (p.belts || []).filter(b => b.id !== beltId)
        }
      }
      return p
    })
    setPromotionsList(updatedPromos)
    showToast(`Đã xóa đai "${beltName}" khỏi hệ thống`, 'info')
  }

  // Helper: Get fighter info
  const getFighter = (fighterId?: string) => {
    if (!fighterId) return null
    return fightersList.find(f => f.id === fighterId)
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
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

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center text-red-500">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Quản Lý Đấu Trường & Điều Lệ Giải Đấu
              </h1>
              <p className="text-xs text-slate-400">
                Điều chỉnh thông tin 3 đấu trường hàng đầu: LION Championship, GMA, V1 Champion, quản lý đai vô địch và bộ luật thi đấu
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Promotion Selector Switcher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {promotionsList.map(promo => {
          const isSelected = promo.id === selectedPromoId
          const activeBeltsCount = (promo.belts || []).filter(b => b.status === 'active').length
          const totalBeltsCount = (promo.belts || []).length

          return (
            <div
              key={promo.id}
              onClick={() => setSelectedPromoId(promo.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-[#181d36] to-[#121627] border-red-500/60 shadow-xl shadow-red-950/30 ring-1 ring-red-500/40'
                  : 'bg-[#121627] border-[#1e2438] hover:border-slate-700 hover:bg-[#15192d]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                      promo.formatType === 'Pro Cage'
                        ? 'bg-red-500/20 text-red-300 border-red-500/30'
                        : promo.formatType === 'Grand Prix'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {promo.formatType || 'Chuyên nghiệp'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Năm: {promo.foundedYear}</span>
                </div>

                <h3 className="text-lg font-black text-white">{promo.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{promo.tagline}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1e2438] flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>{activeBeltsCount}/{totalBeltsCount} đai có chủ</span>
                </span>
                <span className="font-semibold text-slate-300 flex items-center gap-1">
                  <span>Trụ sở: {promo.headquarters?.split('&')[0]}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Promotion Detail Overview Card */}
      <div className="bg-[#121627] border border-[#1e2438] rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e2438] pb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 p-0.5 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-red-600/20">
              <div className="w-full h-full bg-[#0c0f1a] rounded-[14px] flex items-center justify-center">
                {activePromo.shortName}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">{activePromo.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-[#1e2438] text-slate-300 font-mono">
                  {activePromo.shortName}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{activePromo.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenEditPromo}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1a2038] hover:bg-[#242c4c] text-slate-200 border border-[#273050] text-xs font-semibold transition"
            >
              <Edit3 className="w-3.5 h-3.5 text-red-400" />
              <span>Sửa Thông Tin Đấu Trường</span>
            </button>
          </div>
        </div>

        {/* Promotion Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-[#0e1222] border border-[#1e2438] rounded-xl space-y-1">
            <span className="text-slate-400">Thể thức thi đấu</span>
            <p className="font-bold text-white text-sm">{activePromo.formatType}</p>
            <p className="text-[11px] text-slate-400">{activePromo.formatDescription?.slice(0, 75)}...</p>
          </div>

          <div className="p-3.5 bg-[#0e1222] border border-[#1e2438] rounded-xl space-y-1">
            <span className="text-slate-400">Năm thành lập & Trụ sở</span>
            <p className="font-bold text-white text-sm">Năm {activePromo.foundedYear}</p>
            <p className="text-[11px] text-slate-400">{activePromo.headquarters}</p>
          </div>

          <div className="p-3.5 bg-[#0e1222] border border-[#1e2438] rounded-xl space-y-1">
            <span className="text-slate-400">Đai vô địch danh hiệu</span>
            <p className="font-bold text-amber-400 text-sm">
              {(activePromo.belts || []).length} Hạng đai
            </p>
            <p className="text-[11px] text-slate-400">
              {(activePromo.belts || []).filter(b => b.status === 'active').length} Đai đang có nhà vô địch trị vì
            </p>
          </div>

          <div className="p-3.5 bg-[#0e1222] border border-[#1e2438] rounded-xl space-y-1">
            <span className="text-slate-400">Mô tả giải đấu</span>
            <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3">
              {activePromo.description}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION: Championship Belts Management */}
      <div className="bg-[#121627] border border-[#1e2438] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 bg-[#151a30] border-b border-[#1e2438] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Crown className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-base text-white">
                Hệ Thống Đai Vô Địch ({activePromo.name})
              </h3>
              <p className="text-xs text-slate-400">
                Quản lý các danh hiệu vô địch chính thức của giải, võ sĩ giữ đai và số lần bảo vệ đai
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenAddBelt}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Hạng Đai Mới</span>
          </button>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(activePromo.belts || []).length === 0 ? (
            <div className="col-span-full p-8 text-center text-slate-400">
              Chưa có hạng đai nào được thiết lập cho giải đấu này.
            </div>
          ) : (
            (activePromo.belts || []).map(belt => {
              const champion = getFighter(belt.currentChampionId)
              const isVacant = belt.status === 'vacant' || !champion

              return (
                <div
                  key={belt.id}
                  className={`p-4 rounded-xl border flex flex-col justify-between transition ${
                    !isVacant
                      ? 'bg-[#14182e] border-amber-500/30 hover:border-amber-500/50'
                      : 'bg-[#101322] border-[#1e2438] hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Belt division & status badge */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-white">{belt.divisionName}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                          !isVacant
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {!isVacant ? 'Có chủ đai' : 'Bỏ trống (Vacant)'}
                      </span>
                    </div>

                    {/* Champion profile display */}
                    {!isVacant && champion ? (
                      <div className="flex items-center gap-3 mt-3 bg-[#0d101e] p-3 rounded-xl border border-[#1e2438]">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                          {champion.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white text-xs truncate">{champion.name}</p>
                          <p className="text-[11px] text-amber-300 font-medium">
                            {champion.nickname ? `"${champion.nickname}"` : 'Đương kim vô địch'}
                          </p>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Đã bảo vệ: <strong className="text-white">{belt.defenseCount || 0}</strong> lần
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-[#0d101e] border border-dashed border-[#1e2438] text-center my-3">
                        <Crown className="w-6 h-6 mx-auto text-slate-400 opacity-40 mb-1" />
                        <p className="text-xs font-medium text-slate-400">Đai hiện đang bỏ trống</p>
                        <p className="text-[10px] text-slate-400">Chưa có võ sĩ nắm giữ đai này</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-[#1e2438] flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400">
                      Giới hạn: <strong className="text-slate-300">{belt.weightLimit}kg</strong> ({belt.gender === 'male' ? 'Nam' : 'Nữ'})
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditBelt(belt)}
                        className="p-1.5 rounded-lg bg-[#1a2038] hover:bg-[#242c4c] text-slate-300 text-xs border border-[#273050] transition"
                        title="Chỉnh sửa đai"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBelt(belt.id, belt.divisionName)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition"
                        title="Xoá đai này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* SECTION: Rulebook Management */}
      <div className="bg-[#121627] border border-[#1e2438] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 bg-[#151a30] border-b border-[#1e2438] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="font-bold text-base text-white">
                Bộ Điều Lệ & Luật Thi Đấu ({activePromo.name})
              </h3>
              <p className="text-xs text-slate-400">
                Quy chuẩn kích thước lồng, thời lượng hiệp, quy định đòn chỏ/gối, ground & pound và quy chế cân ký
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenEditRules}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-lg shadow-red-600/20 self-start sm:self-auto"
          >
            <Edit3 className="w-4 h-4" />
            <span>Chỉnh Sửa Bộ Luật</span>
          </button>
        </div>

        {activePromo.rules ? (
          <div className="p-5 space-y-6">
            {/* Rules 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0d101e] border border-[#1e2438] space-y-1.5">
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Khu vực thi đấu & Lồng đài
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {activePromo.rules.cageType}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d101e] border border-[#1e2438] space-y-1.5">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Thời lượng các hiệp đấu
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {activePromo.rules.roundDuration}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d101e] border border-[#1e2438] space-y-1.5">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5" />
                  Quy định đòn Cùi Chỏ (Elbows)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {activePromo.rules.elbowStrikes}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d101e] border border-[#1e2438] space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Quy định đòn Đầu Gối (Knees to Head)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {activePromo.rules.kneesToHead}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d101e] border border-[#1e2438] space-y-1.5">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  Địa chiến & Giã đòn (Ground and Pound)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {activePromo.rules.groundAndPound}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d101e] border border-[#1e2438] space-y-1.5">
                <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" />
                  Hệ thống chấm điểm (Scoring)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {activePromo.rules.scoringSystem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d101e] border border-[#1e2438] space-y-1.5">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" />
                  Cắt cân & Cân trọng lượng chính thức
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {activePromo.rules.weightCutting}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d101e] border border-[#1e2438] space-y-1.5">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  Trang bị bảo hộ thi đấu
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {activePromo.rules.equipment}
                </p>
              </div>
            </div>

            {/* Special Rules Checklist */}
            <div className="p-4 rounded-xl bg-[#0d101e] border border-[#1e2438] space-y-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Các điều khoản & Quy chế đặc thù riêng biệt
              </span>
              <ul className="space-y-2 pt-1">
                {activePromo.rules.specialRules?.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">
            Chưa có bộ luật nào được nạp cho giải đấu này.
          </div>
        )}
      </div>

      {/* MODAL: EDIT PROMOTION INFO */}
      {isEditPromoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121627] border border-[#1e2438] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-[#1e2438] flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-red-500" />
                <span>Chỉnh sửa thông tin Đấu Trường</span>
              </h3>
              <button
                onClick={() => setIsEditPromoModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tên giải đấu
                  </label>
                  <input
                    type="text"
                    value={promoFormData.name || ''}
                    onChange={e => setPromoFormData({ ...promoFormData, name: e.target.value })}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tên viết tắt (Short Name)
                  </label>
                  <input
                    type="text"
                    value={promoFormData.shortName || ''}
                    onChange={e => setPromoFormData({ ...promoFormData, shortName: e.target.value })}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tagline / Khẩu hiệu
                </label>
                <input
                  type="text"
                  value={promoFormData.tagline || ''}
                  onChange={e => setPromoFormData({ ...promoFormData, tagline: e.target.value })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Thể thức thi đấu (Format)
                  </label>
                  <select
                    value={promoFormData.formatType || 'Pro Cage'}
                    onChange={e =>
                      setPromoFormData({
                        ...promoFormData,
                        formatType: e.target.value as PromotionFormat
                      })
                    }
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Pro Cage">Pro Cage (Lồng Bát Giác Chuyên Nghiệp)</option>
                    <option value="Semi-Pro Grassroots">Semi-Pro Grassroots (Bán chuyên phong trào)</option>
                    <option value="Grand Prix">Grand Prix (Nhánh đấu Knock-out)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Năm thành lập
                  </label>
                  <input
                    type="number"
                    value={promoFormData.foundedYear || 2022}
                    onChange={e => setPromoFormData({ ...promoFormData, foundedYear: Number(e.target.value) })}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Trụ sở chính & Địa điểm tổ chức
                </label>
                <input
                  type="text"
                  value={promoFormData.headquarters || ''}
                  onChange={e => setPromoFormData({ ...promoFormData, headquarters: e.target.value })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Chi tiết thể thức
                </label>
                <textarea
                  rows={2}
                  value={promoFormData.formatDescription || ''}
                  onChange={e => setPromoFormData({ ...promoFormData, formatDescription: e.target.value })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Mô tả tổng quan giải đấu
                </label>
                <textarea
                  rows={3}
                  value={promoFormData.description || ''}
                  onChange={e => setPromoFormData({ ...promoFormData, description: e.target.value })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="p-4 bg-[#0e1222] border-t border-[#1e2438] flex items-center justify-end gap-2.5">
              <button
                onClick={() => setIsEditPromoModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSavePromo}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-lg shadow-red-600/20"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT BELT */}
      {isBeltModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121627] border border-[#1e2438] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-[#1e2438] flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>{editingBeltId ? 'Chỉnh Sửa Đai Vô Địch' : 'Thêm Hạng Đai Mới'}</span>
              </h3>
              <button
                onClick={() => setIsBeltModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Hạng cân áp dụng
                </label>
                <select
                  value={beltFormData.divisionId}
                  onChange={e => {
                    const div = divisions.find(d => d.id === e.target.value)
                    if (div) {
                      setBeltFormData({
                        ...beltFormData,
                        divisionId: div.id,
                        divisionName: `${div.nameVi} (${div.weightLimit}kg ${div.gender === 'male' ? 'Nam' : 'Nữ'})`,
                        weightLimit: div.weightLimit,
                        gender: div.gender
                      })
                    }
                  }}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  {divisions.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.nameVi} ({d.weightLimit}kg) - {d.gender === 'male' ? 'Nam' : 'Nữ'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tên hiển thị của đai
                </label>
                <input
                  type="text"
                  value={beltFormData.divisionName}
                  onChange={e => setBeltFormData({ ...beltFormData, divisionName: e.target.value })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Trạng thái đai
                  </label>
                  <select
                    value={beltFormData.status}
                    onChange={e =>
                      setBeltFormData({
                        ...beltFormData,
                        status: e.target.value as 'active' | 'vacant'
                      })
                    }
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="active">Đang có nhà vô địch (Active)</option>
                    <option value="vacant">Đai bỏ trống (Vacant)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Số lần bảo vệ đai thành công
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={beltFormData.defenseCount}
                    onChange={e => setBeltFormData({ ...beltFormData, defenseCount: Number(e.target.value) })}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {beltFormData.status === 'active' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Võ sĩ giữ đai vô địch
                  </label>
                  <select
                    value={beltFormData.currentChampionId || ''}
                    onChange={e => setBeltFormData({ ...beltFormData, currentChampionId: e.target.value })}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="">-- Chọn võ sĩ giữ đai --</option>
                    {fightersList.map(f => (
                      <option key={f.id} value={f.id}>
                        {f.name} {f.nickname ? `(${f.nickname})` : ''} - Elo {f.eloRating}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="p-4 bg-[#0e1222] border-t border-[#1e2438] flex items-center justify-end gap-2.5">
              <button
                onClick={() => setIsBeltModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSaveBelt}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-amber-500/20"
              >
                Lưu Hạng Đai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT RULES */}
      {isEditRulesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121627] border border-[#1e2438] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-[#1e2438] flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-red-500" />
                <span>Chỉnh Sửa Bộ Luật Thi Đấu ({activePromo.name})</span>
              </h3>
              <button
                onClick={() => setIsEditRulesModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Quy cách Lồng / Sàn đài thi đấu
                </label>
                <input
                  type="text"
                  value={rulesFormData.cageType}
                  onChange={e => setRulesFormData({ ...rulesFormData, cageType: e.target.value })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Thời lượng các hiệp đấu
                </label>
                <input
                  type="text"
                  value={rulesFormData.roundDuration}
                  onChange={e => setRulesFormData({ ...rulesFormData, roundDuration: e.target.value })}
                  className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Quy định đòn cùi chỏ (Elbows)
                  </label>
                  <textarea
                    rows={2}
                    value={rulesFormData.elbowStrikes}
                    onChange={e => setRulesFormData({ ...rulesFormData, elbowStrikes: e.target.value })}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Quy định đòn đầu gối (Knees to Head)
                  </label>
                  <textarea
                    rows={2}
                    value={rulesFormData.kneesToHead}
                    onChange={e => setRulesFormData({ ...rulesFormData, kneesToHead: e.target.value })}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Địa chiến & Giã đòn (Ground & Pound)
                  </label>
                  <textarea
                    rows={2}
                    value={rulesFormData.groundAndPound}
                    onChange={e => setRulesFormData({ ...rulesFormData, groundAndPound: e.target.value })}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Hệ thống tính điểm (Scoring System)
                  </label>
                  <textarea
                    rows={2}
                    value={rulesFormData.scoringSystem}
                    onChange={e => setRulesFormData({ ...rulesFormData, scoringSystem: e.target.value })}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Quy chế cân ký & Cắt cân
                  </label>
                  <textarea
                    rows={2}
                    value={rulesFormData.weightCutting}
                    onChange={e => setRulesFormData({ ...rulesFormData, weightCutting: e.target.value })}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Trang bị bảo hộ thi đấu
                  </label>
                  <textarea
                    rows={2}
                    value={rulesFormData.equipment}
                    onChange={e => setRulesFormData({ ...rulesFormData, equipment: e.target.value })}
                    className="w-full bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Special rules list management */}
              <div className="pt-2 border-t border-[#1e2438]">
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Các điều khoản đặc thù (Special Rules)
                </label>
                <div className="space-y-2 mb-3">
                  {rulesFormData.specialRules?.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#0d101e] border border-[#1e2438] flex items-center justify-between gap-2 text-xs text-slate-300"
                    >
                      <span className="flex-1">{rule}</span>
                      <button
                        onClick={() => handleRemoveSpecialRule(idx)}
                        className="p-1 text-slate-400 hover:text-red-400 shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Thêm điều khoản mới..."
                    value={newSpecialRuleText}
                    onChange={e => setNewSpecialRuleText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddSpecialRule()}
                    className="flex-1 bg-[#0d101e] border border-[#1e2438] rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500"
                  />
                  <button
                    onClick={handleAddSpecialRule}
                    type="button"
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#0e1222] border-t border-[#1e2438] flex items-center justify-end gap-2.5">
              <button
                onClick={() => setIsEditRulesModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSaveRules}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-lg shadow-red-600/20"
              >
                Lưu Bộ Điều Lệ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
