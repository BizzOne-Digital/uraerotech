'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-gradient-to-r from-slate-950 via-indigo-950 to-sky-900 border-b border-white/10 flex items-center px-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-6">
            <span className="text-white font-bold text-lg">UR Aerotech — Admin</span>
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
              ← Visit Site
            </Link>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-4 py-1.5 text-sm rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>
      <div className="min-h-screen pt-14">
        {children}
      </div>
    </>
  )
}
