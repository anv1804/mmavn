'use client';

import React, { useState, useMemo } from 'react';
import { FightPredictionWidget } from '@/components/fight/FightPredictionWidget';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { EventWithDetails, FightWithFighters } from '@/lib/services/event-service';
import { FightPrediction, TopPredictor } from '@/types';
import { PREDICTION_RULES } from '@/lib/services/prediction-service';
import {
  Trophy,
  Flame,
  Award,
  Zap,
  ShieldCheck,
  Calendar,
  MapPin,
  TrendingUp,
  Search,
  CheckCircle2,
  Crown,
  Medal,
  ChevronRight,
  HelpCircle,
  Users,
} from 'lucide-react';

interface PredictionsClientProps {
  upcomingEvents: EventWithDetails[];
  initialPredictions: Record<string, FightPrediction>;
  leaderboard: TopPredictor[];
  statsSummary: {
    totalVotesAcrossAllFights: number;
    totalPredictors: number;
    topVotedFightId: string;
    mostPredictedMethod: string;
    averageAccuracy: string;
  };
}

export function PredictionsClient({
  upcomingEvents,
  initialPredictions,
  leaderboard,
  statsSummary,
}: PredictionsClientProps) {
  const [activeTab, setActiveTab] = useState<'fights' | 'leaderboard' | 'rules'>('fights');
  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'main' | 'title'>('all');
  const [leaderboardSearch, setLeaderboardSearch] = useState('');

  // Extract all upcoming fights
  const allFightsWithEvent = useMemo(() => {
    const list: Array<{ fight: FightWithFighters; event: EventWithDetails }> = [];
    upcomingEvents.forEach((event) => {
      event.fights.forEach((fight) => {
        list.push({ fight, event });
      });
    });
    return list;
  }, [upcomingEvents]);

  // Filtered fights
  const filteredFights = useMemo(() => {
    return allFightsWithEvent.filter(({ fight, event }) => {
      if (selectedEventId !== 'all' && event.id !== selectedEventId) {
        return false;
      }
      if (filterType === 'title' && !fight.isTitleFight) {
        return false;
      }
      if (filterType === 'main' && !fight.isMainEvent) {
        return false;
      }
      return true;
    });
  }, [allFightsWithEvent, selectedEventId, filterType]);

  // Filtered leaderboard
  const filteredLeaderboard = useMemo(() => {
    if (!leaderboardSearch.trim()) return leaderboard;
    const query = leaderboardSearch.toLowerCase().trim();
    return leaderboard.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.badge.toLowerCase().includes(query) ||
        item.beltName.toLowerCase().includes(query)
    );
  }, [leaderboard, leaderboardSearch]);

  const top3 = leaderboard.slice(0, 3);

  const getBeltBadgeClass = (tier: string) => {
    switch (tier) {
      case 'gold':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'black':
        return 'bg-zinc-800 text-zinc-100 border-zinc-500';
      case 'brown':
        return 'bg-amber-950 text-amber-500 border-amber-800';
      case 'purple':
        return 'bg-purple-900/40 text-purple-300 border-purple-500/40';
      case 'blue':
        return 'bg-blue-900/40 text-blue-300 border-blue-500/40';
      default:
        return 'bg-zinc-900 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card-hover to-background border border-border p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary-soft text-xs font-semibold uppercase tracking-wider mb-4 animate-pulse-soft">
            <Flame className="w-3.5 h-3.5 text-primary" />
            Đấu Trường Dự Đoán MMA Việt Nam
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Dự Đoán Kết Quả &amp;{' '}
            <span className="bg-gradient-to-r from-primary via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Tranh Đai Thần Đoán
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 mb-6 leading-relaxed">
            Thử tài nhận định các trận so găng rực lửa của MMA Việt Nam. Dự đoán chính xác võ sĩ thắng, phương thức kết liễu và hiệp đấu để leo bảng xếp hạng thần đoán, sở hữu đai vô địch cùng nhiều phần quà hấp dẫn!
          </p>

          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-background/60 border border-border/80 backdrop-blur-sm">
              <div className="text-xs text-muted font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-accent" /> Lượt bình chọn
              </div>
              <div className="text-lg sm:text-xl font-black text-foreground mt-0.5">
                {statsSummary.totalVotesAcrossAllFights.toLocaleString('vi-VN')}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-background/60 border border-border/80 backdrop-blur-sm">
              <div className="text-xs text-muted font-medium flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-500" /> Trận sắp tới
              </div>
              <div className="text-lg sm:text-xl font-black text-foreground mt-0.5">
                {allFightsWithEvent.length} trận đấu
              </div>
            </div>

            <div className="p-3 rounded-xl bg-background/60 border border-border/80 backdrop-blur-sm">
              <div className="text-xs text-muted font-medium flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-400" /> Đai cao nhất
              </div>
              <div className="text-sm sm:text-base font-bold text-amber-400 mt-1 truncate">
                Đai Vàng Vô Địch
              </div>
            </div>

            <div className="p-3 rounded-xl bg-background/60 border border-border/80 backdrop-blur-sm">
              <div className="text-xs text-muted font-medium flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Tỷ lệ chuẩn xác
              </div>
              <div className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">
                {statsSummary.averageAccuracy}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('fights')}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2',
              activeTab === 'fights'
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-card text-muted hover:text-foreground hover:bg-card-hover border border-border'
            )}
          >
            <Zap className="w-4 h-4" />
            <span>Kèo Đấu Dự Đoán ({allFightsWithEvent.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('leaderboard')}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2',
              activeTab === 'leaderboard'
                ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/25'
                : 'bg-card text-muted hover:text-foreground hover:bg-card-hover border border-border'
            )}
          >
            <Trophy className="w-4 h-4" />
            <span>Bảng Xếp Hạng Thần Đoán</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rules')}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2',
              activeTab === 'rules'
                ? 'bg-zinc-100 text-black font-bold'
                : 'bg-card text-muted hover:text-foreground hover:bg-card-hover border border-border'
            )}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Thể Lệ &amp; Điểm Số</span>
          </button>
        </div>
      </div>

      {/* TAB 1: FIGHT PREDICTION WIDGETS */}
      {activeTab === 'fights' && (
        <div className="space-y-6">
          {/* Sub Filters for Events & Fight Types */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card/60 p-4 rounded-2xl border border-border">
            {/* Event Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted mr-1">
                Sự kiện:
              </span>
              <button
                type="button"
                onClick={() => setSelectedEventId('all')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                  selectedEventId === 'all'
                    ? 'bg-primary/20 text-primary-soft border-primary font-bold'
                    : 'bg-background/80 text-zinc-400 border-border hover:bg-card'
                )}
              >
                Tất cả ({allFightsWithEvent.length})
              </button>

              {upcomingEvents.map((evt) => (
                <button
                  key={evt.id}
                  type="button"
                  onClick={() => setSelectedEventId(evt.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                    selectedEventId === evt.id
                      ? 'bg-primary/20 text-primary-soft border-primary font-bold'
                      : 'bg-background/80 text-zinc-400 border-border hover:bg-card'
                  )}
                >
                  {evt.name} ({evt.fights.length})
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1.5 border-t sm:border-t-0 pt-2 sm:pt-0 border-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted mr-1">
                Lọc:
              </span>
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={cn(
                  'px-2.5 py-1 rounded text-xs transition-colors',
                  filterType === 'all'
                    ? 'bg-zinc-700 text-white font-semibold'
                    : 'text-zinc-400 hover:text-white'
                )}
              >
                Tất cả
              </button>
              <button
                type="button"
                onClick={() => setFilterType('title')}
                className={cn(
                  'px-2.5 py-1 rounded text-xs transition-colors',
                  filterType === 'title'
                    ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                    : 'text-zinc-400 hover:text-white'
                )}
              >
                🏆 Tranh Đai
              </button>
              <button
                type="button"
                onClick={() => setFilterType('main')}
                className={cn(
                  'px-2.5 py-1 rounded text-xs transition-colors',
                  filterType === 'main'
                    ? 'bg-red-500/20 text-red-400 font-semibold border border-red-500/40'
                    : 'text-zinc-400 hover:text-white'
                )}
              >
                Main Event
              </button>
            </div>
          </div>

          {/* Fights Grid */}
          <div className="space-y-8">
            {filteredFights.map(({ fight, event }) => {
              const initialPred = initialPredictions[fight.id];

              return (
                <div key={fight.id} className="space-y-2">
                  {/* Event & Card Position Header */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-muted px-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">
                        {event.name}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-accent" />
                        {new Date(event.date).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted" />
                        {event.city}
                      </span>
                    </div>

                    <Badge
                      variant={fight.cardPosition === 'main-card' ? 'primary' : 'outline'}
                      size="sm"
                    >
                      {fight.cardPosition === 'main-card' ? 'Main Card' : 'Prelims'}
                    </Badge>
                  </div>

                  {/* Interactive Prediction Widget */}
                  <FightPredictionWidget
                    fightId={fight.id}
                    fighter1={fight.fighter1}
                    fighter2={fight.fighter2}
                    divisionName={fight.division?.nameVi || fight.division?.name}
                    numberOfRounds={fight.numberOfRounds}
                    isTitleFight={fight.isTitleFight}
                    isMainEvent={fight.isMainEvent}
                    initialPrediction={initialPred}
                  />
                </div>
              );
            })}

            {filteredFights.length === 0 && (
              <div className="text-center py-16 bg-card/40 rounded-2xl border border-border">
                <p className="text-muted text-base">Không tìm thấy trận đấu nào phù hợp với bộ lọc.</p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSelectedEventId('all');
                    setFilterType('all');
                  }}
                  className="mt-4"
                >
                  Đặt lại bộ lọc
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: LEADERBOARD (BẢNG XẾP HẠNG THẦN ĐOÁN) */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-8">
          {/* Top 3 Podium Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {/* Rank 2 */}
            {top3[1] && (
              <Card className="relative p-6 flex flex-col items-center text-center order-2 md:order-1 border-zinc-700 bg-gradient-to-b from-card to-background">
                <div className="w-10 h-10 rounded-full bg-zinc-700 text-zinc-200 font-bold flex items-center justify-center text-sm mb-3">
                  <Medal className="w-5 h-5 text-zinc-300" />
                </div>
                <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-zinc-400 flex items-center justify-center text-xl font-black mb-2 text-foreground">
                  {top3[1].avatar}
                </div>
                <h3 className="font-bold text-base text-foreground">{top3[1].name}</h3>
                <span className="text-xs text-muted mb-2">{top3[1].badge}</span>
                <span className={cn('text-xs px-2.5 py-0.5 rounded-full font-bold border mb-3', getBeltBadgeClass(top3[1].beltTier))}>
                  {top3[1].beltName}
                </span>
                <div className="text-2xl font-black text-zinc-200">
                  {top3[1].points.toLocaleString('vi-VN')} <span className="text-xs text-muted font-normal">điểm</span>
                </div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">
                  Đoán đúng: {top3[1].accuracy}% ({top3[1].correctCount}/{top3[1].totalCount})
                </div>
              </Card>
            )}

            {/* Rank 1 (Champion) */}
            {top3[0] && (
              <Card className="relative p-6 flex flex-col items-center text-center order-1 md:order-2 border-amber-500/50 bg-gradient-to-b from-amber-500/10 via-card to-background shadow-[0_0_30px_rgba(245,158,11,0.15)] transform md:-translate-y-2">
                <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-500 text-black text-xs font-black flex items-center gap-1 shadow-md">
                  <Crown className="w-3.5 h-3.5" /> QUÁN QUÂN
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-base mb-3 mt-1">
                  <Crown className="w-6 h-6" />
                </div>
                <div className="w-20 h-20 rounded-full bg-zinc-800 border-4 border-amber-400 flex items-center justify-center text-2xl font-black mb-2 text-foreground shadow-lg">
                  {top3[0].avatar}
                </div>
                <h3 className="font-extrabold text-lg text-foreground">{top3[0].name}</h3>
                <span className="text-xs text-amber-300 font-semibold mb-2">{top3[0].badge}</span>
                <span className={cn('text-xs px-3 py-1 rounded-full font-black border mb-3', getBeltBadgeClass(top3[0].beltTier))}>
                  🏆 {top3[0].beltName}
                </span>
                <div className="text-3xl font-black text-amber-400">
                  {top3[0].points.toLocaleString('vi-VN')} <span className="text-sm text-zinc-400 font-normal">điểm</span>
                </div>
                <div className="text-xs text-emerald-400 font-bold mt-1">
                  Đoán đúng: {top3[0].accuracy}% ({top3[0].correctCount}/{top3[0].totalCount}) &bull; Chuỗi {top3[0].streak} trận 🔥
                </div>
              </Card>
            )}

            {/* Rank 3 */}
            {top3[2] && (
              <Card className="relative p-6 flex flex-col items-center text-center order-3 border-amber-800/40 bg-gradient-to-b from-card to-background">
                <div className="w-10 h-10 rounded-full bg-amber-900/40 text-amber-600 font-bold flex items-center justify-center text-sm mb-3">
                  <Medal className="w-5 h-5 text-amber-600" />
                </div>
                <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-amber-700 flex items-center justify-center text-xl font-black mb-2 text-foreground">
                  {top3[2].avatar}
                </div>
                <h3 className="font-bold text-base text-foreground">{top3[2].name}</h3>
                <span className="text-xs text-muted mb-2">{top3[2].badge}</span>
                <span className={cn('text-xs px-2.5 py-0.5 rounded-full font-bold border mb-3', getBeltBadgeClass(top3[2].beltTier))}>
                  {top3[2].beltName}
                </span>
                <div className="text-2xl font-black text-zinc-200">
                  {top3[2].points.toLocaleString('vi-VN')} <span className="text-xs text-muted font-normal">điểm</span>
                </div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">
                  Đoán đúng: {top3[2].accuracy}% ({top3[2].correctCount}/{top3[2].totalCount})
                </div>
              </Card>
            )}
          </div>

          {/* Full Leaderboard Table */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Top Cao Thủ Dự Đoán MMAVN
              </h2>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm người chơi..."
                  value={leaderboardSearch}
                  onChange={(e) => setLeaderboardSearch(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full text-left text-sm">
                <thead className="bg-background/80 text-muted uppercase text-xs font-bold tracking-wider border-b border-border">
                  <tr>
                    <th className="px-4 py-3.5 text-center w-14">Hạng</th>
                    <th className="px-4 py-3.5">Người chơi</th>
                    <th className="px-4 py-3.5">Cấp đai</th>
                    <th className="px-4 py-3.5 text-center">Tỷ lệ đúng</th>
                    <th className="px-4 py-3.5 text-center">Chuỗi thắng</th>
                    <th className="px-4 py-3.5 text-right font-black">Tổng điểm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredLeaderboard.map((user) => (
                    <tr
                      key={user.id}
                      className={cn(
                        'hover:bg-card-hover/80 transition-colors',
                        user.rank === 1 && 'bg-amber-500/5'
                      )}
                    >
                      {/* Rank */}
                      <td className="px-4 py-4 text-center font-bold">
                        {user.rank === 1 ? (
                          <span className="w-7 h-7 rounded-full bg-amber-500 text-black flex items-center justify-center font-black mx-auto text-xs">
                            1
                          </span>
                        ) : user.rank === 2 ? (
                          <span className="w-7 h-7 rounded-full bg-zinc-300 text-black flex items-center justify-center font-black mx-auto text-xs">
                            2
                          </span>
                        ) : user.rank === 3 ? (
                          <span className="w-7 h-7 rounded-full bg-amber-700 text-white flex items-center justify-center font-black mx-auto text-xs">
                            3
                          </span>
                        ) : (
                          <span className="text-muted font-mono font-bold">
                            #{user.rank}
                          </span>
                        )}
                      </td>

                      {/* User details */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-zinc-800 border border-border flex items-center justify-center text-xs font-bold text-foreground flex-shrink-0">
                            {user.avatar || user.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-foreground flex items-center gap-1.5">
                              <span>{user.name}</span>
                            </div>
                            <div className="text-xs text-muted">{user.badge}</div>
                          </div>
                        </div>
                      </td>

                      {/* Belt */}
                      <td className="px-4 py-4">
                        <span
                          className={cn(
                            'text-xs px-2.5 py-1 rounded-full font-bold border inline-block whitespace-nowrap',
                            getBeltBadgeClass(user.beltTier)
                          )}
                        >
                          {user.beltName}
                        </span>
                      </td>

                      {/* Accuracy */}
                      <td className="px-4 py-4 text-center">
                        <div className="font-bold text-emerald-400">
                          {user.accuracy}%
                        </div>
                        <div className="text-[11px] text-muted">
                          {user.correctCount}/{user.totalCount} trận
                        </div>
                      </td>

                      {/* Streak */}
                      <td className="px-4 py-4 text-center">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-bold">
                          <Flame className="w-3 h-3" /> {user.streak} trận
                        </div>
                      </td>

                      {/* Total Points */}
                      <td className="px-4 py-4 text-right">
                        <div className="text-base font-black text-amber-400">
                          {user.points.toLocaleString('vi-VN')}
                        </div>
                        <div className="text-[11px] text-muted">PTS</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RULES & SCORING SYSTEM */}
      {activeTab === 'rules' && (
        <div className="space-y-8">
          {/* Points Breakdown */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Cơ Chế Tính Điểm Thưởng
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-5 border-border bg-card flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center font-bold mb-3">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-1">
                    Đoán Đúng Võ Sĩ Thắng
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Dự đoán chính xác võ sĩ giành chiến thắng ở bất kỳ trận đấu nào.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-baseline justify-between">
                  <span className="text-xs text-muted font-medium">Điểm thưởng</span>
                  <span className="text-xl font-black text-primary">+50 Điểm</span>
                </div>
              </Card>

              <Card className="p-5 border-border bg-card flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold mb-3">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-1">
                    Đoán Đúng Phương Thức
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Dự đoán chính xác kết liễu bằng Knockout, Khóa siết hay Tính điểm.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-baseline justify-between">
                  <span className="text-xs text-muted font-medium">Điểm thưởng</span>
                  <span className="text-xl font-black text-amber-400">+50 Điểm</span>
                </div>
              </Card>

              <Card className="p-5 border-border bg-card flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold mb-3">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-1">
                    Đoán Đúng Hiệp Đấu (Round)
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Dự đoán chính xác hiệp kết thúc trận đấu (Hiệp 1, 2, 3, v.v.).
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-baseline justify-between">
                  <span className="text-xs text-muted font-medium">Điểm thưởng</span>
                  <span className="text-xl font-black text-purple-400">+100 Điểm</span>
                </div>
              </Card>

              <Card className="p-5 border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-card to-card flex flex-col justify-between shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold mb-3">
                    <Crown className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-1">
                    Perfect Pick (Hoàn Hảo)
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Đoán đúng cả Võ sĩ + Phương thức + Hiệp đấu. Thưởng thêm điểm tối đa!
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/80 flex items-baseline justify-between">
                  <span className="text-xs text-amber-300 font-bold">Thưởng tổng cộng</span>
                  <span className="text-2xl font-black text-amber-400">250 Điểm</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Belt Hierarchy Ladder */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              Hệ Thống Thăng Cấp Đai MMAVN Hub
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {PREDICTION_RULES.belts.map((belt) => (
                <div
                  key={belt.tier}
                  className="p-4 rounded-xl border border-border bg-card hover:bg-card-hover transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className={cn('px-2.5 py-1 rounded-full text-xs font-bold border', belt.color)}>
                      {belt.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted block">Yêu cầu tối thiểu</span>
                    <span className="text-sm font-black text-foreground">
                      {belt.minPoints.toLocaleString('vi-VN')} điểm
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Season Rewards */}
          <Card className="p-6 border-primary/30 bg-gradient-to-r from-red-950/20 via-card to-background">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-2">
              🎁 Giải Thưởng Mùa Giải Cho Top Thần Đoán
            </h3>
            <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
              Vào cuối mỗi quý, ban tổ chức MMAVN Hub sẽ vinh danh và trao thưởng các phần quà giá trị cho Top Predictors:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-background/60 border border-border">
                <span className="font-bold text-amber-400 block mb-1">🥇 Top 1 Chung Cuộc</span>
                <span className="text-xs text-zinc-300">
                  Cúp Vàng Thần Đoán + Vé VIP trọn đời LION Championship + Găng thi đấu có chữ ký vô địch.
                </span>
              </div>
              <div className="p-3 rounded-lg bg-background/60 border border-border">
                <span className="font-bold text-zinc-200 block mb-1">🥈 Top 2 &amp; Top 3</span>
                <span className="text-xs text-zinc-300">
                  Áo đấu độc quyền MMAVN Hub + 2 Vé xem trực tiếp sự kiện MMA + Thẻ thành viên VIP.
                </span>
              </div>
              <div className="p-3 rounded-lg bg-background/60 border border-border">
                <span className="font-bold text-blue-400 block mb-1">🥉 Top 4 - Top 10</span>
                <span className="text-xs text-zinc-300">
                  Bộ quà lưu niệm MMAVN + Huy hiệu danh dự trên toàn bộ hệ sinh thái cộng đồng.
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
