import React, { useState, useMemo } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  FlatList 
} from 'react-native'
import { THEME } from '../constants/theme'
import { Search, X, TrendingUp, Users, Building2, Swords, ChevronRight, Crown } from 'lucide-react-native'
import { fighters, gyms, promotions, Fighter, Gym, Promotion } from '../data/mobile-data'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface SearchModalProps {
  visible: boolean
  onClose: () => void
  onSelectFighter?: (fighter: Fighter) => void
}

export function SearchModal({ visible, onClose, onSelectFighter }: SearchModalProps) {
  const insets = useSafeAreaInsets()
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<'all' | 'fighters' | 'gyms' | 'promotions'>('all')

  const trendingTags = [
    'Nghiêm Văn Ý',
    'Lê Hoàng Đức',
    'Bùi Đình Khải',
    'The Champ MMA',
    'LION Championship 35',
    'Robson Oliveira',
    'Saigon Sports Club',
    'GMA Thần Võ'
  ]

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return { matchedFighters: [], matchedGyms: [], matchedPromotions: [] }

    const matchedFighters = fighters.filter(f => 
      f.name.toLowerCase().includes(q) || 
      (f.nickname && f.nickname.toLowerCase().includes(q)) ||
      (f.styles && f.styles.some(s => s.toLowerCase().includes(q)))
    )

    const matchedGyms = gyms.filter(g => 
      g.name.toLowerCase().includes(q) || 
      g.city.toLowerCase().includes(q) ||
      (g.headCoach && g.headCoach.toLowerCase().includes(q))
    )

    const matchedPromotions = promotions.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.shortName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )

    return { matchedFighters, matchedGyms, matchedPromotions }
  }, [query])

  const totalMatches = 
    searchResults.matchedFighters.length + 
    searchResults.matchedGyms.length + 
    searchResults.matchedPromotions.length

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={[styles.container, { paddingTop: Math.max(insets.top, 12) }]}>
        {/* Search Header Bar */}
        <View style={styles.headerBar}>
          <View style={styles.inputBox}>
            <Search size={18} color={THEME.colors.primary} />
            <TextInput
              style={styles.input}
              placeholder="Tìm võ sĩ, CLB, sự kiện, giải đấu..."
              placeholderTextColor={THEME.colors.textDim}
              value={query}
              onChangeText={setQuery}
              autoFocus
              returnKeyType="search"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')} style={styles.clearBtn}>
                <X size={16} color={THEME.colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>Đóng</Text>
          </TouchableOpacity>
        </View>

        {/* Content Body */}
        {query.trim().length === 0 ? (
          <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
            {/* Trending Searches */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <TrendingUp size={15} color={THEME.colors.gold} />
                <Text style={styles.sectionTitle}>Tìm kiếm thịnh hành</Text>
              </View>
              <View style={styles.tagWrap}>
                {trendingTags.map((tag, idx) => (
                  <TouchableOpacity 
                    key={idx} 
                    style={styles.trendTag}
                    onPress={() => setQuery(tag)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.trendTagText}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Quick Categories */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Danh mục tra cứu</Text>
              <View style={styles.catGrid}>
                <TouchableOpacity 
                  style={styles.catCard} 
                  onPress={() => setQuery('Vô địch')}
                  activeOpacity={0.7}
                >
                  <Crown size={20} color={THEME.colors.gold} />
                  <Text style={styles.catCardTitle}>Đương Kim Vô Địch</Text>
                  <Text style={styles.catCardSub}>10 Hạng Cân</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.catCard} 
                  onPress={() => setQuery('Hà Nội')}
                  activeOpacity={0.7}
                >
                  <Building2 size={20} color={THEME.colors.primary} />
                  <Text style={styles.catCardTitle}>CLB Miền Bắc</Text>
                  <Text style={styles.catCardSub}>11 Đại Bản Doanh</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.catCard} 
                  onPress={() => setQuery('TP.HCM')}
                  activeOpacity={0.7}
                >
                  <Building2 size={20} color={THEME.colors.emerald} />
                  <Text style={styles.catCardTitle}>CLB Miền Nam</Text>
                  <Text style={styles.catCardSub}>10 Đại Bản Doanh</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.catCard} 
                  onPress={() => setQuery('LION')}
                  activeOpacity={0.7}
                >
                  <Swords size={20} color="#3b82f6" />
                  <Text style={styles.catCardTitle}>LION Championship</Text>
                  <Text style={styles.catCardSub}>Sự Kiện &amp; Lồng Đấu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        ) : (
          <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
            {totalMatches === 0 ? (
              <View style={styles.noResults}>
                <Text style={styles.noResultsIcon}>🔍</Text>
                <Text style={styles.noResultsText}>Không tìm thấy kết quả cho "{query}"</Text>
                <Text style={styles.noResultsSub}>Thử tìm theo tên võ sĩ, tên phòng tập hoặc giải đấu</Text>
              </View>
            ) : (
              <>
                {/* Matched Fighters */}
                {searchResults.matchedFighters.length > 0 && (
                  <View style={styles.resultSection}>
                    <View style={styles.resultSecHeader}>
                      <Users size={14} color={THEME.colors.primary} />
                      <Text style={styles.resultSecTitle}>VÕ SĨ ({searchResults.matchedFighters.length})</Text>
                    </View>
                    {searchResults.matchedFighters.map(f => (
                      <TouchableOpacity 
                        key={f.id} 
                        style={styles.fighterResultRow}
                        onPress={() => {
                          onClose()
                          onSelectFighter?.(f)
                        }}
                        activeOpacity={0.7}
                      >
                        <Image 
                          source={{ uri: f.avatar || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=200' }} 
                          style={styles.resultAvatar} 
                        />
                        <View style={styles.resultInfo}>
                          <View style={styles.nameRow}>
                            <Text style={styles.resultName}>{f.name}</Text>
                            {f.isChampion && (
                              <View style={styles.champBadge}>
                                <Text style={styles.champBadgeText}>👑 ĐKVĐ</Text>
                              </View>
                            )}
                          </View>
                          {f.nickname ? (
                            <Text style={styles.resultNick}>"{f.nickname}"</Text>
                          ) : null}
                          <Text style={styles.resultSub}>
                            {f.record.wins}W - {f.record.losses}L • {Math.round(f.eloRating)} ELO
                          </Text>
                        </View>
                        <ChevronRight size={16} color={THEME.colors.textDim} />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {/* Matched Gyms */}
                {searchResults.matchedGyms.length > 0 && (
                  <View style={styles.resultSection}>
                    <View style={styles.resultSecHeader}>
                      <Building2 size={14} color={THEME.colors.gold} />
                      <Text style={styles.resultSecTitle}>CÂU LẠC BỘ &amp; LÒ VÕ ({searchResults.matchedGyms.length})</Text>
                    </View>
                    {searchResults.matchedGyms.map(g => (
                      <View key={g.id} style={styles.gymResultRow}>
                        <Image 
                          source={{ uri: g.coverImage || g.image || 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=200' }} 
                          style={styles.resultGymImage} 
                        />
                        <View style={styles.resultInfo}>
                          <Text style={styles.resultName}>{g.name}</Text>
                          <Text style={styles.resultSub}>{g.city} • HLV: {g.headCoach || 'Chuyên gia'}</Text>
                          <Text style={styles.resultMeta}>
                            {g.disciplines.slice(0, 3).join(', ')} • {g.notableFighterIds?.length || 0} võ sĩ
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}

                {/* Matched Promotions */}
                {searchResults.matchedPromotions.length > 0 && (
                  <View style={styles.resultSection}>
                    <View style={styles.resultSecHeader}>
                      <Swords size={14} color={THEME.colors.emerald} />
                      <Text style={styles.resultSecTitle}>GIẢI ĐẤU ({searchResults.matchedPromotions.length})</Text>
                    </View>
                    {searchResults.matchedPromotions.map(p => (
                      <View key={p.id} style={styles.promoResultRow}>
                        <View style={styles.promoIconSquare}>
                          <Text style={styles.promoIconText}>{p.shortName}</Text>
                        </View>
                        <View style={styles.resultInfo}>
                          <Text style={styles.resultName}>{p.name}</Text>
                          <Text style={styles.resultSub} numberOfLines={1}>{p.tagline || p.description}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </>
            )}
            <View style={{ height: 40 }} />
          </ScrollView>
        )}
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
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.sm,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#141d33',
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
  },
  clearBtn: {
    padding: 4,
  },
  closeBtn: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  closeText: {
    color: THEME.colors.primaryLight,
    fontWeight: '700',
    fontSize: 14,
  },
  contentScroll: {
    flex: 1,
  },
  section: {
    padding: THEME.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.textDim,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  trendTag: {
    backgroundColor: '#141d33',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  trendTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textWhite,
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  catCard: {
    width: '48%',
    backgroundColor: '#141d33',
    padding: 12,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    gap: 4,
  },
  catCardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.textWhite,
    marginTop: 4,
  },
  catCardSub: {
    fontSize: 10,
    color: THEME.colors.textDim,
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  noResultsIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  noResultsText: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME.colors.textWhite,
    textAlign: 'center',
    marginBottom: 6,
  },
  noResultsSub: {
    fontSize: 12,
    color: THEME.colors.textDim,
    textAlign: 'center',
  },
  resultSection: {
    paddingHorizontal: THEME.spacing.lg,
    paddingTop: THEME.spacing.md,
  },
  resultSecHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  resultSecTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.textDim,
    letterSpacing: 0.5,
  },
  fighterResultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141d33',
    padding: 10,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 8,
    gap: 10,
  },
  resultAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#090d16',
  },
  resultInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  resultName: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.textWhite,
  },
  champBadge: {
    backgroundColor: THEME.colors.gold,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  champBadgeText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#000000',
  },
  resultNick: {
    fontSize: 10,
    fontStyle: 'italic',
    color: THEME.colors.goldLight,
  },
  resultSub: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
  resultMeta: {
    fontSize: 9,
    color: THEME.colors.textDim,
    marginTop: 2,
  },
  gymResultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141d33',
    padding: 10,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 8,
    gap: 10,
  },
  resultGymImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#090d16',
  },
  promoResultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141d33',
    padding: 10,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 8,
    gap: 10,
  },
  promoIconSquare: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoIconText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#ffffff',
  }
})
