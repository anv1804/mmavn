import React, { useState, useMemo } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { THEME } from '../constants/theme'
import { Header } from '../components/Header'
import { GymCard } from '../components/GymCard'
import { gyms, Gym } from '../data/mobile-data'
import { Search, X, MapPin } from 'lucide-react-native'

export function GymsScreen() {
  const [search, setSearch] = useState('')
  const [selectedCity, setSelectedCity] = useState('all')

  const cities = useMemo(() => {
    const list = Array.from(new Set(gyms.map(g => g.city)))
    return ['all', ...list]
  }, [])

  const filteredGyms = useMemo(() => {
    return gyms.filter(g => {
      const matchSearch = !search || 
        g.name.toLowerCase().includes(search.toLowerCase()) || 
        (g.address && g.address.toLowerCase().includes(search.toLowerCase())) ||
        (g.headCoach && g.headCoach.toLowerCase().includes(search.toLowerCase()))
      
      const matchCity = selectedCity === 'all' || g.city === selectedCity

      return matchSearch && matchCity
    })
  }, [search, selectedCity])

  return (
    <View style={styles.container}>
      <Header title="Phòng Tập &amp; CLB" subtitle={`${gyms.length} lò đào tạo toàn quốc`} />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={16} color={THEME.colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm tên CLB, địa chỉ, HLV..."
            placeholderTextColor={THEME.colors.textDim}
            value={search}
            onChangeText={setSearch}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <X size={16} color={THEME.colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* City Filter Pills */}
      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {cities.map(c => {
            const isSelected = selectedCity === c
            const label = c === 'all' ? `Tất cả (${gyms.length})` : c
            return (
              <TouchableOpacity
                key={c}
                style={[styles.cityPill, isSelected && styles.cityPillActive]}
                onPress={() => setSelectedCity(c)}
              >
                <Text style={[styles.cityText, isSelected && styles.cityTextActive]}>
                  {label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>

      {/* List */}
      <FlatList
        data={filteredGyms}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <GymCard gym={item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🏛️</Text>
            <Text style={styles.emptyText}>Không tìm thấy câu lạc bộ phù hợp</Text>
            <TouchableOpacity style={styles.resetBtn} onPress={() => { setSearch(''); setSelectedCity('all') }}>
              <Text style={styles.resetText}>Xem tất cả 25 CLB</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  searchContainer: {
    paddingHorizontal: THEME.spacing.lg,
    paddingTop: THEME.spacing.md,
    paddingBottom: THEME.spacing.sm,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  searchInput: {
    flex: 1,
    color: THEME.colors.textWhite,
    fontSize: 13,
  },
  filterWrapper: {
    paddingBottom: THEME.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  filterScroll: {
    paddingHorizontal: THEME.spacing.lg,
  },
  cityPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: THEME.colors.card,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginRight: 8,
  },
  cityPillActive: {
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.primary,
  },
  cityText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.textMuted,
  },
  cityTextActive: {
    color: '#ffffff',
  },
  listContent: {
    padding: THEME.spacing.lg,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: THEME.colors.textMuted,
    fontWeight: '600',
    marginBottom: 12,
  },
  resetBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: THEME.colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  resetText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primary,
  }
})
