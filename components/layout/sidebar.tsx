"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Home, Users, Menu, ChevronLeft, ChevronRight, LogOut,  BookUp, BookDown, X } from "lucide-react"
import { cn } from "../../lib/utils"
// import { ThemeToggle } from "../theme-toggle"

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Books",
    href: "/books",
    icon: BookOpen,
  },
  {
    name: "Members",
    href: "/members",
    icon: Users,
  },
  {
    name: "Check Out",
    href: "/checkout",
    icon: BookUp,
  },
  {
    name: "Returns",
    href: "/returns",
    icon: BookDown,
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // const toggleSidebar = () => {
  //   setIsCollapsed(!isCollapsed)
  // }

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    window.location.href = "/login"
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-background border shadow-sm"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 z-40 flex flex-col bg-background transition-all duration-300 ease-in-out md:relative",
          "w-64 border-r",
          isCollapsed && "w-16",
          !isMobileOpen && "-translate-x-full md:translate-x-0",
          className
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!isCollapsed && (
            <h1 className="text-lg font-semibold">Library</h1>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden rounded-md p-2 hover:bg-muted md:block"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="rounded-md p-2 hover:bg-muted md:hidden"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleLogout}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                isCollapsed ? "justify-center px-2" : "justify-start"
              )}
              title={isCollapsed ? "Sign out" : undefined}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="truncate">Sign out</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for mobile */}
      <div className="h-16 md:hidden" />
    </>
  )
}
