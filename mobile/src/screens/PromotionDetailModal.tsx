import React from 'react'
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, Image } from 'react-native'
import { X, Trophy, Swords, Shield, Flame, CheckCircle, Scale, ChevronRight } from 'lucide-react-native'
import { Promotion, Fighter, fighters } from '../data/mobile-data'

const PROMO_COVERS: Record<string, string> = {
  p1: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&auto=format&fit=crop&q=80',
  p2: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
  p3: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd208?w=800&auto=format&fit=crop&q=80',
}

interface PromotionDetailModalProps {
  promotion: Promotion | null
  visible: boolean
  onClose: () => void
  onSelectFighter?: (fighter: Fighter) => void
}

export function PromotionDetailModal({ promotion, visible, onClose, onSelectFighter }: PromotionDetailModalProps) {
  if (!promotion) return null

  const coverUrl = PROMO_COVERS[promotion.id] || PROMO_COVERS.p1

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle} numberOfLines={1}>{promotion.name}</Text>
          <TouchableOpacity 
            onPress={onClose} 
            style={styles.closeBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Hero Banner */}
          <View style={styles.heroBanner}>
            <Image 
              source={{ uri: coverUrl }} 
              style={styles.coverImg} 
            />
            <View style={styles.coverOverlay} />
            <View style={styles.heroBadgeRow}>
              <View style={styles.formatTag}>
                <Flame size={12} color="#ffffff" />
                <Text style={styles.formatTagText}>{promotion.formatType || 'Chuyên Nghiệp'}</Text>
              </View>
              <Text style={styles.foundedText}>Thành lập {promotion.foundedYear}</Text>
            </View>
            <Text style={styles.heroName}>{promotion.name}</Text>
            <Text style={styles.heroTagline}>"{promotion.tagline || promotion.description}"</Text>
          </View>

          <View style={styles.body}>
            {/* Quick Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statValGold}>{promotion.belts?.length || 10}</Text>
                <Text style={styles.statLabel}>HẠNG ĐAI</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValWhite}>
                  {promotion.rules?.cageType?.split(' ')[0] || 'Lồng'}
                </Text>
                <Text style={styles.statLabel}>THỂ THỨC SÀN</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValEmerald}>
                  {promotion.rules?.roundDuration?.split(' ')[0] || '5P'}
                </Text>
                <Text style={styles.statLabel}>THỜI LƯỢNG HIỆP</Text>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.secTitle}>TỔNG QUAN GIẢI ĐẤU</Text>
            <Text style={styles.descText}>{promotion.description}</Text>

            {/* Belts */}
            {promotion.belts && promotion.belts.length > 0 && (
              <>
                <Text style={styles.secTitle}>HỆ THỐNG ĐAI VÔ ĐỊCH ({promotion.belts.length})</Text>
                <View style={styles.beltsList}>
                  {promotion.belts.map(b => {
                    const isVacant = b.status === 'vacant' || !b.currentChampionId
                    const champFighter = b.currentChampionId ? fighters.find(f => f.id === b.currentChampionId) : null
                    return (
                      <View key={b.id} style={styles.beltCard}>
                        <Text style={styles.beltDivision}>{b.divisionName}</Text>
                        <View style={styles.beltStatusRow}>
                          <Text style={{ fontSize: 13 }}>{isVacant ? '⏳' : '👑'}</Text>
                          <Text style={[styles.beltChamp, isVacant && styles.beltVacant]}>
                            {isVacant 
                              ? 'Đang bỏ trống (Chờ chung kết 2026)' 
                              : `ĐKVĐ: ${champFighter?.name || b.currentChampionId}`}
                          </Text>
                        </View>
                      </View>
                    )
                  })}
                </View>
              </>
            )}

            {/* Rules Details */}
            {promotion.rules && (
              <>
                <Text style={styles.secTitle}>QUY CHUẨN THI ĐẤU CHÍNH THỨC</Text>
                <View style={styles.rulesCard}>
                  <View style={styles.ruleItem}>
                    <Text style={styles.ruleLabel}>• Loại sàn đấu:</Text>
                    <Text style={styles.ruleVal}>{promotion.rules.cageType}</Text>
                  </View>
                  <View style={styles.ruleItem}>
                    <Text style={styles.ruleLabel}>• Thời gian hiệp:</Text>
                    <Text style={styles.ruleVal}>{promotion.rules.roundDuration}</Text>
                  </View>
                  <View style={styles.ruleItem}>
                    <Text style={styles.ruleLabel}>• Đòn chỏ (Elbows):</Text>
                    <Text style={styles.ruleVal}>{promotion.rules.elbowStrikes}</Text>
                  </View>
                  <View style={styles.ruleItem}>
                    <Text style={styles.ruleLabel}>• Đòn gối (Knees):</Text>
                    <Text style={styles.ruleVal}>{promotion.rules.kneesToHead}</Text>
                  </View>
                  <View style={styles.ruleItem}>
                    <Text style={styles.ruleLabel}>• Địa chiến (Ground):</Text>
                    <Text style={styles.ruleVal}>{promotion.rules.groundAndPound}</Text>
                  </View>
                  <View style={styles.ruleItem}>
                    <Text style={styles.ruleLabel}>• Quy định cắt cân:</Text>
                    <Text style={styles.ruleVal}>{promotion.rules.weightCutting}</Text>
                  </View>
                </View>
              </>
            )}
          </View>
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 12,
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
    flex: 1,
    marginRight: 10,
  },
  closeBtn: {
    padding: 4,
  },
  scroll: {
    flex: 1,
  },
  heroBanner: {
    height: 190,
    width: '100%',
    position: 'relative',
    justifyContent: 'flex-end',
    padding: 16,
  },
  coverImg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 13, 22, 0.75)',
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  formatTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#e11d48',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  formatTagText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#ffffff',
  },
  foundedText: {
    fontSize: 11,
    color: '#94a3b8',
  },
  heroName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
  },
  heroTagline: {
    fontSize: 11,
    color: '#fbbf24',
    fontStyle: 'italic',
    marginTop: 2,
  },
  body: {
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValGold: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fbbf24',
    fontFamily: 'monospace',
  },
  statValWhite: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  statValEmerald: {
    fontSize: 16,
    fontWeight: '900',
    color: '#10b981',
    fontFamily: 'monospace',
  },
  statLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  secTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 0.5,
    marginTop: 10,
    marginBottom: 8,
  },
  descText: {
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 20,
    marginBottom: 16,
  },
  beltsList: {
    gap: 8,
    marginBottom: 16,
  },
  beltCard: {
    backgroundColor: '#111827',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  beltDivision: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
  },
  beltStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 3,
  },
  beltChamp: {
    fontSize: 11,
    color: '#fbbf24',
    fontWeight: '700',
  },
  beltVacant: {
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  rulesCard: {
    backgroundColor: '#111827',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 8,
  },
  ruleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  ruleLabel: {
    fontSize: 11,
    color: '#94a3b8',
    width: '40%',
  },
  ruleVal: {
    fontSize: 11,
    color: '#e2e8f0',
    fontWeight: '600',
    width: '58%',
    textAlign: 'right',
  }
})
