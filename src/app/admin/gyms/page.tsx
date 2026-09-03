'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Dumbbell, 
  Search, 
  Plus, 
  Edit3, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  Users, 
  ShieldCheck,
  Star
} from 'lucide-react'
import { gyms as initialGyms } from '@/data/mock-data'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export default function AdminGymsPage() {
  const [gymList, setGymList] = useState(initialGyms)
  const [searchQuery, setSearchQuery] = useState('')
  const [cityFilter, setCityFilter] = useState('all')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const cities = ['all', 'TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng']

  const filteredGyms = gymList.filter(gym => {
    const matchesCity = cityFilter === 'all' || gym.city === cityFilter
    const matchesSearch = !searchQuery ||
      gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (gym.address && gym.address.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCity && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Dumbbell className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-white">Quản trị Phòng tập & CLB Võ thuật</h1>
          </div>
          <p className="text-sm text-slate-400">
            Hệ thống cơ sở đào tạo võ sĩ chuyên nghiệp, phòng tập đối tác và lò luyện võ MMA trên toàn quốc.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/phong-tap"
            target="_blank"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#161b2e] border border-[#232942] text-slate-300 hover:text-white transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Xem trên Web</span>
          </Link>
          <button
            onClick={() => {
              setToastMessage('Khung đăng ký phòng tập mới đang mở!')
              setTimeout(() => setToastMessage(null), 3000)
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white transition-all shadow-lg shadow-red-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Phòng tập</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-[#121626] border border-[#1e243b] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm tên CLB, địa chỉ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#161a2e] border border-[#232942] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          {cities.map(city => (
            <button
              key={city}
              onClick={() => setCityFilter(city)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border",
                cityFilter === city
                  ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                  : "bg-[#161a2e] border-[#232942] text-slate-400 hover:text-white"
              )}
            >
              {city === 'all' ? 'Tất cả khu vực' : city}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Gyms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGyms.map(gym => (
          <div
            key={gym.id}
            className="rounded-2xl bg-[#121626] border border-[#1e243b] overflow-hidden flex flex-col hover:border-emerald-500/30 transition-all group"
          >
            <div className="p-5 border-b border-[#1e243b] bg-gradient-to-br from-[#161b2e] to-[#101424]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 uppercase">
                  {gym.city}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  Xác thực
                </span>
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">
                {gym.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{gym.address}</span>
              </p>
            </div>

            <div className="p-5 space-y-3 flex-1 text-xs">
              <div className="space-y-1.5 text-slate-300">
                {gym.contact?.phone && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <Phone className="w-3.5 h-3.5" />
                    <span className="font-mono">{gym.contact.phone}</span>
                  </div>
                )}
                {gym.headCoach && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>HLV trưởng: <strong className="text-white">{gym.headCoach}</strong></span>
                  </div>
                )}
              </div>

              {gym.description && (
                <p className="text-slate-400 text-[11px] line-clamp-2 pt-2 border-t border-[#1e243b]">
                  {gym.description}
                </p>
              )}
            </div>

            <div className="p-3 border-t border-[#1e243b] bg-[#0c0f1c]/50 flex items-center justify-between">
              <Link
                href={`/phong-tap/${gym.id}`}
                target="_blank"
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium"
              >
                Trang chi tiết <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={() => {
                  setToastMessage(`Đã mở trình chỉnh sửa phòng tập ${gym.name}`)
                  setTimeout(() => setToastMessage(null), 3000)
                }}
                className="px-3 py-1.5 rounded-lg bg-[#181d33] hover:bg-emerald-600 hover:text-white text-xs font-semibold text-slate-300 transition-all flex items-center gap-1.5"
              >
                <Edit3 className="w-3 h-3" /> Chỉnh sửa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
