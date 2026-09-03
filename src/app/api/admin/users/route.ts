import { NextRequest, NextResponse } from 'next/server';
import {
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  getCurrentUser,
  setCurrentUserRole,
} from '@/lib/services/admin-service';
import type { UserRole } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role') as UserRole | null;
    const query = searchParams.get('q')?.toLowerCase();
    const current = searchParams.get('current');

    if (current === 'true') {
      const currentUser = getCurrentUser();
      return NextResponse.json({
        success: true,
        data: currentUser,
      });
    }

    let users = getAllUsers();

    if (role) {
      users = users.filter(u => u.role === role);
    }

    if (query) {
      users = users.filter(
        u =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          (u.fighterId && u.fighterId.toLowerCase().includes(query))
      );
    }

    return NextResponse.json({
      success: true,
      data: users,
      total: users.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, role, toggleStatus, switchRole } = body;

    // Handle quick client role switch testing
    if (switchRole) {
      const updatedCurrent = setCurrentUserRole(switchRole as UserRole);
      return NextResponse.json({
        success: true,
        data: updatedCurrent,
        message: `Đã chuyển vai trò hiện tại sang: ${switchRole}`,
      });
    }

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Thiếu userId trong yêu cầu.',
        },
        { status: 400 }
      );
    }

    let updatedUser;

    if (role) {
      const validRoles: UserRole[] = ['admin', 'editor', 'moderator', 'fighter', 'user'];
      if (!validRoles.includes(role)) {
        return NextResponse.json(
          {
            success: false,
            error: `Vai trò không hợp lệ: ${role}. Các vai trò hợp lệ: ${validRoles.join(', ')}`,
          },
          { status: 400 }
        );
      }
      updatedUser = updateUserRole(userId, role);
    }

    if (toggleStatus) {
      updatedUser = toggleUserStatus(userId);
    }

    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Không có hành động nào được chỉ định (cần role hoặc toggleStatus: true).',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: 'Cập nhật thông tin người dùng thành công.',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
