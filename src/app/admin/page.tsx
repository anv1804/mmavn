import { Metadata } from 'next';
import { AdminClient } from './AdminClient';

export const metadata: Metadata = {
  title: 'Quản trị hệ thống & Phân quyền RBAC',
  description: 'Trung tâm quản trị CMS, phân quyền người dùng RBAC, cập nhật võ sĩ và sự kiện MMAVN.',
};

export default function AdminPage() {
  return <AdminClient />;
}
