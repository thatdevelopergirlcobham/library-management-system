"use client"

import { BookOpen, Users, BookCheck, BookX, Clock, AlertTriangle, Plus } from "lucide-react"
import { Button } from "../../components/ui/button"
import Link from "next/link"

type StatCardProps = {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  color: string
  bgColor: string
}

function StatCard({ title, value, icon: Icon, description, color }: StatCardProps) {
  return (
    <div className="border rounded-lg p-6">
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

type ActivityItem = {
  id: string
  title: string
  description: string
  time: string
  icon: React.ComponentType<{ className?: string }>
}

export default function DashboardPage() {
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

  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      title: 'New book added',
      description: 'The Great Gatsby by F. Scott Fitzgerald',
      time: '2 hours ago',
      icon: BookOpen
    },
    {
      id: '2',
      title: 'Book checked out',
      description: 'To Kill a Mockingbird by John Doe',
      time: '5 hours ago',
      icon: BookCheck
    },
    {
      id: '3',
      title: 'New member registered',
      description: 'Jane Smith (jane@example.com)',
      time: '1 day ago',
      icon: Users
    },
    {
      id: '4',
      title: 'Book returned',
      description: '1984 by George Orwell',
      time: '2 days ago',
      icon: BookX
    },
  ]

  const overdueBooks = [
    { id: '1', title: 'Pride and Prejudice', member: 'John Smith', daysOverdue: 5 },
    { id: '2', title: 'The Hobbit', member: 'Alice Johnson', daysOverdue: 2 },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here is whats happening with your library.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/books/add" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Book
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="col-span-4 border rounded-lg p-6">
          <div className="pb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="rounded-full bg-muted p-2">
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overdue Books */}
        <div className="border rounded-lg p-6">
          <div className="pb-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Overdue Books
            </h2>
          </div>
          <div className="space-y-4">
            {overdueBooks.length > 0 ? (
              <div className="space-y-4">
                {overdueBooks.map((book) => (
                  <div key={book.id} className="rounded-lg border p-3">
                    <p className="text-sm font-medium">{book.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {book.member} • {book.daysOverdue} days overdue
                    </p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View All Overdue
                </Button>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <p className="text-sm text-muted-foreground">No overdue books. Great job!</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-span-3 border rounded-lg p-6">
          <div className="pb-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button asChild variant="outline" className="h-24 flex-col gap-2">
              <Link href="/checkout">
                <BookCheck className="h-6 w-6" />
                <span>Check Out</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-24 flex-col gap-2">
              <Link href="/returns">
                <BookX className="h-6 w-6" />
                <span>Return Book</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-24 flex-col gap-2">
              <Link href="/members/add">
                <Users className="h-6 w-6" />
                <span>Add Member</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-24 flex-col gap-2">
              <Link href="/books/add">
                <BookOpen className="h-6 w-6" />
                <span>Add Book</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
