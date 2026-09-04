import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Switch, 
  Alert 
} from 'react-native'
import { THEME } from '../constants/theme'
import { Header } from '../components/Header'
import { 
  User, 
  ShieldCheck, 
  Heart, 
  Trophy, 
  Ticket, 
  Bell, 
  Moon, 
  Tv, 
  Trash2, 
  Info, 
  ChevronRight, 
  ExternalLink,
  Flame,
  Award
} from 'lucide-react-native'

export function ProfileScreen() {
  const [notifyMatches, setNotifyMatches] = useState(true)
  const [notifyBreaking, setNotifyBreaking] = useState(true)
  const [amoledMode, setAmoledMode] = useState(false)
  const [cacheCleared, setCacheCleared] = useState(false)

  const handleClearCache = () => {
    setCacheCleared(true)
    Alert.alert('Bộ Nhớ Đệm', 'Đã xóa 42.8 MB bộ nhớ đệm hình ảnh và dữ liệu offline thành công!')
    setTimeout(() => setCacheCleared(false), 3000)
  }

  return (
    <View style={styles.container}>
      <Header title="Tài Khoản &amp; Tôi" subtitle="Hồ sơ võ sinh &amp; cài đặt hệ thống" />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* User Hero Card */}
        <View style={styles.userHeroCard}>
          <View style={styles.userAvatarWrapper}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' }} 
              style={styles.userAvatar} 
            />
            <View style={styles.onlineBadge} />
          </View>

          <View style={styles.userInfo}>
            <View style={styles.userNameRow}>
              <Text style={styles.userName}>Võ Sinh MMAVN</Text>
              <View style={styles.vipBadge}>
                <Award size={11} color="#000000" />
                <Text style={styles.vipText}>KIM CƯƠNG</Text>
              </View>
            </View>
            <Text style={styles.userRole}>Thành viên đam mê võ thuật tổng hợp</Text>
            <Text style={styles.userMeta}>Mã định danh: #VN-88392 • Cấp độ: Lv.8</Text>
          </View>
        </View>

        {/* User KPI Stats Bar */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValGold}>78%</Text>
            <Text style={styles.statLabel}>DỰ ĐOÁN ĐÚNG</Text>
            <Text style={styles.statSub}>18/23 trận</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValEmerald}>12</Text>
            <Text style={styles.statLabel}>VÕ SĨ QUAN TÂM</Text>
            <Text style={styles.statSub}>Đang theo dõi</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValBlue}>4</Text>
            <Text style={styles.statLabel}>VÉ SỰ KIỆN</Text>
            <Text style={styles.statSub}>Đã lưu &amp; tham gia</Text>
          </View>
        </View>

        {/* Shortcuts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HOẠT ĐỘNG CÁ NHÂN</Text>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={[styles.menuIconBg, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
              <Heart size={18} color={THEME.colors.primary} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Võ Sĩ Tôi Yêu Thích</Text>
              <Text style={styles.menuSub}>Nghiêm Văn Ý, Lê Hoàng Đức, Đỗ Huy Hoàng...</Text>
            </View>
            <ChevronRight size={16} color={THEME.colors.textDim} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={[styles.menuIconBg, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
              <Trophy size={18} color={THEME.colors.gold} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Lịch Sử Dự Đoán Tỷ Số</Text>
              <Text style={styles.menuSub}>Xếp hạng #42 toàn quốc giải đấu mùa 2026</Text>
            </View>
            <ChevronRight size={16} color={THEME.colors.textDim} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={[styles.menuIconBg, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
              <Ticket size={18} color={THEME.colors.emerald} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Vé Xem &amp; Sự Kiện Đã Đặt</Text>
              <Text style={styles.menuSub}>LION Championship 35 • NTĐ Xuân Đỉnh</Text>
            </View>
            <ChevronRight size={16} color={THEME.colors.textDim} />
          </TouchableOpacity>
        </View>

        {/* Settings Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TRUNG TÂM CÀI ĐẶT HỆ THỐNG</Text>

          {/* Toggle 1: Match notifications */}
          <View style={styles.settingRow}>
            <View style={styles.settingIconBg}>
              <Bell size={18} color={THEME.colors.primaryLight} />
            </View>
            <View style={styles.settingTextWrap}>
              <Text style={styles.settingTitle}>Nhắc nhở trước trận đấu 15 phút</Text>
              <Text style={styles.settingSub}>Thông báo khi võ sĩ yêu thích bước vào lồng bát giác</Text>
            </View>
            <Switch
              value={notifyMatches}
              onValueChange={setNotifyMatches}
              trackColor={{ false: '#1e293b', true: THEME.colors.primary }}
              thumbColor="#ffffff"
            />
          </View>

          {/* Toggle 2: Breaking news */}
          <View style={styles.settingRow}>
            <View style={styles.settingIconBg}>
              <Flame size={18} color={THEME.colors.gold} />
            </View>
            <View style={styles.settingTextWrap}>
              <Text style={styles.settingTitle}>Tin nóng &amp; Kết quả trực tiếp</Text>
              <Text style={styles.settingSub}>Nhận thông báo Knock-out và kết quả tranh đai</Text>
            </View>
            <Switch
              value={notifyBreaking}
              onValueChange={setNotifyBreaking}
              trackColor={{ false: '#1e293b', true: THEME.colors.primary }}
              thumbColor="#ffffff"
            />
          </View>

          {/* Toggle 3: Theme */}
          <View style={styles.settingRow}>
            <View style={styles.settingIconBg}>
              <Moon size={18} color="#8b5cf6" />
            </View>
            <View style={styles.settingTextWrap}>
              <Text style={styles.settingTitle}>Chế độ siêu tối (True AMOLED)</Text>
              <Text style={styles.settingSub}>Nền đen sâu 100% tiết kiệm pin tối đa</Text>
            </View>
            <Switch
              value={amoledMode}
              onValueChange={setAmoledMode}
              trackColor={{ false: '#1e293b', true: '#8b5cf6' }}
              thumbColor="#ffffff"
            />
          </View>

          {/* Video Stream Quality */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.settingIconBg}>
              <Tv size={18} color="#06b6d4" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Chất lượng video phát lại</Text>
              <Text style={styles.menuSub}>Tự động thích ứng đường truyền (Auto 1080p)</Text>
            </View>
            <ChevronRight size={16} color={THEME.colors.textDim} />
          </TouchableOpacity>

          {/* Clear Cache */}
          <TouchableOpacity style={styles.menuItem} onPress={handleClearCache} activeOpacity={0.7}>
            <View style={[styles.settingIconBg, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
              <Trash2 size={18} color={THEME.colors.primary} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Xóa bộ nhớ đệm (Clear Cache)</Text>
              <Text style={styles.menuSub}>
                {cacheCleared ? '✓ Đã xóa sạch dữ liệu đệm!' : 'Giải phóng dung lượng ảnh & dữ liệu cũ'}
              </Text>
            </View>
            <ChevronRight size={16} color={THEME.colors.textDim} />
          </TouchableOpacity>
        </View>

        {/* App Info Footer */}
        <View style={styles.appInfoSection}>
          <View style={styles.infoRow}>
            <ShieldCheck size={16} color={THEME.colors.emerald} />
            <Text style={styles.infoText}>Bản quyền dữ liệu © 2026 MMAVN Hub</Text>
          </View>
          <Text style={styles.versionText}>Phiên bản Mobile v2.0.26 (Build 2026.09-PRO)</Text>
          <Text style={styles.subText}>Đồng hành cùng Liên đoàn Võ thuật Tổng hợp Việt Nam (VMMAF)</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  scroll: {
    flex: 1,
  },
  userHeroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: THEME.spacing.lg,
    backgroundColor: '#0e1526',
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
    gap: 14,
  },
  userAvatarWrapper: {
    position: 'relative',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: THEME.colors.gold,
  },
  userAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: THEME.colors.emerald,
    borderWidth: 2,
    borderColor: '#0e1526',
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    fontSize: 17,
    fontWeight: '900',
    color: THEME.colors.textWhite,
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: THEME.colors.gold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  vipText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: 0.5,
  },
  userRole: {
    fontSize: 11,
    color: THEME.colors.goldLight,
    marginTop: 2,
  },
  userMeta: {
    fontSize: 10,
    color: THEME.colors.textDim,
    marginTop: 3,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#131b2e',
    marginHorizontal: THEME.spacing.lg,
    marginTop: THEME.spacing.md,
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValGold: {
    fontSize: 18,
    fontWeight: '900',
    color: THEME.colors.goldLight,
    fontFamily: 'monospace',
  },
  statValEmerald: {
    fontSize: 18,
    fontWeight: '900',
    color: THEME.colors.emerald,
    fontFamily: 'monospace',
  },
  statValBlue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#38bdf8',
    fontFamily: 'monospace',
  },
  statLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: THEME.colors.textDim,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  statSub: {
    fontSize: 9,
    color: THEME.colors.textMuted,
    marginTop: 1,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.08)',
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.borderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 8,
    gap: 12,
  },
  menuIconBg: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextWrap: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.textWhite,
  },
  menuSub: {
    fontSize: 10,
    color: THEME.colors.textDim,
    marginTop: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.borderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 8,
    gap: 12,
  },
  settingIconBg: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTextWrap: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textWhite,
  },
  settingSub: {
    fontSize: 10,
    color: THEME.colors.textDim,
    marginTop: 2,
  },
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    gap: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.textMuted,
  },
  versionText: {
    fontSize: 10,
    color: THEME.colors.textDim,
    fontFamily: 'monospace',
  },
  subText: {
    fontSize: 9,
    color: THEME.colors.textDim,
    textAlign: 'center',
  }
})
