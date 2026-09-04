import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native'
import { THEME } from '../constants/theme'
import { MapPin, Phone, Star, Award, ChevronRight } from 'lucide-react-native'
import type { Gym } from '../data/mobile-data'

interface GymCardProps {
  gym: Gym
  onPress?: () => void
}

export function GymCard({ gym, onPress }: GymCardProps) {
  const handleCall = () => {
    const phoneNumber = gym.phone || gym.contact?.phone
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber.replace(/\s+/g, '')}`)
    }
  }

  const coverPhoto = gym.coverImage || gym.image || 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&auto=format&fit=crop&q=80'

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Cover Image */}
      <View style={styles.coverWrapper}>
        <Image source={{ uri: coverPhoto }} style={styles.coverImage} />
        <View style={styles.coverOverlay} />

        <View style={styles.cityBadge}>
          <Text style={styles.cityText}>{gym.city}</Text>
        </View>

        {gym.rating ? (
          <View style={styles.ratingBadge}>
            <Star size={10} color="#f59e0b" fill="#f59e0b" />
            <Text style={styles.ratingText}>{gym.rating.toFixed(1)}</Text>
          </View>
        ) : null}

        <View style={styles.coverBottom}>
          <Text style={styles.name} numberOfLines={1}>{gym.name}</Text>
        </View>
      </View>

      {/* Body info */}
      <View style={styles.body}>
        {/* Address */}
        <View style={styles.addressRow}>
          <MapPin size={12} color={THEME.colors.primary} />
          <Text style={styles.addressText} numberOfLines={1}>
            {gym.address || gym.city}
          </Text>
        </View>

        {/* Disciplines */}
        <View style={styles.disciplinesRow}>
          {gym.disciplines.slice(0, 3).map((d: string, i: number) => (
            <View key={i} style={styles.discBadge}>
              <Text style={styles.discText}>{d}</Text>
            </View>
          ))}
          {gym.disciplines.length > 3 && (
            <Text style={styles.moreDiscText}>+{gym.disciplines.length - 3}</Text>
          )}
        </View>

        {/* Coach Row */}
        {gym.headCoach && (
          <View style={styles.coachRow}>
            <Award size={12} color={THEME.colors.gold} />
            <Text style={styles.coachText} numberOfLines={1}>
              HLV: {gym.headCoach}
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.callBtn} onPress={handleCall} activeOpacity={0.7}>
            <Phone size={11} color={THEME.colors.primary} />
            <Text style={styles.callText}>
              {gym.phone || gym.contact?.phone || 'Liên hệ'}
            </Text>
          </TouchableOpacity>

          <View style={styles.rosterRow}>
            <Text style={styles.rosterText}>
              {gym.notableFighterIds?.length || 0} võ sĩ biên chế
            </Text>
            <ChevronRight size={14} color={THEME.colors.textDim} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    overflow: 'hidden',
    marginBottom: THEME.spacing.md,
  },
  coverWrapper: {
    height: 110,
    width: '100%',
    position: 'relative',
    justifyContent: 'space-between',
    padding: THEME.spacing.sm,
  },
  coverImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 13, 22, 0.4)',
  },
  cityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  cityText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#ffffff',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.goldLight,
  },
  coverBottom: {
    marginTop: 'auto',
  },
  name: {
    fontSize: 15,
    fontWeight: '900',
    color: THEME.colors.textWhite,
  },
  body: {
    padding: THEME.spacing.md,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  addressText: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    flex: 1,
  },
  disciplinesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  discBadge: {
    backgroundColor: '#0c1222',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  discText: {
    fontSize: 9,
    color: THEME.colors.textMuted,
    fontWeight: '600',
  },
  moreDiscText: {
    fontSize: 9,
    color: THEME.colors.textDim,
  },
  coachRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#0a0e1a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  coachText: {
    fontSize: 10,
    color: THEME.colors.goldLight,
    fontWeight: '600',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  callText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: THEME.colors.textMuted,
  },
  rosterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rosterText: {
    fontSize: 10,
    color: THEME.colors.primaryLight,
    fontWeight: '600',
  }
})
