import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { THEME } from '../constants/theme'
import { Trophy, Flame, Shield, ChevronRight, CheckCircle2 } from 'lucide-react-native'
import type { Promotion } from '../data/mobile-data'

interface PromotionCardProps {
  promotion: Promotion
  onPress?: () => void
}

const PROMO_COVERS: Record<string, string> = {
  p1: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&auto=format&fit=crop&q=80',
  p2: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
  p3: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd208?w=800&auto=format&fit=crop&q=80',
}

export function PromotionCard({ promotion, onPress }: PromotionCardProps) {
  const isLion = promotion.id === 'p1'
  const isGma = promotion.id === 'p2'
  const coverUrl = PROMO_COVERS[promotion.id] || PROMO_COVERS.p1

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {/* Cover Banner */}
      <View style={styles.coverContainer}>
        <Image source={{ uri: coverUrl }} style={styles.coverImage} />
        <View style={styles.coverOverlay} />

        {/* Badges on banner */}
        <View style={styles.bannerHeader}>
          <View style={[styles.formatBadge, isLion ? styles.lionBadge : isGma ? styles.gmaBadge : styles.v1Badge]}>
            {isLion ? (
              <Flame size={12} color="#fca5a5" />
            ) : isGma ? (
              <Shield size={12} color="#6ee7b7" />
            ) : (
              <Trophy size={12} color="#fde047" />
            )}
            <Text style={styles.formatText}>{promotion.formatType}</Text>
          </View>

          <View style={styles.yearBadge}>
            <Text style={styles.yearText}>Từ {promotion.foundedYear}</Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.bannerFooter}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{promotion.name}</Text>
            <View style={styles.shortNameBadge}>
              <Text style={styles.shortNameText}>{promotion.shortName}</Text>
            </View>
          </View>
          {promotion.tagline ? (
            <Text style={styles.tagline} numberOfLines={1}>"{promotion.tagline}"</Text>
          ) : null}
        </View>
      </View>

      {/* Body Content */}
      <View style={styles.body}>
        <Text style={styles.description} numberOfLines={2}>
          {promotion.description}
        </Text>

        {/* Metrics Grid */}
        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Đai Vô Địch</Text>
            <Text style={styles.metricValGold}>{(promotion.belts?.length || 7)} Đai</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Thể thức sàn</Text>
            <Text style={styles.metricValWhite} numberOfLines={1}>
              {promotion.rules?.cageType ? promotion.rules.cageType.split(' ')[0] + ' ' + (promotion.rules.cageType.split(' ')[1] || '') : 'Lồng đấu Pro'}
            </Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Thời gian hiệp</Text>
            <Text style={styles.metricValEmerald}>
              {promotion.rules?.roundDuration || '5 phút/hiệp'}
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.actionBtn}>
          <Text style={styles.actionText}>Khám phá giải đấu &amp; đai vàng</Text>
          <ChevronRight size={16} color="#ffffff" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.borderRadius.xl,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    overflow: 'hidden',
    marginBottom: THEME.spacing.lg,
  },
  coverContainer: {
    height: 130,
    width: '100%',
    position: 'relative',
    justifyContent: 'space-between',
    padding: THEME.spacing.md,
  },
  coverImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.65,
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 13, 22, 0.6)',
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 99,
  },
  lionBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.4)',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  gmaBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.4)',
    borderWidth: 1,
    borderColor: '#10b981',
  },
  v1Badge: {
    backgroundColor: 'rgba(245, 158, 11, 0.4)',
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  formatText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#ffffff',
  },
  yearBadge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  yearText: {
    fontSize: 10,
    fontWeight: '600',
    color: THEME.colors.textMuted,
  },
  bannerFooter: {
    marginTop: 'auto',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: '900',
    color: THEME.colors.textWhite,
  },
  shortNameBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  shortNameText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#ffffff',
  },
  tagline: {
    fontSize: 11,
    fontStyle: 'italic',
    color: THEME.colors.goldLight,
    marginTop: 2,
  },
  body: {
    padding: THEME.spacing.md,
  },
  description: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    lineHeight: 18,
    marginBottom: THEME.spacing.md,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: THEME.spacing.md,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#0a0f1d',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 9,
    color: THEME.colors.textDim,
    marginBottom: 2,
  },
  metricValGold: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.gold,
  },
  metricValWhite: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.textWhite,
  },
  metricValEmerald: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.emerald,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: THEME.colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
  }
})
