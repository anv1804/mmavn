import { fighters, events, fights } from '@/data/mock-data';
import { getAllPostsCount, moderatePost } from '@/lib/services/forum-service';
import { getAllPredictions } from '@/lib/services/prediction-service';
import type {
  User,
  UserRole,
  AuditLog,
  SystemStats,
  AdminPermission,
  Fighter,
  MmaEvent,
  FightMethod,
  AdminNotification,
  ForumModerationItem,
} from '@/types';
import { ROLE_CONFIGS } from '@/types/admin';

// 1. MOCK USERS LIST WITH VARIED ROLES
// (Admin Admin, Editor Tuấn, Mod Minh, Võ sĩ Quang Lộc, Fan Dũng)
export const mockUsers: User[] = [
  {
    id: 'u-1',
    name: 'Admin Admin',
    email: 'admin@mmavn.vn',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    beltLevel: 'Đai Đen',
    status: 'active',
    createdAt: '2023-01-15T08:00:00.000Z',
    phone: '0901234567',
    lastActive: 'Vừa xong',
    postsCount: 42,
    reportsCount: 0,
  },
  {
    id: 'u-2',
    name: 'Editor Tuấn',
    email: 'tuan.editor@mmavn.vn',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'editor',
    beltLevel: 'Đai Nâu',
    status: 'active',
    createdAt: '2023-03-20T09:30:00.000Z',
    phone: '0912345678',
    lastActive: '15 phút trước',
    postsCount: 88,
    reportsCount: 0,
  },
  {
    id: 'u-3',
    name: 'Mod Minh',
    email: 'minh.mod@mmavn.vn',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'moderator',
    beltLevel: 'Đai Tím',
    status: 'active',
    createdAt: '2023-05-10T14:15:00.000Z',
    phone: '0987654321',
    lastActive: '30 phút trước',
    postsCount: 35,
    reportsCount: 0,
  },
  {
    id: 'u-4',
    name: 'Võ sĩ Quang Lộc',
    email: 'quangloc.mma@mmavn.vn',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    role: 'fighter',
    fighterId: 'f1',
    beltLevel: 'Đai Nâu',
    status: 'active',
    createdAt: '2023-06-01T10:00:00.000Z',
    phone: '0977112233',
    lastActive: '2 giờ trước',
    postsCount: 14,
    reportsCount: 0,
  },
  {
    id: 'u-5',
    name: 'Fan Dũng',
    email: 'dung.fan@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    role: 'user',
    beltLevel: 'Đai Trắng',
    status: 'active',
    createdAt: '2023-08-12T16:45:00.000Z',
    lastActive: '5 phút trước',
    postsCount: 6,
    reportsCount: 0,
  },
  {
    id: 'u-6',
    name: 'Tài khoản Vi phạm',
    email: 'spammer@tempmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    role: 'user',
    beltLevel: 'Đai Trắng',
    status: 'suspended',
    createdAt: '2023-11-05T11:20:00.000Z',
    lastActive: '7 ngày trước',
    postsCount: 1,
    reportsCount: 4,
  },
];

// Alias for compatibility
export const INITIAL_ADMIN_USERS = mockUsers;

// Active simulated user ID
let currentUserId = 'u-1';

// 2. AUDIT LOGS STATE
export const mockAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    action: 'CREATE_FIGHTER',
    entity: 'fighter',
    entityId: 'f1',
    performedBy: 'Admin Admin',
    details: 'Đã tạo hồ sơ võ sĩ Trần Quang Lộc (Hạng 70kg Nam)',
    timestamp: '2026-09-01T09:12:00.000Z',
    userId: 'u-1',
    userName: 'Admin Admin',
    category: 'fighter',
  },
  {
    id: 'log-2',
    action: 'UPDATE_FIGHT_RESULT',
    entity: 'fight',
    entityId: 'fight-lion-12-01',
    performedBy: 'Editor Tuấn',
    details: 'Cập nhật kết quả: Trần Quang Lộc thắng TKO hiệp 2 (3:45)',
    timestamp: '2026-09-02T15:30:00.000Z',
    userId: 'u-2',
    userName: 'Editor Tuấn',
    category: 'event',
  },
  {
    id: 'log-3',
    action: 'MODERATE_POST_PIN',
    entity: 'post',
    entityId: 'post-1',
    performedBy: 'Mod Minh',
    details: 'Ghim bài viết phân tích Guillotine Choke lên đầu diễn đàn',
    timestamp: '2026-09-02T18:40:00.000Z',
    userId: 'u-3',
    userName: 'Mod Minh',
    category: 'forum',
  },
  {
    id: 'log-4',
    action: 'USER_ROLE_CHANGE',
    entity: 'user',
    entityId: 'u-4',
    performedBy: 'Admin Admin',
    details: 'Nâng cấp quyền cho Võ sĩ Quang Lộc thành role fighter',
    timestamp: '2026-09-03T10:05:00.000Z',
    userId: 'u-1',
    userName: 'Admin Admin',
    category: 'user',
  },
  {
    id: 'log-5',
    action: 'SUSPEND_USER',
    entity: 'user',
    entityId: 'u-6',
    performedBy: 'Admin Admin',
    details: 'Tạm khóa tài khoản do vi phạm chính sách cộng đồng',
    timestamp: '2026-09-03T11:20:00.000Z',
    userId: 'u-1',
    userName: 'Admin Admin',
    category: 'user',
  },
];

export const INITIAL_AUDIT_LOGS = mockAuditLogs;

// Notifications & Forum items for compatibility
export const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'notif-1',
    title: 'Báo cáo vi phạm mới',
    message: 'Có 3 báo cáo người dùng cần xử lý trong bài viết Chợ đồ tập',
    type: 'warning',
    timestamp: '15 phút trước',
    read: false,
    link: '/admin?tab=forum',
  },
  {
    id: 'notif-2',
    title: 'Sự kiện sắp diễn ra',
    message: 'LION Championship 29 cần hoàn thiện thông tin cân ký & fight card',
    type: 'info',
    timestamp: '1 giờ trước',
    read: false,
    link: '/admin?tab=events',
  },
];

export const INITIAL_FORUM_MODERATION: ForumModerationItem[] = [
  {
    id: 'mod-post-1',
    title: 'Bán găng MMA Venum giá sốc 200k freeship toàn quốc qua Zalo',
    content: 'Thanh lý nhanh lô găng MMA giá hạt dẻ, liên hệ Zalo 0999xxxx...',
    authorName: 'Tài khoản Vi phạm',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    authorBelt: 'Đai Trắng',
    category: 'cho-do',
    reportsCount: 4,
    reportReasons: ['Dấu hiệu lừa đảo', 'Spam liên hệ ngoài'],
    createdAt: '2026-09-02T10:15:00Z',
    isPinned: false,
    isLocked: true,
    status: 'active',
    upvotes: 0,
    repliesCount: 3,
  },
];

/**
 * Add an audit log entry
 */
function recordAuditLog(entry: {
  action: string;
  entity: 'fighter' | 'event' | 'post' | 'user' | 'fight';
  entityId: string;
  performedBy: string;
  details: string;
}): AuditLog {
  const newLog: AuditLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    ...entry,
    userId: currentUserId,
    userName: entry.performedBy,
    category: entry.entity === 'post' ? 'forum' : entry.entity,
  };
  mockAuditLogs.unshift(newLog);
  return newLog;
}

/**
 * Get current active user
 */
export function getCurrentUser(): User {
  const user = mockUsers.find(u => u.id === currentUserId);
  return user || mockUsers[0];
}

/**
 * Set current user role (for client-side testing/switching)
 */
export function setCurrentUserRole(role: UserRole): User {
  const existingUserWithRole = mockUsers.find(u => u.role === role && u.status === 'active');
  if (existingUserWithRole) {
    currentUserId = existingUserWithRole.id;
    return { ...existingUserWithRole };
  }

  const user = getCurrentUser();
  user.role = role;
  return { ...user };
}

/**
 * Set active simulated user by ID
 */
export function setCurrentUser(userId: string): User {
  const user = mockUsers.find(u => u.id === userId);
  if (!user) {
    throw new Error(`Không tìm thấy người dùng: ${userId}`);
  }
  currentUserId = user.id;
  return { ...user };
}

/**
 * Get system statistics
 */
export function getSystemStats(): SystemStats {
  const allPredictions = getAllPredictions();
  const totalPredictionsCount = Object.keys(allPredictions).length;
  const totalPostsCount = getAllPostsCount();

  return {
    totalUsers: mockUsers.length,
    totalFighters: fighters.length,
    totalEvents: events.length,
    totalFights: fights.length,
    totalPosts: totalPostsCount,
    totalPredictions: totalPredictionsCount,
    activeTickets: 14,
    pendingReviews: 3,
  };
}

/**
 * Get all audit logs
 */
export function getAuditLogs(): AuditLog[] {
  return [...mockAuditLogs];
}

/**
 * Get all users
 */
export function getAllUsers(): User[] {
  return [...mockUsers];
}

/**
 * Update user role
 */
export function updateUserRole(userId: string, role: UserRole): User {
  const user = mockUsers.find(u => u.id === userId);
  if (!user) {
    throw new Error(`Không tìm thấy người dùng với ID: ${userId}`);
  }
  const oldRole = user.role;
  user.role = role;

  const performer = getCurrentUser();
  recordAuditLog({
    action: 'UPDATE_USER_ROLE',
    entity: 'user',
    entityId: userId,
    performedBy: performer.name,
    details: `Đổi vai trò người dùng ${user.name} từ [${oldRole}] sang [${role}]`,
  });

  return { ...user };
}

/**
 * Toggle user status ('active' <-> 'suspended')
 */
export function toggleUserStatus(userId: string): User {
  const user = mockUsers.find(u => u.id === userId);
  if (!user) {
    throw new Error(`Không tìm thấy người dùng với ID: ${userId}`);
  }
  const newStatus = user.status === 'active' ? 'suspended' : 'active';
  user.status = newStatus;

  const performer = getCurrentUser();
  recordAuditLog({
    action: newStatus === 'active' ? 'ACTIVATE_USER' : 'SUSPEND_USER',
    entity: 'user',
    entityId: userId,
    performedBy: performer.name,
    details: `${newStatus === 'active' ? 'Kích hoạt lại' : 'Tạm khóa'} tài khoản người dùng: ${user.name}`,
  });

  return { ...user };
}

/**
 * Save fighter (create or update)
 */
export function saveFighter(fighterData: Partial<Fighter>): Fighter {
  const performer = getCurrentUser();

  if (fighterData.id) {
    const index = fighters.findIndex(f => f.id === fighterData.id);
    if (index !== -1) {
      fighters[index] = {
        ...fighters[index],
        ...fighterData,
      };
      recordAuditLog({
        action: 'UPDATE_FIGHTER',
        entity: 'fighter',
        entityId: fighterData.id,
        performedBy: performer.name,
        details: `Cập nhật thông tin võ sĩ: ${fighters[index].name}`,
      });
      return fighters[index];
    }
  }

  // Create new fighter
  const newId = fighterData.id || `f-${Date.now()}`;
  const newFighter: Fighter = {
    id: newId,
    name: fighterData.name || 'Võ sĩ mới',
    nickname: fighterData.nickname || '',
    dateOfBirth: fighterData.dateOfBirth || '2000-01-01',
    nationality: fighterData.nationality || 'Việt Nam',
    height: fighterData.height || 170,
    reach: fighterData.reach || 170,
    divisionId: fighterData.divisionId || 'd-m-65',
    gymId: fighterData.gymId || 'gym-1',
    styles: fighterData.styles || ['MMA'],
    record: fighterData.record || {
      wins: 0,
      losses: 0,
      draws: 0,
      noContests: 0,
      winsByKo: 0,
      winsBySub: 0,
      winsByDec: 0,
    },
    eloRating: fighterData.eloRating || 1200,
    ranking: fighterData.ranking,
    isChampion: fighterData.isChampion || false,
    championshipTitle: fighterData.championshipTitle,
    stats: fighterData.stats || {
      strikingAccuracy: 50,
      strikingDefense: 50,
      takedownAccuracy: 50,
      takedownDefense: 50,
      finishRate: 50,
      striking: 3,
      wrestling: 3,
      clinch: 3,
      groundGame: 3,
      defense: 3,
      cardio: 3,
    },
    bio: fighterData.bio || '',
    ...fighterData,
  };

  fighters.unshift(newFighter);
  recordAuditLog({
    action: 'CREATE_FIGHTER',
    entity: 'fighter',
    entityId: newId,
    performedBy: performer.name,
    details: `Tạo mới hồ sơ võ sĩ: ${newFighter.name}`,
  });
  return newFighter;
}

/**
 * Delete fighter
 */
export function deleteFighter(fighterId: string): boolean {
  const index = fighters.findIndex(f => f.id === fighterId);
  if (index === -1) return false;

  const targetName = fighters[index].name;
  fighters.splice(index, 1);

  const performer = getCurrentUser();
  recordAuditLog({
    action: 'DELETE_FIGHTER',
    entity: 'fighter',
    entityId: fighterId,
    performedBy: performer.name,
    details: `Đã xóa hồ sơ võ sĩ: ${targetName} (ID: ${fighterId})`,
  });

  return true;
}

/**
 * Save MMA event (create or update)
 */
export function saveEvent(eventData: Partial<MmaEvent>): MmaEvent {
  const performer = getCurrentUser();

  if (eventData.id) {
    const index = events.findIndex(e => e.id === eventData.id);
    if (index !== -1) {
      events[index] = {
        ...events[index],
        ...eventData,
      };
      recordAuditLog({
        action: 'UPDATE_EVENT',
        entity: 'event',
        entityId: eventData.id,
        performedBy: performer.name,
        details: `Cập nhật thông tin sự kiện: ${events[index].name}`,
      });
      return events[index];
    }
  }

  const newId = eventData.id || `e-${Date.now()}`;
  const newEvent: MmaEvent = {
    id: newId,
    name: eventData.name || 'Sự kiện MMA mới',
    promotionId: eventData.promotionId || 'p1',
    date: eventData.date || new Date().toISOString().split('T')[0],
    venue: eventData.venue || 'Nhà thi đấu Quân khu 7',
    city: eventData.city || 'TP. Hồ Chí Minh',
    status: eventData.status || 'upcoming',
    ...eventData,
  };

  events.unshift(newEvent);
  recordAuditLog({
    action: 'CREATE_EVENT',
    entity: 'event',
    entityId: newId,
    performedBy: performer.name,
    details: `Tạo mới sự kiện: ${newEvent.name}`,
  });
  return newEvent;
}

/**
 * Update fight result
 */
export function updateFightResult(
  fightId: string,
  winnerId: string,
  method: string,
  round: number,
  time: string
): boolean {
  const fight = fights.find(f => f.id === fightId);
  if (!fight) return false;

  fight.result = {
    winnerId,
    method: method as FightMethod,
    round,
    time,
  };

  const performer = getCurrentUser();
  recordAuditLog({
    action: 'UPDATE_FIGHT_RESULT',
    entity: 'fight',
    entityId: fightId,
    performedBy: performer.name,
    details: `Cập nhật kết quả trận ${fightId}: Thắng bằng ${method} (Hiệp ${round}, ${time})`,
  });

  return true;
}

/**
 * Moderate forum post ('pin' | 'lock' | 'delete')
 */
export function moderateForumPost(postId: string, action: 'pin' | 'lock' | 'delete'): boolean {
  const success = moderatePost(postId, action);
  if (!success) return false;

  const performer = getCurrentUser();
  const actionText = {
    pin: 'Thay đổi ghim bài viết',
    lock: 'Thay đổi khóa bình luận bài viết',
    delete: 'Đã xóa bài viết',
  }[action];

  recordAuditLog({
    action: `MODERATE_POST_${action.toUpperCase()}`,
    entity: 'post',
    entityId: postId,
    performedBy: performer.name,
    details: `${actionText} (ID: ${postId})`,
  });

  return true;
}

/**
 * Check if a role has a given permission
 */
export function hasPermission(role: UserRole, permission: AdminPermission): boolean {
  return ROLE_CONFIGS[role]?.permissions.includes(permission) ?? false;
}

// Export bundled service object
export const adminService = {
  getCurrentUser,
  setCurrentUserRole,
  setCurrentUser,
  getSystemStats,
  getAuditLogs,
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  saveFighter,
  deleteFighter,
  saveEvent,
  updateFightResult,
  moderateForumPost,
  hasPermission,
};
