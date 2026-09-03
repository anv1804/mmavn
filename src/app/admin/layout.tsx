import type { Metadata } from 'next'
import { AdminLayoutClient } from './AdminLayoutClient'

export const metadata: Metadata = {
  title: 'Hệ Thống CMS & Quản Trị — MMAVN Hub',
  description: 'Giao diện quản lý nội dung, hồ sơ võ sĩ, kết quả sự kiện và kiểm duyệt cộng đồng MMA Việt Nam.',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
