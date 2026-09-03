'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { FightPrediction, PredictionMethod } from '@/types';
import {
  Flame,
  Zap,
  ShieldAlert,
  Award,
  CheckCircle2,
  Users,
  Trophy,
  BarChart3,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export interface FightPredictionWidgetProps {
  fightId: string;
  fighter1: {
    id: string;
    name: string;
    nickname?: string;
    record?: { wins: number; losses: number; draws: number };
    eloRating?: number;
  };
  fighter2: {
    id: string;
    name: string;
    nickname?: string;
    record?: { wins: number; losses: number; draws: number };
    eloRating?: number;
  };
  divisionName?: string;
  numberOfRounds?: number;
  isTitleFight?: boolean;
  isMainEvent?: boolean;
  initialPrediction?: FightPrediction;
  compact?: boolean;
  className?: string;
  onVoted?: (prediction: FightPrediction) => void;
}

interface StoredUserVote {
  selectedFighterId: string;
  predictedMethod: PredictionMethod;
  predictedRound?: number;
  timestamp: number;
}

export function FightPredictionWidget({
  fightId,
  fighter1,
  fighter2,
  divisionName,
  numberOfRounds = 3,
  isTitleFight = false,
  isMainEvent = false,
  initialPrediction,
  compact = false,
  className,
  onVoted,
}: FightPredictionWidgetProps) {
  // Local prediction stats
  const [prediction, setPrediction] = useState<FightPrediction>(
    initialPrediction || {
      fightId,
      totalVotes: 250,
      fighter1Votes: 140,
      fighter2Votes: 110,
      fighter1Percentage: 56,
      fighter2Percentage: 44,
      methodBreakdown: { koTko: 52, submission: 26, decision: 22 },
    }
  );

  // Voting interaction state
  const [selectedFighter, setSelectedFighter] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PredictionMethod>('KO/TKO');
  const [selectedRound, setSelectedRound] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userVote, setUserVote] = useState<StoredUserVote | null>(null);
  const [isChangingVote, setIsChangingVote] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const storageKey = `mmavn_prediction_${fightId}`;

  // Load existing vote from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as StoredUserVote;
        setUserVote(parsed);
        setSelectedFighter(parsed.selectedFighterId);
        setSelectedMethod(parsed.predictedMethod);
        if (parsed.predictedRound) setSelectedRound(parsed.predictedRound);
      }
    } catch {
      // ignore localStorage errors in SSR/strict env
    }
  }, [storageKey]);

  // Fetch updated predictions if not supplied initially
  useEffect(() => {
    if (!initialPrediction) {
      fetch(`/api/predictions?fightId=${encodeURIComponent(fightId)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.success && data?.data) {
            setPrediction(data.data);
          }
        })
        .catch(() => {
          // Keep default fallback
        });
    }
  }, [fightId, initialPrediction]);

  const handleVoteSubmit = async () => {
    if (!selectedFighter) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/predictions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fightId,
          selectedFighterId: selectedFighter,
          predictedMethod: selectedMethod,
          predictedRound: selectedRound || undefined,
        }),
      });

      const json = await res.json();
      const updatedPrediction: FightPrediction = json?.data || {
        ...prediction,
        totalVotes: prediction.totalVotes + 1,
        fighter1Votes:
          selectedFighter === fighter1.id
            ? prediction.fighter1Votes + 1
            : prediction.fighter1Votes,
        fighter2Votes:
          selectedFighter === fighter2.id
            ? prediction.fighter2Votes + 1
            : prediction.fighter2Votes,
      };

      // recalculate percentage locally if needed
      const f1Pct = Math.round(
        (updatedPrediction.fighter1Votes / updatedPrediction.totalVotes) * 100
      );
      updatedPrediction.fighter1Percentage = f1Pct;
      updatedPrediction.fighter2Percentage = 100 - f1Pct;

      setPrediction(updatedPrediction);

      const newVote: StoredUserVote = {
        selectedFighterId: selectedFighter,
        predictedMethod: selectedMethod,
        predictedRound: selectedRound || undefined,
        timestamp: Date.now(),
      };

      setUserVote(newVote);
      setIsChangingVote(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);

      try {
        localStorage.setItem(storageKey, JSON.stringify(newVote));
      } catch {
        // ignore
      }

      if (onVoted) {
        onVoted(updatedPrediction);
      }
    } catch (err) {
      console.error('Vote submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  const chosenFighter =
    userVote?.selectedFighterId === fighter1.id ? fighter1 : fighter2;

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-300 border-border bg-card/95 backdrop-blur-sm',
        isTitleFight && 'border-amber-500/40 shadow-[0_0_25px_rgba(214,158,46,0.15)]',
        isMainEvent && 'ring-1 ring-primary/40',
        compact ? 'p-4' : 'p-6 sm:p-7',
        className
      )}
    >
      {/* Glow highlight effects */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-border/70">
        <div className="flex flex-wrap items-center gap-2">
          {isTitleFight && (
            <Badge variant="accent" className="gap-1 font-semibold">
              <Trophy className="w-3 h-3" /> Tranh đai vô địch
            </Badge>
          )}
          {isMainEvent && (
            <Badge variant="primary" className="font-bold tracking-wider">
              MAIN EVENT
            </Badge>
          )}
          {divisionName && (
            <span className="text-xs text-muted font-medium uppercase tracking-wider">
              {divisionName} &bull; {numberOfRounds} Hiệp
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted font-medium bg-background/60 px-2.5 py-1 rounded-full border border-border">
          <Users className="w-3.5 h-3.5 text-accent" />
          <span>{prediction.totalVotes.toLocaleString('vi-VN')} bình chọn</span>
        </div>
      </div>

      {/* Fighter Matchup & Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-5">
        {/* Fighter 1 (Red Corner) */}
        <button
          type="button"
          disabled={!!userVote && !isChangingVote}
          onClick={() => setSelectedFighter(fighter1.id)}
          className={cn(
            'group text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 relative overflow-hidden flex items-center justify-between gap-3',
            selectedFighter === fighter1.id
              ? 'bg-primary/15 border-primary shadow-[0_0_18px_rgba(229,62,62,0.25)]'
              : 'bg-background/50 border-border hover:border-primary/50 hover:bg-card-hover',
            userVote && !isChangingVote && 'cursor-default'
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 transition-transform duration-200 group-hover:scale-105 border-2',
                selectedFighter === fighter1.id
                  ? 'bg-primary text-white border-primary-soft shadow-md'
                  : 'bg-zinc-800 text-zinc-200 border-zinc-700'
              )}
            >
              {getInitials(fighter1.name)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[11px] font-semibold tracking-wider uppercase text-red-400">
                  Góc Đỏ
                </span>
              </div>
              <h4 className="font-bold text-foreground truncate text-sm sm:text-base">
                {fighter1.name}
              </h4>
              {fighter1.nickname && (
                <p className="text-xs text-muted truncate italic">
                  &ldquo;{fighter1.nickname}&rdquo;
                </p>
              )}
              {fighter1.record && (
                <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                  {fighter1.record.wins}W - {fighter1.record.losses}L -{' '}
                  {fighter1.record.draws}D
                </p>
              )}
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="text-xl sm:text-2xl font-black text-red-500">
              {prediction.fighter1Percentage}%
            </div>
            <div className="text-[10px] text-muted">
              {prediction.fighter1Votes.toLocaleString('vi-VN')} phiếu
            </div>
            {selectedFighter === fighter1.id && (
              <div className="mt-1">
                <span className="inline-flex items-center gap-1 text-[10px] bg-red-500/20 text-red-400 font-semibold px-1.5 py-0.5 rounded">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Đã chọn
                </span>
              </div>
            )}
          </div>
        </button>

        {/* Fighter 2 (Blue/Amber Corner) */}
        <button
          type="button"
          disabled={!!userVote && !isChangingVote}
          onClick={() => setSelectedFighter(fighter2.id)}
          className={cn(
            'group text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 relative overflow-hidden flex items-center justify-between gap-3',
            selectedFighter === fighter2.id
              ? 'bg-amber-500/15 border-amber-500 shadow-[0_0_18px_rgba(214,158,46,0.25)]'
              : 'bg-background/50 border-border hover:border-amber-500/50 hover:bg-card-hover',
            userVote && !isChangingVote && 'cursor-default'
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 transition-transform duration-200 group-hover:scale-105 border-2',
                selectedFighter === fighter2.id
                  ? 'bg-amber-500 text-black border-amber-300 shadow-md'
                  : 'bg-zinc-800 text-zinc-200 border-zinc-700'
              )}
            >
              {getInitials(fighter2.name)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-400">
                  Góc Xanh
                </span>
              </div>
              <h4 className="font-bold text-foreground truncate text-sm sm:text-base">
                {fighter2.name}
              </h4>
              {fighter2.nickname && (
                <p className="text-xs text-muted truncate italic">
                  &ldquo;{fighter2.nickname}&rdquo;
                </p>
              )}
              {fighter2.record && (
                <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                  {fighter2.record.wins}W - {fighter2.record.losses}L -{' '}
                  {fighter2.record.draws}D
                </p>
              )}
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="text-xl sm:text-2xl font-black text-amber-400">
              {prediction.fighter2Percentage}%
            </div>
            <div className="text-[10px] text-muted">
              {prediction.fighter2Votes.toLocaleString('vi-VN')} phiếu
            </div>
            {selectedFighter === fighter2.id && (
              <div className="mt-1">
                <span className="inline-flex items-center gap-1 text-[10px] bg-amber-400/20 text-amber-400 font-semibold px-1.5 py-0.5 rounded">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Đã chọn
                </span>
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Dynamic Voting Bar */}
      <div className="mb-5 space-y-1.5">
        <div className="flex justify-between text-xs font-semibold px-0.5">
          <span className="text-red-400 flex items-center gap-1">
            <span>{fighter1.name}</span>
            <span className="text-zinc-500">({prediction.fighter1Percentage}%)</span>
          </span>
          <span className="text-amber-400 flex items-center gap-1">
            <span className="text-zinc-500">({prediction.fighter2Percentage}%)</span>
            <span>{fighter2.name}</span>
          </span>
        </div>
        <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden flex p-0.5 border border-zinc-800">
          <div
            style={{ width: `${prediction.fighter1Percentage}%` }}
            className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-l-full transition-all duration-700 ease-out relative"
          />
          <div
            style={{ width: `${prediction.fighter2Percentage}%` }}
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-r-full transition-all duration-700 ease-out relative"
          />
        </div>
      </div>

      {/* Voting Actions Area */}
      {(!userVote || isChangingVote) ? (
        <div className="space-y-4 pt-2 bg-background/40 p-4 rounded-xl border border-border/70">
          {/* Method Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-primary" />
                Phương thức kết thúc trận:
              </label>
              <span className="text-[11px] text-muted">+50 điểm nếu đúng</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMethod('KO/TKO')}
                className={cn(
                  'flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all duration-150',
                  selectedMethod === 'KO/TKO'
                    ? 'bg-red-500/20 text-red-400 border-red-500 shadow-sm'
                    : 'bg-card text-zinc-300 border-border hover:bg-card-hover'
                )}
              >
                <Zap className="w-3.5 h-3.5 text-red-400" />
                <span>KO / TKO</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('Submission')}
                className={cn(
                  'flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all duration-150',
                  selectedMethod === 'Submission'
                    ? 'bg-purple-500/20 text-purple-400 border-purple-500 shadow-sm'
                    : 'bg-card text-zinc-300 border-border hover:bg-card-hover'
                )}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                <span>Khóa siết</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('Decision')}
                className={cn(
                  'flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all duration-150',
                  selectedMethod === 'Decision'
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500 shadow-sm'
                    : 'bg-card text-zinc-300 border-border hover:bg-card-hover'
                )}
              >
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span>Tính điểm</span>
              </button>
            </div>
          </div>

          {/* Optional Round Selection */}
          {selectedMethod !== 'Decision' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-muted">
                  Dự đoán hiệp đấu (tuỳ chọn):
                </label>
                <span className="text-[11px] text-accent-soft">+100 điểm</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: numberOfRounds }, (_, i) => i + 1).map((round) => (
                  <button
                    key={round}
                    type="button"
                    onClick={() =>
                      setSelectedRound(selectedRound === round ? null : round)
                    }
                    className={cn(
                      'px-3 py-1 rounded-md text-xs font-medium border transition-colors',
                      selectedRound === round
                        ? 'bg-accent/20 text-amber-400 border-amber-500 font-bold'
                        : 'bg-card text-zinc-400 border-border hover:border-zinc-600'
                    )}
                  >
                    Hiệp {round}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center gap-2 pt-1">
            <Button
              variant="primary"
              size={compact ? 'sm' : 'md'}
              disabled={!selectedFighter || isSubmitting}
              onClick={handleVoteSubmit}
              className="w-full gap-2 font-bold shadow-lg shadow-primary/20"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Đang gửi dự đoán...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {isChangingVote ? 'Cập nhật bình chọn' : 'Xác nhận dự đoán'}
                </>
              )}
            </Button>

            {isChangingVote && (
              <Button
                variant="ghost"
                size={compact ? 'sm' : 'md'}
                onClick={() => setIsChangingVote(false)}
              >
                Huỷ
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* Already Voted Card */
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-card to-background border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-zinc-400">Dự đoán của bạn:</div>
              <div className="font-bold text-sm text-zinc-100">
                <span className="text-emerald-400">{chosenFighter.name}</span> thắng bằng{' '}
                <span className="text-amber-400 font-semibold">
                  {userVote.predictedMethod}
                </span>
                {userVote.predictedRound ? ` (Hiệp ${userVote.predictedRound})` : ''}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={() => setIsChangingVote(true)}
              className="text-xs text-muted hover:text-foreground flex items-center gap-1 px-2.5 py-1 rounded bg-card hover:bg-card-hover border border-border transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Thay đổi
            </button>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {showNotification && (
        <div className="mt-3 p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
          <span>Dự đoán đã được ghi nhận! Chúc bạn nhận trọn vẹn điểm số.</span>
        </div>
      )}

      {/* Community Method Consensus Breakdown */}
      <div className="mt-4 pt-3 border-t border-border/60">
        <div className="flex items-center justify-between text-xs text-muted mb-2 font-medium">
          <span className="flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5" />
            Phương thức được cộng đồng dự đoán:
          </span>
          <span>Tổng kết quả</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-lg bg-background/50 border border-border">
            <div className="text-zinc-400 text-[11px] flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 text-red-400" /> KO/TKO
            </div>
            <div className="font-bold text-foreground text-sm mt-0.5">
              {prediction.methodBreakdown.koTko}%
            </div>
          </div>

          <div className="p-2 rounded-lg bg-background/50 border border-border">
            <div className="text-zinc-400 text-[11px] flex items-center justify-center gap-1">
              <ShieldAlert className="w-3 h-3 text-purple-400" /> Khóa siết
            </div>
            <div className="font-bold text-foreground text-sm mt-0.5">
              {prediction.methodBreakdown.submission}%
            </div>
          </div>

          <div className="p-2 rounded-lg bg-background/50 border border-border">
            <div className="text-zinc-400 text-[11px] flex items-center justify-center gap-1">
              <Award className="w-3 h-3 text-blue-400" /> Tính điểm
            </div>
            <div className="font-bold text-foreground text-sm mt-0.5">
              {prediction.methodBreakdown.decision}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
