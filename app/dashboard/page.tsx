"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, Users, BookCheck, BookX } from "lucide-react"
import { Button } from "../../components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  const stats = [
    {
      title: "Total Books",
      value: "1,234",
      icon: BookOpen,
      description: "+120 from last month",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/50"
    },
    {
      title: "Active Members",
      value: "845",
      icon: Users,
      description: "+45 from last month",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/50"
    },
    {
      title: "Books Checked Out",
      value: "342",
      icon: BookCheck,
      description: "+12 this week",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/50"
    },
    {
      title: "Overdue Books",
      value: "23",
      icon: BookX,
      description: "+2 today",
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900/50"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            {`Welcome back! Here's what's happening with your library today.`}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h2 className="text-2xl font-bold">{stat.value}</h2>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-full`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-medium mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button asChild variant="outline" className="h-24 flex-col gap-2">
              <Link href="/books/add" className="flex flex-col items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-500" />
                <span>Add Book</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-24 flex-col gap-2">
              <Link href="/members/add" className="flex flex-col items-center justify-center">
                <Users className="h-6 w-6 text-green-500" />
                <span>Add Member</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-24 flex-col gap-2">
              <Link href="/checkout" className="flex flex-col items-center justify-center">
                <BookCheck className="h-6 w-6 text-purple-500" />
                <span>Check Out</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-24 flex-col gap-2">
              <Link href="/returns" className="flex flex-col items-center justify-center">
                <BookX className="h-6 w-6 text-red-500" />
                <span>Return Book</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">U{i}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">User {i} checked out a book</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
