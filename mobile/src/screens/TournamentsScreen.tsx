import React, { useState, useMemo } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { THEME } from '../constants/theme'
import { Header } from '../components/Header'
import { PromotionCard } from '../components/PromotionCard'
import { GymCard } from '../components/GymCard'
import { SearchModal } from '../components/SearchModal'
import { FighterDetailModal } from './FighterDetailModal'
import { GymDetailModal } from './GymDetailModal'
import { PromotionDetailModal } from './PromotionDetailModal'
import { promotions, gyms, Fighter, Gym, Promotion } from '../data/mobile-data'
import { Swords, Scale, Building2 } from 'lucide-react-native'

export function TournamentsScreen({ navigation }: { navigation?: any }) {
  const [activeTab, setActiveTab] = useState<'promotions' | 'gyms' | 'rules'>('promotions')
  const [selectedCity, setSelectedCity] = useState('all')
  const [searchVisible, setSearchVisible] = useState(false)
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null)
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null)
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)

  const cities = useMemo(() => {
    const list = Array.from(new Set(gyms.map(g => g.city)))
    return ['all', ...list]
  }, [])

  const filteredGyms = useMemo(() => {
    return selectedCity === 'all' ? gyms : gyms.filter(g => g.city === selectedCity)
  }, [selectedCity])

  return (
    <View style={styles.container}>
      <Header 
        title="Giải Đấu &amp; Lò Võ" 
        subtitle="3 Tổ chức MMA &amp; 25 CLB toàn quốc"
        onSearchPress={() => setSearchVisible(true)}
      />

      {/* 3 Navigation Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'promotions' && styles.tabItemActive]}
          onPress={() => setActiveTab('promotions')}
          activeOpacity={0.7}
        >
          <Swords size={13} color={activeTab === 'promotions' ? '#ffffff' : '#94a3b8'} />
          <Text style={[styles.tabText, activeTab === 'promotions' && styles.tabTextActive]}>
            Giải Đấu ({promotions.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'gyms' && styles.tabItemActive]}
          onPress={() => setActiveTab('gyms')}
          activeOpacity={0.7}
        >
          <Building2 size={13} color={activeTab === 'gyms' ? '#ffffff' : '#94a3b8'} />
          <Text style={[styles.tabText, activeTab === 'gyms' && styles.tabTextActive]}>
            25 CLB / Lò Võ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'rules' && styles.tabItemActive]}
          onPress={() => setActiveTab('rules')}
          activeOpacity={0.7}
        >
          <Scale size={13} color={activeTab === 'rules' ? '#ffffff' : '#94a3b8'} />
          <Text style={[styles.tabText, activeTab === 'rules' && styles.tabTextActive]}>
            Luật Thi Đấu
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* TAB 1: PROMOTIONS */}
        {activeTab === 'promotions' && (
          <View style={styles.contentWrap}>
            {promotions.map(promo => (
              <PromotionCard 
                key={promo.id} 
                promotion={promo} 
                onPress={() => setSelectedPromotion(promo)} 
              />
            ))}

            {/* National Arenas Box */}
            <View style={styles.arenasBox}>
              <View style={styles.arenaHeader}>
                <Building2 size={16} color="#e11d48" />
                <Text style={styles.arenaTitle}>4 Đấu Trường Tiêu Biểu Toàn Quốc</Text>
              </View>

              {[
                { name: 'NTĐ Tây Hồ', city: 'Hà Nội', cap: '5.000 chỗ', use: 'Đại bản doanh LION phía Bắc' },
                { name: 'NTĐ Rạch Miễu', city: 'TP.HCM', cap: '4.500 chỗ', use: 'Sân nhà LION miền Nam & GMA' },
                { name: 'The Grand Ho Tram Strip', city: 'Vũng Tàu', cap: '3.000 chỗ', use: 'Sàn đấu sự kiện quốc tế AFC' },
                { name: 'Cung TTHN Quần Ngựa', city: 'Hà Nội', cap: '8.000 chỗ', use: 'Đêm chung kết tranh đai lớn nhất' },
              ].map((a, i) => (
                <View key={i} style={styles.arenaRow}>
                  <View style={styles.arenaInfo}>
                    <Text style={styles.arenaName}>{a.name} <Text style={styles.arenaCity}>({a.city})</Text></Text>
                    <Text style={styles.arenaUse}>{a.use}</Text>
                  </View>
                  <Text style={styles.arenaCap}>{a.cap}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* TAB 2: 25 GYMS DIRECTORY */}
        {activeTab === 'gyms' && (
          <View style={styles.contentWrap}>
            {/* City Filter Pills */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cityPillScroll}>
              {cities.map(c => {
                const isSelected = selectedCity === c
                const label = c === 'all' ? `Tất cả (${gyms.length})` : c
                return (
                  <TouchableOpacity
                    key={c}
                    style={[styles.cityPill, isSelected && styles.cityPillActive]}
                    onPress={() => setSelectedCity(c)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.cityText, isSelected && styles.cityTextActive]}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>

            {/* Gym List */}
            {filteredGyms.map(gym => (
              <GymCard 
                key={gym.id} 
                gym={gym} 
                onPress={() => setSelectedGym(gym)} 
              />
            ))}
          </View>
        )}

        {/* TAB 3: RULES COMPARISON */}
        {activeTab === 'rules' && (
          <View style={styles.contentWrap}>
            <Text style={styles.rulesTitle}>BẢNG ĐỐI CHIẾU QUY CHUẨN KỸ THUẬT</Text>

            {[
              { aspect: 'Sàn đấu', lion: 'Lồng Bát Giác Octagon 9m', gma: 'Đài Lục Giác Hexagon 7m', v1: 'Võ đài Ring dây chuẩn' },
              { aspect: 'Thời gian', lion: '3 hiệp x 5 phút (Title: 5x5)', gma: '3 hiệp x 3 phút', v1: '3 hiệp x 3 phút' },
              { aspect: 'Đòn Chỏ', lion: 'Cho phép toàn diện (áp dụng 2026)', gma: 'Hạn chế khi địa chiến', v1: 'Cấm đòn chỏ vùng đầu' },
              { aspect: 'Đòn Gối', lion: 'Được gối khi ôm ghì (Clinch)', gma: 'Cho phép gối thân người', v1: 'Cho phép gối có kiểm soát' },
              { aspect: 'Địa Chiến', lion: 'Ground & Pound toàn diện', gma: 'Trọng tài tách sau 10s thụ động', v1: 'Trọng tài tách nhanh' },
              { aspect: 'Cân Ký', lion: 'Cân trước sự kiện 24 giờ', gma: 'Cân kiểm tra cùng ngày đấu', v1: 'Cân trước thi đấu 24 giờ' },
            ].map((r, i) => (
              <View key={i} style={styles.ruleCard}>
                <Text style={styles.ruleAspect}>{r.aspect}</Text>
                <View style={styles.ruleDetailRow}>
                  <Text style={styles.ruleDotRed}>• LION:</Text>
                  <Text style={styles.ruleText}>{r.lion}</Text>
                </View>
                <View style={styles.ruleDetailRow}>
                  <Text style={styles.ruleDotGreen}>• GMA:</Text>
                  <Text style={styles.ruleText}>{r.gma}</Text>
                </View>
                <View style={styles.ruleDetailRow}>
                  <Text style={styles.ruleDotYellow}>• V1:</Text>
                  <Text style={styles.ruleText}>{r.v1}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Promotion Detail Modal */}
      <PromotionDetailModal
        promotion={selectedPromotion}
        visible={!!selectedPromotion}
        onClose={() => setSelectedPromotion(null)}
        onSelectFighter={f => setSelectedFighter(f)}
      />

      {/* Gym Detail Modal */}
      <GymDetailModal
        gym={selectedGym}
        visible={!!selectedGym}
        onClose={() => setSelectedGym(null)}
        onSelectFighter={f => setSelectedFighter(f)}
      />

      {/* Fighter Detail Modal */}
      <FighterDetailModal
        fighter={selectedFighter}
        visible={!!selectedFighter}
        onClose={() => setSelectedFighter(null)}
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
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  tabItemActive: {
    backgroundColor: '#e11d48',
    borderColor: '#e11d48',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  scroll: {
    flex: 1,
  },
  contentWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  cityPillScroll: {
    marginBottom: 12,
    marginLeft: -16,
    paddingLeft: 16,
  },
  cityPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginRight: 8,
  },
  cityPillActive: {
    backgroundColor: 'rgba(225, 29, 72, 0.2)',
    borderColor: '#e11d48',
  },
  cityText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
  },
  cityTextActive: {
    color: '#fb7185',
  },
  arenasBox: {
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginTop: 8,
    marginBottom: 20,
  },
  arenaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  arenaTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  arenaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  arenaInfo: {
    flex: 1,
  },
  arenaName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  arenaCity: {
    color: '#fb7185',
  },
  arenaUse: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 2,
  },
  arenaCap: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#fbbf24',
    marginLeft: 8,
  },
  rulesTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  ruleCard: {
    backgroundColor: '#111827',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 10,
  },
  ruleAspect: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },
  ruleDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 2,
  },
  ruleDotRed: {
    fontSize: 11,
    fontWeight: '800',
    color: '#e11d48',
    width: 55,
  },
  ruleDotGreen: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10b981',
    width: 55,
  },
  ruleDotYellow: {
    fontSize: 11,
    fontWeight: '800',
    color: '#f59e0b',
    width: 55,
  },
  ruleText: {
    fontSize: 11,
    color: '#94a3b8',
    flex: 1,
  }
})
