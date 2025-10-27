"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Home, Users, Menu, ChevronLeft, ChevronRight, LogOut, BookCheck, BookUp, BookDown } from "lucide-react"
import { cn } from "../../lib/utils"
import { ThemeToggle } from "../theme-toggle"

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

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

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
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 left-0 h-full border-r bg-background transition-all duration-300 ease-in-out z-50",
          isCollapsed ? "w-16" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b px-4">
            <Link 
              href="/dashboard" 
              className={cn(
                "flex items-center gap-2 font-semibold whitespace-nowrap overflow-hidden transition-all",
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              )}
            >
              <BookOpen className="h-6 w-6 flex-shrink-0" />
              <span>Library MS</span>
            </Link>
            
            <button 
              onClick={toggleSidebar}
              className="p-1.5 rounded-md hover:bg-muted"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                        isCollapsed ? "justify-center px-2" : ""
                      )}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className={cn("transition-opacity", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
                        {item.name}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between gap-2">
              <ThemeToggle variant="ghost" className={cn("w-full justify-start", isCollapsed && "justify-center")} />
              
              <button
                onClick={handleLogout}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                  isCollapsed ? "p-2" : "w-full"
                )}
                title={isCollapsed ? "Sign out" : undefined}
              >
                <LogOut className="h-5 w-5" />
                {!isCollapsed && <span>Sign out</span>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for mobile */}
      <div className="h-16 md:hidden" />
    </>
  )
}
