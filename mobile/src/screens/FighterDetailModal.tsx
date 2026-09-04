import React from 'react'
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, Image } from 'react-native'
import { THEME } from '../constants/theme'
import { X, Trophy, Swords, MapPin, Award, CheckCircle2, ShieldAlert } from 'lucide-react-native'
import type { Fighter } from '../data/mobile-data'
import { gyms, divisions } from '../data/mobile-data'

interface FighterDetailModalProps {
  fighter: Fighter | null
  visible: boolean
  onClose: () => void
}

export function FighterDetailModal({ fighter, visible, onClose }: FighterDetailModalProps) {
  if (!fighter) return null

  const gym = gyms.find(g => g.id === fighter.gymId)
  const division = divisions.find(d => d.id === fighter.divisionId)
  const isChamp = fighter.isChampion

  const cover = fighter.coverImage || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&auto=format&fit=crop&q=80'

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.modalSheet}>
          {/* Close Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>Hồ Sơ Võ Sĩ MMA</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={THEME.colors.textWhite} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Fighter Hero Banner */}
            <View style={styles.heroBanner}>
              <Image source={{ uri: cover }} style={styles.heroCover} />
              <View style={styles.heroOverlay} />

              <View style={styles.heroContent}>
                <View style={[styles.avatarBorder, isChamp && styles.avatarBorderChamp]}>
                  {fighter.avatar ? (
                    <Image source={{ uri: fighter.avatar }} style={styles.avatar} />
                  ) : (
                    <View style={styles.fallbackAvatar}>
                      <Text style={styles.fallbackInitials}>
                        {fighter.name.split(' ').pop()?.[0] || 'V'}
                      </Text>
                    </View>
                  )}
                  {isChamp && (
                    <View style={styles.crownTag}>
                      <Text style={styles.crownText}>👑 ĐKVĐ</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.heroName}>{fighter.name}</Text>
                {fighter.nickname ? (
                  <Text style={styles.heroNickname}>"{fighter.nickname}"</Text>
                ) : null}

                <View style={styles.heroDivision}>
                  <Text style={styles.heroDivisionText}>
                    {division?.nameVi || division?.name || 'MMA Việt Nam'}
                  </Text>
                  <Text style={styles.heroGymText}> • {gym?.name || 'CLB Tự Do'}</Text>
                </View>
              </View>
            </View>

            {/* W-L-D Record Showcase */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>THÀNH TÍCH THI ĐẤU CHUYÊN NGHIỆP</Text>
              <View style={styles.recordGrid}>
                <View style={styles.recordBoxWin}>
                  <Text style={styles.recordValWin}>{fighter.record.wins}</Text>
                  <Text style={styles.recordLabel}>CHIẾN THẮNG</Text>
                </View>
                <View style={styles.recordBoxLoss}>
                  <Text style={styles.recordValLoss}>{fighter.record.losses}</Text>
                  <Text style={styles.recordLabel}>THẤT BẠI</Text>
                </View>
                <View style={styles.recordBoxDraw}>
                  <Text style={styles.recordValDraw}>{fighter.record.draws}</Text>
                  <Text style={styles.recordLabel}>HÒA</Text>
                </View>
                <View style={styles.recordBoxElo}>
                  <Text style={styles.recordValElo}>{Math.round(fighter.eloRating)}</Text>
                  <Text style={styles.recordLabel}>ELO RATING</Text>
                </View>
              </View>

              {/* Finish Breakdown */}
              <View style={styles.finishRow}>
                <View style={styles.finishPill}>
                  <Text style={styles.finishCount}>{fighter.record.winsByKo}</Text>
                  <Text style={styles.finishText}>Thắng bằng Knock-out</Text>
                </View>
                <View style={styles.finishPill}>
                  <Text style={styles.finishCount}>{fighter.record.winsBySub}</Text>
                  <Text style={styles.finishText}>Thắng bằng Khóa siết</Text>
                </View>
              </View>
            </View>

            {/* Tale of the Tape */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>THÔNG SỐ THỂ HÌNH (TALE OF THE TAPE)</Text>
              <View style={styles.tapeGrid}>
                <View style={styles.tapeItem}>
                  <Text style={styles.tapeLabel}>Chiều cao</Text>
                  <Text style={styles.tapeValue}>{fighter.height} cm</Text>
                </View>
                <View style={styles.tapeItem}>
                  <Text style={styles.tapeLabel}>Sải tay (Reach)</Text>
                  <Text style={styles.tapeValue}>{fighter.reach} cm</Text>
                </View>
                <View style={styles.tapeItem}>
                  <Text style={styles.tapeLabel}>Quốc tịch</Text>
                  <Text style={styles.tapeValue}>{fighter.nationality || 'Việt Nam'}</Text>
                </View>
                <View style={styles.tapeItem}>
                  <Text style={styles.tapeLabel}>Năm sinh</Text>
                  <Text style={styles.tapeValue}>{fighter.dateOfBirth ? fighter.dateOfBirth.split('-')[0] : '1995'}</Text>
                </View>
              </View>
            </View>

            {/* Combat Skills */}
            {fighter.stats && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>CHỈ SỐ KỸ NĂNG VÕ THUẬT (RADAR 100)</Text>
                <View style={styles.skillsGrid}>
                  {[
                    { label: 'Đánh Đứng (Striking)', val: fighter.stats.striking, color: '#ef4444' },
                    { label: 'Kỹ Năng Vật (Wrestling)', val: fighter.stats.wrestling, color: '#f59e0b' },
                    { label: 'Địa Chiến (Ground Game)', val: fighter.stats.groundGame, color: '#10b981' },
                    { label: 'Phòng Thủ (Defense)', val: fighter.stats.defense, color: '#06b6d4' },
                    { label: 'Thể Lực & Tim Mạch (Cardio)', val: fighter.stats.cardio, color: '#8b5cf6' },
                  ].map((s, idx) => (
                    <View key={idx} style={styles.skillRow}>
                      <View style={styles.skillHeader}>
                        <Text style={styles.skillName}>{s.label}</Text>
                        <Text style={[styles.skillVal, { color: s.color }]}>{s.val}/100</Text>
                      </View>
                      <View style={styles.skillTrack}>
                        <View style={[styles.skillBar, { width: `${s.val}%`, backgroundColor: s.color }]} />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Biography & Quote */}
            {fighter.quote ? (
              <View style={styles.quoteBox}>
                <Text style={styles.quoteText}>“{fighter.quote}”</Text>
              </View>
            ) : null}

            {fighter.bio ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>TIỂU SỬ SỰ NGHIỆP</Text>
                <Text style={styles.bioText}>{fighter.bio}</Text>
              </View>
            ) : null}

            <View style={{ height: 40 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    height: '90%',
    backgroundColor: THEME.colors.background,
    borderTopLeftRadius: THEME.borderRadius.xl,
    borderTopRightRadius: THEME.borderRadius.xl,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.textWhite,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 99,
    backgroundColor: THEME.colors.card,
  },
  scrollContent: {
    flex: 1,
  },
  heroBanner: {
    height: 200,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCover: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 13, 22, 0.7)',
  },
  heroContent: {
    alignItems: 'center',
    marginTop: 10,
  },
  avatarBorder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    padding: 3,
    backgroundColor: THEME.colors.primary,
    marginBottom: 8,
  },
  avatarBorderChamp: {
    backgroundColor: THEME.colors.gold,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 37,
  },
  fallbackAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 37,
    backgroundColor: '#090d16',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackInitials: {
    fontSize: 26,
    fontWeight: '900',
    color: THEME.colors.textWhite,
  },
  crownTag: {
    position: 'absolute',
    bottom: -6,
    backgroundColor: THEME.colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'center',
  },
  crownText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#000000',
  },
  heroName: {
    fontSize: 20,
    fontWeight: '900',
    color: THEME.colors.textWhite,
  },
  heroNickname: {
    fontSize: 13,
    fontStyle: 'italic',
    color: THEME.colors.goldLight,
    marginTop: 2,
  },
  heroDivision: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  heroDivisionText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.primaryLight,
  },
  heroGymText: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  section: {
    paddingHorizontal: THEME.spacing.lg,
    paddingTop: THEME.spacing.lg,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.textDim,
    letterSpacing: 0.5,
    marginBottom: THEME.spacing.sm,
  },
  recordGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  recordBoxWin: {
    flex: 1,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  recordValWin: {
    fontSize: 20,
    fontWeight: '900',
    color: THEME.colors.emerald,
    fontFamily: 'monospace',
  },
  recordBoxLoss: {
    flex: 1,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  recordValLoss: {
    fontSize: 20,
    fontWeight: '900',
    color: THEME.colors.primary,
    fontFamily: 'monospace',
  },
  recordBoxDraw: {
    flex: 1,
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.3)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  recordValDraw: {
    fontSize: 20,
    fontWeight: '900',
    color: THEME.colors.textMuted,
    fontFamily: 'monospace',
  },
  recordBoxElo: {
    flex: 1,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  recordValElo: {
    fontSize: 18,
    fontWeight: '900',
    color: THEME.colors.goldLight,
    fontFamily: 'monospace',
  },
  recordLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: THEME.colors.textDim,
    marginTop: 2,
  },
  finishRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  finishPill: {
    flex: 1,
    backgroundColor: THEME.colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    padding: 8,
    alignItems: 'center',
  },
  finishCount: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.textWhite,
  },
  finishText: {
    fontSize: 9,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
  tapeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tapeItem: {
    width: '48%',
    backgroundColor: THEME.colors.card,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  tapeLabel: {
    fontSize: 10,
    color: THEME.colors.textDim,
  },
  tapeValue: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.textWhite,
    marginTop: 2,
  },
  skillsGrid: {
    backgroundColor: THEME.colors.card,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    gap: 10,
  },
  skillRow: {
    gap: 4,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skillName: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    fontWeight: '600',
  },
  skillVal: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  skillTrack: {
    height: 6,
    backgroundColor: '#090d16',
    borderRadius: 3,
    overflow: 'hidden',
  },
  skillBar: {
    height: '100%',
    borderRadius: 3,
  },
  quoteBox: {
    marginHorizontal: THEME.spacing.lg,
    marginTop: THEME.spacing.lg,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderLeftWidth: 3,
    borderLeftColor: THEME.colors.gold,
  },
  quoteText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: THEME.colors.goldLight,
    lineHeight: 18,
  },
  bioText: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    lineHeight: 18,
  }
})
