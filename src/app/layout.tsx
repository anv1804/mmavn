import type { Metadata } from 'next'
import './globals.css'
import { AppShell } from '@/components/layout/AppShell'

export const metadata: Metadata = {
  title: {
    default: 'MMAVN Hub — Sàn đấu tri thức MMA Việt Nam',
    template: '%s | MMAVN Hub',
  },
  description: 'Nền tảng dữ liệu, bảng xếp hạng, so sánh võ sĩ và cộng đồng MMA Việt Nam. LION Championship, GMA, V1 Champion.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="antialiased">
      <body className="min-h-screen flex flex-col font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
