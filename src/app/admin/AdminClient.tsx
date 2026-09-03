'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Users,
  Swords,
  Calendar,
  MessageSquare,
  ScrollText,
  Activity,
  Plus,
  Trash2,
  Lock,
  Pin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Search,
  Check,
  Award,
} from 'lucide-react';
import type { User, UserRole, SystemStats, AuditLog, Fighter, MmaEvent } from '@/types';
import { ROLE_CONFIGS } from '@/types/admin';
import {
  getCurrentUser,
  setCurrentUserRole,
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  getSystemStats,
  getAuditLogs,
  saveFighter,
  deleteFighter,
  saveEvent,
  updateFightResult,
  moderateForumPost,
  hasPermission,
} from '@/lib/services/admin-service';
import { fighters, events, fights } from '@/data/mock-data';
import { getPosts } from '@/lib/services/forum-service';
import { cn } from '@/lib/utils';

export function AdminClient() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'fighters' | 'events' | 'forum' | 'logs'>('stats');
  
  // Data states
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [userList, setUserList] = useState<User[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [fighterList, setFighterList] = useState<Fighter[]>([]);
  const [eventList, setEventList] = useState<MmaEvent[]>([]);
  const [forumPosts, setForumPosts] = useState(getPosts());

  // Search & Filter
  const [userSearch, setUserSearch] = useState('');
  const [fighterSearch, setFighterSearch] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Modals / Forms
  const [showFighterModal, setShowFighterModal] = useState(false);
  const [fighterForm, setFighterForm] = useState<Partial<Fighter>>({
    name: '',
    nickname: '',
    nationality: 'Việt Nam',
    divisionId: 'd-m-70',
    gymId: 'gym-1',
    height: 175,
    reach: 175,
    eloRating: 1250,
  });

  const [showResultModal, setShowResultModal] = useState(false);
  const [resultForm, setResultForm] = useState({
    fightId: 'fight-lion-12-01',
    winnerId: 'f1',
    method: 'KO',
    round: 1,
    time: '2:15',
  });

  const refreshData = () => {
    setStats(getSystemStats());
    setUserList(getAllUsers());
    setLogs(getAuditLogs());
    setFighterList([...fighters]);
    setEventList([...events]);
    setForumPosts(getPosts());
  };

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    refreshData();

    const handleRoleChanged = (e: Event) => {
      const customEvent = e as CustomEvent<User>;
      if (customEvent.detail) {
        setCurrentUser(customEvent.detail);
        refreshData();
      }
    };
    window.addEventListener('mmavn-role-changed', handleRoleChanged);
    return () => {
      window.removeEventListener('mmavn-role-changed', handleRoleChanged);
    };
  }, []);

  const notify = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const handleRoleSwitch = (role: UserRole) => {
    const updated = setCurrentUserRole(role);
    setCurrentUser({ ...updated });
    localStorage.setItem('mmavn_active_role', role);
    window.dispatchEvent(new CustomEvent('mmavn-role-changed', { detail: updated }));
    notify(`Đã chuyển vai trò đang trải nghiệm sang: ${ROLE_CONFIGS[role].nameVi}`);
    refreshData();
  };

  const handleUserRoleChange = (userId: string, newRole: UserRole) => {
    if (!currentUser || !hasPermission(currentUser.role, 'manage_roles')) {
      notify('Bạn không có quyền thay đổi vai trò người dùng!');
      return;
    }
    const updated = updateUserRole(userId, newRole);
    notify(`Đã cập nhật vai trò của ${updated.name} thành [${newRole}]`);
    refreshData();
  };

  const handleToggleUserStatus = (userId: string) => {
    if (!currentUser || !hasPermission(currentUser.role, 'manage_users')) {
      notify('Bạn không có quyền khóa/mở khóa người dùng!');
      return;
    }
    const updated = toggleUserStatus(userId);
    notify(`Đã ${updated.status === 'active' ? 'mở khóa' : 'tạm khóa'} tài khoản: ${updated.name}`);
    refreshData();
  };

  const handleCreateFighter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !hasPermission(currentUser.role, 'create_fighter')) {
      notify('Bạn không có quyền tạo hồ sơ võ sĩ!');
      return;
    }
    if (!fighterForm.name) {
      notify('Vui lòng nhập tên võ sĩ!');
      return;
    }
    const created = saveFighter(fighterForm);
    notify(`Đã tạo hồ sơ võ sĩ mới: ${created.name}`);
    setShowFighterModal(false);
    setFighterForm({
      name: '',
      nickname: '',
      nationality: 'Việt Nam',
      divisionId: 'd-m-70',
      gymId: 'gym-1',
      height: 175,
      reach: 175,
      eloRating: 1250,
    });
    refreshData();
  };

  const handleDeleteFighter = (id: string, name: string) => {
    if (!currentUser || !hasPermission(currentUser.role, 'delete_fighter')) {
      notify('Chỉ Quản trị viên (Admin) mới có quyền xóa võ sĩ!');
      return;
    }
    if (confirm(`Bạn có chắc chắn muốn xóa hồ sơ võ sĩ ${name}?`)) {
      deleteFighter(id);
      notify(`Đã xóa võ sĩ: ${name}`);
      refreshData();
    }
  };

  const handleUpdateFightResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !hasPermission(currentUser.role, 'manage_fights')) {
      notify('Bạn không có quyền cập nhật kết quả trận đấu!');
      return;
    }
    updateFightResult(
      resultForm.fightId,
      resultForm.winnerId,
      resultForm.method,
      resultForm.round,
      resultForm.time
    );
    notify(`Đã ghi nhận kết quả trận ${resultForm.fightId}`);
    setShowResultModal(false);
    refreshData();
  };

  const handleModeratePost = (postId: string, action: 'pin' | 'lock' | 'delete') => {
    if (!currentUser || !hasPermission(currentUser.role, 'moderate_forum')) {
      notify('Bạn không có quyền kiểm duyệt diễn đàn!');
      return;
    }
    moderateForumPost(postId, action);
    const actionText = { pin: 'Ghim/bỏ ghim', lock: 'Khóa/mở bình luận', delete: 'Xóa bài' }[action];
    notify(`Thực hiện [${actionText}] thành công.`);
    refreshData();
  };

  if (!currentUser) return null;

  const currentRoleCfg = ROLE_CONFIGS[currentUser.role];
  const canManageUsers = hasPermission(currentUser.role, 'manage_users');
  const canEditFighters = hasPermission(currentUser.role, 'edit_fighter');
  const canDeleteFighters = hasPermission(currentUser.role, 'delete_fighter');
  const canManageFights = hasPermission(currentUser.role, 'manage_fights');
  const canModerateForum = hasPermission(currentUser.role, 'moderate_forum');
  const canViewLogs = hasPermission(currentUser.role, 'view_audit_logs');

  const filteredUsers = userList.filter(
    u =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredFighters = fighterList.filter(
    f =>
      f.name.toLowerCase().includes(fighterSearch.toLowerCase()) ||
      (f.nickname && f.nickname.toLowerCase().includes(fighterSearch.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Banner / RBAC State Bar */}
      <section className="border-b border-border bg-card/60 backdrop-blur-md sticky top-16 z-30">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={cn('p-2.5 rounded-xl border', currentRoleCfg.badgeBg, currentRoleCfg.badgeBorder, currentRoleCfg.badgeText)}>
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight">MMAVN Trung tâm Quản trị & CMS</h1>
                <span className={cn('text-xs px-2 py-0.5 rounded-full font-bold border', currentRoleCfg.badgeBg, currentRoleCfg.badgeBorder, currentRoleCfg.badgeText)}>
                  {currentRoleCfg.nameVi}
                </span>
              </div>
              <p className="text-xs text-muted">
                Đang đăng nhập dưới danh tính: <strong className="text-foreground">{currentUser.name}</strong> ({currentUser.email})
              </p>
            </div>
          </div>

          {/* Quick Role Switch Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-muted mr-1 hidden lg:inline">Trải nghiệm quyền:</span>
            {(['admin', 'editor', 'moderator', 'fighter', 'user'] as UserRole[]).map(r => (
              <button
                key={r}
                onClick={() => handleRoleSwitch(r)}
                className={cn(
                  'text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors flex items-center gap-1',
                  currentUser.role === r
                    ? 'bg-primary text-primary-foreground border-primary font-bold shadow-sm'
                    : 'bg-card text-muted hover:text-foreground hover:bg-card-hover border-border'
                )}
              >
                {ROLE_CONFIGS[r].nameVi}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Notification Toast */}
      {feedbackMessage && (
        <div className="fixed top-24 right-4 z-50 bg-primary text-primary-foreground px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-border mb-6 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('stats')}
            className={cn(
              'px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 border transition-all whitespace-nowrap',
              activeTab === 'stats'
                ? 'bg-card-hover border-border text-primary border-b-2 border-b-primary font-bold'
                : 'border-transparent text-muted hover:text-foreground hover:bg-card'
            )}
          >
            <Activity className="w-4 h-4" />
            Tổng quan Hệ thống
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={cn(
              'px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 border transition-all whitespace-nowrap',
              activeTab === 'users'
                ? 'bg-card-hover border-border text-primary border-b-2 border-b-primary font-bold'
                : 'border-transparent text-muted hover:text-foreground hover:bg-card'
            )}
          >
            <Users className="w-4 h-4" />
            Quản lý Người dùng (RBAC)
          </button>

          <button
            onClick={() => setActiveTab('fighters')}
            className={cn(
              'px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 border transition-all whitespace-nowrap',
              activeTab === 'fighters'
                ? 'bg-card-hover border-border text-primary border-b-2 border-b-primary font-bold'
                : 'border-transparent text-muted hover:text-foreground hover:bg-card'
            )}
          >
            <Award className="w-4 h-4" />
            Quản lý Võ sĩ ({fighterList.length})
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={cn(
              'px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 border transition-all whitespace-nowrap',
              activeTab === 'events'
                ? 'bg-card-hover border-border text-primary border-b-2 border-b-primary font-bold'
                : 'border-transparent text-muted hover:text-foreground hover:bg-card'
            )}
          >
            <Calendar className="w-4 h-4" />
            Sự kiện & Trận đấu
          </button>

          <button
            onClick={() => setActiveTab('forum')}
            className={cn(
              'px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 border transition-all whitespace-nowrap',
              activeTab === 'forum'
                ? 'bg-card-hover border-border text-primary border-b-2 border-b-primary font-bold'
                : 'border-transparent text-muted hover:text-foreground hover:bg-card'
            )}
          >
            <MessageSquare className="w-4 h-4" />
            Kiểm duyệt Diễn đàn
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={cn(
              'px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 border transition-all whitespace-nowrap',
              activeTab === 'logs'
                ? 'bg-card-hover border-border text-primary border-b-2 border-b-primary font-bold'
                : 'border-transparent text-muted hover:text-foreground hover:bg-card'
            )}
          >
            <ScrollText className="w-4 h-4" />
            Nhật ký Kiểm toán ({logs.length})
          </button>
        </div>

        {/* TAB 1: SYSTEM STATS */}
        {activeTab === 'stats' && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-card border border-border">
                <div className="text-muted text-xs font-semibold uppercase">Tổng người dùng</div>
                <div className="text-2xl font-black text-primary font-mono mt-1">{stats.totalUsers}</div>
                <div className="text-[11px] text-muted mt-1">Đã phân cấp 5 vai trò RBAC</div>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border">
                <div className="text-muted text-xs font-semibold uppercase">Hồ sơ võ sĩ</div>
                <div className="text-2xl font-black text-foreground font-mono mt-1">{stats.totalFighters}</div>
                <div className="text-[11px] text-muted mt-1">Võ sĩ MMA chuyên nghiệp</div>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border">
                <div className="text-muted text-xs font-semibold uppercase">Sự kiện & Trận đấu</div>
                <div className="text-2xl font-black text-foreground font-mono mt-1">
                  {stats.totalEvents} / {stats.totalFights}
                </div>
                <div className="text-[11px] text-muted mt-1">LION, GMA, V1 Champion</div>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border">
                <div className="text-muted text-xs font-semibold uppercase">Bài viết & Dự đoán</div>
                <div className="text-2xl font-black text-foreground font-mono mt-1">
                  {stats.totalPosts} / {stats.totalPredictions}
                </div>
                <div className="text-[11px] text-muted mt-1">Hoạt động cộng đồng sôi nổi</div>
              </div>
            </div>

            {/* Permission Matrix Card */}
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-primary" />
                Ma trận Phân quyền Vai trò (RBAC Matrix)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-background/80 text-muted uppercase">
                    <tr>
                      <th className="p-2.5">Quyền hạn hệ thống</th>
                      <th className="p-2.5 text-center">Admin</th>
                      <th className="p-2.5 text-center">Editor</th>
                      <th className="p-2.5 text-center">Moderator</th>
                      <th className="p-2.5 text-center">Fighter</th>
                      <th className="p-2.5 text-center">User</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border font-mono">
                    {[
                      { key: 'manage_users', label: 'Quản lý tài khoản (Khóa/Mở)' },
                      { key: 'manage_roles', label: 'Phân quyền vai trò (Role)' },
                      { key: 'create_fighter', label: 'Tạo hồ sơ võ sĩ mới' },
                      { key: 'edit_fighter', label: 'Cập nhật thông tin võ sĩ' },
                      { key: 'delete_fighter', label: 'Xóa hồ sơ võ sĩ' },
                      { key: 'manage_events', label: 'Quản lý sự kiện MMA' },
                      { key: 'manage_fights', label: 'Cập nhật kết quả trận đấu' },
                      { key: 'moderate_forum', label: 'Kiểm duyệt diễn đàn (Ghim/Khóa/Xóa)' },
                      { key: 'view_audit_logs', label: 'Xem nhật ký kiểm toán' },
                    ].map(perm => (
                      <tr key={perm.key} className="hover:bg-card-hover/40">
                        <td className="p-2.5 font-sans font-medium text-foreground">{perm.label}</td>
                        <td className="p-2.5 text-center">
                          {hasPermission('admin', perm.key as any) ? (
                            <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td className="p-2.5 text-center">
                          {hasPermission('editor', perm.key as any) ? (
                            <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td className="p-2.5 text-center">
                          {hasPermission('moderator', perm.key as any) ? (
                            <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td className="p-2.5 text-center">
                          {hasPermission('fighter', perm.key as any) ? (
                            <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td className="p-2.5 text-center">
                          {hasPermission('user', perm.key as any) ? (
                            <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {!canManageUsers && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>
                  Lưu ý: Vai trò hiện tại của bạn (<strong>{currentRoleCfg.nameVi}</strong>) ở chế độ chỉ đọc với danh sách người dùng. Để đổi vai trò hoặc khóa tài khoản, hãy chuyển sang vai trò <strong>Quản trị viên (Admin)</strong>.
                </span>
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Tìm theo tên hoặc email người dùng..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-card border border-border text-xs focus:outline-none focus:border-primary"
                />
              </div>
              <button
                onClick={refreshData}
                className="px-3 py-2 bg-card hover:bg-card-hover border border-border rounded-xl text-xs flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-primary" />
                Làm mới
              </button>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-background/80 text-muted uppercase border-b border-border">
                    <tr>
                      <th className="p-3">Người dùng</th>
                      <th className="p-3">Cấp đai</th>
                      <th className="p-3">Vai trò (RBAC)</th>
                      <th className="p-3">Trạng thái</th>
                      <th className="p-3">Ngày tạo</th>
                      <th className="p-3 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-card-hover/40">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-8 h-8 rounded-full object-cover border border-border"
                            />
                            <div>
                              <div className="font-semibold text-foreground">{user.name}</div>
                              <div className="text-[11px] text-muted">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="text-[11px] px-2 py-0.5 rounded bg-background border border-border">
                            {user.beltLevel || '—'}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={user.role}
                            disabled={!canManageUsers}
                            onChange={e => handleUserRoleChange(user.id, e.target.value as UserRole)}
                            className={cn(
                              'text-xs px-2.5 py-1 rounded-lg border font-semibold bg-background focus:outline-none focus:border-primary',
                              ROLE_CONFIGS[user.role].badgeBorder,
                              ROLE_CONFIGS[user.role].badgeText,
                              !canManageUsers && 'opacity-60 cursor-not-allowed'
                            )}
                          >
                            <option value="admin">Quản trị viên (Admin)</option>
                            <option value="editor">Biên tập viên (Editor)</option>
                            <option value="moderator">Kiểm duyệt viên (Moderator)</option>
                            <option value="fighter">Võ sĩ xác thực (Fighter)</option>
                            <option value="user">Thành viên (User)</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <span
                            className={cn(
                              'text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border inline-flex items-center gap-1',
                              user.status === 'active'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : 'bg-red-500/10 text-red-400 border-red-500/30'
                            )}
                          >
                            {user.status === 'active' ? (
                              <>
                                <CheckCircle className="w-3 h-3" /> Hoạt động
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3" /> Tạm khóa
                              </>
                            )}
                          </span>
                        </td>
                        <td className="p-3 text-muted font-mono text-[11px]">
                          {new Date(user.createdAt || user.joinedDate || '2026-01-01').toLocaleDateString('vi-VN')}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            disabled={!canManageUsers}
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={cn(
                              'px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors',
                              user.status === 'active'
                                ? 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20',
                              !canManageUsers && 'opacity-50 cursor-not-allowed'
                            )}
                          >
                            {user.status === 'active' ? 'Khóa' : 'Mở khóa'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FIGHTER MANAGEMENT */}
        {activeTab === 'fighters' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Tìm kiếm võ sĩ..."
                  value={fighterSearch}
                  onChange={e => setFighterSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-card border border-border text-xs focus:outline-none focus:border-primary"
                />
              </div>

              {canEditFighters && (
                <button
                  onClick={() => setShowFighterModal(true)}
                  className="px-3.5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Thêm Võ sĩ mới
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFighters.map(f => (
                <div
                  key={f.id}
                  className="p-4 rounded-2xl bg-card border border-border hover:border-border-hover transition-colors flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                          {f.name}
                          {f.isChampion && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              🏆 Vô địch
                            </span>
                          )}
                        </h4>
                        {f.nickname && <p className="text-xs text-primary italic">&quot;{f.nickname}&quot;</p>}
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-background border border-border text-primary">
                        {f.eloRating} ELO
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-muted space-y-1 font-mono">
                      <div>Kỷ lục: {f.record.wins}T - {f.record.losses}B - {f.record.draws}H</div>
                      <div>Hạng cân: {f.divisionId} | Quốc tịch: {f.nationality}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border flex items-center justify-between">
                    <Link
                      href={`/vo-si/${f.id}`}
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Xem trang hồ sơ →
                    </Link>
                    {canDeleteFighters && (
                      <button
                        onClick={() => handleDeleteFighter(f.id, f.name)}
                        className="p-1.5 text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Xóa hồ sơ võ sĩ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EVENTS & FIGHT RESULTS */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Cập nhật Kết quả Trận đấu & Sự kiện</h3>
                <p className="text-xs text-muted">Ghi nhận chiến thắng, phương thức kết thúc và thời gian trận đấu</p>
              </div>
              {canManageFights && (
                <button
                  onClick={() => setShowResultModal(true)}
                  className="px-3.5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Swords className="w-4 h-4" />
                  Cập nhật Kết quả Trận
                </button>
              )}
            </div>

            <div className="space-y-3">
              {fights.map(fight => (
                <div
                  key={fight.id}
                  className="p-4 rounded-2xl bg-card border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted uppercase">{fight.id}</span>
                      {fight.isMainEvent && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/30 font-bold">
                          MAIN EVENT
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-sm text-foreground mt-1">
                      {fight.fighter1Id} VS {fight.fighter2Id}
                    </div>
                    <div className="text-xs text-muted font-mono">
                      Sự kiện: {fight.eventId} | Số hiệp: {fight.numberOfRounds}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {fight.result ? (
                      <div className="text-right">
                        <div className="text-xs font-bold text-emerald-400">
                          Thắng: {fight.result.winnerId} ({fight.result.method})
                        </div>
                        <div className="text-[11px] text-muted font-mono">
                          Hiệp {fight.result.round} ({fight.result.time})
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-muted italic">Chưa có kết quả</span>
                    )}

                    {canManageFights && (
                      <button
                        onClick={() => {
                          setResultForm({
                            fightId: fight.id,
                            winnerId: fight.fighter1Id,
                            method: 'KO',
                            round: 1,
                            time: '2:30',
                          });
                          setShowResultModal(true);
                        }}
                        className="px-3 py-1.5 bg-card-hover hover:bg-border text-foreground rounded-lg border border-border text-xs font-medium"
                      >
                        Sửa kết quả
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: FORUM MODERATION */}
        {activeTab === 'forum' && (
          <div className="space-y-4">
            {!canModerateForum && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>Bạn cần quyền <strong>Kiểm duyệt viên (Moderator)</strong> hoặc <strong>Admin</strong> để ghim, khóa hoặc xóa thảo luận.</span>
              </div>
            )}

            <div className="space-y-3">
              {forumPosts.map(post => (
                <div
                  key={post.id}
                  className="p-4 rounded-2xl bg-card border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {post.pinned && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/15 text-primary border border-primary/30 font-bold flex items-center gap-1">
                          <Pin className="w-3 h-3" /> ĐÃ GHIM
                        </span>
                      )}
                      {post.locked && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/30 font-bold flex items-center gap-1">
                          <Lock className="w-3 h-3" /> ĐÃ KHÓA
                        </span>
                      )}
                      <span className="text-xs text-muted font-mono">{post.category}</span>
                    </div>
                    <h4 className="font-bold text-sm text-foreground truncate">{post.title}</h4>
                    <p className="text-xs text-muted truncate mt-0.5">
                      Bởi: <strong>{post.author.name}</strong> • {post.upvotes} bình chọn • {post.repliesCount} trả lời
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={!canModerateForum}
                      onClick={() => handleModeratePost(post.id, 'pin')}
                      className={cn(
                        'px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors',
                        post.pinned ? 'bg-primary/20 text-primary border-primary/40' : 'bg-card hover:bg-card-hover border-border text-muted',
                        !canModerateForum && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <Pin className="w-3.5 h-3.5" />
                      {post.pinned ? 'Bỏ ghim' : 'Ghim'}
                    </button>

                    <button
                      disabled={!canModerateForum}
                      onClick={() => handleModeratePost(post.id, 'lock')}
                      className={cn(
                        'px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors',
                        post.locked ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-card hover:bg-card-hover border-border text-muted',
                        !canModerateForum && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      {post.locked ? 'Mở khóa' : 'Khóa'}
                    </button>

                    <button
                      disabled={!canModerateForum}
                      onClick={() => handleModeratePost(post.id, 'delete')}
                      className={cn(
                        'p-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors',
                        !canModerateForum && 'opacity-50 cursor-not-allowed'
                      )}
                      title="Xóa thảo luận"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: AUDIT LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Nhật ký Kiểm toán Hệ thống</h3>
                <p className="text-xs text-muted">Lưu vết mọi hành vi thay đổi dữ liệu, phân quyền và kiểm duyệt</p>
              </div>
              <button
                onClick={refreshData}
                className="px-3 py-1.5 bg-card hover:bg-card-hover border border-border rounded-xl text-xs flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-primary" />
                Làm mới Logs
              </button>
            </div>

            <div className="space-y-2">
              {logs.map(log => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-2xl bg-card border border-border flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                        {log.action}
                      </span>
                      <span className="text-xs text-muted">thực hiện bởi</span>
                      <span className="text-xs font-bold text-foreground">{log.performedBy}</span>
                      <span className="text-[11px] text-muted font-mono">[{log.entity}:{log.entityId}]</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{log.details}</p>
                  </div>
                  <div className="text-[11px] text-muted font-mono whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString('vi-VN')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* CREATE FIGHTER MODAL */}
      {showFighterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <form
            onSubmit={handleCreateFighter}
            className="bg-card border border-border w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-2xl"
          >
            <h3 className="text-base font-bold text-foreground">Thêm Hồ sơ Võ sĩ mới</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <label className="text-muted block mb-1">Họ tên võ sĩ *</label>
                <input
                  type="text"
                  required
                  value={fighterForm.name || ''}
                  onChange={e => setFighterForm({ ...fighterForm, name: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full p-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-muted block mb-1">Biệt danh</label>
                <input
                  type="text"
                  value={fighterForm.nickname || ''}
                  onChange={e => setFighterForm({ ...fighterForm, nickname: e.target.value })}
                  placeholder="The Dragon"
                  className="w-full p-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-muted block mb-1">Hạng cân</label>
                <select
                  value={fighterForm.divisionId}
                  onChange={e => setFighterForm({ ...fighterForm, divisionId: e.target.value })}
                  className="w-full p-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                >
                  <option value="d-m-56">56kg Nam</option>
                  <option value="d-m-61">61kg Nam</option>
                  <option value="d-m-65">65kg Nam</option>
                  <option value="d-m-70">70kg Nam</option>
                  <option value="d-m-77">77kg Nam</option>
                </select>
              </div>
              <div>
                <label className="text-muted block mb-1">Chiều cao (cm)</label>
                <input
                  type="number"
                  value={fighterForm.height || 175}
                  onChange={e => setFighterForm({ ...fighterForm, height: Number(e.target.value) })}
                  className="w-full p-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-muted block mb-1">ELO Rating ban đầu</label>
                <input
                  type="number"
                  value={fighterForm.eloRating || 1200}
                  onChange={e => setFighterForm({ ...fighterForm, eloRating: Number(e.target.value) })}
                  className="w-full p-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setShowFighterModal(false)}
                className="px-4 py-2 bg-card hover:bg-card-hover border border-border rounded-xl text-xs"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs"
              >
                Lưu võ sĩ
              </button>
            </div>
          </form>
        </div>
      )}

      {/* UPDATE FIGHT RESULT MODAL */}
      {showResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <form
            onSubmit={handleUpdateFightResult}
            className="bg-card border border-border w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl"
          >
            <h3 className="text-base font-bold text-foreground">Ghi nhận Kết quả Trận đấu</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-muted block mb-1">Mã trận đấu</label>
                <input
                  type="text"
                  value={resultForm.fightId}
                  onChange={e => setResultForm({ ...resultForm, fightId: e.target.value })}
                  className="w-full p-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-muted block mb-1">ID Võ sĩ chiến thắng</label>
                <input
                  type="text"
                  value={resultForm.winnerId}
                  onChange={e => setResultForm({ ...resultForm, winnerId: e.target.value })}
                  className="w-full p-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-muted block mb-1">Phương thức kết thúc</label>
                <select
                  value={resultForm.method}
                  onChange={e => setResultForm({ ...resultForm, method: e.target.value })}
                  className="w-full p-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                >
                  <option value="KO">KO (Knockout)</option>
                  <option value="TKO">TKO (Technical Knockout)</option>
                  <option value="Submission">Submission (Khóa siết)</option>
                  <option value="Decision (Unanimous)">Decision (Đồng thuận 3 giám định)</option>
                  <option value="Decision (Split)">Decision (Phân tách)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-muted block mb-1">Hiệp đấu (Round)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={resultForm.round}
                    onChange={e => setResultForm({ ...resultForm, round: Number(e.target.value) })}
                    className="w-full p-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-muted block mb-1">Thời gian (phút:giây)</label>
                  <input
                    type="text"
                    value={resultForm.time}
                    onChange={e => setResultForm({ ...resultForm, time: e.target.value })}
                    placeholder="3:45"
                    className="w-full p-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setShowResultModal(false)}
                className="px-4 py-2 bg-card hover:bg-card-hover border border-border rounded-xl text-xs"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs"
              >
                Cập nhật kết quả
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
