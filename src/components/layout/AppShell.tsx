'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { RoleSwitcher } from '@/components/admin/RoleSwitcher'

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-red-500 selection:text-white">
        {children}
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <RoleSwitcher />
    </>
  )
}
