"use client"

import { Menu } from "lucide-react"
import { Button } from "../ui/button"
import { ThemeToggle } from "../theme-toggle"

type HeaderProps = {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 md:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  )
}
