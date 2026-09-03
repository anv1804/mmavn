export type UserRole = 'admin' | 'editor' | 'moderator' | 'fighter' | 'user';
export type AdminRole = 'Admin' | 'Editor' | 'Moderator' | 'Fighter' | 'User';
export type UserStatus = 'active' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  beltLevel?: string;
  fighterId?: string;
  status: 'active' | 'suspended';
  createdAt: string;
  phone?: string;
  joinedDate?: string;
  lastActive?: string;
  postsCount?: number;
  reportsCount?: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: UserStatus;
  avatar: string;
  joinedDate: string;
  createdAt?: string;
  phone?: string;
  fighterId?: string;
  lastActive: string;
  postsCount?: number;
  reportsCount?: number;
}

export type AuditCategory = 'fighter' | 'event' | 'forum' | 'user' | 'system' | 'post' | 'fight';

export interface AuditLog {
  id: string;
  action: string;
  entity: 'fighter' | 'event' | 'post' | 'user' | 'fight';
  entityId: string;
  performedBy: string;
  details: string;
  timestamp: string;
  // Optional compatibility fields
  userId?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  category?: AuditCategory;
}

export interface SystemStats {
  totalUsers: number;
  totalFighters: number;
  totalEvents: number;
  totalFights: number;
  totalPosts: number;
  totalPredictions: number;
  activeTickets: number;
  pendingReviews: number;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface ForumModerationItem {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  authorBelt: string;
  category: 'ky-thuat' | 'soi-keo' | 'phong-tap' | 'cho-do';
  reportsCount: number;
  reportReasons: string[];
  createdAt: string;
  isPinned: boolean;
  isLocked: boolean;
  status: 'active' | 'hidden' | 'deleted';
  upvotes: number;
  repliesCount: number;
}

export type AdminPermission =
  | 'manage_users'
  | 'manage_roles'
  | 'create_fighter'
  | 'edit_fighter'
  | 'delete_fighter'
  | 'manage_events'
  | 'manage_fights'
  | 'moderate_forum'
  | 'view_audit_logs'
  | 'view_stats';

export interface RoleConfig {
  role: UserRole;
  nameVi: string;
  description: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  iconName: string;
  permissions: AdminPermission[];
}

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> & Record<string, RoleConfig> = {
  admin: {
    role: 'admin',
    nameVi: 'Quản trị viên',
    description: 'Toàn quyền quản lý hệ thống, phân quyền người dùng, chỉnh sửa toàn bộ dữ liệu và xem nhật ký kiểm toán.',
    badgeBg: 'bg-red-500/15',
    badgeBorder: 'border-red-500/30',
    badgeText: 'text-red-400',
    iconName: 'ShieldAlert',
    permissions: [
      'manage_users',
      'manage_roles',
      'create_fighter',
      'edit_fighter',
      'delete_fighter',
      'manage_events',
      'manage_fights',
      'moderate_forum',
      'view_audit_logs',
      'view_stats',
    ],
  },
  editor: {
    role: 'editor',
    nameVi: 'Biên tập viên',
    description: 'Quản lý và cập nhật hồ sơ võ sĩ, sự kiện thi đấu, kết quả trận đấu và biên tập nội dung.',
    badgeBg: 'bg-amber-500/15',
    badgeBorder: 'border-amber-500/30',
    badgeText: 'text-amber-400',
    iconName: 'Edit3',
    permissions: [
      'create_fighter',
      'edit_fighter',
      'manage_events',
      'manage_fights',
      'moderate_forum',
      'view_stats',
    ],
  },
  moderator: {
    role: 'moderator',
    nameVi: 'Kiểm duyệt viên',
    description: 'Kiểm duyệt bài viết, ghim/khóa/xóa thảo luận vi phạm trong diễn đàn cộng đồng.',
    badgeBg: 'bg-blue-500/15',
    badgeBorder: 'border-blue-500/30',
    badgeText: 'text-blue-400',
    iconName: 'ShieldCheck',
    permissions: [
      'moderate_forum',
      'view_stats',
    ],
  },
  fighter: {
    role: 'fighter',
    nameVi: 'Võ sĩ xác thực',
    description: 'Tài khoản võ sĩ chuyên nghiệp đã xác minh danh tính, liên kết hồ sơ thi đấu và tham gia giao lưu.',
    badgeBg: 'bg-emerald-500/15',
    badgeBorder: 'border-emerald-500/30',
    badgeText: 'text-emerald-400',
    iconName: 'Award',
    permissions: [
      'edit_fighter',
    ],
  },
  user: {
    role: 'user',
    nameVi: 'Thành viên',
    description: 'Thành viên cộng đồng MMAVN, có quyền tham gia bình chọn dự đoán, đăng bài và thảo luận.',
    badgeBg: 'bg-zinc-500/15',
    badgeBorder: 'border-zinc-500/30',
    badgeText: 'text-zinc-400',
    iconName: 'User',
    permissions: [],
  },
  // Capitalized aliases for compatibility
  Admin: {
    role: 'admin',
    nameVi: 'Quản trị viên',
    description: 'Toàn quyền quản lý hệ thống, phân quyền người dùng, chỉnh sửa toàn bộ dữ liệu và xem nhật ký kiểm toán.',
    badgeBg: 'bg-red-500/15',
    badgeBorder: 'border-red-500/30',
    badgeText: 'text-red-400',
    iconName: 'ShieldAlert',
    permissions: [
      'manage_users',
      'manage_roles',
      'create_fighter',
      'edit_fighter',
      'delete_fighter',
      'manage_events',
      'manage_fights',
      'moderate_forum',
      'view_audit_logs',
      'view_stats',
    ],
  },
  Editor: {
    role: 'editor',
    nameVi: 'Biên tập viên',
    description: 'Quản lý và cập nhật hồ sơ võ sĩ, sự kiện thi đấu, kết quả trận đấu và biên tập nội dung.',
    badgeBg: 'bg-amber-500/15',
    badgeBorder: 'border-amber-500/30',
    badgeText: 'text-amber-400',
    iconName: 'Edit3',
    permissions: [
      'create_fighter',
      'edit_fighter',
      'manage_events',
      'manage_fights',
      'moderate_forum',
      'view_stats',
    ],
  },
  Moderator: {
    role: 'moderator',
    nameVi: 'Kiểm duyệt viên',
    description: 'Kiểm duyệt bài viết, ghim/khóa/xóa thảo luận vi phạm trong diễn đàn cộng đồng.',
    badgeBg: 'bg-blue-500/15',
    badgeBorder: 'border-blue-500/30',
    badgeText: 'text-blue-400',
    iconName: 'ShieldCheck',
    permissions: [
      'moderate_forum',
      'view_stats',
    ],
  },
  Fighter: {
    role: 'fighter',
    nameVi: 'Võ sĩ xác thực',
    description: 'Tài khoản võ sĩ chuyên nghiệp đã xác minh danh tính, liên kết hồ sơ thi đấu và tham gia giao lưu.',
    badgeBg: 'bg-emerald-500/15',
    badgeBorder: 'border-emerald-500/30',
    badgeText: 'text-emerald-400',
    iconName: 'Award',
    permissions: [
      'edit_fighter',
    ],
  },
  User: {
    role: 'user',
    nameVi: 'Thành viên',
    description: 'Thành viên cộng đồng MMAVN, có quyền tham gia bình chọn dự đoán, đăng bài và thảo luận.',
    badgeBg: 'bg-zinc-500/15',
    badgeBorder: 'border-zinc-500/30',
    badgeText: 'text-zinc-400',
    iconName: 'User',
    permissions: [],
  },
};
