import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { THEME } from '../constants/theme'
import { Header } from '../components/Header'
import { RankingRow } from '../components/RankingRow'
import { FighterDetailModal } from './FighterDetailModal'
import { SearchModal } from '../components/SearchModal'
import { rankings, divisions, fighters, gyms, Fighter } from '../data/mobile-data'
import { Trophy, Crown, ShieldAlert, ChevronRight, Award, Flame } from 'lucide-react-native'

export function RankingsScreen() {
  const [genderTab, setGenderTab] = useState<'male' | 'female' | 'p4p'>('male')
  const [selectedDivisionId, setSelectedDivisionId] = useState('d-m-61') // Default 60-61kg Bantamweight
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null)
  const [searchVisible, setSearchVisible] = useState(false)

  const activeDivisions = divisions.filter(d => 
    genderTab === 'male' ? d.gender === 'male' : d.gender === 'female'
  )

  const currentDivision = divisions.find(d => d.id === selectedDivisionId) || divisions[4] // default 61kg
  const currentRankings = rankings.filter(r => r.divisionId === selectedDivisionId)

  const championRanking = currentRankings.find(r => r.position === 0)
  const championFighter = championRanking 
    ? fighters.find(f => f.id === championRanking.fighterId) 
    : fighters.find(f => f.divisionId === selectedDivisionId && f.isChampion) || null

  const contenders = currentRankings.filter(r => r.position !== 0).sort((a, b) => a.position - b.position)

  // Top 10 P4P Fighters
  const p4pFighters = [...fighters].sort((a, b) => b.eloRating - a.eloRating).slice(0, 10)

  return (
    <View style={styles.container}>
      <Header 
        title="Bảng Xếp Hạng" 
        subtitle="Chuẩn VMMAF &amp; LION mùa giải 2026"
        onSearchPress={() => setSearchVisible(true)}
      />

      {/* Main Categories: Nam / Nữ / P4P */}
      <View style={styles.categoryTabs}>
        <TouchableOpacity
          style={[styles.catTab, genderTab === 'male' && styles.catTabActive]}
          onPress={() => {
            setGenderTab('male')
            setSelectedDivisionId('d-m-61')
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.catTabText, genderTab === 'male' && styles.catTabTextActive]}>
            Hạng Cân Nam
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.catTab, genderTab === 'female' && styles.catTabActive]}
          onPress={() => {
            setGenderTab('female')
            setSelectedDivisionId('d-f-52')
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.catTabText, genderTab === 'female' && styles.catTabTextActive]}>
            Hạng Cân Nữ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.catTab, genderTab === 'p4p' && styles.catTabActive]}
          onPress={() => setGenderTab('p4p')}
          activeOpacity={0.7}
        >
          <Flame size={13} color={genderTab === 'p4p' ? '#ffffff' : '#f59e0b'} />
          <Text style={[styles.catTabText, genderTab === 'p4p' && styles.catTabTextActive]}>
            Top P4P
          </Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Weight Class Pills (Only for Male/Female) */}
      {genderTab !== 'p4p' && (
        <View style={styles.divisionsBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.divPillsScroll}>
            {activeDivisions.map(d => {
              const isSelected = selectedDivisionId === d.id
              const shortName = d.nameVi.split(' (')[0].replace('Hạng ', '')
              return (
                <TouchableOpacity
                  key={d.id}
                  style={[styles.divPill, isSelected && styles.divPillActive]}
                  onPress={() => setSelectedDivisionId(d.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.divPillText, isSelected && styles.divPillTextActive]}>
                    {d.weightLimit}kg {shortName}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      )}

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {genderTab === 'p4p' ? (
          /* ================= P4P LEADERBOARD ================= */
          <View style={styles.contentWrap}>
            <View style={styles.p4pBanner}>
              <Trophy size={20} color="#f59e0b" />
              <View style={styles.p4pBannerText}>
                <Text style={styles.p4pBannerTitle}>BẢNG XẾP HẠNG POUND-FOR-POUND</Text>
                <Text style={styles.p4pBannerSub}>Đánh giá tổng hợp toàn diện không phân biệt hạng cân</Text>
              </View>
            </View>

            {p4pFighters.map((fighter, idx) => {
              const gym = gyms.find(g => g.id === fighter.gymId)
              const div = divisions.find(d => d.id === fighter.divisionId)
              return (
                <RankingRow
                  key={fighter.id}
                  position={idx + 1}
                  fighter={fighter}
                  gymName={`${div?.weightLimit}kg • ${gym?.name || 'Tự do'}`}
                  onPress={() => setSelectedFighter(fighter)}
                />
              )
            })}
          </View>
        ) : (
          /* ================= DIVISION RANKINGS ================= */
          <View style={styles.contentWrap}>
            {/* Division Title Header */}
            <View style={styles.divHeader}>
              <Text style={styles.divTitle}>{currentDivision.nameVi}</Text>
              <Text style={styles.divMeta}>Giới hạn: {currentDivision.weightLimit} kg • Đai chuẩn VMMAF</Text>
            </View>

            {/* CHAMPION SHOWCASE */}
            {championFighter ? (
              <TouchableOpacity
                style={styles.champCard}
                onPress={() => setSelectedFighter(championFighter)}
                activeOpacity={0.85}
              >
                <View style={styles.champGlowBar} />
                <View style={styles.champHeader}>
                  <View style={styles.champBadge}>
                    <Crown size={14} color="#000000" />
                    <Text style={styles.champBadgeText}>ĐƯƠNG KIM VÔ ĐỊCH HẠNG CÂN</Text>
                  </View>
                  <Text style={styles.champElo}>{Math.round(championFighter.eloRating)} ELO</Text>
                </View>

                <View style={styles.champBody}>
                  <View style={styles.champAvatarWrap}>
                    <Image 
                      source={{ uri: championFighter.avatar || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=200' }} 
                      style={styles.champAvatar} 
                    />
                    <View style={styles.goldBeltIcon}>
                      <Text style={{ fontSize: 12 }}>🥇</Text>
                    </View>
                  </View>

                  <View style={styles.champInfo}>
                    <Text style={styles.champName}>{championFighter.name}</Text>
                    {championFighter.nickname ? (
                      <Text style={styles.champNick}>"{championFighter.nickname}"</Text>
                    ) : null}
                    <Text style={styles.champRecord}>
                      {championFighter.record.wins} Thắng - {championFighter.record.losses} Thua ({championFighter.record.winsByKo} K.O)
                    </Text>
                    <Text style={styles.champGym}>
                      🏛️ {gyms.find(g => g.id === championFighter.gymId)?.name || 'CLB Tự Do'}
                    </Text>
                  </View>
                </View>

                <View style={styles.champFooter}>
                  <Text style={styles.champFooterText}>Chạm để xem toàn bộ hồ sơ &amp; chỉ số radar ➔</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.vacantCard}>
                <ShieldAlert size={26} color="#f59e0b" />
                <View style={styles.vacantInfo}>
                  <Text style={styles.vacantTitle}>Đai Vô Địch Đang Bỏ Trống (Vacant Belt)</Text>
                  <Text style={styles.vacantDesc}>
                    Chưa có võ sĩ nắm giữ đai. Tân vương sẽ được định đoạt tại trận chung kết mùa giải 2026.
                  </Text>
                </View>
              </View>
            )}

            {/* CONTENDERS LIST */}
            <View style={styles.contendersSection}>
              <View style={styles.contendersHeaderRow}>
                <Award size={14} color="#94a3b8" />
                <Text style={styles.contendersTitle}>CÁC ỨNG CỬ VIÊN TRANH ĐAI (CONTENDERS)</Text>
              </View>

              {contenders.length > 0 ? (
                contenders.map((rankItem, idx) => {
                  const fighter = fighters.find(f => f.id === rankItem.fighterId)
                  if (!fighter) return null
                  const gym = gyms.find(g => g.id === fighter.gymId)
                  return (
                    <RankingRow
                      key={`${rankItem.divisionId}-${rankItem.position}-${idx}`}
                      position={rankItem.position}
                      fighter={fighter}
                      gymName={gym?.name}
                      onPress={() => setSelectedFighter(fighter)}
                    />
                  )
                })
              ) : (
                <View style={styles.emptyContenders}>
                  <Text style={styles.emptyContendersText}>
                    Đang cập nhật danh sách ứng viên chính thức...
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Global Search Modal */}
      <SearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        onSelectFighter={f => setSelectedFighter(f)}
      />

      {/* Fighter Detail Modal */}
      <FighterDetailModal
        fighter={selectedFighter}
        visible={!!selectedFighter}
        onClose={() => setSelectedFighter(null)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  categoryTabs: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    padding: 6,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
    borderRadius: 10,
    gap: 6,
  },
  catTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  catTabActive: {
    backgroundColor: '#e11d48',
  },
  catTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
  },
  catTabTextActive: {
    color: '#ffffff',
  },
  divisionsBar: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 8,
  },
  divPillsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  divPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#141d33',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  divPillActive: {
    backgroundColor: 'rgba(225, 29, 72, 0.2)',
    borderColor: '#e11d48',
  },
  divPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
  },
  divPillTextActive: {
    color: '#fb7185',
  },
  scroll: {
    flex: 1,
  },
  contentWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  divHeader: {
    marginBottom: 12,
  },
  divTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
  },
  divMeta: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  champCard: {
    backgroundColor: '#111827',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#f59e0b',
    overflow: 'hidden',
    marginBottom: 16,
  },
  champGlowBar: {
    height: 3,
    backgroundColor: '#f59e0b',
  },
  champHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  champBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f59e0b',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 5,
  },
  champBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: 0.5,
  },
  champElo: {
    fontSize: 13,
    fontWeight: '900',
    color: '#fbbf24',
    fontFamily: 'monospace',
  },
  champBody: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  champAvatarWrap: {
    position: 'relative',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#f59e0b',
    overflow: 'hidden',
  },
  champAvatar: {
    width: '100%',
    height: '100%',
  },
  goldBeltIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#000000',
    borderRadius: 10,
    padding: 1,
  },
  champInfo: {
    flex: 1,
  },
  champName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#ffffff',
  },
  champNick: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#fbbf24',
    marginTop: 1,
  },
  champRecord: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10b981',
    fontFamily: 'monospace',
    marginTop: 3,
  },
  champGym: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 2,
  },
  champFooter: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    paddingVertical: 6,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(245, 158, 11, 0.15)',
  },
  champFooterText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fbbf24',
  },
  vacantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    gap: 12,
    marginBottom: 16,
  },
  vacantInfo: {
    flex: 1,
  },
  vacantTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fbbf24',
  },
  vacantDesc: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 3,
    lineHeight: 15,
  },
  contendersSection: {
    marginTop: 4,
  },
  contendersHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  contendersTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  emptyContenders: {
    padding: 24,
    alignItems: 'center',
  },
  emptyContendersText: {
    fontSize: 12,
    color: '#64748b',
    fontStyle: 'italic',
  },
  p4pBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    gap: 10,
    marginBottom: 14,
  },
  p4pBannerText: {
    flex: 1,
  },
  p4pBannerTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#fbbf24',
    letterSpacing: 0.5,
  },
  p4pBannerSub: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 1,
  }
})
