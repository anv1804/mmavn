import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions 
} from 'react-native'
import { THEME } from '../constants/theme'
import { Header } from '../components/Header'
import { SearchModal } from '../components/SearchModal'
import { FighterDetailModal } from './FighterDetailModal'
import { PromotionDetailModal } from './PromotionDetailModal'
import { 
  fighters, 
  gyms, 
  divisions, 
  promotions, 
  Fighter,
  Promotion 
} from '../data/mobile-data'
import { 
  Flame, 
  Trophy, 
  Swords, 
  Calendar, 
  ChevronRight, 
  MapPin, 
  Crown,
  Play,
  Vote,
  Clock,
  Sparkles,
  Award
} from 'lucide-react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface HomeScreenProps {
  navigation: any
}

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null)
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)
  const [searchVisible, setSearchVisible] = useState(false)
  const [selectedVote, setSelectedVote] = useState<'duc' | 'khai' | null>('duc')
  const [activeMatchIndex, setActiveMatchIndex] = useState(0)

  // Top 6 Elo Fighters
  const topEloFighters = [...fighters].sort((a, b) => b.eloRating - a.eloRating).slice(0, 6)

  // 3 Featured Matchups with direct selector tabs (no jarring cutoffs!)
  const matchups = [
    {
      id: 'm1',
      tag: 'CHUNG KẾT 52KG',
      league: 'LION Championship 35',
      title: 'Lê Hoàng Đức vs Bùi Đình Khải',
      arena: 'NTĐ Xuân Đỉnh, Hà Nội',
      date: '12/09/2026 • 19:00',
      rounds: '5 Hiệp Tranh Đai',
      f1: fighters.find(f => f.id === 'f19') || fighters[0], // Lê Hoàng Đức
      f2: fighters.find(f => f.id === 'f20') || fighters[1], // Bùi Đình Khải
    },
    {
      id: 'm2',
      tag: 'BẢO VỆ ĐAI 60KG',
      league: 'LION Championship 35',
      title: 'Trần Ngọc Lượng vs Robson Oliveira',
      arena: 'NTĐ Rạch Miễu, TP.HCM',
      date: '26/09/2026 • 20:00',
      rounds: '5 Hiệp Tranh Đai',
      f1: fighters.find(f => f.id === 'f9') || fighters[2],  // Trần Ngọc Lượng
      f2: fighters.find(f => f.id === 'f6') || fighters[3],  // Robson Oliveira
    },
    {
      id: 'm3',
      tag: 'SIÊU ĐẠI CHIẾN 84KG',
      league: 'GMA Thần Võ 2026',
      title: 'Phạm Công Minh vs Trần Quốc Toản',
      arena: 'The Grand Ho Tram Strip',
      date: '10/10/2026 • 18:30',
      rounds: '3 Hiệp x 3 Phút',
      f1: fighters.find(f => f.id === 'f17') || fighters[4], // Phạm Công Minh
      f2: fighters.find(f => f.id === 'f28') || fighters[5], // Trần Quốc Toản
    }
  ]

  const currentMatch = matchups[activeMatchIndex]

  // Video highlights
  const highlights = [
    {
      id: 'h1',
      title: 'K.O 16 giây của Bùi Đình Khải tại LC34',
      duration: '0:48',
      views: '128K lượt xem',
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'h2',
      title: 'Bậc thầy Armbar Robson Oliveira lật ngược thế cờ',
      duration: '1:32',
      views: '94K lượt xem',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'h3',
      title: 'Màn đổi đòn bốc lửa của Nghiêm Văn Ý',
      duration: '2:15',
      views: '162K lượt xem',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&auto=format&fit=crop&q=80',
    }
  ]

  return (
    <View style={styles.container}>
      <Header onSearchPress={() => setSearchVisible(true)} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ============================================================ */}
        {/* 1. HERO EVENT CARD (SYMMETRIC & BALANCED)                   */}
        {/* ============================================================ */}
        <View style={styles.heroSection}>
          {/* Match selector pills */}
          <View style={styles.matchSelectorRow}>
            {matchups.map((m, idx) => {
              const isActive = activeMatchIndex === idx
              return (
                <TouchableOpacity
                  key={m.id}
                  style={[styles.matchSelectorPill, isActive && styles.matchSelectorPillActive]}
                  onPress={() => setActiveMatchIndex(idx)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.matchSelectorText, isActive && styles.matchSelectorTextActive]}>
                    {m.tag}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>

          {/* Unified Fight Card */}
          <View style={styles.heroCard}>
            {/* Top Tag & Time */}
            <View style={styles.cardHeader}>
              <View style={styles.liveTag}>
                <Flame size={12} color="#ffffff" />
                <Text style={styles.liveTagText}>{currentMatch.league}</Text>
              </View>
              <View style={styles.timeTag}>
                <Calendar size={11} color="#fbbf24" />
                <Text style={styles.timeTagText}>{currentMatch.date.split(' • ')[0]}</Text>
              </View>
            </View>

            {/* Title */}
            <Text style={styles.cardTitle}>{currentMatch.title}</Text>
            <View style={styles.arenaRow}>
              <MapPin size={12} color="#94a3b8" />
              <Text style={styles.arenaText}>{currentMatch.arena}</Text>
              <Text style={styles.roundsText}>• {currentMatch.rounds}</Text>
            </View>

            {/* Face-Off Area */}
            <View style={styles.faceOffBox}>
              {/* Corner Red */}
              <TouchableOpacity 
                style={styles.fighterCorner} 
                onPress={() => setSelectedFighter(currentMatch.f1)}
                activeOpacity={0.8}
              >
                <View style={[styles.avatarFrame, styles.redCornerFrame]}>
                  <Image 
                    source={{ uri: currentMatch.f1.avatar || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=200' }} 
                    style={styles.avatarPic} 
                  />
                  <View style={styles.cornerLabelRed}>
                    <Text style={styles.cornerLabelText}>GÓC ĐỎ</Text>
                  </View>
                </View>
                <Text style={styles.fighterName} numberOfLines={1}>{currentMatch.f1.name}</Text>
                <Text style={styles.fighterNick} numberOfLines={1}>"{currentMatch.f1.nickname || 'Đấu sĩ'}"</Text>
                <Text style={styles.fighterRecord}>{currentMatch.f1.record.wins}W - {currentMatch.f1.record.losses}L</Text>
                <Text style={styles.fighterElo}>{Math.round(currentMatch.f1.eloRating)} ELO</Text>
              </TouchableOpacity>

              {/* VS Middle */}
              <View style={styles.vsCenter}>
                <View style={styles.vsBadge}>
                  <Text style={styles.vsBadgeText}>VS</Text>
                </View>
                <Text style={styles.vsTitleHint}>TRANH ĐAI</Text>
              </View>

              {/* Corner Blue */}
              <TouchableOpacity 
                style={styles.fighterCorner} 
                onPress={() => setSelectedFighter(currentMatch.f2)}
                activeOpacity={0.8}
              >
                <View style={[styles.avatarFrame, styles.blueCornerFrame]}>
                  <Image 
                    source={{ uri: currentMatch.f2.avatar || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=200' }} 
                    style={styles.avatarPic} 
                  />
                  <View style={styles.cornerLabelBlue}>
                    <Text style={styles.cornerLabelText}>GÓC XANH</Text>
                  </View>
                </View>
                <Text style={styles.fighterName} numberOfLines={1}>{currentMatch.f2.name}</Text>
                <Text style={styles.fighterNick} numberOfLines={1}>"{currentMatch.f2.nickname || 'Đấu sĩ'}"</Text>
                <Text style={styles.fighterRecord}>{currentMatch.f2.record.wins}W - {currentMatch.f2.record.losses}L</Text>
                <Text style={styles.fighterElo}>{Math.round(currentMatch.f2.eloRating)} ELO</Text>
              </TouchableOpacity>
            </View>

            {/* Quick Actions */}
            <View style={styles.cardActions}>
              <TouchableOpacity 
                style={styles.detailBtn}
                onPress={() => setSelectedFighter(currentMatch.f1)}
                activeOpacity={0.8}
              >
                <Text style={styles.detailBtnText}>Xem Tale of the Tape &amp; Hồ Sơ</Text>
                <ChevronRight size={14} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ============================================================ */}
        {/* 2. BẢNG VÀNG TOP ELO P4P (HORIZONTAL CARDS)                 */}
        {/* ============================================================ */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <View style={styles.secTitleRow}>
              <Trophy size={16} color="#f59e0b" />
              <Text style={styles.secTitle}>Bảng Vàng Elo P4P</Text>
            </View>
            <TouchableOpacity 
              onPress={() => navigation.navigate('BXH')} 
              style={styles.seeAllBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.seeAllText}>Xem BXH</Text>
              <ChevronRight size={13} color="#e11d48" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eloScrollWrap}
          >
            {topEloFighters.map((f, i) => {
              const gym = gyms.find(g => g.id === f.gymId)
              const isFirst = i === 0
              return (
                <TouchableOpacity
                  key={f.id}
                  style={[styles.eloCard, isFirst && styles.eloCardGold]}
                  onPress={() => setSelectedFighter(f)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.rankTag, isFirst ? styles.rankTagGold : styles.rankTagNormal]}>
                    <Text style={[styles.rankTagText, isFirst && { color: '#000000' }]}>
                      {isFirst ? '👑 #1' : `#${i + 1}`}
                    </Text>
                  </View>

                  <View style={[styles.eloAvatarRing, isFirst && styles.eloAvatarRingGold]}>
                    <Image 
                      source={{ uri: f.avatar || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=200' }} 
                      style={styles.eloAvatar} 
                    />
                  </View>

                  <Text style={styles.eloName} numberOfLines={1}>{f.name}</Text>
                  <Text style={styles.eloGym} numberOfLines={1}>{gym?.name || 'MMAVN'}</Text>

                  <View style={styles.eloRow}>
                    <Text style={styles.eloVal}>{Math.round(f.eloRating)}</Text>
                    <Text style={styles.eloLbl}>ELO</Text>
                  </View>

                  <Text style={styles.eloRecord}>{f.record.wins}W - {f.record.losses}L</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        {/* ============================================================ */}
        {/* 3. 3 TỔ CHỨC GIẢI ĐẤU (CARD LIST)                          */}
        {/* ============================================================ */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <View style={styles.secTitleRow}>
              <Swords size={16} color="#e11d48" />
              <Text style={styles.secTitle}>3 Đấu Trường Quốc Gia</Text>
            </View>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Giải đấu')} 
              style={styles.seeAllBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.seeAllText}>Chi tiết</Text>
              <ChevronRight size={13} color="#e11d48" />
            </TouchableOpacity>
          </View>

          <View style={styles.promosCol}>
            {promotions.map(promo => (
              <TouchableOpacity
                key={promo.id}
                style={styles.promoItemCard}
                onPress={() => setSelectedPromotion(promo)}
                activeOpacity={0.8}
              >
                <View style={styles.promoLogoBox}>
                  <Text style={styles.promoLogoText}>{promo.shortName}</Text>
                </View>

                <View style={styles.promoInfo}>
                  <View style={styles.promoNameRow}>
                    <Text style={styles.promoName}>{promo.name}</Text>
                    <View style={styles.promoTypeBadge}>
                      <Text style={styles.promoTypeText}>{promo.formatType}</Text>
                    </View>
                  </View>
                  <Text style={styles.promoTagline} numberOfLines={1}>"{promo.tagline || promo.description}"</Text>
                  <Text style={styles.promoMeta}>
                    {promo.belts?.length || 10} Hạng đai • Sàn: {promo.rules?.cageType || 'Lồng đấu'}
                  </Text>
                </View>

                <ChevronRight size={16} color="#64748b" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ============================================================ */}
        {/* 4. VIDEO HIGHLIGHTS                                         */}
        {/* ============================================================ */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <View style={styles.secTitleRow}>
              <Play size={16} color="#38bdf8" />
              <Text style={styles.secTitle}>Video Highlights 2026</Text>
            </View>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.videoScrollWrap}
          >
            {highlights.map(h => (
              <TouchableOpacity key={h.id} style={styles.videoCard} activeOpacity={0.85}>
                <View style={styles.videoImgWrap}>
                  <Image source={{ uri: h.image }} style={styles.videoImg} />
                  <View style={styles.videoOverlay} />
                  <View style={styles.playBtn}>
                    <Play size={14} color="#ffffff" fill="#ffffff" />
                  </View>
                  <View style={styles.durTag}>
                    <Text style={styles.durText}>{h.duration}</Text>
                  </View>
                </View>
                <View style={styles.videoBody}>
                  <Text style={styles.videoTitle} numberOfLines={2}>{h.title}</Text>
                  <Text style={styles.videoViews}>{h.views}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ============================================================ */}
        {/* 5. BÌNH CHỌN TỶ SỐ TRỰC TIẾP                                */}
        {/* ============================================================ */}
        <View style={styles.pollCard}>
          <View style={styles.pollHeader}>
            <Vote size={16} color="#f59e0b" />
            <Text style={styles.pollTitle}>Dự Đoán Chung Kết 52kg LC35</Text>
          </View>
          <Text style={styles.pollDesc}>Theo bạn, ai sẽ giành đai vô địch hạng Rơm ngày 12/09?</Text>

          <View style={styles.pollButtonsRow}>
            <TouchableOpacity
              style={[styles.pollVoteBtn, selectedVote === 'duc' && styles.pollVoteBtnActive]}
              onPress={() => setSelectedVote('duc')}
              activeOpacity={0.8}
            >
              <Text style={[styles.pollVoteName, selectedVote === 'duc' && { color: '#fb7185' }]}>
                Lê Hoàng Đức
              </Text>
              <Text style={styles.pollVotePct}>64%</Text>
              <View style={styles.pollBarTrack}>
                <View style={[styles.pollBarFill, { width: '64%', backgroundColor: '#e11d48' }]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.pollVoteBtn, selectedVote === 'khai' && styles.pollVoteBtnActive]}
              onPress={() => setSelectedVote('khai')}
              activeOpacity={0.8}
            >
              <Text style={[styles.pollVoteName, selectedVote === 'khai' && { color: '#38bdf8' }]}>
                Bùi Đình Khải
              </Text>
              <Text style={styles.pollVotePct}>36%</Text>
              <View style={styles.pollBarTrack}>
                <View style={[styles.pollBarFill, { width: '36%', backgroundColor: '#38bdf8' }]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Fighter Detail Modal */}
      <FighterDetailModal
        fighter={selectedFighter}
        visible={!!selectedFighter}
        onClose={() => setSelectedFighter(null)}
      />

      {/* Promotion Detail Modal */}
      <PromotionDetailModal
        promotion={selectedPromotion}
        visible={!!selectedPromotion}
        onClose={() => setSelectedPromotion(null)}
        onSelectFighter={f => setSelectedFighter(f)}
      />

      {/* Global Search Modal */}
      <SearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        onSelectFighter={f => setSelectedFighter(f)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  scroll: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  matchSelectorRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  matchSelectorPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#141d33',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  matchSelectorPillActive: {
    backgroundColor: 'rgba(225, 29, 72, 0.2)',
    borderColor: '#e11d48',
  },
  matchSelectorText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  matchSelectorTextActive: {
    color: '#fb7185',
  },
  heroCard: {
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(225, 29, 72, 0.3)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#e11d48',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  liveTagText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fbbf24',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#ffffff',
  },
  arenaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
    marginBottom: 12,
  },
  arenaText: {
    fontSize: 11,
    color: '#94a3b8',
  },
  roundsText: {
    fontSize: 11,
    color: '#fbbf24',
    fontWeight: '700',
  },
  faceOffBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0a0e1a',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  fighterCorner: {
    flex: 1,
    alignItems: 'center',
  },
  avatarFrame: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    position: 'relative',
    marginBottom: 6,
  },
  redCornerFrame: {
    borderColor: '#e11d48',
  },
  blueCornerFrame: {
    borderColor: '#3b82f6',
  },
  avatarPic: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  cornerLabelRed: {
    position: 'absolute',
    bottom: -6,
    backgroundColor: '#e11d48',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  cornerLabelBlue: {
    position: 'absolute',
    bottom: -6,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  cornerLabelText: {
    fontSize: 7,
    fontWeight: '900',
    color: '#ffffff',
  },
  fighterName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 6,
  },
  fighterNick: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#fbbf24',
    marginTop: 1,
  },
  fighterRecord: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10b981',
    fontFamily: 'monospace',
    marginTop: 2,
  },
  fighterElo: {
    fontSize: 9,
    color: '#94a3b8',
    fontFamily: 'monospace',
  },
  vsCenter: {
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  vsBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#e11d48',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#e11d48',
  },
  vsTitleHint: {
    fontSize: 8,
    fontWeight: '900',
    color: '#fbbf24',
    marginTop: 4,
  },
  cardActions: {
    alignItems: 'center',
  },
  detailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e11d48',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    gap: 6,
  },
  detailBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
  },
  section: {
    paddingTop: 18,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  secTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  secTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#ffffff',
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#e11d48',
  },
  eloScrollWrap: {
    paddingHorizontal: 16,
    gap: 10,
  },
  eloCard: {
    width: 125,
    backgroundColor: '#111827',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 10,
    alignItems: 'center',
    position: 'relative',
  },
  eloCardGold: {
    borderColor: '#f59e0b',
    backgroundColor: '#141e33',
  },
  rankTag: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  rankTagGold: {
    backgroundColor: '#f59e0b',
  },
  rankTagNormal: {
    backgroundColor: '#1e293b',
  },
  rankTagText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#94a3b8',
  },
  eloAvatarRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#e11d48',
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 6,
  },
  eloAvatarRingGold: {
    borderColor: '#f59e0b',
  },
  eloAvatar: {
    width: '100%',
    height: '100%',
  },
  eloName: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
  },
  eloGym: {
    fontSize: 9,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 1,
  },
  eloRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
    marginTop: 4,
  },
  eloVal: {
    fontSize: 14,
    fontWeight: '900',
    color: '#fbbf24',
    fontFamily: 'monospace',
  },
  eloLbl: {
    fontSize: 7,
    fontWeight: '800',
    color: '#94a3b8',
  },
  eloRecord: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: '#10b981',
    marginTop: 2,
  },
  promosCol: {
    paddingHorizontal: 16,
    gap: 8,
  },
  promoItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 10,
  },
  promoLogoBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#e11d48',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoLogoText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#ffffff',
  },
  promoInfo: {
    flex: 1,
  },
  promoNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  promoName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  promoTypeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
  },
  promoTypeText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#94a3b8',
  },
  promoTagline: {
    fontSize: 10,
    color: '#fbbf24',
    fontStyle: 'italic',
    marginTop: 1,
  },
  promoMeta: {
    fontSize: 9,
    color: '#94a3b8',
    marginTop: 2,
  },
  videoScrollWrap: {
    paddingHorizontal: 16,
    gap: 10,
  },
  videoCard: {
    width: 170,
    backgroundColor: '#111827',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  videoImgWrap: {
    height: 95,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoImg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(225, 29, 72, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durTag: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  durText: {
    fontSize: 8,
    color: '#ffffff',
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  videoBody: {
    padding: 8,
  },
  videoTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 14,
  },
  videoViews: {
    fontSize: 8,
    color: '#94a3b8',
    marginTop: 3,
  },
  pollCard: {
    marginHorizontal: 16,
    marginTop: 18,
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  pollHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  pollTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fbbf24',
  },
  pollDesc: {
    fontSize: 11,
    color: '#94a3b8',
    marginBottom: 10,
  },
  pollButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pollVoteBtn: {
    flex: 1,
    backgroundColor: '#0a0e1a',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  pollVoteBtnActive: {
    borderColor: '#e11d48',
  },
  pollVoteName: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
  },
  pollVotePct: {
    fontSize: 14,
    fontWeight: '900',
    color: '#ffffff',
    fontFamily: 'monospace',
    marginTop: 2,
    marginBottom: 4,
  },
  pollBarTrack: {
    height: 4,
    backgroundColor: '#1e293b',
    borderRadius: 2,
    overflow: 'hidden',
  },
  pollBarFill: {
    height: '100%',
    borderRadius: 2,
  }
})
