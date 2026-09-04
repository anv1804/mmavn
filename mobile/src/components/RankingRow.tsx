import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Crown, Medal, ChevronRight } from 'lucide-react-native'
import type { Fighter } from '../data/mobile-data'

interface RankingRowProps {
  position: number
  fighter: Fighter
  gymName?: string
  onPress?: () => void
}

export function RankingRow({ position, fighter, gymName, onPress }: RankingRowProps) {
  const isChamp = position === 0 || fighter.isChampion

  const renderBadge = () => {
    if (position === 0 || isChamp) {
      return (
        <View style={[styles.badge, styles.goldBadge]}>
          <Crown size={12} color="#000000" />
          <Text style={styles.badgeTextBlack}>C</Text>
        </View>
      )
    }
    if (position === 1) {
      return (
        <View style={[styles.badge, styles.goldBadge]}>
          <Text style={styles.badgeTextBlack}>#1</Text>
        </View>
      )
    }
    if (position === 2) {
      return (
        <View style={[styles.badge, styles.silverBadge]}>
          <Text style={styles.badgeTextSilver}>#2</Text>
        </View>
      )
    }
    if (position === 3) {
      return (
        <View style={[styles.badge, styles.bronzeBadge]}>
          <Text style={styles.badgeTextBronze}>#3</Text>
        </View>
      )
    }
    return (
      <View style={[styles.badge, styles.normalBadge]}>
        <Text style={styles.badgeTextNormal}>#{position}</Text>
      </View>
    )
  }

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.75}>
      {/* Position Badge */}
      <View style={styles.badgeBox}>
        {renderBadge()}
      </View>

      {/* Avatar */}
      <View style={[styles.avatarBox, isChamp && styles.avatarBoxChamp]}>
        <Image 
          source={{ uri: fighter.avatar || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=200' }} 
          style={styles.avatar} 
        />
      </View>

      {/* Name & Club */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{fighter.name}</Text>
          {isChamp && (
            <View style={styles.champTag}>
              <Text style={styles.champTagText}>VÔ ĐỊCH</Text>
            </View>
          )}
        </View>

        <Text style={styles.subText} numberOfLines={1}>
          {gymName?.replace(' Training Center', '').replace(' (Liên Phong MMA)', '') || 'Tự do'}
          {fighter.nickname ? ` • "${fighter.nickname}"` : ''}
        </Text>
      </View>

      {/* Elo Rating & Record */}
      <View style={styles.stats}>
        <View style={styles.eloRow}>
          <Text style={styles.eloVal}>{Math.round(fighter.eloRating)}</Text>
          <Text style={styles.eloLbl}>ELO</Text>
        </View>
        <Text style={styles.recordVal}>
          {fighter.record.wins}W - {fighter.record.losses}L
        </Text>
      </View>

      <ChevronRight size={15} color="#64748b" style={{ marginLeft: 4 }} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#111827',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 8,
  },
  badgeBox: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    minWidth: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  goldBadge: {
    backgroundColor: '#f59e0b',
  },
  silverBadge: {
    backgroundColor: '#94a3b8',
  },
  bronzeBadge: {
    backgroundColor: '#b45309',
  },
  normalBadge: {
    backgroundColor: '#1e293b',
  },
  badgeTextBlack: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000000',
  },
  badgeTextSilver: {
    fontSize: 10,
    fontWeight: '900',
    color: '#0f172a',
  },
  badgeTextBronze: {
    fontSize: 10,
    fontWeight: '900',
    color: '#ffffff',
  },
  badgeTextNormal: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94a3b8',
    fontFamily: 'monospace',
  },
  avatarBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#e11d48',
    overflow: 'hidden',
    marginRight: 10,
  },
  avatarBoxChamp: {
    borderColor: '#f59e0b',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  champTag: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  champTagText: {
    fontSize: 7,
    fontWeight: '900',
    color: '#000000',
  },
  subText: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 2,
  },
  stats: {
    alignItems: 'flex-end',
  },
  eloRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  eloVal: {
    fontSize: 13,
    fontWeight: '900',
    color: '#fbbf24',
    fontFamily: 'monospace',
  },
  eloLbl: {
    fontSize: 7,
    fontWeight: '800',
    color: '#94a3b8',
  },
  recordVal: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10b981',
    fontFamily: 'monospace',
    marginTop: 1,
  }
})
