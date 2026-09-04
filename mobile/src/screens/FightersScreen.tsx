import React, { useState, useMemo } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { Header } from '../components/Header'
import { FighterCard } from '../components/FighterCard'
import { FighterDetailModal } from './FighterDetailModal'
import { SearchModal } from '../components/SearchModal'
import { fighters, divisions, gyms, Fighter } from '../data/mobile-data'
import { Search, X } from 'lucide-react-native'

export function FightersScreen() {
  const [search, setSearch] = useState('')
  const [selectedDivision, setSelectedDivision] = useState<string>('all')
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null)
  const [searchVisible, setSearchVisible] = useState(false)

  const filteredFighters = useMemo(() => {
    return fighters.filter(f => {
      const matchSearch = !search || 
        f.name.toLowerCase().includes(search.toLowerCase()) || 
        (f.nickname && f.nickname.toLowerCase().includes(search.toLowerCase())) ||
        (f.styles && f.styles.some(s => s.toLowerCase().includes(search.toLowerCase())))
      
      const matchDivision = selectedDivision === 'all' || f.divisionId === selectedDivision

      return matchSearch && matchDivision
    })
  }, [search, selectedDivision])

  return (
    <View style={styles.container}>
      <Header 
        title="Võ Sĩ MMA" 
        subtitle={`${fighters.length} đấu sĩ chuyên nghiệp 2026`}
        onSearchPress={() => setSearchVisible(true)}
      />

      {/* Quick Search Bar inside screen */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={15} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm tên võ sĩ, biệt danh, phong cách..."
            placeholderTextColor="#64748b"
            value={search}
            onChangeText={setSearch}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <X size={15} color="#94a3b8" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Horizontal Division Filters */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          <TouchableOpacity
            style={[styles.filterPill, selectedDivision === 'all' && styles.filterPillActive]}
            onPress={() => setSelectedDivision('all')}
            activeOpacity={0.7}
          >
            <Text style={[styles.filterText, selectedDivision === 'all' && styles.filterTextActive]}>
              Tất cả ({fighters.length})
            </Text>
          </TouchableOpacity>

          {divisions.map(d => {
            const count = fighters.filter(f => f.divisionId === d.id).length
            const isSelected = selectedDivision === d.id
            const label = `${d.weightLimit}kg ${d.gender === 'female' ? 'Nữ' : 'Nam'}`
            return (
              <TouchableOpacity
                key={d.id}
                style={[styles.filterPill, isSelected && styles.filterPillActive]}
                onPress={() => setSelectedDivision(d.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterText, isSelected && styles.filterTextActive]}>
                  {label} ({count})
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>

      {/* Fighter Card List */}
      <FlatList
        data={filteredFighters}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const gym = gyms.find(g => g.id === item.gymId)
          const div = divisions.find(d => d.id === item.divisionId)
          return (
            <FighterCard
              fighter={item}
              gymName={gym?.name}
              divisionName={div?.nameVi}
              onPress={() => setSelectedFighter(item)}
            />
          )
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🥊</Text>
            <Text style={styles.emptyText}>Không tìm thấy võ sĩ phù hợp</Text>
            <TouchableOpacity style={styles.resetBtn} onPress={() => { setSearch(''); setSelectedDivision('all') }}>
              <Text style={styles.resetText}>Đặt lại bộ lọc</Text>
            </TouchableOpacity>
          </View>
        }
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 12,
  },
  filterBar: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  filterPillActive: {
    backgroundColor: 'rgba(225, 29, 72, 0.2)',
    borderColor: '#e11d48',
  },
  filterText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
  },
  filterTextActive: {
    color: '#fb7185',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 12,
  },
  resetBtn: {
    backgroundColor: '#e11d48',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
  }
})
