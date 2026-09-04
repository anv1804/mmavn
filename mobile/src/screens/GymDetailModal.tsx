import React from 'react'
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, Image, Linking } from 'react-native'
import { X, MapPin, Phone, Mail, Globe, Star, Users, Dumbbell, ChevronRight } from 'lucide-react-native'
import { Gym, Fighter, fighters } from '../data/mobile-data'

interface GymDetailModalProps {
  gym: Gym | null
  visible: boolean
  onClose: () => void
  onSelectFighter?: (fighter: Fighter) => void
}

export function GymDetailModal({ gym, visible, onClose, onSelectFighter }: GymDetailModalProps) {
  if (!gym) return null

  const notableFighters = fighters.filter(f => f.gymId === gym.id)

  const handleCall = () => {
    if (gym.phone) Linking.openURL(`tel:${gym.phone.replace(/\s+/g, '')}`)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header Bar */}
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle} numberOfLines={1}>{gym.name}</Text>
          <TouchableOpacity 
            onPress={onClose} 
            style={styles.closeBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Cover & Rating */}
          <View style={styles.coverWrapper}>
            <Image 
              source={{ uri: gym.coverImage || gym.image || 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800' }} 
              style={styles.coverImg} 
            />
            <View style={styles.ratingBadge}>
              <Star size={12} color="#f59e0b" fill="#f59e0b" />
              <Text style={styles.ratingText}>{gym.rating || 5.0}</Text>
            </View>
          </View>

          <View style={styles.body}>
            <Text style={styles.gymName}>{gym.name}</Text>
            <Text style={styles.cityText}>📍 {gym.city} • Thành lập {gym.foundedYear || 2020}</Text>

            {/* Address Box */}
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <MapPin size={16} color="#e11d48" />
                <Text style={styles.infoText}>{gym.address}</Text>
              </View>

              {gym.phone && (
                <TouchableOpacity style={styles.callRow} onPress={handleCall} activeOpacity={0.7}>
                  <Phone size={16} color="#10b981" />
                  <Text style={styles.callText}>Hotline: {gym.phone} (Chạm để gọi)</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Disciplines */}
            <Text style={styles.secTitle}>BỘ MÔN ĐÀO TẠO</Text>
            <View style={styles.disciplinesWrap}>
              {gym.disciplines.map((d, i) => (
                <View key={i} style={styles.disciplinePill}>
                  <Text style={styles.disciplineText}>{d}</Text>
                </View>
              ))}
            </View>

            {/* Head Coach */}
            <View style={styles.coachCard}>
              <Text style={styles.coachLabel}>BAN HUẤN LUYỆN &amp; HLV TRƯỞNG</Text>
              <Text style={styles.coachName}>{gym.headCoach || 'Đội ngũ Huấn Luyện Viên Quốc Tế'}</Text>
            </View>

            {/* Description */}
            <Text style={styles.secTitle}>GIỚI THIỆU PHÒNG TẬP</Text>
            <Text style={styles.descText}>{gym.description}</Text>

            {/* Notable Fighters */}
            <Text style={styles.secTitle}>VÕ SĨ BIÊN CHẾ ({notableFighters.length})</Text>
            {notableFighters.length > 0 ? (
              notableFighters.map(f => (
                <TouchableOpacity
                  key={f.id}
                  style={styles.fighterRow}
                  onPress={() => {
                    onClose()
                    onSelectFighter?.(f)
                  }}
                  activeOpacity={0.7}
                >
                  <Image 
                    source={{ uri: f.avatar || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=200' }} 
                    style={styles.fAvatar} 
                  />
                  <View style={styles.fInfo}>
                    <Text style={styles.fName}>{f.name}</Text>
                    <Text style={styles.fRecord}>{f.record.wins}W - {f.record.losses}L • {Math.round(f.eloRating)} ELO</Text>
                  </View>
                  <ChevronRight size={16} color="#64748b" />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyFighters}>Chưa có thông tin võ sĩ công khai</Text>
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
  coverWrapper: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  coverImg: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fbbf24',
  },
  body: {
    padding: 16,
  },
  gymName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
  },
  cityText: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    marginBottom: 14,
  },
  infoCard: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 10,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#e2e8f0',
    flex: 1,
    lineHeight: 18,
  },
  callRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: 8,
    borderRadius: 8,
  },
  callText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10b981',
  },
  secTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 0.5,
    marginTop: 10,
    marginBottom: 8,
  },
  disciplinesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  disciplinePill: {
    backgroundColor: 'rgba(225, 29, 72, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(225, 29, 72, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  disciplineText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fb7185',
  },
  coachCard: {
    backgroundColor: '#111827',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 14,
  },
  coachLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#f59e0b',
    letterSpacing: 0.5,
  },
  coachName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 4,
  },
  descText: {
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 20,
    marginBottom: 16,
  },
  fighterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    gap: 10,
  },
  fAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  fInfo: {
    flex: 1,
  },
  fName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  fRecord: {
    fontSize: 10,
    color: '#10b981',
    fontFamily: 'monospace',
    marginTop: 2,
  },
  emptyFighters: {
    fontSize: 12,
    color: '#64748b',
    fontStyle: 'italic',
  }
})
