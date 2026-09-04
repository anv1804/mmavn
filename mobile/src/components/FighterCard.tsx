import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { THEME } from '../constants/theme'
import { ChevronRight, Crown } from 'lucide-react-native'
import type { Fighter } from '../data/mobile-data'

interface FighterCardProps {
  fighter: Fighter
  gymName?: string
  divisionName?: string
  onPress?: () => void
}

export function FighterCard({ fighter, gymName, divisionName, onPress }: FighterCardProps) {
  const isChamp = fighter.isChampion

  return (
    <TouchableOpacity
      style={[styles.card, isChamp && styles.champCard]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Avatar with champion gold or red border */}
      <View style={[styles.avatarWrap, isChamp ? styles.avatarWrapChamp : styles.avatarWrapNormal]}>
        <Image 
          source={{ uri: fighter.avatar || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=200' }} 
          style={styles.avatar} 
        />
        {isChamp && (
          <View style={styles.crownBadge}>
            <Crown size={9} color="#000000" />
          </View>
        )}
      </View>

      {/* Main Fighter Details */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{fighter.name}</Text>
          {isChamp && (
            <View style={styles.champPill}>
              <Text style={styles.champPillText}>ĐKVĐ</Text>
            </View>
          )}
        </View>

        {fighter.nickname ? (
          <Text style={styles.nickname} numberOfLines={1}>"{fighter.nickname}"</Text>
        ) : null}

        <View style={styles.metaRow}>
          <Text style={styles.divisionText} numberOfLines={1}>
            {divisionName?.split(' (')[0] || 'MMA VN'}
          </Text>
          {gymName && (
            <Text style={styles.gymText} numberOfLines={1}>
              • {gymName.replace(' Training Center', '').replace(' (Liên Phong MMA)', '')}
            </Text>
          )}
        </View>
      </View>

      {/* Stats Column */}
      <View style={styles.statsCol}>
        <View style={styles.eloBadge}>
          <Text style={styles.eloValue}>{Math.round(fighter.eloRating)}</Text>
          <Text style={styles.eloLabel}>ELO</Text>
        </View>

        <Text style={styles.recordText}>
          {fighter.record.wins}W - {fighter.record.losses}L
        </Text>
        {fighter.record.winsByKo > 0 && (
          <Text style={styles.koText}>{fighter.record.winsByKo} KO</Text>
        )}
      </View>

      <ChevronRight size={16} color="#64748b" style={styles.chevron} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 8,
  },
  champCard: {
    borderColor: 'rgba(245, 158, 11, 0.5)',
    backgroundColor: '#131b2e',
  },
  avatarWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    position: 'relative',
    marginRight: 12,
  },
  avatarWrapNormal: {
    borderColor: '#e11d48',
  },
  avatarWrapChamp: {
    borderColor: '#f59e0b',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  crownBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
  },
  champPill: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  champPillText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#000000',
  },
  nickname: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#fbbf24',
    marginTop: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  divisionText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
  },
  gymText: {
    fontSize: 10,
    color: '#64748b',
    flex: 1,
  },
  statsCol: {
    alignItems: 'flex-end',
    marginRight: 6,
  },
  eloBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  eloValue: {
    fontSize: 14,
    fontWeight: '900',
    color: '#fbbf24',
    fontFamily: 'monospace',
  },
  eloLabel: {
    fontSize: 7,
    fontWeight: '800',
    color: '#94a3b8',
  },
  recordText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10b981',
    fontFamily: 'monospace',
    marginTop: 1,
  },
  koText: {
    fontSize: 8,
    color: '#fb7185',
    fontFamily: 'monospace',
  },
  chevron: {
    marginLeft: 2,
  }
})
