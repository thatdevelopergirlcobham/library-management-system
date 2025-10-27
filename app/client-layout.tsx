"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Sidebar } from "../components/layout/sidebar"
import { Toaster } from "../components/ui/toaster"
import { TooltipProvider } from "../components/ui/tooltip"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  // Check authentication on mount and route changes
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    
    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
    } else {
      setIsMounted(true)
    }
  }, [pathname, router])

  if (!isMounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 md:pl-16 lg:pl-64">
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
        <Toaster />
      </div>
    </TooltipProvider>
  )
}
