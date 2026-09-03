'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Edit3,
  ShieldCheck,
  Award,
  User as UserIcon,
  ChevronDown,
  ChevronUp,
  Check,
  Activity,
  ScrollText,
  X,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import type { UserRole, User, AuditLog, SystemStats } from '@/types/admin';
import { ROLE_CONFIGS } from '@/types/admin';
import {
  getCurrentUser,
  setCurrentUserRole,
  getSystemStats,
  getAuditLogs,
} from '@/lib/services/admin-service';
import { cn } from '@/lib/utils';

export function RoleSwitcher() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Initialize role on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('mmavn_active_role') as UserRole | null;
    let initialUser: User;
    if (savedRole && ROLE_CONFIGS[savedRole]) {
      initialUser = setCurrentUserRole(savedRole);
    } else {
      initialUser = getCurrentUser();
    }
    setCurrentUser(initialUser);

    // Sync listener for cross-component updates
    const handleRoleChanged = (e: Event) => {
      const customEvent = e as CustomEvent<User>;
      if (customEvent.detail) {
        setCurrentUser(customEvent.detail);
      }
    };
    window.addEventListener('mmavn-role-changed', handleRoleChanged);
    return () => {
      window.removeEventListener('mmavn-role-changed', handleRoleChanged);
    };
  }, []);

  const handleRoleSelect = (role: UserRole) => {
    setIsUpdating(true);
    const updated = setCurrentUserRole(role);
    setCurrentUser({ ...updated });
    localStorage.setItem('mmavn_active_role', role);

    // Dispatch global custom event for any listeners
    window.dispatchEvent(
      new CustomEvent('mmavn-role-changed', {
        detail: updated,
      })
    );

    // Call API route asynchronously to keep backend in sync
    fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ switchRole: role }),
    }).catch(console.error);

    setTimeout(() => {
      setIsUpdating(false);
    }, 200);
  };

  const handleOpenStats = () => {
    setStats(getSystemStats());
    setAuditLogs(getAuditLogs().slice(0, 8));
    setShowStatsModal(true);
  };

  if (!currentUser) return null;

  const currentConfig = ROLE_CONFIGS[currentUser.role];

  const getRoleIcon = (role: UserRole, className = 'w-4 h-4') => {
    switch (role) {
      case 'admin':
        return <ShieldAlert className={className} />;
      case 'editor':
        return <Edit3 className={className} />;
      case 'moderator':
        return <ShieldCheck className={className} />;
      case 'fighter':
        return <Award className={className} />;
      case 'user':
      default:
        return <UserIcon className={className} />;
    }
  };

  return (
    <>
      {/* Floating Role Switcher Pill & Panel */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 pointer-events-auto">
        {/* Expanded Panel */}
        {isOpen && (
          <div className="w-[360px] sm:w-[400px] bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl shadow-black/60 p-4 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Mô phỏng Phân quyền (RBAC)
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-muted hover:text-foreground rounded-lg hover:bg-card-hover transition-colors"
                title="Đóng bảng phân quyền"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Identity Card */}
            <div className="my-3 p-3 bg-background/70 border border-border rounded-xl flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/40"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-foreground truncate">
                    {currentUser.name}
                  </span>
                  {currentUser.beltLevel && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-card-hover text-muted-foreground font-mono">
                      {currentUser.beltLevel}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted truncate">{currentUser.email}</p>
              </div>
              <span
                className={cn(
                  'text-xs px-2 py-1 rounded-md font-semibold border flex items-center gap-1 flex-shrink-0',
                  currentConfig.badgeBg,
                  currentConfig.badgeBorder,
                  currentConfig.badgeText
                )}
              >
                {getRoleIcon(currentUser.role, 'w-3.5 h-3.5')}
                {currentConfig.nameVi}
              </span>
            </div>

            {/* Role Options */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted px-1">
                Chọn vai trò để trải nghiệm:
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {(['admin', 'editor', 'moderator', 'fighter', 'user'] as UserRole[]).map(role => {
                  const cfg = ROLE_CONFIGS[role];
                  const isSelected = currentUser.role === role;
                  return (
                    <button
                      key={role}
                      onClick={() => handleRoleSelect(role)}
                      disabled={isUpdating}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-150 flex items-center justify-between group',
                        isSelected
                          ? 'bg-primary/10 border-primary text-primary ring-1 ring-primary/30'
                          : 'bg-card-hover/50 border-border text-foreground hover:bg-card-hover hover:border-border-hover'
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={cn(
                            'p-1.5 rounded-lg border flex-shrink-0',
                            cfg.badgeBg,
                            cfg.badgeBorder,
                            cfg.badgeText
                          )}
                        >
                          {getRoleIcon(role, 'w-3.5 h-3.5')}
                        </span>
                        <div className="truncate">
                          <span className="font-semibold text-foreground mr-1.5">{cfg.nameVi}</span>
                          <span className="text-[11px] text-muted truncate hidden sm:inline">
                            ({cfg.description.slice(0, 42)}...)
                          </span>
                        </div>
                      </div>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      ) : (
                        <span className="text-[10px] text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          Chọn
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Permissions List */}
            <div className="mt-3 pt-3 border-t border-border">
              <div className="text-[11px] font-medium text-muted flex items-center justify-between mb-1.5">
                <span>Quyền hạn vai trò [{currentConfig.nameVi}]:</span>
                <span className="text-primary font-mono text-[10px]">
                  {currentConfig.permissions.length} quyền
                </span>
              </div>
              <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto pr-1">
                {currentConfig.permissions.length > 0 ? (
                  currentConfig.permissions.map(perm => (
                    <span
                      key={perm}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground font-mono"
                    >
                      ✓ {perm}
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-muted italic">
                    Chỉ xem và tương tác cộng đồng tiêu chuẩn
                  </span>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between">
              <button
                onClick={handleOpenStats}
                className="text-xs text-muted hover:text-foreground flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-card-hover transition-colors"
              >
                <Activity className="w-3.5 h-3.5 text-primary" />
                <span>Xem Thống kê & Logs</span>
              </button>
              <button
                onClick={() => handleRoleSelect('admin')}
                className="text-[11px] text-primary hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Reset Admin
              </button>
            </div>
          </div>
        )}

        {/* Floating Pill Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Chuyển đổi vai trò quản trị"
          className={cn(
            'group flex items-center gap-2.5 px-3.5 py-2 rounded-full shadow-lg border backdrop-blur-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
            currentConfig.badgeBg,
            currentConfig.badgeBorder,
            'bg-card/90 text-foreground'
          )}
        >
          <span
            className={cn(
              'p-1 rounded-full flex items-center justify-center',
              currentConfig.badgeText
            )}
          >
            {getRoleIcon(currentUser.role, 'w-4 h-4')}
          </span>
          <div className="text-left text-xs leading-none">
            <span className="text-[10px] text-muted block">Vai trò thử nghiệm:</span>
            <span className={cn('font-bold text-xs', currentConfig.badgeText)}>
              {currentConfig.nameVi}
            </span>
          </div>
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-muted group-hover:text-foreground transition-colors ml-1" />
          ) : (
            <ChevronUp className="w-4 h-4 text-muted group-hover:text-foreground transition-colors ml-1" />
          )}
        </button>
      </div>

      {/* Stats & Audit Logs Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card border border-border w-full max-w-2xl rounded-2xl shadow-2xl p-6 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">
                  Hệ thống Quản trị & Nhật ký Kiểm toán
                </h2>
              </div>
              <button
                onClick={() => setShowStatsModal(false)}
                className="p-1.5 text-muted hover:text-foreground rounded-lg hover:bg-card-hover"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto py-4 space-y-6">
              {/* Quick Metrics */}
              {stats && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-primary" />
                    Chỉ số Hệ thống (SystemStats)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-background border border-border">
                      <div className="text-xl font-bold text-primary font-mono">
                        {stats.totalUsers}
                      </div>
                      <div className="text-xs text-muted">Người dùng</div>
                    </div>
                    <div className="p-3 rounded-xl bg-background border border-border">
                      <div className="text-xl font-bold text-foreground font-mono">
                        {stats.totalFighters}
                      </div>
                      <div className="text-xs text-muted">Võ sĩ MMA</div>
                    </div>
                    <div className="p-3 rounded-xl bg-background border border-border">
                      <div className="text-xl font-bold text-foreground font-mono">
                        {stats.totalEvents}
                      </div>
                      <div className="text-xs text-muted">Sự kiện</div>
                    </div>
                    <div className="p-3 rounded-xl bg-background border border-border">
                      <div className="text-xl font-bold text-foreground font-mono">
                        {stats.totalFights}
                      </div>
                      <div className="text-xs text-muted">Trận đấu</div>
                    </div>
                    <div className="p-3 rounded-xl bg-background border border-border">
                      <div className="text-xl font-bold text-foreground font-mono">
                        {stats.totalPosts}
                      </div>
                      <div className="text-xs text-muted">Bài diễn đàn</div>
                    </div>
                    <div className="p-3 rounded-xl bg-background border border-border">
                      <div className="text-xl font-bold text-foreground font-mono">
                        {stats.totalPredictions}
                      </div>
                      <div className="text-xs text-muted">Kèo dự đoán</div>
                    </div>
                    <div className="p-3 rounded-xl bg-background border border-border">
                      <div className="text-xl font-bold text-amber-400 font-mono">
                        {stats.activeTickets}
                      </div>
                      <div className="text-xs text-muted">Yêu cầu hỗ trợ</div>
                    </div>
                    <div className="p-3 rounded-xl bg-background border border-border">
                      <div className="text-xl font-bold text-blue-400 font-mono">
                        {stats.pendingReviews}
                      </div>
                      <div className="text-xs text-muted">Chờ duyệt</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Audit Logs */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3 flex items-center gap-1.5">
                  <ScrollText className="w-3.5 h-3.5 text-primary" />
                  Nhật ký Hoạt động Quản trị (AuditLog[])
                </h4>
                <div className="space-y-2">
                  {auditLogs.map(log => (
                    <div
                      key={log.id}
                      className="p-2.5 rounded-xl bg-background border border-border text-xs flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-primary text-[11px] px-1.5 py-0.5 rounded bg-primary/10">
                            {log.action}
                          </span>
                          <span className="text-muted text-[11px]">bởi</span>
                          <span className="font-semibold text-foreground">{log.performedBy}</span>
                        </div>
                        <p className="text-muted-foreground">{log.details}</p>
                      </div>
                      <span className="text-[10px] text-muted whitespace-nowrap font-mono">
                        {new Date(log.timestamp).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-border flex justify-end">
              <button
                onClick={() => setShowStatsModal(false)}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl text-xs font-medium hover:bg-secondary/80 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
