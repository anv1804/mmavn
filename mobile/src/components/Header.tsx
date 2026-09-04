import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { THEME } from '../constants/theme'
import { Bell, Search } from 'lucide-react-native'

interface HeaderProps {
  title?: string
  subtitle?: string
  onSearchPress?: () => void
}

export function Header({ title, subtitle, onSearchPress }: HeaderProps) {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 12) + 4 }]}>
      <View style={styles.left}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoIcon}>🥊</Text>
        </View>
        <View>
          <View style={styles.titleRow}>
            <Text style={styles.brandText}>MMA</Text>
            <Text style={styles.brandRed}>VN</Text>
            <View style={styles.hubBadge}>
              <Text style={styles.hubText}>HUB</Text>
            </View>
          </View>
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle || 'Sàn Đấu Tri Thức Võ Thuật'}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        {onSearchPress && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onSearchPress} 
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Search size={18} color={THEME.colors.textWhite} />
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={styles.iconButton} 
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Bell size={18} color={THEME.colors.textWhite} />
          <View style={styles.dot} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#090d16',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#e11d48',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 19,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  brandRed: {
    fontSize: 19,
    fontWeight: '900',
    color: '#e11d48',
    letterSpacing: -0.5,
  },
  hubBadge: {
    backgroundColor: 'rgba(225, 29, 72, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: 'rgba(225, 29, 72, 0.3)',
  },
  hubText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#fb7185',
  },
  subtitle: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#141d33',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#e11d48',
  }
})
